// Obtener el ID del producto desde la URL
const params = new URLSearchParams(window.location.search);
const idProducto = parseInt(params.get("id"));
const productos = JSON.parse(localStorage.getItem("productos")) || [];
const producto = productos.find(p => p.id === idProducto);

const divDetalle = document.getElementById("detalle-producto");
const listaReseñas = document.getElementById("lista-reseñas");

// Mostrar info del producto
if (producto) {
  divDetalle.innerHTML = `
    <h2>${producto.nombre}</h2>
    <img src="${producto.imagen}" alt="${producto.nombre}" width="200">
    <p>Precio: $${producto.precio}</p>
    <p>Stock disponible: ${producto.stock}</p>
    <p>Categoría: ${producto.categoria}</p>
  `;
} else {
  divDetalle.innerHTML = "<p>Producto no encontrado.</p>";
}

// =======================
// Manejo de reseñas
// =======================
const claveReseñas = `reseñas_${idProducto}`;
let reseñas = JSON.parse(localStorage.getItem(claveReseñas)) || [];

// Mostrar reseñas
function mostrarReseñas() {
  listaReseñas.innerHTML = "";

  if (reseñas.length === 0) {
    listaReseñas.innerHTML = "<p>Aún no hay reseñas.</p>";
    return;
  }

  reseñas.forEach(r => {
    const div = document.createElement("div");
    div.innerHTML = `
      <strong>${r.usuario}</strong> (${r.fecha})<br>
      Calificación: ${"⭐".repeat(r.calificacion)}<br>
      <p>${r.comentario}</p>
      <hr>
    `;
    listaReseñas.appendChild(div);
  });
}

mostrarReseñas();

// Agregar reseña
document.getElementById("form-reseña").addEventListener("submit", (e) => {
  e.preventDefault();

  const usuario = JSON.parse(localStorage.getItem("usuarioActivo"));
  if (!usuario) {
    alert("Debes iniciar sesión para dejar una reseña.");
    return;
  }

  const comentario = document.getElementById("comentario").value;
  const calificacion = parseInt(document.getElementById("calificacion").value);

  const nuevaReseña = {
    usuario: usuario.nombre || usuario.correo,
    comentario,
    calificacion,
    fecha: new Date().toLocaleString()
  };

  reseñas.push(nuevaReseña);
  localStorage.setItem(claveReseñas, JSON.stringify(reseñas));
  mostrarReseñas();
  e.target.reset();
});
