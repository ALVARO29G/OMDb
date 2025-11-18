// Cargar usuarios registrados (si no hay, crear arreglo vacío)
let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

// Referencias a los elementos, Cuando el usuario hace clic en “Crear cuenta” → escondemos login y mostramos registro.
// Cuando hace clic en “Iniciar sesión” → escondemos registro y mostramos login.
const loginContainer = document.getElementById("login-container");
const registroContainer = document.getElementById("registro-container");

const mostrarRegistro = document.getElementById("mostrarRegistro");
const mostrarLogin = document.getElementById("mostrarLogin");

const btnLogin = document.getElementById("btnLogin");
const btnRegistrar = document.getElementById("btnRegistrar");

mostrarRegistro.addEventListener("click", () => {
    loginContainer.style.display = "none";
    registroContainer.style.display = "block";
})

btnRegistrar.addEventListener("click", () => {
    const nuevoUsuario = document.getElementById("regUser").value;
    const nuevaContra = document.getElementById("regPass").value;


    // Validación
    if (nuevoUsuario === "" || nuevaContra === "") {
        alert("Por favor llena todos los campos.");
        return;
    }

    // Verificar si el usuario ya existe
    if (usuarios.some(u => u.usuario === nuevoUsuario)) {
        alert("Ese usuario ya existe.");
        return;
    }

    // Crear usuario nuevo
    const usuarioObj = {
        usuario: nuevoUsuario,
        contra: nuevaContra
    };

    usuarios.push(usuarioObj);

    // Guardarlo en localStorage
    localStorage.setItem("usuarios", JSON.stringify(usuarios));

    alert("Registro exitoso. Ahora inicia sesión.");

    // Regresar al login
    registroContainer.style.display = "none";
    loginContainer.style.display = "block";
})
btnLogin.addEventListener("click", () => {
    const user = document.getElementById("loginUser").value;
    const pass = document.getElementById("loginPass").value;

    // Validación
    if (user === "" || pass === "") {
        alert("Ingresa usuario y contraseña.");
        return;
    }

    // Buscar el usuario en la lista
    const usuarioEncontrado = usuarios.find(u => u.usuario === user);

    if (!usuarioEncontrado) {
        alert("El usuario no existe.");
        return;
    }

    if (usuarioEncontrado.contra !== pass) {
        alert("Contraseña incorrecta.");
        return;
    }

    // Guardar la sesión
    localStorage.setItem("sesion", JSON.stringify({
        logueado: true,
        usuario: user
    }));

    alert("Salut!");

    // Redirigir a tu página principal
    window.location.href = "index.html";
});

mostrarLogin.addEventListener("click", () => {
    registroContainer.style.display = "none";
    loginContainer.style.display = "block";
});