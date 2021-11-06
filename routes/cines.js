const express = require("express");
const MySQL = require("../modulos/mysql.js");
const application = express.Router();

application.get("/cines", async function (req, res) {
  const result = await MySQL.realizarQuery("SELECT * FROM Cines");
  res.render("cine", { cines: result });
});


module.exports = application;