/*
 * Copyright (c) 2025 Your Company Name
 * All rights reserved.
 */
import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup
} from "firebase/auth";

import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  doc,
  getDoc,
  updateDoc,
  query,
  orderBy,
  limit,
  startAfter
} from "firebase/firestore";

// ⚙️ Configuración de Firebase
const firebaseConfig = {
  apiKey: "AIzaSyBefwQXfYl6dcv-q6lWu5F_OhJgkLXRKTY",
  authDomain: "prueba--auth.firebaseapp.com",
  projectId: "prueba--auth",
  storageBucket: "prueba--auth.appspot.com",
  messagingSenderId: "977583228123",
  appId: "1:977583228123:web:d9505fb6ef78bb904978fe",
  measurementId: "G-1WCQ2S02MH"
};

// 🔥 Inicialización
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const provider = new GoogleAuthProvider();

// ==========================
// 🚀 FUNCIONES DE AUTENTICACIÓN
// ==========================
export function crearUsuario(email, password) {
  return createUserWithEmailAndPassword(auth, email, password);
}

export function loginEmailPass(email, password) {
  return signInWithEmailAndPassword(auth, email, password);
}

export function logearG() {
  return signInWithPopup(auth, provider)
    .then((result) => result.user)
    .catch((error) => {
      console.error("Error al iniciar sesión con Google", error);
      throw error;
    });
}

// ==========================
// 🚀 FUNCIONES DE FIRESTORE
// ==========================
export function crearProducto(producto) {
  return addDoc(collection(db, "productos"), producto);
}

export function obtenerProductos() {
  return getDocs(collection(db, "productos"))
    .then((snapshot) =>
      snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
    );
}

export function obtenerProductoEnFirebase(id) {
  return getDoc(doc(db, "productos", id)).then((docSnap) => {
    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() };
    } else {
      throw new Error("Producto no encontrado");
    }
  });
}

export function editarProductoEnFirebase(producto) {
  const ref = doc(db, "productos", producto.id);
  return updateDoc(ref, {
    name: producto.name,
    imagen: producto.imagen,
    price: producto.price,
    description: producto.description
  });
}

// ==========================
// 🚀 PAGINACIÓN FIRESTORE
// ==========================
export async function obtenerProductosPaginados(ultimoDoc = null, cantidad = 5) {
  let q;
  if (ultimoDoc) {
    q = query(
      collection(db, "productos"),
      orderBy("name"),
      startAfter(ultimoDoc),
      limit(cantidad)
    );
  } else {
    q = query(
      collection(db, "productos"),
      orderBy("name"),
      limit(cantidad)
    );
  }

  const snapshot = await getDocs(q);
  const productos = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  return { productos, ultimoDoc: snapshot.docs[snapshot.docs.length - 1] };
}

// ==========================
// 🚀 EXPORTAR AUTH Y DB
// ==========================
export { auth, db, provider };
