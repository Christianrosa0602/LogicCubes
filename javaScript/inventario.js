const form = document.getElementById("form-producto");
const lista = document.getElementById("lista-productos");

// Cargar productos existentes
let productos = JSON.parse(localStorage.getItem("productos")) || [];

function guardarProductos() {
  localStorage.setItem("productos", JSON.stringify(productos));
}

function renderProductos() {
  lista.innerHTML = ""; // limpiar antes de renderizar
  productos.forEach((prod, index) => {
    const div = document.createElement("div");
    div.innerHTML = `
      <strong>${prod.nombre}</strong> - $${prod.precio} - Stock: ${prod.stock} - Categoría: ${prod.categoria}
      <button onclick="eliminarProducto(${index})">Eliminar</button>
    `;
    lista.appendChild(div);
  });
}

function eliminarProducto(index) {
  productos.splice(index, 1);
  guardarProductos();
  renderProductos();
}

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const nombre = document.getElementById("nombre").value;
  const precio = parseFloat(document.getElementById("precio").value);
  const stock = parseInt(document.getElementById("stock").value);
  const categoria = document.getElementById("categoria").value;
  const imagenInput = document.getElementById("imagen");

  const archivo = imagenInput.files[0];

  if (!archivo) {
    alert("Debes seleccionar una imagen");
    return;
  }

  const reader = new FileReader();

  reader.onloadend = () => {
    const imagenBase64 = reader.result;

    const nuevoProducto = {
      id: Date.now(),
      nombre,
      precio,
      stock,
      categoria,
      imagen: imagenBase64
    };

    productos.push(nuevoProducto);
    guardarProductos();
    renderProductos();
    form.reset();
  };

  reader.readAsDataURL(archivo); 
});


renderProductos();
