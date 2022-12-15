import React, { useEffect } from "react";
import { useReviews } from "../../hook/useReviews";

export const Reviews = () => {
  // --------------------------------------------------------------------------------
  const { obtenerTodasReviews, todasReviews } = useReviews();

  // --------------------------------------------------------------------------------
  useEffect(() => {
    obtenerTodasReviews();
  }, []);

  // --------------------------------------------------------------------------------
  return (
    <div id="reviews" className="bg-dark bg-gradient">
      {todasReviews === null ? (
        <div className="pt-5 text-center">
          <h3>Cargando...</h3>
        </div>
      ) : (
        <div className="container">
          <h3 className="pt-5 text-center fst-italic">Todas las reviews</h3>
          {todasReviews.map((review) => {
            return (
              <div className="card mt-5" key={review.id}>
                <div className="row g-0">
                  <div className="col-md-2">
                    <img
                      src={review.img}
                      alt={review.titulo}
                      className="img-fluid rounded-start"
                    />
                  </div>
                  <div className="col-md-10">
                    <div className="card-body">
                      <h5 className="card-title">{review.titulo}</h5>
                      <p className="card-text">{review.descripcion}</p>
                      <p className="card-text">
                        <small className="text-muted">
                          {review.estrellas}&#9885; | de
                          <strong> {review.email}</strong> | {review.createdAt}
                        </small>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
