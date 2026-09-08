const formularioRegistro = document.querySelector("#formulario-registro");
const rut = document.querySelector("#rut");
const nombre = document.querySelector("#nombre");
const correo = document.querySelector("#correo");
const telefono = document.querySelector("#telefono");
const tipoCliente = document.querySelector("#tipo-cliente");
const contrasena = document.querySelector("#contrasena");
const repetirContrasena = document.querySelector("#repetir-contrasena");
const mensajeRegistro = document.querySelector("#mensaje-registro");

function mostrarError(control, idError, mensaje) {
    const salida = document.querySelector("#" + idError);
    salida.textContent = mensaje;
    control.classList.add("campo-invalido");
    control.setAttribute("aria-invalid", "true");
}

function limpiarError(control, idError) {
    const salida = document.querySelector("#" + idError);
    salida.textContent = "";
    control.classList.remove("campo-invalido");
    control.removeAttribute("aria-invalid");
}

function validarRut(valor) {
    limpiarError(rut, "error-rut");
    const formatoRut = /^[0-9]{7,8}[0-9Kk]$/;

    if (!formatoRut.test(valor)) {
        mostrarError(rut, "error-rut", "Escribe el RUT sin puntos ni guion, incluyendo dígito verificador.");
        return false;
    }

    const cuerpo = valor.slice(0, -1);
    const digitoIngresado = valor.slice(-1).toUpperCase();
    let suma = 0;
    let multiplicador = 2;

    for (let posicion = cuerpo.length - 1; posicion >= 0; posicion--) {
        suma = suma + Number(cuerpo[posicion]) * multiplicador;
        multiplicador = multiplicador === 7 ? 2 : multiplicador + 1;
    }

    const resto = 11 - (suma % 11);
    let digitoCalculado = String(resto);

    if (resto === 11) {
        digitoCalculado = "0";
    }

    if (resto === 10) {
        digitoCalculado = "K";
    }

    if (digitoIngresado !== digitoCalculado) {
        mostrarError(rut, "error-rut", "El dígito verificador no es correcto.");
        return false;
    }

    return true;
}

function validarNombre(valor) {
    limpiarError(nombre, "error-nombre");

    if (valor === "") {
        mostrarError(nombre, "error-nombre", "El nombre es obligatorio.");
        return false;
    }

    if (valor.length < 3) {
        mostrarError(nombre, "error-nombre", "Escribe al menos 3 caracteres.");
        return false;
    }

    return true;
}

function validarCorreo(valor) {
    limpiarError(correo, "error-correo");

    if (valor === "") {
        mostrarError(correo, "error-correo", "El correo es obligatorio.");
        return false;
    }

    if (!valor.includes("@") || !valor.includes(".")) {
        mostrarError(correo, "error-correo", "Escribe un correo válido, por ejemplo nombre@correo.cl.");
        return false;
    }

    return true;
}

function validarTelefono(valor) {
    limpiarError(telefono, "error-telefono");
    const formatoTelefono = /^9[0-9]{8}$/;

    if (!formatoTelefono.test(valor)) {
        mostrarError(telefono, "error-telefono", "Escribe 9 dígitos y comienza con 9, por ejemplo 912345678.");
        return false;
    }

    return true;
}

function validarTipoCliente(valor) {
    limpiarError(tipoCliente, "error-tipo-cliente");

    if (valor === "") {
        mostrarError(tipoCliente, "error-tipo-cliente", "Selecciona si eres cliente particular o contratista.");
        return false;
    }

    return true;
}

function validarContrasena(valor) {
    limpiarError(contrasena, "error-contrasena");

    if (valor.length < 6 || valor.length > 12) {
        mostrarError(contrasena, "error-contrasena", "La contraseña debe tener entre 6 y 12 caracteres.");
        return false;
    }

    return true;
}

function validarRepeticion(valor, valorOriginal) {
    limpiarError(repetirContrasena, "error-repetir-contrasena");

    if (valor === "") {
        mostrarError(repetirContrasena, "error-repetir-contrasena", "Repite la contraseña.");
        return false;
    }

    if (valor !== valorOriginal) {
        mostrarError(repetirContrasena, "error-repetir-contrasena", "Las contraseñas no coinciden.");
        return false;
    }

    return true;
}

function guardarUsuario(usuario) {
    const textoUsuarios = localStorage.getItem("ferreteriaUsuarios");
    let usuarios = [];

    if (textoUsuarios !== null) {
        usuarios = JSON.parse(textoUsuarios);
    }

    usuarios.push(usuario);
    localStorage.setItem("ferreteriaUsuarios", JSON.stringify(usuarios));
}

function procesarRegistro(evento) {
    evento.preventDefault();

    const valorRut = rut.value.trim();
    const valorNombre = nombre.value.trim();
    const valorCorreo = correo.value.trim();
    const valorTelefono = telefono.value.trim();
    const valorTipoCliente = tipoCliente.value;
    const valorContrasena = contrasena.value;
    const valorRepeticion = repetirContrasena.value;

    const rutValido = validarRut(valorRut);
    const nombreValido = validarNombre(valorNombre);
    const correoValido = validarCorreo(valorCorreo);
    const telefonoValido = validarTelefono(valorTelefono);
    const tipoClienteValido = validarTipoCliente(valorTipoCliente);
    const contrasenaValida = validarContrasena(valorContrasena);
    const repeticionValida = validarRepeticion(valorRepeticion, valorContrasena);

    const formularioValido = rutValido && nombreValido && correoValido &&
        telefonoValido && tipoClienteValido && contrasenaValida && repeticionValida;

    if (!formularioValido) {
        mensajeRegistro.textContent = "Revisa los campos marcados antes de continuar.";
        mensajeRegistro.classList.add("mensaje-error-general");
        return;
    }

    const usuario = {
        rut: valorRut,
        nombre: valorNombre,
        correo: valorCorreo,
        telefono: valorTelefono,
        tipoCliente: valorTipoCliente
    };

    guardarUsuario(usuario);
    formularioRegistro.reset();
    mensajeRegistro.classList.remove("mensaje-error-general");
    mensajeRegistro.textContent = "Registro guardado correctamente. Por seguridad, la contraseña no se almacena en localStorage.";
}

