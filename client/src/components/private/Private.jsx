import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { Header } from "./Header";
import { Footer } from "./Footer";

export const Private = () => {
  // --------------------------------------------------------------------------------
  return (
    <>
      {/* Redirección */}
      {!localStorage.getItem("token") ? <Navigate to="/" /> : <></>}
      <Header />
      <Outlet />
      <Footer />
    </>
  );
};
