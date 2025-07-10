import { useState } from 'react';
import './styles/App.css';
import Home from "./layouts/home";
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Nav from './components/nav';
import ProductosContainer from './components/productoscontainerfirebase';
import Carrito from './components/carrito';
import Contacto from './components/contacto';
import About from './components/about';
import ProductosDetalle from './components/productosdetalle';
import Admin from './components/admin';
import Loginboost from './components/loginboost';
import { AuthProvider } from './context/authcontext';
import { CarritoProvider } from './context/carritocontext';
import { ProductosProvider } from './context/productoscontext';
import FormularioProducto from './components/formularioproducto';
import FormularioEdicion from './components/formularioedicion';
import 'sweetalert2/dist/sweetalert2.min.css';
import Swal from 'sweetalert2';
import { useAuthContext } from './context/authcontext';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 





function App() {
  return (
    <ProductosProvider>
      <AuthProvider>
        <CarritoProvider>
          <Router>
            <div>
              <Nav />
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Loginboost />} />
                <Route path="/productos" element={<ProductosContainer />} />
                <Route path="/carrito" element={<Carrito />} />
                <Route path="/nosotros" element={<About />} />
                <Route path="/contacto" element={<Contacto />} />
                <Route path="/productos/:id" element={<ProductosDetalle />} />
                <Route path="/admin" element={<Admin />} />
                <Route path="/admin/agregarProductos" element={<FormularioProducto />} />
                <Route path="/admin/editarProducto/:id" element={<FormularioEdicion />} />
              </Routes>
              <ToastContainer position="top-right" autoClose={3000} />
            </div>
          </Router>
        </CarritoProvider>
      </AuthProvider>
    </ProductosProvider>
  );
}

export default App;
