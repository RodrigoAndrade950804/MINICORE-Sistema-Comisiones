// routes/ventas.routes.ts - Refactorizado con SOLID + Patrones

import { Router, Request, Response } from 'express';
import { ComisionService } from '../services/ComisionService';
import { ValidacionService } from '../services/ValidacionService';
import { VentaRepository } from '../repositories/VentaRepository';

const router = Router();

// Dependency Injection - DIP aplicado
const ventaRepo = new VentaRepository();
const comisionService = new ComisionService(ventaRepo);
const validacionService = new ValidacionService();

// FUNCIONALIDAD CORE REFACTORIZADA: Filtrar y calcular comisiones
router.get('/comisiones', async (req: Request, res: Response) => {
    try {
        const { fecha_inicio, fecha_fin, vendedor_id } = req.query;
        
        // Validaciones usando ValidacionService (SRP)
        const validacionFechas = validacionService.validarParametrosComision(fecha_inicio, fecha_fin);
        if (!validacionFechas.valido) {
            return res.status(400).json({
                success: false,
                message: validacionFechas.mensaje,
                ejemplo: validacionFechas.ejemplo
            });
        }

        const validacionVendedor = validacionService.validarVendedorId(vendedor_id);
        if (!validacionVendedor.valido) {
            return res.status(400).json({
                success: false,
                message: validacionVendedor.mensaje
            });
        }

        console.log(`🔍 Calculando comisiones: ${fecha_inicio} a ${fecha_fin}${vendedor_id ? `, vendedor: ${vendedor_id}` : ''}`);

        // Calcular comisiones usando ComisionService (SRP + Strategy + Factory)
        const resultado = comisionService.calcularComisionesPorPeriodo(
            fecha_inicio as string,
            fecha_fin as string,
            vendedor_id as string
        );

        // Solo formatear respuesta
        res.json({
            success: true,
            message: 'Comisiones calculadas exitosamente',
            data: resultado.comisiones,
            resumen: resultado.resumen,
            nota: 'Sistema MINICORE - Aplicando SOLID + Strategy + Factory patterns'
        });

    } catch (error) {
        console.error('Error calculando comisiones:', error);
        res.status(500).json({
            success: false,
            message: 'Error calculando comisiones',
            error: error instanceof Error ? error.message : 'Error desconocido'
        });
    }
});

// Ruta para listar todas las ventas
router.get('/', async (req: Request, res: Response) => {
    try {
        const ventas = ventaRepo.obtenerTodasLasVentas();
        res.json({
            success: true,
            message: 'Ventas obtenidas - MINICORE',
            data: ventas,
            total_ventas: ventas.length
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error obteniendo ventas'
        });
    }
});

export default router;