const express = require("express");
const MySQL = require("../modulos/mysql.js");
const application = express.Router();

application.get ("/", async function (request, response){
    response.render("entradas");
});

application.put("/",async (req, res) => {
    const { cine, pelicula } = req.body;
    const idPeliculas = await MySQL.realizarQuery(
      `SELECT Peliculas.idPeliculas FROM Peliculas WHERE Peliculas.nombre = "${pelicula}" `
    );
    const idCine = await MySQL.realizarQuery(
      `SELECT Cines.idCines FROM Cines WHERE Cines.nombre = "${cine}" `
    );
    const idFuncion = await MySQL.realizarQuery(
      `SELECT Funciones.idFunciones FROM Funciones WHERE Funciones.idPeliculas = "${idPeliculas[0].idPeliculas}" AND Funciones.idCines = "${idCine[0].idCines}"`
    );
    sess.funcion = idFuncion[0].idFunciones;
    sess.update = true;
    const reservas = await MySQL.realizarQuery(
      `SELECT * FROM Reserva WHERE Reserva.idFunciones = "${idFuncion[0].idFunciones}"`
    );
  
    res.render("butacas", reservas);
});

application.delete("/",async (req, res) => {
     const { cine, pelicula } = req.body;
  const idPeliculas = await MySQL.realizarQuery(
    `SELECT Peliculas.idPeliculas FROM Peliculas WHERE Peliculas.nombre = "${pelicula}" `
  );
  const idCine = await MySQL.realizarQuery(
    `SELECT Cines.idCines FROM Cines WHERE Cines.nombre = "${cine}" `
  );
  const idFuncion = await MySQL.realizarQuery(
    `SELECT Funciones.idFunciones FROM Funciones WHERE Funciones.idPeliculas = "${idPeliculas[0].idPeliculas}" AND Funciones.idCines = "${idCine[0].idCines}"`
  );
  sess.funcion = idFuncion[0].idFunciones;
  sess.update = true;
  const reservas = await MySQL.realizarQuery(
    `SELECT * FROM Reserva WHERE Reserva.idFunciones = "${idFuncion[0].idFunciones}"`
  );

  res.render("butacas", reservas);
});

module.exports = application;