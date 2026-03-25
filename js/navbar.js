/* =============================================
   ARCHIVO: navbar.js
   
   PROPÓSITO GENERAL:
   Maneja toda la interactividad de la barra de navegación.
   
   FUNCIONALIDADES QUE CONTROLA:
   1. Resalta el enlace de la página actual en el menú
   2. Cierra el menú hamburguesa al hacer clic en un enlace
   3. Abre/cierra menús desplegables de edificios
   4. Navega a páginas de zonas (Oriente/Occidente)
   5. Cierra todos los menús al hacer clic afuera
   6. Añade sombra al navbar cuando haces scroll
   ============================================= */

/* =============================================
   REFERENCIAS AL DOM
   
   QUÉ SON:
   Variables que guardan referencias a elementos
   del HTML para usarlos sin escribir getElementById
   una y otra vez.
   
   ELEMENTOS:
   - dropMainCheckbox: <input> del menú hamburguesa
   - header: <header> que contiene toda la barra de nav
   ============================================= */
const dropMainCheckbox = document.getElementById("drop-main");  // Checkbox del menú hamburguesa
const header = document.querySelector(".udb-header");           // El header/navbar

/* =============================================
   FUNCIÓN: setActiveMenuItemOnLoad()
   
   QUÉ HACE:
   Detecta en QUÉ página está el usuario ahora
   y resalta el enlace correspondiente en el menú.
   
   EJEMPLO:
   - Si estés en "index.html" → resalta "Inicio"
   - Si estés en "contacto.html" → resalta "Contacto"
   - Si estés en "mapa.html" → resalta "Mapa"
   
   PASOS:
   1. Obtiene el nombre del archivo actual
   2. Busca TODOS los enlaces del menú principal
   3. Compara cada enlace con la página actual
   4. Si coincide, le añade la clase 'active'
   5. Si no coincide, le quita la clase 'active'
   ============================================= */
function setActiveMenuItemOnLoad() {
    // LÍNEA 1: Obtener el nombre del archivo actual
    // window.location.pathname = la URL actual
    // split('/') = divide la URL por "/"
    // pop() = toma el último elemento (el nombre del archivo)
    // || 'index.html' = si está vacío, usa 'index.html'
    // EJEMPLO:
    // Si estás en: http://ejemplo.com/html/mapa.html
    // currentPage será: "mapa.html"
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';

    // LÍNEA 2: Buscar TODOS los enlaces principales del menú
    // '.nav-menu > li > a' = solo enlaces directamente bajo nav-menu
    // (no incluye sub-menús)
    document.querySelectorAll('.nav-menu > li > a').forEach(link => {
        // LÍNEA 3: Obtener el href (destino) de cada enlace
        // EJEMPLO: href="mapa.html"
        const href = link.getAttribute('href');
        
        // LÍNEA 4: COMPARAR si el enlace coincide con la página actual
        // Dos condiciones:
        // a) href === currentPage (el href exacto coincide)
        // b) (currentPage === '' && href === 'index.html')
        //    (si la URL es la raíz, considera index.html como activo)
        if (href === currentPage || (currentPage === '' && href === 'index.html')) {
            // LÍNEA 5: Si coincide, añade la clase 'active'
            // parentElement = el <li> que contiene el enlace
            // El CSS luego filtra el <li> con class="active"
            link.parentElement.classList.add('active');
        } else {
            // LÍNEA 6: Si no coincide, quita la clase 'active'
            link.parentElement.classList.remove('active');
        }
    });
}

// LÍNEA 7: Ejecutar la función cuando la página carga
// DOMContentLoaded = evento que se dispara cuando el HTML está completamente cargado
// Así el menú está resaltado desde que abre la página
document.addEventListener('DOMContentLoaded', setActiveMenuItemOnLoad);

/* =============================================
   EVENT LISTENER: Cerrar menú hamburguesa
   
   QUÉ SUCEDE:
   Cuando el usuario hace clic en CUALQUIER enlace del menú,
   se cierra el menú hamburguesa (en dispositivos móviles).
   
   POR QUÉ:
   En móvil, el menú se abre con un checkbox.
   Al navegar a otra página, queremos que se cierre automáticamente.
   
   CONDICIÓN:
   Solo cierra si window.innerWidth <= 992px
   (es decir, solo en móvil/tablet, no en desktop)
   ============================================= */
