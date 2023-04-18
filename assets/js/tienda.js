const select = document.querySelector('.form-select');
const inlineCheckbox1 = document.getElementById("inlineCheckbox1")
const inlineCheckbox2 = document.getElementById('inlineCheckbox2')
const buscador = document.getElementById('buscador')

let filtroFarmacia
fetch("https://mindhub-xj03.onrender.com/api/petshop")
.then((response) => response.json())
.then((data) => {
let libreria = data
filtroFarmacia = libreria.filter(elemento=> elemento)
console.log(filtroFarmacia)
imprimirCards(libreria, "contenedor-tarjetas");
})
.catch((error) => {
console.error(error);
});


function imprimirCards(productos, elemento) {
    document.getElementById(elemento).innerHTML = ""
        productos.map((producto) => {
            let productosDisponibles
            if (producto.disponibles < 5){
                productosDisponibles = "Pocas unidades";
            }else if (producto.disponibles == 0){
                productosDisponibles = "No hay productos disponibles";
            }else{
                productosDisponibles = producto.disponibles
            }
            document.getElementById(elemento).innerHTML += `
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
                        <a href="../pages/detalles.html?id=${producto._id}">Ver</a>
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
}
inlineCheckbox1.addEventListener("change", ()=>{
    aplicarFiltros();
});

inlineCheckbox2.addEventListener("change", ()=>{
    aplicarFiltros();
});

select.addEventListener('change', function() {
    aplicarFiltros();
});

buscador.addEventListener('input',()=>{
    aplicarFiltros();
});

function aplicarFiltros() {
    let resultados = [...filtroFarmacia];

    if (inlineCheckbox1.checked) {
        resultados = resultados.filter(e => e.categoria == "farmacia");
    }

    if (inlineCheckbox2.checked) {
        resultados = resultados.filter(e => e.categoria == "jugueteria");
    }

    const selectedValue = select.value;

    if (selectedValue == 1) {
        resultados = resultados.sort((a, b) => b.precio - a.precio);
    } else if (selectedValue == 2) {
        resultados = resultados.sort((a, b) => a.precio - b.precio);
    } else if (selectedValue == 3) {
        resultados = resultados.sort((a, b) => a.producto.localeCompare(b.producto));
    }

    const textoBusqueda = buscador.value.toLowerCase();

    if (textoBusqueda) {
        resultados = resultados.filter((e) => {
            return e.producto.toLowerCase().includes(textoBusqueda) || e.descripcion.toLowerCase().includes(textoBusqueda);
        });
    }
    imprimirCards(resultados, "contenedor-tarjetas");
}






inlineCheckbox1.addEventListener("change", ()=>{
        const categoriaFiltrados = filtroFarmacia.filter(e => e.categoria == "farmacia")
        if (inlineCheckbox1.checked){
            imprimirCards(categoriaFiltrados, "contenedor-tarjetas" )
        }else{
            imprimirCards(filtroFarmacia, "contenedor-tarjetas")
        }
        
})
/* inlineCheckbox2.addEventListener("change", ()=>{
const categoriaFiltrados = filtroFarmacia.filter(e => e.categoria == "jugueteria")
if(inlineCheckbox2.checked){
imprimirCards(categoriaFiltrados, "contenedor-tarjetas")
}else {
imprimirCards(filtroFarmacia, "contenedor-tarjetas")
}
})
    
    
select.addEventListener('change', function() {
const selectedValue = this.value;
const ordenAlfabetico = [...filtroFarmacia].sort(function(a,b){
        if(a.producto < b.producto){
            return -1
        }
        if(a.producto > b.producto){
            return 1
        }
        return 0
      
})
const precioMasAlto = [...filtroFarmacia].sort(function(a, b) {
        if(a.precio > b.precio){
            return -1
        }
        if(a.precio < b.precio){
            return 1
        }
        return 0
})
const precioMasBajo = [...filtroFarmacia].sort(function(a, b) {
        if(a.precio < b.precio){
            return -1
        }
        if(a.precio > b.precio){
            return 1
        }
        return 0
})
if(selectedValue == 1){
imprimirCards(precioMasAlto,"contenedor-tarjetas" )
 }
if (selectedValue == 2){
imprimirCards(precioMasBajo,"contenedor-tarjetas" )
}if (selectedValue == 3){
imprimirCards(ordenAlfabetico,"contenedor-tarjetas" )
}else if (selectedValue == 4){
imprimirCards(filtroFarmacia,"contenedor-tarjetas" )
}
}); 


buscador.addEventListener('input',()=>{
    const aca = busQueda(filtroFarmacia, buscador.value)
    imprimirCards(aca, "contenedor-tarjetas" )
 }
 )

 function busQueda(array, texto) { 
    let busqueda = array
    if (texto) {
    const textoMiniscula = texto.toLowerCase();
    busqueda = array.filter((evento) => evento.producto.toLowerCase().includes(textoMiniscula) || evento.descripcion.toLowerCase().includes(textoMiniscula));
    }
    return busqueda
} */