formularioRegistro.addEventListener("submit", procesarRegistro);

const formularioLogin = document.querySelector("#formulario-login");
const correoLogin = document.querySelector("#correo-login");
const contrasenaLogin = document.querySelector("#contrasena-login");
const mensajeLogin = document.querySelector("#mensaje-login");
const recordarme = document.querySelector("#recordarme");

const usuariosDemo = [
    {
        nombre: "Cliente de prueba",
        correo: "cliente@losmaestros.cl",
        contrasena: "cliente123",
        rol: "Cliente",
        panel: "panel-cliente.html"
    },
    {
        nombre: "Empleado de prueba",
        correo: "empleado@losmaestros.cl",
        contrasena: "empleado123",
        rol: "Empleado",
        panel: "panel-empleado.html"
    },
    {
        nombre: "Administrador de prueba",
        correo: "admin@losmaestros.cl",
        contrasena: "admin123",
        rol: "Administrador",
        panel: "panel-admin.html"
    }
];

function validarCorreoLogin(valor) {
    limpiarError(correoLogin, "error-correo-login");

    if (valor === "") {
        mostrarError(correoLogin, "error-correo-login", "El correo es obligatorio.");
        return false;
    }

    if (!valor.includes("@") || !valor.includes(".")) {
        mostrarError(correoLogin, "error-correo-login", "Escribe un correo válido.");
        return false;
    }

    return true;
}

function validarContrasenaLogin(valor) {
    limpiarError(contrasenaLogin, "error-contrasena-login");

    if (valor.length < 6 || valor.length > 12) {
        mostrarError(contrasenaLogin, "error-contrasena-login", "La contraseña debe tener entre 6 y 12 caracteres.");
        return false;
    }

    return true;
}

function buscarUsuarioDemo(valorCorreo) {
    for (const usuario of usuariosDemo) {
        if (usuario.correo.toLowerCase() === valorCorreo.toLowerCase()) {
            return usuario;
        }
    }

    return null;
}

function buscarUsuarioRegistrado(valorCorreo) {
    const textoUsuarios = localStorage.getItem("ferreteriaUsuarios");

    if (textoUsuarios === null) {
        return null;
    }

    const usuarios = JSON.parse(textoUsuarios);

    for (const usuario of usuarios) {
        if (usuario.correo.toLowerCase() === valorCorreo.toLowerCase()) {
            return usuario;
        }
    }

    return null;
}

function guardarSesionDemo(nombreUsuario, correoUsuario, rolUsuario, recordarSesion) {
    const sesion = {
        nombre: nombreUsuario,
        correo: correoUsuario,
        rol: rolUsuario
    };

    const sesionTexto = JSON.stringify(sesion);

    localStorage.removeItem("ferreteriaSesionDemo");
    sessionStorage.removeItem("ferreteriaSesionDemo");

    if (recordarSesion) {
        localStorage.setItem("ferreteriaSesionDemo", sesionTexto);
    } else {
        sessionStorage.setItem("ferreteriaSesionDemo", sesionTexto);
    }
}

function procesarLogin(evento) {
    evento.preventDefault();

    const valorCorreo = correoLogin.value.trim();
    const valorContrasena = contrasenaLogin.value;
    const recordarSesion = recordarme !== null && recordarme.checked;

    const correoValido = validarCorreoLogin(valorCorreo);
    const contrasenaValida = validarContrasenaLogin(valorContrasena);

    if (!correoValido || !contrasenaValida) {
        mensajeLogin.textContent = "Revisa los campos marcados antes de continuar.";
        mensajeLogin.classList.add("mensaje-error-general");
        return;
    }

    const usuarioDemo = buscarUsuarioDemo(valorCorreo);

    if (usuarioDemo !== null) {
        if (valorContrasena !== usuarioDemo.contrasena) {
            mostrarError(contrasenaLogin, "error-contrasena-login", "La clave del usuario de prueba no es correcta.");
            mensajeLogin.textContent = "Revisa la clave indicada para este usuario de prueba.";
            mensajeLogin.classList.add("mensaje-error-general");
            return;
        }

        guardarSesionDemo(usuarioDemo.nombre, usuarioDemo.correo, usuarioDemo.rol, recordarSesion);
        window.location.href = usuarioDemo.panel;
        return;
    }

    const usuarioRegistrado = buscarUsuarioRegistrado(valorCorreo);

    if (usuarioRegistrado === null) {
        mensajeLogin.textContent = "No encontramos una cuenta con ese correo. Puedes registrarte a la izquierda o usar un usuario de prueba.";
        mensajeLogin.classList.add("mensaje-error-general");
        return;
    }

    guardarSesionDemo(usuarioRegistrado.nombre, usuarioRegistrado.correo, "Cliente", recordarSesion);
    window.location.href = "panel-cliente.html";
}

if (formularioLogin) {
    formularioLogin.addEventListener("submit", procesarLogin);
}
