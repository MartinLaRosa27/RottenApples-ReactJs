const express = require("express");
const router = express.Router();
const {
  crearUsuario,
  loginUsuario,
  auth,
} = require("./controllers/userController");
const {
  publicarReview,
  modificarReview,
  eliminarReview,
  obtenerTodasReviews,
  obtenerReviewsPorUsuario,
} = require("./controllers/reviewController");
const { listadoPeliculas } = require("./controllers/peliculaController");

module.exports = () => {
  // User:
  router.post("/crear-usuario", crearUsuario);
  router.post("/login-usuario", loginUsuario);

  // Review:
  router.get("/obtener-todas-reviews", obtenerTodasReviews);
  router.post("/obtener-reviews-usuario", auth, obtenerReviewsPorUsuario);
  router.post("/publicar-review", auth, publicarReview);
  router.patch("/modificar-review/:id", auth, modificarReview);
  router.patch("/eliminar-review/:id", auth, eliminarReview);

  // Pelicula:
  router.get("/listado-peliculas", listadoPeliculas);

  return router;
};
