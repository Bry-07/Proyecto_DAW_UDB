// =============================================
// contacto.js
// Manejo del formulario de contacto con:
//   - Clase Validador con expresiones regulares
//   - Arreglo de campos con sus reglas
//   - Manejo del DOM para mostrar errores
//   - Sin ningún código JS dentro del HTML
// =============================================

// =============================================
// CLASE: Validador
// Contiene todos los métodos de validación
// usando expresiones regulares.
// Cada método recibe un valor y devuelve
// true si es válido, false si no lo es.
// =============================================
class Validador {

    // --------------------------------------------------
    // Valida que el nombre tenga solo letras y espacios
    // y al menos 3 caracteres
    // Expresión regular: solo letras (incluyendo tildes) y espacios
    // --------------------------------------------------
    validarNombre(valor) {
        const regex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]{3,}$/;
        return regex.test(valor.trim());
    }

    // --------------------------------------------------
    // Valida que el correo tenga el formato correcto
    // Ejemplo válido: usuario@dominio.com
    // Expresión regular: texto@texto.texto
    // --------------------------------------------------
    validarEmail(valor) {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
        return regex.test(valor.trim());
    }

    // --------------------------------------------------
    // Valida que el país tenga solo letras y espacios
    // y al menos 3 caracteres
    // --------------------------------------------------
    validarPais(valor) {
        const regex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]{3,}$/;
        return regex.test(valor.trim());
    }

    // --------------------------------------------------
    // Valida que el mensaje no esté vacío
    // y tenga al menos 10 caracteres
    // --------------------------------------------------
    validarMensaje(valor) {
        const regex = /^[\s\S]{10,}$/;
        return regex.test(valor.trim());
    }

} // Fin de la clase Validador


