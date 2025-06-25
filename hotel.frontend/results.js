function changeCount(type, delta) {
  const countElement = document.getElementById(`${type}-count`);
  let count = parseInt(countElement.innerText);
  count = Math.max(0, count + delta);
  countElement.innerText = count;
  updateGuestDisplay();
}

function updateGuestDisplay() {
  const adults = document.getElementById("adult-count").innerText;
  const children = document.getElementById("child-count").innerText;
  const rooms = document.getElementById("room-count").innerText;
  document.getElementById("guest-display").innerText =
    `${adults} adultos · ${children} niños · ${rooms} habitación(es)`;
}

// Escuchar el envío del formulario de búsqueda
document.querySelector(".search-bar").addEventListener("submit", function (e) {
  e.preventDefault();

  const destination = document.getElementById("destination").value.trim();
  const dateRange = document.getElementById("date-range").value.trim();
  const adults = parseInt(document.getElementById("adult-count").innerText);
  const children = parseInt(document.getElementById("child-count").innerText);
  const rooms = parseInt(document.getElementById("room-count").innerText);

  // Validación amigable
  if (!destination || !dateRange || adults < 1 || rooms < 1) {
    mostrarAlerta("Por favor completa todos los campos:\n- Destino\n- Fechas\n- Al menos 1 adulto y 1 habitación");
    return;
  }

  const searchData = {
    destination,
    dateRange,
    adults,
    children,
    rooms
  };

  localStorage.setItem("searchData", JSON.stringify(searchData));
  window.location.href = "results.html";
});

// Función para mostrar la alerta personalizada
function mostrarAlerta(mensaje) {
  const alerta = document.getElementById("alerta");
  const mensajeAlerta = document.getElementById("mensaje-alerta");

  mensajeAlerta.textContent = mensaje;
  alerta.classList.remove("alerta-oculta");
  alerta.classList.add("alerta-visible");

  setTimeout(() => {
    alerta.classList.remove("alerta-visible");
    alerta.classList.add("alerta-oculta");
  }, 4000);
}
