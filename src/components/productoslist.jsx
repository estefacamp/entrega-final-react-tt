import { useState } from "react";

function ProductosList({ productos }) {
  const [paginaActual, setPaginaActual] = useState(1);
  const productosPorPagina = 5;

  // Calcular el índice de corte
  const indexUltimoProducto = paginaActual * productosPorPagina;
  const indexPrimerProducto = indexUltimoProducto - productosPorPagina;

  // Slice de productos para mostrar solo los de la página actual
  const productosActuales = productos.slice(indexPrimerProducto, indexUltimoProducto);

  // Calcular total de páginas
  const totalPaginas = Math.ceil(productos.length / productosPorPagina);

  return (
    <div>
      <h2>Lista de productos</h2>
      <ul>
        {productosActuales.map((producto) => (
          <li key={producto.id}>{producto.name}</li>
        ))}
      </ul>

      {/* Botones de paginación */}
      <div style={{ marginTop: "20px" }}>
        {Array.from({ length: totalPaginas }, (_, i) => (
          <button
            key={i}
            onClick={() => setPaginaActual(i + 1)}
            style={{
              margin: "0 5px",
              fontWeight: paginaActual === i + 1 ? "bold" : "normal"
            }}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
}

export default ProductosList;
