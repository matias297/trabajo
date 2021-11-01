/*  Paquetes instalados: -g nodemon, express, express-handlebars, body-parser, mysql2
    Agregado al archivo "package.json" la línea --> "start": "nodemon index"
    
    Proyecto "Node_base"
    Desarrollo de Aplicaciones Informáticas - 5to Informática
    
    Docentes: Nicolás Facón, Martín Rivas
    
    Revisión 1 - Año 2021
*/
//Cargo librerías instaladas y necesarias

const express = require("express"); //Para el manejo del servidor Web
const exphbs = require("express-handlebars"); //Para el manejo de los HTML
const bodyParser = require("body-parser"); //Para el manejo de los strings JSON
const session = require("express-session");
const MySQL = require("./modulos/mysql"); //Añado el archivo mysql.js presente en la carpeta módulos
//const Preguntados = require('./modulos/preguntados');

const app = express(); //Inicializo express para el manejo de las peticiones
var sess = {
  secret: "keyboard cat",
  cookie: {},
  resave: true,
  saveUninitialized: true,
};

app.use(session(sess));
app.use(express.static("public")); //Expongo al lado cliente la carpeta "public"
app.use(bodyParser.urlencoded({ extended: false })); //Inicializo el parser JSON
app.use(bodyParser.json());

app.engine("handlebars", exphbs({ defaultLayout: "main" })); //Inicializo Handlebars. Utilizo como base el layout "Main".
app.set("view engine", "handlebars"); //Inicializo Handlebars

const Listen_Port = 3000; //Puerto por el que estoy ejecutando la página Web

app.listen(Listen_Port, function () {
  console.log(
    "Servidor NodeJS corriendo en http://localhost:" + Listen_Port + "/"
  );
});

/*
    A PARTIR DE ESTE PUNTO GENERAREMOS NUESTRO CÓDIGO (PARA RECIBIR PETICIONES, MANEJO DB, ETC.)
*/

/* Ejemplo query a la base de datos */
/* const result = await MySQL.realizarQuery("SELECT * FROM Usuarios")

/*Renderizados */

app.get("/", function (req, res) {
  res.render("login", null); //Renderizo página "login" sin pasar ningún objeto a Handlebars
});

/*Funciones LOGIN*/
app.post("/login", async function (req, res) {
  /*Capturamos los datos */
  const { email, password } = req.body;
  /*Hacemos consulta a la base */
  const result = await MySQL.realizarQuery(
    `SELECT * FROM Usuarios WHERE mail = "${email}"`
  );
  /* Validamos la contraseña */
  if (result[0] === undefined) {
    res.send("Usuario no existe");
  }
  if (result[0].pass != password) {
    res.send("Contraseña incorrecta");
  }
  if (result[0].pass == password) {
    sess.user = result[0].mail;
    sess.idUser = result[0].idUsuario;
    res.send("Bienvenido");
  }
});

/* REGISTER */
app.post("/register", async function (req, res) {
  /*Capturamos los datos */
  const { email, password, nombre, apellido, dni } = req.body;
  const result = await MySQL.realizarQuery(
    `INSERT INTO Usuarios VALUES (3,"${nombre}","${apellido}","${email}","${dni}","${password}")`
  );
  res.send("Usuario registrado");
});

app.get("/register", function (req, res) {
  res.render("register", null);
});

/* PELICULAS */
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
app.get("/reservas", async function(req,res) {
  const butacas = await MySQL.realizarQuery(
    `SELECT * FROM Reserva where Reserva.idFunciones = ${sess.funcion}`
  );
  res.send(butacas)
})
app.post("/butacas", async function (req, res) {
  const {
    Butaca_1,
    Butaca_2,
    Butaca_3,
    Butaca_4,
    Butaca_5,
    Butaca_6,
  } = req.body;

  const result = await MySQL.realizarQuery(
    `INSERT INTO Reserva VALUES (0,"${sess.funcion}","${sess.idUser}", "${Butaca_1 ? 1 : 0} ", "${Butaca_2 ? 1 : 0}", "${Butaca_3 ? 1 : 0}","${Butaca_4 ? 1 : 0}","${Butaca_5 ? 1 : 0}","${Butaca_6 ? 1 : 0}", false)`
  );
  res.render("butacas", { peliculas: result });
});

