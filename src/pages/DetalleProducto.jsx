import React from 'react';
import { useParams, Link } from 'react-router-dom';

export function DetalleProducto({ productos, agregarAlCarrito }) {
  const { id } = useParams();
  const producto = productos.find((p) => p.id === Number(id));

  if (!producto) {
    return (
      <div className="container my-5 text-center">
        <h2>Producto no encontrado</h2>
        <Link to="/" className="btn btn-primary mt-3">Volver al catálogo</Link>
      </div>
    );
  }

  return (
    <div className="container my-5">
      <div className="card shadow-lg p-4 border-0 rounded-4">
        <div className="row g-4 align-items-center">
          <div className="col-md-6">
            <img
              src={producto.imagen}
              alt={producto.nombre}
              className="img-fluid rounded-4 shadow-sm w-100"
              style={{ maxHeight: '400px', objectFit: 'cover' }}
            />
          </div>
          <div className="col-md-6">
            <span className="badge bg-secondary mb-2">{producto.categoria}</span>
            <h2 className="fw-bold display-6 mb-3">{producto.nombre}</h2>
            <h3 className="text-success fw-bold mb-4">${producto.precio.toLocaleString('es-CL')}</h3>
            <p className="text-muted lead fs-6 mb-4">{producto.descripcion}</p>
            <p className="mb-4"><strong>Stock disponible:</strong> {producto.stock || 10} unidades</p>
            
            <div className="d-flex gap-3">
              <button className="btn btn-primary btn-lg px-4" onClick={() => agregarAlCarrito(producto)}>
                 Agregar al Carrito
              </button>
              <Link to="/" className="btn btn-outline-secondary btn-lg px-4">
                Volver
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}