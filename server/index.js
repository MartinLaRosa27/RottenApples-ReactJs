// Dependencias:
const express = require("express");
const cors = require("cors");
const router = require("./router");
require("dotenv").config({ path: "development.env" });

// Base de Datos:
const db = require("./config/database");
require("./models/User");
require("./models/Pelicula");
require("./models/Review");
db.sync()
  .then(() => {
    console.log("Se conecto correctamente a la base de datos");
  })
  .catch((e) => console.log(e));

// Servidor de Node:
const app = express();
// Configurar Cors:
app.use(cors());
// Convierte los datos del body a objetos js:
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// Se cargan las rutas:
app.use("/", router());

// Servidor a escuchar:
const server_port = process.env.YOUR_PORT || 80;
const server_host = process.env.YOUR_HOST || "0.0.0.0";
app.listen(server_port, server_host, function () {
  console.log(
    `La aplicación esta corriendo en -> http://localhost:${server_port}`
  );
});
