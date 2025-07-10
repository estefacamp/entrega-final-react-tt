import { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useProductosContext } from "../context/productoscontext";
import { useAuthContext } from "../context/authcontext";
import { CarritoContext } from "../context/carritocontext";
import Producto from "./botoncompra";
import { dispararSweetBasico } from "../assets/sweetalert";
import { Button, Badge } from "react-bootstrap";

function ProductoDetalle() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { admin, user } = useAuthContext();
  const { agregarAlCarrito } = useContext(CarritoContext);
  const { productoEncontrado, obtenerProductoFirebase, eliminarProducto } = useProductosContext();

  const [cantidad, setCantidad] = useState(1);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  console.log("Render ProductoDetalle - user:", user, "admin:", admin);

  useEffect(() => {
    obtenerProductoFirebase(id)
      .then(() => setCargando(false))
      .catch(() => {
        setError("No se pudo cargar el producto.");
        setCargando(false);
      });
  }, [id]);

  function funcionCarrito() {
    if (cantidad < 1) return;
    dispararSweetBasico("Producto Agregado", "El producto fue agregado al carrito con éxito", "success", "Cerrar");
    agregarAlCarrito({ ...productoEncontrado, cantidad });
  }

  function dispararEliminar() {
    eliminarProducto(id)
      .then(() => navigate("/productos"))
      .catch((error) => {
        dispararSweetBasico("Hubo un problema al eliminar el producto", error, "error", "Cerrar");
      });
  }

  if (cargando) return <p>Cargando producto...</p>;
  if (error) return <p>{error}</p>;
  if (!productoEncontrado) return null;

  return (
    <div className="d-flex justify-content-center mb-4 position-relative">
      {/* Badge Nuevo */}
      <Badge 
        bg="danger" 
        className="position-absolute top-0 end-0 m-2"
        style={{ fontSize: "0.8rem" }}
      >
        Nuevo
      </Badge>

      <div
        className="shadow text-center"
        style={{
          width: "20rem",
          background: "rgba(255,255,255,0.3)",
          backdropFilter: "blur(10px)",
          border: "1px solid rgba(255,255,255,0.2)",
          boxShadow: "0 4px 20px rgba(40, 167, 69, 0.5)",
          transition: "transform 0.3s"
        }}
        onMouseEnter={e => e.currentTarget.style.transform = "scale(1.03)"}
        onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}
      >
        {/* Banner con nombre */}
        <div 
          className="text-white text-center fw-bold py-2"
          style={{ 
            background: "linear-gradient(90deg, #1e7e34, #3cb371)",
            borderRadius: "5px 5px 0 0"
          }}
        >
          {productoEncontrado.name}
        </div>

        {/* Imagen */}
        <img 
          src={productoEncontrado.imagen}
          alt={productoEncontrado.name}
          style={{
            height: "160px",
            objectFit: "contain",
            background: "#f8f9fa",
            padding: "8px",
            width: "100%"
          }}
        />

        {/* Descripción */}
        <div className="p-3">
          <p>{productoEncontrado.description}</p>
          <p><strong>${productoEncontrado.price}</strong></p>

          {/* Contador */}
          <div className="d-flex justify-content-center align-items-center mb-3">
            <Button variant="secondary" size="sm" onClick={() => setCantidad(Math.max(1, cantidad - 1))}>-</Button>
            <span className="mx-3">{cantidad}</span>
            <Button variant="secondary" size="sm" onClick={() => setCantidad(cantidad + 1)}>+</Button>
          </div>

          {/* Botones admin o usuario */}
          {admin && (
            <>
              <Button 
                variant="success" 
                size="sm" 
                className="me-2"
                onClick={() => navigate(`/admin/editarProducto/${id}`)}
              >
                Editar producto
              </Button>
              <Button 
                variant="danger" 
                size="sm"
                onClick={dispararEliminar}
              >
                Eliminar producto
              </Button>
            </>
          )}

          {!admin && user && (
            <div className="mt-3">
              <Producto text="Agregar al carrito" onClick={funcionCarrito} />
            </div>
          )}

          {!user && (
            <p style={{ marginTop: "15px", color: "#555" }}>
              Iniciá sesión para poder comprar este producto.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProductoDetalle;
