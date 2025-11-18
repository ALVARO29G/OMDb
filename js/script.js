// 1️⃣ Escuchar el clic del botón
document.getElementById("buscar").addEventListener("click", buscarPelicula);

// 2️⃣ Función que busca la película
async function buscarPelicula() {

    const titulo = document.getElementById("titulo").value;

    if (!titulo) {
        alert("Escribe el título de una película.");
        return;
    }

    const respuesta = await fetch(`https://www.omdbapi.com/?t=${titulo}&apikey=cc3001c5`);
    const datos = await respuesta.json();

    mostrarPelicula(datos);
}


// 3️⃣ Función que muestra la película en la página
function mostrarPelicula(datos) {
    const contenedor = document.getElementById("resultado");

    if (datos.Response === "False") {
        contenedor.innerHTML = "<p>Película no encontrada.</p>";
        return;
    }

    contenedor.innerHTML = `
        <div class="pelicula">
            <img src="${datos.Poster}" alt="">
            <h3>${datos.Title} (${datos.Year})</h3>
            <p>${datos.Plot}</p>
            <button id="rentar">Rentar</button>
        </div>
    `;

    document.getElementById("rentar").addEventListener("click", () => {
        rentarPelicula(datos);
    });
}

function rentarPelicula(pelicula) {
    let rentas = JSON.parse(localStorage.getItem("rentas")) || [];

    // Evitar rentas duplicadas
    if (rentas.some(p => p.imdbID === pelicula.imdbID)) {
        alert("Ya rentaste esta película.");
        return;
    }

    rentas.push({
    imdbID: pelicula.imdbID,
    titulo: pelicula.Title,
    poster: pelicula.Poster,
    año: pelicula.Year,
    precio: 30
});


    localStorage.setItem("rentas", JSON.stringify(rentas));

    mostrarRentas();
}
// 4️⃣ Función que muestra las películas rentadas
function mostrarRentas() {
    const rentas = JSON.parse(localStorage.getItem("rentas")) || [];
    const divRentas = document.getElementById("rentas");

    if (rentas.length === 0) {
        divRentas.innerHTML = "<p>No hay películas rentadas.</p>";
        return;
    }

divRentas.innerHTML = rentas
    .map(p => `
        <div class="item-renta">
            <img src="${p.poster}">
            <p>${p.titulo} (${p.año})</p>
            <p>Precio: $${p.precio} MXN</p>
            <button class="eliminar" data-id="${p.imdbID}">Eliminar</button>
        </div>
    `)
    .join("");
    
    // Calcular total
let total = 0;
rentas.forEach(p => {
    total += p.precio;
});

// Mostrar total
divRentas.innerHTML += `
    <p><strong>Total a pagar: $${total} MXN</strong></p>
`;


    // Agregar evento para eliminar una renta específica
    divRentas.querySelectorAll(".eliminar").forEach(button => {
        button.addEventListener("click", () => {
            const imdbID = button.getAttribute("data-id");
            let rentas = JSON.parse(localStorage.getItem("rentas")) || [];
            rentas = rentas.filter(p => p.imdbID !== imdbID);
            localStorage.setItem("rentas", JSON.stringify(rentas));
            mostrarRentas();
           
        });
    });
}

mostrarRentas();
//Boton para limpiar rentas
const botonLimpiar = document.createElement("button");
botonLimpiar.textContent = "Limpiar Rentas";
botonLimpiar.id = "limpiarRentas";
document.body.appendChild(botonLimpiar);

botonLimpiar.addEventListener("click", () => {
    localStorage.removeItem("rentas");
    mostrarRentas();

});
