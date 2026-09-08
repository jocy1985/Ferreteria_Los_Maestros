const contenedorCatalogo = document.querySelector("#catalogo-productos");
const campoBusqueda = document.querySelector("#buscar-producto");
const selectorCategoria = document.querySelector("#categoria-producto");
const mensajeCatalogo = document.querySelector("#mensaje-catalogo");

function crearTarjetaProducto(producto) {
    const tarjeta = document.createElement("article");
    tarjeta.classList.add("tarjeta-producto");

    const imagen = document.createElement("img");
    imagen.src = producto.imagen;
    imagen.alt = "Imagen referencial de " + producto.nombre;
    imagen.classList.add("imagen-producto");

    const categoria = document.createElement("p");
    categoria.classList.add("etiqueta");
    categoria.textContent = producto.categoria;

    const nombre = document.createElement("h2");
    nombre.textContent = producto.nombre;

    const marca = document.createElement("p");
    marca.textContent = "Marca: " + producto.marca;

    const codigo = document.createElement("p");
    codigo.classList.add("texto-suave");
    codigo.textContent = "Código: " + producto.codigo;

    const precio = document.createElement("p");
    precio.classList.add("precio");
    precio.textContent = formatearPrecio(producto.precio) + " / " + producto.unidad;

    const stock = document.createElement("p");
    if (producto.stock <= producto.stockMinimo) {
        stock.classList.add("estado-stock", "stock-bajo");
        stock.textContent = "Stock bajo: " + producto.stock;
    } else {
        stock.classList.add("estado-stock", "stock-disponible");
        stock.textContent = "Stock disponible: " + producto.stock;
    }

    const grupoCantidad = document.createElement("div");
    grupoCantidad.classList.add("grupo-cantidad");

    const etiquetaCantidad = document.createElement("label");
    const idCantidad = "cantidad-" + producto.codigo;
    etiquetaCantidad.setAttribute("for", idCantidad);
    etiquetaCantidad.textContent = "Cantidad";

    const cantidad = document.createElement("input");
    cantidad.id = idCantidad;
    cantidad.type = "number";
    cantidad.min = "1";
    cantidad.max = String(producto.stock);
    cantidad.value = "1";

    const boton = document.createElement("button");
    boton.type = "button";
    boton.classList.add("boton");
    boton.setAttribute("data-codigo", producto.codigo);
    boton.textContent = "Agregar a mi pedido";
    boton.addEventListener("click", agregarProductoDesdeTarjeta);

    grupoCantidad.appendChild(etiquetaCantidad);
    grupoCantidad.appendChild(cantidad);

    tarjeta.appendChild(imagen);
    tarjeta.appendChild(categoria);
    tarjeta.appendChild(nombre);
    tarjeta.appendChild(marca);
    tarjeta.appendChild(codigo);
    tarjeta.appendChild(precio);
    tarjeta.appendChild(stock);
    tarjeta.appendChild(grupoCantidad);
    tarjeta.appendChild(boton);

    contenedorCatalogo.appendChild(tarjeta);
}

function renderizarCatalogo() {
    contenedorCatalogo.textContent = "";
    mensajeCatalogo.textContent = "";

    const texto = campoBusqueda.value.trim().toLowerCase();
    const categoriaElegida = selectorCategoria.value;
    let cantidadMostrada = 0;

    for (const producto of productos) {
        const coincideNombre = producto.nombre.toLowerCase().includes(texto) ||
            producto.marca.toLowerCase().includes(texto) ||
            producto.codigo.toLowerCase().includes(texto);

        const coincideCategoria = categoriaElegida === "Todas" ||
            producto.categoria === categoriaElegida;

        if (coincideNombre && coincideCategoria) {
            crearTarjetaProducto(producto);
            cantidadMostrada = cantidadMostrada + 1;
        }
    }

    if (cantidadMostrada === 0) {
        mensajeCatalogo.textContent = "No encontramos productos con esos filtros.";
    } else {
        mensajeCatalogo.textContent = "Mostrando " + cantidadMostrada + " producto(s).";
    }
}

function agregarProductoDesdeTarjeta(evento) {
    const boton = evento.currentTarget;
    const codigo = boton.getAttribute("data-codigo");
    const producto = buscarProductoPorCodigo(codigo);
    const campoCantidad = document.querySelector("#cantidad-" + codigo);
    const cantidad = Number(campoCantidad.value);

    if (cantidad < 1 || cantidad > producto.stock) {
        mensajeCatalogo.textContent = "La cantidad para " + producto.nombre + " debe estar entre 1 y " + producto.stock + ".";
        campoCantidad.focus();
        return;
    }

    const carrito = obtenerCarrito();
    let itemEncontrado = null;

    for (const item of carrito) {
        if (item.codigo === codigo) {
            itemEncontrado = item;
        }
    }

    if (itemEncontrado === null) {
        carrito.push({
            codigo: codigo,
            cantidad: cantidad
        });
    } else {
        const nuevaCantidad = itemEncontrado.cantidad + cantidad;

        if (nuevaCantidad > producto.stock) {
            mensajeCatalogo.textContent = "No puedes agregar más de " + producto.stock + " unidades de " + producto.nombre + ".";
            return;
        }

        itemEncontrado.cantidad = nuevaCantidad;
    }

    guardarCarrito(carrito);
    mensajeCatalogo.textContent = producto.nombre + " fue agregado a tu pedido.";
}

campoBusqueda.addEventListener("input", renderizarCatalogo);
selectorCategoria.addEventListener("change", renderizarCatalogo);

renderizarCatalogo();
