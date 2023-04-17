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
        return `
            <div>
                <img class="w-25" src="${producto.imagen}" alt="">
                <div class="w-25 text-center">
                    <h1>${producto.producto}</h1>
                    <p>${producto.descripcion}</p>
                    <p>${producto.disponibles}</p>
                    <p>${producto.precio}</p>
                </div>
            </div>
        `;
    } else {
        return `<p>No se encontró un producto con ID: ${id}</p>`;
    }
}