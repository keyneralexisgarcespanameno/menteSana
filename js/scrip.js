/* ===== HÁBITOS ===== */
let habitosCompletados = 0;
function completarHabito(boton) {
    if (!boton.classList.contains("completado")) {
        boton.classList.add("completado");
        boton.textContent = "✓ Completado";
        habitosCompletados++;
    } else {
        boton.classList.remove("completado");
        boton.textContent = "Marcar";
        habitosCompletados--;
    }
    document.getElementById("contadorHabitos").textContent = habitosCompletados;
}

/* ===== ESTADO DE ÁNIMO ===== */
function seleccionarAnimo(animo, boton) {
    const botones = document.querySelectorAll(".emociones button");
    botones.forEach(function(btn) {
        btn.classList.remove("seleccionado");
    });
    boton.classList.add("seleccionado");
    document.getElementById("mensaje-animo").textContent = "Estado de ánimo registrado: " + animo;
    document.getElementById("estadoActual").textContent = animo;
    localStorage.setItem("estadoAnimo", animo);
}

/* ===== DIARIO PERSONAL ===== */
function guardarDiario() {
    const entrada = document.getElementById("entradaDiario").value;
    if (entrada.trim() === "") {
        document.getElementById("mensaje-diario").textContent = "Por favor escribe algo antes de guardar.";
        return;
    }
    const fecha = new Date().toLocaleString();
    const registro = { texto: entrada, fecha: fecha };
    localStorage.setItem("entradaDiario", JSON.stringify(registro));
    document.getElementById("mensaje-diario").textContent = "✓ Tu entrada fue guardada correctamente.";
    document.getElementById("diarioGuardado").textContent = "1";
}

/* ===== REGISTRO DE USUARIO ===== */
const formulario = document.getElementById("formRegistro");
if (formulario) {
    formulario.addEventListener("submit", function(event) {
        event.preventDefault();
        const nombre = document.getElementById("nombre").value;
        const correo = document.getElementById("correo").value;
        const password = document.getElementById("password").value;
        const confirmar = document.getElementById("confirmar").value;
        const mensaje = document.getElementById("mensajeRegistro");

        if (password !== confirmar) {
            mensaje.textContent = "❌ Las contraseñas no coinciden.";
            mensaje.style.color = "red";
            return;
        }
        if (password.length < 6) {
            mensaje.textContent = "❌ La contraseña debe tener mínimo 6 caracteres.";
            mensaje.style.color = "red";
            return;
        }
        const usuario = { nombre, correo, password };
        localStorage.setItem("usuario", JSON.stringify(usuario));
        mensaje.textContent = "✓ Cuenta creada correctamente. Redirigiendo...";
        mensaje.style.color = "#4e8b70";
        setTimeout(function() {
            window.location.href = "index.html";
        }, 1500);
    });
}

/* ===== INICIAR SESIÓN ===== */
function mostrarLogin() {
    const correo = prompt("Ingrese su correo:");
    const password = prompt("Ingrese su contraseña:");
    const datos = localStorage.getItem("usuario");
    if (!datos) {
        alert("No existe una cuenta. Primero debes registrarte.");
        return;
    }
    const usuario = JSON.parse(datos);
    if (correo === usuario.correo && password === usuario.password) {
        alert("✓ Inicio de sesión exitoso. Bienvenido " + usuario.nombre);
        window.location.href = "index.html";
    } else {
        alert("❌ Correo o contraseña incorrectos.");
    }
}

/* ===== CARGAR DATOS GUARDADOS ===== */
window.addEventListener("DOMContentLoaded", function() {
    const animo = localStorage.getItem("estadoAnimo");
    if (animo) {
        const elem = document.getElementById("estadoActual");
        if (elem) elem.textContent = animo;
    }
    const diario = localStorage.getItem("entradaDiario");
    if (diario) {
        const elem = document.getElementById("diarioGuardado");
        if (elem) elem.textContent = "1";
    }
});
