import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export function Checkout({ carrito, vaciarCarrito }) {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    nombre: '',
    apellidos: '',
    correo: '',
    calle: '',
    departamento: '',
    region: 'Región Metropolitana de Santiago',
    comuna: 'Santiago',
    indicaciones: ''
  });

  const regionesChile = [
    'Arica y Parinacota',
    'Tarapacá',
    'Antofagasta',
    'Atacama',
    'Coquimbo',
    'Valparaíso',
    'Región Metropolitana de Santiago',
    "Libertador General Bernardo O'Higgins",
    'Maule',
    'Ñuble',
    'Bío Bío',
    'La Araucanía',
    'Los Ríos',
    'Los Lagos',
    'Aysén del General Carlos Ibáñez del Campo',
    'Magallanes y de la Antártica Chilena'
  ];

  const total = carrito.reduce((acc, item) => acc + item.precio * item.cantidad, 0);

  const handleSubmit = (e) => {
    e.preventDefault();
    const orden = {
      numeroOrden: Math.floor(100000 + Math.random() * 900000),
      cliente: form,
      items: carrito,
      total
    };
    localStorage.setItem('ultima_orden', JSON.stringify(orden));
    vaciarCarrito();
    navigate('/pago-exitoso');
  };

  if (carrito.length === 0) {
    return (
      <div className="container my-5 text-center">
        <h3>No tienes perfumes en el carrito para realizar el pago.</h3>
      </div>
    );
  }

  return (
    <div className="container my-5">
      <h2 className="mb-4 text-center fw-bold">Proceso de Pago (Checkout)</h2>
      
      <div className="row g-4">
        {/* Formulario de envío */}
        <div className="col-lg-7">
          <div className="card p-4 shadow-sm border-0">
            <h5 className="fw-bold mb-3">Información del Cliente</h5>
            <form onSubmit={handleSubmit}>
              <div className="row g-3">
                <div className="col-md-6">
                  <label className="form-label">Nombre*</label>
                  <input className="form-control" required value={form.nombre} onChange={e => setForm({...form, nombre: e.target.value})} />
                </div>
                <div className="col-md-6">
                  <label className="form-label">Apellidos*</label>
                  <input className="form-control" required value={form.apellidos} onChange={e => setForm({...form, apellidos: e.target.value})} />
                </div>
                <div className="col-12">
                  <label className="form-label">Correo Electrónico*</label>
                  <input type="email" className="form-control" required value={form.correo} onChange={e => setForm({...form, correo: e.target.value})} />
                </div>

                <h5 className="fw-bold mt-4 mb-2">Dirección de Entrega</h5>
                <div className="col-md-8">
                  <label className="form-label">Calle y Número*</label>
                  <input className="form-control" required value={form.calle} onChange={e => setForm({...form, calle: e.target.value})} />
                </div>
                <div className="col-md-4">
                  <label className="form-label">Dpto / Casa (opcional)</label>
                  <input className="form-control" value={form.departamento} onChange={e => setForm({...form, departamento: e.target.value})} />
                </div>
                <div className="col-md-6">
                  <label className="form-label">Región*</label>
                  <select className="form-select" value={form.region} onChange={e => setForm({...form, region: e.target.value})}>
                    {regionesChile.map((region) => (
                      <option key={region} value={region}>
                        {region}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="col-md-6">
                  <label className="form-label">Comuna*</label>
                  <input className="form-control" required value={form.comuna} onChange={e => setForm({...form, comuna: e.target.value})} />
                </div>
                <div className="col-12">
                  <label className="form-label">Indicaciones para la entrega (opcional)</label>
                  <textarea className="form-control" rows="2" value={form.indicaciones} onChange={e => setForm({...form, indicaciones: e.target.value})}></textarea>
                </div>
              </div>

              <button type="submit" className="btn btn-success w-100 btn-lg mt-4">
                Pagar ahora ${total.toLocaleString('es-CL')}
              </button>
            </form>
          </div>
        </div>

        
        <div className="col-lg-5">
          <div className="card p-4 shadow-sm border-0 bg-light">
            <h5 className="fw-bold mb-3">Resumen de la Compra</h5>
            <ul className="list-group mb-3">
              {carrito.map((item) => (
                <li key={item.id} className="list-group-item d-flex justify-content-between align-items-center bg-transparent">
                  <div>
                    <h6 className="my-0">{item.nombre}</h6>
                    <small className="text-muted">Cant: {item.cantidad} x ${item.precio.toLocaleString('es-CL')}</small>
                  </div>
                  <span className="fw-bold">${(item.precio * item.cantidad).toLocaleString('es-CL')}</span>
                </li>
              ))}
            </ul>
            <div className="d-flex justify-content-between fs-5 fw-bold border-top pt-3">
              <span>Total a pagar:</span>
              <span className="text-success">${total.toLocaleString('es-CL')}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}