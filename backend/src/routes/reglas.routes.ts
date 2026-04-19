// routes/reglas.routes.ts

import { Router, Request, Response } from 'express';
import { VentaRepository } from '../repositories/VentaRepository';

const router = Router();
const ventaRepo = new VentaRepository();

router.get('/', async (req: Request, res: Response) => {
    try {
        const reglas = ventaRepo.obtenerTodasLasReglas();
        res.json({
            success: true,
            message: 'Reglas de comisión obtenidas',
            data: reglas,
            total: reglas.length
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error obteniendo reglas'
        });
    }
});

export default router;