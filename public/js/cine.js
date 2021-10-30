function selectCine(idCines){
    ajax("GET", "/funciones", idCines, function(res){
        console.log(res)
    })
}

function selectMovie(arg){
    const data = {
        idPeliculas: arg[0],
        idHorarios: arg[1]
    }
    ajax("GET", "/horarios", data, function(res){
        window.location.href = "/butacas"
    })
}