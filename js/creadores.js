// =============================================
// creadores.js
// Genera dinámicamente las cards de los
// desarrolladores usando un arreglo de objetos
// y manipulación del DOM.
// =============================================

// =============================================
// ARREGLO PRINCIPAL DE DESARROLLADORES
// Cada objeto contiene:
//   - nombre: nombre completo del desarrollador
//   - carnet: número de carnet universitario
//   - rol: rol dentro del proyecto
//   - carrera: carrera que estudia
//   - foto: ruta a la imagen de perfil
//   - color: color de la línea superior de la card
// =============================================
const desarrolladores = [
    {
        nombre:  "Bryan Ernesto Anaya Brizuela",
        carnet:  "AB250136",
        rol:     "Desarrollador",
        carrera: "Técnico en Ingeniería de Computación",
        foto:    "../img_creadores/AB250136.jpg",
        color:   "#f4c107"
    },
    {
        nombre:  "Concepción Getsemaní Miranda Cuéllar",
        carnet:  "MC250288",
        rol:     "Desarrolladora",
        carrera: "Técnico en Ingeniería de Computación",
        foto:    "../img_creadores/MC250288.jpeg",
        color:   "#ff6b9d"
    },
    {
        nombre:  "Dania Merari Urias Viscarra",
        carnet:  "UV253195",
        rol:     "Desarrolladora",
        carrera: "Técnico en Ingeniería de Computación",
        foto:    "../img_creadores/UV253195.jpeg",
        color:   "#a855f7"
    },
    {
        nombre:  "Diego Alejandro Cortez Duran",
        carnet:  "CD231127",
        rol:     "Desarrollador",
        carrera: "Técnico e ingeniero en Ingeniería de Computación ",
        foto:    "../img_creadores/CD231127.jpeg",
        color:   "#22c55e"
    },
    {
        nombre:  "Ever Gabriel Cabezas Alfaro",
        carnet:  "CA240297",
        rol:     "Desarrollador",
        carrera: "Técnico en Ingeniería de Computación",
        foto:    "../img_creadores/CA240297.jpeg",
        color:   "#38bdf8"
    }
    
];

// =============================================
// FUNCIÓN: crearCardDesarrollador
// Construye y devuelve el elemento HTML de una
// card a partir de un objeto desarrollador.
// Usa createElement y appendChild para manipular el DOM.
// @param {Object} dev - objeto del arreglo desarrolladores
// @param {number} indice - posición en el arreglo (para animación)
// @returns {HTMLElement} - el elemento card completo
// =============================================
function crearCardDesarrollador(dev, indice) {

    // Contenedor principal de la card
    const card = document.createElement('article');
    card.classList.add('card-creador');
    card.style.animationDelay = `${indice * 0.12}s`; // Animación escalonada

    // Línea de color superior
    const linea = document.createElement('div');
    linea.classList.add('card-linea');
    linea.style.background = dev.color;

    // Contenedor de la foto con borde del color del desarrollador
    const fotoWrapper = document.createElement('div');
    fotoWrapper.classList.add('foto-wrapper');
    fotoWrapper.style.borderColor = dev.color;

    const foto = document.createElement('img');
    foto.src = dev.foto;
    foto.alt = `Foto de ${dev.nombre}`;
    foto.classList.add('card-foto');

    fotoWrapper.appendChild(foto);

    // Badge del rol
    const rolBadge = document.createElement('span');
    rolBadge.classList.add('card-rol');
    rolBadge.style.background = `${dev.color}22`; // Color con transparencia
    rolBadge.style.color = dev.color;
    rolBadge.style.borderColor = `${dev.color}55`;
    rolBadge.innerHTML = `<i class="fas fa-code"></i> ${dev.rol}`;

    // Nombre del desarrollador
    const nombre = document.createElement('h3');
    nombre.classList.add('card-nombre');
    nombre.textContent = dev.nombre;

    // Carnet
    const carnet = document.createElement('p');
    carnet.classList.add('card-carnet');
    carnet.innerHTML = `<i class="fas fa-id-card"></i> ${dev.carnet}`;

    // Carrera
    const carrera = document.createElement('p');
    carrera.classList.add('card-carrera');
    carrera.innerHTML = `<i class="fas fa-graduation-cap"></i> ${dev.carrera}`;

    // Ensambla la card con appendChild (manejo del DOM)
    card.appendChild(linea);
    card.appendChild(fotoWrapper);
    card.appendChild(rolBadge);
    card.appendChild(nombre);
    card.appendChild(carnet);
    card.appendChild(carrera);

    return card;
}

// =============================================
// FUNCIÓN: renderizarCreadores
// Recorre el arreglo de desarrolladores,
// crea cada card y la inserta en el contenedor del DOM.
// =============================================
function renderizarCreadores() {
    const contenedor = document.getElementById('contenedor-creadores');
    if (!contenedor) return;

    // Limpia el contenedor antes de renderizar
    contenedor.innerHTML = '';

    // Recorre el arreglo y genera una card por cada desarrollador
    desarrolladores.forEach((dev, indice) => {
        const card = crearCardDesarrollador(dev, indice);
        contenedor.appendChild(card);
    });
}

// =============================================
// INICIO: Ejecuta al cargar el DOM
// =============================================
document.addEventListener('DOMContentLoaded', renderizarCreadores);