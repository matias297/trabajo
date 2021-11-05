const selectButaca = async (input, asiento) => {
  input.className = input.className === "noSelect" ? "Select" : "noSelect";
};

const selectButaca2 = async () => {
  const data = {
    Butaca_1: false,
    Butaca_2: false,
    Butaca_3: false,
    Butaca_4: false,
    Butaca_5: false,
    Butaca_6: false,
  };
  var butacasSelect = document.getElementsByClassName("Select");
  butacasSelect = Array.from(butacasSelect);
  butacasSelect = butacasSelect.map((butaca) => {
    return (data["Butaca_" + butaca.id] = true);
  });

  ajax("POST", "/butacas", data, function (res) {
    window.location.href = "/confirmar";
  });
};

const mostrarReservadas = async () => {
  await ajax("GET", "/reservas", null, function (res) {
    var inputs = document.getElementsByClassName("noSelect");
    cambiarClase(inputs, res);
  });
};

const cambiarClase = async (input, butacas) => {
  butacas = JSON.parse(butacas)
  for (var i = 0; i < 7; i++) {
    if(butacas[0]["Butaca_" + i] === 1){
      document.getElementById(i).className = "Select";
      document.getElementById(i).style = "pointer-events: none;";
    }
  }
};


mostrarReservadas();

