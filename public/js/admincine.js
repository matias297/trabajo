function cineaddAction() {

    const data2 = {
      nombre: document.getElementById("nameCine").value,
      barrio: document.getElementById("barrioCine").value,
      direccion: document.getElementById("direccionCine").value,
    }

    ajax("POST", "/cineAdd", data2, function(res){
        if(res.status === 200){
          window.location.href = "/admin"
        }
        if(res.status === 400){
          alert("Error en el registro")
        }
        if(res.status === 409){
          alert("El cine ya existe")
        }
      })
}