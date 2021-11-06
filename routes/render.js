const express = require("express");
const MySQL = require("../modulos/mysql.js");
const app = express.Router();

app.get("/", async function (req, res) {
  res.render("login", null);
});

app.get("/register", async function (req, res) {
  res.render("register", null);
});

app.get("/cines", async function (req, res) {
  const result = await MySQL.realizarQuery("SELECT * FROM Cines");
  res.render("cine", { cines: result });
});

app.get("/peliculas", async function (req, res) {
  var result = await MySQL.realizarQuery(
    `SELECT * FROM Funciones JOIN Peliculas ON Funciones.idPeliculas = Peliculas.idPeliculas JOIN Horarios ON Funciones.idHorarios = Horarios.idHorarios WHERE idCines = ${req.query.idCine}`
  );
  result = cambiarFormatoHora(result);
  sess.cine = req.query.idCine;
  res.render("peliculas", { peliculas: result });
});

app.get("/horarios", async function (req, res) {
  const { idPeliculas, idHorarios } = req.query;
  const result = await MySQL.realizarQuery(
    "select Horarios.hora from Funciones join Horarios on Funciones.idHorarios = Horarios.idHorarios where idPeliculas = " +
      idPeliculas
  );
  const funcion = await MySQL.realizarQuery(
    `SELECT * FROM Funciones where Funciones.idPeliculas = ${idPeliculas} AND Funciones.idCines= ${sess.cine}`
  );
  sess.pelicula = idPeliculas;
  sess.horario = idHorarios;
  sess.funcion = funcion[0].idFunciones;

  const butacas = await MySQL.realizarQuery(
    `SELECT * FROM Reserva where Reserva.idFunciones = ${funcion[0].idFunciones}`
  );
  console.log(butacas);
  res.render("butacas", { butacas: butacas });
});

app.get("/reservas", async function (req, res) {
  const butacas = await MySQL.realizarQuery(
    `SELECT * FROM Reserva where Reserva.idFunciones = ${sess.funcion}`
  );
  res.send(butacas);
});

app.get("/butacas", function (req, res) {
  res.render("butacas", null);
});

module.exports = app;
