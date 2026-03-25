/* =============================================
   ARCHIVO: creadores.js
   
   DESCRIPCIÓN:
   Este archivo genera dinámicamente las tarjetas
   (cards) de los desarrolladores del proyecto.
   
   CÓMO FUNCIONA:
   1. Define un arreglo con objetos de desarrolladores
   2. Tiene una función que crea el HTML de cada card
   3. Tiene otra función que coloca todas las cards en la página
   4. Al cargar la página, ejecuta automáticamente
   
   VENTAJA:
   - Si quieres agregar un desarrollador, solo añades
     un objeto al arreglo. El HTML se genera solo.
   - No necesitas escribir el mismo HTML 5 veces
   ============================================= */

/* =============================================
   ARREGLO: desarrolladores
   
   QUÉ CONTIENE:
   Un array con 5 objetos, uno por cada desarrollador.
   
   CADA OBJETO TIENE 6 PROPIEDADES:
   
   1. nombre: El nombre completo del desarrollador
      Ej: "Bryan Ernesto Anaya Brizuela"
      
   2. carnet: El número de carnet universitario
      Ej: "AB250136"
      
   3. rol: Qué hace en el proyecto
      Ej: "Desarrollador"
      
   4. carrera: La carrera que estudia
      Ej: "Técnico en Ingeniería de Computación"
      
   5. foto: Ruta a la imagen de perfil
      Ej: "../img_creadores/AB250136.jpg"
      NOTA: ../ significa subir una carpeta
      
   6. color: Color hexadecimal único para cada card
      Ej: "#f4c107" (amarillo)
      Se usa en:
      - Línea superior de la card
      - Borde de la foto
      - Color del badge del rol
      
   TOTAL DE DESARROLLADORES: 5
   ============================================= */
const desarrolladores = [
    // DESARROLLADOR 1: Bryan
    {
        nombre:  "Bryan Ernesto Anaya Brizuela",  // Nombre completo del desarrollador
        carnet:  "AB250136",                       // Código del carnet (siglas + número)
        rol:     "Desarrollador",                  // Tu rol en el proyecto
        carrera: "Técnico en Ingeniería de Computación", // Tu carrera universitaria
        foto:    "../img_creadores/AB250136.jpg", // Ruta a la imagen (ubicada en carpeta img_creadores)
        color:   "#f4c107"                         // Color amarillo para esta card
    },
    
    // DESARROLLADOR 2: Concepción
    {
        nombre:  "Concepción Getsemaní Miranda Cuéllar", // Nombre
        carnet:  "MC250288",                             // Carnet
        rol:     "Desarrolladora",                       // Rol (femenino)
        carrera: "Técnico en Ingeniería de Computación", // Carrera
        foto:    "../img_creadores/MC250288.jpeg",      // Foto en formato JPEG
        color:   "#ff6b9d"                               // Color rosa
    },
    
    // DESARROLLADOR 3: Dania
    {
        nombre:  "Dania Merari Urias Viscarra",         // Nombre
        carnet:  "UV253195",                            // Carnet
        rol:     "Desarrolladora",                      // Rol
        carrera: "Técnico en Ingeniería de Computación", // Carrera
        foto:    "../img_creadores/UV253195.jpeg",     // Foto
        color:   "#a855f7"                              // Color púrpura
    },
    
    // DESARROLLADOR 4: Diego
    {
        nombre:  "Diego Alejandro Cortez Duran",                // Nombre
        carnet:  "CD231127",                                    // Carnet
        rol:     "Desarrollador",                               // Rol
        carrera: "Técnico e ingeniero en Ingeniería de Computación ", // Carrera (nota el espacio)
        foto:    "../img_creadores/CD231127.jpeg",             // Foto
        color:   "#22c55e"                                      // Color verde
    },
    
    // DESARROLLADOR 5: Ever
    {
        nombre:  "Ever Gabriel Cabezas Alfaro",         // Nombre
        carnet:  "CA240297",                            // Carnet
        rol:     "Desarrollador",                       // Rol
        carrera: "Técnico en Ingeniería de Computación", // Carrera
        foto:    "../img_creadores/CA240297.jpeg",     // Foto
        color:   "#38bdf8"                              // Color azul celeste
    }
];


