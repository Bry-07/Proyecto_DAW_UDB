// =============================================
// ARCHIVO: oriente.js
// PROPÓSITO: Manejo completo de la página de Zona Oriente
// FUNCIONALIDADES:
//   - Arreglo de edificios con datos almacenados como objetos JS
//   - Renderizado dinámico: todo el contenido se genera desde JavaScript
//   - Sistema de filtrado: muestra edificios por categoría seleccionada
//   - JS no invasivo: NO hay código JavaScript mezclado en el HTML
// ESTRUCTURA:
//   1. Array de edificios (edificiosOriente)
//   2. Array de categorías para filtros (categoriasOriente)
//   3. Funciones que crean y muestran contenido en el DOM
//   4. Event listeners para la interactividad
// =============================================

// Espera a que el HTML esté completamente cargado antes de ejecutar el código
// Esto asegura que los elementos del DOM (como .main-content) existan
document.addEventListener("DOMContentLoaded", () => {

    // =============================================
    // ARREGLO PRINCIPAL: edificiosOriente
    // Base de datos de todos los edificios/instalaciones de Zona Oriente
    // Cada elemento es un objeto con las siguientes propiedades:
    //   - id: identificador único del edificio
    //   - nombre: nombre que se muestra al usuario
    //   - categoria: clasificación (academico, servicio, investigacion, etc.)
    //   - descripcion: texto explicativo que aparece en la tarjeta
    //   - enlace: URL a la página de detalles del edificio
    //   - icono: clase del icono Font Awesome que se muestra
    //   - imagenes: array de rutas de fotos (preparado para futuras expansiones)
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
    // Cada objeto contiene:
    //   - valor: el identificador usado en data-filtro (debe coincidir con categoría en edificios)
    //   - etiqueta: el texto que se muestra en el botón al usuario
    // Usado por generarBotonesFiltro() para crear los botones dinámicamente
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
    // SELECCIÓN DE ELEMENTO DEL DOM
    // =============================================
    // Obtiene el contenedor principal donde irá todo el contenido
    // Viene del HTML base.html con clase .main-content
    // Acá se agregarán: header, filtros, contador y grilla de tarjetas
    const main = document.querySelector('.main-content');

    // =============================================
    // CONSTRUCCIÓN DINÁMICA DEL CONTENIDO
    // El código crea TODOS los elementos HTML desde JavaScript
    // Nó hay código HTML directo en archivos .html
    // Ventajas: reutilizable, fácil de mantener, sin duplicación
    // =============================================

    // PASO 1: Crear y agregar el HEADER (título de la zona)
    // Este es el encabezado visual con el título "Zona Oriente"
    // Incluye un icono de mapa y un subtítulo explicativo
    const header = document.createElement('section');
    header.classList.add('zona-header');
    header.innerHTML = `
        <div class="zona-titulo-wrapper">
            <h1 class="zona-titulo"><i class="fas fa-map-marked-alt"></i> Zona Oriente</h1>
            <p class="zona-subtitulo">Explora los edificios, servicios e instalaciones de la Zona Oriente del campus UDB.</p>
        </div>
    `;
    main.appendChild(header);

    // PASO 2: Crear contenedor para los BOTONES DE FILTRO
    // Los botones se generan dinámicamente por generarBotonesFiltro()
    // El usuario puede hacer clic para filtrar por categoría
    const filtroWrapper = document.createElement('div');
    filtroWrapper.classList.add('filtro-wrapper');
    filtroWrapper.id = 'filtro-oriente';
    main.appendChild(filtroWrapper);

    // PASO 3: Crear contador de resultados
    // Muestra cuántos edificios se están mostrando (ej: "Mostrando 5 edificios")
    // Se actualiza cada vez que se aplica un filtro
    const contador = document.createElement('p');
    contador.classList.add('contador-resultados');
    contador.id = 'contador-oriente';
    main.appendChild(contador);

    // PASO 4: Crear la GRILLA (grid) para las tarjetas de edificios
    // Acá se mostrarán todas las tarjetas de edificios
    // Se limpiará y rellenará cada vez que se aplica un filtro
    const grilla = document.createElement('div');
    grilla.classList.add('edificios-grid');
    grilla.id = 'grilla-oriente';
    main.appendChild(grilla);

    // =============================================
    // FUNCIÓN: crearTarjeta
    // Crea una tarjeta de edificio en formato HTML
    // Recibe un objeto edificio con todos sus datos
    // Retorna un elemento <article> con estilo y contenido
    // Los atributos data-* se usan para filtrado posterior
    // @param {object} edificio - Objeto con id, nombre, categoría, etc.
    // @returns {HTMLElement} - Element <article> listo para insertar en el DOM
    // =============================================
    function crearTarjeta(edificio) {
        const tarjeta = document.createElement('article');
        tarjeta.classList.add('edificio-card');
        // Atributos data-* se usan para filtrado y selección por CSS/JS
        tarjeta.setAttribute('data-categoria', edificio.categoria); // Para filtrar
        tarjeta.setAttribute('data-id', edificio.id);               // Para identificar únicamente
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

    function renderizarTarjetas(lista) {
        // Limpia la grilla: borra todas las tarjetas anteriores
        grilla.innerHTML = '';
        
        // Si la lista viene vacía (no hay edificios en esa categoría)
        if (lista.length === 0) {
            // Muestra un mensaje de "no se encontraron resultados"
            grilla.innerHTML = `<p class="sin-resultados"><i class="fas fa-search"></i> No se encontraron edificios en esta categoría.</p>`;
            // Limpia el contador (no muestra número si no hay resultados)
            contador.textContent = '';
            return; // Salir de la función
        }
        
        // Si hay edificios, actualiza el contador con la cantidad
        // Usa operador ternario para pluralizar correctamente (edificio vs edificios)
        contador.textContent = `Mostrando ${lista.length} edificio${lista.length !== 1 ? 's' : ''}`;
        
        // Recorre cada edificio en la lista
        // Para cada uno: crea una tarjeta con crearTarjeta() y la agrega a la grilla
        lista.forEach(edificio => grilla.appendChild(crearTarjeta(edificio)));
    }

    // =============================================
    // FUNCIÓN: filtrarPorCategoria
    // Busca en el arreglo edificiosOriente los edificios que coincidan con la categoría
    // Si la categoría es "todos", devuelve todos los edificios sin filtrar
    // Si es otra categoría, usa .filter() para devolver solo los que coincidan
    // @param {string} categoria - La categoría a filtrar (ej: "academico", "servicio")
    // @returns {Array} - Array filtrado de edificios que cumplen la categoría
    // =============================================
    function filtrarPorCategoria(categoria) {
        if (categoria === "todos") return edificiosOriente;
        return edificiosOriente.filter(e => e.categoria === categoria);
    }

    // =============================================
    // FUNCIÓN: generarBotonesFiltro
    // Crea todos los botones de filtro basándose en el arreglo categoriasOriente
    // Cada botón tiene un data-filtro con el valor de la categoría
    // El botón "Todos" inicia como activo (tiene clase .activo)
    // Al hacer clic en un botón:
    //   1. Desactiva todos los botones
    //   2. Activa el botón presionado
    //   3. Filtra los edificios según la categoría
    //   4. Renderiza solo los que coinciden
    // =============================================
    function generarBotonesFiltro() {
        filtroWrapper.innerHTML = '';
        categoriasOriente.forEach(cat => {
            const btn = document.createElement('button');
            btn.classList.add('btn-filtro');
            btn.setAttribute('data-filtro', cat.valor);
            btn.textContent = cat.etiqueta;
            if (cat.valor === "todos") btn.classList.add('activo');

            // Evento: al hacer clic en un botón de filtro
            btn.addEventListener('click', () => {
                // Quita la clase "activo" de TODOS los botones
                filtroWrapper.querySelectorAll('.btn-filtro').forEach(b => b.classList.remove('activo'));
                // Agrega la clase "activo" solo al botón que fue clickeado
                btn.classList.add('activo');
                // Filtra los edificios según la categoría y renderiza los resultados
                renderizarTarjetas(filtrarPorCategoria(cat.valor));
            });

            filtroWrapper.appendChild(btn);
        });
    }

    // =============================================
    // INICIALIZACIÓN - Se ejecuta cuando el DOM está listo
    // =============================================
    // 1. Genera todos los botones de filtro en el contenedor #filtro-oriente
    generarBotonesFiltro();
    // 2. Renderiza TODAS las tarjetas de edificios al cargar la página
    renderizarTarjetas(edificiosOriente);

}); // Fin DOMContentLoaded