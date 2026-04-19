// routes/vendedor.routes.ts

import { Router, Request, Response } from 'express';
import { VentaRepository } from '../repositories/VentaRepository';

const router = Router();
const ventaRepo = new VentaRepository();

router.get('/', async (req: Request, res: Response) => {
    try {
        const vendedores = ventaRepo.obtenerTodosLosVendedores();
        res.json({
            success: true,
            message: 'Vendedores obtenidos',
            data: vendedores,
            total: vendedores.length
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error obteniendo vendedores'
        });
    }
});

export default router;