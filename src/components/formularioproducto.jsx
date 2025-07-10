import { useState } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import { useProductosContext } from "../context/productoscontext";
import { useAuthContext } from "../context/authcontext";
import { toast } from "react-toastify";
import { Form, Button, Container } from "react-bootstrap";

function FormularioProducto() {
  const { agregarProducto, obtenerProductos } = useProductosContext(); // 👈 AGREGADO
  const { admin } = useAuthContext();
  const navigate = useNavigate();
  
  const [producto, setProducto] = useState({
    name: '',
    price: '',
    description: '',
    imagen: ''
  });

  const validarFormulario = () => {
    if (!producto.name.trim()) {
      return "El nombre es obligatorio.";
    }
    if (!producto.price || producto.price <= 0) {
      return "El precio debe ser mayor a 0.";
    }
    if (!producto.description.trim() || producto.description.length < 10) {
      return "La descripción debe tener al menos 10 caracteres.";
    }
    if (!producto.imagen.trim()) {
      return "La URL de la imagen no debe estar vacía.";
    }
    return true;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProducto({ ...producto, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validarForm = validarFormulario();
    if (validarForm === true) {
      agregarProducto(producto)
        .then(() => {
          toast.success("Producto agregado con éxito!");
          setProducto({ name: '', price: '', description: '', imagen: '' });
          obtenerProductos(); // 👈 RECARGA
          navigate('/productos');
        })
        .catch((error) => {
          console.error("❌ Error agregando producto:", error);
          toast.error("Hubo un problema al agregar el producto.");
        });
    } else {
      toast.error(validarForm);
    }
  };

  if (!admin) {
    return <Navigate to="/login" replace />;
  }

  return (
    <Container className="d-flex justify-content-center align-items-center mt-4">
      <Form onSubmit={handleSubmit} className="p-4 border rounded shadow w-50">
        <h3 className="text-center mb-4">Agregar Producto</h3>
        <Form.Group className="mb-3">
          <Form.Label>Nombre</Form.Label>
          <Form.Control
            type="text"
            name="name"
            value={producto.name}
            onChange={handleChange}
            placeholder="Ingrese el nombre"
            required
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>URL de la Imagen</Form.Label>
          <Form.Control
            type="text"
            name="imagen"
            value={producto.imagen}
            onChange={handleChange}
            placeholder="https://..."
            required
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Precio</Form.Label>
          <Form.Control
            type="number"
            name="price"
            value={producto.price}
            onChange={handleChange}
            placeholder="0"
            min="0"
            required
          />
        </Form.Group>
        <Form.Group className="mb-4">
          <Form.Label>Descripción</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            name="description"
            value={producto.description}
            onChange={handleChange}
            placeholder="Descripción del producto"
            required
          />
        </Form.Group>
        <div className="d-grid gap-2">
          <Button variant="dark" type="submit">
            Agregar Producto
          </Button>
        </div>
      </Form>
    </Container>
  );
}

export default FormularioProducto;
