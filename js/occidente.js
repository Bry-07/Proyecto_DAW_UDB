// =============================================
// ARCHIVO: occidente.js
// PROPÓSITO: Manejo completo de la página de Zona Occidente
// FUNCIONALIDADES:
//   - Arreglo de edificios con datos almacenados como objetos JS
//   - Renderizado dinámico: todo el contenido se genera desde JavaScript
//   - Sistema de filtrado: muestra edificios por categoría seleccionada
//   - JS no invasivo: NO hay código JavaScript mezclado en el HTML
// ESTRUCTURA:
//   1. Array de edificios (edificiosOccidente)
//   2. Array de categorías para filtros (categoriasOccidente)
//   3. Funciones que crean y muestran contenido en el DOM
//   4. Event listeners para la interactividad
// =============================================

// Espera a que el HTML esté completamente cargado antes de ejecutar el código
// Esto asegura que los elementos del DOM (como .main-content) existan
document.addEventListener("DOMContentLoaded", () => {

    // =============================================
    // ARREGLO PRINCIPAL: edificiosOccidente
    // Base de datos de todos los edificios/instalaciones de Zona Occidente
    // Cada elemento es un objeto con las siguientes propiedades:
    //   - id: identificador único del edificio
    //   - nombre: nombre que se muestra al usuario
    //   - categoria: clasificación (academico, servicio, investigacion, etc.)
    //   - descripcion: texto explicativo que aparece en la tarjeta
    //   - enlace: URL a la página de detalles del edificio
    //   - icono: clase del icono Font Awesome que se muestra
    //   - imagenes: array de rutas de fotos (preparado para futuras expansiones)
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
    // Cada objeto contiene:
    //   - valor: el identificador usado en data-filtro (debe coincidir con categoría en edificios)
    //   - etiqueta: el texto que se muestra en el botón al usuario
    // Usado por generarBotonesFiltro() para crear los botones dinámicamente
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
    // SELECCIÓN DE ELEMENTO DEL DOM
    // =============================================
    // Obtiene el contenedor principal donde irá todo el contenido
    // Viene del HTML base.html con clase .main-content
    // Acá se agregarán: header, filtros, contador y grilla de tarjetas
    const main = document.querySelector('.main-content');

    // =============================================
    // CONSTRUCCIÓN DINÁMICA DEL CONTENIDO
    // El código crea TODOS los elementos HTML desde JavaScript
    // NÓ hay código HTML directo en archivos .html
    // Ventajas: reutilizable, fácil de mantener, sin duplicación
    // =============================================

    // PASO 1: Crear y agregar el HEADER (título de la zona)
    // Este es el encabezado visual con el título "Zona Occidente"
    // Incluye un icono de mapa y un subtítulo explicativo
    const header = document.createElement('section');
    header.classList.add('zona-header');
    header.innerHTML = `
        <div class="zona-titulo-wrapper">
            <h1 class="zona-titulo"><i class="fas fa-map-marked-alt"></i> Zona Occidente</h1>
            <p class="zona-subtitulo">Explora los edificios, servicios e instalaciones de la Zona Occidente del campus UDB.</p>
        </div>
    `;
    main.appendChild(header);

    // PASO 2: Crear contenedor para los BOTONES DE FILTRO
    // Los botones se generan dinámicamente por generarBotonesFiltro()
    // El usuario puede hacer clic para filtrar por categoría
    const filtroWrapper = document.createElement('div');
    filtroWrapper.classList.add('filtro-wrapper');
    filtroWrapper.id = 'filtro-occidente';
    main.appendChild(filtroWrapper);

    // PASO 3: Crear contador de resultados
    // Muestra cuántos edificios se están mostrando (ej: "Mostrando 5 edificios")
    // Se actualiza cada vez que se aplica un filtro
    const contador = document.createElement('p');
    contador.classList.add('contador-resultados');
    contador.id = 'contador-occidente';
    main.appendChild(contador);

    // PASO 4: Crear la GRILLA (grid) para las tarjetas de edificios
    // Acá se mostrarán todas las tarjetas de edificios
    // Se limpiará y rellenará cada vez que se aplica un filtro
    const grilla = document.createElement('div');
    grilla.classList.add('edificios-grid');
    grilla.id = 'grilla-occidente';
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

    // =============================================
    // FUNCIÓN: renderizarTarjetas
    // Limpia la grilla y rellena con nuevas tarjetas
    // Si la lista está vacía, muestra un mensaje de "no hay resultados"
    // Actualiza el contador de resultados mostrando cuántos edificios hay
    // Se ejecuta cada vez que se aplica un filtro
    // @param {Array} lista - Array de edificios a mostrar
    // =============================================
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
    // Busca en el arreglo edificiosOccidente los edificios que coincidan con la categoría
    // Si la categoría es "todos", devuelve todos los edificios sin filtrar
    // Si es otra categoría, usa .filter() para devolver solo los que coincidan
    // @param {string} categoria - La categoría a filtrar (ej: "academico", "servicio")
    // @returns {Array} - Array filtrado de edificios que cumplen la categoría
    // =============================================
    function filtrarPorCategoria(categoria) {
        if (categoria === "todos") return edificiosOccidente;
        return edificiosOccidente.filter(e => e.categoria === categoria);
    }

    // =============================================
    // FUNCIÓN: generarBotonesFiltro
    // Crea todos los botones de filtro basándose en el arreglo categoriasOccidente
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
        categoriasOccidente.forEach(cat => {
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
    // 1. Genera todos los botones de filtro en el contenedor #filtro-occidente
    generarBotonesFiltro();
    // 2. Renderiza TODAS las tarjetas de edificios al cargar la página
    renderizarTarjetas(edificiosOccidente);

}); // Fin DOMContentLoaded