document.querySelectorAll(".main-nav a").forEach(link => {
    // Para CADA enlace del menú...
    link.addEventListener("click", function() {
        // Al hacer clic...
        
        // LÍNEA 1: Verificar si es móvil/tablet (ancho <= 992px)
        // window.innerWidth = ancho actual de la ventana
        if (window.innerWidth <= 992) {
            // LÍNEA 2: Cerrar el menú (desmarcar el checkbox)
            // Al poner checked = false, el CSS lo oculta
            dropMainCheckbox.checked = false;
        }
    });
});

/* =============================================
   EVENTO: Dropdowns Nivel 2 (Edificios Oriente/Occidente)
   
   QUÉ HACE:
   Abre/cierra los menús desplegables cuando haces clic
   en el botón "Edificios Oriente" o "Edificios Occidente".
   
   ESTRUCTURA:
   Edificios (texto clickeable)
   └── Edificios Oriente (submenu)
   └── Edificios Occidente (submenu)
   
   LÓGICA:
   Cada "dropdown .toggle-label" tiene un checkbox asociado.
   Al hacer clic, se marca/desmarca el checkbox.
   El CSS maneja el mostrar/ocultar basado en el checkbox.
   ============================================= */
// LÍNEA 1: Buscar TODOS los botones de dropdown (nivel 2)
// ".dropdown .toggle-label" = etiquetas dentro de dropdowns
// EJEMPLO: "Edificios Oriente", "Edificios Occidente"
const dropdownToggles = document.querySelectorAll(".dropdown .toggle-label");

// LÍNEA 2: Para CADA uno de estos botones...
dropdownToggles.forEach(toggle => {
    // LÍNEA 3: Añadir un evento de clic
    toggle.addEventListener("click", function(e) {
        // LÍNEA 4: Prevenir el comportamiento por defecto
        // (Si fuera un <a>, no queremos que navegue)
        e.preventDefault();

        // LÍNEA 5: Obtener el ID del checkbox asociado
        // Cada label tiene: <label for="id-del-checkbox">
        // getAttribute("for") obtiene ese ID
        const checkboxId = this.getAttribute("for");
        
        // LÍNEA 6: Buscar el checkbox en el DOM
        const checkbox = document.getElementById(checkboxId);

        // LÍNEA 7: Si existe el checkbox...
        if (checkbox) {
            // LÍNEA 8: Cambiar su estado (invertir)
            // Si estaba marcado, lo desmarcan
            // Si estaba desmarcado, lo marcan
            // Esto abre/cierra el menú automáticamente
            checkbox.checked = !checkbox.checked;
        }
    });
});

/* =============================================
   EVENTO: Submenús Nivel 2 (Zona Oriente / Zona Occidente)
   
   QUÉ HACE:
   Detecta clics en los submenús de zonas.
   Si tiene un destino (data-href), navega a esa página.
   Si no, abre/cierra el submenú (solo uno a la vez).
   
   ESTRUCTURA:
   Edificios Oriente (submenu abierto)
   ├── Zona Base
   ├── Zona Occidente (con data-href="../...html")
   
   VENTAJA:
   Algunos elementos navegan directo a su página.
   Otros abren sub-menús mostrando más opciones.
   ============================================= */
// LÍNEA 1: Buscar TODOS los botones de submenú
// ".toggle-label-submenu" = elementos que abren sub-menús
// EJEMPLO: "Zona Oriente", "Zona Occidente", "Almacén", etc.
const submenuToggles = document.querySelectorAll(".toggle-label-submenu");

