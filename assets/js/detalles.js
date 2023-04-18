// Obtener el ID del evento de la URL
let urlParams = new URLSearchParams(location.search);
let id = urlParams.get("id");

fetch("https://mindhub-xj03.onrender.com/api/petshop")
    .then(response => response.json())
    .then(data => {
        const detallesProducto = data.find(p => p._id === id);

        const contenedorProducto = document.getElementById("detallesProducto");

        contenedorProducto.innerHTML = mostrarProducto(detallesProducto);

    })
    .catch(error => {
        console.error(error);
    });

// Crear la plantilla HTML correspondiente con la información de un producto
function mostrarProducto(producto) {
    if (producto) {
        const cuota = producto.precio*0.10+producto.precio/3
        return `
        <div class="card container-fluid">
            <div class="row d-flex justify-content-center g-0">
                <div class="col-md-6 d-flex justify-content-center align-items-center">
                    <img src="${producto.imagen}" class="img-fluid rounded-start"
                        alt="...">
                </div>
                <div class="col-md-5 d-flex justify-content-center align-items-center">
                    <div class="card-body">
                        <h5 class="card-title">${producto.producto}</h5>
                        <p class="card-text">${producto.descripcion}</p>
                        <ul class="list-group list-group-flush">
                            <li class="list-group-item">$${producto.precio}</li>
                            <li class="list-group-item"><span class="d-flex align-items-center"><svg
                                        xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                                        fill="currentColor" class="m-1 bi bi-credit-card-fill" viewBox="0 0 16 16">
                                        <path
                                            d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v1H0V4zm0 3v5a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7H0zm3 2h1a1 1 0 0 1 1 1v1a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1v-1a1 1 0 0 1 1-1z" />
                                    </svg>3 cuotas de $${cuota.toFixed(2)}</span></li>
                        </ul>
                        <div class=" d-flex justify-content-evenly ">
                            <button type="button" class="btn btn-dark d-flex align-items-center">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                    class="bi bi-geo-alt-fill m-1" viewBox="0 0 16 16">
                                    <path
                                        d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10zm0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6z" />
                                </svg>Sucursal uno
                            </button>
                            <button type="button" class="btn btn-dark d-flex align-items-center">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                    class="bi bi-geo-alt-fill m-1" viewBox="0 0 16 16">
                                    <path
                                        d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10zm0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6z" />
                                </svg>Sucursal dos
                            </button>
                        </div>
                        <a href="#" class="btn my-2 btn-dark d-flex justify-content-center">Carrito</a>
                    </div>
                </div>
            </div>
        </div>
        `;
    } else {
        return `<p>No se encontró un producto con ID: ${id}</p>`;
    }
}