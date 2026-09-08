function obtenerSesion() {
    const sesionLocal = localStorage.getItem("ferreteriaSesionDemo");
    const sesionTemporal = sessionStorage.getItem("ferreteriaSesionDemo");
    const sesionTexto = sesionLocal !== null ? sesionLocal : sesionTemporal;

    if (sesionTexto === null) {
        return null;
    }

    return JSON.parse(sesionTexto);
}

function cerrarSesion() {
    localStorage.removeItem("ferreteriaSesionDemo");
    sessionStorage.removeItem("ferreteriaSesionDemo");
    window.location.href = "registro.html";
}

const enlaceCerrarSesion = document.querySelector("#cerrar-sesion");

if (enlaceCerrarSesion) {
    enlaceCerrarSesion.addEventListener("click", function (evento) {
        evento.preventDefault();
        cerrarSesion();
    });
}

const saludoCliente = document.querySelector("#saludo-cliente");

if (saludoCliente) {
    const sesionActual = obtenerSesion();

    if (sesionActual === null) {
        window.location.href = "registro.html";
    } else {
        saludoCliente.textContent = "Hola, " + sesionActual.nombre + ". Consulta tu pedido activo, revisa tu historial y visualiza la información de tu cuenta.";
    }
}