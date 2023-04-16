const alertPlaceholder1 = document.getElementById('liveAlertPlaceholder1')
const appendAlert1 = (message, type) => {
const wrapper1 = document.createElement('div')
wrapper1.innerHTML = [
    `<div class="alert alert-${type} alert-dismissible" role="alert">`,
    `   <div>${message}</div>`,
    '   <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>',
    '</div>'
].join('')
alertPlaceholder1.append(wrapper1)
}
const alertTrigger1 = document.getElementById('liveAlertBtn1')
if (alertTrigger1) {
alertTrigger1.addEventListener('click', () => {
    appendAlert1('Su consulta/comentario ha sido enviado. ¡Gracias por contactarnos!', 'success')
    setTimeout(function(){ 
        alert.close(); 
      }, 3000);
})
}

const alertPlaceholder2 = document.getElementById('liveAlertPlaceholder2')
const appendAlert2 = (message, type) => {
const wrapper2 = document.createElement('div')
wrapper2.innerHTML = [
    `<div class="alert alert-${type} alert-dismissible" role="alert">`,
    `   <div>${message}</div>`,
    '   <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>',
    '</div>'
].join('')
alertPlaceholder2.append(wrapper2)
}
const alertTrigger2 = document.getElementById('liveAlertBtn2')
if (alertTrigger2) {
alertTrigger2.addEventListener('click', () => {
    appendAlert2('Su consulta/comentario ha sido enviado. ¡Gracias por contactarnos!', 'success')
})
}