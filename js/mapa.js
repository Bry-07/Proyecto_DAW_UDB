/* =============================================
   ARCHIVO: mapa.js
   
   DESCRIPCIÓN GENERAL:
   Maneja un mapa SVG interactivo de la UDB.
   Cuando haces clic (o hover en desktop) en un edificio,
   aparece un cuadro con información, fotos y detalles.
   
   USA:
   - jQuery para efectos, eventos y manipulación del DOM
   - AJAX ($.getJSON) para cargar los datos desde edificios.json
   - JavaScript puro para lógica del carrusel
   ============================================= */

/* =============================================
   EVENT: DOMContentLoaded
   
   QUÉ HACE:
   Espera a que TODO el HTML esté cargado
   ANTES de ejecutar el código JavaScript.
   
   POR QUÉ:
   Si el JS corre antes de cargar el HTML,
   no encontrará los elementos del mapa
   (SVG, botones, etc.) y dará error.
   ============================================= */
document.addEventListener("DOMContentLoaded", () => {

    /* =============================================
       OBJETO: datosEdificios
       
       QUÉ CONTIENE:
       Un objeto grande con 28 edificios diferentes.
       
       ESTRUCTURA DE CADA EDIFICIO:
       "Edif_A": {         ← La clave es el ID del <path> en el SVG
           nombre: "...",           ← Nombre que se muestra
           imagenes: [...],         ← Array de rutas de fotos
           descripcion: "...",      ← Texto descriptivo
           enlace: "..."            ← URL de la página de detalles
       }
       
       IMPORTANTE:
       La clave ("Edif_A", "Edif_B", etc.) DEBE coincidir
       EXACTAMENTE con el id del <path> en el archivo SVG.
       
       EJEMPLO:
       En el HTML/SVG hay: <path id="Edif_A" ...>
       En este JS hay:     "Edif_A": { nombre: "Edificio A", ... }
       
       Si NO coinciden, el cuadro no se mostrará.
       ============================================= */
    const datosEdificios = {

        // --------------------------------------------------
        // EDIFICIO A — Imágenes reales disponibles
        // --------------------------------------------------
        "Edif_A": {
            nombre: "Edificio B",
            imagenes: [
                "../img_mapa/IMG_4411 1.svg",
            ],
            descripcion: "Edificio B con laboratorios y aulas especializadas.",
             enlace: "../oriente/edif-b.html"
        },

        // --------------------------------------------------
        // EDIFICIO B
        // --------------------------------------------------
        "Edif_B": {
            nombre: "Edificio A",
            imagenes: [
                "../img_mapa/IMG_4406 1.svg",
                "../img_mapa/IMG_4414 1.svg",
                
            ],
            descripcion: "El Edificio A alberga aulas de clases y oficinas administrativas de la UDB.",
            enlace: "../oriente/edif-a.html"
        },

        // --------------------------------------------------
        // EDIFICIO C
        // --------------------------------------------------
        "Edif_C": {
            nombre: "Edificio C",
            imagenes: [
                "../img_mapa/IMG_4457 1.svg",
                "../img_mapa/IMG_4448 1.svg",
            ],
            descripcion: "Edificio C con instalaciones modernas para clases.",
            enlace: "../oriente/edif-c.html"
        },

        // --------------------------------------------------
        // EDIFICIO CDIU — Centro de Desarrollo e Innovación
        // --------------------------------------------------
        "Edif_CDIU": {
            nombre: "Centro de Desarrollo e Innovación UDB",
            imagenes: [
                "../img_mapa/0e5d1a263f68ee03850a80f688c136b0_XL 1.svg",
            ],
            descripcion: "Centro de investigación e innovación tecnológica de la UDB.",
            enlace: "../oriente/edif-cdiu.html"
        },

        // --------------------------------------------------
        // BIBLIOTECA
        // --------------------------------------------------
        "Biblioteca": {
            nombre: "Biblioteca",
            imagenes: [
                "../img_mapa/IMG_4374 1.svg",
            ],
            descripcion: "La biblioteca universitaria con miles de libros y recursos digitales.",
            enlace: "../oriente/edif-biblio.html"
        },

        // --------------------------------------------------
        // VIVIENDA SALESIANA
        // --------------------------------------------------
        "Vivienda_Salesiana": {
            nombre: "Vivienda Salesiana",
            imagenes: [
                "../img_mapa/IMG_4339 1.svg",
            ],
            descripcion: "Residencia de los padres salesianos dentro del campus.",
            enlace: "../oriente/edif-viviendaS.html"
        },

        // --------------------------------------------------
        // EDIFICIO RAFAEL MEZA AYAU
        // --------------------------------------------------
        "Edif_Rafael_Meza_Ayau": {
            nombre: "Edificio Rafael Meza Ayau",
            imagenes: [
                "../img_mapa/IMG_4356 1.svg",
                "../img_mapa/IMG_4354 1.svg",
                "../img_mapa/IMG_4351 1.svg",
            ],
            descripcion: "Edificio dedicado a actividades académicas y culturales.",
            enlace: "../oriente/edif-pinacoteca.html"
        },

        // --------------------------------------------------
        // IGLESIA / CAPILLA
        // --------------------------------------------------
        "Igle": {
            nombre: "Capilla UDB",
            imagenes: [
                "../img_mapa/IMG_4425 1.svg",
                "../img_mapa/IMG_4429 1.svg",
                "../img_mapa/IMG_4428 1.svg",
                "../img_mapa/IMG_4423 1.svg",
                "../img_mapa/IMG_4420 1.svg",
            ],
            descripcion: "Espacio de reflexión y espiritualidad de la comunidad salesiana.",
            enlace: "../oriente/capilla.html"
        },

        // --------------------------------------------------
        // EDIFICIO R
        // --------------------------------------------------
        "Edif_R": {
            nombre: "Edificio R",
            imagenes: [
                "../img_mapa/IMG_4405 1.svg", 
                "../img_mapa/IMG_4404 1.svg",
            ],
            descripcion: "Edificio R con aulas y espacios académicos.",
            enlace: "../oriente/edif-r.html"
        },

        // --------------------------------------------------
        // CENTRO DE PASTORAL
        // --------------------------------------------------
        "Centro_de_Pastoral": {
            nombre: "Centro de Pastoral",
            imagenes: [
                "../img_mapa/IMG_4433 1.svg",
            ],
            descripcion: "Centro dedicado a la formación humana y espiritual del campus.",
            enlace: "../oriente/edif-CPastoral.html"
        },

        // --------------------------------------------------
        // MAGNA A
        // --------------------------------------------------
        "Magna_A": {
            nombre: "Magna A",
            imagenes: [
                "../img_mapa/IMG_4473 1.svg",
            ],
            descripcion: "Auditorio Magna A para eventos académicos y culturales.",
            enlace: "../oriente/edif-magnaA.html"
        },

        // --------------------------------------------------
        // MAGNA B
        // --------------------------------------------------
        "Magna_B": {
            nombre: "Magna B",
            imagenes: [
                "../img_mapa/IMG_4459 1.svg",
                "../img_mapa/IMG_4472 1.svg",
            ],
            descripcion: "Auditorio Magna B para conferencias y actividades universitarias.",
            enlace: "../oriente/edif-magnaB.html"
        },

        // --------------------------------------------------
        // MAGNA C
        // --------------------------------------------------
        "Magna_C": {
            nombre: "Magna C",
            imagenes: [
                "../img_mapa/IMG_5157 1.svg",
                "../img_mapa/IMG_5148 1.svg", 
                "../img_mapa/IMG_5146 1.svg",
            ],
            descripcion: "Auditorio Magna C, espacio para grandes eventos del campus.",
            enlace: "../occidente/edif-magnaC.html"
        },

        // --------------------------------------------------
        // EDIFICIO DE PROFESORES
        // --------------------------------------------------
        "Edif_Profesores": {
            nombre: "Edificio de Profesores",
            imagenes: [
                "../img_mapa/IMG_4295 1.svg",
                "../img_mapa/IMG_4436 1.svg",
                "../img_mapa/IMG_4437 1.svg",
                "../img_mapa/IMG_4441 1.svg",
            ],
            descripcion: "Edificio con cubículos y oficinas para el cuerpo docente.",
            enlace: "../oriente/edif-profesores.html"
        },

        // --------------------------------------------------
        // CENTRO DE REPRODUCCIÓN
        // --------------------------------------------------
        "Centro_de_Repro": {
            nombre: "Centro de Reproducción",
            imagenes: [
                "../img_mapa/IMG_4334 1.svg",
            ],
            descripcion: "Centro de reproducción de materiales académicos.",
            enlace: "../oriente/centroR.html"
        },

        // --------------------------------------------------
        // COMEDOR DE PROFESORES
        // --------------------------------------------------
        "Comedor_Profe": {
            nombre: "Comedor de Profesores",
            imagenes: [
                "../img_mapa/IMG_4299 1.svg",
            ],
            descripcion: "Área de alimentación exclusiva para el personal docente.",
            enlace: "../oriente/comedor1.html"
        },

        // --------------------------------------------------
        // MULTIGIMNASIO UDB
        // --------------------------------------------------
        "Multigim_UDB": {
            nombre: "Multigimnasio UDB",
            imagenes: [
                "../img_mapa/IMG_4336 1.svg",
            ],
            descripcion: "Instalaciones deportivas para toda la comunidad universitaria.",
            enlace: "../oriente/edif-gym.html"
        },

        // --------------------------------------------------
        // EDIFICIO 8
        // --------------------------------------------------
        "Edif_Ocho": {
            nombre: "Edificio 8",
            imagenes: [
                "../img_mapa/IMG_5151 1.svg",
                "../img_mapa/IMG_5150 1.svg",
            ],
            descripcion: "Edificio 8 con aulas y laboratorios especializados.",
            enlace: "../occidente/edif-8.html"
        },

        // --------------------------------------------------
        // EDIFICIO FACULTAD
        // --------------------------------------------------
        "Edif_Facul": {
            nombre: "Edificio de Facultades",
            imagenes: [
                "../img_mapa/IMG_5154 1.svg",
                "../img_mapa/IMG_5156 1.svg",
                "../img_mapa/IMG_5138 1.svg",
                "../img_mapa/IMG_5140 1.svg",
            ],
            descripcion: "Edificio principal de las facultades de la UDB.",
            enlace: "../occidente/edif-ciencias.html"
        },

        // --------------------------------------------------
        // EDIFICIO 2
        // --------------------------------------------------
        "Edif_Dos": {
            nombre: "Edificio 2",
            imagenes: [
                "../img_mapa/IMG_5179 1.svg",
                "../img_mapa/IMG_5195 1.svg",
                "../img_mapa/IMG_5200 1.svg",
            ],
            descripcion: "Edificio 2 con aulas y servicios académicos.",
            enlace: "../occidente/edif-2.html"
        },

        // --------------------------------------------------
        // EDIFICIO 3
        // --------------------------------------------------
        "Edif_Tres": {
            nombre: "Edificio 3",
            imagenes: [
                "../img_mapa/IMG_5176 1.svg",
                "../img_mapa/IMG_5204 1.svg",
            ],
            descripcion: "Edificio 3 con laboratorios y aulas de la UDB.",
            enlace: "../occidente/edif-3.html"
        },

        // --------------------------------------------------
        // EDIFICIO 4
        // --------------------------------------------------
        "Edif_Cuatro": {
            nombre: "Edificio 4",
            imagenes: [
                "../img_mapa/IMG_5177 1.svg",
                "../img_mapa/IMG_5175 1.svg",
            ],
            descripcion: "Edificio 4 con instalaciones académicas modernas.",
            enlace: "../occidente/edif-4.html"
        },

        // --------------------------------------------------
        // EDIFICIO 5
        // --------------------------------------------------
        "Edif_Cinco": {
            nombre: "Edificio 5",
            imagenes: [
                "../img_mapa/IMG_5167 1.svg",
                "../img_mapa/IMG_5159 1.svg",
            ],
            descripcion: "Edificio 5 con aulas especializadas.",
            enlace: "../occidente/edif-5.html"
        },

        // --------------------------------------------------
        // EDIFICIO 6
        // --------------------------------------------------
        "Edif_Seis": {
            nombre: "Edificio 6",
            imagenes: [
                "../img_mapa/IMG_5162 1.svg",
                "../img_mapa/IMG_5164 1.svg",
                "../img_mapa/IMG_5160 1.svg",
            ],
            descripcion: "Edificio 6 con laboratorios y aulas de clases.",
            enlace: "../occidente/edif-6.html"
        },

        // --------------------------------------------------
        // EDIFICIO 7
        // --------------------------------------------------
        "Edif_Siete": {
            nombre: "Edificio 7",
            imagenes: [
                "../img_mapa/IMG_5136 1.svg",
            ],
            descripcion: "Edificio 7 con instalaciones para actividades académicas.",
            enlace: "../occidente/edif-7.html"
        },

        // --------------------------------------------------
        // OWCC
        // --------------------------------------------------
        "OWCC": {
            nombre: "OWCC",
            imagenes: [
                "../img_mapa/IMG_5210 1.svg",
                "../img_mapa/IMG_5209 1.svg",
                "../img_mapa/IMG_5173 1.svg",
            ],
            descripcion: "Centro de actividades y servicios estudiantiles.",
            enlace: "../occidente/OWCC.html"
        },

        // --------------------------------------------------
        // OMM
        // --------------------------------------------------
        "OMM": {
            nombre: "OMM",
            imagenes: [
                "../img_mapa/IMG_5212 1.svg",
                "../img_mapa/IMG_5213 1.svg",
            ],
            descripcion: "Edificio OMM de la Universidad Don Bosco.",
            enlace: "../occidente/observatorio.html"
        },

        // --------------------------------------------------
        // ALMACÉN GENERAL
        // --------------------------------------------------
        "Almacen_General": {
            nombre: "Almacén General",
            imagenes: [
                "../img_mapa/IMG_5273 1.svg",
                "../img_mapa/IMG_5271 1.svg",
            ],
            descripcion: "Almacén general de materiales y recursos del campus.",
            enlace: "../occidente/almacén.html"
        },

        // --------------------------------------------------
        // AVIÓN / HANGAR
        // --------------------------------------------------
        "Avion": {
            nombre: "Hangar - Facultad de Aeronáutica",
            imagenes: [
                "../img_mapa/IMG_5276 1.svg",
            ],
            descripcion: "Instalaciones de la Facultad de Ingeniería Aeronáutica.",
            enlace: "../occidente/hangar.html"
        },

        // --------------------------------------------------
        // COMEDOR EDIFICIO 6
        // --------------------------------------------------
        "Comedor_Edif_Seis": {
            nombre: "Cafetería Zona Occidente",
            imagenes: [
                "../img_mapa/IMG_5219 1.svg",
            ],
            descripcion: "Cafetería principal de la zona occidente del campus.",
            enlace: "../occidente/comedor2.html"
        },

        // --------------------------------------------------
        // PLAZA BANDERAS
        // --------------------------------------------------
        "Plaza_Bande": {
            nombre: "Plaza de las Banderas",
            imagenes: [
                "../img_mapa/IMG_4416 1.svg",
                "../img_mapa/IMG_4417 1.svg",
                "../img_mapa/IMG_4418 1.svg",
            ],
            descripcion: "Plaza central con las banderas de El Salvador y la UDB.",
            enlace: "../occidente/banderas.html"
        },

        // --------------------------------------------------
        // CARRO 
        // --------------------------------------------------
        "Carro": {
            nombre: "Carrito de la Inge",
            imagenes: [
                "../img_mapa/WhatsApp Image 2026-05-03 at 12.23.51 PM 1.svg",
            ],
            descripcion: "Carro de la Inge.",
            enlace: "../occidente/banderas.html"
        },

        // --------------------------------------------------
        // CARRO2 
        // --------------------------------------------------
        "Carro2": {
            nombre: "Carrito de la Inge 2",
            imagenes: [
                "../img_mapa/WhatsApp Image 2026-05-03 at 12.23.51 PM (1) 1 (1).svg",
            ],
            descripcion: "Carro de la Inge.",
            enlace: "../occidente/banderas.html"
        }

        

    }; // ← CIERRE del objeto datosEdificios

    /* =============================================
       VARIABLES: Control del carrusel
       ============================================= */
    let indiceImagenActual = 0;
    let imagenesActuales   = [];
    let intervaloCarrusel  = null;

    /* =============================================
       REFERENCIAS AL DOM (con jQuery)
       ============================================= */
    const $infoContainer = $('#info-container');
    const $mapaContainer = $('.mapa-container');

    /* =============================================
       CONSTRUCCIÓN DINÁMICA del cuadro de información
       ============================================= */
    $infoContainer.html(`
        <button id="btn-cerrar">✕</button>
        <h3 id="info-nombre">Nombre del edificio</h3>
        <div id="carrusel">
            <button id="btn-anterior">&#8249;</button>
            <img id="info-imagen" src="" alt="Imagen del edificio" />
            <button id="btn-siguiente">&#8250;</button>
            <div id="indicadores"></div>
        </div>
        <p id="info-descripcion">Descripción del edificio.</p>
        <a id="btn-ver-mas" href="#">Ver más información</a>
    `);

    /* =============================================
       REFERENCIAS a elementos creados (jQuery)
       ============================================= */
    const $btnCerrar    = $('#btn-cerrar');
    const $infoNombre   = $('#info-nombre');
    const $infoImagen   = $('#info-imagen');
    const $infoDesc     = $('#info-descripcion');
    const $btnVerMas    = $('#btn-ver-mas');
    const $btnAnterior  = $('#btn-anterior');
    const $btnSiguiente = $('#btn-siguiente');
    const $indicadores  = $('#indicadores');

    // =============================================
    // FUNCIÓN: mostrarImagen
    // Muestra la imagen con fadeOut/fadeIn de jQuery
    // =============================================
    function mostrarImagen(indice) {
        $infoImagen.fadeOut(200, function () {
            $(this).attr('src', imagenesActuales[indice]).fadeIn(200);
        });

        $indicadores.find('.punto').each(function (i) {
            $(this).toggleClass('activo', i === indice);
        });
    }

    // =============================================
    // FUNCIÓN: crearIndicadores
    // =============================================
    function crearIndicadores(totalImagenes) {
        $indicadores.empty();
        for (let i = 0; i < totalImagenes; i++) {
            const $punto = $('<span>').addClass('punto');
            $punto.on('click', (function (idx) {
                return function () {
                    indiceImagenActual = idx;
                    mostrarImagen(indiceImagenActual);
                };
            })(i));
            $indicadores.append($punto);
        }
    }

    // =============================================
    // FUNCIÓN: iniciarAutoCarrusel
    // =============================================
    function iniciarAutoCarrusel() {
        if (intervaloCarrusel) clearInterval(intervaloCarrusel);
        if (imagenesActuales.length > 1) {
            intervaloCarrusel = setInterval(function () {
                indiceImagenActual = (indiceImagenActual === imagenesActuales.length - 1)
                    ? 0
                    : indiceImagenActual + 1;
                mostrarImagen(indiceImagenActual);
            }, 3000);
        }
    }

    // =============================================
    // FUNCIÓN: detenerAutoCarrusel
    // =============================================
    function detenerAutoCarrusel() {
        if (intervaloCarrusel) {
            clearInterval(intervaloCarrusel);
            intervaloCarrusel = null;
        }
    }

    // =============================================
    // FUNCIÓN: navegarCarrusel
    // =============================================
    function navegarCarrusel(direccion) {
        if (direccion === 'anterior') {
            indiceImagenActual = (indiceImagenActual === 0)
                ? imagenesActuales.length - 1
                : indiceImagenActual - 1;
        } else {
            indiceImagenActual = (indiceImagenActual === imagenesActuales.length - 1)
                ? 0
                : indiceImagenActual + 1;
        }
        mostrarImagen(indiceImagenActual);
        iniciarAutoCarrusel();
    }

    // =============================================
    // FUNCIÓN: posicionarCuadro
    // =============================================
    function posicionarCuadro(rectEdificio) {
        const rectMapa = $mapaContainer[0].getBoundingClientRect();

        let posTop  = rectEdificio.top - rectMapa.top - $infoContainer.outerHeight() - 10;
        let posLeft = rectEdificio.left - rectMapa.left
                    + (rectEdificio.width / 2)
                    - ($infoContainer.outerWidth() / 2);

        if (posTop < 0) posTop = rectEdificio.bottom - rectMapa.top + 10;
        if (posLeft < 0) posLeft = 5;

        const anchoCuadro = $infoContainer.outerWidth();
        const anchoMapa   = $mapaContainer.outerWidth();
        if (posLeft + anchoCuadro > anchoMapa) posLeft = anchoMapa - anchoCuadro - 5;

        $infoContainer.css({ top: posTop + 'px', left: posLeft + 'px' });
    }

    // =============================================
    // FUNCIÓN: mostrarInfoEdificio
    // Usa jQuery para animar la aparición del cuadro con slideDown
    // =============================================
    function mostrarInfoEdificio(datos, rectEdificio) {
        $infoNombre.text(datos.nombre);
        $infoDesc.text(datos.descripcion);
        $btnVerMas.attr('href', datos.enlace);

        imagenesActuales   = datos.imagenes;
        indiceImagenActual = 0;

        crearIndicadores(imagenesActuales.length);
        mostrarImagen(0);

        const hayVarias = imagenesActuales.length > 1;
        $btnAnterior.toggle(hayVarias);
        $btnSiguiente.toggle(hayVarias);

        // Muestra invisible para medir, luego posiciona y anima con jQuery
        $infoContainer.css({ display: 'block', visibility: 'hidden', opacity: 0 });
        posicionarCuadro(rectEdificio);
        $infoContainer.css('visibility', 'visible').animate({ opacity: 1 }, 250);

        iniciarAutoCarrusel();
    }

    // =============================================
    // FUNCIÓN: cerrarCuadro
    // Usa jQuery fadeOut para ocultar el cuadro
    // =============================================
    function cerrarCuadro() {
        $infoContainer.fadeOut(200);
        $('path').removeClass('seleccionado');
        detenerAutoCarrusel();
    }

    // =============================================
    // EVENT LISTENERS DEL CARRUSEL (jQuery)
    // =============================================
    $btnAnterior.on('click', function () { navegarCarrusel('anterior'); });
    $btnSiguiente.on('click', function () { navegarCarrusel('siguiente'); });
    $btnCerrar.on('click', cerrarCuadro);

    // Clic fuera del cuadro → cerrar
    $(document).on('click', cerrarCuadro);

    // Clic dentro del cuadro → NO cerrar
    $infoContainer.on('click', function (e) { e.stopPropagation(); });

    // =============================================
    // FUNCIÓN: esMobile
    // =============================================
    function esMobile() {
        return $(window).width() <= 768;
    }

    // =============================================
    // FUNCIÓN: activarEdificio
    // =============================================
    function activarEdificio($edificio, datosEdificios) {
        $('path').removeClass('seleccionado');
        $edificio.addClass('seleccionado');

        const datos = datosEdificios[$edificio.attr('id')];
        if (!datos) return;

        mostrarInfoEdificio(datos, $edificio[0].getBoundingClientRect());
    }

    // =============================================
    // FUNCIÓN: asignarEventosEdificios
    // =============================================
    function asignarEventosEdificios(datosEdificios) {
        // Elimina eventos anteriores y reasigna
        $('path').off('click mouseover');

        $('path').each(function () {
            const $edificio = $(this);

            if (esMobile()) {
                $edificio.on('click', function (e) {
                    e.stopPropagation();
                    activarEdificio($edificio, datosEdificios);
                });
            } else {
                $edificio.on('mouseover', function () {
                    activarEdificio($edificio, datosEdificios);
                });
                $edificio.on('click', function (e) {
                    e.stopPropagation();
                    activarEdificio($edificio, datosEdificios);
                });
            }
        });
    }

    // =============================================
    // RESIZE: reasigna eventos al cambiar tamaño
    // =============================================
    $(window).on('resize', function () {
        cerrarCuadro();
        // datosEdificios ya están en el closure del $.getJSON
        // Se reasignan mediante la variable guardada abajo
        if (window._datosEdificiosUDB) {
            asignarEventosEdificios(window._datosEdificiosUDB);
        }
    });

    /* =============================================
       AJAX: Carga los datos desde edificios.json
       usando $.getJSON (jQuery + AJAX)
       
       FLUJO:
       1. Hace petición GET a ../js/edificios.json
       2. jQuery parsea el JSON automáticamente
       3. Se llama a asignarEventosEdificios con los datos
       4. Si falla, muestra error en consola
       ============================================= */
    $.getJSON('../js/edificios.json')
        .done(function (datosEdificios) {
            // Guarda en variable global para poder reasignar en resize
            window._datosEdificiosUDB = datosEdificios;
            // Inicializa los eventos con los datos cargados
            asignarEventosEdificios(datosEdificios);
        })
        .fail(function (jqXHR, textStatus, errorThrown) {
            console.error('Error al cargar edificios.json:', textStatus, errorThrown);
        });

}); // Fin $(document).ready