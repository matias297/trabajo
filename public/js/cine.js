function selectCine(idCines){
    ajax("GET", "/funciones", idCines, function(res){
        console.log(res)
    })
}