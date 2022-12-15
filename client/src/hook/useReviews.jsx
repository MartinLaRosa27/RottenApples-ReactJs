import { useContext } from "react";
import reviewsContext from "../context/ReviewsProvider";

export const useReviews = () => {
  return useContext(reviewsContext);
};
