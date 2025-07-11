import React, { useState } from "react";
import { useBusquedaContext } from "../context/busquedacontext";

function ProductosList({ productos }) {
  const { busqueda } = useBusquedaContext();
  const [paginaActual, setPaginaActual] = useState(1);
  const productosPorPagina = 5;

  // 🔍 Filtrar productos según búsqueda
  const productosFiltrados = productos.filter(producto =>
    producto.name.toLowerCase().includes(busqueda.toLowerCase())
  );

  // Calcular índices para paginación
  const indexUltimoProducto = paginaActual * productosPorPagina;
  const indexPrimerProducto = indexUltimoProducto - productosPorPagina;

  // Slice para productos actuales
  const productosActuales = productosFiltrados.slice(indexPrimerProducto, indexUltimoProducto);

  // Total de páginas
  const totalPaginas = Math.ceil(productosFiltrados.length / productosPorPagina);

  return (
    <div>
      <h2>Lista de productos</h2>
      
      <ul>
        {productosActuales.map((producto) => (
          <li key={producto.id}>
            <h3>{producto.name}</h3>
            <p>{producto.description}</p>
            <img src={producto.imagen} alt={producto.name} width="120" />
            <p>Precio: ${producto.price}</p>
          </li>
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
              padding: "5px 10px",
              backgroundColor: paginaActual === i + 1 ? "#007bff" : "#f0f0f0",
              color: paginaActual === i + 1 ? "white" : "black",
              border: "1px solid #ccc",
              borderRadius: "4px",
              cursor: "pointer"
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

