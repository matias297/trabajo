const confirmarEntrada = () => {
    ajax("POST", "/entrada/confirmar", null, function(res){
        window.location.href = "/entradaconfirmada"
    })  
}

const volverAlInicio = () => {
    window.location.href = "/"
}
