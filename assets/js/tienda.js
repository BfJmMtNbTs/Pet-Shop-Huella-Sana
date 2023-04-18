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
