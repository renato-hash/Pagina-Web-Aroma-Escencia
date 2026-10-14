import React from 'react';
import { Link } from 'react-router-dom';

export function PagoExitoso() {
  const orden = JSON.parse(localStorage.getItem('ultima_orden')) || {
    numeroOrden: '2026001',
    cliente: { 
      nombre: 'Cliente', 
      apellidos: 'Duoc', 
      correo: 'cliente@duoc.cl', 
      calle: 'Av. España 123', 
      comuna: 'Santiago' 
    },
    items: [],
    total: 0
  };

  return (
    <div className="container my-5">
      <div className="card p-5 shadow-lg border-0 text-center max-w-700 mx-auto rounded-4">
        <div className="mb-3 text-success display-1">✅</div>
        <h2 className="fw-bold text-success">¡Se ha realizado la compra con éxito!</h2>
        <p className="lead text-muted">Orden de compra N° <strong>#{orden.numeroOrden}</strong></p>
        <hr className="my-4" />

        <div className="text-start mb-4">
          <h5 className="fw-bold mb-3">Datos del despacho:</h5>
          <p className="mb-1"><strong>Nombre:</strong> {orden.cliente.nombre} {orden.cliente.apellidos}</p>
          <p className="mb-1"><strong>Correo:</strong> {orden.cliente.correo}</p>
          <p className="mb-1"><strong>Dirección:</strong> {orden.cliente.calle}, {orden.cliente.comuna}</p>
          <p className="mb-1"><strong>Total Pagado:</strong> ${orden.total?.toLocaleString('es-CL')}</p>
        </div>

        <Link to="/" className="btn btn-primary btn-lg rounded-pill px-5">
          Volver a la Tienda
        </Link>
      </div>
    </div>
  );
}