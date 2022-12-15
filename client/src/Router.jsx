import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { MisReviews } from "./components/private/MisReviews";
import { Private } from "./components/private/Private";
import { Reviews } from "./components/private/Reviews";
import { Public } from "./components/public/Public";

export const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Public />}></Route>
        <Route path="/home" element={<Private />}>
          <Route index element={<Reviews />}></Route>
          <Route path="reviews" element={<Reviews />}></Route>
          <Route path="mis-reviews" element={<MisReviews />}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