// LÍNEA 2: Para CADA uno...
submenuToggles.forEach(toggle => {
    // LÍNEA 3: Añadir evento de clic
    toggle.addEventListener("click", function(e) {
        // LÍNEA 4: Prevenir navegación por defecto
        e.preventDefault();
        
        // LÍNEA 5: Prevenir que el clic "suba" al padre
        // Si no hacemos esto, el clic cerrará el menú anterior
        e.stopPropagation();

        // LÍNEA 6: Obtener el destino (si tiene data-href)
        // data-href = atributo personalizado con la URL
        // EJEMPLO: data-href="../oriente/base-historia.html"
        const destino = this.getAttribute("data-href");
        
        // LÍNEA 7: Si tiene destino, navegar directo a esa página
        // window.location.href = cambiar la URL (navegar)
        if (destino) {
            window.location.href = destino;
            return; // Salir de la función (no continuar)
        }

        // LÍNEA 8: Si NO tiene destino, es un menú expandible
        // (Mostrar más opciones, no navegar)
        
        // LÍNEA 9: Obtener el ID del checkbox
        const checkboxId = this.getAttribute("for");
        
        // LÍNEA 10: Buscar el checkbox
        const checkbox = document.getElementById(checkboxId);

        // LÍNEA 11: Si existe...
        if (checkbox) {
            // LÍNEA 12: Si se va a abrir (no está marcado)...
            if (!checkbox.checked) {
                // LÍNEA 13: Encontrar el contenedor de dropdowns
                const dropdownMenu = this.closest(".dropdown-menu");
                
                // LÍNEA 14: Si existe el contenedor...
                if (dropdownMenu) {
                    // LÍNEA 15: Cerrar TODOS los otros submenús
                    // Esto asegura que solo uno esté abierto a la vez
                    dropdownMenu.querySelectorAll(".dropdown-submenu input[type='checkbox']").forEach(otherCheckbox => {
                        // Si el checkbox es diferente al que se va a abrir,
                        // desmarcarlo (cerrarlo)
                        if (otherCheckbox.id !== checkboxId) {
                            otherCheckbox.checked = false;
                        }
                    });
                }
            }
            
            // LÍNEA 16: Cambiar el estado del checkbox actual
            // Abre si estaba cerrado, cierra si estaba abierto
            checkbox.checked = !checkbox.checked;
        }
    });
});

/* =============================================
   EVENT LISTENER: Cerrar dropdowns al clic afuera
   
   QUÉ HACE:
   Cuando el usuario hace clic FUERA de la barra de nav,
   se cierran TODOS los menús desplegables.
   
   VENTAJA:
   Si abres el menú y haces clic en el contenido principal,
   el menú se cierra automáticamente (no queda abierto).
   
   LÓGICA:
   Detecta clic en cualquier parte del documento.
   Si el clic NO está dentro del header, cierra los menús.
   ============================================= */
document.addEventListener("click", function(event) {
    // LÍNEA 1: Verificar si el clic está DENTRO del header
    // header.contains(event.target) = verdadero si el clic está dentro
    if (!header.contains(event.target)) {
        // LÍNEA 2: Si el clic está FUERA del header...
        // Encontrar TODOS los checkboxes de dropdowns
        document.querySelectorAll(".dropdown input[type='checkbox'], .dropdown-submenu input[type='checkbox']").forEach(checkbox => {
            // LÍNEA 3: Desmarcar cada uno (cerrar)
            checkbox.checked = false;
        });
    }
});

/* =============================================
   EVENT LISTENER: Efecto scroll en el navbar
   
   QUÉ HACE:
   Cuando el usuario hace scroll (baja la página),
   se añade una sombra al navbar para darle profundidad.
   
   EFECTO VISUAL:
   - Sin scroll (arriba): navbar plano, sin sombra
   - Con scroll (abajo): navbar tiene sombra, se ve flotando
   
   CÓMO FUNCIONA:
   Se detecta si scroll > 20px (usuario bajó un poco).
   Se añade/quita la clase 'navbar-scroll' del header.
   El CSS define el estilo de la sombra.
   ============================================= */
window.addEventListener('scroll', function() {
    // LÍNEA 1: Verificar cuántos píxeles ha bajado el usuario
    // window.scrollY = posición vertical actual (en píxeles)
    // Si es > 20, significa que bajó algo
    if (window.scrollY > 20) {
        // LÍNEA 2: Añadir la clase que activa la sombra
        // El CSS define: .navbar-scroll { box-shadow: ... }
        header.classList.add('navbar-scroll');
    } else {
        // LÍNEA 3: Si está en la parte superior (scrollY <= 20)
        // Quitar la sombra
        header.classList.remove('navbar-scroll');
    }
});
