// =============================================
// occidente.js
// Manejo de la página Zona Occidente:
//   - Arreglo de edificios con datos en objetos JS
//   - Renderizado dinámico de tarjetas en el DOM
//   - Filtrado por categoría
//   - JS no invasivo (sin código en el HTML)
// =============================================

document.addEventListener("DOMContentLoaded", () => {

    // =============================================
    // ARREGLO PRINCIPAL: edificiosOccidente
    // Cada elemento es un objeto con los datos del edificio
    // =============================================
    const edificiosOccidente = [
        {
            id:          "magna-c",
            nombre:      "Magna C",
            categoria:   "auditorio",
            descripcion: "Auditorio para grandes eventos, ceremonias y conferencias del campus UDB.",
            enlace:      "../occidente/edif-magnaC.html",
            icono:       "fas fa-microphone",
            imagenes:    ["../img_mapa/magna_c_1.jpg"]
        },
        {
            id:          "edif-8",
            nombre:      "Edificio 8",
            categoria:   "academico",
            descripcion: "Aulas y laboratorios especializados para carreras técnicas y de ingeniería.",
            enlace:      "../occidente/edif-8.html",
            icono:       "fas fa-building",
            imagenes:    ["../img_mapa/edif_8_1.jpg"]
        },
        {
            id:          "edif-facul",
            nombre:      "Edificio de Facultades",
            categoria:   "academico",
            descripcion: "Edificio principal de facultades. Alberga decanatos, coordinaciones académicas y aulas.",
            enlace:      "../occidente/edif-ciencias.html",
            icono:       "fas fa-university",
            imagenes:    ["../img_mapa/facul_1.jpg"]
        },
        {
            id:          "edif-2",
            nombre:      "Edificio 2",
            categoria:   "academico",
            descripcion: "Aulas y servicios académicos para distintas carreras de la Zona Occidente.",
            enlace:      "../occidente/edif-2.html",
            icono:       "fas fa-building",
            imagenes:    ["../img_mapa/edif_2_1.jpg"]
        },
        {
            id:          "edif-3",
            nombre:      "Edificio 3",
            categoria:   "academico",
            descripcion: "Laboratorios de cómputo y aulas especializadas de la UDB.",
            enlace:      "../occidente/edif-3.html",
            icono:       "fas fa-building",
            imagenes:    ["../img_mapa/edif_3_1.jpg"]
        },
        {
            id:          "edif-4",
            nombre:      "Edificio 4",
            categoria:   "academico",
            descripcion: "Instalaciones académicas modernas y laboratorios equipados.",
            enlace:      "../occidente/edif-4.html",
            icono:       "fas fa-building",
            imagenes:    ["../img_mapa/edif_4_1.jpg"]
        },
        {
            id:          "edif-5",
            nombre:      "Edificio 5",
            categoria:   "academico",
            descripcion: "Aulas especializadas y espacios de trabajo colaborativo.",
            enlace:      "../occidente/edif-5.html",
            icono:       "fas fa-building",
            imagenes:    ["../img_mapa/edif_5_1.jpg"]
        },
        {
            id:          "edif-6",
            nombre:      "Edificio 6",
            categoria:   "academico",
            descripcion: "Laboratorios de electrónica, mecánica y aulas de clases.",
            enlace:      "../occidente/edif-6.html",
            icono:       "fas fa-building",
            imagenes:    ["../img_mapa/edif_6_1.jpg"]
        },
        {
            id:          "edif-7",
            nombre:      "Edificio 7",
            categoria:   "academico",
            descripcion: "Instalaciones para actividades académicas y prácticas de laboratorio.",
            enlace:      "../occidente/edif-7.html",
            icono:       "fas fa-building",
            imagenes:    ["../img_mapa/edif_7_1.jpg"]
        },
        {
            id:          "owcc",
            nombre:      "OWCC",
            categoria:   "servicio",
            descripcion: "Centro de actividades y servicios estudiantiles. Punto de encuentro de la comunidad universitaria.",
            enlace:      "../occidente/OWCC.html",
            icono:       "fas fa-users",
            imagenes:    ["../img_mapa/owcc_1.jpg"]
        },
        {
            id:          "omm",
            nombre:      "Observatorio Meteorológico (OMM)",
            categoria:   "investigacion",
            descripcion: "Centro de investigación y monitoreo climático. Referente meteorológico del país.",
            enlace:      "../occidente/observatorio.html",
            icono:       "fas fa-cloud-sun",
            imagenes:    ["../img_mapa/omm_1.jpg"]
        },
        {
            id:          "almacen",
            nombre:      "Almacén General",
            categoria:   "servicio",
            descripcion: "Almacén general de materiales, equipos y recursos del campus universitario.",
            enlace:      "../occidente/almacén.html",
            icono:       "fas fa-warehouse",
            imagenes:    ["../img_mapa/almacen_1.jpg"]
        },
        {
            id:          "hangar",
            nombre:      "Hangar - Facultad de Aeronáutica",
            categoria:   "investigacion",
            descripcion: "Instalaciones de Ingeniería Aeronáutica con aviones reales y simuladores de vuelo.",
            enlace:      "../occidente/hangar.html",
            icono:       "fas fa-plane",
            imagenes:    ["../img_mapa/avion_1.jpg"]
        },
        {
            id:          "cafeteria-occ",
            nombre:      "Cafetería Zona Occidente",
            categoria:   "servicio",
            descripcion: "Cafetería principal de la Zona Occidente con opciones de alimentación para toda la comunidad.",
            enlace:      "../occidente/comedor2.html",
            icono:       "fas fa-utensils",
            imagenes:    ["../img_mapa/cafeteria_occ_1.jpg"]
        },
        {
            id:          "plaza-banderas",
            nombre:      "Plaza de las Banderas",
            categoria:   "institucional",
            descripcion: "Plaza central con las banderas de El Salvador y la UDB. Punto de referencia del campus.",
            enlace:      "../occidente/banderas.html",
            icono:       "fas fa-flag",
            imagenes:    ["../img_mapa/plaza_banderas_1.jpg"]
        }
    ]; // Fin edificiosOccidente

    // =============================================
    // ARREGLO DE CATEGORÍAS para los botones de filtro
    // =============================================
    const categoriasOccidente = [
        { valor: "todos",         etiqueta: "Todos"         },
        { valor: "academico",     etiqueta: "Académico"     },
        { valor: "auditorio",     etiqueta: "Auditorios"    },
        { valor: "servicio",      etiqueta: "Servicios"     },
        { valor: "institucional", etiqueta: "Institucional" },
        { valor: "investigacion", etiqueta: "Investigación" }
    ];

    // =============================================
    // REFERENCIA AL DOM
    // =============================================
    const main = document.querySelector('.main-content');

    // =============================================
    // CONSTRUCCIÓN DINÁMICA — todo el HTML lo genera el JS
    // =============================================

    // Header de zona
    const header = document.createElement('section');
    header.classList.add('zona-header');
    header.innerHTML = `
        <div class="zona-titulo-wrapper">
            <h1 class="zona-titulo"><i class="fas fa-map-marked-alt"></i> Zona Occidente</h1>
            <p class="zona-subtitulo">Explora los edificios, servicios e instalaciones de la Zona Occidente del campus UDB.</p>
        </div>
    `;
    main.appendChild(header);

    // Contenedor de filtros
    const filtroWrapper = document.createElement('div');
    filtroWrapper.classList.add('filtro-wrapper');
    filtroWrapper.id = 'filtro-occidente';
    main.appendChild(filtroWrapper);

    // Contador
    const contador = document.createElement('p');
    contador.classList.add('contador-resultados');
    contador.id = 'contador-occidente';
    main.appendChild(contador);

    // Grilla de tarjetas
    const grilla = document.createElement('div');
    grilla.classList.add('edificios-grid');
    grilla.id = 'grilla-occidente';
    main.appendChild(grilla);

    // =============================================
    // FUNCIÓN: crearTarjeta
    // Genera el HTML de una tarjeta desde el objeto del edificio
    // @param {object} edificio
    // @returns {HTMLElement}
    // =============================================
    function crearTarjeta(edificio) {
        const tarjeta = document.createElement('article');
        tarjeta.classList.add('edificio-card');
        tarjeta.setAttribute('data-categoria', edificio.categoria);
        tarjeta.setAttribute('data-id', edificio.id);
        tarjeta.innerHTML = `
            <div class="card-icono">
                <i class="${edificio.icono}"></i>
            </div>
            <div class="card-body">
                <h3 class="card-nombre">${edificio.nombre}</h3>
                <span class="card-categoria">${edificio.categoria}</span>
                <p class="card-descripcion">${edificio.descripcion}</p>
                <a href="${edificio.enlace}" class="card-btn">Ver más <i class="fas fa-arrow-right"></i></a>
            </div>
        `;
        return tarjeta;
    }

    // =============================================
    // FUNCIÓN: renderizarTarjetas
    // Inserta las tarjetas en la grilla usando el DOM
    // @param {Array} lista
    // =============================================
    function renderizarTarjetas(lista) {
        grilla.innerHTML = '';
        if (lista.length === 0) {
            grilla.innerHTML = `<p class="sin-resultados"><i class="fas fa-search"></i> No se encontraron edificios en esta categoría.</p>`;
            contador.textContent = '';
            return;
        }
        contador.textContent = `Mostrando ${lista.length} edificio${lista.length !== 1 ? 's' : ''}`;
        lista.forEach(edificio => grilla.appendChild(crearTarjeta(edificio)));
    }

    // =============================================
    // FUNCIÓN: filtrarPorCategoria
    // Filtra el arreglo según la categoría seleccionada
    // @param {string} categoria
    // @returns {Array}
    // =============================================
    function filtrarPorCategoria(categoria) {
        if (categoria === "todos") return edificiosOccidente;
        return edificiosOccidente.filter(e => e.categoria === categoria);
    }

    // =============================================
    // FUNCIÓN: generarBotonesFiltro
    // Genera dinámicamente los botones desde el arreglo de categorías
    // =============================================
    function generarBotonesFiltro() {
        filtroWrapper.innerHTML = '';
        categoriasOccidente.forEach(cat => {
            const btn = document.createElement('button');
            btn.classList.add('btn-filtro');
            btn.setAttribute('data-filtro', cat.valor);
            btn.textContent = cat.etiqueta;
            if (cat.valor === "todos") btn.classList.add('activo');

            btn.addEventListener('click', () => {
                filtroWrapper.querySelectorAll('.btn-filtro').forEach(b => b.classList.remove('activo'));
                btn.classList.add('activo');
                renderizarTarjetas(filtrarPorCategoria(cat.valor));
            });

            filtroWrapper.appendChild(btn);
        });
    }

    // =============================================
    // INICIALIZACIÓN
    // =============================================
    generarBotonesFiltro();
    renderizarTarjetas(edificiosOccidente);

}); // Fin DOMContentLoaded