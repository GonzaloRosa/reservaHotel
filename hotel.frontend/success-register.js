const form = document.getElementById('registerForm');

form?.addEventListener('submit', async (event) => {
    event.preventDefault();

    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value.trim();
    const data = { email, password };

    try {
        const response = await fetch('http://localhost:8085/api/auth/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });

        const text = await response.text();

        if (response.ok && text === "Usuario registrado correctamente") {
            mostrarAlertaExito('Registrado con éxito. Ahora puedes iniciar sesión.', () => {
            window.location.href = 'login.html';
});
        } else {
            mostrarAlertaError('Error: ' + text);
        }
    } catch (error) {
        alert('Error en la comunicación con el servidor');
        console.error(error);
    }
});

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
