let boton1 = document.getElementById("liveAlertBtn1")
let boton2 = document.getElementById("liveAlertBtn2")

function alertasContacto(texto,texto2, texto3, texto4, boton){
    if (!texto.trim()){
        return escuchadorSubmitNo(boton);
    }else if (!texto2.trim()){
        return escuchadorSubmitNo(boton);
    }else if (!texto3.trim()){
        return escuchadorSubmitNo(boton);
    }else if (!texto4.trim()){
        return escuchadorSubmitNo(boton);
    } else {
        return escuchadorSubmitOk(boton)
    }
}

function escuchadorSubmitOk(boton){
    return boton.addEventListener('click', () => {
        Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Su consulta fue enviada',
            showConfirmButton: true,
            timer: 5000
        })
    })
}

function escuchadorSubmitNo(boton){
    return boton.addEventListener('click', () => {
        Swal.fire({
            icon: 'error',
            title: 'Ups...algo salio mal',
            text: 'Completar casillas obligatorias'
        })
    })
}

boton1.addEventListener('click', () => {
    const nombre = document.getElementById('nombre').value;
    const apellido = document.getElementById('apellido').value;
    const email = document.getElementById('email23').value;
    const telefono = document.getElementById('telefono').value;
    alertasContacto(nombre, apellido, email, telefono, boton1);
})

boton2.addEventListener('click', () => {
    escuchadorSubmitOk(boton2);
});
