import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { productosIniciales } from './data/productos';
import { Navbar } from './components/Navbar';
import { Piepagina } from './components/Piepagina'; // <-- Importación añadida
import { Catalogo } from './pages/Catalogo';
import { Categorias } from './pages/Categorias';
import { DetalleProducto } from './pages/DetalleProducto';
import { Carrito } from './pages/Carrito';
import { Checkout } from './pages/Checkout';
import { PagoExitoso } from './pages/PagoExitoso';
import { Ofertas } from './pages/Ofertas';
import { Admin } from './pages/Admin';

export default function App() {
  const [productos, setProductos] = useState(() => {
    const guardados = localStorage.getItem('aroma_productos_v4');
    return guardados ? JSON.parse(guardados) : productosIniciales;
  });

  const [carrito, setCarrito] = useState(() => {
    const guardados = localStorage.getItem('aroma_carrito');
    return guardados ? JSON.parse(guardados) : [];
  });

  useEffect(() => {
    localStorage.setItem('aroma_productos_v4', JSON.stringify(productos));
  }, [productos]);

  useEffect(() => {
    localStorage.setItem('aroma_carrito', JSON.stringify(carrito));
  }, [carrito]);

  const agregarAlCarrito = (producto) => {
    setCarrito((prevCarrito) => {
      const existente = prevCarrito.find((item) => item.id === producto.id);
      if (existente) {
        return prevCarrito.map((item) =>
          item.id === producto.id ? { ...item, cantidad: item.cantidad + 1 } : item
        );
      }
      return [...prevCarrito, { ...producto, cantidad: 1 }];
    });
  };

  const eliminarDelCarrito = (id) => {
    setCarrito((prevCarrito) => prevCarrito.filter((item) => item.id !== id));
  };

  const vaciarCarrito = () => setCarrito([]);

  const agregarProducto = (nuevoProducto) => {
    setProductos((prev) => [...prev, nuevoProducto]);
  };

  const eliminarProducto = (id) => {
    setProductos((prev) => prev.filter((p) => p.id !== id));
  };

  const cantidadCarrito = carrito.reduce((acc, item) => acc + item.cantidad, 0);

  return (
    <Router>
      <Navbar cantidadCarrito={cantidadCarrito} />
      <Routes>
        <Route path="/" element={<Catalogo productos={productos} agregarAlCarrito={agregarAlCarrito} />} />
        <Route path="/categorias" element={<Categorias productos={productos} agregarAlCarrito={agregarAlCarrito} />} />
        <Route path="/producto/:id" element={<DetalleProducto productos={productos} agregarAlCarrito={agregarAlCarrito} />} />
        <Route path="/ofertas" element={<Ofertas productos={productos} agregarAlCarrito={agregarAlCarrito} />} />
        <Route path="/carrito" element={<Carrito carrito={carrito} vaciarCarrito={vaciarCarrito} eliminarDelCarrito={eliminarDelCarrito} />} />
        <Route path="/checkout" element={<Checkout carrito={carrito} vaciarCarrito={vaciarCarrito} />} />
        <Route path="/pago-exitoso" element={<PagoExitoso />} />
        <Route path="/admin" element={<Admin productos={productos} agregarProducto={agregarProducto} eliminarProducto={eliminarProducto} />} />
        {/* Redirección ante rutas no encontradas */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <Piepagina /> 
    </Router>
  );
}
