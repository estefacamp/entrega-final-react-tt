import { useEffect, useState } from "react";
import "../styles/productos.css";
import Card from "./card";
import { useProductosContext } from '../context/productoscontext';
import { useBusquedaContext } from '../context/busquedacontext';

function ProductosContainerFirebase() {
  const { productos, obtenerProductos } = useProductosContext();
  const { busqueda } = useBusquedaContext();
  const [paginaActual, setPaginaActual] = useState(1);
  const productosPorPagina = 6;

  useEffect(() => {
    obtenerProductos().catch((error) => {
      console.error("Error al cargar productos:", error);
    });
  }, []);

  // Reset página al cambiar búsqueda
  useEffect(() => {
    setPaginaActual(1);
  }, [busqueda]);

  const filtrados = productos.filter((producto) =>
    producto.name.toLowerCase().includes(busqueda.toLowerCase())
  );

  // Lógica de paginación
  const indiceUltimo = paginaActual * productosPorPagina;
  const indicePrimero = indiceUltimo - productosPorPagina;
  const productosActuales = filtrados.slice(indicePrimero, indiceUltimo);

  const totalPaginas = Math.ceil(filtrados.length / productosPorPagina);

  if (productos.length === 0) {
    return <p>Cargando productos...</p>;
  }

  return (
    <div style={{ padding: "20px" }}>
      <div className="productos-conteiner">
        {productosActuales.length > 0 ? (
          productosActuales.map((producto) => (
            <Card key={producto.id} producto={producto} />
          ))
        ) : (
          <p>No se encontraron productos.</p>
        )}
      </div>

      {/* Controles de paginación */}
      {totalPaginas > 1 && (
        <div className="mt-3 d-flex justify-content-center gap-2">
          <button
            onClick={() => setPaginaActual(paginaActual - 1)}
            disabled={paginaActual === 1}
            className="btn btn-sm btn-dark"
          >
            Anterior
          </button>
          <span className="align-self-center text-white">
            Página {paginaActual} de {totalPaginas}
          </span>
          <button
            onClick={() => setPaginaActual(paginaActual + 1)}
            disabled={paginaActual === totalPaginas}
            className="btn btn-sm btn-dark"
          >
            Siguiente
          </button>
        </div>
      )}
    </div>
  );
}

export default ProductosContainerFirebase;
