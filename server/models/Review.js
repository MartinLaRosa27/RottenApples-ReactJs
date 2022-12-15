const Sequelize = require("sequelize");
const database = require("../config/database.js");

const Review = database.define("review", {
  id: {
    type: Sequelize.INTEGER(11),
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  },

  descripcion: {
    type: Sequelize.STRING(144),
    allowNull: false,
    validate: {
      len: [10, 144],
      notEmpty: true,
    },
  },

  estrellas: {
    type: Sequelize.INTEGER(1),
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
});

module.exports = Review;
