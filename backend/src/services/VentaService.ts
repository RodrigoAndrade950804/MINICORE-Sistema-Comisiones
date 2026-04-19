// services/VentaService.ts

export class VentaService {
  // Solo se encarga de filtrar ventas
  filtrarPorFecha(ventas: any[], fechaInicio: string, fechaFin: string): any[] {
    return ventas.filter(venta => {
      const fechaVenta = new Date(venta.fecha);
      const inicio = new Date(fechaInicio);
      const fin = new Date(fechaFin);
      return fechaVenta >= inicio && fechaVenta <= fin;
    });
  }

  filtrarPorVendedor(ventas: any[], vendedorId: number): any[] {
    return ventas.filter(venta => venta.vendedor_id === vendedorId);
  }
}