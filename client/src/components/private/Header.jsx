import React from "react";
import { useUser } from "../../hook/useUser";
import { NavLink } from "react-router-dom";
const logo = require("../../assets/logo.png");

export const Header = () => {
  // --------------------------------------------------------------------------------
  const { cerrarSesion } = useUser();

  // --------------------------------------------------------------------------------
  return (
    <nav id="header" className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid container">
        <NavLink className="navbar-brand" to="/home">
          <img src={logo} alt="Rotten Apples" />
        </NavLink>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            {/* Reviews */}
            <li className="nav-item">
              <NavLink className="nav-link" to="reviews">
                Reviews
              </NavLink>
            </li>
            {/* Mis Reviews */}
            <li className="nav-item">
              <NavLink className="nav-link" to="mis-reviews">
                Mis Reviews
              </NavLink>
            </li>
            {/* Cerrar Sesión */}
            <li className="nav-item">
              <a className="nav-link" onClick={(e) => cerrarSesion()}>
                Cerrar Sesión
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};