/* =============================================
   FUNCIÓN: crearCardDesarrollador(dev, indice)
   
   PARÁMETROS:
   - dev: Un objeto del arreglo 'desarrolladores'
     Ejemplo: {nombre: "Bryan...", carnet: "AB250136", ...}
   - indice: La posición del desarrollador en el arreglo
     Ejemplo: 0 = primer desarrollo, 1 = segundo, etc.
   
   RETORNA:
   Un elemento HTML <article> completo con toda la card
   
   QUÉ HACE:
   Construye la estructura HTML de una tarjeta (card)
   de un desarrollador usando JavaScript.
   
   En lugar de escribir HTML en el HTML file,
   lo creamos aquí con código JavaScript.
   
   VENTAJA:
   - Reutilizable: se ejecuta para cada desarrollador
   - Dinámico: los datos vienen del objeto 'dev'
   - Flexible: fácil de modificar para todos a la vez
   ============================================= */
function crearCardDesarrollador(dev, indice) {

    /* ==========================================
       LÍNEA 1: Crear el contenedor principal
       
       QUÉ HACE EXACTAMENTE:
       - document.createElement('article')
         Crea un nuevo elemento HTML llamado <article>
         (Este es el contenedor más grande de la card)
       
       - const card = ...
         Guarda ese elemento en una variable llamada 'card'
       
       NOTA:
       El elemento se crea en la memoria, aún no aparece
       en la página. Lo añadiremos después.
       ========================================== */
    const card = document.createElement('article');
    
    /* ==========================================
       LÍNEA 2: Dar clase CSS al contenedor
       
       QUÉ HACE EXACTAMENTE:
       - card.classList.add('card-creador')
       
       classList = lista de clases del elemento
       add() = agregar una clase
       'card-creador' = nombre de la clase (en el CSS)
       
       RESULTADO:
       La card ahora tiene la clase 'card-creador'
       El CSS se aplica automáticamente
       ========================================== */
    card.classList.add('card-creador');
    
    /* ==========================================
       LÍNEA 3: Agregar animación escalonada
       
       QUÉ HACE EXACTAMENTE:
       - card.style.animationDelay = ...
       
       animationDelay = espera antes de iniciar la animación
       `${indice * 0.12}s` = cálculo del tiempo
       
       EXPLICACIÓN DEL CÁLCULO:
       - indice = 0, 1, 2, 3, 4 (posición en el arreglo)
       - indice * 0.12 = multiplicar por 0.12
       
       EJEMPLO:
       - 1er desarrollador (indice=0): 0 * 0.12 = 0s (sin espera)
       - 2do desarrollador (indice=1): 1 * 0.12 = 0.12s (espera 0.12 segundos)
       - 3er desarrollador (indice=2): 2 * 0.12 = 0.24s (espera 0.24 segundos)
       - 4to desarrollador (indice=3): 3 * 0.12 = 0.36s
       - 5to desarrollador (indice=4): 4 * 0.12 = 0.48s
       
       RESULTADO VISUAL:
       Las cards aparecen una tras otra (escalonadamente)
       en lugar de todas al mismo tiempo.
       ========================================== */
    card.style.animationDelay = `${indice * 0.12}s`;

    /* ==========================================
       LÍNEA 4-5: Crear la línea de color superior
       
       QUÉ HACE EXACTAMENTE:
       - document.createElement('div')
         Crea un <div> que representará una línea
       
       - linea.classList.add('card-linea')
         Le da la clase 'card-linea' (para el CSS)
       
       PROPÓSITO:
       Es la línea delgada de color en la parte superior
       de cada card
       ========================================== */
    const linea = document.createElement('div');
    linea.classList.add('card-linea');
    
    /* ==========================================
       LÍNEA 6: Asignar color a la línea
       
       QUÉ HACE EXACTAMENTE:
       - linea.style.background = dev.color
       
       background = color de fondo
       dev.color = toma el color del objeto desarrollador
       
       EJEMPLO:
       Si dev.color es "#f4c107" (amarillo)
       La línea será de color amarillo
       ========================================== */
    linea.style.background = dev.color;

    /* ==========================================
       LÍNEA 7-8: Crear contenedor de la foto
       
       QUÉ HACE EXACTAMENTE:
       - document.createElement('div')
         Crea un <div>
       
       - fotoWrapper.classList.add('foto-wrapper')
         Le da la clase 'foto-wrapper'
       
       PROPÓSITO:
       Es el contenedor que rodea la foto
       Tiene un borde de color alrededor de la foto
       ========================================== */
    const fotoWrapper = document.createElement('div');
    fotoWrapper.classList.add('foto-wrapper');
    
    /* ==========================================
       LÍNEA 9: Asignar color al borde de la foto
       
       QUÉ HACE EXACTAMENTE:
       - fotoWrapper.style.borderColor = dev.color
       
       borderColor = color del borde
       dev.color = el color del desarrollador
       
       RESULTADO:
       El borde alrededor de la foto tiene el mismo
       color que la línea superior (color personalizado)
       ========================================== */
    fotoWrapper.style.borderColor = dev.color;

    /* ==========================================
       LÍNEA 10-11: Crear elemento <img>
       
       QUÉ HACE EXACTAMENTE:
       - document.createElement('img')
         Crea un elemento <img> para la foto
       
       - foto.src = dev.foto
         Asigna la ruta de la foto
         EJEMPLO: "../img_creadores/AB250136.jpg"
       
       - foto.alt = `Foto de ${dev.nombre}`
         Texto alternativo si la imagen no carga
         Usa template string para ver el nombre
         Ej: "Foto de Bryan Ernesto Anaya Brizuela"
       
       - foto.classList.add('card-foto')
         Le da la clase CSS para estilos
       ========================================== */
    const foto = document.createElement('img');
    foto.src = dev.foto;
    foto.alt = `Foto de ${dev.nombre}`;
    foto.classList.add('card-foto');

    /* ==========================================
       LÍNEA 12: Agregar foto dentro del contenedor
       
       QUÉ HACE EXACTAMENTE:
       - fotoWrapper.appendChild(foto)
       
       appendChild() = agregar un hijo/elemento dentro
       fotoWrapper = el contenedor
       foto = el elemento que voy a meter dentro
       
       RESULTADO VISUAL:
       La foto <img> ahora está dentro del contenedor <div>
       
       ESTRUCTURA:
       <div class="foto-wrapper">
           <img src="..." alt="...">
       </div>
       ========================================== */
    fotoWrapper.appendChild(foto);

    /* ==========================================
       LÍNEA 13-17: Crear el badge del rol
       
       QUÉ HACE:
       Crea un pequeño banner que dice el rol
       (Ej: "Desarrollador")
       
       LÍNEA 13: Crea un <span>
       LÍNEA 14: Le da la clase 'card-rol'
       
       LÍNEA 15-16: Estilos de color
       - style.background = `${dev.color}22`
         Toma el color pero lo hace TRANSPARENTE (22)
         EJEMPLO: 
         #f4c107 → #f410722 (amarillo transparente)
       
       - style.color = dev.color
         El texto del rol es del color sólido
       
       - style.borderColor = `${dev.color}55`
         El borde es del color pero más transparente (55)
       
       LÍNEA 17: innerHTML agrega contenido
       - <i class="fas fa-code"></i>
         Icono de código (del Font Awesome)
       - ${dev.rol}
         Inserta el rol del desarrollador
       ========================================== */
    const rolBadge = document.createElement('span');
    rolBadge.classList.add('card-rol');
    rolBadge.style.background = `${dev.color}22`;
    rolBadge.style.color = dev.color;
    rolBadge.style.borderColor = `${dev.color}55`;
    rolBadge.innerHTML = `<i class="fas fa-code"></i> ${dev.rol}`;

    /* ==========================================
       LÍNEA 18-20: Crear el nombre del desarrollador
       
       QUÉ HACE EXACTAMENTE:
       - document.createElement('h3')
         Crea un encabezado pequeño <h3>
         (para el nombre)
       
       - nombre.classList.add('card-nombre')
         Le da la clase CSS
       
       - nombre.textContent = dev.nombre
         Inserta el nombre del objeto
         EJEMPLO: "Bryan Ernesto Anaya Brizuela"
       ========================================== */
    const nombre = document.createElement('h3');
    nombre.classList.add('card-nombre');
    nombre.textContent = dev.nombre;

    /* ==========================================
       LÍNEA 21-24: Crear el carnet
       
       QUÉ HACE EXACTAMENTE:
       - document.createElement('p')
         Crea un párrafo <p>
       
       - carnet.classList.add('card-carnet')
         Le da la clase CSS
       
       - carnet.innerHTML = ...
         Inserta contenido que incluye:
         - <i class="fas fa-id-card"></i>
           Icono de carnet (del Font Awesome)
         - ${dev.carnet}
           El número del carnet
           EJEMPLO: "AB250136"
       ========================================== */
    const carnet = document.createElement('p');
    carnet.classList.add('card-carnet');
    carnet.innerHTML = `<i class="fas fa-id-card"></i> ${dev.carnet}`;

    /* ==========================================
       LÍNEA 25-28: Crear la carrera
       
       QUÉ HACE EXACTAMENTE:
       - document.createElement('p')
         Crea un párrafo <p> para la carrera
       
       - carrera.classList.add('card-carrera')
         Le da la clase CSS
       
       - carrera.innerHTML = ...
         Inserta contenido que incluye:
         - <i class="fas fa-graduation-cap"></i>
           Icono de graduación (del Font Awesome)
         - ${dev.carrera}
           La carrera del desarrollador
           EJEMPLO: "Técnico en Ingeniería de Computación"
       ========================================== */
    const carrera = document.createElement('p');
    carrera.classList.add('card-carrera');
    carrera.innerHTML = `<i class="fas fa-graduation-cap"></i> ${dev.carrera}`;

    /* ==========================================
       LÍNEA 29: Agregar línea a la card
       
       QUÉ HACE EXACTAMENTE:
       - card.appendChild(linea)
       
       Toma el elemento <div> "linea" que creamos
       y lo mete dentro de "card"
       
       ESTRUCTURA ACTUAL:
       <article class="card-creador">
           <div class="card-linea"></div>
       </article>
       ========================================== */
    card.appendChild(linea);
    
    /* ==========================================
       LÍNEA 30: Agregar foto dentro de la card
       
       QUÉ HACE EXACTAMENTE:
       - card.appendChild(fotoWrapper)
       
       Toma el contenedor de la foto (que ya tiene la <img>)
       y lo mete dentro de "card"
       
       ESTRUCTURA ACTUAL:
       <article class="card-creador">
           <div class="card-linea"></div>
           <div class="foto-wrapper">
               <img src="..." alt="...">
           </div>
       </article>
       ========================================== */
    card.appendChild(fotoWrapper);
    
    /* ==========================================
       LÍNEA 31: Agregar badge del rol dentro de la card
       
       QUÉ HACE EXACTAMENTE:
       - card.appendChild(rolBadge)
       
       Mete el banner del rol dentro de la card
       
       ESTRUCTURA ACTUAL:
       <article class="card-creador">
           <div class="card-linea"></div>
           <div class="foto-wrapper">...</div>
           <span class="card-rol">...</span>
       </article>
       ========================================== */
    card.appendChild(rolBadge);
    
    /* ==========================================
       LÍNEA 32: Agregar nombre dentro de la card
       
       QUÉ HACE EXACTAMENTE:
       - card.appendChild(nombre)
       
       Mete el <h3> con el nombre dentro de la card
       ========================================== */
    card.appendChild(nombre);
    
    /* ==========================================
       LÍNEA 33: Agregar carnet dentro de la card
       
       QUÉ HACE EXACTAMENTE:
       - card.appendChild(carnet)
       
       Mete el <p> con el carnet dentro de la card
       ========================================== */
    card.appendChild(carnet);
    
    /* ==========================================
       LÍNEA 34: Agregar carrera dentro de la card
       
       QUÉ HACE EXACTAMENTE:
       - card.appendChild(carrera)
       
       Mete el <p> con la carrera dentro de la card
       
       ESTRUCTURA FINAL COMPLETA:
       <article class="card-creador">
           <div class="card-linea"></div>
           <div class="foto-wrapper">
               <img src="..." alt="...">
           </div>
           <span class="card-rol"><i></i> Desarrollador</span>
           <h3 class="card-nombre">Bryan Ernesto Anaya Brizuela</h3>
           <p class="card-carnet"><i></i> AB250136</p>
           <p class="card-carrera"><i></i> Técnico en Ingeniería...</p>
       </article>
       ========================================== */
    card.appendChild(carrera);

    /* ==========================================
       LÍNEA 35: Retornar la card completa
       
       QUÉ HACE EXACTAMENTE:
       - return card
       
       Devuelve el elemento <article> que acabamos
       de construir con todos sus elementos dentro.
       
       IMPORTANTE:
       Ahora esta card está completa pero aún no
       está en la página. La función renderizarCreadores()
       se encargará de ponerla en la página.
       ========================================== */
    return card;
}


