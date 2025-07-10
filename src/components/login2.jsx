import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../context/authcontext';
import { crearUsuario, loginEmailPass } from "../auth/firebase";
import { dispararSweetBasico } from "../assets/sweetalert";
import { Button, Form, Container } from 'react-bootstrap';

function Login2() {
  const [usuario, setUsuario] = useState('');
  const [password, setPassword] = useState('');
  const [show, setShow] = useState(true);
  const { login, user, logout, admin, logearGmail } = useAuthContext();
  const navigate = useNavigate();

  function handleShow(e) {
    e.preventDefault();
    setShow(!show);
  }

  function registrarUsuario(e) {
    e.preventDefault();
    crearUsuario(usuario, password)
      .then(() => {
        login(usuario);
        dispararSweetBasico("Registro exitoso", "", "success", "Confirmar");
      })
      .catch((error) => {
        if (error.code === "auth/invalid-credential") {
          dispararSweetBasico("Credenciales incorrectas", "", "error", "Cerrar");
        }
        if (error.code === "auth/weak-password") {
          dispararSweetBasico("Contraseña débil", "Debe tener al menos 6 caracteres", "error", "Cerrar");
        }
      });
  }

  function iniciarSesionEmailPass(e) {
    e.preventDefault();
    loginEmailPass(usuario, password)
      .then(() => {
        login(usuario);
        dispararSweetBasico("Logeo exitoso", "", "success", "Confirmar");
      })
      .catch((error) => {
        if (error.code === "auth/invalid-credential") {
          dispararSweetBasico("Credenciales incorrectas", "", "error", "Cerrar");
        }
      });
  }

  function handleLogout(e) {
    e.preventDefault();
    logout();
    navigate("/");
  }

  if (user || admin) {
    return (
      <Container className="d-flex justify-content-center align-items-center mt-5" style={{ minHeight: "80vh", overflow: "hidden" }}>
        <Button variant="dark" size="sm" onClick={handleLogout}>Cerrar sesión</Button>
      </Container>
    );
  }

  if (!user && show) {
    return (
      <Container className="d-flex flex-column justify-content-center align-items-center mt-3" style={{ minHeight: "80vh", overflow: "hidden" }}>
        <Form onSubmit={iniciarSesionEmailPass} className="p-3 border rounded shadow w-25">
          <h4 className="text-center mb-3">Iniciar sesión</h4>
          <Form.Group className="mb-2">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              value={usuario}
              onChange={(e) => setUsuario(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Contraseña</Form.Label>
            <Form.Control
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </Form.Group>
          <div className="d-grid gap-2">
            <Button variant="dark" size="sm" type="submit">Ingresar</Button>
            <Button variant="secondary" size="sm" onClick={handleShow}>Registrarse</Button>
            <Button variant="danger" size="sm" onClick={logearGmail}>Iniciar sesión con Gmail</Button>
          </div>
        </Form>
      </Container>
    );
  }

  return (
    <Container className="d-flex flex-column justify-content-center align-items-center mt-3" style={{ minHeight: "80vh", overflow: "hidden" }}>
      <Form onSubmit={registrarUsuario} className="p-3 border rounded shadow w-25">
        <h4 className="text-center mb-3">Registrarse</h4>
        <Form.Group className="mb-2">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            value={usuario}
            onChange={(e) => setUsuario(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Contraseña</Form.Label>
          <Form.Control
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </Form.Group>
        <div className="d-grid gap-2">
          <Button variant="dark" size="sm" type="submit">Registrarse</Button>
          <Button variant="secondary" size="sm" onClick={handleShow}>Iniciar sesión</Button>
        </div>
      </Form>
    </Container>
  );
}

export default Login2;

