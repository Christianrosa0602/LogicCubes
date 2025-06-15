const contenedor = document.getElementById("catalogo-productos");

function cargarProductos() {
  const productos = JSON.parse(localStorage.getItem("productos")) || [];

  if (productos.length === 0) {
    contenedor.innerHTML = "<p>No hay productos disponibles.</p>";
    return;
  }

  productos.forEach(prod => {
    const card = document.createElement("div");
    card.classList.add("producto");
    card.innerHTML = `
        <img src="${prod.imagen}" alt="${prod.nombre}">
        <h3>${prod.nombre}</h3>
        <p>Precio: $${prod.precio}</p>
        <p>Stock: ${prod.stock}</p>
        <p>Categoría: ${prod.categoria}</p>
        <hr>
        <button onclick="agregarAlCarrito('${prod.nombre}', ${prod.precio})">Agregar al Carrito</button>
    `;
    contenedor.appendChild(card);
  });
}

cargarProductos();
