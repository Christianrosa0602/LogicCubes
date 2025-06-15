const usuarioActivo = JSON.parse(localStorage.getItem("usuarioActivo"));

const bienvenida = document.getElementById("bienvenida");
const btnIniciar = document.getElementById("iniciosesion");  // ✅ corregido
const btnCerrar = document.getElementById("cerrarSesion");
const btnCarrito = document.getElementById("carrito");

if (usuarioActivo) {
  // Mostrar bienvenida con el correo
  bienvenida.textContent = `${usuarioActivo.correo}`;
  bienvenida.style.marginRight = "10px";

  // Mostrar cerrar sesión y ocultar iniciar sesión
  if (btnIniciar) btnIniciar.style.display = "none";
  if (btnCerrar) btnCerrar.style.display = "inline";

  // Acción de cerrar sesión
  btnCerrar.addEventListener("click", (e) => {
    e.preventDefault(); // Evita que el enlace recargue la página
    localStorage.removeItem("usuarioActivo");
    alert("Sesión cerrada");
    location.reload();
  });
} else {
  // Ocultar carrito si no hay usuario
  if (btnCerrar) btnCerrar.style.display = "none";
  if (btnCerrar) btnCarrito.style.display = "none"
}
