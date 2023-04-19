const select = document.querySelector(".form-select");
const inlineCheckbox1 = document.getElementById("inlineCheckbox1");
const inlineCheckbox2 = document.getElementById("inlineCheckbox2");
const buscador = document.getElementById("buscador");
const btnAñadirCarrito = document.getElementById("contenedor-tarjetas");
const btnCarrito = document.getElementById("btnCarrito");
const contenedorCarritoCompra = document.getElementById(
    "contenedor-carrito-compra"
);
const borrarCarrito = document.getElementById("borrarCarrito");
const totalContainer = document.getElementById("precioTotal");

const comprasRealizadas = [];
let filtroProductos;
fetch("https://mindhub-xj03.onrender.com/api/petshop")
    .then((response) => response.json())
    .then((data) => {
        let libreria = data;
        filtroProductos = libreria.filter(e=> e.categoria == "jugueteria");
        console.log(filtroProductos);
        imprimirCards(filtroProductos, "contenedor-tarjetas");
        botonDinamico(
            ".card-button1",
            ".corazon-default",
            "corazon-rojo",
            "borde-rojo"
        );
        botonDinamico(
            ".card-button3",
            ".carrito-default",
            "carrito-verde",
            "borde-verde"
        );
    })
    .catch((error) => {
        console.error(error);
    });

