// =============================================
// contacto.js
// Maneja el formulario de contacto:
//   - Validación con clase Validador y expresiones regulares
//   - Almacenamiento de mensajes en localStorage
//   - Visualización, edición y eliminación de mensajes (CRUD)
//   - Uso de object constructor (Mensaje) para los datos
// =============================================

// =============================================
// CLASE: Validador
// Contiene métodos de validación con
// expresiones regulares para cada campo
// =============================================
class Validador {

    // Valida nombre: mínimo 3 letras, solo letras y espacios
    validarNombre(valor) {
        const regex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]{3,}$/;
        return regex.test(valor.trim());
    }

    // Valida email: formato estándar usuario@dominio.ext
    validarEmail(valor) {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
        return regex.test(valor.trim());
    }

    // Valida país: mínimo 3 letras, solo letras y espacios
    validarPais(valor) {
        const regex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]{3,}$/;
        return regex.test(valor.trim());
    }

    // Valida mensaje: mínimo 10 caracteres
    validarMensaje(valor) {
        const regex = /^[\s\S]{10,}$/;
        return regex.test(valor.trim());
    }
}

// =============================================
// CONSTRUCTOR: Mensaje
// Define la estructura de un object Mensaje
// para almacenarse en localStorage
// =============================================
function Mensaje(nombre, email, pais, mensaje) {
    this.id      = Date.now(); // ID único basado en timestamp
    this.nombre  = nombre;
    this.email   = email;
    this.pais    = pais;
    this.mensaje = mensaje;
    this.fecha   = new Date().toLocaleDateString('es-SV');
}

// =============================================
// OBJETO: camposFormulario
// Centraliza los IDs de los campos y
// sus mensajes de error correspondientes
// =============================================
const camposFormulario = {
    nombre:  { inputId: 'input-nombre',  errorId: 'error-nombre',  label: 'Nombre'  },
    email:   { inputId: 'input-email',   errorId: 'error-email',   label: 'Correo'  },
    pais:    { inputId: 'input-pais',    errorId: 'error-pais',    label: 'País'    },
    mensaje: { inputId: 'input-mensaje', errorId: 'error-mensaje', label: 'Mensaje' }
};

// =============================================
// VARIABLES GLOBALES
// =============================================
const validador       = new Validador();
const KEY_STORAGE     = 'mensajes_contacto_udb'; // Clave en localStorage
let   mensajesGuardados = [];                    // Array de objetos Mensaje
let   idEditando      = null;                    // ID del mensaje en edición (null = nuevo)

// =============================================
// FUNCIÓN: cargarMensajesDeStorage
// Lee el array de mensajes desde localStorage
// y lo asigna a la variable mensajesGuardados
// =============================================
function cargarMensajesDeStorage() {
    const datos = localStorage.getItem(KEY_STORAGE);
    mensajesGuardados = datos ? JSON.parse(datos) : [];
}

// =============================================
// FUNCIÓN: guardarMensajesEnStorage
// Serializa el array mensajesGuardados y
// lo guarda en localStorage como JSON
// =============================================
function guardarMensajesEnStorage() {
    localStorage.setItem(KEY_STORAGE, JSON.stringify(mensajesGuardados));
}

// =============================================
// FUNCIÓN: mostrarError
// Muestra un mensaje de error bajo un campo
// @param {string} errorId - ID del span de error
// @param {string} texto   - Mensaje a mostrar
// =============================================
function mostrarError(errorId, texto) {
    const span = document.getElementById(errorId);
    if (span) {
        span.textContent = texto;
        span.style.display = 'block';
    }
    const campo = document.getElementById(
        Object.values(camposFormulario).find(c => c.errorId === errorId)?.inputId
    );
    if (campo) {
        campo.classList.add('input-error');
        campo.classList.remove('input-valido');
    }
}

// =============================================
// FUNCIÓN: limpiarError
// Limpia el mensaje de error de un campo
// @param {string} inputId - ID del input
// @param {string} errorId - ID del span de error
// =============================================
function limpiarError(inputId, errorId) {
    const span = document.getElementById(errorId);
    if (span) { span.textContent = ''; span.style.display = 'none'; }
    const campo = document.getElementById(inputId);
    if (campo) {
        campo.classList.remove('input-error');
        campo.classList.add('input-valido');
    }
}

