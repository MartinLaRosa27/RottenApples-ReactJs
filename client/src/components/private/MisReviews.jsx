import React from "react";
import { FomrNuevaReview } from "./helpers/FomrNuevaReview";
import { ListaMisReviews } from "./helpers/ListaMisReviews";

export const MisReviews = () => {
  // --------------------------------------------------------------------------------
  return (
    <div id="mis_reviews" className="bg-dark bg-gradient">
      <div className="container">
        <h3 className="pt-5 text-center fst-italic">Agregar Nueva Review</h3>
        <FomrNuevaReview />
        <h3 className="pt-5 text-center fst-italic">Mis Reviews</h3>
        <ListaMisReviews />
      </div>
    </div>
  );
};
