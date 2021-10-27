function movieaddAction() {

    const data2 = {
      nombre: document.getElementById("nameMovie").value,
      duracion: document.getElementById("durationMovie").value,
      director: document.getElementById("directorMovie").value,
      genero: document.getElementById("genreMovie").value,
      idioma: document.getElementById("languageMovie").value,
    }

    ajax("POST", "/movieAdd", data2, function(res){
        if(res.status === 200){
          window.location.href = "/admin"
        }
        if(res.status === 400){
          alert("Error en el registro")
        }
        if(res.status === 409){
          alert("La pelicula ya existe")
        }
      })
}