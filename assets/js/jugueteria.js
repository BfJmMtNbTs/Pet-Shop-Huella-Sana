fetch("https://mindhub-xj03.onrender.com/api/petshop")
    .then((response) => response.json())
    .then((data) => {
        const libreria = data;
        const jugueteria = libreria.filter(e=> e.categoria == "jugueteria")
        imprimirCards(jugueteria)
    })
    .catch((error) => {
        console.error(error);
    });

function imprimirCards(productos) {
    const contenedor = document.getElementById("contenedor-tarjetas");
    const cardsHTML = productos.map((producto) => {
        let productosDisponibles;
        if (producto.disponibles < 5) {
            productosDisponibles = "Pocas unidades";
        } else if (producto.disponibles == 0) {
            productosDisponibles = "No hay productos disponibles";
        } else {
            productosDisponibles = producto.disponibles;
        }
        return `
        <div class="producto">
                <div class="imagen-tarjeta d-flex justify-content-center">
                <img class="objet-fit-contain" src="${producto.imagen}" alt="">
                </div>
                <div class="h-50 d-flex flex-column justify-content-between p-1">
                    <p class="d-flex align-items-center texto1-producto">${producto.producto}</p>
                    <div class="d-flex flex-column">
                        <p class="texto2-producto m-0">$${producto.precio}</p>
                        <div>
                            <p class="texto3-producto m-0">Disponibles:</p>
                            <p class="texto3-producto m-0">${productosDisponibles}</p>
                        </div>
                    </div>
                    <div class="d-flex justify-content-around">
                        <div class="card-button1 d-flex justify-content-center align-items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-heart-fill corazon-default" viewBox="0 0 16 16">
                                <path fill-rule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z"></path>
                            </svg>
                        </div>
                        <a href="../pages/detalles.html?id=${producto._id}" class="card-button2 d-flex justify-content-center align-items-center
                        d-flex justify-content-center align-items-center text-decoration-none fw-bold text-black">VER</a>
                        <div class="card-button3 d-flex justify-content-center align-items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-bag-fill carrito-default" viewBox="0 0 16 16">
                                <path d="M8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1zm3.5 3v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4h-3.5z"></path>
                            </svg>
                        </div>                            
                    </div>
                </div>
            </div>
        `;
    });
    contenedor.innerHTML = cardsHTML.join("");
}