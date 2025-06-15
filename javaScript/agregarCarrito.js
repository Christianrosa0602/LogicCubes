/* let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

function agregarAlCarrito(nombre, precio) {
    // Agregar producto al arreglo
    carrito.push({ nombre, precio });

    // Guardar carrito actualizado en localStorage
    localStorage.setItem("carrito", JSON.stringify(carrito));

    alert(`✅ ${nombre} agregado al carrito.`);
} */

function agregarAlCarrito(nombre, precio) {
    const usuarioActivo = JSON.parse(localStorage.getItem("usuarioActivo"));
    if (!usuarioActivo) {
        alert ("Debes iniciar sesión para agregar productos al carrito");
        return;
    }

    const claveCarrito = `carrito_${usuarioActivo.correo}`;
    let carrito = JSON.parse(localStorage.getItem(claveCarrito)) || [];

    carrito.push({ nombre, precio });
    localStorage.setItem(claveCarrito, JSON.stringify(carrito));

    alert(`${nombre} agregado al carrito`);
}