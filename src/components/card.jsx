import React from "react";
import { Card as BootstrapCard, Button, Badge } from "react-bootstrap";
import { Link } from "react-router-dom";
import "../styles/productos.css";

function Card({ producto }) {
  return (
    <div className="d-flex justify-content-center mb-4 position-relative">
      {/* Badge arriba a la derecha */}
      <Badge 
        bg="danger" 
        className="position-absolute top-0 end-0 m-2"
        style={{ fontSize: "0.8rem" }}
      >
        Nuevo
      </Badge>

      <BootstrapCard 
        style={{
          width: "15rem",
          background: "rgba(255,255,255,0.3)",
          backdropFilter: "blur(10px)",
          border: "1px solid rgba(255,255,255,0.2)",
          boxShadow: "0 4px 20px rgba(40, 167, 69, 0.5)",
          transition: "transform 0.3s"
        }}
        className="shadow text-center"
        onMouseEnter={e => e.currentTarget.style.transform = "scale(1.05)"}
        onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}
      >
        <Link to={"/productos/" + producto.id}>
          <BootstrapCard.Img 
            variant="top" 
            src={producto.imagen} 
            alt={producto.name} 
            style={{ 
              height: "140px",
              objectFit: "contain",
              background: "#f8f9fa",
              padding: "5px"
            }}
          />
        </Link>

        <BootstrapCard.Body>
          <BootstrapCard.Title 
            style={{ 
              background: "linear-gradient(90deg, #1e7e34, #3cb371)",
              color: "white",
              borderRadius: "5px",
              padding: "6px"
            }}
          >
            {producto.name}
          </BootstrapCard.Title>

          <BootstrapCard.Text className="my-3">
            <strong>${producto.price}</strong>
          </BootstrapCard.Text>

          <Link to={"/productos/" + producto.id}>
            <Button variant="primary" size="sm">
              Ver detalles
            </Button>
          </Link>
        </BootstrapCard.Body>
      </BootstrapCard>
    </div>
  );
}

export default Card;
