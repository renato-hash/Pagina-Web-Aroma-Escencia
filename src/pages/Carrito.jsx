import React from 'react';
import { Link } from 'react-router-dom';

export function Carrito({ carrito, vaciarCarrito, eliminarDelCarrito }) {
  const total = carrito.reduce((acc, item) => acc + item.precio * item.cantidad, 0);

  return (
    <div className="container my-4">
      <h2 className="mb-4 fw-bold">Carrito de Compras / Boleta</h2>
      {carrito.length === 0 ? (
        <div className="alert alert-info">El carrito está vacío.</div>
      ) : (
        <div className="row">
          <div className="col-md-8">
            <ul className="list-group mb-3">
              {carrito.map((item) => (
                <li key={item.id} className="list-group-item d-flex justify-content-between align-items-center p-3">
                  <div>
                    <h6 className="my-0 fw-bold">{item.nombre}</h6>
                    <small className="text-muted">Cantidad: {item.cantidad} x ${item.precio.toLocaleString('es-CL')}</small>
                  </div>
                  <div>
                    <span className="fw-bold me-3">${(item.precio * item.cantidad).toLocaleString('es-CL')}</span>
                    <button className="btn btn-sm btn-outline-danger" onClick={() => eliminarDelCarrito(item.id)}>Eliminar</button>
                  </div>
                </li>
              ))}
            </ul>
            <button className="btn btn-secondary" onClick={vaciarCarrito}>Vaciar Carrito</button>
          </div>
          <div className="col-md-4">
            <div className="card shadow-sm border-0 p-3">
              <div className="card-body">
                <h5 className="card-title fw-bold">Resumen de Boleta</h5>
                <hr />
                <div className="d-flex justify-content-between fs-5 fw-bold mb-3">
                  <span>Total:</span>
                  <span className="text-success">${total.toLocaleString('es-CL')}</span>
                </div>
                {/* Al hacer clic, lleva a la pantalla de Checkout */}
                <Link to="/checkout" className="btn btn-success w-100 py-2 fw-bold">
                  Ir al Checkout / Pagar 
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}