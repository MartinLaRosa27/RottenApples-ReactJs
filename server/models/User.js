const Sequelize = require("sequelize");
const bcrypt = require("bcrypt");
const Review = require("./Review");
const database = require("../config/database.js");

const User = database.define("user", {
  id: {
    type: Sequelize.INTEGER(11),
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  },

  email: {
    type: Sequelize.STRING(90),
    allowNull: false,
    validate: {
      len: [5, 90],
      notContains: " ",
      notEmpty: true,
    },
    unique: true,
  },

  password: {
    type: Sequelize.STRING(60),
    allowNull: false,
    validate: {
      len: [8, 25],
      notContains: " ",
      notEmpty: true,
    },
  },
});
User.afterValidate(async (user) => {
  const password = await bcrypt.hash(user.password, 10);
  user.password = password;
});
User.hasMany(Review);

module.exports = User;
