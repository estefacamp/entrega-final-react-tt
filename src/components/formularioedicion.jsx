import { useEffect, useState } from "react";
import { useParams, Navigate, useNavigate } from "react-router-dom";
import { useProductosContext } from "../context/productoscontext";
import { useAuthContext } from "../context/authcontext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { dispararSweetBasico } from "../assets/sweetalert";

function FormularioEdicion() {
  const { admin } = useAuthContext();
  const { obtenerProductoFirebase, productoEncontrado, editarProducto } = useProductosContext();
  const { id } = useParams();
  const [producto, setProducto] = useState({});
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  if (!admin) {
    return <Navigate to="/login" replace />;
  }

  useEffect(() => {
    obtenerProductoFirebase(id)
      .then(() => {
        setProducto(productoEncontrado || {});
        setCargando(false);
      })
      .catch((error) => {
        if (error === "Producto no encontrado") {
          setError("Producto no encontrado");
        } else {
          setError("Hubo un error al obtener el producto.");
        }
        setCargando(false);
      });
  }, [id]);

  useEffect(() => {
    if (productoEncontrado) {
      setProducto(productoEncontrado);
    }
  }, [productoEncontrado]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProducto({ ...producto, [name]: value });
  };

  const validarFormulario = () => {
    if (!producto.name?.trim()) return "El nombre es obligatorio.";
    if (!producto.price || producto.price <= 0) return "El precio debe ser mayor a 0.";
    if (!producto.description?.trim() || producto.description.length < 10)
      return "La descripción debe tener al menos 10 caracteres.";
    if (!producto.imagen?.trim()) return "La url de la imagen no debe estar vacía.";
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validarForm = validarFormulario();
    if (validarForm === true) {
      editarProducto(producto)
        .then(() => {
          toast.success("Producto editado correctamente!");
        })
        .catch((error) => {
          toast.error("Hubo un problema al actualizar el producto. " + error.message);
        });
    } else {
      dispararSweetBasico("Error en la carga de producto", validarForm, "error", "Cerrar");
    }
  };

  if (cargando) return <p className="text-center mt-5">Cargando producto...</p>;
  if (error) return <p className="text-danger text-center mt-3">{error}</p>;

  return (
    <>
      <div className="container mt-5">
        <form onSubmit={handleSubmit} style={{ maxWidth: "400px" }} className="mx-auto">
          <h2 className="mb-4">Editar Producto</h2>
          <div className="mb-3">
            <label className="form-label">Nombre:</label>
            <input
              type="text"
              name="name"
              value={producto.name || ""}
              onChange={handleChange}
              required
              className="form-control form-control-sm"
            />
          </div>
          <div className="mb-3">
            <label className="form-label">URL de la Imagen</label>
            <input
              type="text"
              name="imagen"
              value={producto.imagen || ""}
              onChange={handleChange}
              required
              className="form-control form-control-sm"
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Precio:</label>
            <input
              type="number"
              name="price"
              value={producto.price || ""}
              onChange={handleChange}
              required
              min="0"
              className="form-control form-control-sm"
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Descripción:</label>
            <textarea
              name="description"
              value={producto.description || ""}
              onChange={handleChange}
              required
              className="form-control form-control-sm"
            ></textarea>
          </div>
          <button type="submit" className="btn btn-primary shadow">
            Actualizar Producto
          </button>
        </form>
      </div>
      <ToastContainer />
    </>
  );
}

export default FormularioEdicion;
