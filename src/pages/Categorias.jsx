import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export function Categorias({ productos, agregarAlCarrito }) {
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState('Todas');

  const categorias = ['Todas', ...new Set(productos.map((p) => p.categoria || 'General'))];

  const productosFiltrados =
    categoriaSeleccionada === 'Todas'
      ? productos
      : productos.filter((p) => p.categoria === categoriaSeleccionada);

  return (
    <div className="container my-5">
      <h2 className="text-center fw-bold mb-4">Categorías de Productos</h2>

    
      <div className="d-flex justify-content-center flex-wrap gap-2 mb-5">
        {categorias.map((cat) => (
          <button
            key={cat}
            className={`btn ${categoriaSeleccionada === cat ? 'btn-primary' : 'btn-outline-secondary'} px-4 py-2 rounded-pill`}
            onClick={() => setCategoriaSeleccionada(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      <h3 className="fw-bold mb-4">{categoriaSeleccionada}</h3>

      
      <div className="row g-4">
        {productosFiltrados.map((prod) => (
          <div key={prod.id} className="col-12 col-md-6 col-lg-4">
            <div className="card h-100 shadow-sm product-card">
              <img
                src={prod.imagen}
                className="card-img-top"
                alt={prod.nombre}
                style={{ height: '220px', objectFit: 'cover' }}
                onError={(e) => {
                  e.target.src = 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?auto=format&fit=crop&q=80&w=600';
                }}
              />
              <div className="card-body d-flex flex-column p-4">
                <h5 className="fw-bold mb-2">{prod.nombre}</h5>
                <p className="text-muted small flex-grow-1">{prod.descripcion}</p>
                <div className="d-flex justify-content-between align-items-center mt-3 pt-3 border-top">
                  <span className="fw-bold fs-5">${prod.precio.toLocaleString('es-CL')}</span>
                  <div>
                    <Link to={`/producto/${prod.id}`} className="btn btn-outline-dark btn-sm me-2">
                      Ver detalle
                    </Link>
                    <button className="btn btn-primary btn-sm" onClick={() => agregarAlCarrito(prod)}>
                      + Agregar
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}