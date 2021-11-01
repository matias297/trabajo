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

  console.log(data);

  ajax("POST", "/butacas", data, function (res) {
    console.log(res);
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
/* 

Sess:
-ID Butacas
-ID Pelicula
-ID Horario
-ID Cine
-User 


1. Cambiar la estructura de la tabla Funciones_sala agregar un boolean
2. Hacer la petición ajax para guardar las butacas seleccionadas
3. Desde la ruta horario, pedir las butacas
4. En butacas matchear las que esten seleccionada osea la que esten en TRUE
5. Pantalla de confirmación
6. Tabla entrada
7. Pantalla entradas del usuario
8. Pantalla de modificación de entrada
9. Ruta para modificar una entrada
10. Ruta para eliminar una entrada

*/
