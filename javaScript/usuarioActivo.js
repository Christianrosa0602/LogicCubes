const usuarioActivo = JSON.parse(localStorage.getItem("usuarioActivo"));

const bienvenida = document.getElementById("bienvenida");
const btnIniciar = document.getElementById("iniciosesion");
const btnCerrar = document.getElementById("cerrarSesion");
const btnCarrito = document.getElementById("carrito");
const adminPanel = document.getElementById("adminPanel");
const historialpedidos = document.getElementById("historialPedidos")

if (usuarioActivo) {
  bienvenida.textContent = `${usuarioActivo.correo}`;

  if (btnIniciar) btnIniciar.style.display = "none";
  if (btnCerrar) btnCerrar.style.display = "inline";

  if (usuarioActivo.rol === "admin") {
    if (adminPanel) adminPanel.style.display = "inline";
    if (historialpedidos) historialpedidos.style.display = "none";
  } else {
    if (adminPanel) adminPanel.style.display = "none";
    if (historialpedidos) historialpedidos.style.display = "inline";
  }

  btnCerrar.addEventListener("click", (e) => {
    e.preventDefault();
    localStorage.removeItem("usuarioActivo");
    alert("Sesión cerrada");
    location.reload();
  });
} else {
  if (btnCerrar) btnCerrar.style.display = "none";
  if (btnCarrito) btnCarrito.style.display = "none";
  if (adminPanel) adminPanel.style.display = "none";
  if (historialpedidos) historialpedidos.style.display = "none";
}
