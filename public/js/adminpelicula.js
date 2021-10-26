function movieaddAction() {
    const {value: nombre} = document.getElementById("nameMovie");
    const {value: duracion} = document.getElementById("durationMovie");
    const {value: director} = document.getElementById("directorMovie")
    const {value: genero} = document.getElementById("genreMovie")
    const {value: idioma} = document.getElementById("languageMovie")
    const data = {nombre, duracion, director, genero, idioma}
}