/* ADMIN */
app.get("/admin", function (req, res) {
  res.render("admin", null);
});

app.get("/adminpelicula", function (req, res) {
  res.render("adminpelicula", null);
});

app.post("/movieAdd", async function (req, res) {
  /*Capturamos los datos */
  const { nombre, duracion, director, genero, idioma } = req.body;
  const result = await MySQL.realizarQuery(
    `INSERT INTO Peliculas VALUES (0, "${nombre}","${duracion}","${director}","${genero}","${idioma}")`
  );
  res.send("Película agregada a la base de datos");
});

app.get("/admincine", function (req, res) {
  res.render("admincine", null);
});

app.post("/cineAdd", async function (req, res) {
  /*Capturamos los datos */
  const { nombre, barrio, direccion } = req.body;
  const result = await MySQL.realizarQuery(
    `INSERT INTO Cines VALUES (0, "${nombre}","${barrio}","${direccion}")`
  );
  res.send("Cine agregado a la base de datos");
});

app.get("/adminhorario", function (req, res) {
  res.render("adminhorario", null);
});

app.post("/horarioAdd", async function (req, res) {
  /*Capturamos los datos */
  const { hora } = req.body;
  const result = await MySQL.realizarQuery(
    `INSERT INTO Horarios VALUES (0, '2020-01-01 ${hora}:00:00');`
  );
  res.send("Horario agregado a la base de datos");
});

/* Butacas */
app.get("/butacas", function (req, res) {
  res.render("butacas", null);
});

/* Cine */
app.get("/cine", function (req, res) {
  res.render("cine", null);
});

app.get("/cines", async function (req, res) {
  const result = await MySQL.realizarQuery("SELECT * FROM Cines");
  res.render("cine", { cines: result });
});

app.post("/reserva", async function (req, res) {
  sess.idCine;
  sess.idPelicula;
  sess.idHorario;
  sess.idButacas;
});

app.get("/session", async function (req, res) {
  res.send(sess);
});

const cambiarFormatoHora = (peliculas) => {
  peliculas.map((pelicula) => {
    const nuevoFormato = pelicula.hora.toString().split(" ");
    pelicula.hora = nuevoFormato[4];
  });
  return peliculas;
};

app.get("/logout", function(){
  sess = null;
  res.redirect("/");
})

app.get("/usuarioinfo", async function (req, res) {
  res.render("usuarioinfo", null);
});

app.get("/usuarioreservas", async function (req, res) {
  const result = await MySQL.realizarQuery("SELECT Peliculas.nombre as Pelicula, Cines.nombre as Cine, Horarios.hora as Hora FROM Reserva JOIN Funciones ON Reserva.idFunciones = Funciones.idFunciones JOIN Peliculas ON Funciones.idPeliculas = Peliculas.idPeliculas JOIN Cines ON Funciones.idCines = Cines.idCines JOIN Horarios ON Funciones.idHorarios = Horarios.idHorarios WHERE Reserva.idUsuario =  " + sess.idUser)
  res.render("usuarioreservas", { entradas: result });
});

app.get("/usuarioconfirmadas", async function (req, res) {
  const result = await MySQL.realizarQuery("SELECT Peliculas.nombre as Pelicula, Cines.nombre as Cine, Horarios.hora as Hora FROM Reserva JOIN Funciones ON Reserva.idFunciones = Funciones.idFunciones JOIN Peliculas ON Funciones.idPeliculas = Peliculas.idPeliculas JOIN Cines ON Funciones.idCines = Cines.idCines JOIN Horarios ON Funciones.idHorarios = Horarios.idHorarios WHERE Reserva.idUsuario =  " + sess.idUser)
  res.render("usuarioconfirmadas", { entradas: result });
});

