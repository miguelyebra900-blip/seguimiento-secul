/**
 * ============================================================================
 * SECUL ENGINE - MOTOR DE CÁLCULO, CRONOGRAMA REACTIVO Y GOBERNANZA (ART. 6)
 * Proyecto: Extinción y Cierre Institucional del IECG
 * ============================================================================
 */

(function(window) {
    'use strict';

    // 1. DATASET MAESTRO DE 30 ACCIONES (PANELES A AL J)
    const ACCIONES_INICIALES = [
        // ÁREA A: Recursos Humanos & Estructura (Panel A)
        { id: "ACT-A1", panel: "A", area: "Recursos Humanos & Estructura", hito: "Expedientes Laborales", accion: "Traspaso de carpetas individuales para garantizar antigüedad y derechos adquiridos.", responsable: "Capital Humano / DGRH Finanzas", estatus: "Concluido", avance: 100, peso: 33.34, tercero: "Tercero Estatal", terceroNombre: "DGRH Secretaría de Finanzas", fechaLimite: "2025-05-09", docRequerido: "Acta Entrega-Recepción DGRH y acuse 303 expedientes", driveUrl: "https://drive.google.com" },
        { id: "ACT-A2", panel: "A", area: "Recursos Humanos & Estructura", hito: "Plaza del Liquidador", accion: "Mantener activa la plaza en la sociedad IECG hasta culminar el informe final de cierre.", responsable: "Capital Humano / RH", estatus: "Concluido", avance: 100, peso: 33.33, tercero: "Interna", terceroNombre: "IECG / Liquidador", fechaLimite: "2025-12-26", docRequerido: "Cédula Resguardo Plaza Nivel 8 y 131 bienes", driveUrl: "https://drive.google.com" },
        { id: "ACT-A3", panel: "A", area: "Recursos Humanos & Estructura", hito: "Finiquitos y Convenios", accion: "Ratificación de convenios de terminación laboral ante el Tribunal de Conciliación.", responsable: "Capital Humano / Jurídico", estatus: "En Proceso", avance: 70, peso: 33.33, tercero: "Tercero Externo", terceroNombre: "Tribunal de Conciliación y Arbitraje", fechaLimite: "2026-04-30", docRequerido: "Convenios ratificados ante Tribunal y pólizas", driveUrl: "" },

        // ÁREA B: Asuntos Jurídicos & Contencioso (Panel B)
        { id: "ACT-B1", panel: "B", area: "Asuntos Jurídicos & Contencioso", hito: "Acta de Sesión de Prórroga", accion: "Circular y formalizar el acta con Finanzas y Honestidad para solventar R-05 ante ASEG.", responsable: "Comisión Liquidadora / Sec. Técnica", estatus: "Validación", avance: 75, peso: 40.00, tercero: "Tercero Estatal", terceroNombre: "Comité de Extinción (Finanzas / Honestidad)", fechaLimite: "2026-03-31", docRequerido: "Acta Sesión 10/Dic/2025 protocolizada con firmas", driveUrl: "" },
        { id: "ACT-B2", panel: "B", area: "Asuntos Jurídicos & Contencioso", hito: "Sustitución Procesal", accion: "Actualizar representación jurídica en juzgados laborales y civiles.", responsable: "Dirección Jurídica / SC", estatus: "En Proceso", avance: 40, peso: 30.00, tercero: "Tercero Externo", terceroNombre: "Juzgados Civiles y Laborales", fechaLimite: "2026-05-31", docRequerido: "Autos judiciales de apersonamiento SCUL", driveUrl: "" },
        { id: "ACT-B3", panel: "B", area: "Asuntos Jurídicos & Contencioso", hito: "Compilación Marco Legal", accion: "Entrega oficial del compendio jurídico al equipo auditor de la ASEG.", responsable: "Dirección Jurídica / Enlace ASEG", estatus: "Concluido", avance: 100, peso: 30.00, tercero: "Interna", terceroNombre: "Dirección Jurídica IECG", fechaLimite: "2024-10-15", docRequerido: "Acuse formal entrega compendio normativo ASEG", driveUrl: "https://drive.google.com" },

        // ÁREA C: Patrimonio Inmobiliario & Predios (Panel C)
        { id: "ACT-C1", panel: "C", area: "Patrimonio Inmobiliario & Predios", hito: "Sitios Arqueológicos", accion: "Trámites notariales y registrales para incorporación al Padrón Inmobiliario estatal.", responsable: "Jurídico / Inmuebles", estatus: "En Proceso", avance: 50, peso: 35.00, tercero: "Tercero Estatal", terceroNombre: "Registro Público de la Propiedad / Notaría", fechaLimite: "2026-06-30", docRequerido: "Cédulas catastrales y constancias de inscripción", driveUrl: "" },
        { id: "ACT-C2", panel: "C", area: "Patrimonio Inmobiliario & Predios", hito: "Acuerdos de Destino", accion: "Formalización de Acuerdos de Destino con la Consejería del Ejecutivo (R-04).", responsable: "Dirección Jurídica / Consejería", estatus: "En Proceso", avance: 50, peso: 45.00, tercero: "Tercero Estatal", terceroNombre: "Consejería Jurídica del Ejecutivo", fechaLimite: "2026-05-31", docRequerido: "Acuerdos de Destino firmados y publicados", driveUrl: "" },
        { id: "ACT-C3", panel: "C", area: "Patrimonio Inmobiliario & Predios", hito: "Expedientes Catastrales", accion: "Entrega formal de expedientes a la Dirección General de Control Patrimonial.", responsable: "Jurídico / Inmuebles", estatus: "Concluido", avance: 100, peso: 20.00, tercero: "Tercero Estatal", terceroNombre: "DGRMSGyC Secretaría de Finanzas", fechaLimite: "2025-08-31", docRequerido: "Acta de entrega técnica de expedientes inmobiliarios", driveUrl: "https://drive.google.com" },

        // ÁREA D: Fideicomisos & Fondos Especiales (Panel D)
        { id: "ACT-D1", panel: "D", area: "Fideicomisos & Fondos Especiales", hito: "Convenio Modificatorio Banorte", accion: "Validar proyecto de adenda con Fiduciaria Banorte y Consejería Jurídica (R-03).", responsable: "Dirección Jurídica / Fiduciaria Banorte", estatus: "Validación", avance: 70, peso: 45.00, tercero: "Tercero Externo", terceroNombre: "Fiduciaria Banorte / Procuraduría Fiscal", fechaLimite: "2026-04-15", docRequerido: "Proyecto 2do Convenio Modificatorio FIARCA visado", driveUrl: "" },
        { id: "ACT-D2", panel: "D", area: "Fideicomisos & Fondos Especiales", hito: "Cese de Pasivos", accion: "Traspaso de derechos y obligaciones fiduciarias a la Secretaría de Cultura.", responsable: "Finanzas / Fiduciario", estatus: "Concluido", avance: 100, peso: 30.00, tercero: "Tercero Externo", terceroNombre: "Fiduciaria Banorte", fechaLimite: "2025-12-15", docRequerido: "Estado cuenta fiduciario con corte de pasivos", driveUrl: "https://drive.google.com" },
        { id: "ACT-D3", panel: "D", area: "Fideicomisos & Fondos Especiales", hito: "Conciliación de Rendimientos", accion: "Reintegro de remanentes fiduciarios a la Secretaría de Finanzas.", responsable: "Finanzas / Fiduciario", estatus: "En Proceso", avance: 40, peso: 25.00, tercero: "Tercero Estatal", terceroNombre: "Secretaría de Finanzas", fechaLimite: "2026-03-31", docRequerido: "Ficha transferencia bancaria y recibo oficial SF", driveUrl: "" },

        // ÁREA E: Control Patrimonial & Bienes Muebles (Panel E)
        { id: "ACT-E1", panel: "E", area: "Control Patrimonial & Bienes Muebles", hito: "Búsqueda de 2,570 Faltantes", accion: "Brigadas de campo, rescate de facturas en AGEG y actas de baja por desuso (R-01).", responsable: "Control Patrimonial / AGEG", estatus: "En Proceso", avance: 40, peso: 50.00, tercero: "Tercero Estatal", terceroNombre: "Control Patrimonial SF / AGEG", fechaLimite: "2026-06-30", docRequerido: "Cédula de búsqueda física y actas circunstanciadas", driveUrl: "" },
        { id: "ACT-E2", panel: "E", area: "Control Patrimonial & Bienes Muebles", hito: "Capitalización Fase 1", accion: "Pólizas contables y actualización de resguardos individuales por custodio.", responsable: "Control Patrimonial / Contabilidad", estatus: "Concluido", avance: 100, peso: 25.00, tercero: "Tercero Estatal", terceroNombre: "Contabilidad Gubernamental SF", fechaLimite: "2025-11-30", docRequerido: "Póliza contable SIGEG (1,682 activos capitalizados)", driveUrl: "https://drive.google.com" },
        { id: "ACT-E3", panel: "E", area: "Control Patrimonial & Bienes Muebles", hito: "Flotilla Vehicular (100%)", accion: "Baja formal de placas en Finanzas y alta patrimonial en SCUL.", responsable: "Control Patrimonial / Serv. Generales", estatus: "Concluido", avance: 100, peso: 25.00, tercero: "Tercero Estatal", terceroNombre: "Padrón Vehicular SF", fechaLimite: "2025-09-30", docRequerido: "28 facturas endosadas (14 autos y 14 remolques)", driveUrl: "https://drive.google.com" },

        // ÁREA F: Financiero, Presupuestal & Fiscal (Panel F)
        { id: "ACT-F1", panel: "F", area: "Financiero, Presupuestal & Fiscal", hito: "Reintegros Oficiales SF", accion: "Integrar recibos de caja emitidos por SF a la cuenta pública de liquidación.", responsable: "Administración y Finanzas", estatus: "Concluido", avance: 100, peso: 35.00, tercero: "Tercero Estatal", terceroNombre: "Secretaría de Finanzas", fechaLimite: "2025-11-30", docRequerido: "Recibos oficiales SF por $43,409,858.26 MXN", driveUrl: "https://drive.google.com" },
        { id: "ACT-F2", panel: "F", area: "Financiero, Presupuestal & Fiscal", hito: "Cierre de Cuentas Residuales", accion: "Cancelación de cuentas bancarias operativas en BBVA, Salamanca y M. Ocampo.", responsable: "Tesorería / Finanzas", estatus: "En Proceso", avance: 65, peso: 20.00, tercero: "Tercero Externo", terceroNombre: "Instituciones Bancarias (BBVA/Salamanca)", fechaLimite: "2026-04-30", docRequerido: "Constancias de saldo cero y cancelación bancaria", driveUrl: "" },
        { id: "ACT-F3", panel: "F", area: "Financiero, Presupuestal & Fiscal", hito: "Baja de RFC ante el SAT", accion: "Presentación del trámite de cancelación de RFC por extinción (R-02).", responsable: "Liquidador IEC / SAT Celaya", estatus: "En Proceso", avance: 65, peso: 45.00, tercero: "Tercero Federal", terceroNombre: "SAT Módulo Celaya / SHCP", fechaLimite: "2026-07-31", docRequerido: "Acuse oficial de trámite de cancelación SAT Celaya", driveUrl: "" },

        // ÁREA G: Tecnologías de la Información (Panel G)
        { id: "ACT-G1", panel: "G", area: "Tecnologías de la Información (TI)", hito: "Usuarios y Licenciamiento SAP", accion: "Baja y desincorporación formal de usuarios ante la DGTIT de Finanzas.", responsable: "Tecnologías / DGTIT", estatus: "Concluido", avance: 100, peso: 33.34, tercero: "Tercero Estatal", terceroNombre: "DGTIT Secretaría de Finanzas", fechaLimite: "2025-10-31", docRequerido: "Cédula de desincorporación SAP emitida por DGTIT", driveUrl: "https://drive.google.com" },
        { id: "ACT-G2", panel: "G", area: "Tecnologías de la Información (TI)", hito: "Servidores y Respaldo BD", accion: "Migración digital de bases de datos y aplicativos a servidores SCUL.", responsable: "Tecnologías de la Información", estatus: "Concluido", avance: 100, peso: 33.33, tercero: "Interna", terceroNombre: "Coordinación Informática SCUL", fechaLimite: "2025-10-31", docRequerido: "Acta de entrega técnica y credenciales de servidores", driveUrl: "https://drive.google.com" },
        { id: "ACT-G3", panel: "G", area: "Tecnologías de la Información (TI)", hito: "Finiquito Obra Teatro Juárez", accion: "Cierre administrativo y económico de obra con la SICOM.", responsable: "SICOM / Enlace Obras SC", estatus: "Concluido", avance: 100, peso: 33.33, tercero: "Tercero Estatal", terceroNombre: "SICOM Gobierno del Estado", fechaLimite: "2025-11-30", docRequerido: "Acta de entrega-recepción de obra y fianza vicios", driveUrl: "https://drive.google.com" },

        // ÁREA H: Archivo & Gestión Documental (Panel H)
        { id: "ACT-H1", panel: "H", area: "Archivo & Gestión Documental", hito: "Archivos de Trámite y Conc.", accion: "Entrega e inventariado de cajas documentales a la Secretaría de Cultura.", responsable: "Archivo Institucional", estatus: "Concluido", avance: 100, peso: 33.34, tercero: "Interna", terceroNombre: "Coordinación Archivos SCUL", fechaLimite: "2025-11-15", docRequerido: "Inventario general de expedientes según CADIDO", driveUrl: "https://drive.google.com" },
        { id: "ACT-H2", panel: "H", area: "Archivo & Gestión Documental", hito: "Transferencia al AGEG", accion: "Entrega formal del fondo documental histórico con valor permanente.", responsable: "Archivo Institucional / AGEG", estatus: "En Proceso", avance: 60, peso: 33.33, tercero: "Tercero Estatal", terceroNombre: "Archivo General del Estado de Guanajuato", fechaLimite: "2026-06-15", docRequerido: "Acta Circunstanciada y acuse recepción AGEG", driveUrl: "" },
        { id: "ACT-H3", panel: "H", area: "Archivo & Gestión Documental", hito: "Soportes para Auditoría ASEG", accion: "Control y expedición de expedientes probatorios requeridos.", responsable: "Archivo Institucional", estatus: "En Proceso", avance: 65, peso: 33.33, tercero: "Tercero Estatal", terceroNombre: "Órgano Interno / ASEG", fechaLimite: "2026-06-30", docRequerido: "Cédulas de préstamo documental foliadas", driveUrl: "" },

        // ÁREA I: Fiscalización & Auditorías (Panel I)
        { id: "ACT-I1", panel: "I", area: "Fiscalización & Auditorías", hito: "Requerimientos ASEG Cuenta", accion: "Atención y solventación de las 22 acciones de fiscalización superior.", responsable: "Órgano Interno / Auditoría ASEG", estatus: "En Proceso", avance: 60, peso: 33.34, tercero: "Tercero Estatal", terceroNombre: "ASEG (Fiscalización Superior)", fechaLimite: "2026-06-30", docRequerido: "Oficios de respuesta y solventación remitidos ASEG", driveUrl: "" },
        { id: "ACT-I2", panel: "I", area: "Fiscalización & Auditorías", hito: "Pliego ASF y Control Federal", accion: "Revisión y cierre de auditorías a fondos federales transferidos (PACMYC).", responsable: "Presupuesto / Liquidador IEC", estatus: "Concluido", avance: 100, peso: 33.33, tercero: "Tercero Federal", terceroNombre: "TESOFE / Secretaría de la Honestidad", fechaLimite: "2025-04-30", docRequerido: "Fichas de reintegro TESOFE ($206,512.25) y conclusión", driveUrl: "https://drive.google.com" },
        { id: "ACT-I3", panel: "I", area: "Fiscalización & Auditorías", hito: "Mesa de Validación Trilateral", accion: "Mesas colegiadas con Finanzas, Honestidad y Control Patrimonial.", responsable: "Comisión Liquidadora / Honestidad", estatus: "En Proceso", avance: 50, peso: 33.33, tercero: "Tercero Estatal", terceroNombre: "Secretaría de la Honestidad / Finanzas", fechaLimite: "2026-05-15", docRequerido: "Minutas de acuerdos trilaterales firmadas", driveUrl: "" },

        // ÁREA J: Asuntos Internos Líder Proyecto (Panel J)
        { id: "ACT-J1", panel: "J", area: "Asuntos Internos Líder Proyecto", hito: "Acuerdos Comité Extinción", accion: "Seguimiento riguroso a la matriz de acuerdos y fechas límite de prórroga.", responsable: "Líder de Proyecto / Comité Extinción", estatus: "Concluido", avance: 100, peso: 33.34, tercero: "Interna", terceroNombre: "Comité de Extinción", fechaLimite: "2025-12-10", docRequerido: "Minutas oficiales de seguimiento del Comité", driveUrl: "https://drive.google.com" },
        { id: "ACT-J2", panel: "J", area: "Asuntos Internos Líder Proyecto", hito: "Integración del Informe Final", accion: "Consolidación de los 14 informes mensuales y anexos de entrega-recepción.", responsable: "Líder de Proyecto / Comité Extinción", estatus: "En Proceso", avance: 55, peso: 33.33, tercero: "Interna", terceroNombre: "Líder del Proyecto de Liquidación", fechaLimite: "2026-07-31", docRequerido: "Borrador dictaminado del Informe Final de Extinción", driveUrl: "" },
        { id: "ACT-J3", panel: "J", area: "Asuntos Internos Líder Proyecto", hito: "Coordinación Institucional SCUL", accion: "Vínculo permanente con el Despacho de la Secretaría de Cultura.", responsable: "Secretaría de Cultura / Líder Proy.", estatus: "Concluido", avance: 100, peso: 33.33, tercero: "Tercero Estatal", terceroNombre: "Despacho Titular Secretaría de Cultura", fechaLimite: "2025-11-30", docRequerido: "Oficios de validación de continuidad de recintos", driveUrl: "https://drive.google.com" }
    ];

    // 2. INICIALIZACIÓN Y PERSISTENCIA LOCAL
    let accionesDataset = JSON.parse(localStorage.getItem('secul_30_acciones')) || ACCIONES_INICIALES;

    function guardarDatos() {
        localStorage.setItem('secul_30_acciones', JSON.stringify(accionesDataset));
    }

    // 3. MOTOR DE CÁLCULO EN CASCADA
    function calcularMetricas() {
        const paneles = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];
        const metricasPorArea = {};
        let sumaAvancesAreas = 0;
        let totalDocsAcreditados = 0;
        let semaforoConteo = { enTiempo: 0, porVencer: 0, vencidos: 0, salvedadArt6: 0 };

        const hoy = new Date();

        paneles.forEach(p => {
            const accionesPanel = accionesDataset.filter(a => a.panel === p);
            let avanceArea = 0;

            accionesPanel.forEach(act => {
                // Cálculo ponderado
                avanceArea += (act.avance * (act.peso / 100));

                if (act.driveUrl && act.driveUrl.trim() !== '') {
                    totalDocsAcreditados++;
                }

                // Evaluación del Semáforo
                const fechaLim = new Date(act.fechaLimite);
                const diffDias = Math.ceil((fechaLim - hoy) / (1000 * 60 * 60 * 24));

                if (act.avance === 100) {
                    semaforoConteo.enTiempo++;
                    act.semaforoColor = "verde";
                    act.semaforoTexto = "Concluido Oficial";
                } else if (diffDias > 15) {
                    semaforoConteo.enTiempo++;
                    act.semaforoColor = "verde";
                    act.semaforoTexto = `En Tiempo (${diffDias}d restantes)`;
                } else if (diffDias >= 0 && diffDias <= 15) {
                    semaforoConteo.porVencer++;
                    act.semaforoColor = "amarillo";
                    act.semaforoTexto = `Por Vencer (${diffDias}d)`;
                } else {
                    // diffDias < 0 (Vencido)
                    if (act.tercero !== "Interna") {
                        semaforoConteo.salvedadArt6++;
                        act.semaforoColor = "ambar-art6";
                        act.semaforoTexto = `En Espera de Tercero: ${act.terceroNombre} (Art. 6)`;
                    } else {
                        semaforoConteo.vencidos++;
                        act.semaforoColor = "rojo";
                        act.semaforoTexto = `Vencido (${Math.abs(diffDias)}d retraso interno)`;
                    }
                }
            });

            metricasPorArea[p] = Math.round(avanceArea);
            sumaAvancesAreas += avanceArea;
        });

        const avanceGlobalPonderado = Math.round(sumaAvancesAreas / paneles.length);

        return {
            avanceGlobal: avanceGlobalPonderado,
            metricasPorArea: metricasPorArea,
            docsAcreditados: totalDocsAcreditados,
            docsTotales: accionesDataset.length,
            semaforo: semaforoConteo
        };
    }

    // 4. API PÚBLICA DEL MOTOR
    window.SeculEngine = {
        obtenerAcciones: () => accionesDataset,
        obtenerAccionesPorPanel: (panel) => accionesDataset.filter(a => a.panel === panel),
        calcularMetricas: calcularMetricas,
        
        actualizarAccion: function(idAccion, nuevoAvance, nuevoEstatus, urlDrive) {
            const act = accionesDataset.find(a => a.id === idAccion);
            if (!act) return false;

            act.avance = parseInt(nuevoAvance);
            act.estatus = nuevoEstatus;
            if (urlDrive) act.driveUrl = urlDrive;

            guardarDatos();
            return true;
        },

        resetearValoresOficiales: function() {
            accionesDataset = ACCIONES_INICIALES;
            guardarDatos();
        }
    };

})(window);
