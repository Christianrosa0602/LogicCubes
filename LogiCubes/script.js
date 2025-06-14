let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

function agregarAlCarrito(nombre, precio) {
    // Agregar producto al arreglo
    carrito.push({ nombre, precio });

    // Guardar carrito actualizado en localStorage
    localStorage.setItem("carrito", JSON.stringify(carrito));

    alert(`✅ ${nombre} agregado al carrito.`);
}
