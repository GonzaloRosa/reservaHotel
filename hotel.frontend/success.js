const loginForm = document.getElementById('loginForm');

loginForm?.addEventListener('submit', async (event) => {
    event.preventDefault();

    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value.trim();
    const data = { email, password };

    try {
        const response = await fetch('http://localhost:8085/api/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });

        if (response.ok) {
            const user = await response.json();
            mostrarAlertaExito(`Bienvenido, ${user.email}`, () => {
                localStorage.setItem("isAuthenticated", "true");
                localStorage.setItem("userEmail", user.email);
                window.location.href = 'index.html';
            });
        } else {
            await response.text();
            mostrarAlertaError("Email o contraseña incorrectos. Inténtalo de nuevo.");
        }
    } catch (error) {
        mostrarAlertaError('Error en la comunicación con el servidor');
        console.error(error);
    }
});

// ✅ Alerta visual de éxito
function mostrarAlertaExito(mensaje, callback) {
    const alerta = document.getElementById("alerta-exito");
    const mensajeAlerta = document.getElementById("mensaje-exito");

    mensajeAlerta.textContent = mensaje;
    alerta.classList.remove("alerta-oculta");
    alerta.classList.add("alerta-visible");

    setTimeout(() => {
        alerta.classList.remove("alerta-visible");
        alerta.classList.add("alerta-oculta");
        if (callback) callback();
    }, 3000);
}

// ❌ Alerta visual de error (opcional)
function mostrarAlertaError(mensaje) {
    const alerta = document.getElementById("alerta-error");
    const mensajeAlerta = document.getElementById("mensaje-error");

    mensajeAlerta.textContent = mensaje;
    alerta.classList.remove("alerta-oculta");
    alerta.classList.add("alerta-visible");

    setTimeout(() => {
        alerta.classList.remove("alerta-visible");
        alerta.classList.add("alerta-oculta");
    }, 3000);
}
