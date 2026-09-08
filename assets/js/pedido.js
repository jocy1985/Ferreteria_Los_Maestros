const formularioPedido = document.querySelector("#formulario-pedido");
const nombrePedido = document.querySelector("#nombre-pedido");
const correoPedido = document.querySelector("#correo-pedido");
const telefonoPedido = document.querySelector("#telefono-pedido");
const direccionPedido = document.querySelector("#direccion-pedido");
const bloqueDireccion = document.querySelector("#bloque-direccion");
const mensajePedido = document.querySelector("#mensaje-pedido");
const resumenPedido = document.querySelector("#resumen-pedido");
const totalPedido = document.querySelector("#total-pedido");
const opcionesEntrega = document.querySelectorAll('input[name="entrega"]');

function mostrarResumenPedido() {
    const carrito = obtenerCarrito();
    resumenPedido.textContent = "";
    let total = 0;

    if (carrito.length === 0) {
        const aviso = document.createElement("p");
        aviso.textContent = "No hay productos en tu pedido. Vuelve al catálogo antes de confirmar.";
        resumenPedido.appendChild(aviso);
        totalPedido.textContent = formatearPrecio(0);
        return;
    }

    for (const item of carrito) {
        const producto = buscarProductoPorCodigo(item.codigo);
        const subtotal = producto.precio * item.cantidad;
        total = total + subtotal;

        const fila = document.createElement("p");
        fila.textContent = producto.nombre + " × " + item.cantidad + " = " + formatearPrecio(subtotal);
        resumenPedido.appendChild(fila);
    }

    totalPedido.textContent = formatearPrecio(total);
}

function obtenerEntregaSeleccionada() {
    for (const opcion of opcionesEntrega) {
        if (opcion.checked) {
            return opcion.value;
        }
    }

    return "";
}

function actualizarDireccion() {
    const entrega = obtenerEntregaSeleccionada();

    if (entrega === "Despacho") {
        bloqueDireccion.hidden = false;
    } else {
        bloqueDireccion.hidden = true;
        direccionPedido.value = "";
        document.querySelector("#error-direccion-pedido").textContent = "";
    }
}

function mostrarErrorPedido(control, idError, mensaje) {
    const salida = document.querySelector("#" + idError);
    salida.textContent = mensaje;
    control.classList.add("campo-invalido");
    control.setAttribute("aria-invalid", "true");
}

function limpiarErrorPedido(control, idError) {
    const salida = document.querySelector("#" + idError);
    salida.textContent = "";
    control.classList.remove("campo-invalido");
    control.removeAttribute("aria-invalid");
}

function validarNombrePedido() {
    limpiarErrorPedido(nombrePedido, "error-nombre-pedido");
    const valor = nombrePedido.value.trim();

    if (valor.length < 3) {
        mostrarErrorPedido(nombrePedido, "error-nombre-pedido", "Escribe el nombre de quien recibe el pedido.");
        return false;
    }

    return true;
}

function validarCorreoPedido() {
    limpiarErrorPedido(correoPedido, "error-correo-pedido");
    const valor = correoPedido.value.trim();
    const formato = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (valor === "") {
        mostrarErrorPedido(correoPedido, "error-correo-pedido", "Escribe un correo electrónico.");
        return false;
    }

    if (!formato.test(valor)) {
        mostrarErrorPedido(correoPedido, "error-correo-pedido", "Escribe un correo electrónico válido.");
        return false;
    }

    return true;
}

function validarTelefonoPedido() {
    limpiarErrorPedido(telefonoPedido, "error-telefono-pedido");
    const valor = telefonoPedido.value.trim();
    const formato = /^9[0-9]{8}$/;

    if (!formato.test(valor)) {
        mostrarErrorPedido(telefonoPedido, "error-telefono-pedido", "Escribe un celular de 9 dígitos comenzando con 9.");
        return false;
    }

    return true;
}

function validarEntrega() {
    const errorEntrega = document.querySelector("#error-entrega");
    const entrega = obtenerEntregaSeleccionada();
    errorEntrega.textContent = "";

    if (entrega === "") {
        errorEntrega.textContent = "Selecciona retiro en tienda o despacho.";
        return false;
    }

    return true;
}

function validarDireccion() {
    limpiarErrorPedido(direccionPedido, "error-direccion-pedido");
    const entrega = obtenerEntregaSeleccionada();

    if (entrega === "Despacho" && direccionPedido.value.trim().length < 5) {
        mostrarErrorPedido(direccionPedido, "error-direccion-pedido", "Escribe una dirección de despacho válida.");
        return false;
    }

    return true;
}

function obtenerSiguienteNumeroPedido() {
    const textoNumero = localStorage.getItem("ferreteriaNumeroPedido");
    let numero = 1;

    if (textoNumero !== null) {
        numero = Number(textoNumero) + 1;
    }

    localStorage.setItem("ferreteriaNumeroPedido", String(numero));
    return numero;
}

function procesarPedido(evento) {
    evento.preventDefault();

    if (obtenerCarrito().length === 0) {
        mensajePedido.textContent = "Tu pedido está vacío.";
        return;
    }

    const nombreValido = validarNombrePedido();
    const correoValido = validarCorreoPedido();
    const telefonoValido = validarTelefonoPedido();
    const entregaValida = validarEntrega();
    const direccionValida = validarDireccion();

    if (!nombreValido || !correoValido || !telefonoValido || !entregaValida || !direccionValida) {
        mensajePedido.textContent = "Revisa los datos marcados.";
        return;
    }

    const carrito = obtenerCarrito();
    let total = 0;

    for (const item of carrito) {
        const producto = buscarProductoPorCodigo(item.codigo);
        total = total + producto.precio * item.cantidad;
    }

    const pedido = {
        numero: obtenerSiguienteNumeroPedido(),
        nombre: nombrePedido.value.trim(),
        correo: correoPedido.value.trim(),
        telefono: telefonoPedido.value.trim(),
        entrega: obtenerEntregaSeleccionada(),
        direccion: direccionPedido.value.trim(),
        observaciones: document.querySelector("#observaciones-pedido").value.trim(),
        total: total,
        productos: carrito
    };

    localStorage.setItem("ferreteriaUltimoPedido", JSON.stringify(pedido));
    guardarCarrito([]);
    window.location.href = "confirmacion.html";
}

for (const opcion of opcionesEntrega) {
    opcion.addEventListener("change", actualizarDireccion);
}

formularioPedido.addEventListener("submit", procesarPedido);

mostrarResumenPedido();
actualizarDireccion();