function imprimirCards(productos, elemento) {
    document.getElementById(elemento).innerHTML = "";
    productos.map((producto) => {
        let productosDisponibles;
        if (producto.disponibles < 5) {
            productosDisponibles = "Pocas unidades";
        } else if (producto.disponibles == 0) {
            productosDisponibles = "No hay productos disponibles";
        } else {
            productosDisponibles = producto.disponibles;
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
                        <div class="card-button1 d-flex justify-content-center align-items-center fw-bold" title="Añadir a favoritos">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-heart-fill corazon-default" viewBox="0 0 16 16">
                                <path fill-rule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z"></path>
                            </svg>
                        </div>
                        <a href="../pages/detalles.html?id=${producto._id}" class="card-button2 d-flex justify-content-center align-items-center
                        d-flex justify-content-center align-items-center text-decoration-none fw-bold text-black" title="Ver más detalles">VER</a>
                        <div class="card-button3 d-flex justify-content-center align-items-center fw-bold" title="Añadir al carrito">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-bag-fill carrito-default" viewBox="0 0 16 16">
                                <path data-name="${producto.producto}" data-id="${producto._id}" d="M8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1zm3.5 3v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4h-3.5z"></path>
                            </svg>
                        </div>                            
                    </div>
                </div>
            </div>
            `;
    });
}
inlineCheckbox1.addEventListener("change", () => {
    aplicarFiltros();
});

inlineCheckbox2.addEventListener("change", () => {
    aplicarFiltros();
});

select.addEventListener("change", function () {
    aplicarFiltros();
});

buscador.addEventListener("input", () => {
    aplicarFiltros();
});

function aplicarFiltros() {
    let resultados = [...filtroProductos];

    if (inlineCheckbox1.checked) {
        resultados = resultados.filter((e) => e.categoria == "farmacia");
    }

    if (inlineCheckbox2.checked) {
        resultados = resultados.filter((e) => e.categoria == "jugueteria");
    }

    const selectedValue = select.value;

    if (selectedValue == 1) {
        resultados = resultados.sort((a, b) => b.precio - a.precio);
    } else if (selectedValue == 2) {
        resultados = resultados.sort((a, b) => a.precio - b.precio);
    } else if (selectedValue == 3) {
        resultados = resultados.sort((a, b) =>
            a.producto.localeCompare(b.producto)
        );
    }

    const textoBusqueda = buscador.value.toLowerCase();

    if (textoBusqueda) {
        resultados = resultados.filter((e) => {
            return (
                e.producto.toLowerCase().includes(textoBusqueda) ||
                e.descripcion.toLowerCase().includes(textoBusqueda)
            );
        });
    }
    imprimirCards(resultados, "contenedor-tarjetas");
}

inlineCheckbox1.addEventListener("change", () => {
    const categoriaFiltrados = filtroProductos.filter(
        (e) => e.categoria == "farmacia"
    );
    if (inlineCheckbox1.checked) {
        imprimirCards(categoriaFiltrados, "contenedor-tarjetas");
    } else {
        imprimirCards(filtroProductos, "contenedor-tarjetas");
    }
});

function botonDinamico(querySelectorAll1, querySelectorAll2, toggle1, toggle2) {
    const botonesCarritos = document.querySelectorAll(querySelectorAll1);
    botonesCarritos.forEach((botonCarrito) => {
        botonCarrito.addEventListener("click", function () {
            const corazonIcon = botonCarrito.querySelector(querySelectorAll2);
            corazonIcon.classList.toggle(toggle1);
            botonCarrito.classList.toggle(toggle2);
        });
    });
}

/* Local Storage */
const cargarCarritoDesdeLocalStorage = () => {
    const carritoGuardado = localStorage.getItem("carrito");
    if (carritoGuardado) {
        const carritoParseado = JSON.parse(carritoGuardado);
        comprasRealizadas.push(...carritoParseado);
        renderizarCarrito();
    }
};

const guardarCarritoEnLocalStorage = () => {
    localStorage.setItem("carrito", JSON.stringify(comprasRealizadas));
};

const cantidadProductos = document.querySelectorAll(".cantidad-producto");
cantidadProductos.forEach((input) => {
    input.addEventListener("input", (e) => {
        const id = e.target.dataset.id;
        const cantidad = parseInt(e.target.value);
        const producto = comprasRealizadas.find((p) => p._id == id);
        producto.cantidad = cantidad;
        producto.precioTotal = producto.precio * cantidad;
        const precioTotalElement = document.querySelector(
            `.precio-total-${id}`
        );
        precioTotalElement.textContent = producto.precioTotal;
        guardarCarritoEnLocalStorage();
    });
});

const renderizarCarrito = () => {
    const comprasRealizadasContainer = document.getElementById(
        "contenedor-carrito-compra"
    );
    comprasRealizadasContainer.innerHTML = comprasRealizadas
        .filter((producto) => producto.precio !== undefined)
        .map((producto) => {
            return `<div class="d-flex flex-column">
            <div class="imagen-tarjeta d-flex justify-content-center">
            <img class="objet-fit-contain" src="${producto.imagen}" alt="">
            </div>
            <div class="d-flex flex-column justify-content-between p-1"> 
            <p class="text-center texto1-producto">${producto.producto}</p>
            <p class="text-black fs-5">Cantidad: <input type="number" min="1" value="${producto.cantidad}" data-id="${producto._id}" class="cantidad-producto"></p>
            <p class="text-black text-center fs-5">Precio Total: $<span class="precio-total-${producto._id}">${producto.precioTotal}</span></p>
            <button type="button" data-id="${producto._id}" class="btn btn-success btn-borrar-producto fs-5">Borrar</button>
        </div>`;
        })
        .join("");
    const totalContainer = document.getElementById("precioTotal");
    const total = comprasRealizadas.reduce((acc, producto) => {
        if (producto.precio !== undefined) {
            return acc + producto.precioTotal;
        } else {
            return acc;
        }
    }, 0);

    totalContainer.innerHTML = `Total a pagar: $${total}`;

    const btnsBorrarProducto = document.querySelectorAll(
        ".btn-borrar-producto"
    );
    btnsBorrarProducto.forEach((btn) => {
        btn.addEventListener("click", (e) => {
            const id = e.target.dataset.id;
            const index = comprasRealizadas.findIndex((p) => p._id == id);
            if (index !== -1) {
                comprasRealizadas.splice(index, 1);
                renderizarCarrito();
                guardarCarritoEnLocalStorage();
            }
        });
    });
};

const path = (e) => {
    const id = e.target.dataset.id;
    console.log(id);
    if (id) {
        const farmacia = filtroProductos.find((f) => f._id == id);
        const index = comprasRealizadas.findIndex((p) => p._id == id);
        if (index !== -1) {
            comprasRealizadas[index].cantidad++;
            comprasRealizadas[index].precioTotal =
                comprasRealizadas[index].cantidad * farmacia.precio;
        } else {
            comprasRealizadas.push({
                ...farmacia,
                cantidad: 1,
                precioTotal: farmacia.precio,
            });
        }
        renderizarCarrito();
        guardarCarritoEnLocalStorage();
    }
};

btnAñadirCarrito.addEventListener("click", path);

window.addEventListener("load", cargarCarritoDesdeLocalStorage);

//BORRAR LOCALSTORE CARRITO//
borrarCarrito.addEventListener("click", () => {
    localStorage.removeItem("carrito");
    totalContainer.innerHTML = `No tienes nada en el carrito`;
    contenedorCarritoCompra.innerHTML = "";
});
console.log(localStorage);
