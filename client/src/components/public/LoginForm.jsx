import React from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useUser } from "../../hook/useUser";

export const LoginForm = () => {
  // --------------------------------------------------------------------------------
  const { loginUsuario } = useUser();

  // --------------------------------------------------------------------------------
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .required("El email es obligatorio.")
        .email("Email invalido."),
      password: Yup.string().required("La contraseña es obligatoria."),
    }),
    onSubmit: async (FormData) => {
      if (await loginUsuario(FormData)) {
        formik.handleReset();
        window.location.reload(false);
      }
    },
  });

  // --------------------------------------------------------------------------------
  return (
    <form onSubmit={formik.handleSubmit}>
      <div className="mb-3">
        <label className="form-label">Email:</label>
        <input
          type="email"
          className="form-control"
          name="email"
          onChange={formik.handleChange}
          value={formik.values.email}
        />
        {formik.errors.email && (
          <small className="text-danger">{formik.errors.email}</small>
        )}
      </div>
      <div className="mb-3">
        <label lass="form-label">Contraseña:</label>
        <input
          type="password"
          className="form-control"
          name="password"
          onChange={formik.handleChange}
          value={formik.values.password}
        />
        {formik.errors.password && (
          <small className="text-danger">{formik.errors.password}</small>
        )}
      </div>
      <button
        type="submit"
        className="btn btn-primary"
        disabled={formik.errors.password || formik.errors.email}
      >
        Iniciar Sesión
      </button>
    </form>
  );
};
