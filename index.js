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
const MySQL = require("./modulos/mysql"); //Añado el archivo mysql.js presente en la carpeta módulos
//const Preguntados = require('./modulos/preguntados');

const app = express(); //Inicializo express para el manejo de las peticiones

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

app.get("/funciones", async function (req, res) {
  console.log(req.body);
  res.send("Hola");
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
    res.send("Bienvenido");
  }
});

app.put("/login", function (req, res) {
  //Petición PUT con URL = "/login"
  res.send(null);
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
  const result = await MySQL.realizarQuery(
    "select * from Funciones join Peliculas on Funciones.idPeliculas = Peliculas.idPeliculas where idCines = " +
      req.query.idCine
  );
  res.render("peliculas", { peliculas: result });
});


app.get("/horarios", async function (req, res) {
  console.log(req.query);
  const result = await MySQL.realizarQuery(
    "select Horarios.hora from Funciones join Horarios on Funciones.idHorarios = Horarios.idHorarios where idPeliculas = " +
      req.query.idPeliculas
  );
  res.render("peliculas", { peliculas: result });
});
/* ADMIN */
app.get("/admin", function (req, res) {
  res.render("admin", null);
});

app.get("/adminpelicula", function (req, res) {
  res.render("adminpelicula", null);
});

/*admin/peliculas */
app.post("/movieAdd", async function (req, res) {
  /*Capturamos los datos */
  const { nombre, duracion, director, genero, idioma } = req.body;
  const result = await MySQL.realizarQuery(
    `INSERT INTO Peliculas VALUES (0,"${nombre}","${duracion}","${director}","${genero}","${idioma}")`
  );
  res.send("Película agregada a la base de datos");
});

app.get("/admincine", function (req, res) {
  res.render("admincine", null);
});

app.get("/adminhorario", function (req, res) {
  res.render("adminhorario", null);
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