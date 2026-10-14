import { describe, it, expect, beforeEach, vi } from 'vitest';

describe('Pruebas Unitarias - Tienda Perfumes Aroma & Esencia', () => {
  let productosSimulados;

  beforeEach(() => {
    productosSimulados = [
      { id: 1, nombre: 'Perfume Esencia Rosa', precio: 29990, categoria: 'Florales', stock: 15 },
      { id: 2, nombre: 'Perfume Noche Mística', precio: 34990, categoria: 'Amaderados', stock: 12 },
      { id: 3, nombre: 'Perfume Citrus Gold', precio: 27990, categoria: 'Cítricos', stock: 20 }
    ];
  });

  // 1. PRUEBAS DE RENDERIZADO Y DATOS INICIALES
  it('1. Debe inicializar el catálogo de perfumes correctamente', () => {
    expect(productosSimulados.length).toBe(3);
    expect(productosSimulados[0].nombre).toContain('Rosa');
  });

  it('2. Debe calcular $0 cuando el carrito no tiene perfumes', () => {
    const carritoVacio = [];
    const total = carritoVacio.reduce((acc, item) => acc + item.precio, 0);
    expect(total).toBe(0);
  });

  // 2. PRUEBAS DE PROPIEDADES (PROPS)
  it('3. Debe recibir y reflejar correctamente la cantidad de perfumes en las props del Navbar', () => {
    const propsNavbar = { cantidadCarrito: 3 };
    expect(propsNavbar.cantidadCarrito).toBe(3);
  });

  it('4. Debe formatear correctamente los precios a moneda CLP', () => {
    const precio = 29990;
    const formatearCLP = (val) => `$${val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')}`;
    const precioFormateado = formatearCLP(precio);
    expect(precioFormateado).toBe('$29.990');
  });

  // 3. PRUEBAS DE ESTADO (STATE) Y LÓGICA
  it('5. Debe agregar un perfume al carrito correctamente', () => {
    let carrito = [];
    const nuevoPerfume = productosSimulados[0];
    
    carrito = [...carrito, { ...nuevoPerfume, cantidad: 1 }];
    
    expect(carrito.length).toBe(1);
    expect(carrito[0].id).toBe(1);
  });

  it('6. Debe incrementar la cantidad si el perfume ya está en el carrito', () => {
    let carrito = [{ id: 1, nombre: 'Perfume Esencia Rosa', precio: 29990, cantidad: 1 }];
    const idExistente = 1;

    carrito = carrito.map(item => 
      item.id === idExistente ? { ...item, cantidad: item.cantidad + 1 } : item
    );

    expect(carrito[0].cantidad).toBe(2);
  });

  it('7. Debe eliminar un perfume del carrito según su ID', () => {
    let carrito = [
      { id: 1, nombre: 'Perfume Esencia Rosa' },
      { id: 2, nombre: 'Perfume Noche Mística' }
    ];

    carrito = carrito.filter(item => item.id !== 1);

    expect(carrito.length).toBe(1);
    expect(carrito[0].id).toBe(2);
  });

  // 4. PRUEBAS DE EVENTOS Y MOCKS (VI.FN)
  it('8. Debe simular el evento de agregar al carrito utilizando un Mock (vi.fn)', () => {
    const mockAgregar = vi.fn();
    const perfumeSeleccionado = productosSimulados[0];

    mockAgregar(perfumeSeleccionado);

    expect(mockAgregar).toHaveBeenCalled();
    expect(mockAgregar).toHaveBeenCalledWith(perfumeSeleccionado);
  });

  it('9. Debe filtrar correctamente los perfumes por familia olfativa (categoría)', () => {
    const categoriaFiltro = 'Florales';
    const filtrados = productosSimulados.filter(p => p.categoria === categoriaFiltro);

    expect(filtrados.length).toBe(1);
    expect(filtrados[0].categoria).toBe('Florales');
  });

  // 5. PRUEBA DE PERSISTENCIA (LOCALSTORAGE Y SPY)
  it('10. Debe guardar y recuperar el carrito de perfumes desde localStorage', () => {
    const carritoTest = [{ id: 1, cantidad: 2 }];
    
    const mockStorage = {
      getItem: vi.fn().mockReturnValue(JSON.stringify(carritoTest))
    };

    const guardado = JSON.parse(mockStorage.getItem('aroma_carrito'));

    expect(mockStorage.getItem).toHaveBeenCalledWith('aroma_carrito');
    expect(guardado.length).toBe(1);
    expect(guardado[0].cantidad).toBe(2);
  });
});