import { useEffect, useState } from "react"
import "../styles/productos.css"
import { useProductosContext } from "../context/productoscontext"
import { useAuthContext } from "../context/authcontext"
import { Helmet } from "react-helmet";
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import CardProducto from "./card"

function ProductosContainer({}){
    const {productos, obtenerProductosFirebase} = useProductosContext();
    //const [productosComponente, setProductosComponente] = useState([])
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState(null);

    {useEffect(() => {
        obtenerProductosFirebase().then((productos) => {
            setCargando(false);
        }).catch((error) => {
            setError('Hubo un problema al cargar los productos.');
            setCargando(false);
        })
    }, []);}


    if (cargando) {
        return <p>Cargando productos...</p>;
    }else if (error){
        return <p>{error}</p>;
    }else{
        return(
            <div className="productos-conteiner">
                {productos.map((producto) => (
                    <Card
                        producto={producto}
                    />
                ))}
            </div>
        )
    }

    
}

export default ProductosContainer
