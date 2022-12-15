const Review = require("../models/Review");
const { QueryTypes } = require("sequelize");

// --------------------------------------------------------------------------
module.exports.publicarReview = async (req, res) => {
  // Datos obtenidos:
  const { peliculaId, descripcion, estrellas } = req.body;
  console.log(peliculaId);
  console.log(descripcion);
  console.log(estrellas);
  // Valida datos (Sequelize valida peliculaId - userId - descripcion):
  if (estrellas < 1 || estrellas > 5) {
    return res.status(400).json({
      status: "error",
      message: "Error en el valor de las estrellas ingresado",
    });
  }
  // Se crea la review:
  try {
    const review = await Review.create({
      peliculaId,
      userId: req.user.id,
      descripcion,
      estrellas,
    });
    return res.status(200).json({
      status: "success",
      message: "Review publicada con exito",
      id: review.id,
    });
  } catch (e) {
    console.log(e);
    return res
      .status(400)
      .json({ status: "error", message: "No se pudo publicar la review" });
  }
};

// --------------------------------------------------------------------------
module.exports.modificarReview = async (req, res) => {
  // Datos obtenidos:
  const { id } = req.params;
  const { peliculaId, descripcion, estrellas } = req.body;
  // Valida datos (Sequelize valida peliculaId - userId - descripcion):
  if (estrellas < 1 || estrellas > 5) {
    return res.status(400).json({
      status: "error",
      message: "Error en el valor de las estrellas ingresado",
    });
  }
  // Se modifica la review:
  try {
    const review = await Review.sequelize.query(
      `UPDATE reviews SET peliculaId='${peliculaId}', descripcion='${descripcion}', estrellas='${estrellas}' WHERE id='${id}'`,
      {
        type: QueryTypes.UPDATE,
      }
    );
    return res.status(200).json({
      status: "success",
      message: "Review modificada con exito",
      id: review.id,
    });
  } catch (e) {
    console.log(e);
    return res
      .status(400)
      .json({ status: "error", message: "No se pudo modificar la review" });
  }
};

// --------------------------------------------------------------------------
module.exports.eliminarReview = async (req, res) => {
  // Datos obtenidos:
  const { id } = req.params;
  // Se elimina la review:
  try {
    await Review.sequelize.query(`DELETE FROM reviews WHERE id='${id}'`, {
      type: QueryTypes.DELETE,
    });
    return res
      .status(200)
      .json({ status: "succcess", message: "Review eliminada con exito" });
  } catch (e) {
    console.log(e);
    return res
      .status(400)
      .json({ status: "error", message: "No se pudo eliminar la review" });
  }
};

// --------------------------------------------------------------------------
module.exports.obtenerTodasReviews = async (req, res) => {
  const reviews = await Review.sequelize.query(
    `SELECT r.id, r.descripcion, r.estrellas, CAST(r.createdAt AS DATE) AS createdAt, u.email, p.titulo, p.img 
    FROM reviews AS r 
    INNER JOIN users AS U ON u.id = r.userId 
    INNER JOIN peliculas AS p ON p.id = r.peliculaId
    ORDER BY r.id DESC`,
    {
      type: QueryTypes.SELECT,
    }
  );
  return res.status(200).json({
    status: "succcess",
    message: "Todas las reviews publicadas por usuarios",
    reviews,
  });
};

// --------------------------------------------------------------------------
module.exports.obtenerReviewsPorUsuario = async (req, res) => {
  const userId = req.user.id;
  const reviews = await Review.sequelize.query(
    `SELECT r.id, r.descripcion, r.estrellas, CAST(r.createdAt AS DATE) AS createdAt, p.titulo, p.img 
    FROM reviews AS r 
    INNER JOIN peliculas AS p ON p.id = r.peliculaId
    WHERE userId = ${userId}
    ORDER BY r.id DESC`,
    {
      type: QueryTypes.SELECT,
    }
  );
  return res.status(200).json({
    status: "succcess",
    message: "Todas las reviews publicadas por un usuario especifico",
    reviews,
  });
};
