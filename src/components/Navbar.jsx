import React from 'react';
import { Link } from 'react-router-dom';

export function Navbar({ cantidadCarrito }) {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark sticky-top py-3">
      <div className="container">
        <Link className="navbar-brand fs-4 fw-bold" to="/">
           <span style={{ color: '#e0c9a6' }}>Aroma</span> & Esencia
        </Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto ms-3">
            <li className="nav-item">
              <Link className="nav-link text-light px-3" to="/">Inicio</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-light px-3" to="/categorias">Categorías</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-light px-3" to="/ofertas">Ofertas </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-light px-3" to="/admin">Panel Admin</Link>
            </li>
          </ul>
          <Link to="/carrito" className="btn btn-outline-light position-relative px-4 rounded-pill">
             Carrito
            {cantidadCarrito > 0 && (
              <span className="position-absolute top-0 start-100 translate-middle badge rounded-circle bg-danger fs-7">
                {cantidadCarrito}
              </span>
            )}
          </Link>
        </div>
      </div>
    </nav>
  );
}