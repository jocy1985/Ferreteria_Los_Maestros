const contenedorCarrito = document.querySelector("#lista-carrito");
const totalCarrito = document.querySelector("#total-carrito");
const mensajeCarrito = document.querySelector("#mensaje-carrito");
const botonVaciar = document.querySelector("#vaciar-carrito");
const enlaceContinuar = document.querySelector("#continuar-pedido");

function renderizarCarrito() {
    const carrito = obtenerCarrito();
    contenedorCarrito.textContent = "";
    let total = 0;

    if (carrito.length === 0) {
        const mensaje = document.createElement("p");
        mensaje.textContent = "Tu pedido está vacío. Agrega productos desde el catálogo.";
        contenedorCarrito.appendChild(mensaje);
        totalCarrito.textContent = formatearPrecio(0);
        enlaceContinuar.classList.add("boton-deshabilitado");
        enlaceContinuar.setAttribute("aria-disabled", "true");
        return;
    }

    enlaceContinuar.classList.remove("boton-deshabilitado");
    enlaceContinuar.removeAttribute("aria-disabled");

    for (const item of carrito) {
        const producto = buscarProductoPorCodigo(item.codigo);

        if (producto === null) {
            continue;
        }

        const subtotal = producto.precio * item.cantidad;
        total = total + subtotal;

        const articulo = document.createElement("article");
        articulo.classList.add("item-carrito");

        const bloqueInfo = document.createElement("div");

        const nombre = document.createElement("h2");
        nombre.textContent = producto.nombre;

        const precio = document.createElement("p");
        precio.textContent = formatearPrecio(producto.precio) + " por " + producto.unidad;

        const subtotalTexto = document.createElement("p");
        subtotalTexto.classList.add("precio");
        subtotalTexto.textContent = "Subtotal: " + formatearPrecio(subtotal);

        bloqueInfo.appendChild(nombre);
        bloqueInfo.appendChild(precio);
        bloqueInfo.appendChild(subtotalTexto);

        const controles = document.createElement("div");
        controles.classList.add("controles-carrito");

        const botonRestar = document.createElement("button");
        botonRestar.type = "button";
        botonRestar.textContent = "−";
        botonRestar.setAttribute("aria-label", "Restar una unidad de " + producto.nombre);
        botonRestar.setAttribute("data-codigo", producto.codigo);
        botonRestar.addEventListener("click", restarCantidad);

        const cantidad = document.createElement("span");
        cantidad.classList.add("cantidad-carrito");
        cantidad.textContent = String(item.cantidad);

        const botonSumar = document.createElement("button");
        botonSumar.type = "button";
        botonSumar.textContent = "+";
        botonSumar.setAttribute("aria-label", "Sumar una unidad de " + producto.nombre);
        botonSumar.setAttribute("data-codigo", producto.codigo);
        botonSumar.addEventListener("click", sumarCantidad);

        const botonEliminar = document.createElement("button");
        botonEliminar.type = "button";
        botonEliminar.classList.add("boton-secundario");
        botonEliminar.textContent = "Eliminar";
        botonEliminar.setAttribute("data-codigo", producto.codigo);
        botonEliminar.addEventListener("click", eliminarProducto);

        controles.appendChild(botonRestar);
        controles.appendChild(cantidad);
        controles.appendChild(botonSumar);
        controles.appendChild(botonEliminar);

        articulo.appendChild(bloqueInfo);
        articulo.appendChild(controles);
        contenedorCarrito.appendChild(articulo);
    }

    totalCarrito.textContent = formatearPrecio(total);
}

function sumarCantidad(evento) {
    cambiarCantidad(evento.currentTarget.getAttribute("data-codigo"), 1);
}

function restarCantidad(evento) {
    cambiarCantidad(evento.currentTarget.getAttribute("data-codigo"), -1);
}

function cambiarCantidad(codigo, cambio) {
    const carrito = obtenerCarrito();
    const producto = buscarProductoPorCodigo(codigo);

    for (const item of carrito) {
        if (item.codigo === codigo) {
            const nuevaCantidad = item.cantidad + cambio;

            if (nuevaCantidad < 1) {
                mensajeCarrito.textContent = "La cantidad mínima es 1. Usa Eliminar si deseas quitar el producto.";
                return;
            }

            if (nuevaCantidad > producto.stock) {
                mensajeCarrito.textContent = "No hay más stock disponible de " + producto.nombre + ".";
                return;
            }

            item.cantidad = nuevaCantidad;
        }
    }

    mensajeCarrito.textContent = "";
    guardarCarrito(carrito);
    renderizarCarrito();
}

function eliminarProducto(evento) {
    const codigo = evento.currentTarget.getAttribute("data-codigo");
    const carrito = obtenerCarrito();
    const nuevoCarrito = [];

    for (const item of carrito) {
        if (item.codigo !== codigo) {
            nuevoCarrito.push(item);
        }
    }

    guardarCarrito(nuevoCarrito);
    mensajeCarrito.textContent = "Producto eliminado del pedido.";
    renderizarCarrito();
}

function vaciarCarrito() {
    guardarCarrito([]);
    mensajeCarrito.textContent = "Tu pedido fue vaciado.";
    renderizarCarrito();
}

function controlarContinuar(evento) {
    if (obtenerCarrito().length === 0) {
        evento.preventDefault();
        mensajeCarrito.textContent = "Debes agregar al menos un producto antes de continuar.";
    }
}

botonVaciar.addEventListener("click", vaciarCarrito);
enlaceContinuar.addEventListener("click", controlarContinuar);

renderizarCarrito();
