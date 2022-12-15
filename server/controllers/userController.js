const User = require("../models/User");
const jwt = require("jwt-simple");
const moment = require("moment");
const bcrypt = require("bcrypt");
const secreto = "secreto123";
const expTimeSec = 360;

// --------------------------------------------------------------------------
module.exports.crearUsuario = async (req, res) => {
  // Datos obtenidos:
  const { email, password, passwordAux } = req.body;
  console.log(email);
  // Se validan los datos:
  if (password != passwordAux) {
    return res.status(400).json({
      status: "error",
      message: "Las contraseñas ingresadas no coinciden",
    });
  }
  // Se verifica que el email no se encuntre registrado:
  const emailRegistrado = await User.count({
    where: {
      email,
    },
  });
  if (emailRegistrado > 0) {
    return res.status(400).json({
      status: "error",
      message: "Email ya registrado. Por favor, ingrese otro",
    });
  }
  // Se crea el usuario:
  try {
    const user = await User.create({
      email,
      password,
    });
    // Se consigue el Token:
    const payload = {
      id: user.id,
      email: user.email,
      exp: moment().unix() + expTimeSec,
    };
    const token = jwt.encode(payload, secreto);
    return res.status(200).json({
      status: "success",
      message: "Usuario registrado con exito",
      token,
    });
  } catch (e) {
    console.log(e);
    return res
      .status(400)
      .json({ status: "error", message: "No se pudo registrar el usuario" });
  }
};

// --------------------------------------------------------------------------
exports.loginUsuario = async (req, res) => {
  // Obtiene parametros body:
  const { email, password } = req.body;
  // Si existe el email:
  const user = await User.findOne({
    where: {
      email,
    },
  });
  if (!user) {
    return res
      .status(404)
      .json({ status: "error", message: "Usuario no registrado" });
  }
  if (!bcrypt.compareSync(password, user.password)) {
    // Si la contraseña es incorrecta:
    return res
      .status(404)
      .json({ status: "error", message: "Datos incorrectos" });
  }
  // Si la contraseña es correcta:
  // Se consigue el Token:
  const payload = {
    id: user.id,
    email: user.email,
    exp: moment().unix() + expTimeSec,
  };
  const token = jwt.encode(payload, secreto);
  return res
    .status(200)
    .json({ status: "success", message: "Login correcto", token });
};

// --------------------------------------------------------------------------
module.exports.auth = (req, res, next) => {
  // Comprobar si llega la cabecera de auth:
  if (!req.body.authorization) {
    return res.status(404).send({
      status: "error",
      message: "Token expirado",
    });
  }
  // Limpia el token:
  const token = req.body.authorization.replace(/['"]+/g, "");
  // Decodifica el token:
  try {
    const payload = jwt.decode(token, secreto);
    // Comprueba expiración del token:
    if (payload.exp <= moment().unix()) {
      return res.status(404).send({
        status: "error",
        message: "Token expirado",
      });
    }
    // Agrega datos de usuario a request:
    req.user = payload;
  } catch (e) {
    console.log(e);
    return res.status(404).send({
      status: "error",
      message: "Token expirado",
    });
  }
  // Pasar a ejecución de acción:
  next();
};
