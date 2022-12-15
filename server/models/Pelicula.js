const Sequelize = require("sequelize");
const Review = require("./Review");
const database = require("../config/database.js");

const Pelicula = database.define("pelicula", {
  id: {
    type: Sequelize.INTEGER(11),
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  },

  titulo: {
    type: Sequelize.STRING(90),
    allowNull: false,
    validate: {
      len: [3, 90],
      notEmpty: true,
    },
    unique: true,
  },

  img: {
    type: Sequelize.STRING(350),
    allowNull: false,
    validate: {
      notEmpty: true,
    },
    unique: true,
  },
});
Pelicula.hasMany(Review);

module.exports = Pelicula;
