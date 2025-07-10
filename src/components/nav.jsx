import React from 'react';
import { Link } from 'react-router-dom';
import { CarritoContext } from "../context/carritocontext";
import { useAuthContext } from "../context/authcontext";
import { useBusquedaContext } from "../context/busquedacontext";
import { useContext } from "react";
import { FaShoppingCart } from "react-icons/fa";
import { Navbar, Nav, Container, Form, FormControl, Badge, NavDropdown } from 'react-bootstrap';

function NavBar() {
    const { productosCarrito } = useContext(CarritoContext);
    const { user, admin } = useAuthContext();
    const { busqueda, setBusqueda } = useBusquedaContext();

    return (
        <Navbar bg="dark" variant="dark" expand={false}>
            <Container>
                <Navbar.Brand as={Link} to="/">Mi Tienda</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link as={Link} to="/">Inicio</Nav.Link>
                        <Nav.Link as={Link} to="/productos">Productos</Nav.Link>
                        <Nav.Link as={Link} to="/nosotros">Nosotros</Nav.Link>
                        <Nav.Link as={Link} to="/contacto">Contacto</Nav.Link>
                        {admin && (
                            <NavDropdown title="Admin" id="admin-dropdown">
                                <NavDropdown.Item as={Link} to="/admin">Panel Admin</NavDropdown.Item>
                                <NavDropdown.Item as={Link} to="/admin/agregarProductos">Agregar Productos</NavDropdown.Item>
                            </NavDropdown>
                        )}
                    </Nav>

                    <Nav className="align-items-center">
                        <Nav.Link as={Link} to="/carrito">
                            <FaShoppingCart />
                            {productosCarrito.length > 0 && (
                                <Badge bg="light" text="dark" className="ms-1">
                                    {productosCarrito.length}
                                </Badge>
                            )}
                        </Nav.Link>
                        <Nav.Link as={Link} to="/login">Login</Nav.Link>
                    </Nav>

                    <Form className="d-flex ms-3">
                        <FormControl
                            type="search"
                            placeholder="Buscar..."
                            className="me-2"
                            value={busqueda}
                            onChange={(e) => setBusqueda(e.target.value)}
                            size="sm"
                        />
                    </Form>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default NavBar;