// =============================================
// INICIO: Espera a que el DOM esté listo
// =============================================
document.addEventListener("DOMContentLoaded", () => {

    // Creamos una instancia de la clase Validador
    const validador = new Validador();

    // =============================================
    // ARREGLO DE CAMPOS DEL FORMULARIO
    // Cada objeto define:
    //   - id: el id del input en el HTML
    //   - errorId: el id del span donde se muestra el error
    //   - metodo: qué método del Validador usar
    //   - mensajeError: texto que se muestra si la validación falla
    // Esto cumple el requisito de manejar datos en arreglos y objetos
    // =============================================
    const camposFormulario = [
        {
            id:           "input-nombre",
            errorId:      "error-nombre",
            metodo:       (val) => validador.validarNombre(val),
            mensajeError: "Ingresa tu nombre completo (solo letras, mínimo 3 caracteres)."
        },
        {
            id:           "input-email",
            errorId:      "error-email",
            metodo:       (val) => validador.validarEmail(val),
            mensajeError: "Ingresa un correo electrónico válido (ejemplo@correo.com)."
        },
        {
            id:           "input-pais",
            errorId:      "error-pais",
            metodo:       (val) => validador.validarPais(val),
            mensajeError: "Ingresa tu país de procedencia (solo letras, mínimo 3 caracteres)."
        },
        {
            id:           "input-mensaje",
            errorId:      "error-mensaje",
            metodo:       (val) => validador.validarMensaje(val),
            mensajeError: "El mensaje debe tener al menos 10 caracteres."
        }
    ];

    // =============================================
    // REFERENCIAS AL FORMULARIO Y AL MENSAJE DE ÉXITO
    // =============================================
    const formulario     = document.getElementById('contact-form');
    const mensajeExito   = document.getElementById('mensaje-exito');

    // =============================================
    // FUNCIÓN: mostrarError
    // Muestra un mensaje de error debajo del campo
    // y aplica estilo rojo al input
    // @param {object} campo - objeto del arreglo camposFormulario
    // @param {string} mensaje - texto del error a mostrar
    // =============================================
    function mostrarError(campo, mensaje) {
        const input     = document.getElementById(campo.id);
        const spanError = document.getElementById(campo.errorId);

        // Agrega clase de error al input para el borde rojo
        input.classList.add('input-error');
        input.classList.remove('input-valido');

        // Inserta el mensaje de error en el span usando DOM
        spanError.textContent = mensaje;
        spanError.style.display = 'block';
    }

    // =============================================
    // FUNCIÓN: mostrarValido
    // Quita el error y marca el campo como válido (borde verde)
    // @param {object} campo - objeto del arreglo camposFormulario
    // =============================================
    function mostrarValido(campo) {
        const input     = document.getElementById(campo.id);
        const spanError = document.getElementById(campo.errorId);

        // Agrega clase de válido al input para el borde verde
        input.classList.remove('input-error');
        input.classList.add('input-valido');

        // Limpia el mensaje de error
        spanError.textContent   = '';
        spanError.style.display = 'none';
    }

    // =============================================
    // FUNCIÓN: validarCampo
    // Valida un campo individual usando su método del Validador
    // Devuelve true si es válido, false si no
    // @param {object} campo - objeto del arreglo camposFormulario
    // @returns {boolean}
    // =============================================
    function validarCampo(campo) {
        const input = document.getElementById(campo.id);
        const valor = input.value;
        const esValido = campo.metodo(valor); // Llama al método de validación

        if (esValido) {
            mostrarValido(campo);
        } else {
            mostrarError(campo, campo.mensajeError);
        }

        return esValido;
    }

    // =============================================
    // FUNCIÓN: validarTodo
    // Recorre el arreglo de campos y valida cada uno
    // Devuelve true solo si TODOS los campos son válidos
    // @returns {boolean}
    // =============================================
    function validarTodo() {
        let todoValido = true;

        // Recorremos cada campo del arreglo y lo validamos
        camposFormulario.forEach(campo => {
            const esValido = validarCampo(campo);
            if (!esValido) todoValido = false;
        });

        return todoValido;
    }

    // =============================================
    // FUNCIÓN: limpiarFormulario
    // Limpia todos los campos del formulario y
    // quita los estilos de validación
    // =============================================
    function limpiarFormulario() {
        camposFormulario.forEach(campo => {
            const input = document.getElementById(campo.id);
            input.value = ''; // Vacía el campo
            input.classList.remove('input-error', 'input-valido'); // Quita estilos
            document.getElementById(campo.errorId).textContent = ''; // Quita errores
        });
    }

    // =============================================
    // FUNCIÓN: guardarMensaje
    // Guarda el mensaje enviado en un arreglo de objetos JS
    // Esto cumple el requisito de almacenar datos en arreglos
    // @param {string} nombre, email, pais, mensaje
    // =============================================
    const mensajesEnviados = []; // Arreglo donde se guardan todos los mensajes

    function guardarMensaje(nombre, email, pais, mensaje) {
        // Creamos un objeto con los datos del formulario
        const nuevoMensaje = {
            nombre:  nombre,
            email:   email,
            pais:    pais,
            mensaje: mensaje,
            fecha:   new Date().toLocaleString() // Fecha y hora del envío
        };

        // Lo agregamos al arreglo
        mensajesEnviados.push(nuevoMensaje);

        // Lo mostramos en consola para verificar (útil para la presentación)
        console.log("Mensaje guardado:", nuevoMensaje);
        console.log("Todos los mensajes:", mensajesEnviados);
    }

    // =============================================
    // VALIDACIÓN EN TIEMPO REAL
    // Cada campo se valida en cuanto el usuario termina de escribir (evento 'blur')
    // Esto da retroalimentación inmediata sin esperar al envío
    // =============================================
    camposFormulario.forEach(campo => {
        const input = document.getElementById(campo.id);

        // Al salir del campo → valida
        input.addEventListener('blur', () => {
            validarCampo(campo);
        });

        // Al escribir → si ya había un error, valida de nuevo en tiempo real
        input.addEventListener('input', () => {
            const spanError = document.getElementById(campo.errorId);
            if (spanError.textContent !== '') {
                validarCampo(campo);
            }
        });
    });

    // =============================================
    // EVENT LISTENER: Envío del formulario
    // Al hacer clic en "Enviar mensaje":
    //   1. Previene el envío real del formulario
    //   2. Valida todos los campos
    //   3. Si todo es válido, guarda el mensaje y muestra éxito
    //   4. Si hay errores, los muestra y NO envía
    // =============================================
    formulario.addEventListener('submit', (evento) => {
        evento.preventDefault(); // Evita que la página se recargue

        const esValido = validarTodo(); // Valida todos los campos

        if (esValido) {
            // Obtiene los valores de los campos para guardarlos
            const nombre  = document.getElementById('input-nombre').value;
            const email   = document.getElementById('input-email').value;
            const pais    = document.getElementById('input-pais').value;
            const mensaje = document.getElementById('input-mensaje').value;

            // Guarda el mensaje en el arreglo
            guardarMensaje(nombre, email, pais, mensaje);

            // Muestra el mensaje de éxito usando el DOM
            mensajeExito.style.display = 'block';

            // Limpia el formulario después de 3 segundos
            setTimeout(() => {
                limpiarFormulario();
                mensajeExito.style.display = 'none';
            }, 3000);
        }
    });

}); // Fin DOMContentLoaded