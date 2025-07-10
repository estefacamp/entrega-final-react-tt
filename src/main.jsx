import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './styles/App.css'
import { CarritoProvider } from './context/carritocontext.jsx'
import { AuthProvider } from './context/authcontext.jsx'
import { ProductosProvider } from './context/productoscontext.jsx'
import { BusquedaProvider } from './context/busquedacontext.jsx' // 👈 AGREGADO
import 'bootstrap/dist/css/bootstrap.min.css';


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BusquedaProvider>
      <ProductosProvider>
        <AuthProvider>
          <CarritoProvider>
            <App />
          </CarritoProvider>
        </AuthProvider>
      </ProductosProvider>
    </BusquedaProvider>
  </StrictMode>
)
