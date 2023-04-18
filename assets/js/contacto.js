let boton1 = document.getElementById("liveAlertBtn1")

boton1.addEventListener('click', () => {
    Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Su consulta fue enviada',
        showConfirmButton: true,
        timer: 5000
    })
})

let boton2 = document.getElementById("liveAlertBtn2")

boton2.addEventListener('click', () => {
    Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Su consulta fue enviada',
        showConfirmButton: true,
        timer: 5000
    })
})