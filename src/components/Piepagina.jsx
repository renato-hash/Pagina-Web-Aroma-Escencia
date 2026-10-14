import React from 'react';
import { Link } from 'react-router-dom';

export function Piepagina() {
  return (
    <footer className="bg-dark text-white pt-5 pb-4 mt-5">
      <div className="container text-center text-md-start">
        <div className="row text-center text-md-start">
          <div className="col-md-4 col-lg-4 col-xl-4 mx-auto mt-3">
            <h5 className="text-uppercase mb-4 fw-bold text-warning">Aroma & Esencia</h5>
            <p>
             Perfumería y fragancias exclusivas. Encuentra tu familia olfativa ideal con nosotros.
            </p>
          </div>

          <div className="col-md-3 col-lg-3 col-xl-3 mx-auto mt-3">
            <h5 className="text-uppercase mb-4 fw-bold text-warning">Navegación</h5>
            <p><Link to="/" className="text-white text-decoration-none">Catálogo General</Link></p>
            <p><Link to="/categorias" className="text-white text-decoration-none">Categorías</Link></p>
            <p><Link to="/ofertas" className="text-white text-decoration-none">Ofertas Especiales</Link></p>
            <p><Link to="/admin" className="text-white text-decoration-none">Panel Admin</Link></p>
          </div>

          <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mt-3">
            <h5 className="text-uppercase mb-4 fw-bold text-warning">Contacto</h5>
            <p> Santiago, Chile</p>
            <p>contacto@aromayesencia.cl</p>
            <p> +56 9 1234 5678</p>
          </div>
        </div>

        <hr className="mb-4" />

        <div className="row align-items-center">
          <div className="col-md-12 text-center">
          </div>
        </div>
      </div>
    </footer>
  );
}