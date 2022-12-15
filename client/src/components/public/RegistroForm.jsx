import React from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useUser } from "../../hook/useUser";

export const RegistroForm = () => {
  // --------------------------------------------------------------------------------
  const { crearUsuario } = useUser();

  // --------------------------------------------------------------------------------
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      passwordAux: "",
      confirmacion: false,
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .required("El email es obligatorio.")
        .email("Email invalido.")
        .min(5, "El email ingresado debe tener entre 5 y 90 caracteres.")
        .max(90, "El email ingresado debe tener entre 5 y 90 caracteres."),
      password: Yup.string()
        .required("La contraseña es obligatoria.")
        .matches(
          /^[0-9a-zA-Z]+$/,
          "La contraseña solo puede tener letras en minúscula, mayúscula y números."
        )
        .matches("[0-9]", "La contraseña debe tener al menos un número.")
        .min(8, "La contraseña ingresada debe tener entre 8 y 25 caracteres.")
        .max(25, "La contraseña ingresada debe tener entre 8 y 25 caracteres.")
        .oneOf(
          [Yup.ref("passwordAux")],
          "Las contraseñas ingresadas no coinciden"
        ),
      confirmacion: Yup.string()
        .required(
          "La confirmación de los Terminos de servicio y la Politica de privacidad es obligatoria."
        )
        .matches(
          true,
          "Por favor, acepte los Términos de servicio y la Politica de privacidad."
        ),
    }),
    onSubmit: async (FormData) => {
      if (await crearUsuario(FormData)) {
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
      <div className="mb-3">
        <label lass="form-label">Contraseña Nuevamente:</label>
        <input
          type="password"
          className="form-control"
          name="passwordAux"
          onChange={formik.handleChange}
          value={formik.values.passwordAux}
        />
      </div>
      <div className="mb-3 form-check">
        <input
          type="checkbox"
          className="form-check-input"
          name="confirmacion"
          onChange={formik.handleChange}
          value={formik.values.confirmacion}
        />
        <label className="form-check-label">
          Al registrarte, aceptas los <span>Términos de servicio</span> y la
          <span> Política de privacidad</span>.
        </label>
      </div>
      <button
        type="submit"
        className="btn btn-primary"
        disabled={
          formik.errors.password ||
          formik.errors.email ||
          formik.values.confirmacion === false
        }
      >
        Registrarse
      </button>
    </form>
  );
};
