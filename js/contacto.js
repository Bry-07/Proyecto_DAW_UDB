/* =============================================
   ARCHIVO: contacto.js
   DESCRIPCIÓN: Script para validar formulario de contacto
   
   CARACTERÍSTICAS:
   - Clase Validador con expresiones regulares
   - Arreglo de objetos para los campos del formulario
   - Validación en tiempo real (mientras escribes)
   - Validación al enviar el formulario
   - Manejo del DOM para mostrar/ocultar errores
   - Almacenamiento de mensajes en un arreglo
   - Sin código JavaScript dentro del HTML
   ============================================= */

/* =============================================
   CLASE: Validador
   
   Propósito: Contiene métodos para validar datos
   
   Métodos:
   - validarNombre(): Valida que sea solo letras y espacios
   - validarEmail(): Valida formato de correo electrónico
   - validarPais(): Valida que sea solo letras y espacios
   - validarMensaje(): Valida que tenga mínimo de caracteres
   
   Cada método usa expresiones regulares (regex) y devuelve:
   - true  → el valor es válido
   - false → el valor NO cumple los requisitos
   ============================================= */
class Validador {

    /* ==========================================
       MÉTODO: validarNombre(valor)
       
       QUÉ HACE:
       Verifica que el nombre sea válido según:
       - Solo letras (a-z, A-Z) y tildes (áéíóúñ)
       - Incluye espacios entre nombres
       - Mínimo 3 caracteres
       
       PARÁMETRO:
       - valor: string del nombre a validar
       
       RETORNA:
       - true si cumple todas las reglas
       - false si no cumple alguna
       ========================================== */
    validarNombre(valor) {
        // Expresión regular que define las reglas
        // ^        = inicio de la cadena
        // [...]    = caracteres permitidos
        // a-zA-Z   = letras minúsculas y mayúsculas
        // áéíóúÁÉÍÓÚñÑ = letras con tildes
        // \s       = espacios en blanco
        // {3,}     = mínimo 3 caracteres
        // $        = fin de la cadena
        const regex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]{3,}$/;
        
        // .trim() elimina espacios al inicio/final
        // .test() comprueba si cumple la expresión regular
        return regex.test(valor.trim());
    }

    /* ==========================================
       MÉTODO: validarEmail(valor)
       
       QUÉ HACE:
       Verifica que el email tenga formato válido:
       - Texto antes del @
       - Símbolo @ en el medio
       - Texto después del @
       - Punto (.) seguido de al menos 2 caracteres
       
       EJEMPLOS VÁLIDOS:
       - usuario@dominio.com
       - nombre.apellido@empresa.co
       - correo123@mail.net
       
       PARÁMETRO:
       - valor: string del email a validar
       
       RETORNA:
       - true si es un email válido
       - false si no cumple el formato
       ========================================== */
    validarEmail(valor) {
        // Expresión regular para validar email
        // [^\s@]+     = caracteres que NO sean espacio ni @
        // @           = el símbolo @ obligatorio
        // [^\s@]+     = texto después del @ sin espacios ni @
        // \.          = punto literal (.) obligatorio
        // [^\s@]{2,}  = mínimo 2 caracteres para la extensión
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
        
        return regex.test(valor.trim());
    }

    /* ==========================================
       MÉTODO: validarPais(valor)
       
       QUÉ HACE:
       Verifica que el país sea válido según:
       - Solo letras (a-z, A-Z) y tildes (áéíóúñ)
       - Incluye espacios (ej: "Costa Rica")
       - Mínimo 3 caracteres
       
       PARÁMETRO:
       - valor: string del país a validar
       
       RETORNA:
       - true si cumple todas las reglas
       - false si no cumple alguna
       ========================================== */
    validarPais(valor) {
        // Misma expresión regular que el nombre
        // Ya que ambos solo aceptan letras y espacios
        const regex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]{3,}$/;
        
        return regex.test(valor.trim());
    }

    /* ==========================================
       MÉTODO: validarMensaje(valor)
       
       QUÉ HACE:
       Verifica que el mensaje sea válido según:
       - Contenga al menos 10 caracteres
       - Puede incluir letras, números, símbolos, espacios
       
       EJEMPLOS VÁLIDOS:
       - "Hola, cómo estás?" (14 caracteres)
       - "Te escribo para..." (17 caracteres)
       
       PARÁMETRO:
       - valor: string del mensaje a validar
       
       RETORNA:
       - true si tiene 10 o más caracteres
       - false si tiene menos de 10 caracteres
       ========================================== */
    validarMensaje(valor) {
        // Expresión regular flexible para el mensaje
        // [\s\S]  = cualquier carácter (incluyendo espacios y saltos)
        // {10,}   = mínimo 10 caracteres
        const regex = /^[\s\S]{10,}$/;
        
        return regex.test(valor.trim());
    }

} // ← FIN DE LA CLASE Validador



