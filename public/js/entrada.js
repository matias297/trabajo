const confirmarEntrada = () => {
    ajax("POST", "/entrada/confirmar", null, function(res){
        console.log(res)
        return window.location.href = "/entradaconfirmada"
    })  
}

const volverAlInicio = () => {
    window.location.href = "/cines"
}
