const cuerpoInventario = document.querySelector("#cuerpo-inventario");
const buscarInventario = document.querySelector("#buscar-inventario");
const mensajeInventario = document.querySelector("#mensaje-inventario");

function renderizarInventario() {
    cuerpoInventario.textContent = "";
    const texto = buscarInventario.value.trim().toLowerCase();
    let cantidad = 0;

    for (const producto of productos) {
        const coincide = producto.nombre.toLowerCase().includes(texto) ||
            producto.codigo.toLowerCase().includes(texto) ||
            producto.categoria.toLowerCase().includes(texto);

        if (!coincide) {
            continue;
        }

        cantidad = cantidad + 1;
        const fila = document.createElement("tr");

        const codigo = document.createElement("th");
        codigo.scope = "row";
        codigo.textContent = producto.codigo;

        const nombre = document.createElement("td");
        nombre.textContent = producto.nombre;

        const categoria = document.createElement("td");
        categoria.textContent = producto.categoria;

        const stock = document.createElement("td");
        stock.textContent = String(producto.stock);

        const minimo = document.createElement("td");
        minimo.textContent = String(producto.stockMinimo);

        const estado = document.createElement("td");

        if (producto.stock <= producto.stockMinimo) {
            estado.textContent = "Stock bajo";
            estado.classList.add("celda-alerta");
        } else {
            estado.textContent = "Disponible";
            estado.classList.add("celda-correcta");
        }

        fila.appendChild(codigo);
        fila.appendChild(nombre);
        fila.appendChild(categoria);
        fila.appendChild(stock);
        fila.appendChild(minimo);
        fila.appendChild(estado);
        cuerpoInventario.appendChild(fila);
    }

    mensajeInventario.textContent = "Mostrando " + cantidad + " producto(s).";
}

buscarInventario.addEventListener("input", renderizarInventario);
renderizarInventario();
