import React from "react";
import { LoginForm } from "./LoginForm";
import { RegistroForm } from "./RegistroForm";
import { Navigate } from "react-router-dom";
const logo = require("../../assets/logo.png");

export const Public = () => {
  // --------------------------------------------------------------------------------
  return (
    <>
      {/* Redirección */}
      {localStorage.getItem("token") ? <Navigate to="/home" /> : <></>}

      <div id="registro" className="pb-5 pt-5">
        {/* Logo */}
        <div className="text-center pb-4">
          <img src={logo} alt="Rottten Apples" />
        </div>

        {/* Registro */}
        <div className="formulario container bg-dark text-light pt-1 pb-2">
          <h3 className="text-center text-uppercase">Registrarse</h3>
          <RegistroForm />
        </div>

        {/* Login */}
        <div className="formulario bg-dark mt-5 text-light pt-1 pb-2 container">
          <h3 className="text-center text-uppercase">Iniciar Sesión</h3>
          <LoginForm />
        </div>
      </div>
    </>
  );
};
