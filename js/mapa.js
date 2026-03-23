// Espera a que el documento esté completamente cargado
document.addEventListener("DOMContentLoaded", () => {
    // Selecciona todos los elementos 'path' que representan los edificios
    const edificios = document.querySelectorAll('path');
    // Selecciona el contenedor de información
    const infoContainer = document.getElementById('info-container');
    const infoImage = document.getElementById('info-image');
    const infoText = document.getElementById('info-text');

    // Itera sobre cada edificio
    edificios.forEach(edificio => {
        // Agrega un evento de clic a cada edificio
        edificio.addEventListener('click', () => {
            // Quita la clase 'seleccionado' de todos los edificios
            edificios.forEach(e => e.classList.remove('seleccionado'));
            // Agrega la clase 'seleccionado' al edificio clicado
            edificio.classList.add('seleccionado');

            // Muestra información del edificio clicado
            if (edificio.id === "Edif_A") {
                infoImage.src = "ruta/a/tu/imagen_a.jpg"; // Cambia la ruta
                infoText.textContent = "Información sobre Edif A.";
            } else if (edificio.id === "Vivienda_Salesiana") {
                infoImage.src = "ruta/a/tu/imagen_b.jpg"; // Cambia la ruta
                infoText.textContent = "Información sobre Vivienda Salesiana.";
            }
            // Agrega más condiciones según los edificios...

            // Posiciona el cuadro de información justo encima del edificio
            const rect = edificio.getBoundingClientRect();
            infoContainer.style.top = `${rect.top + window.scrollY - infoContainer.offsetHeight - 10}px`;
            infoContainer.style.left = `${rect.left + window.scrollX}px`;
            infoContainer.style.display = 'block'; // Muestra el cuadro
        });
    });

    // Oculta el cuadro si se hace clic fuera de él
    document.addEventListener('click', event => {
        if (!infoContainer.contains(event.target) && !event.target.matches('path')) {
            infoContainer.style.display = 'none'; // Oculta el cuadro
        }
    });
});