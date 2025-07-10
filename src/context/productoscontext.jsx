import React, { createContext, useState, useContext } from 'react';
import {
  collection,
  getDocs,
  getDoc,
  doc,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  orderBy,
  startAfter,
  limit
} from 'firebase/firestore';
import { db } from '../auth/firebase';

const ProductosContext = createContext();

export function ProductosProvider({ children }) {
  const [productos, setProductos] = useState([]);
  const [productoEncontrado, setProductoEncontrado] = useState(null);
  const [ultimoDoc, setUltimoDoc] = useState(null);

  // Obtener productos paginados
  async function obtenerProductosPaginados(cantidad = 5) {
    try {
      let q;
      if (ultimoDoc) {
        q = query(
          collection(db, 'productos'),
          orderBy('name'),
          startAfter(ultimoDoc),
          limit(cantidad)
        );
      } else {
        q = query(
          collection(db, 'productos'),
          orderBy('name'),
          limit(cantidad)
        );
      }

      const snapshot = await getDocs(q);
      const lista = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

      if (!ultimoDoc) {
        setProductos(lista); // Primera carga: reemplaza
      } else {
        setProductos(prev => [...prev, ...lista]); // Siguientes: acumula
      }

      setUltimoDoc(snapshot.docs[snapshot.docs.length - 1] || null);

      return { productos: lista, ultimoDoc: snapshot.docs[snapshot.docs.length - 1] || null };
    } catch (error) {
      console.error("Error al obtener productos paginados:", error);
      throw error;
    }
  }

  // Agregar producto y ponerlo en el contexto local directo
  async function agregarProducto(producto) {
    try {
      const productosRef = collection(db, 'productos');
      const docRef = await addDoc(productosRef, producto);
      console.log("Producto agregado con ID:", docRef.id);

      // Lo agregamos directo al principio del array
      setProductos(prev => [{ id: docRef.id, ...producto }, ...prev]);

      return { id: docRef.id, ...producto };
    } catch (error) {
      console.error("Error al agregar producto:", error);
      throw error;
    }
  }

  // Obtener un producto por ID
  async function obtenerProductoFirebase(id) {
    try {
      const docRef = doc(db, 'productos', id);
      const snapshot = await getDoc(docRef);
      if (snapshot.exists()) {
        const data = { id: snapshot.id, ...snapshot.data() };
        setProductoEncontrado(data);
        return data;
      } else {
        throw new Error("Producto no encontrado");
      }
    } catch (error) {
      console.error("Error al obtener producto:", error);
      throw error;
    }
  }

  // Editar producto
  async function editarProducto(producto) {
    try {
      const docRef = doc(db, 'productos', producto.id);
      await updateDoc(docRef, {
        name: producto.name,
        price: producto.price,
        description: producto.description,
        imagen: producto.imagen
      });
      console.log("Producto actualizado con éxito");
      return producto;
    } catch (error) {
      console.error("Error al actualizar el producto:", error);
      throw error;
    }
  }

  // Eliminar producto
  async function eliminarProducto(id) {
    const confirmar = window.confirm('¿Estás seguro de eliminar?');
    if (!confirmar) return;

    try {
      const docRef = doc(db, 'productos', id);
      await deleteDoc(docRef);
      alert('Producto eliminado correctamente.');
    } catch (error) {
      console.error("Error al eliminar el producto:", error);
      alert("Hubo un problema al eliminar el producto.");
      throw error;
    }
  }

  return (
    <ProductosContext.Provider
      value={{
        productos,
        obtenerProductosPaginados,
        agregarProducto,
        obtenerProductoFirebase,
        productoEncontrado,
        editarProducto,
        eliminarProducto,
        ultimoDoc
      }}
    >
      {children}
    </ProductosContext.Provider>
  );
}

export const useProductosContext = () => useContext(ProductosContext);
