let urlApi = "https://mindhub-xj03.onrender.com/api/petshop"
let contenedorTarjeta = document.getElementById("contenedor-tarjetas")

fetch("https://mindhub-xj03.onrender.com/api/petshop")
    .then((response) => response.json())
    .then((data) => {
        console.log(data);
        imprimirCards(data);
    })
    .catch((error) => {
        console.error(error);
    });

function imprimirCards(productos) {
    const contenedor = document.getElementById("contenedor-tarjetas");
    const cardsHTML = productos.map((producto) => {
        let productosDisponibles
        if (producto.disponibles < 5){
            productosDisponibles = "Quedan pocas unidades";
        }else if (producto.disponibles == 0){
            productosDisponibles = "No hay productos disponibles";
        }else{
            productosDisponibles = producto.disponibles
        }
        return `
        <div class="carta-producto">
            <button class="btn-fav">
                <svg viewBox="0 0 17.503 15.625" height="20.625" width="20.503" xmlns="http://www.w3.org/2000/svg" class="icon">
                <path transform="translate(0 0)" d="M8.752,15.625h0L1.383,8.162a4.824,4.824,0,0,1,0-6.762,4.679,4.679,0,0,1,6.674,0l.694.7.694-.7a4.678,4.678,0,0,1,6.675,0,4.825,4.825,0,0,1,0,6.762L8.752,15.624ZM4.72,1.25A3.442,3.442,0,0,0,2.277,2.275a3.562,3.562,0,0,0,0,5l6.475,6.556,6.475-6.556a3.563,3.563,0,0,0,0-5A3.443,3.443,0,0,0,12.786,1.25h-.01a3.415,3.415,0,0,0-2.443,1.038L8.752,3.9,7.164,2.275A3.442,3.442,0,0,0,4.72,1.25Z" id="Fill"></path>
                </svg>
            </button>
            <div class="imagen-tarjeta d-flex justify-content-center">
            <img class="objet-fit-contain" src="${producto.imagen}" alt="">
            </div>
            <div class="contenedor-info">
            <div class="card-info">
                <p class="text-title">${producto.producto}</p>
            </div>
                <div class="card-footer">
                <span class="text-title">$${producto.precio}</span>
                <div class="infocantidad">
                    <p class="cantidad">Disponibles:</p>
                    <p id="numcant" class="cantidad">${productosDisponibles}</p>
                </div>
            </div>
                <div class="d-flex">
                <div class="card-button">
                    <svg class="svg-icon-carrito" viewBox="0 0 20 20">
                    <path d="M17.72,5.011H8.026c-0.271,0-0.49,0.219-0.49,0.489c0,0.271,0.219,0.489,0.49,0.489h8.962l-1.979,4.773H6.763L4.935,5.343C4.926,5.316,4.897,5.309,4.884,5.286c-0.011-0.024,0-0.051-0.017-0.074C4.833,5.166,4.025,4.081,2.33,3.908C2.068,3.883,1.822,4.075,1.795,4.344C1.767,4.612,1.962,4.853,2.231,4.88c1.143,0.118,1.703,0.738,1.808,0.866l1.91,5.661c0.066,0.199,0.252,0.333,0.463,0.333h8.924c0.116,0,0.22-0.053,0.308-0.128c0.027-0.023,0.042-0.048,0.063-0.076c0.026-0.034,0.063-0.058,0.08-0.099l2.384-5.75c0.062-0.151,0.046-0.323-0.045-0.458C18.036,5.092,17.883,5.011,17.72,5.011z"></path>
                    <path d="M8.251,12.386c-1.023,0-1.856,0.834-1.856,1.856s0.833,1.853,1.856,1.853c1.021,0,1.853-0.83,1.853-1.853S9.273,12.386,8.251,12.386z M8.251,15.116c-0.484,0-0.877-0.393-0.877-0.874c0-0.484,0.394-0.878,0.877-0.878c0.482,0,0.875,0.394,0.875,0.878C9.126,14.724,8.733,15.116,8.251,15.116z"></path>
                    <path d="M13.972,12.386c-1.022,0-1.855,0.834-1.855,1.856s0.833,1.853,1.855,1.853s1.854-0.83,1.854-1.853S14.994,12.386,13.972,12.386z M13.972,15.116c-0.484,0-0.878-0.393-0.878-0.874c0-0.484,0.394-0.878,0.878-0.878c0.482,0,0.875,0.394,0.875,0.878C14.847,14.724,14.454,15.116,13.972,15.116z"></path>
                    </svg>
                </div>
                </div>
            </div>
        </div>
        </div>
        `;
    });
    contenedor.innerHTML = cardsHTML.join("");
}