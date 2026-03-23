// =============================================
// INICIO DEL SCRIPT: Espera a que el DOM esté cargado
// =============================================
document.addEventListener("DOMContentLoaded", () => {

    // =============================================
    // DATOS DE CADA EDIFICIO
    // Aquí defines: imágenes, descripción y enlace
    // =============================================
    const datosEdificios = {
        "Edif_A": {
            nombre: "Edificio A",
            imagenes: [
                "../img_mapa/IMG_4406 1.svg",
                "../img_mapa/IMG_4411 1.svg",
                "../img_mapa/IMG_4414 1.svg",
            ],
            descripcion: "El Edificio A alberga aulas de clases y oficinas administrativas.",
            enlace: "paginas/edif-a.html"  // link 
        },
        "Vivienda_Salesiana": {
            nombre: "Vivienda Salesiana",
            imagenes: [
                "../img_mapa/salesiana_1.jpg",
                "../img_mapa/salesiana_2.jpg"
            ],
            descripcion: "Residencia de los padres salesianos dentro del campus.",
            enlace: "paginas/vivienda-salesiana.html"
        },
        "Biblioteca": {
            nombre: "Biblioteca",
            imagenes: [
                "../img_mapa/biblioteca_1.jpg",
                "../img_mapa/biblioteca_2.jpg"
            ],
            descripcion: "La biblioteca universitaria con miles de libros y recursos digitales.",
            enlace: "paginas/biblioteca.html"
        },
        "Edif_Rafael_Meza_Ayau": {
            nombre: "Edificio Rafael Meza Ayau",
            imagenes: [
                "../img_mapa/rma_1.jpg"
            ],
            descripcion: "Edificio dedicado a actividades académicas y culturales.",
            enlace: "paginas/edif-rma.html"
        },
        "Edif_B": {
            nombre: "Edificio B",
            imagenes: [
                "../img_mapa/edif_b_1.jpg"
            ],
            descripcion: "Edificio B con laboratorios y aulas especializadas.",
            enlace: "paginas/edif-b.html"
        },
        "Edif_C": {
            nombre: "Edificio C",
            imagenes: [
                "../img_mapa/edif_c_1.jpg"
            ],
            descripcion: "Edificio C con instalaciones modernas para clases.",
            enlace: "paginas/edif-c.html"
        },
        "Edif_CDIU": {
            nombre: "Centro de Desarrollo e Innovación UDB",
            imagenes: [
                "../img_mapa/cdiu_1.jpg"
            ],
            descripcion: "Centro de investigación e innovación tecnológica.",
            enlace: "paginas/cdiu.html"
        },
        "Multigim_UDB": {
            nombre: "Multigimnasio UDB",
            imagenes: [
                "../img_mapa/multigim_1.jpg"
            ],
            descripcion: "Instalaciones deportivas para toda la comunidad universitaria.",
            enlace: "paginas/multigim.html"
        }
       
    };

    // =============================================
    // VARIABLES PARA CONTROLAR EL CARRUSEL DE IMÁGENES
    // indiceImagenActual: Indica cuál imagen del carrusel se está mostrando actualmente (empieza en 0)
    // imagenesActuales: Array que contiene las rutas de las imágenes del edificio seleccionado
    // =============================================
    let indiceImagenActual = 0; // Qué imagen estamos viendo (0 = primera)
    let imagenesActuales = [];  // Las imágenes del edificio seleccionado

    // =============================================
    // OBTENEMOS LOS ELEMENTOS DEL HTML QUE NECESITAMOS MANIPULAR
    // infoContainer: El contenedor principal del cuadro de información
    // mapaContainer: El contenedor del mapa SVG
    // edificios: Todos los elementos <path> del SVG que representan los edificios
    // =============================================
    const infoContainer = document.getElementById('info-container');
    const mapaContainer = document.querySelector('.mapa-container');
    const edificios = document.querySelectorAll('path');

    // =============================================
    // CONSTRUIMOS EL CONTENIDO DEL CUADRO DE INFORMACIÓN DINÁMICAMENTE
    // Usamos innerHTML para crear la estructura HTML del popup con todos sus elementos:
    // - Botón de cerrar
    // - Título del edificio
    // - Carrusel con botones de navegación, imagen y indicadores
    // - Descripción
    // - Enlace "Ver más"
    // =============================================
    infoContainer.innerHTML = `
        <!-- Botón para cerrar el cuadro -->
        <button id="btn-cerrar">✕</button>

        <!-- Nombre del edificio -->
        <h3 id="info-nombre">Nombre del edificio</h3>

        <!-- CARRUSEL DE IMÁGENES -->
        <div id="carrusel">
            <!-- Botón para ir a la imagen anterior -->
            <button id="btn-anterior">&#8249;</button>

            <!-- La imagen que se muestra -->
            <img id="info-imagen" src="" alt="Imagen del edificio" />

            <!-- Botón para ir a la siguiente imagen -->
            <button id="btn-siguiente">&#8250;</button>

            <!-- Puntos indicadores (uno por imagen) -->
            <div id="indicadores"></div>
        </div>

        <!-- Descripción del edificio -->
        <p id="info-descripcion">Descripción del edificio.</p>

        <!-- Botón para ir al sitio del edificio -->
        <a id="btn-ver-mas" href="#">Ver más información</a>
    `;

    // =============================================
    // OBTENEMOS REFERENCIAS A LOS ELEMENTOS RECIÉN CREADOS DENTRO DEL CUADRO
    // Estos elementos se usarán para actualizar el contenido dinámicamente
    // =============================================
    const btnCerrar     = document.getElementById('btn-cerrar');
    const infoNombre    = document.getElementById('info-nombre');
    const infoImagen    = document.getElementById('info-imagen');
    const infoDesc      = document.getElementById('info-descripcion');
    const btnVerMas     = document.getElementById('btn-ver-mas');
    const btnAnterior   = document.getElementById('btn-anterior');
    const btnSiguiente  = document.getElementById('btn-siguiente');
    const indicadores   = document.getElementById('indicadores');

    // =============================================
    // FUNCIÓN: mostrarImagen
    // Actualiza la imagen visible en el carrusel y resalta el indicador correspondiente
    // Parámetro: indice - el número de la imagen a mostrar (basado en 0)
    // =============================================
    function mostrarImagen(indice) {
        // Cambia la fuente de la imagen al archivo correspondiente
        infoImagen.src = imagenesActuales[indice];

        // Actualiza los puntos indicadores: quita la clase 'activo' de todos y la pone solo en el actual
        const puntos = indicadores.querySelectorAll('.punto');
        puntos.forEach((punto, i) => {
            punto.classList.toggle('activo', i === indice);
        });
    }

    // =============================================
    // FUNCIÓN: crearIndicadores
    // Crea los puntos indicadores del carrusel (uno por cada imagen)
    // Cada punto es clickeable para saltar directamente a esa imagen
    // Parámetro: totalImagenes - número total de imágenes en el carrusel
    // =============================================
    function crearIndicadores(totalImagenes) {
        // Limpiamos cualquier indicador anterior
        indicadores.innerHTML = '';

        // Creamos un punto por cada imagen
        for (let i = 0; i < totalImagenes; i++) {
            const punto = document.createElement('span');
            punto.classList.add('punto');

            // Al hacer clic en un punto, cambiamos a esa imagen
            punto.addEventListener('click', () => {
                indiceImagenActual = i;
                mostrarImagen(indiceImagenActual);
            });

            // Agregamos el punto al contenedor de indicadores
            indicadores.appendChild(punto);
        }
    }

    // =============================================
    // EVENT LISTENERS PARA LOS BOTONES DEL CARRUSEL
    // Controlan la navegación entre imágenes: anterior y siguiente
    // =============================================

    // Botón flecha izquierda (imagen anterior)
    // Si estamos en la primera imagen, va a la última (ciclo infinito)
    btnAnterior.addEventListener('click', () => {
        if (indiceImagenActual === 0) {
            indiceImagenActual = imagenesActuales.length - 1; // Va a la última
        } else {
            indiceImagenActual--; // Va a la anterior
        }
        mostrarImagen(indiceImagenActual); // Actualiza la vista
    });

    // Botón flecha derecha (imagen siguiente)
    // Si estamos en la última imagen, vuelve a la primera
    btnSiguiente.addEventListener('click', () => {
        if (indiceImagenActual === imagenesActuales.length - 1) {
            indiceImagenActual = 0; // Vuelve a la primera
        } else {
            indiceImagenActual++; // Va a la siguiente
        }
        mostrarImagen(indiceImagenActual); // Actualiza la vista
    });

    // =============================================
    // EVENT LISTENER PARA EL BOTÓN DE CERRAR
    // Oculta el cuadro de información y quita el resaltado de los edificios
    // =============================================
    btnCerrar.addEventListener('click', () => {
        infoContainer.style.display = 'none'; // Esconde el cuadro
        edificios.forEach(e => e.classList.remove('seleccionado')); // Quita resaltado
    });

    // =============================================
    // FUNCIÓN PRINCIPAL: MANEJADOR DE CLIC EN EDIFICIOS
    // Se ejecuta cuando el usuario hace clic en cualquier edificio del mapa
    // Muestra el cuadro de información correspondiente
    // =============================================
    edificios.forEach(edificio => {
        edificio.addEventListener('click', (evento) => {

            // Detenemos que el clic se "propague" al documento (evita cerrar el cuadro inmediatamente)
            evento.stopPropagation();

            // Quitamos el resaltado visual de todos los edificios
            edificios.forEach(e => e.classList.remove('seleccionado'));

            // Agregamos resaltado al edificio clickeado
            edificio.classList.add('seleccionado');

            // Buscamos los datos del edificio usando su ID como clave
            const datos = datosEdificios[edificio.id];

            // Si no hay datos definidos para este edificio, salimos de la función
            if (!datos) return;

            // ---- LLENAMOS EL CUADRO CON LA INFORMACIÓN DEL EDIFICIO ----
            infoNombre.textContent = datos.nombre; // Nombre del edificio
            infoDesc.textContent = datos.descripcion; // Descripción
            btnVerMas.href = datos.enlace; // Enlace al sitio

            // Guardamos las imágenes del edificio y reiniciamos el índice del carrusel
            imagenesActuales = datos.imagenes;
            indiceImagenActual = 0;

            // Creamos los puntos indicadores basados en el número de imágenes
            crearIndicadores(imagenesActuales.length);

            // Mostramos la primera imagen del carrusel
            mostrarImagen(0);

            // Ocultamos las flechas de navegación si solo hay una imagen
            if (imagenesActuales.length <= 1) {
                btnAnterior.style.display = 'none';
                btnSiguiente.style.display = 'none';
            } else {
                btnAnterior.style.display = 'block'; // Mostramos flechas si hay múltiples imágenes
                btnSiguiente.style.display = 'block';
            }

            // ---- POSICIONAMOS EL CUADRO CERCA DEL EDIFICIO CLICKEADO ----

            // Primero mostramos el cuadro temporalmente invisible para medir su tamaño
            infoContainer.style.display = 'block';
            infoContainer.style.visibility = 'hidden';

            // Obtenemos las posiciones del edificio y del mapa en la pantalla
            const rectEdificio = edificio.getBoundingClientRect();
            const rectMapa = mapaContainer.getBoundingClientRect();

            // Calculamos la posición relativa al mapa
            // Intentamos colocar el cuadro ENCIMA del edificio
            let posTop  = rectEdificio.top  - rectMapa.top  - infoContainer.offsetHeight - 10;
            let posLeft = rectEdificio.left - rectMapa.left + (rectEdificio.width / 2) - (infoContainer.offsetWidth / 2);

            // Si el cuadro se saldría por ARRIBA de la pantalla, lo ponemos DEBAJO
            if (posTop < 0) {
                posTop = rectEdificio.bottom - rectMapa.top + 10;
            }

            // Si se sale por la IZQUIERDA, lo ajustamos al borde izquierdo
            if (posLeft < 0) {
                posLeft = 5;
            }

            // Si se sale por la DERECHA, lo ajustamos al borde derecho
            const anchoCuadro = infoContainer.offsetWidth;
            const anchoMapa = mapaContainer.offsetWidth;
            if (posLeft + anchoCuadro > anchoMapa) {
                posLeft = anchoMapa - anchoCuadro - 5;
            }

            // Aplicamos las posiciones calculadas
            infoContainer.style.top  = posTop  + 'px';
            infoContainer.style.left = posLeft + 'px';

            // Finalmente, hacemos el cuadro visible
            infoContainer.style.visibility = 'visible';
        });
    });

    // =============================================
    // EVENT LISTENER PARA CERRAR EL CUADRO AL HACER CLIC FUERA DE ÉL
    // Si el usuario hace clic en cualquier parte del documento (excepto el cuadro), se cierra
    // =============================================
    document.addEventListener('click', () => {
        infoContainer.style.display = 'none'; // Oculta el cuadro
        edificios.forEach(e => e.classList.remove('seleccionado')); // Quita resaltado
    });

    // =============================================
    // EVENT LISTENER PARA EVITAR QUE EL CLIC DENTRO DEL CUADRO LO CIERRE
    // Previene que el clic en el cuadro se propague al documento y lo cierre accidentalmente
    // =============================================
    infoContainer.addEventListener('click', (evento) => {
        evento.stopPropagation(); // Detiene la propagación del evento
    });

}); // Fin del event listener de DOMContentLoaded
