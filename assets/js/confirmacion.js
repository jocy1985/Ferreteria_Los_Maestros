const detalleConfirmacion = document.querySelector("#detalle-confirmacion");
const textoPedido = localStorage.getItem("ferreteriaUltimoPedido");

function agregarDatoConfirmacion(etiqueta, valor) {
    const parrafo = document.createElement("p");
    const textoFuerte = document.createElement("strong");

    textoFuerte.textContent = etiqueta + ": ";
    parrafo.appendChild(textoFuerte);
    parrafo.appendChild(document.createTextNode(valor));
    detalleConfirmacion.appendChild(parrafo);
}

if (textoPedido === null) {
    detalleConfirmacion.textContent = "No hay un pedido reciente para mostrar.";
} else {
    const pedido = JSON.parse(textoPedido);

    agregarDatoConfirmacion("Pedido", "#" + pedido.numero);
    agregarDatoConfirmacion("Nombre", pedido.nombre);
    agregarDatoConfirmacion("Correo", pedido.correo);
    agregarDatoConfirmacion("Entrega", pedido.entrega);
    agregarDatoConfirmacion("Total", formatearPrecio(pedido.total));
    agregarDatoConfirmacion("Estado", "Recibido - pendiente de confirmación");

    if (pedido.entrega === "Despacho") {
        agregarDatoConfirmacion("Dirección", pedido.direccion);
    }
}