// =============================================
// buscador.js
// Buscador de edificios usando expresiones regulares.
// Se integra en CUALQUIER página del sitio.
//
// CÓMO FUNCIONA:
//   1. Inserta una barra de búsqueda en el navbar
//   2. Mientras el usuario escribe, filtra el array
//      de edificios usando una expresión regular
//   3. Muestra los resultados como lista desplegable
//   4. Al hacer clic en un resultado, navega a la
//      página de ese edificio
//
// CÓMO USAR:
//   Agrega este script en CUALQUIER html después de navbar-*.js:
//   <script src="../js/buscador.js"></script>
//   (desde html/ usa: <script src="../js/buscador.js"></script>)
//   (desde oriente/ y occidente/ igual: ../js/buscador.js)
// =============================================

// =============================================
// OBJETO: catalogoEdificios
// Lista completa de edificios con nombre y
// su ruta relativa desde la carpeta html/
// El buscador usa este objeto para filtrar
// =============================================
const catalogoEdificios = [
    { nombre: "Edificio A",                         ruta: "oriente/edif-a.html"         },
    { nombre: "Edificio B",                         ruta: "oriente/edif-b.html"         },
    { nombre: "Edificio C",                         ruta: "oriente/edif-c.html"         },
    { nombre: "Edificio R",                         ruta: "oriente/edif-r.html"         },
    { nombre: "Edificio 2",                         ruta: "occidente/edif-2.html"       },
    { nombre: "Edificio 3",                         ruta: "occidente/edif-3.html"       },
    { nombre: "Edificio 4",                         ruta: "occidente/edif-4.html"       },
    { nombre: "Edificio 5",                         ruta: "occidente/edif-5.html"       },
    { nombre: "Edificio 6",                         ruta: "occidente/edif-6.html"       },
    { nombre: "Edificio 7",                         ruta: "occidente/edif-7.html"       },
    { nombre: "Edificio 8",                         ruta: "occidente/edif-8.html"       },
    { nombre: "Edificio de Ciencias",               ruta: "occidente/edif-ciencias.html"},
    { nombre: "Edificio de Profesores",             ruta: "oriente/edif-profesores.html"},
    { nombre: "Biblioteca",                         ruta: "oriente/edif-biblio.html"   },
    { nombre: "Centro de Desarrollo e Innovación",  ruta: "oriente/edif-cdiu.html"      },
    { nombre: "Capilla UDB",                        ruta: "oriente/capilla.html"        },
    { nombre: "Centro de Pastoral",                 ruta: "oriente/edif-CPastoral.html" },
    { nombre: "Magna A",                            ruta: "oriente/edif-magnaA.html"   },
    { nombre: "Magna B",                            ruta: "oriente/edif-magnaB.html"   },
    { nombre: "Magna C",                            ruta: "occidente/edif-magnaC.html" },
    { nombre: "Multigimnasio UDB",                  ruta: "oriente/edif-gym.html"       },
    { nombre: "Pinacoteca",                         ruta: "oriente/edif-pinacoteca.html"},
    { nombre: "Vivienda Salesiana",                 ruta: "oriente/edif-viviendaS.html" },
    { nombre: "Hangar - Facultad de Aeronáutica",   ruta: "occidente/hangar.html"       },
    { nombre: "Observatorio Meteorológico",         ruta: "occidente/observatorio.html" },
    { nombre: "OWCC",                               ruta: "occidente/OWCC.html"         },
    { nombre: "Almacén General",                    ruta: "occidente/almacén.html"      },
    { nombre: "Plaza de las Banderas",              ruta: "occidente/banderas.html"     },
    { nombre: "Cafetería Zona Occidente",           ruta: "occidente/comedor2.html"     },
    { nombre: "Comedor de Profesores",              ruta: "oriente/comedor1.html"       },
    { nombre: "Centro de Reproducción",             ruta: "oriente/centroR.html"        },
    { nombre: "Base Historia",                      ruta: "oriente/base-historia.html"  },
    { nombre: "Carro de la Inge",                   ruta: "occidente/carro.html"        },
    { nombre: "Sanitarios UDB",                     ruta: "oriente/sanitariosudb.html"  },
    { nombre: "Baños UDB",                          ruta: "oriente/sanitariosudb.html"  },
    { nombre: "Mesas UDB",                          ruta: "oriente/mesasUDB.html"       }
];

