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

$(document).ready(function () {

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