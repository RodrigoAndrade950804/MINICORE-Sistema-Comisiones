// services/ComisionService.ts

import { ComisionFactory } from '../factories/ComisionFactory';
import { VentaRepository } from '../repositories/VentaRepository';

export class ComisionService {
  constructor(private ventaRepo: VentaRepository) {}

  // Calcula comisiones por sumatoria mensual de ventas
  calcularComisionesPorPeriodo(fechaInicio: string, fechaFin: string, vendedorId?: string) {
    // Obtener ventas filtradas DEL PERIODO EXACTO
    let ventasFiltradas;
    if (vendedorId) {
      ventasFiltradas = this.ventaRepo.filtrarVentasPorFechaYVendedor(
        fechaInicio, 
        fechaFin, 
        parseInt(vendedorId)
      );
    } else {
      ventasFiltradas = this.ventaRepo.filtrarVentasPorFecha(fechaInicio, fechaFin);
    }

    // Agrupar ventas por vendedor Y SUMAR POR MES
    const vendedoresMap = new Map();
    
    ventasFiltradas.forEach(venta => {
      const vendedor = this.ventaRepo.buscarVendedorPorId(venta.vendedor_id);
      
      if (!vendedoresMap.has(venta.vendedor_id)) {
        vendedoresMap.set(venta.vendedor_id, {
          vendedor: vendedor,
          ventas: [],
          total_ventas_periodo: 0  // SUMATORIA DEL PERIODO
        });
      }
      
      vendedoresMap.get(venta.vendedor_id).ventas.push(venta);
      vendedoresMap.get(venta.vendedor_id).total_ventas_periodo += venta.monto;
    });

    // Calcular comisiones usando Strategy Pattern sobre SUMATORIA MENSUAL
    const comisiones = Array.from(vendedoresMap.values()).map((vendedorData: any) => {
      const totalVentasPeriodo = vendedorData.total_ventas_periodo;
      
      // Factory decide estrategia segun TOTAL del periodo (no venta individual)
      const strategy = ComisionFactory.crearEstrategia(totalVentasPeriodo);
      const comisionTotal = strategy.calcular(totalVentasPeriodo);
      
      return {
        vendedor: vendedorData.vendedor,
        ventas: vendedorData.ventas,
        total_ventas: totalVentasPeriodo,
        comision_total: Math.round(comisionTotal * 100) / 100,
        regla_aplicada: {
          nombre: strategy.getTipo(),
          rango: strategy.getRango(),
          porcentaje_comision: this.getPorcentajeStrategy(strategy)
        },
        fecha_inicio: fechaInicio,
        fecha_fin: fechaFin,
        nota_calculo: `Comisión calculada sobre sumatoria total del periodo: $${totalVentasPeriodo}`
      };
    });

    return {
      comisiones,
      resumen: this.generarResumen(comisiones, ventasFiltradas, fechaInicio, fechaFin, vendedorId)
    };
  }

  // Obtener porcentaje segun estrategia
  private getPorcentajeStrategy(strategy: any): number {
    const tipo = strategy.getTipo();
    if (tipo.includes('Básica')) return 6.0;
    if (tipo.includes('Media')) return 8.0;
    if (tipo.includes('Alta')) return 10.0;
    if (tipo.includes('Premium')) return 15.0;
    return 0;
  }

  // Genera resumen ejecutivo
  private generarResumen(comisiones: any[], ventasFiltradas: any[], fechaInicio: string, fechaFin: string, vendedorId?: string) {
    const totalComisionGeneral = comisiones.reduce((sum, c) => sum + c.comision_total, 0);
    const totalVentasPeriodo = comisiones.reduce((sum, c) => sum + c.total_ventas, 0);

    return {
      filtros: { fecha_inicio: fechaInicio, fecha_fin: fechaFin, vendedor_id: vendedorId },
      total_vendedores: comisiones.length,
      total_ventas_periodo: totalVentasPeriodo,
      total_comision_general: Math.round(totalComisionGeneral * 100) / 100,
      ventas_encontradas: ventasFiltradas.length,
      sistema_calculo: "Comisiones calculadas sobre sumatoria mensual de ventas del período"
    };
  }
}