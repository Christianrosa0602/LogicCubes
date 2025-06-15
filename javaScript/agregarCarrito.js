function agregarAlCarrito(nombre, precio) {
    const usuarioActivo = JSON.parse(localStorage.getItem("usuarioActivo"));
    if (!usuarioActivo) {
        alert("Debes iniciar sesión para agregar productos al carrito");
        return;
    }

    const claveCarrito = `carrito_${usuarioActivo.correo}`;
    let carrito = JSON.parse(localStorage.getItem(claveCarrito)) || [];

    const productoExistente = carrito.find(p => p.nombre === nombre);

    if (productoExistente) {
        productoExistente.cantidad += 1;
    } else {
        carrito.push({ nombre, precio, cantidad: 1 });
    }

    localStorage.setItem(claveCarrito, JSON.stringify(carrito));
    alert(`${nombre} agregado al carrito`);
}
