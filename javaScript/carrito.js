let claveCarrito = "";
let carrito = [];

// Mostrar el carrito
function mostrarCarrito() {
    const usuario = JSON.parse(localStorage.getItem("usuarioActivo"));
    if (!usuario) return;

    claveCarrito = `carrito_${usuario.correo}`;
    carrito = JSON.parse(localStorage.getItem(claveCarrito)) || [];

    const contenedor = document.getElementById("lista-carrito");
    const totalElemento = document.getElementById("total");
    contenedor.innerHTML = "";

    let total = 0;

    carrito.forEach((item, index) => {
        const div = document.createElement("div");
        div.innerHTML = `
            <p><strong>${item.nombre}</strong> - $${item.precio} x ${item.cantidad}</p>
            <button onclick="eliminarProducto(${index})">Eliminar</button>
            <hr>
        `;
        contenedor.appendChild(div);
        total += item.precio * item.cantidad;
    });

    totalElemento.textContent = `Total: $${total}`;
}

// Eliminar un producto del carrito
function eliminarProducto(indice) {
    carrito.splice(indice, 1);
    localStorage.setItem(claveCarrito, JSON.stringify(carrito));
    mostrarCarrito();
}

// Vaciar el carrito completo
function vaciarCarrito() {
    localStorage.removeItem(claveCarrito);
    carrito = [];
    mostrarCarrito();
}

// Finalizar la compra
function finalizarCompra() {
    const confirmar = confirm("¿Estás seguro de finalizar la compra?");
    if (!confirmar) return;

    const usuario = JSON.parse(localStorage.getItem("usuarioActivo"));
    if (!usuario) {
        alert("Debes iniciar sesión para completar la compra.");
        return;
    }

    claveCarrito = `carrito_${usuario.correo}`;
    carrito = JSON.parse(localStorage.getItem(claveCarrito)) || [];

    if (carrito.length === 0) {
        alert("Tu carrito está vacío.");
        return;
    }

    // Cargar productos del inventario
    let productos = JSON.parse(localStorage.getItem("productos")) || [];

    // Verificar disponibilidad de stock
    const sinStock = carrito.find(item => {
        const prodInv = productos.find(p => p.nombre === item.nombre);
        return !prodInv || prodInv.stock < item.cantidad;
    });

    if (sinStock) {
        alert(`No hay suficiente stock de: ${sinStock.nombre}`);
        return;
    }

    // Descontar stock
    carrito.forEach(item => {
        const prodInv = productos.find(p => p.nombre === item.nombre);
        if (prodInv) {
            prodInv.stock -= item.cantidad;
            if (prodInv.stock < 0) prodInv.stock = 0;
        }
    });

    localStorage.setItem("productos", JSON.stringify(productos));

    // Crear el pedido
    const fecha = new Date().toISOString();
    const total = carrito.reduce((sum, item) => sum + item.precio * item.cantidad, 0);

    const pedido = {
        id_pedido: Date.now(),
        id_usuario: usuario.id || usuario.correo,
        fecha,
        productos: carrito.map(item => ({
            nombre: item.nombre,
            cantidad: item.cantidad,
            precio_unitario: item.precio,
            subtotal: item.precio * item.cantidad
        })),
        total,
        estado: "En proceso"
    };

    const pedidos = JSON.parse(localStorage.getItem("pedidos")) || [];
    pedidos.push(pedido);
    localStorage.setItem("pedidos", JSON.stringify(pedidos));

    // Limpiar carrito
    localStorage.removeItem(claveCarrito);
    carrito = [];
    mostrarCarrito();

    alert("¡Gracias por tu compra!");
    window.location.href = "index.html";
}

// Mostrar carrito al cargar la página
window.addEventListener("DOMContentLoaded", mostrarCarrito);