/* =============================================
   EVENT LISTENER: DOMContentLoaded
   
   QUÉ HACE:
   Este evento espera a que TODO el HTML esté
   cargado en la memoria antes de ejecutar
   el código JavaScript. Esto es importante
   para asegurar que los elementos del HTML
   (inputs, formularios, etc.) existan.
   
   POR QUÉ LO USAMOS:
   Si el JS corre antes de cargar el HTML,
   no encontrará los elementos y dará error.
   ============================================= */
document.addEventListener("DOMContentLoaded", () => {

    /* ==========================================
       LÍNEA 1: Crear instancia de Validador
       
       QUÉ HACE:
       Crea un objeto 'validador' basado en la
       clase Validador que definimos arriba.
       
       ESTO SIGNIFICA:
       Ahora podemos usar los métodos:
       - validador.validarNombre()
       - validador.validarEmail()
       - validador.validarPais()
       - validador.validarMensaje()
       ========================================== */
    const validador = new Validador();

    /* =============================================
       ARREGLO: camposFormulario
       
       QUÉ CONTIENE:
       Un array con 4 objetos, uno por cada campo
       del formulario.
       
       CADA OBJETO TIENE:
       1. id: El ID del <input> en el HTML
       2. errorId: El ID del <span> para mostrar error
       3. metodo: La función de validación a usar
       4. mensajeError: El texto del error si falla
       
       VENTAJA DE USAR ARREGLOS:
       - No necesitamos repetir código
       - Podemos procesar todos los campos en loops
       - Fácil de agregar nuevos campos
       ============================================= */
    const camposFormulario = [
        {
            // CAMPO 1: Nombre
            id:           "input-nombre",           // ID del input en HTML
            errorId:      "error-nombre",           // ID del span para el error
            metodo:       (val) => validador.validarNombre(val), // Usa método validarNombre
            mensajeError: "Ingresa tu nombre completo (solo letras, mínimo 3 caracteres)."
        },
        {
            // CAMPO 2: Email
            id:           "input-email",            // ID del input en HTML
            errorId:      "error-email",            // ID del span para el error
            metodo:       (val) => validador.validarEmail(val),  // Usa método validarEmail
            mensajeError: "Ingresa un correo electrónico válido (ejemplo@correo.com)."
        },
        {
            // CAMPO 3: País
            id:           "input-pais",             // ID del input en HTML
            errorId:      "error-pais",             // ID del span para el error
            metodo:       (val) => validador.validarPais(val),   // Usa método validarPais
            mensajeError: "Ingresa tu país de procedencia (solo letras, mínimo 3 caracteres)."
        },
        {
            // CAMPO 4: Mensaje
            id:           "input-mensaje",          // ID del textarea en HTML
            errorId:      "error-mensaje",          // ID del span para el error
            metodo:       (val) => validador.validarMensaje(val), // Usa método validarMensaje
            mensajeError: "El mensaje debe tener al menos 10 caracteres."
        }
    ];

    /* ==========================================
       REFERENCIAS A ELEMENTOS DEL DOM
       
       QUÉ HACE:
       Busca elementos en el HTML y los guarda
       en variables para usarlos luego.
       
       ESTO ES MEJOR QUE:
       Llamar a document.getElementById() cada vez.
       (Hacerlo una sola vez es más rápido)
       ========================================== */
    const formulario     = document.getElementById('contact-form');   // Encuentra el <form>
    const mensajeExito   = document.getElementById('mensaje-exito');  // Encuentra el div de éxito

    /* =============================================
       FUNCIÓN: mostrarError(campo, mensaje)
       
       PARÁMETROS:
       - campo: un objeto del arreglo camposFormulario
       - mensaje: texto del error a mostrar
       
       QUÉ HACE:
       1. Encuentra el input usando su ID
       2. Encuentra el span del error usando su ID
       3. Agrega clases CSS para cambiar el estilo
       4. Inserta el mensaje de error en el HTML
       5. Muestra el span del error
       
       RESULTADO VISUAL:
       El input se pone rojo y aparece el mensaje
       ============================================= */
    function mostrarError(campo, mensaje) {
        // Busca el input en el HTML usando el ID guardado en campo.id
        const input     = document.getElementById(campo.id);
        
        // Busca el span donde va el mensaje de error
        const spanError = document.getElementById(campo.errorId);

        // Agrega la clase 'input-error' → pone el borde ROJO
        input.classList.add('input-error');
        
        // Quita la clase 'input-valido' → quita el borde VERDE
        input.classList.remove('input-valido');

        // Inserta el texto del error en el span
        spanError.textContent = mensaje;
        
        // Muestra el span (lo hace visible)
        spanError.style.display = 'block';
    }

    /* =============================================
       FUNCIÓN: mostrarValido(campo)
       
       PARÁMETRO:
       - campo: un objeto del arreglo camposFormulario
       
       QUÉ HACE:
       1. Encuentra el input usando su ID
       2. Encuentra el span del error usando su ID
       3. Quita la clase de error (borde rojo)
       4. Agrega la clase de válido (borde verde)
       5. Limpia el mensaje de error
       6. Oculta el span del error
       
       RESULTADO VISUAL:
       El input se pone VERDE y desaparece el error
       ============================================= */
    function mostrarValido(campo) {
        // Busca el input en el HTML
        const input     = document.getElementById(campo.id);
        
        // Busca el span del error
        const spanError = document.getElementById(campo.errorId);

        // Quita la clase de error (borde rojo)
        input.classList.remove('input-error');
        
        // Agrega la clase de válido (borde verde)
        input.classList.add('input-valido');

        // Borra el texto del error
        spanError.textContent   = '';
        
        // Oculta el span del error
        spanError.style.display = 'none';
    }

    /* =============================================
       FUNCIÓN: validarCampo(campo)
       
       PARÁMETRO:
       - campo: un objeto del arreglo camposFormulario
       
       RETORNA:
       - true si el campo es válido
       - false si el campo NO es válido
       
       QUÉ HACE:
       1. Busca el input del campo
       2. Obtiene el valor que escribió el usuario
       3. Llama al método de validación del campo
       4. Si es válido → muestra el borde verde
       5. Si NO es válido → muestra error rojo
       6. Devuelve true o false
       
       EJEMPLO:
       - Si nombre = "Juan" → retorna true ✓
       - Si nombre = "Jo" → retorna false ✗
       ============================================= */
    function validarCampo(campo) {
        // Busca el input usando el ID del campo
        const input = document.getElementById(campo.id);
        
        // Obtiene el VALOR que escribió el usuario
        const valor = input.value;
        
        // Llama al método de validación del campo
        // Ej: si es el campo nombre, llama validador.validarNombre(valor)
        const esValido = campo.metodo(valor);

        // Si el campo es válido
        if (esValido) {
            // Muestra borde verde y limpia errores
            mostrarValido(campo);
        } 
        // Si el campo NO es válido
        else {
            // Muestra borde rojo con el mensaje de error
            mostrarError(campo, campo.mensajeError);
        }

        // Devuelve si fue válido (true) o no (false)
        return esValido;
    }

    /* =============================================
       FUNCIÓN: validarTodo()
       
       RETORNA:
       - true solo si TODOS los campos son válidos
       - false si hay AL MENOS UN campo inválido
       
       QUÉ HACE:
       1. Asume que todo es válido (todoValido = true)
       2. Recorre CADA campo del formulario
       3. Valida cada uno individualmente
       4. Si encuentra uno inválido → todoValido = false
       5. Al final retorna el resultado
       
       EJEMPLO:
       - Nombre ✓ + Email ✓ + País ✓ + Mensaje ✓ → true
       - Nombre ✗ + Email ✓ + País ✓ + Mensaje ✓ → false
       ============================================= */
    function validarTodo() {
        // Comienza asumiendo que todo está válido
        let todoValido = true;

        // Recorre CADA campo del arreglo camposFormulario
        camposFormulario.forEach(campo => {
            // Valida el campo actual
            const esValido = validarCampo(campo);
            
            // Si la validación falla, marca todoValido como false
            if (!esValido) todoValido = false;
        });

        // Retorna true si todos son válidos, false si hay alguno inválido
        return todoValido;
    }

    /* =============================================
       FUNCIÓN: limpiarFormulario()
       
       QUÉ HACE:
       1. Recorre CADA campo del formulario
       2. Borra el valor que escribió el usuario
       3. Quita las clases de error y válido
       4. Borra los mensajes de error
       
       SE USA DESPUÉS DE:
       - Enviar el formulario correctamente
       - Limpiar después de mostrar "Envío exitoso"
       
       RESULTADO:
       El formulario vuelve a estar vacío y limpio
       ============================================= */
    function limpiarFormulario() {
        // Recorre CADA campo del arreglo
        camposFormulario.forEach(campo => {
            // Encuentra el input del campo
            const input = document.getElementById(campo.id);
            
            // Borra el valor (texto que escribió el usuario)
            input.value = '';
            
            // Quita las clases de error y de válido (sin estilos rojo/verde)
            input.classList.remove('input-error', 'input-valido');
            
            // Busca el span del error y borra su contenido
            document.getElementById(campo.errorId).textContent = '';
        });
    }

    /* =============================================
       VARIABLE: mensajesEnviados
       
       QUÉ ES:
       Un arreglo vacío [] donde guardaremos
       todos los mensajes que envíe el usuario.
       
       POR QUÉ:
       Para poder ver/acceder a los mensajes
       después en la consola o usarlos en código.
       
       CONTENIDO:
       Cada elemento será un OBJETO con:
       - nombre
       - email
       - pais
       - mensaje
       - fecha
       ============================================= */
    const mensajesEnviados = [];

    /* =============================================
       FUNCIÓN: guardarMensaje(nombre, email, pais, mensaje)
       
       PARÁMETROS:
       - nombre: texto del nombre del usuario
       - email: dirección de correo del usuario
       - pais: país del usuario
       - mensaje: el mensaje que escribió
       
       QUÉ HACE:
       1. Crea un OBJETO con todos los datos
       2. Agrega la FECHA Y HORA actual
       3. Agrega el objeto al arreglo mensajesEnviados
       4. Muestra el mensaje en la consola (para verificar)
       5. Muestra TODOS los mensajes en la consola
       
       VENTAJA:
       Los datos quedan guardados en la memoria
       mientras la página esté abierta.
       ============================================= */
    function guardarMensaje(nombre, email, pais, mensaje) {
        // Crea un objeto con los datos del formulario
        const nuevoMensaje = {
            nombre:  nombre,                    // Nombre del usuario
            email:   email,                     // Email del usuario
            pais:    pais,                      // País del usuario
            mensaje: mensaje,                   // El mensaje escrito
            fecha:   new Date().toLocaleString() // Fecha y hora del envío
        };

        // Agrega el objeto al final del arreglo
        // .push() añade un elemento al final
        mensajesEnviados.push(nuevoMensaje);

        // Muestra en la consola el mensaje guardado
        // Útil para verificar que funcione correctamente
        console.log("Mensaje guardado:", nuevoMensaje);
        
        // Muestra en consola TODOS los mensajes hasta ahora
        // Útil para ver qué se ha guardado en total
        console.log("Todos los mensajes:", mensajesEnviados);
    }

    /* =============================================
       VALIDACIÓN EN TIEMPO REAL
       
       QUÉ SIGNIFICA "TIEMPO REAL":
       Los campos se validan mientras escribes,
       SIN esperar a hacer clic en "Enviar".
       
       EVENTOS USADOS:
       1. 'blur': cuando el usuario SALE del campo
       2. 'input': cuando el usuario ESCRIBE algo
       
       FLUJO:
       usuario escribe → evento 'input' →
       valida si había error → muestra resultado
       
       BENEFICIO:
       Retroalimentación inmediata (borde rojo/verde)
       ============================================= */
    
    // Recorre CADA campo del formulario
    camposFormulario.forEach(campo => {
        // Encuentra el input en el HTML
        const input = document.getElementById(campo.id);

        /* ========================================
           EVENTO 'blur': Al SALIR del campo
           
           QUÉ PASA:
           1. Usuario termina de escribir
           2. Usuario hace clic en otro lugar
           3. Se dispara este evento
           4. Valida el campo
           
           EJEMPLO:
           - Escribo "Juan" en nombre
           - Hago clic en el campo email
           - Se ejecuta este evento → valida nombre
        ======================================== */
        input.addEventListener('blur', () => {
            // Valida el campo actual
            validarCampo(campo);
        });

        /* ========================================
           EVENTO 'input': Mientras ESCRIBES
           
           QUÉ PASA:
           1. El usuario escribe una letra
           2. Se dispara este evento
           3. Si hay error anterior, valida de nuevo
           4. Muestra resultado en tiempo real
           
           POR QUÉ LA CONDICIÓN:
           Solo valida si YA había un error.
           Si el campo está correcto, no lo valida.
           Esto ahorra procesamiento.
           
           EJEMPLO:
           - Escribo "Jo" en nombre (menos de 3) → ERROR
           - Escribo "a" para hacer "Joa" → valida
           - Escribo "n" para hacer "Joan" → valida ✓
        ======================================== */
        input.addEventListener('input', () => {
            // Encuentra el span donde está el error
            const spanError = document.getElementById(campo.errorId);
            
            // Verifica si hay un mensaje de error
            // Si el span tiene texto = hay error
            if (spanError.textContent !== '') {
                // Si hay error, valida de nuevo
                validarCampo(campo);
            }
        });
    });

    /* =============================================
       EVENT LISTENER: Envío del FORMULARIO
       
       EVENTO: 'submit'
       SE DISPARA: Cuando el usuario hace clic en
       el botón "Enviar" (o presiona Enter)
       
       EL FLUJO COMPLETO:
       1. Usuario hace clic en "Enviar"
       2. Se dispara este evento
       3. Evita que se recargue la página
       4. Valida TODOS los campos
       5. Si TODOS son válidos:
          - Guarda el mensaje en el arreglo
          - Muestra "Enviado correctamente"
          - Limpia el formulario después de 3 seg
       6. Si hay ALGÚN error:
          - NO envía nada
          - Muestra los errores
       
       PARÁMETRO:
       - evento: objeto con info del evento
       ============================================= */
    formulario.addEventListener('submit', (evento) => {
        // Evita que el navegador recargue la página
        // (comportamiento por defecto del formulario)
        // SIN esto, la página se recarga y pierdes datos
        evento.preventDefault();

        // Valida TODOS los campos del formulario
        // Retorna true si TODO es válido, false si hay error
        const esValido = validarTodo();

        // Si TODOS los campos son válidos
        if (esValido) {
            // ═════════════════════════════════════════
            // OBTENER LOS VALORES DE LOS CAMPOS
            // ═════════════════════════════════════════
            
            // Busca el input del nombre y obtiene su valor
            const nombre  = document.getElementById('input-nombre').value;
            
            // Busca el input del email y obtiene su valor
            const email   = document.getElementById('input-email').value;
            
            // Busca el input del país y obtiene su valor
            const pais    = document.getElementById('input-pais').value;
            
            // Busca el textarea del mensaje y obtiene su valor
            const mensaje = document.getElementById('input-mensaje').value;

            // ═════════════════════════════════════════
            // GUARDAR EL MENSAJE EN EL ARREGLO
            // ═════════════════════════════════════════
            
            // Llama la función guardarMensaje con los 4 valores
            guardarMensaje(nombre, email, pais, mensaje);

            // ═════════════════════════════════════════
            // MOSTRAR MENSAJE DE ÉXITO
            // ═════════════════════════════════════════
            
            // Encuentra el div de éxito y lo muestra
            // (cambia display de 'none' a 'block')
            mensajeExito.style.display = 'block';

            // ═════════════════════════════════════════
            // LIMPIAR EL FORMULARIO DESPUÉS
            // ═════════════════════════════════════════
            
            // setTimeout ejecuta código DESPUÉS de X milisegundos
            // 3000 milisegundos = 3 segundos
            setTimeout(() => {
                // Limpia todos los campos del formulario
                limpiarFormulario();
                
                // Oculta el mensaje de éxito
                mensajeExito.style.display = 'none';
                
            }, 3000); // Espera 3 segundos
        }
        // Si HAY errores en la validación:
        // No entra a este bloque if
        // Los errores ya están mostrados en la pantalla
        // por la función validarCampo()
    });

}); // ← FIN DEL EVENTO DOMContentLoaded