const confirmarEntrada = () => {
    ajax("POST", "/entrada/confirmar", null, function(res){
        console.log(res)
        return window.location.href = "/entradaconfirmada"
    })  
}

const confirmarReserva = () => {
    ajax("POST", "/entrada/confirmar", null, function(res){
        console.log(res)
        return window.location.href = "/entradareservada"
    })  
}

const volverAlInicio = () => {
    window.location.href = "/cines"
}
