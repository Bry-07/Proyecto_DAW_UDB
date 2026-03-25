// =============================================
// navbar.js
// Manejo del menú de navegación:
//   - Resaltado del enlace activo según página actual
//   - Cierre del menú hamburguesa al hacer clic en enlace
//   - Manejo de dropdowns nivel 2 y nivel 3
//   - Cierre de dropdowns al hacer clic fuera
//   - Efecto de sombra en navbar al hacer scroll
// =============================================

// =============================================
// REFERENCIAS AL DOM
// =============================================
const dropMainCheckbox = document.getElementById("drop-main");
const header = document.querySelector(".udb-header");

// =============================================
// FUNCIÓN: setActiveMenuItemOnLoad
// Detecta la página actual y resalta el enlace
// correspondiente en el menú principal
// =============================================
function setActiveMenuItemOnLoad() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';

    document.querySelectorAll('.nav-menu > li > a').forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPage || (currentPage === '' && href === 'index.html')) {
            link.parentElement.classList.add('active');
        } else {
            link.parentElement.classList.remove('active');
        }
    });
}

document.addEventListener('DOMContentLoaded', setActiveMenuItemOnLoad);

// =============================================
// EVENT LISTENER: Cerrar menú hamburguesa
// al hacer clic en cualquier enlace del menú
// =============================================
document.querySelectorAll(".main-nav a").forEach(link => {
    link.addEventListener("click", function() {
        if (window.innerWidth <= 992) {
            dropMainCheckbox.checked = false;
        }
    });
});

// =============================================
// MANEJO DE DROPDOWNS NIVEL 2 (Edificios)
// =============================================
const dropdownToggles = document.querySelectorAll(".dropdown .toggle-label");

dropdownToggles.forEach(toggle => {
    toggle.addEventListener("click", function(e) {
        e.preventDefault();

        const checkboxId = this.getAttribute("for");
        const checkbox = document.getElementById(checkboxId);

        if (checkbox) {
            checkbox.checked = !checkbox.checked;
        }
    });
});

// =============================================
// MANEJO DE SUBMENÚS NIVEL 2 (Zona Oriente / Zona Occidente)
// Al hacer clic navega directo a la página del zona (data-href)
// =============================================
const submenuToggles = document.querySelectorAll(".toggle-label-submenu");

submenuToggles.forEach(toggle => {
    toggle.addEventListener("click", function(e) {
        e.preventDefault();
        e.stopPropagation();

        // Si tiene data-href, navega directo a esa página
        const destino = this.getAttribute("data-href");
        if (destino) {
            window.location.href = destino;
            return;
        }

        // Si no tiene data-href, comportamiento de abrir/cerrar submenú
        const checkboxId = this.getAttribute("for");
        const checkbox = document.getElementById(checkboxId);

        if (checkbox) {
            if (!checkbox.checked) {
                const dropdownMenu = this.closest(".dropdown-menu");
                if (dropdownMenu) {
                    dropdownMenu.querySelectorAll(".dropdown-submenu input[type='checkbox']").forEach(otherCheckbox => {
                        if (otherCheckbox.id !== checkboxId) {
                            otherCheckbox.checked = false;
                        }
                    });
                }
            }
            checkbox.checked = !checkbox.checked;
        }
    });
});

// =============================================
// EVENT LISTENER: Cerrar dropdowns al hacer clic fuera
// =============================================
document.addEventListener("click", function(event) {
    if (!header.contains(event.target)) {
        document.querySelectorAll(".dropdown input[type='checkbox'], .dropdown-submenu input[type='checkbox']").forEach(checkbox => {
            checkbox.checked = false;
        });
    }
});

// =============================================
// EVENT LISTENER: Efecto scroll en el navbar
// =============================================
window.addEventListener('scroll', function() {
    if (window.scrollY > 20) {
        header.classList.add('navbar-scroll');
    } else {
        header.classList.remove('navbar-scroll');
    }
});
