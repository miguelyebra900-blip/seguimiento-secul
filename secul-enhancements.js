/**
 * ============================================================================
 * SECUL ENHANCEMENTS & UPLOADER DIRECTO A GOOGLE DRIVE (PANELES A - J)
 * Cuenta Institucional: sis_cultural@guanajuato.gob.mx
 * ============================================================================
 */

(function() {
    // Endpoint oficial de Apps Script vinculado
    const URL_GOOGLE_APPS_SCRIPT = "https://script.google.com/a/macros/guanajuato.gob.mx/s/AKfycbxfB_2veB13Y-UR6_2AUm6E1kIh57FDVHBCLH_8dAjqCVwr8O8y6FtqlYIp5ILRRmB4/exec";

    // URLs oficiales de las carpetas por Panel en Google Drive
    window.SECUL_DRIVE_CONFIG = {
        carpetas: {
            'A': 'https://drive.google.com/drive/folders/141ND05zMzxXTGFG6DNbkDhxBiLOpm7QA',
            'B': 'https://drive.google.com/drive/folders/175HlCsI3a7UpGLZT2eyoKEfPYN8Edb8l',
            'C': 'https://drive.google.com/drive/folders/1li-_rQXR2D6TBXpc7USuqJuvei1uGamw',
            'D': 'https://drive.google.com/drive/folders/1IqG8rOUqqKCgDCnwVdRsGy2O9ZrsoOzD',
            'E': 'https://drive.google.com/drive/folders/1mXRkPTOEom5gQH1_r2sNUmI6y1-lYFs8',
            'F': 'https://drive.google.com/drive/folders/1g920TIAvEnLUMtLK7Dv-A7kxJbSCW0EL',
            'G': 'https://drive.google.com/drive/folders/1mgAyvyAcYRcv-tv-uW9T39FZloigGS3S',
            'H': 'https://drive.google.com/drive/folders/1VkJ97bZJTc1hmPZjtFT1P0LfixM9LQ3h',
            'I': 'https://drive.google.com/drive/folders/1hQlXnDTvZVF3GazHPDXXvRWCEmfECcW9',
            'J': 'https://drive.google.com/drive/folders/1kb6Et43Q3DaJBCTBvTZzeVCSqa7N6nas'
        }
    };

    // Abre en una pestaña la carpeta oficial del panel
    window.abrirCarpetaDrivePanel = function(letraPanel) {
        const url = window.SECUL_DRIVE_CONFIG.carpetas[(letraPanel || 'A').toUpperCase()] || 'https://drive.google.com/drive/folders/1mUFs_lZvM8sndqbh5wV7OaZM5UV40LHP';
        window.open(url, '_blank');
    };

    // Subida asíncrona a Google Drive mediante Apps Script
   window.subirArchivoADrive = async function(file, panelLetra) {
    if (!file) throw new Error("No se ha seleccionado ningún archivo.");

    // Convertir archivo a Base64
    const base64 = await new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result.split(',')[1]);
        reader.onerror = error => reject(error);
        reader.readAsDataURL(file);
    });

    const payload = {
        fileName: file.name,
        mimeType: file.type || 'application/octet-stream',
        base64Content: base64,
        panel: (panelLetra || 'A').toUpperCase()
    };

    // Usar text/plain en el POST evita que el navegador envíe el preflight OPTIONS
    // que Google Apps Script suele rechazar por CORS
    const res = await fetch(URL_GOOGLE_APPS_SCRIPT, {
        method: 'POST',
        headers: {
            'Content-Type': 'text/plain;charset=utf-8'
        },
        body: JSON.stringify(payload)
    });

    if (!res.ok && res.type !== 'opaque') {
        throw new Error("No se pudo conectar con el servicio de Google Drive.");
    }

    const data = await res.json();
    if (data.status !== 'success') {
        throw new Error(data.message || "Error al depositar el archivo en Google Drive.");
    }

    return data.fileUrl;
};
    // -------------------------------------------------------------------------
    // SISTEMA DE NOTIFICACIONES TOAST (ELEGANTE)
    // -------------------------------------------------------------------------
    function initToastContainer() {
        if (!document.getElementById('seculToastContainer')) {
            const c = document.createElement('div');
            c.id = 'seculToastContainer';
            c.className = 'fixed bottom-5 right-5 z-[9999] flex flex-col gap-2.5 pointer-events-none';
            document.body.appendChild(c);
        }
    }

    window.showSeculToast = function(mensaje, tipo = 'info', titulo = 'Aviso') {
        initToastContainer();
        const c = document.getElementById('seculToastContainer');
        const toast = document.createElement('div');
        toast.className = 'pointer-events-auto flex items-start gap-3 p-3.5 rounded-2xl shadow-xl border backdrop-blur-md transition-all duration-300 transform translate-y-3 opacity-0 max-w-sm';

        const configs = {
            success: { bg: 'bg-emerald-950/90 text-emerald-100 border-emerald-500/40', icon: 'fa-circle-check text-emerald-400' },
            error:   { bg: 'bg-rose-950/90 text-rose-100 border-rose-500/40', icon: 'fa-circle-xmark text-rose-400' },
            warning: { bg: 'bg-amber-950/90 text-amber-100 border-amber-500/40', icon: 'fa-triangle-exclamation text-amber-400' },
            info:    { bg: 'bg-slate-900/90 text-slate-100 border-indigo-500/40', icon: 'fa-circle-info text-indigo-400' }
        };

        const cfg = configs[tipo] || configs.info;
        toast.className += ` ${cfg.bg}`;
        toast.innerHTML = `
            <i class="fa-solid ${cfg.icon} text-base mt-0.5 shrink-0"></i>
            <div class="flex-1 text-xs">
                <strong class="block font-bold text-[11px] uppercase tracking-wider mb-0.5">${titulo}</strong>
                <p class="leading-snug">${mensaje}</p>
            </div>
            <button class="text-white/60 hover:text-white text-xs ml-1" onclick="this.parentElement.remove()">&times;</button>
        `;
        c.appendChild(toast);
        requestAnimationFrame(() => toast.classList.remove('translate-y-3', 'opacity-0'));
        setTimeout(() => {
            toast.classList.add('opacity-0', 'translate-y-3');
            setTimeout(() => toast.remove(), 350);
        }, 4000);
    };

    // -------------------------------------------------------------------------
    // ASISTENTE DE CARGA DIRECTA DENTRO DEL MODAL
    // -------------------------------------------------------------------------
    function inyectarBotonCargaDirecta() {
        const inputUrl = document.getElementById('uploadDocUrl');
        if (!inputUrl || inputUrl.dataset.uploaderInjected) return;
        inputUrl.dataset.uploaderInjected = 'true';

        const wrapper = inputUrl.parentElement;
        const uploadBox = document.createElement('div');
        uploadBox.className = 'mt-2 p-3 bg-indigo-50/50 border border-indigo-100 rounded-xl space-y-2';
        uploadBox.innerHTML = `
            <div class="flex items-center justify-between text-xs">
                <span class="font-bold text-indigo-950 flex items-center gap-1.5">
                    <i class="fa-brands fa-google-drive text-amber-500"></i> Carga Automática a Google Drive
                </span>
                <button type="button" id="btnAbrirCarpetaActual" class="text-[10px] text-indigo-700 hover:underline font-bold flex items-center gap-1">
                    <i class="fa-solid fa-folder-open"></i> Ver Carpeta en Drive
                </button>
            </div>
            <div class="flex items-center gap-2">
                <input type="file" id="archivoParaDriveInput" class="text-xs file:mr-2 file:py-1 file:px-2.5 file:rounded-lg file:border-0 file:text-[10px] file:font-bold file:bg-indigo-600 file:text-white hover:file:bg-indigo-700 cursor-pointer w-full text-slate-600">
                <button type="button" id="btnEjecutarSubidaDrive" class="px-3 py-1 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-bold transition shrink-0 flex items-center gap-1">
                    <i class="fa-solid fa-cloud-arrow-up"></i> Subir
                </button>
            </div>
            <span id="labelEstadoSubida" class="text-[10px] text-slate-500 block">Los archivos se guardarán en la subcarpeta institucional correspondiente (Paneles A al J).</span>
        `;
        wrapper.appendChild(uploadBox);

        const btnSubir = document.getElementById('btnEjecutarSubidaDrive');
        const fileInput = document.getElementById('archivoParaDriveInput');
        const labelEstado = document.getElementById('labelEstadoSubida');
        const btnVerCarpeta = document.getElementById('btnAbrirCarpetaActual');

        function deducirPanelActual() {
            const hitoId = document.getElementById('uploadHitoId')?.value || '';
            const hito = (window.hitosFiscalizacionData || []).find(h => h.id === hitoId);
            const areaStr = (hito?.area || '').toLowerCase();
            if (areaStr.includes('humano') || areaStr.includes('personal') || areaStr.includes('rh')) return 'A';
            if (areaStr.includes('jurídic') || areaStr.includes('litigio')) return 'B';
            if (areaStr.includes('inmueble') || areaStr.includes('predio')) return 'C';
            if (areaStr.includes('fiarca') || areaStr.includes('fideicomis')) return 'D';
            if (areaStr.includes('patrimon') || areaStr.includes('material')) return 'E';
            if (areaStr.includes('finanz') || areaStr.includes('fiscal') || areaStr.includes('sat')) return 'F';
            if (areaStr.includes('tecnolog') || areaStr.includes('ti') || areaStr.includes('sistem')) return 'G';
            if (areaStr.includes('archiv')) return 'H';
            if (areaStr.includes('auditor') || areaStr.includes('aseg') || areaStr.includes('fiscalización')) return 'I';
            if (areaStr.includes('líder') || areaStr.includes('comité') || areaStr.includes('proyecto')) return 'J';
            return 'A';
        }

        btnVerCarpeta.addEventListener('click', () => {
            window.abrirCarpetaDrivePanel(deducirPanelActual());
        });

        btnSubir.addEventListener('click', async () => {
            const archivo = fileInput.files[0];
            if (!archivo) {
                window.showSeculToast("Seleccione un archivo de su equipo antes de subir.", "warning");
                return;
            }

            const panel = deducirPanelActual();
            btnSubir.disabled = true;
            btnSubir.innerHTML = '<i class="fa-solid fa-spinner animate-spin"></i> Subiendo...';
            labelEstado.innerText = `Subiendo "${archivo.name}" a Panel ${panel}...`;

            try {
                const urlGenerada = await window.subirArchivoADrive(archivo, panel);
                inputUrl.value = urlGenerada;
                labelEstado.innerHTML = `<span class="text-emerald-700 font-bold"><i class="fa-solid fa-check"></i> Archivo alojado exitosamente en Google Drive.</span>`;
                window.showSeculToast("Archivo cargado y enlace oficial vinculado.", "success", "Google Drive");
            } catch (err) {
                labelEstado.innerHTML = `<span class="text-rose-700 font-bold"><i class="fa-solid fa-xmark"></i> ${err.message}</span>`;
                window.showSeculToast(err.message, "error", "Error de Carga");
            } finally {
                btnSubir.disabled = false;
                btnSubir.innerHTML = '<i class="fa-solid fa-cloud-arrow-up"></i> Subir';
            }
        });
    }

    // -------------------------------------------------------------------------
    // BUSCADOR GLOBAL INTELIGENTE (SPOTLIGHT / CTRL + K)
    // -------------------------------------------------------------------------
    function inyectarBuscadorSpotlight() {
        if (document.getElementById('modalSpotlightSearch')) return;
        const html = `
        <div id="modalSpotlightSearch" class="fixed inset-0 z-[100] hidden modal-backdrop flex items-start justify-center pt-16 px-4">
            <div class="bg-slate-900/95 border border-indigo-500/40 rounded-3xl max-w-2xl w-full shadow-2xl overflow-hidden backdrop-blur-xl flex flex-col max-h-[80vh]">
                <div class="p-4 border-b border-slate-800 flex items-center gap-3">
                    <i class="fa-solid fa-magnifying-glass text-indigo-400 text-lg"></i>
                    <input type="text" id="spotlightInput" placeholder="Buscar hito, folio (ej. V1-02, INF-A01), riesgo (R-01), área o concepto..." class="w-full bg-transparent text-white placeholder-slate-400 text-sm focus:outline-none">
                    <span class="text-[10px] bg-slate-800 text-slate-400 px-2 py-1 rounded-md font-mono border border-slate-700">ESC</span>
                </div>
                <div id="spotlightResults" class="p-3 overflow-y-auto space-y-1.5 text-xs text-slate-300"></div>
                <div class="p-3 bg-slate-950/80 border-t border-slate-800 flex justify-between items-center text-[11px] text-slate-400">
                    <span>Acceso rápido: <kbd class="font-mono bg-slate-800 px-1.5 py-0.5 rounded border border-slate-700 text-white">Ctrl + K</kbd></span>
                    <span>Carpetas Drive A-J conectadas</span>
                </div>
            </div>
        </div>`;
        document.body.insertAdjacentHTML('beforeend', html);

        const modal = document.getElementById('modalSpotlightSearch');
        const input = document.getElementById('spotlightInput');

        window.abrirSpotlight = function() {
            modal.classList.remove('hidden');
            modal.style.display = 'flex';
            input.value = '';
            input.focus();
            filtrarResultadosSpotlight('');
        };

        window.cerrarSpotlight = function() {
            modal.classList.add('hidden');
            modal.style.display = 'none';
        };

        window.addEventListener('keydown', (e) => {
            if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
                e.preventDefault();
                window.abrirSpotlight();
            } else if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
                window.cerrarSpotlight();
            }
        });

        modal.addEventListener('click', (e) => { if (e.target === modal) window.cerrarSpotlight(); });
        input.addEventListener('input', (e) => filtrarResultadosSpotlight(e.target.value.trim().toLowerCase()));
    }

    function filtrarResultadosSpotlight(q) {
        const res = document.getElementById('spotlightResults');
        res.innerHTML = '';

        if (!q) {
            res.innerHTML = `
                <div class="p-3 text-center text-slate-400 text-xs">
                    <p class="font-bold text-slate-300 mb-2">Acceso a Carpetas de Drive por Panel (A al J):</p>
                    <div class="grid grid-cols-2 sm:grid-cols-5 gap-1.5">
                        ${['A','B','C','D','E','F','G','H','I','J'].map(l => 
                            `<button onclick="window.abrirCarpetaDrivePanel('${l}')" class="p-2 bg-slate-800 hover:bg-indigo-600 rounded-xl text-white font-bold text-[11px] transition flex items-center justify-center gap-1.5 border border-slate-700">
                                <i class="fa-brands fa-google-drive text-amber-400"></i> Panel ${l}
                            </button>`
                        ).join('')}
                    </div>
                </div>`;
            return;
        }

        const hitos = window.hitosFiscalizacionData || [];
        const encontrados = hitos.filter(h => 
            h.id.toLowerCase().includes(q) || 
            (h.titulo && h.titulo.toLowerCase().includes(q)) || 
            (h.area && h.area.toLowerCase().includes(q))
        );

        if (encontrados.length === 0) {
            res.innerHTML = `<p class="text-slate-400 text-center py-6 text-xs italic">No se encontraron hitos o registros para "${q}".</p>`;
            return;
        }

        encontrados.slice(0, 10).forEach(h => {
            const div = document.createElement('div');
            div.className = 'p-2.5 rounded-xl bg-slate-800/80 hover:bg-indigo-600/30 border border-slate-700/60 cursor-pointer transition flex items-center justify-between gap-3';
            div.innerHTML = `
                <div class="overflow-hidden">
                    <div class="flex items-center gap-1.5 mb-0.5">
                        <span class="px-1.5 py-0.5 rounded font-mono font-bold text-[9px] bg-indigo-900 text-indigo-300">${h.id}</span>
                        <strong class="text-white text-xs truncate">${h.titulo}</strong>
                    </div>
                    <span class="text-[11px] text-slate-400 block truncate">${h.area}</span>
                </div>
                <button class="px-2 py-1 bg-indigo-600 text-white rounded text-[10px] font-bold shrink-0">Abrir</button>
            `;
            div.addEventListener('click', () => {
                window.cerrarSpotlight();
                window.abrirModalGestionFiscalizacion(h.id);
            });
            res.appendChild(div);
        });
    }

    // Inicialización
    document.addEventListener('DOMContentLoaded', () => {
        inyectarBotonCargaDirecta();
        inyectarBuscadorSpotlight();
    });

    if (document.readyState === 'complete' || document.readyState === 'interactive') {
        inyectarBotonCargaDirecta();
        inyectarBuscadorSpotlight();
    }
})();
