// repositories/VentaRepository.ts

export class VentaRepository {
  // Datos simulados - vendedores originales + nuevos de las imagenes
  private vendedores = [
    { id: 1, nombre: 'Perico P', email: 'perico.p@email.com' },
    { id: 2, nombre: 'Zoila B', email: 'zoila.b@email.com' },
    { id: 3, nombre: 'Aquiles C', email: 'aquiles.c@email.com' },
    { id: 4, nombre: 'Johny M', email: 'johny.m@email.com' }
  ];

  // Datos simulados - ventas originales + nuevas de las imagenes
  private ventas = [
    
    // Datos nuevos de las imagenes (2025)
    { id: 1, vendedor_id: 1, monto: 400.00, fecha_venta: '2025-05-21', producto: 'Producto G', cliente: 'Cliente 1' },
    { id: 2, vendedor_id: 2, monto: 600.00, fecha_venta: '2025-05-29', producto: 'Producto H', cliente: 'Cliente 2' },
    { id: 3, vendedor_id: 2, monto: 200.00, fecha_venta: '2025-06-03', producto: 'Producto I', cliente: 'Cliente 3' },
    { id: 4, vendedor_id: 1, monto: 300.00, fecha_venta: '2025-06-09', producto: 'Producto J', cliente: 'Cliente 4' },
    { id: 5, vendedor_id: 3, monto: 900.00, fecha_venta: '2025-06-11', producto: 'Producto K', cliente: 'Cliente 5' },
    { id: 6, vendedor_id: 1, monto: 500.00, fecha_venta: '2025-06-24', producto: 'Producto L', cliente: 'Cliente 6' },
    { id: 7, vendedor_id: 4, monto: 300.00, fecha_venta: '2025-06-26', producto: 'Producto M', cliente: 'Cliente 7' },
    { id: 8, vendedor_id: 4, monto: 600.00, fecha_venta: '2025-06-30', producto: 'Producto N', cliente: 'Cliente 8' }
  ];

  // Reglas de comision originales
  private reglas = [
    { id: 1, nombre: 'Comisión Básica', monto_min: 0, monto_max: 600, porcentaje_comision: 6.0, activo: true },
    { id: 2, nombre: 'Comisión Media', monto_min: 601, monto_max: 800, porcentaje_comision: 8.0, activo: true },
    { id: 3, nombre: 'Comisión Alta', monto_min: 801, monto_max: 1000, porcentaje_comision: 10.0, activo: true },
    { id: 4, nombre: 'Comisión Alta', monto_min: 1000, monto_max: null, porcentaje_comision: 15.0, activo: true }
  ];

  // Metodos para obtener datos (abstrae la fuente de datos)
  obtenerTodasLasVentas() {
    return this.ventas;
  }

  obtenerTodosLosVendedores() {
    return this.vendedores;
  }

  obtenerTodasLasReglas() {
    return this.reglas;
  }

  // Filtros especificos
  filtrarVentasPorFecha(fechaInicio: string, fechaFin: string) {
    return this.ventas.filter(venta => {
      const fechaVenta = new Date(venta.fecha_venta);
      const inicio = new Date(fechaInicio);
      const fin = new Date(fechaFin);
      return fechaVenta >= inicio && fechaVenta <= fin;
    });
  }

  filtrarVentasPorVendedor(vendedorId: number) {
    return this.ventas.filter(venta => venta.vendedor_id === vendedorId);
  }

  filtrarVentasPorFechaYVendedor(fechaInicio: string, fechaFin: string, vendedorId: number) {
    return this.ventas.filter(venta => {
      const fechaVenta = new Date(venta.fecha_venta);
      const inicio = new Date(fechaInicio);
      const fin = new Date(fechaFin);
      const enRangoFecha = fechaVenta >= inicio && fechaVenta <= fin;
      const esVendedorCorrect = venta.vendedor_id === vendedorId;
      return enRangoFecha && esVendedorCorrect;
    });
  }

  // Buscar vendedor por ID
  buscarVendedorPorId(id: number) {
    return this.vendedores.find(vendedor => vendedor.id === id);
  }

  // Buscar regla aplicable segun monto
  buscarReglaAplicable(monto: number) {
    return this.reglas.find(regla => {
      return monto >= regla.monto_min && 
             (regla.monto_max === null || monto <= regla.monto_max);
    }) || this.reglas[0]; // Regla por defecto si no encuentra
  }
}