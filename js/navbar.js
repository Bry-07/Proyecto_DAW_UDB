// Manejo del menú principal (hamburguesa)
const dropMainCheckbox = document.getElementById("drop-main");
const header = document.querySelector(".udb-header");

// Detectar la página actual y asignar clase active solo a items del menú principal
function setActiveMenuItemOnLoad() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    
    // Solo aplicar active a los items del menú principal (nav-menu > li)
    document.querySelectorAll('.nav-menu > li > a').forEach(link => {
        const href = link.getAttribute('href');
        
        // Comparar href con página actual
        if (href === currentPage || (currentPage === '' && href === 'index.html')) {
            link.parentElement.classList.add('active');
        } else {
            link.parentElement.classList.remove('active');
        }
    });
}

// Ejecutar al cargar la página
document.addEventListener('DOMContentLoaded', setActiveMenuItemOnLoad);

// Cerrar el menú principal cuando se hace clic en un enlace
document.querySelectorAll(".main-nav a").forEach(link => {
    link.addEventListener("click", function() {
        if (window.innerWidth <= 992) {
            dropMainCheckbox.checked = false;
        }
    });
});

// Manejo de los dropdowns nivel 2
const dropdownToggles = document.querySelectorAll(".dropdown .toggle-label");

dropdownToggles.forEach(toggle => {
    toggle.addEventListener("click", function(e) {
        e.preventDefault();
        
        // Obtener el checkbox asociado
        const checkboxId = this.getAttribute("for");
        const checkbox = document.getElementById(checkboxId);
        
        if (checkbox) {
            checkbox.checked = !checkbox.checked;
        }
    });
});

// Manejo de los dropdowns nivel 3 (Oriente y Occidente)
const submenuToggles = document.querySelectorAll(".toggle-label-submenu");

submenuToggles.forEach(toggle => {
    toggle.addEventListener("click", function(e) {
        e.preventDefault();
        
        // Obtener el checkbox asociado
        const checkboxId = this.getAttribute("for");
        const checkbox = document.getElementById(checkboxId);
        
        if (checkbox) {
            // Si se está abriendo este checkbox
            if (!checkbox.checked) {
                // Cerrar todos los otros checkboxes de submenus al mismo nivel
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

// Cerrar todos los dropdowns cuando se hace clic fuera del menú
document.addEventListener("click", function(event) {
    // Verificar si el click está fuera del header
    if (!header.contains(event.target)) {
        // Cerrar todos los checkboxes de dropdowns
        document.querySelectorAll(".dropdown input[type='checkbox'], .dropdown-submenu input[type='checkbox']").forEach(checkbox => {
            checkbox.checked = false;
        });
    }
});