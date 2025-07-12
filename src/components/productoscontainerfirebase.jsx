import { useEffect, useState } from "react";
import "../styles/productos.css";
import Card from "./card";
import { useProductosContext } from '../context/productoscontext';
import { useBusquedaContext } from '../context/busquedacontext';

function ProductosContainerFirebase() {
  const { productos, obtenerProductosPaginados } = useProductosContext();
  const { busqueda } = useBusquedaContext();

  const [cargando, setCargando] = useState(false);
  const [noHayMas, setNoHayMas] = useState(false);

  useEffect(() => {
    console.log("🔥 useEffect montado, llamando cargarMas...");
    cargarMas();
  }, []);

  const cargarMas = async () => {
    console.log("🔥 Cargando más productos desde Firestore...");
    setCargando(true);
    try {
      const resultado = await obtenerProductosPaginados(5);
      console.log("🔥 Resultado de Firestore:", resultado);
      if (!resultado.ultimoDoc) {
        setNoHayMas(true);
      }
    } catch (error) {
      console.error("🔥 Error al cargar más productos:", error);
    } finally {
      setCargando(false);
    }
  };

  const filtrados = productos.filter((producto) =>
    producto.name.toLowerCase().includes(busqueda.toLowerCase())
  );

  console.log("🔥 Productos filtrados:", filtrados);

  return (
    <>
      <div className="productos-container">
        {filtrados.length > 0 ? (
          filtrados.map((producto) => (
            <Card key={producto.id} producto={producto} />
          ))
        ) : (
          <p>No se encontraron productos.</p>
        )}
      </div>

      <div className="d-flex justify-content-center mt-4 w-100">
        {!noHayMas && !cargando && (
          <button className="btn btn-primary" onClick={cargarMas}>
            Cargar más
          </button>
        )}

        {cargando && (
          <button className="btn btn-primary" disabled>
            <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
            Cargando...
          </button>
        )}
      </div>

      {noHayMas && (
        <div className="text-center mt-3 w-100">
          <p>No hay más productos.</p>
        </div>
      )}
    </>
  );
}

export default ProductosContainerFirebase;
