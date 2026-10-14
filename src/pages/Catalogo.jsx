import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export function Catalogo({ productos, agregarAlCarrito }) {
  const slides = [
    {
      id: 1,
      titulo: "Bienvenido a Aroma & Esencia",
      subtitulo: "Descubre nuestra exclusiva colección de perfumería boutique de alta gama.",
      imagen: "https://images.unsplash.com/photo-1588405748880-12d1d2a59f75?auto=format&fit=crop&q=80&w=1200"
    },
    {
      id: 2,
      titulo: "Fragancias Exclusivas",
      subtitulo: "Explora nuestras familias olfativas: Florales, Amaderados, Cítricos, Orientales y más.",
      imagen: "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&q=80&w=1200"
    },
    {
      id: 3,
      titulo: "Envíos a Todo Chile",
      subtitulo: "Elige la esencia que define tu estilo y recíbela directo en tu hogar.",
      imagen: "https://images.unsplash.com/photo-1547887537-6158d64c35b3?auto=format&fit=crop&q=80&w=1200"
    }
  ];

  const [slideActual, setSlideActual] = useState(0);

  // Transición 100% automática cada 3.5 segundos
  useEffect(() => {
    const timer = setInterval(() => {
      setSlideActual((prev) => (prev + 1) % slides.length);
    }, 3500);
    return () => clearInterval(timer);
  }, [slides.length]);

  return (
    <div className="container my-4">
      {/* Carrusel Automático (Sin botones ni controles manuales) */}
      <div 
        className="position-relative overflow-hidden rounded-4 shadow-lg mb-5"
        style={{ height: '320px' }}
      >
        <div 
          style={{
            backgroundImage: `linear-gradient(rgba(0,0,0,0.55), rgba(0,0,0,0.55)), url(${slides[slideActual].imagen})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            height: '100%',
            transition: 'background-image 0.8s ease-in-out'
          }}
          className="d-flex flex-column justify-content-center align-items-center text-center text-white px-4"
        >
          <h1 className="fw-bold display-5 mb-2">{slides[slideActual].titulo}</h1>
          <p className="lead fs-5 max-w-75 mb-3">{slides[slideActual].subtitulo}</p>
          <Link to="/categorias" className="btn btn-warning text-dark fw-bold rounded-pill px-4 py-2">
            Ver Familias Olfativas
          </Link>
        </div>
      </div>

      {/* Catálogo de Perfumes */}
      <h2 className="fw-bold mb-4">Catálogo de Perfumes</h2>
      <div className="row g-4">
        {productos.map((prod) => (
          <div key={prod.id} className="col-12 col-md-6 col-lg-4">
            <div className="card h-100 shadow-sm border-0 product-card">
              <img
                src={prod.imagen}
                className="card-img-top"
                alt={prod.nombre}
                style={{ height: '220px', objectFit: 'cover' }}
                onError={(e) => {
                  e.target.src = 'https://images.unsplash.com/photo-1588405748880-12d1d2a59f75?auto=format&fit=crop&q=80&w=600';
                }}
              />
              <div className="card-body d-flex flex-column p-4">
                <span className="badge bg-secondary mb-2 align-self-start">{prod.categoria}</span>
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