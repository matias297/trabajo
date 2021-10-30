const selectButaca = async (input, asiento) => {
  input.className = input.className === "noSelect" ? "Select" : "noSelect";
}

const selectButaca2 = async () => {
  var butacasSelect = document.getElementsByClassName("Select");
  butacasSelect = Array.from(butacasSelect);
  butacasSelect = butacasSelect.map((butaca) =>{
    return butaca.id
  });
}

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