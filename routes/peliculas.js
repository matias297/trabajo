const express  = require("express");
const MySQL = require("../modulos/mysql.js");
const application = express.Router();

application.get("/peliculas", (req, res) => {
  res.send("Hola mundo");
});

application.get("/peliculas/:id", (req, res) => {
    res.send("Hola mundo");
});

module.exports = application;