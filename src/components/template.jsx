import { FaHeart } from "react-icons/fa";

function ProductCardTemplate({ title, image, description, quantity, price, onDelete, badgeText }) {
    return (
        <div className="d-flex justify-content-center mb-4">
            <div 
                className="card position-relative"
                style={{
                    maxWidth: "540px",
                    background: "rgba(255,255,255,0.3)",
                    backdropFilter: "blur(10px)",
                    border: "1px solid rgba(255,255,255,0.2)",
                    boxShadow: "0 4px 20px rgba(40, 167, 69, 0.5)"
                }}
            >
                {/* Badge arriba a la derecha */}
                {badgeText && (
                    <span 
                        className="badge bg-danger position-absolute top-0 end-0 m-2"
                        style={{ fontSize: "0.8rem" }}
                    >
                        {badgeText}
                    </span>
                )}

                {/* Banner con gradient + corazon */}
                <div 
                    className="card-header text-white text-center fw-bold d-flex justify-content-center align-items-center"
                    style={{ 
                        background: "linear-gradient(90deg, #28a745, #85d28a)"
                    }}
                >
                    <span className="me-2">{title}</span>
                    <FaHeart />
                </div>

                <div className="row g-0 align-items-center">
                    <div className="col-md-4 text-center">
                        <img 
                            src={image}
                            className="img-fluid p-2 rounded-start"
                            alt={title}
                            style={{ height: "120px", objectFit: "cover" }}
                        />
                    </div>
                    <div className="col-md-8">
                        <div className="card-body">
                            <p className="card-text small">{description}</p>
                            <p className="mb-1"><strong>Cantidad:</strong> {quantity}</p>
                            <p className="mb-1"><strong>Precio unitario:</strong> ${price}</p>
                            <p className="mb-3"><strong>Total:</strong> ${quantity * price}</p>
                            <button 
                                className="btn btn-danger btn-sm"
                                onClick={onDelete}
                            >
                                Quitar
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProductCardTemplate;

