import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../context/authcontext';
import { crearUsuario, loginEmailPass } from "../auth/firebase";
import { dispararSweetBasico } from "../assets/sweetalert";
import { Button, Form, Container } from 'react-bootstrap';

function LoginBoostrap() {
  const [usuario, setUsuario] = useState('');
  const [password, setPassword] = useState('');
  const [showLogin, setShowLogin] = useState(true);

  const { login, user, logout, admin, logearGmail } = useAuthContext();
  const navigate = useNavigate();

  function toggleView(e) {
    e.preventDefault();
    setShowLogin(!showLogin);
  }

  function handleLogout(e) {
    e.preventDefault();
    logout();
    navigate("/");
  }

  function iniciarSesion(e) {
    e.preventDefault();

    if (usuario === 'admin' && password === '1234') {
      login('admin');
      dispararSweetBasico("Logeado como admin (simulado)", "", "success", "Confirmar");
      navigate("/");
      return;
    }

    loginEmailPass(usuario, password)
      .then(() => {
        login(usuario);
        dispararSweetBasico("Logeo exitoso", "", "success", "Confirmar");
        navigate("/");
      })
      .catch((error) => {
        console.log("ERROR LOGIN", error);
        if (error.code === "auth/invalid-credential") {
          dispararSweetBasico("Credenciales incorrectas", "", "error", "Cerrar");
        } else {
          dispararSweetBasico("Error", error.message, "error", "Cerrar");
        }
      });
  }

  function iniciarSesionGmail() {
    logearGmail()
      .then(() => {
        dispararSweetBasico("Logeo con Google exitoso", "", "success", "Confirmar");
        navigate("/");
      })
      .catch((error) => {
        console.log("ERROR GMAIL", error);
        dispararSweetBasico("Error al iniciar sesión con Google", "", "error", "Cerrar");
      });
  }

  function registrarNuevoUsuario(e) {
    e.preventDefault();
    crearUsuario(usuario, password)
      .then(() => {
        login(usuario);
        dispararSweetBasico("Registro exitoso", "", "success", "Confirmar");
        navigate("/");
      })
      .catch((error) => {
        console.log("ERROR REGISTRO", error);
        if (error.code === "auth/invalid-credential") {
          dispararSweetBasico("Credenciales incorrectas", "", "error", "Cerrar");
        } else if (error.code === "auth/weak-password") {
          dispararSweetBasico("Contraseña débil", "Debe tener al menos 6 caracteres", "error", "Cerrar");
        } else {
          dispararSweetBasico("Error", error.message, "error", "Cerrar");
        }
      });
  }

  if (user || admin) {
    return (
      <Container className="d-flex justify-content-center mt-5">
        <Button variant="dark" size="sm" onClick={handleLogout}>Cerrar sesión</Button>
      </Container>
    );
  }

  return (
    <Container className="d-flex flex-column justify-content-center align-items-center mt-3" style={{ minHeight: "80vh", overflow: "hidden" }}>
      {showLogin ? (
        <Form onSubmit={iniciarSesion} className="p-4 border rounded shadow w-75">
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
            <Button variant="danger" size="sm" onClick={iniciarSesionGmail}>Iniciar sesión con Gmail</Button>
            <Button variant="secondary" size="sm" onClick={toggleView}>Registrarse</Button>
          </div>
        </Form>
      ) : (
        <Form onSubmit={registrarNuevoUsuario} className="p-3 border rounded shadow w-25">
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
            <Button variant="secondary" size="sm" onClick={toggleView}>Iniciar sesión</Button>
          </div>
        </Form>
      )}
    </Container>
  );
}

export default LoginBoostrap;
