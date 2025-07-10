import Card from "./card";
import "../styles/carrito.css";
import { useEffect, useState, useContext } from "react";
import CarritoCard from "./carritocard";
import { Navigate } from "react-router-dom";
import { CarritoContext } from "../context/carritocontext";
import { useAuthContext } from "../context/authcontext";
import { Button } from "react-bootstrap";
import Swal from "sweetalert2";

export default function Carrito() {
    const { user } = useAuthContext();
    const { productosCarrito, vaciarCarrito, borrarProductoCarrito } = useContext(CarritoContext);

    const total = productosCarrito.reduce(
        (subTotal, producto) => subTotal + producto.price * producto.cantidad, 0
    );

    function funcionDisparadora(id) {
        borrarProductoCarrito(id);
    }

    function funcionDisparadora2() {
        vaciarCarrito();
        Swal.fire({
            title: 'Carrito vaciado',
            text: 'El carrito fue vaciado con éxito.',
            icon: 'success',
            confirmButtonText: 'Ok'
        });
    }

    function finalizarCompra() {
        Swal.fire({
            title: '¡Gracias por tu compra! 🎉',
            text: 'Recibimos tu pedido y te enviaremos un email con el seguimiento en las próximas horas.',
            icon: 'success',
            confirmButtonText: 'Genial'
        });
        vaciarCarrito();
    }
    
    

    console.log("Productos: ", productosCarrito);
    console.log("Total: ", total);

    if (!user) {
        return <Navigate to="/login" replace />;
    }

    return (
        <div className="container my-4">
            <h2 className="text-center mb-4">Mi Carrito de Compras 🛒</h2>

            <div className="d-flex flex-wrap justify-content-center">
                {productosCarrito.length > 0 ? (
                    productosCarrito.map((producto) => (
                        <CarritoCard 
                            key={producto.id}
                            producto={producto}
                            funcionDisparadora={funcionDisparadora}
                        />
                    ))
                ) : (
                    <p>Carrito vacío</p>
                )}
            </div>

            {total > 0 && (
                <div 
                    className="mt-4 p-4 mx-auto text-center"
                    style={{
                        maxWidth: "400px",
                        background: "rgba(255,255,255,0.3)",
                        backdropFilter: "blur(10px)",
                        border: "1px solid rgba(255,255,255,0.2)",
                        boxShadow: "0 4px 20px rgba(40, 167, 69, 0.5)",
                        borderRadius: "10px"
                    }}
                >
                    <h4 className="mb-3">Total a pagar: <strong>${total.toFixed(2)}</strong></h4>
                    <div className="d-flex justify-content-center gap-3">
                        <Button variant="success" onClick={finalizarCompra}>
                            Finalizar compra
                        </Button>
                        <Button variant="danger" onClick={funcionDisparadora2}>
                            Vaciar carrito
                        </Button>
                    </div>
                </div>
            )}
        </div>
    );
}

