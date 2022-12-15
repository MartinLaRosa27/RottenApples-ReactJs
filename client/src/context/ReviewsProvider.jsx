import React, { createContext, useState } from "react";
import axios from "axios";
import { useUser } from "../hook/useUser";
const reviewsContext = createContext();

export const ReviewsProvider = (props) => {
  // --------------------------------------------------------------------------------
  const [todasReviews, setTodasReviews] = useState(null);
  const [reviewsUsuario, setReviewsUsuario] = useState(null);
  const [peliculas, setPeliculas] = useState(null);
  const { cerrarSesion } = useUser();

  // --------------------------------------------------------------------------------
  const obtenerTodasReviews = async () => {
    await axios
      .get(`http://${process.env.REACT_APP_BACKEND_URL}/obtener-todas-reviews`)
      .then((res) => {
        setTodasReviews(res.data.reviews);
      });
  };

  // --------------------------------------------------------------------------------
  const listadoPeliculas = async () => {
    await axios
      .get(`http://${process.env.REACT_APP_BACKEND_URL}/listado-peliculas`)
      .then((res) => {
        setPeliculas(res.data.peliculas);
      });
  };

  // --------------------------------------------------------------------------------
  const publicarReview = async (reviewForm) => {
    let reviewConfirmacion = false;
    const { peliculaId, descripcion, estrellas } = reviewForm;
    await axios
      .post(`http://${process.env.REACT_APP_BACKEND_URL}/publicar-review`, {
        authorization: localStorage.getItem("token"),
        peliculaId,
        descripcion,
        estrellas,
      })
      .then((res) => {
        alert(res.data.message);
        obtenerReviewsPorUsuario();
        reviewConfirmacion = true;
      })
      .catch((e) => {
        alert(e.response.data.message);
        if (e.response.data.message === "Token expirado") {
          cerrarSesion();
        }
      });
    return reviewConfirmacion;
  };

  // --------------------------------------------------------------------------------
  const obtenerReviewsPorUsuario = async () => {
    await axios
      .post(
        `http://${process.env.REACT_APP_BACKEND_URL}/obtener-reviews-usuario`,
        {
          authorization: localStorage.getItem("token"),
        }
      )
      .then((res) => {
        setReviewsUsuario(res.data.reviews);
      })
      .catch((e) => {
        alert(e.response.data.message);
        if (e.response.data.message === "Token expirado") {
          cerrarSesion();
        }
      });
  };

  // --------------------------------------------------------------------------------
  const eliminarReview = async (id) => {
    await axios
      .patch(
        `http://${process.env.REACT_APP_BACKEND_URL}/eliminar-review/${id}`,
        {
          authorization: localStorage.getItem("token"),
        }
      )
      .then((res) => {
        alert(res.data.message);
        obtenerReviewsPorUsuario();
      })
      .catch((e) => {
        alert(e.response.data.message);
        if (e.response.data.message === "Token expirado") {
          cerrarSesion();
        }
      });
  };

  // --------------------------------------------------------------------------------
  return (
    <reviewsContext.Provider
      value={{
        todasReviews,
        peliculas,
        reviewsUsuario,
        obtenerTodasReviews,
        publicarReview,
        listadoPeliculas,
        obtenerReviewsPorUsuario,
        eliminarReview,
      }}
    >
      {props.children}
    </reviewsContext.Provider>
  );
};

export default reviewsContext;