// =============================================
// FUNCIÓN: validarCampoEnTiempoReal
// Valida un campo al perder el foco (blur)
// y mientras escribe (input)
// =============================================
function validarCampoEnTiempoReal(inputId, errorId, fnValidar, mensajeError) {
    const campo = document.getElementById(inputId);
    if (!campo) return;

    const validar = () => {
        if (fnValidar(campo.value)) {
            limpiarError(inputId, errorId);
        } else {
            mostrarError(errorId, mensajeError);
        }
    };

    campo.addEventListener('blur', validar);
    campo.addEventListener('input', validar);
}

// =============================================
// FUNCIÓN: validarTodoElFormulario
// Valida todos los campos y retorna true
// solo si todos son válidos
// =============================================
function validarTodoElFormulario() {
    let formularioValido = true;

    const campos = [
        {
            inputId: camposFormulario.nombre.inputId,
            errorId: camposFormulario.nombre.errorId,
            fnValidar: (v) => validador.validarNombre(v),
            msg: 'El nombre debe tener al menos 3 letras y solo letras.'
        },
        {
            inputId: camposFormulario.email.inputId,
            errorId: camposFormulario.email.errorId,
            fnValidar: (v) => validador.validarEmail(v),
            msg: 'Ingresa un correo electrónico válido.'
        },
        {
            inputId: camposFormulario.pais.inputId,
            errorId: camposFormulario.pais.errorId,
            fnValidar: (v) => validador.validarPais(v),
            msg: 'El país debe tener al menos 3 letras.'
        },
        {
            inputId: camposFormulario.mensaje.inputId,
            errorId: camposFormulario.mensaje.errorId,
            fnValidar: (v) => validador.validarMensaje(v),
            msg: 'El mensaje debe tener al menos 10 caracteres.'
        }
    ];

    campos.forEach(({ inputId, errorId, fnValidar, msg }) => {
        const campo = document.getElementById(inputId);
        if (!campo) return;
        if (fnValidar(campo.value)) {
            limpiarError(inputId, errorId);
        } else {
            mostrarError(errorId, msg);
            formularioValido = false;
        }
    });

    return formularioValido;
}

// =============================================
// FUNCIÓN: limpiarFormulario
// Limpia todos los campos del formulario
// y resetea el estado de edición
// =============================================
function limpiarFormulario() {
    ['input-nombre', 'input-email', 'input-pais', 'input-mensaje'].forEach(id => {
        const campo = document.getElementById(id);
        if (campo) { campo.value = ''; campo.classList.remove('input-valido', 'input-error'); }
    });
    Object.values(camposFormulario).forEach(({ errorId }) => {
        const span = document.getElementById(errorId);
        if (span) { span.textContent = ''; span.style.display = 'none'; }
    });
    idEditando = null;
    const btnSubmit = document.querySelector('.btn-submit');
    if (btnSubmit) btnSubmit.innerHTML = '<i class="fas fa-paper-plane"></i> Enviar mensaje';
    const btnCancelar = document.getElementById('btn-cancelar-edicion');
    if (btnCancelar) btnCancelar.style.display = 'none';
}

// =============================================
// FUNCIÓN: renderizarMensajes
// Genera las tarjetas de mensajes guardados
// en el contenedor #lista-mensajes del HTML
// =============================================
function renderizarMensajes() {
    const contenedor = document.getElementById('lista-mensajes');
    if (!contenedor) return;

    cargarMensajesDeStorage();

    if (mensajesGuardados.length === 0) {
        contenedor.innerHTML = '<p class="sin-mensajes">No hay mensajes guardados aún.</p>';
        return;
    }

    contenedor.innerHTML = mensajesGuardados.map(msg => `
        <div class="mensaje-card" id="card-${msg.id}">
            <div class="mensaje-header">
                <span class="mensaje-nombre"><i class="fas fa-user"></i> ${msg.nombre}</span>
                <span class="mensaje-fecha">${msg.fecha}</span>
            </div>
            <div class="mensaje-body">
                <p><i class="fas fa-envelope"></i> <strong>Correo:</strong> ${msg.email}</p>
                <p><i class="fas fa-globe-americas"></i> <strong>País:</strong> ${msg.pais}</p>
                <p><i class="fas fa-comment-dots"></i> <strong>Mensaje:</strong> ${msg.mensaje}</p>
            </div>
            <div class="mensaje-acciones">
                <button class="btn-editar" onclick="iniciarEdicion(${msg.id})">
                    <i class="fas fa-edit"></i> Editar
                </button>
                <button class="btn-eliminar" onclick="eliminarMensaje(${msg.id})">
                    <i class="fas fa-trash"></i> Eliminar
                </button>
            </div>
        </div>
    `).join('');
}

