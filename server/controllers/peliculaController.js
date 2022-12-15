const Pelicula = require("../models/Pelicula");
const { QueryTypes } = require("sequelize");

module.exports.listadoPeliculas = async (req, res) => {
  const peliculas = await Pelicula.sequelize.query(
    `SELECT id, titulo, img FROM peliculas`,
    {
      type: QueryTypes.SELECT,
    }
  );
  return res.status(200).json({ status: "succcess", message: "Listado de peliculas", peliculas });
};
