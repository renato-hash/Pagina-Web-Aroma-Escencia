import React, { useState } from 'react';

export function Admin({ productos, agregarProducto, eliminarProducto }) {
  const [form, setForm] = useState({ nombre: '', precio: '', categoria: '', descripcion: '', imagen: '/images/producto1.jpg', stock: 10 });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.nombre || !form.precio) return;
    agregarProducto({ ...form, id: Date.now(), precio: Number(form.precio) });
    setForm({ nombre: '', precio: '', categoria: '', descripcion: '', imagen: '/images/producto1.jpg', stock: 10 });
  };

  return (
    <div className="container my-4">
      <h2>Panel de Administración (CRUD)</h2>
      <div className="row mt-4">
        <div className="col-md-4">
          <div className="card p-3 shadow-sm">
            <h5>Agregar Producto</h5>
            <form onSubmit={handleSubmit}>
              <input className="form-control mb-2" placeholder="Nombre" value={form.nombre} onChange={e => setForm({...form, nombre: e.target.value})} required />
              <input className="form-control mb-2" type="number" placeholder="Precio" value={form.precio} onChange={e => setForm({...form, precio: e.target.value})} required />
              <input className="form-control mb-2" placeholder="Categoría" value={form.categoria} onChange={e => setForm({...form, categoria: e.target.value})} />
              <textarea className="form-control mb-2" placeholder="Descripción" value={form.descripcion} onChange={e => setForm({...form, descripcion: e.target.value})}></textarea>
              <button className="btn btn-primary w-100" type="submit">Guardar Producto</button>
            </form>
          </div>
        </div>
        <div className="col-md-8">
          <h5>Lista de Productos</h5>
          <table className="table table-bordered align-middle">
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Precio</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {productos.map(p => (
                <tr key={p.id}>
                  <td>{p.nombre}</td>
                  <td>${p.precio.toLocaleString('es-CL')}</td>
                  <td>
                    <button className="btn btn-sm btn-danger" onClick={() => eliminarProducto(p.id)}>Eliminar</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}