// =============================================
// FUNCIÓN: iniciarEdicion
// Carga los datos de un mensaje en el formulario
// para ser editado
// @param {number} id - ID del mensaje a editar
// =============================================
function iniciarEdicion(id) {
    cargarMensajesDeStorage();
    const msg = mensajesGuardados.find(m => m.id === id);
    if (!msg) return;

    document.getElementById('input-nombre').value  = msg.nombre;
    document.getElementById('input-email').value   = msg.email;
    document.getElementById('input-pais').value    = msg.pais;
    document.getElementById('input-mensaje').value = msg.mensaje;

    idEditando = id;

    const btnSubmit = document.querySelector('.btn-submit');
    if (btnSubmit) btnSubmit.innerHTML = '<i class="fas fa-save"></i> Guardar cambios';

    const btnCancelar = document.getElementById('btn-cancelar-edicion');
    if (btnCancelar) btnCancelar.style.display = 'inline-block';

    // Scroll hacia el formulario
    document.getElementById('contact-form').scrollIntoView({ behavior: 'smooth' });
}

// =============================================
// FUNCIÓN: eliminarMensaje
// Elimina un mensaje por su ID del array
// y actualiza localStorage y la vista
// @param {number} id - ID del mensaje a eliminar
// =============================================
function eliminarMensaje(id) {
    if (!confirm('¿Seguro que deseas eliminar este mensaje?')) return;
    cargarMensajesDeStorage();
    mensajesGuardados = mensajesGuardados.filter(m => m.id !== id);
    guardarMensajesEnStorage();
    renderizarMensajes();
}

// =============================================
// INICIALIZACIÓN: DOMContentLoaded
// =============================================
document.addEventListener('DOMContentLoaded', function () {

    // Validación en tiempo real de cada campo
    validarCampoEnTiempoReal(
        camposFormulario.nombre.inputId,
        camposFormulario.nombre.errorId,
        (v) => validador.validarNombre(v),
        'El nombre debe tener al menos 3 letras y solo letras.'
    );
    validarCampoEnTiempoReal(
        camposFormulario.email.inputId,
        camposFormulario.email.errorId,
        (v) => validador.validarEmail(v),
        'Ingresa un correo electrónico válido.'
    );
    validarCampoEnTiempoReal(
        camposFormulario.pais.inputId,
        camposFormulario.pais.errorId,
        (v) => validador.validarPais(v),
        'El país debe tener al menos 3 letras.'
    );
    validarCampoEnTiempoReal(
        camposFormulario.mensaje.inputId,
        camposFormulario.mensaje.errorId,
        (v) => validador.validarMensaje(v),
        'El mensaje debe tener al menos 10 caracteres.'
    );

    // =============================================
    // EVENT LISTENER: Submit del formulario
    // Crea o actualiza un object Mensaje según
    // si se está editando o creando uno nuevo
    // =============================================
    const form = document.getElementById('contact-form');
    if (form) {
        form.addEventListener('submit', function (e) {
            e.preventDefault();

            if (!validarTodoElFormulario()) return;

            const nombre  = document.getElementById('input-nombre').value.trim();
            const email   = document.getElementById('input-email').value.trim();
            const pais    = document.getElementById('input-pais').value.trim();
            const mensaje = document.getElementById('input-mensaje').value.trim();

            cargarMensajesDeStorage();

            if (idEditando !== null) {
                // --- ACTUALIZAR mensaje existente ---
                const indice = mensajesGuardados.findIndex(m => m.id === idEditando);
                if (indice !== -1) {
                    mensajesGuardados[indice].nombre  = nombre;
                    mensajesGuardados[indice].email   = email;
                    mensajesGuardados[indice].pais    = pais;
                    mensajesGuardados[indice].mensaje = mensaje;
                }
            } else {
                // --- CREAR nuevo object Mensaje ---
                const nuevoMensaje = new Mensaje(nombre, email, pais, mensaje);
                mensajesGuardados.push(nuevoMensaje);
            }

            guardarMensajesEnStorage();
            limpiarFormulario();
            renderizarMensajes();

            // Mostrar confirmación
            const exito = document.getElementById('mensaje-exito');
            if (exito) {
                exito.style.display = 'block';
                setTimeout(() => { exito.style.display = 'none'; }, 3000);
            }
        });
    }

    // =============================================
    // EVENT LISTENER: Botón cancelar edición
    // =============================================
    const btnCancelar = document.getElementById('btn-cancelar-edicion');
    if (btnCancelar) {
        btnCancelar.addEventListener('click', limpiarFormulario);
    }

    // Carga y muestra los mensajes al iniciar
    renderizarMensajes();
});
