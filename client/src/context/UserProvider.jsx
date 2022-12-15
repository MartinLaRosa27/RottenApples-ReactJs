import React, { createContext } from "react";
import axios from "axios";
const userContext = createContext();

export const UserProvider = (props) => {
  // --------------------------------------------------------------------------------
  const crearUsuario = async (userForm) => {
    let usuarioCreadoConfirmacion = false;
    let { email, password, passwordAux } = userForm;
    email = email.toLowerCase();
    alert(email);
    await axios
      .post(`http://${process.env.REACT_APP_BACKEND_URL}/crear-usuario`, {
        email,
        password,
        passwordAux,
      })
      .then(async (res) => {
        alert(res.data.message);
        localStorage.setItem("token", res.data.token);
        usuarioCreadoConfirmacion = true;
      })
      .catch((e) => {
        alert(e.response.data.message);
      });
    return usuarioCreadoConfirmacion;
  };

  // --------------------------------------------------------------------------------
  const loginUsuario = async (userForm) => {
    let loginConfirmacion = false;
    let { email, password } = userForm;
    email = email.toLowerCase();
    await axios
      .post(`http://${process.env.REACT_APP_BACKEND_URL}/login-usuario`, {
        email,
        password,
      })
      .then((res) => {
        alert(res.data.message);
        localStorage.setItem("token", res.data.token);
        loginConfirmacion = true;
      })
      .catch((e) => {
        alert(e.response.data.message);
      });
    return loginConfirmacion;
  };

  // --------------------------------------------------------------------------------
  const cerrarSesion = () => {
    localStorage.removeItem("token");
    window.location.reload(false);
  };

  // --------------------------------------------------------------------------------
  return (
    <userContext.Provider
      value={{
        loginUsuario,
        crearUsuario,
        cerrarSesion,
      }}
    >
      {props.children}
    </userContext.Provider>
  );
};

export default userContext;
