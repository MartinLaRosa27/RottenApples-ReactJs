import React, { useEffect } from "react";
import { useReviews } from "../../../hook/useReviews";

export const ListaMisReviews = () => {
  // --------------------------------------------------------------------------------
  const { obtenerReviewsPorUsuario, reviewsUsuario, eliminarReview } =
    useReviews();

  // --------------------------------------------------------------------------------
  useEffect(() => {
    obtenerReviewsPorUsuario();
  }, []);

  // --------------------------------------------------------------------------------
  return (
    <>
      {reviewsUsuario === null ? (
        <div className="pt-5 text-center">
          <h3>Cargando...</h3>
        </div>
      ) : (
        <ul className="list-group">
          {reviewsUsuario.map((review) => {
            return (
              <li
                className="list-group-item d-flex justify-content-between align-items-center"
                key={review.id}
              >
                <span className="editar">
                  {review.titulo} | {review.createdAt}
                </span>
                <span
                  className="eliminar"
                  onClick={(e) => eliminarReview(review.id)}
                >
                  ⛔
                </span>
              </li>
            );
          })}
        </ul>
      )}
    </>
  );
};