/* =============================================
   FUNCIÓN: renderizarCreadores()
   
   QUÉ HACE:
   Genera todas las cards de los desarrolladores
   y las coloca en la página HTML.
   
   PASOS QUE SIGUE:
   1. Busca el contenedor en el HTML
   2. Lo vacía (por si acaso)
   3. Recorre el arreglo de desarrolladores
   4. Para cada uno, llama a crearCardDesarrollador()
   5. Coloca cada card en el contenedor del HTML
   
   RESULTADO:
   La página muestra 5 cards con todos los desarrolladores
   ============================================= */
function renderizarCreadores() {
    /* ==========================================
       LÍNEA 1: Buscar el contenedor en el HTML
       
       QUÉ HACE EXACTAMENTE:
       - document.getElementById('contenedor-creadores')
       
       getElementById() = buscar un elemento por su ID
       'contenedor-creadores' = el ID que buscamos
                                (debe estar en el HTML)
       
       - const contenedor = ...
         Guarda el resultado en una variable
       
       IMPORTANTE:
       Este elemento debe existir en el HTML,
       algo como:
       <section id="contenedor-creadores"></section>
       ========================================== */
    const contenedor = document.getElementById('contenedor-creadores');
    
    /* ==========================================
       LÍNEA 2: Verificar que el contenedor existe
       
       QUÉ HACE EXACTAMENTE:
       - if (!contenedor) return;
       
       if = si (condicional)
       !contenedor = si el contenedor NO existe
       return = terminar la función aquí
       
       LÓGICA:
       Si no encontramos el contenedor,
       no hay nada que hacer, así que salimos.
       
       VENTAJA:
       Evita un error si el HTML no tiene
       el elemento id="contenedor-creadores"
       ========================================== */
    if (!contenedor) return;

    /* ==========================================
       LÍNEA 3: Limpiar el contenedor
       
       QUÉ HACE EXACTAMENTE:
       - contenedor.innerHTML = '';
       
       innerHTML = todo el contenido HTML dentro
       = '' = cadena vacía (nada)
       
       RESULTADO:
       Borra cualquier contenido anterior que
       hubiera dentro del contenedor.
       
       IMPORTANCIA:
       Si esta función se llama 2 veces,
       sin esto tendríamos 10 cards duplicadas.
       ========================================== */
    contenedor.innerHTML = '';

    /* ==========================================
       LÍNEA 4: Recorrer el arreglo de desarrolladores
       
       QUÉ HACE EXACTAMENTE:
       - desarrolladores.forEach((dev, indice) => { ... })
       
       forEach() = repetir para CADA elemento
       (dev, indice) = parámetros de cada iteración
       
       PARÁMETROS:
       - dev = el objeto desarrollador actual
         EJEMPLO primera iteración:
         {
           nombre: "Bryan...",
           carnet: "AB250136",
           ...
         }
       
       - indice = el número de la posición (0, 1, 2, 3, 4)
         EJEMPLO primera iteración: indice = 0
                 segunda iteración: indice = 1
       
       =>       = flecha, significa "hacer esto"
       
       FLUJO COMPLETO:
       Iteración 1: desarrolladores[0], indice=0
       Iteración 2: desarrolladores[1], indice=1
       Iteración 3: desarrolladores[2], indice=2
       Iteración 4: desarrolladores[3], indice=3
       Iteración 5: desarrolladores[4], indice=4
       ========================================== */
    desarrolladores.forEach((dev, indice) => {
        /* ========================================
           LÍNEA 5: Crear la card del desarrollador
           
           QUÉ HACE EXACTAMENTE:
           - const card = crearCardDesarrollador(dev, indice)
           
           Llama la función crearCardDesarrollador()
           que creamos arriba, pasando:
           - dev = el objeto del desarrollador actual
           - indice = su posición en el arreglo
           
           RETORNA:
           Un elemento <article> completo con toda la card
           
           GUARDA EN:
           const card = la variable 'card' contiene
           el elemento HTML creado
        ======================================== */
        const card = crearCardDesarrollador(dev, indice);
        
        /* ========================================
           LÍNEA 6: Agregar la card al contenedor
           
           QUÉ HACE EXACTAMENTE:
           - contenedor.appendChild(card)
           
           appendChild() = agregar un hijo/elemento dentro
           contenedor = el contenedor del HTML
           card = la card que acabamos de crear
           
           RESULTADO:
           La card ahora aparece en la página HTML
           dentro del contenedor
           
           ESTRUCTURA DESPUÉS:
           <section id="contenedor-creadores">
               <article class="card-creador">...</article>
           </section>
        ======================================== */
        contenedor.appendChild(card);
    });
    // ← CIERRE DEL forEach
    // Ya se ejecutó 5 veces, una por cada desarrollador
    // Ahora la página tiene 5 cards completas
}

/* =============================================
   EVENT LISTENER: DOMContentLoaded
   
   QUÉ SIGNIFICA:
   - DOM = Document Object Model (el HTML cargado)
   - ContentLoaded = el contenido ha cargado
   
   QUÉ PASA:
   Espera a que el HTML esté completamente cargado
   ANTES de ejecutar la función renderizarCreadores()
   
   POR QUÉ ES IMPORTANTE:
   Si el HTML no está cargado, el contenedor
   id="contenedor-creadores" no existiría aún,
   y la función daría un error.
   
   QUÉ HACE LA LÍNEA:
   - document.addEventListener('DOMContentLoaded', renderizarCreadores)
   
   addEventListener() = escuchar un evento
   'DOMContentLoaded' = evento que se busca escuchar
   renderizarCreadores = función a ejecutar cuando suceda
   
   FLUJO COMPLETO:
   1. Usuario abre la página
   2. El navegador carga el HTML
   3. Cuando termina, dispara 'DOMContentLoaded'
   4. Se ejecuta renderizarCreadores()
   5. Se genera y muestran todas las cards
   ============================================= */
document.addEventListener('DOMContentLoaded', renderizarCreadores);