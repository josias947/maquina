// Usamos un objeto para contar productos
const carrito = {};
const botonesAgregar = document.querySelectorAll('.agregar-carrito');
const carritoItems = document.getElementById('carrito-items');
const carritoCount = document.getElementById('carrito-count');

// Evento al hacer clic en "Agregar al Carrito"
botonesAgregar.forEach(btn => {
  btn.addEventListener('click', () => {
    const producto = btn.getAttribute('data-producto');
    // Si ya existe en el carrito, aumenta la cantidad
    if (carrito[producto]) {
      carrito[producto]++;
    } else {
      carrito[producto] = 1;
    }
    actualizarCarrito();
  });
});

// Función que actualiza el HTML del carrito
function actualizarCarrito() {
  // Construir el contenido del carrito
  let contenido = '';
  let totalProductos = 0;

  for (const producto in carrito) {
    const cantidad = carrito[producto];
    contenido += `<div>- ${producto} x${cantidad}</div>`;
    totalProductos += cantidad;
  }

  // Si no hay productos, mostrar "Carrito vacío"
  carritoItems.innerHTML = contenido || 'Carrito vacío';

  // Actualizar el contador del botón del carrito
  carritoCount.textContent = totalProductos;
}
const formulario = document.getElementById('pedido-form');
formulario.addEventListener('submit', function(e) {
  e.preventDefault();

  const nombre = document.getElementById('nombre').value.trim();
  const telefono = document.getElementById('telefono').value.trim();

  if (!nombre || !telefono) {
    alert('Por favor completa todos los campos.');
    return;
  }

  let mensaje = `🧾 *Nuevo Pedido desde la Web*%0A`;
  mensaje += `👤 Nombre: ${nombre}%0A`;
  mensaje += `📱 Teléfono: ${telefono}%0A`;
  mensaje += `🛒 Pedido:%0A`;

  for (const producto in carrito) {
    mensaje += `- ${producto} x${carrito[producto]}%0A`;
  }

  const numeroEmpresa = "18498163070";

  // Detectar si el usuario está en móvil
  const esMovil = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);

  // URL correcta según el dispositivo
  const url = esMovil
    ? `https://wa.me/${numeroEmpresa}?text=${mensaje}`
    : `https://web.whatsapp.com/send?phone=${numeroEmpresa}&text=${mensaje}`;

  window.open(url, '_blank');
});