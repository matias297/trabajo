const confirmarEntrada = () => {
  ajax("POST", "/entrada/confirmar", null, function (res) {
    return (window.location.href = "/entradaconfirmada");
  });
};

const confirmarReserva = () => {
  return (window.location.href = "/entradareservada");
};

const volverAlInicio = () => {
  window.location.href = "/cines";
};

const mostrarPopUp = () => {
  document.getElementById("popup").className = "popupView";
};

const seleccionarButaca = (cine) => {
  console.log(cine)
  const data = {
    cine: document.getElementById("nombreCine").innerHTML,
    pelicula: document.getElementById("nombrePelicula").innerHTML
  };
  ajax("POST", "/entrada/modificar", data, function (res) {
    return (window.location.href = "/butacas");
  });
};