// =============================================
// FUNCIÓN: detectarRutaBase
// Detecta en qué carpeta está la página actual
// y ajusta el prefijo de las rutas del buscador
// para que funcionen desde cualquier carpeta
// =============================================
function detectarRutaBase() {
    const path = window.location.pathname;

    if (path.includes('/html/')) {
        return '../';
    }

    if (path.includes('/oriente/')) {
        return '../';
    }

    if (path.includes('/occidente/')) {
        return '../';
    }

    return '';
}

// =============================================
// FUNCIÓN: construirBuscador
// Inserta el input de búsqueda y el contenedor
// de resultados en el navbar, antes del botón
// "Explorar Campus"
// =============================================
function construirBuscador() {
    const nav = document.querySelector('.main-nav');
    if (!nav) return;

    const wrapperBuscador = document.createElement('div');
    wrapperBuscador.className = 'buscador-wrapper';
    wrapperBuscador.innerHTML = `
        <div class="buscador-input-wrapper">
            <i class="fas fa-search buscador-icon"></i>
            <input
                type="text"
                id="buscador-input"
                class="buscador-input"
                placeholder="Buscar edificio..."
                autocomplete="off"
            />
        </div>
        <ul id="buscador-resultados" class="buscador-resultados" style="display:none;"></ul>
    `;

    const navMenu = nav.querySelector('.nav-menu');
    if (navMenu) {
        nav.insertBefore(wrapperBuscador, navMenu);
    } else {
        nav.prepend(wrapperBuscador);
    }
}

// =============================================
// FUNCIÓN: buscarEdificios
// Filtra el catalogoEdificios usando una
// expresión regular construida desde el texto
// del usuario. Retorna array de coincidencias.
// @param {string} termino - texto escrito por el usuario
// @returns {Array} - edificios que coinciden
// =============================================
function buscarEdificios(termino) {
    if (!termino.trim()) return [];

    // Construye una expresión regular que ignore
    // mayúsculas/minúsculas y acentos básicos
    const terminoLimpio = termino
        .replace(/[.*+?^${}()|[\]\\]/g, '\\$&') // escapa caracteres especiales
        .replace(/a/gi, '[aáÁ]')
        .replace(/e/gi, '[eéÉ]')
        .replace(/i/gi, '[iíÍ]')
        .replace(/o/gi, '[oóÓ]')
        .replace(/u/gi, '[uúÚ]');

    const regex = new RegExp(terminoLimpio, 'i');
    return catalogoEdificios.filter(edificio => regex.test(edificio.nombre));
}

// =============================================
// FUNCIÓN: mostrarResultados
// Renderiza la lista de resultados debajo del
// input. Si no hay resultados, muestra mensaje.
// @param {Array} resultados - edificios filtrados
// =============================================
function mostrarResultados(resultados) {
    const lista = document.getElementById('buscador-resultados');
    if (!lista) return;

    if (resultados.length === 0) {
        lista.innerHTML = '<li class="sin-resultados">Sin resultados</li>';
        lista.style.display = 'block';
        return;
    }

    // Detecta la ruta base según la carpeta actual
    const base = detectarRutaBase();

    // Construye los resultados
    lista.innerHTML = resultados.map(edificio => {
        return `
            <li class="resultado-item">
                <a href="${base + edificio.ruta}" class="resultado-link">
                    <i class="fas fa-building"></i> ${edificio.nombre}
                </a>
            </li>
        `;
    }).join('');

    lista.style.display = 'block';
}

// =============================================
// FUNCIÓN: cerrarResultados
// Oculta la lista de resultados
// =============================================
function cerrarResultados() {
    const lista = document.getElementById('buscador-resultados');
    if (lista) lista.style.display = 'none';
}

// =============================================
// FUNCIÓN: iniciarEventosBuscador
// Asigna los eventos al input del buscador
// =============================================
function iniciarEventosBuscador() {
    const input = document.getElementById('buscador-input');
    if (!input) return;

    // Filtra mientras escribe
    input.addEventListener('input', function () {
        const resultados = buscarEdificios(this.value);
        if (this.value.trim() === '') {
            cerrarResultados();
        } else {
            mostrarResultados(resultados);
        }
    });

    // Cierra resultados al presionar Escape
    input.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') {
            cerrarResultados();
            this.value = '';
        }
    });

    // Cierra resultados al hacer clic fuera del buscador
    document.addEventListener('click', function (e) {
        const wrapper = document.querySelector('.buscador-wrapper');
        if (wrapper && !wrapper.contains(e.target)) {
            cerrarResultados();
        }
    });
}

// =============================================
// INICIALIZACIÓN
// Espera a que el navbar esté construido
// antes de insertar el buscador
// =============================================
document.addEventListener('DOMContentLoaded', function () {
    construirBuscador();
    iniciarEventosBuscador();
});
