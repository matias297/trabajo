function horarioaddAction() {

    const data2 = {
      hora: document.getElementById("nameHorario").value,
    }

    ajax("POST", "/horarioAdd", data2, function(res){
        if(res.status === 200){
          window.location.href = "/admin"
        }
        if(res.status === 400){
          alert("Error en el registro")
        }
        if(res.status === 409){
          alert("El horario ya existe")
        }
      })
}