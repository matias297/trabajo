const express = require("express");
const MySQL = require("../modulos/mysql.js");
const application = express.Router();

application.post("/login", async (req, res) => {
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
    req.session.user = result[0].mail;
    req.session.idUser = result[0].idUsuario;
    res.send("Bienvenido");
  }
  console.log(req.session);
});

application.post("/register", async (req, res) => {
  /*Capturamos los datos */
  const { email, password, nombre, apellido, dni } = req.body;
  /*Hacemos consulta a la base */
  const result = await MySQL.realizarQuery(
    `SELECT * FROM Usuarios WHERE Usuarios.mail = "${email}"`
  );

  if (result[0] === undefined) {
    const User = await MySQL.realizarQuery(
      `INSERT INTO Usuarios VALUES (0,"${nombre}","${apellido}","${email}","${dni}","${password}")`
    );
    const UserRegister = await MySQL.realizarQuery(
      `SELECT * FROM Usuarios WHERE Usuarios.mail = "${email}"`
    );
    req.session.user = UserRegister[0].mail;
    req.session.idUser = UserRegister[0].idUsuario;
    res.send("Usuario registrado");
  } else {
    res.send("Usuario ya existe");
  }
});

application.get("/logout", (req, res) => {
  req.session.destroy();
  res.send("Sesion cerrada");
})
module.exports = application;
