import React, { useEffect } from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useReviews } from "../../../hook/useReviews";

export const FomrNuevaReview = () => {
  // --------------------------------------------------------------------------------
  const { publicarReview, peliculas, listadoPeliculas } = useReviews();

  // --------------------------------------------------------------------------------
  const formik = useFormik({
    initialValues: {
      peliculaId: "",
      descripcion: "",
      estrellas: 3,
    },
    validationSchema: Yup.object({
      peliculaId: Yup.number().required(
        "La review creada tiene que ser asignada a alguna película"
      ),
      descripcion: Yup.string()
        .required("La descripción es obligatoria.")
        .min(
          10,
          "La descripción de la review debe tener entre 10 y 144 caracteres"
        )
        .max(
          144,
          "La descripción de la review debe tener entre 10 y 144 caracteres"
        ),
      estrellas: Yup.number()
        .required("El número de estrellas de la película es obligatorio.")
        .min(1, "El número de estrellas va desde 1 hasta 5")
        .max(5, "El número de estrellas va desde 1 hasta 5"),
    }),
    onSubmit: async (FormData) => {
      if (await publicarReview(FormData)) {
        formik.handleReset();
      }
    },
  });

  // --------------------------------------------------------------------------------
  useEffect(() => {
    listadoPeliculas();
  }, []);

  // --------------------------------------------------------------------------------
  return (
    <>
      {peliculas === null ? (
        <div className="pt-5 text-center">
          <h3>Cargando...</h3>
        </div>
      ) : (
        <form onSubmit={formik.handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Pelicula:</label>
            <select
              className="form-select"
              aria-label="Default select example"
              size={peliculas.length}
              name="peliculaId"
              onChange={formik.handleChange}
              value={formik.values.peliculaId}
            >
              {peliculas.map((pelicula) => {
                return (
                  <option value={pelicula.id} key={pelicula.id}>
                    {pelicula.titulo}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="mb-3">
            <label className="form-label">Descripción:</label>
            <input
              type="text"
              className="form-control"
              name="descripcion"
              onChange={formik.handleChange}
              value={formik.values.descripcion}
            />
            {formik.errors.descripcion && (
              <small className="text-danger">{formik.errors.descripcion}</small>
            )}
          </div>
          <div className="mb-3">
            <label lass="form-label">
              Número de Estrellas: {formik.values.estrellas}
            </label>
            <input
              type="range"
              className="form-range"
              name="estrellas"
              min="1"
              max="5"
              step="1"
              onChange={formik.handleChange}
              value={formik.values.estrellas}
            ></input>
          </div>
          <button
            type="submit"
            className="btn btn-primary"
            disabled={
              formik.errors.descripcion ||
              formik.errors.estrellas ||
              formik.errors.peliculaId
            }
          >
            Publicar
          </button>
        </form>
      )}
    </>
  );
};
