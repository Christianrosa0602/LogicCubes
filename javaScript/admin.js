const form = document.getElementById("form-producto");
const listaProductos = document.getElementById("lista-productos");
const listaPedidos = document.getElementById("lista-pedidos");

let productos = JSON.parse(localStorage.getItem("productos")) || [];
let pedidos = JSON.parse(localStorage.getItem("pedidos")) || [];

function guardarProductos() {
  localStorage.setItem("productos", JSON.stringify(productos));
}

function renderProductos() {
  listaProductos.innerHTML = "";
  productos.forEach((prod, index) => {
    const div = document.createElement("div");
    div.innerHTML = `
      <strong>${prod.nombre}</strong> - $${prod.precio} - Stock: ${prod.stock} - Categoría: ${prod.categoria}
      <button onclick="eliminarProducto(${index})">Eliminar</button>
      <button onclick="editarProducto(${index})">Editar</button>
    `;
    listaProductos.appendChild(div);
  });
}

function eliminarProducto(index) {
  productos.splice(index, 1);
  guardarProductos();
  renderProductos();
}

function editarProducto(index) {
  const prod = productos[index];
  const nuevoNombre = prompt("Nuevo nombre:", prod.nombre);
  const nuevoPrecio = parseFloat(prompt("Nuevo precio:", prod.precio));
  const nuevoStock = parseInt(prompt("Nuevo stock:", prod.stock));
  const nuevaCategoria = prompt("Nueva categoría:", prod.categoria);

  if (nuevoNombre && !isNaN(nuevoPrecio) && !isNaN(nuevoStock) && nuevaCategoria) {
    productos[index] = {
      ...prod,
      nombre: nuevoNombre,
      precio: nuevoPrecio,
      stock: nuevoStock,
      categoria: nuevaCategoria
    };
    guardarProductos();
    renderProductos();
  }
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

function renderPedidos() {
  listaPedidos.innerHTML = "";
  pedidos.forEach((pedido, index) => {
    const div = document.createElement("div");
    div.innerHTML = `
      <p><strong>Usuario:</strong> ${pedido.id_usuario}</p>
      <p><strong>Fecha:</strong> ${pedido.fecha}</p>
      <p><strong>Total:</strong> $${pedido.total}</p>
      <p><strong>Estado:</strong> 
        <select onchange="cambiarEstado(${index}, this.value)">
          <option ${pedido.estado === 'En proceso' ? 'selected' : ''}>En proceso</option>
          <option ${pedido.estado === 'Enviado' ? 'selected' : ''}>Enviado</option>
          <option ${pedido.estado === 'Entregado' ? 'selected' : ''}>Entregado</option>
        </select>
      </p>
      <hr>
    `;
    listaPedidos.appendChild(div);
  });
}

function cambiarEstado(index, nuevoEstado) {
  pedidos[index].estado = nuevoEstado;
  localStorage.setItem("pedidos", JSON.stringify(pedidos));
  renderPedidos();
}

renderProductos();
renderPedidos();
