const CLAVE_CARRITO = "ferreteriaCarrito";

function formatearPrecio(valor) {
    return "$" + valor.toLocaleString("es-CL");
}

function obtenerCarrito() {
    const textoGuardado = localStorage.getItem(CLAVE_CARRITO);

    if (textoGuardado === null) {
        return [];
    }

    return JSON.parse(textoGuardado);
}

function guardarCarrito(carrito) {
    localStorage.setItem(CLAVE_CARRITO, JSON.stringify(carrito));
    actualizarContadorCarrito();
}

function buscarProductoPorCodigo(codigo) {
    for (const producto of productos) {
        if (producto.codigo === codigo) {
            return producto;
        }
    }

    return null;
}

function actualizarContadorCarrito() {
    const contador = document.querySelector("#contador-carrito");

    if (contador === null) {
        return;
    }

    const carrito = obtenerCarrito();
    let totalUnidades = 0;

    for (const item of carrito) {
        totalUnidades = totalUnidades + item.cantidad;
    }

    contador.textContent = String(totalUnidades);
}

const botonMenu = document.querySelector("#boton-menu");
const menuPrincipal = document.querySelector("#menu-principal");

function alternarMenu() {
    const menuAbierto = menuPrincipal.classList.toggle("menu-abierto");
    botonMenu.setAttribute("aria-expanded", String(menuAbierto));
}

if (botonMenu !== null && menuPrincipal !== null) {
    botonMenu.addEventListener("click", alternarMenu);
}

actualizarContadorCarrito();

const CLAVE_SESION = "ferreteriaSesionDemo";

function obtenerSesion() {
    let textoSesion = localStorage.getItem(CLAVE_SESION);

    if (textoSesion === null) {
        textoSesion = sessionStorage.getItem(CLAVE_SESION);
    }

    if (textoSesion === null) {
        return null;
    }

    return JSON.parse(textoSesion);
}

function obtenerPanelPorRol(rol) {
    if (rol === "Administrador") {
        return "panel-admin.html";
    }

    if (rol === "Empleado") {
        return "panel-empleado.html";
    }

    return "panel-cliente.html";
}

function obtenerTextoCuenta(sesion) {
    if (sesion.rol === "Administrador") {
        return "Panel administrador";
    }

    if (sesion.rol === "Empleado") {
        return "Panel empleado";
    }

    return "Mi cuenta - " + sesion.nombre;
}

function cerrarSesion() {
    localStorage.removeItem(CLAVE_SESION);
    sessionStorage.removeItem(CLAVE_SESION);
    window.location.href = "index.html";
}

function actualizarNavegacionSesion() {
    const sesion = obtenerSesion();

    if (sesion === null) {
        return;
    }

    const panel = obtenerPanelPorRol(sesion.rol);
    const enlacesAcceso = document.querySelectorAll('a[href="registro.html"]');

    for (const enlace of enlacesAcceso) {
        enlace.href = panel;
        enlace.textContent = obtenerTextoCuenta(sesion);
        enlace.removeAttribute("aria-current");
    }

    const menu = document.querySelector("#menu-principal");

    if (menu !== null && document.querySelector("#boton-cerrar-sesion") === null) {
        const botonCerrar = document.createElement("button");
        botonCerrar.id = "boton-cerrar-sesion";
        botonCerrar.classList.add("boton-cerrar-sesion");
        botonCerrar.type = "button";
        botonCerrar.textContent = "Cerrar sesión";
        botonCerrar.addEventListener("click", cerrarSesion);
        menu.appendChild(botonCerrar);
    }

    const enlacePanelCliente = document.querySelector('#menu-principal a[href="panel-cliente.html"]');

    if (sesion.rol !== "Administrador" && sesion.rol !== "Empleado" && enlacePanelCliente !== null) {
        enlacePanelCliente.textContent = obtenerTextoCuenta(sesion);
    }

    const enlacePanelEmpleado = document.querySelector('#menu-principal a[href="panel-empleado.html"]');

    if (sesion.rol === "Administrador" && enlacePanelEmpleado !== null) {
        enlacePanelEmpleado.href = "panel-admin.html";
        enlacePanelEmpleado.textContent = "Panel administrador";
    }
}

actualizarNavegacionSesion();
