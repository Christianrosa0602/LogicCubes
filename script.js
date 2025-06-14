let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

function agregarAlCarrito(nombre, precio) {
    // Agregar producto al arreglo
    carrito.push({ nombre, precio });

    // Guardar carrito actualizado en localStorage
    localStorage.setItem("carrito", JSON.stringify(carrito));

    alert(`✅ ${nombre} agregado al carrito.`);
}

let total = 0;
carrito.forEach(producto => {
  const item = document.createElement("p");
  item.textContent = `${producto.nombre} - $${producto.precio}`;
  contenedor.appendChild(item);
  total += producto.precio;
});

const totalElement = document.createElement("h3");
totalElement.textContent = `Total: $${total}`;
contenedor.appendChild(totalElement);
