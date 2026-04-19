// interfaces/IVentaRepository.ts

export interface IVentaRepository {
  obtenerTodasLasVentas(): any[];
  obtenerTodosLosVendedores(): any[];
  filtrarVentasPorFecha(fechaInicio: string, fechaFin: string): any[];
  filtrarVentasPorVendedor(vendedorId: number): any[];
  filtrarVentasPorFechaYVendedor(fechaInicio: string, fechaFin: string, vendedorId: number): any[];
  buscarVendedorPorId(id: number): any;
}