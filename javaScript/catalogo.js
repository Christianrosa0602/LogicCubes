const contenedor = document.getElementById("catalogo-productos");

function cargarProductos() {
  const productos = JSON.parse(localStorage.getItem("productos")) || [];

  if (productos.length === 0) {
    contenedor.innerHTML = "<p>No hay productos disponibles.</p>";
    return;
  }

  // Agrupar por categoría
  const categorias = {};
  productos.forEach(prod => {
    if (!categorias[prod.categoria]) {
      categorias[prod.categoria] = [];
    }
    categorias[prod.categoria].push(prod);
  });

  contenedor.innerHTML = ""; // Limpiar antes de renderizar

  for (const categoria in categorias) {
    const seccion = document.createElement("section");

    const titulo = document.createElement("h3");
    titulo.textContent = categoria;
    seccion.appendChild(titulo);

    const fila = document.createElement("div");
    fila.classList.add("catalogo"); // Usamos el estilo ya hecho para mostrar en filas horizontales

    categorias[categoria].forEach(prod => {
      const card = document.createElement("div");
      card.classList.add("producto");

      card.innerHTML = `
        <a href="producto.html?id=${prod.id}">
          <img src="${prod.imagen}" alt="${prod.nombre}">
          <h3>${prod.nombre}</h3>
          <p>$${prod.precio}</p>
        </a>
        <button onclick="agregarAlCarrito('${prod.nombre}', ${prod.precio})">Agregar al carrito</button>
      `;


      fila.appendChild(card);
    });

    seccion.appendChild(fila);
    contenedor.appendChild(seccion);
  }
}

cargarProductos();
