// =============================================
// INICIO DEL SCRIPT: Espera a que el DOM esté cargado
// =============================================
document.addEventListener("DOMContentLoaded", () => {

    // =============================================
    // ARREGLO PRINCIPAL DE EDIFICIOS
    // Cada edificio es un objeto con:
    //   - nombre: nombre visible en el cuadro de info
    //   - imagenes: arreglo con las rutas de las fotos del carrusel
    //   - descripcion: texto corto que describe el edificio
    //   - enlace: ruta a la página de detalle del edificio
    // La clave de cada objeto coincide con el id del <path> en el SVG
    // =============================================
    const datosEdificios = {

        // --------------------------------------------------
        // EDIFICIO A — Imágenes reales disponibles
        // --------------------------------------------------
        "Edif_A": {
            nombre: "Edificio A",
            imagenes: [
                "../img_mapa/IMG_4406 1.svg",
                "../img_mapa/IMG_4411 1.svg",
                "../img_mapa/IMG_4414 1.svg"
            ],
            descripcion: "El Edificio A alberga aulas de clases y oficinas administrativas de la UDB.",
            enlace: "../oriente/edif-a.html"
        },

        // --------------------------------------------------
        // EDIFICIO B
        // --------------------------------------------------
        "Edif_B": {
            nombre: "Edificio B",
            imagenes: [
                "../img_mapa/edif_b_1.jpg"
            ],
            descripcion: "Edificio B con laboratorios y aulas especializadas.",
            enlace: "../oriente/edif-b.html"
        },

        // --------------------------------------------------
        // EDIFICIO C
        // --------------------------------------------------
        "Edif_C": {
            nombre: "Edificio C",
            imagenes: [
                "../img_mapa/edif_c_1.jpg"
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
                "../img_mapa/cdiu_1.jpg"
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
                "../img_mapa/biblioteca_1.jpg",
                "../img_mapa/biblioteca_2.jpg"
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
                "../img_mapa/salesiana_1.jpg",
                "../img_mapa/salesiana_2.jpg"
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
                "../img_mapa/rma_1.jpg"
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
                "../img_mapa/capilla_1.jpg"
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
                "../img_mapa/edif_r_1.jpg"
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
                "../img_mapa/pastoral_1.jpg"
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
                "../img_mapa/magna_a_1.jpg"
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
                "../img_mapa/magna_b_1.jpg"
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
                "../img_mapa/magna_c_1.jpg"
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
                "../img_mapa/profesores_1.jpg"
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
                "../img_mapa/repro_1.jpg"
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
                "../img_mapa/comedor_profe_1.jpg"
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
                "../img_mapa/multigim_1.jpg"
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
                "../img_mapa/edif_8_1.jpg"
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
                "../img_mapa/facul_1.jpg"
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
                "../img_mapa/edif_2_1.jpg"
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
                "../img_mapa/edif_3_1.jpg"
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
                "../img_mapa/edif_4_1.jpg"
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
                "../img_mapa/edif_5_1.jpg"
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
                "../img_mapa/edif_6_1.jpg"
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
                "../img_mapa/edif_7_1.jpg"
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
                "../img_mapa/owcc_1.jpg"
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
                "../img_mapa/omm_1.jpg"
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
                "../img_mapa/almacen_1.jpg"
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
                "../img_mapa/avion_1.jpg"
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
                "../img_mapa/cafeteria_occ_1.jpg"
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
                "../img_mapa/plaza_banderas_1.jpg"
            ],
            descripcion: "Plaza central con las banderas de El Salvador y la UDB.",
            enlace: "../occidente/banderas.html"
        }

    }; // Fin del objeto datosEdificios

    // =============================================
    // VARIABLES PARA CONTROLAR EL CARRUSEL DE IMÁGENES
    // indiceImagenActual: índice de la imagen visible (empieza en 0)
    // imagenesActuales: arreglo de rutas del edificio seleccionado
    // intervaloCarrusel: guarda el temporizador para poder detenerlo cuando se cierra el cuadro
    // =============================================
    let indiceImagenActual = 0;
    let imagenesActuales   = [];
    let intervaloCarrusel  = null; // Temporizador del carrusel automático

    // =============================================
    // REFERENCIAS A ELEMENTOS DEL DOM
    // =============================================
    const infoContainer = document.getElementById('info-container');
    const mapaContainer = document.querySelector('.mapa-container');
    const edificios     = document.querySelectorAll('path');

    // =============================================
    // CONSTRUCCIÓN DINÁMICA DEL CUADRO DE INFORMACIÓN
    // Se crea una sola vez y se rellena con JS cada vez que el usuario hace clic
    // =============================================
    infoContainer.innerHTML = `
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
    `;

    // Referencias a los elementos del cuadro recién creado
    const btnCerrar   = document.getElementById('btn-cerrar');
    const infoNombre  = document.getElementById('info-nombre');
    const infoImagen  = document.getElementById('info-imagen');
    const infoDesc    = document.getElementById('info-descripcion');
    const btnVerMas   = document.getElementById('btn-ver-mas');
    const btnAnterior = document.getElementById('btn-anterior');
    const btnSiguiente= document.getElementById('btn-siguiente');
    const indicadores = document.getElementById('indicadores');

    // =============================================
    // FUNCIÓN: mostrarImagen
    // Muestra la imagen con efecto fade suave y actualiza los puntos indicadores
    // @param {number} indice - posición de la imagen en el arreglo imagenesActuales
    // =============================================
    function mostrarImagen(indice) {
        // Efecto fade: desvanece la imagen, cambia la fuente, vuelve a mostrar
        infoImagen.style.opacity = '0';
        setTimeout(() => {
            infoImagen.src = imagenesActuales[indice];
            infoImagen.style.opacity = '1';
        }, 200);

        // Actualiza cuál punto está activo
        const puntos = indicadores.querySelectorAll('.punto');
        puntos.forEach((punto, i) => {
            punto.classList.toggle('activo', i === indice);
        });
    }

    // =============================================
    // FUNCIÓN: crearIndicadores
    // Genera un punto por cada imagen del carrusel
    // Al hacer clic en un punto, salta a esa imagen
    // @param {number} totalImagenes - cantidad de imágenes del edificio
    // =============================================
    function crearIndicadores(totalImagenes) {
        indicadores.innerHTML = ''; // Limpia indicadores anteriores

        for (let i = 0; i < totalImagenes; i++) {
            const punto = document.createElement('span');
            punto.classList.add('punto');

            // Clic en el punto → ir a esa imagen
            punto.addEventListener('click', () => {
                indiceImagenActual = i;
                mostrarImagen(indiceImagenActual);
            });

            indicadores.appendChild(punto);
        }
    }

    // =============================================
    // FUNCIÓN: iniciarAutoCarrusel
    // Inicia el paso automático de imágenes cada 3 segundos
    // Detiene cualquier intervalo anterior antes de iniciar uno nuevo
    // =============================================
    function iniciarAutoCarrusel() {
        // Detiene el intervalo anterior si existe
        if (intervaloCarrusel) clearInterval(intervaloCarrusel);

        // Solo inicia el auto-avance si hay más de una imagen
        if (imagenesActuales.length > 1) {
            intervaloCarrusel = setInterval(() => {
                // Avanza a la siguiente imagen de forma cíclica
                indiceImagenActual = (indiceImagenActual === imagenesActuales.length - 1)
                    ? 0
                    : indiceImagenActual + 1;
                mostrarImagen(indiceImagenActual);
            }, 3000); // Cambia cada 3 segundos
        }
    }

    // =============================================
    // FUNCIÓN: detenerAutoCarrusel
    // Detiene el carrusel automático (al cerrar el cuadro o al navegar manualmente)
    // =============================================
    function detenerAutoCarrusel() {
        if (intervaloCarrusel) {
            clearInterval(intervaloCarrusel);
            intervaloCarrusel = null;
        }
    }

    // =============================================
    // FUNCIÓN: navegarCarrusel
    // Avanza o retrocede en el carrusel de forma cíclica
    // Al navegar manualmente se reinicia el temporizador automático
    // @param {string} direccion - 'anterior' o 'siguiente'
    // =============================================
    function navegarCarrusel(direccion) {
        if (direccion === 'anterior') {
            // Si estamos en la primera, va a la última
            indiceImagenActual = (indiceImagenActual === 0)
                ? imagenesActuales.length - 1
                : indiceImagenActual - 1;
        } else {
            // Si estamos en la última, vuelve a la primera
            indiceImagenActual = (indiceImagenActual === imagenesActuales.length - 1)
                ? 0
                : indiceImagenActual + 1;
        }
        mostrarImagen(indiceImagenActual);

        // Reinicia el temporizador para que cuente desde cero tras la acción manual
        iniciarAutoCarrusel();
    }

    // =============================================
    // FUNCIÓN: posicionarCuadro
    // Calcula y aplica la posición del cuadro de info cerca del edificio clicado,
    // asegurándose de que no se salga de los bordes del mapa
    // @param {DOMRect} rectEdificio - posición del edificio en pantalla
    // =============================================
    function posicionarCuadro(rectEdificio) {
        const rectMapa = mapaContainer.getBoundingClientRect();

        // Intenta colocar el cuadro encima del edificio
        let posTop  = rectEdificio.top  - rectMapa.top  - infoContainer.offsetHeight - 10;
        let posLeft = rectEdificio.left - rectMapa.left
                    + (rectEdificio.width  / 2)
                    - (infoContainer.offsetWidth / 2);

        // Si se sale por arriba → lo pone debajo
        if (posTop < 0) {
            posTop = rectEdificio.bottom - rectMapa.top + 10;
        }

        // Si se sale por la izquierda → ajusta al borde
        if (posLeft < 0) posLeft = 5;

        // Si se sale por la derecha → ajusta al borde
        const anchoCuadro = infoContainer.offsetWidth;
        const anchoMapa   = mapaContainer.offsetWidth;
        if (posLeft + anchoCuadro > anchoMapa) {
            posLeft = anchoMapa - anchoCuadro - 5;
        }

        infoContainer.style.top  = posTop  + 'px';
        infoContainer.style.left = posLeft + 'px';
    }

    // =============================================
    // FUNCIÓN: mostrarInfoEdificio
    // Rellena y muestra el cuadro de información de un edificio
    // @param {object} datos - objeto del edificio desde datosEdificios
    // @param {DOMRect} rectEdificio - posición del edificio clicado
    // =============================================
    function mostrarInfoEdificio(datos, rectEdificio) {
        // Rellena el cuadro con los datos del edificio
        infoNombre.textContent = datos.nombre;
        infoDesc.textContent   = datos.descripcion;
        btnVerMas.href         = datos.enlace;

        // Carga las imágenes del carrusel
        imagenesActuales   = datos.imagenes;
        indiceImagenActual = 0;

        crearIndicadores(imagenesActuales.length);
        mostrarImagen(0);

        // Muestra u oculta las flechas según la cantidad de imágenes
        const hayVariasImagenes = imagenesActuales.length > 1;
        btnAnterior.style.display  = hayVariasImagenes ? 'block' : 'none';
        btnSiguiente.style.display = hayVariasImagenes ? 'block' : 'none';

        // Muestra el cuadro invisible para poder medir su tamaño
        infoContainer.style.display    = 'block';
        infoContainer.style.visibility = 'hidden';

        // Posiciona y muestra el cuadro
        posicionarCuadro(rectEdificio);
        infoContainer.style.visibility = 'visible';

        // Inicia el paso automático de imágenes
        iniciarAutoCarrusel();
    }

    // =============================================
    // FUNCIÓN: cerrarCuadro
    // Oculta el cuadro de información, quita el resaltado y detiene el carrusel
    // =============================================
    function cerrarCuadro() {
        infoContainer.style.display = 'none';
        edificios.forEach(e => e.classList.remove('seleccionado'));
        detenerAutoCarrusel(); // Detiene el temporizador al cerrar
    }

    // =============================================
    // EVENT LISTENERS DEL CARRUSEL
    // =============================================
    btnAnterior.addEventListener('click',  () => navegarCarrusel('anterior'));
    btnSiguiente.addEventListener('click', () => navegarCarrusel('siguiente'));

    // =============================================
    // EVENT LISTENER: Cerrar al hacer clic en la X
    // =============================================
    btnCerrar.addEventListener('click', cerrarCuadro);

    // =============================================
    // EVENT LISTENER: Clic en cada edificio del SVG
    // Al hacer clic se resalta el edificio y se muestra su información
    // =============================================
    edificios.forEach(edificio => {
        edificio.addEventListener('click', (evento) => {
            evento.stopPropagation(); // Evita que se propague y cierre el cuadro

            // Quita resaltado de todos y agrega al clicado
            edificios.forEach(e => e.classList.remove('seleccionado'));
            edificio.classList.add('seleccionado');

            // Busca los datos del edificio por su id
            const datos = datosEdificios[edificio.id];
            if (!datos) return; // Si no hay datos, no hace nada

            // Muestra el cuadro con la info y el carrusel
            mostrarInfoEdificio(datos, edificio.getBoundingClientRect());
        });
    });

    // =============================================
    // EVENT LISTENER: Clic fuera del cuadro → cerrar
    // =============================================
    document.addEventListener('click', cerrarCuadro);

    // =============================================
    // EVENT LISTENER: Clic dentro del cuadro → NO cerrar
    // Evita que el clic en el popup se propague al document
    // =============================================
    infoContainer.addEventListener('click', (evento) => {
        evento.stopPropagation();
    });

}); // Fin DOMContentLoaded