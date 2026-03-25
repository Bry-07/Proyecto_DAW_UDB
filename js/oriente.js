// =============================================
// oriente.js
// Manejo de la página Zona Oriente:
//   - Arreglo de edificios con datos en objetos JS
//   - Renderizado dinámico de tarjetas en el DOM
//   - Filtrado por categoría
//   - JS no invasivo (sin código en el HTML)
// =============================================

document.addEventListener("DOMContentLoaded", () => {

    // =============================================
    // ARREGLO PRINCIPAL: edificiosOriente
    // Cada elemento es un objeto con los datos del edificio
    // =============================================
    const edificiosOriente = [
        {
            id:          "edif-a",
            nombre:      "Edificio A",
            categoria:   "academico",
            descripcion: "Edificio principal de aulas y oficinas administrativas de la UDB. Salones equipados con tecnología moderna.",
            enlace:      "../oriente/edif-a.html",
            icono:       "fas fa-building",
            imagenes:    ["../img_mapa/IMG_4406 1.svg", "../img_mapa/IMG_4411 1.svg", "../img_mapa/IMG_4414 1.svg"]
        },
        {
            id:          "edif-b",
            nombre:      "Edificio B",
            categoria:   "academico",
            descripcion: "Laboratorios especializados y aulas para carreras de ingeniería y computación.",
            enlace:      "../oriente/edif-b.html",
            icono:       "fas fa-building",
            imagenes:    ["../img_mapa/edif_b_1.jpg"]
        },
        {
            id:          "edif-c",
            nombre:      "Edificio C",
            categoria:   "academico",
            descripcion: "Instalaciones modernas para clases de distintas facultades de la UDB.",
            enlace:      "../oriente/edif-c.html",
            icono:       "fas fa-building",
            imagenes:    ["../img_mapa/edif_c_1.jpg"]
        },
        {
            id:          "edif-cdiu",
            nombre:      "Centro de Desarrollo e Innovación (CDIU)",
            categoria:   "investigacion",
            descripcion: "Centro de investigación e innovación tecnológica. Espacio para proyectos de emprendimiento y desarrollo.",
            enlace:      "../oriente/edif-cdiu.html",
            icono:       "fas fa-flask",
            imagenes:    ["../img_mapa/cdiu_1.jpg"]
        },
        {
            id:          "biblioteca",
            nombre:      "Biblioteca",
            categoria:   "servicio",
            descripcion: "Miles de libros físicos, acceso a recursos digitales y salas de estudio grupales.",
            enlace:      "../oriente/edif-biblio.html",
            icono:       "fas fa-book",
            imagenes:    ["../img_mapa/biblioteca_1.jpg", "../img_mapa/biblioteca_2.jpg"]
        },
        {
            id:          "vivienda-salesiana",
            nombre:      "Vivienda Salesiana",
            categoria:   "institucional",
            descripcion: "Residencia de los padres salesianos. Centro de la vida espiritual e institucional del campus.",
            enlace:      "../oriente/edif-viviendaS.html",
            icono:       "fas fa-home",
            imagenes:    ["../img_mapa/salesiana_1.jpg", "../img_mapa/salesiana_2.jpg"]
        },
        {
            id:          "edif-pinacoteca",
            nombre:      "Edificio Rafael Meza Ayau",
            categoria:   "cultura",
            descripcion: "Alberga la Pinacoteca de la UDB con obras de artistas salvadoreños y actividades culturales.",
            enlace:      "../oriente/edif-pinacoteca.html",
            icono:       "fas fa-palette",
            imagenes:    ["../img_mapa/rma_1.jpg"]
        },
        {
            id:          "capilla",
            nombre:      "Capilla UDB",
            categoria:   "institucional",
            descripcion: "Espacio de reflexión, fe y espiritualidad de la comunidad salesiana y universitaria.",
            enlace:      "../oriente/capilla.html",
            icono:       "fas fa-church",
            imagenes:    ["../img_mapa/capilla_1.jpg"]
        },
        {
            id:          "edif-r",
            nombre:      "Edificio R",
            categoria:   "academico",
            descripcion: "Aulas y espacios académicos para diversas carreras de la Universidad Don Bosco.",
            enlace:      "../oriente/edif-r.html",
            icono:       "fas fa-building",
            imagenes:    ["../img_mapa/edif_r_1.jpg"]
        },
        {
            id:          "centro-pastoral",
            nombre:      "Centro de Pastoral",
            categoria:   "institucional",
            descripcion: "Centro dedicado a la formación humana, espiritual y salesiana del campus universitario.",
            enlace:      "../oriente/edif-CPastoral.html",
            icono:       "fas fa-hands-praying",
            imagenes:    ["../img_mapa/pastoral_1.jpg"]
        },
        {
            id:          "magna-a",
            nombre:      "Magna A",
            categoria:   "auditorio",
            descripcion: "Auditorio para eventos académicos, conferencias y actividades culturales de gran formato.",
            enlace:      "../oriente/edif-magnaA.html",
            icono:       "fas fa-microphone",
            imagenes:    ["../img_mapa/magna_a_1.jpg"]
        },
        {
            id:          "magna-b",
            nombre:      "Magna B",
            categoria:   "auditorio",
            descripcion: "Auditorio para conferencias, graduaciones y actividades universitarias de gran capacidad.",
            enlace:      "../oriente/edif-magnaB.html",
            icono:       "fas fa-microphone",
            imagenes:    ["../img_mapa/magna_b_1.jpg"]
        },
        {
            id:          "edif-profesores",
            nombre:      "Edificio de Profesores",
            categoria:   "academico",
            descripcion: "Cubículos y oficinas para el cuerpo docente de la Universidad Don Bosco.",
            enlace:      "../oriente/edif-profesores.html",
            icono:       "fas fa-chalkboard-teacher",
            imagenes:    ["../img_mapa/profesores_1.jpg"]
        },
        {
            id:          "centro-repro",
            nombre:      "Centro de Reproducción",
            categoria:   "servicio",
            descripcion: "Centro de impresión y reproducción de materiales académicos para estudiantes y docentes.",
            enlace:      "../oriente/centroR.html",
            icono:       "fas fa-print",
            imagenes:    ["../img_mapa/repro_1.jpg"]
        },
        {
            id:          "comedor-profe",
            nombre:      "Comedor de Profesores",
            categoria:   "servicio",
            descripcion: "Área de alimentación exclusiva para el personal docente y administrativo.",
            enlace:      "../oriente/comedor1.html",
            icono:       "fas fa-utensils",
            imagenes:    ["../img_mapa/comedor_profe_1.jpg"]
        },
        {
            id:          "multigim",
            nombre:      "Multigimnasio UDB",
            categoria:   "deportivo",
            descripcion: "Instalaciones deportivas para toda la comunidad: canchas, gimnasio y áreas recreativas.",
            enlace:      "../oriente/edif-gym.html",
            icono:       "fas fa-dumbbell",
            imagenes:    ["../img_mapa/multigim_1.jpg"]
        }
    ]; // Fin edificiosOriente

    // =============================================
    // ARREGLO DE CATEGORÍAS para los botones de filtro
    // =============================================
    const categoriasOriente = [
        { valor: "todos",         etiqueta: "Todos"          },
        { valor: "academico",     etiqueta: "Académico"      },
        { valor: "auditorio",     etiqueta: "Auditorios"     },
        { valor: "servicio",      etiqueta: "Servicios"      },
        { valor: "institucional", etiqueta: "Institucional"  },
        { valor: "investigacion", etiqueta: "Investigación"  },
        { valor: "cultura",       etiqueta: "Cultura"        },
        { valor: "deportivo",     etiqueta: "Deportivo"      }
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
            <h1 class="zona-titulo"><i class="fas fa-map-marked-alt"></i> Zona Oriente</h1>
            <p class="zona-subtitulo">Explora los edificios, servicios e instalaciones de la Zona Oriente del campus UDB.</p>
        </div>
    `;
    main.appendChild(header);

    // Contenedor de filtros
    const filtroWrapper = document.createElement('div');
    filtroWrapper.classList.add('filtro-wrapper');
    filtroWrapper.id = 'filtro-oriente';
    main.appendChild(filtroWrapper);

    // Contador
    const contador = document.createElement('p');
    contador.classList.add('contador-resultados');
    contador.id = 'contador-oriente';
    main.appendChild(contador);

    // Grilla de tarjetas
    const grilla = document.createElement('div');
    grilla.classList.add('edificios-grid');
    grilla.id = 'grilla-oriente';
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
        if (categoria === "todos") return edificiosOriente;
        return edificiosOriente.filter(e => e.categoria === categoria);
    }

    // =============================================
    // FUNCIÓN: generarBotonesFiltro
    // Genera dinámicamente los botones desde el arreglo de categorías
    // =============================================
    function generarBotonesFiltro() {
        filtroWrapper.innerHTML = '';
        categoriasOriente.forEach(cat => {
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
    renderizarTarjetas(edificiosOriente);

}); // Fin DOMContentLoaded