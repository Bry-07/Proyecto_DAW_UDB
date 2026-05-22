// =============================================
// navbar-occidente.js
// Para páginas dentro de la carpeta: html/occidente/
// (hangar.html, edif-5.html, etc.)
//
// Rutas base desde html/occidente/:
//   - Inicio:       ../../index.html
//   - Oriente:      ../oriente.html
//   - Occidente:    ../occidente.html
//   - Mapa:         ../mapa.html
//   - Contacto:     ../contacto.html
//   - Creadores:    ../creadores.html
//   - Edif. A:      ../oriente/edif-a.html
//   - Pinacoteca:   ../oriente/edif-pinacoteca.html
//   - Hangar:       hangar.html
//   - Observatorio: observatorio.html
// =============================================

// =============================================
// OBJETO: rutasNavbar
// Centraliza todas las rutas del menú para
// esta carpeta. Si necesitas cambiar un link,
// solo modifícalo aquí.
// =============================================
const rutasNavbar = {
    inicio:        "../index.html",
    mapa:          "../html/mapa.html",
    contacto:      "../html/contacto.html",
    creadores:     "../html/creadores.html",
    zonaOriente:   "../html/oriente.html",
    zonaOccidente: "../html/occidente.html",
    edificioA:     "../../html/oriente/edif-a.html",
    pinacoteca:    "../../html/oriente/edif-pinacoteca.html",
    hangar:        "../occidente/hangar.html",
    observatorio:  "../occidente/observatorio.html"
};

// =============================================
// FUNCIÓN: construirNavbar
// Genera el HTML del navbar dinámicamente
// usando el objeto rutasNavbar
// =============================================
function construirNavbar() {
    const header = document.querySelector(".udb-header");
    if (!header) return;

    header.innerHTML = `
        <div class="container-header">
            <div class="logo">
                <a href="${rutasNavbar.inicio}">
                    <img src="../img/dibujo1.svg" alt="Universidad Don Bosco Logo" class="logo-img">
                </a>
            </div>

            <label for="drop-main" class="menu-toggle" aria-label="Abrir menú">
                <span></span>
                <span></span>
                <span></span>
            </label>
            <input type="checkbox" id="drop-main" hidden />

            <nav class="main-nav">
                <ul class="nav-menu">
                    <li><a href="${rutasNavbar.inicio}">Inicio</a></li>

                    <li class="dropdown">
                        <label for="drop-edificios" class="toggle-label">
                            Edificios <i class="fas fa-chevron-down"></i>
                        </label>
                        <input type="checkbox" id="drop-edificios" hidden />
                        <ul class="dropdown-menu">
                            <li class="dropdown-submenu">
                                <label for="drop-oriente" class="toggle-label-submenu">
                                    Zona Oriente <i class="fas fa-chevron-right"></i>
                                </label>
                                <input type="checkbox" id="drop-oriente" hidden />
                                <ul class="dropdown-menu-level3">
                                    <li><a href="${rutasNavbar.zonaOriente}">Zona Oriente</a></li>
                                    <li><a href="${rutasNavbar.edificioA}">Edificio A</a></li>
                                    <li><a href="${rutasNavbar.pinacoteca}">Pinacoteca</a></li>
                                </ul>
                            </li>
                            <li class="dropdown-submenu">
                                <label for="drop-occidente" class="toggle-label-submenu">
                                    Zona Occidente <i class="fas fa-chevron-right"></i>
                                </label>
                                <input type="checkbox" id="drop-occidente" hidden />
                                <ul class="dropdown-menu-level3">
                                    <li><a href="${rutasNavbar.zonaOccidente}">Zona Occidente</a></li>
                                    <li><a href="${rutasNavbar.hangar}">Hangar</a></li>
                                    <li><a href="${rutasNavbar.observatorio}">Observatorio</a></li>
                                </ul>
                            </li>
                        </ul>
                    </li>

                    <li><a href="${rutasNavbar.contacto}">Contacto</a></li>
                    <li><a href="${rutasNavbar.creadores}">Creadores</a></li>
                </ul>

                <a href="${rutasNavbar.mapa}" class="btn-explorar">Explorar Campus</a>
            </nav>
        </div>
    `;
}

// =============================================
// FUNCIÓN: setActiveMenuItemOnLoad
// Detecta la página actual y resalta el enlace
// correspondiente en el menú principal
// =============================================
function setActiveMenuItemOnLoad() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav-menu > li > a').forEach(link => {
        const href = link.getAttribute('href').split('/').pop();
        if (href === currentPage) {
            link.parentElement.classList.add('active');
        } else {
            link.parentElement.classList.remove('active');
        }
    });
}

// =============================================
// FUNCIÓN: iniciarEventosNavbar
// Registra todos los eventos del menú
// =============================================
function iniciarEventosNavbar() {
    const dropMainCheckbox = document.getElementById("drop-main");
    const header = document.querySelector(".udb-header");

    // Cerrar menú hamburguesa al hacer clic en enlace
    document.querySelectorAll(".main-nav a").forEach(link => {
        link.addEventListener("click", function () {
            if (window.innerWidth <= 992) {
                dropMainCheckbox.checked = false;
            }
        });
    });

    // Dropdowns nivel 2 (Edificios)
    document.querySelectorAll(".dropdown .toggle-label").forEach(toggle => {
        toggle.addEventListener("click", function (e) {
            e.preventDefault();
            const checkbox = document.getElementById(this.getAttribute("for"));
            if (checkbox) checkbox.checked = !checkbox.checked;
        });
    });

    // Submenús nivel 3 (Zona Oriente / Zona Occidente)
    document.querySelectorAll(".toggle-label-submenu").forEach(toggle => {
        toggle.addEventListener("click", function (e) {
            e.preventDefault();
            e.stopPropagation();

            const destino = this.getAttribute("data-href");
            if (destino) { window.location.href = destino; return; }

            const checkboxId = this.getAttribute("for");
            const checkbox = document.getElementById(checkboxId);
            if (checkbox) {
                if (!checkbox.checked) {
                    const dropdownMenu = this.closest(".dropdown-menu");
                    if (dropdownMenu) {
                        dropdownMenu.querySelectorAll(".dropdown-submenu input[type='checkbox']").forEach(other => {
                            if (other.id !== checkboxId) other.checked = false;
                        });
                    }
                }
                checkbox.checked = !checkbox.checked;
            }
        });
    });

    // Cerrar dropdowns al hacer clic fuera
    document.addEventListener("click", function (event) {
        if (!header.contains(event.target)) {
            document.querySelectorAll(".dropdown input[type='checkbox'], .dropdown-submenu input[type='checkbox']").forEach(cb => {
                cb.checked = false;
            });
        }
    });

    // Efecto scroll en el navbar
    window.addEventListener('scroll', function () {
        header.classList.toggle('navbar-scroll', window.scrollY > 20);
    });
}

// =============================================
// INICIALIZACIÓN
// =============================================
document.addEventListener('DOMContentLoaded', function () {
    construirNavbar();
    setActiveMenuItemOnLoad();
    iniciarEventosNavbar();
});
