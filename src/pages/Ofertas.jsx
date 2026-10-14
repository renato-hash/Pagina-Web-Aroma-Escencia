import React from 'react';

export function Ofertas({ productos, agregarAlCarrito }) {
  // Simular ofertas aplicando un descuento ficticio del 20% a algunos productos
  const ofertas = productos.slice(0, 6);

  return (
    <div className="container my-5">
      <div className="bg-danger text-white p-4 rounded-4 mb-5 text-center shadow">
        <h2 className="fw-bold mb-2"> ¡Ofertas Especiales de Temporada!</h2>
        <p className="mb-0 fs-5">Aprovecha hasta un 20% de descuento en artículos seleccionados.</p>
      </div>

      <div className="row g-4">
        {ofertas.map((prod) => (
          <div key={prod.id} className="col-12 col-md-6 col-lg-4">
            <div className="card h-100 shadow-sm product-card border-danger">
              <span className="badge bg-danger position-absolute top-0 end-0 m-3 fs-6 px-3 py-2">
                20% OFF
              </span>
              <img
                src={prod.imagen}
                className="card-img-top"
                alt={prod.nombre}
                style={{ height: '220px', objectFit: 'cover' }}
              />
              <div className="card-body d-flex flex-column p-4">
                <h5 className="fw-bold mb-2">{prod.nombre}</h5>
                <p className="text-muted small flex-grow-1">{prod.descripcion}</p>
                <div className="d-flex justify-content-between align-items-center mt-3 pt-3 border-top">
                  <div>
                    <span className="text-muted text-decoration-line-through me-2">${prod.precio.toLocaleString('es-CL')}</span>
                    <span className="fw-bold text-danger fs-5">${Math.round(prod.precio * 0.8).toLocaleString('es-CL')}</span>
                  </div>
                  <button className="btn btn-danger btn-sm" onClick={() => agregarAlCarrito(prod)}>
                    + Aprovechar
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}