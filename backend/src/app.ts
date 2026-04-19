import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

// Importar rutas
import vendedorRoutes from './routes/vendedor.routes';
import ventasRoutes from './routes/ventas.routes';
import reglasRoutes from './routes/reglas.routes';

// Configuración
dotenv.config();
const app = express();
const PORT = process.env.PORT || 3001;

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rutas principales
app.use('/api/vendedores', vendedorRoutes);
app.use('/api/ventas', ventasRoutes);
app.use('/api/reglas', reglasRoutes);

// Ruta de salud del servidor
app.get('/api/health', (req, res) => {
    res.json({ 
        status: 'OK', 
        message: 'Servidor MINICORE funcionando correctamente',
        timestamp: new Date().toISOString(),
        version: '1.0.0'
    });
});

// Ruta raíz
app.get('/', (req, res) => {
    res.json({
        message: '🚀 API MINICORE - Sistema de Comisiones de Ventas',
        version: '1.0.0',
        endpoints: {
            health: '/api/health',
            vendedores: '/api/vendedores',
            ventas: '/api/ventas',
            reglas: '/api/reglas',
            comisiones: '/api/ventas/comisiones'
        }
    });
});

// Manejo de errores
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
    console.error(err.stack);
    res.status(500).json({
        success: false,
        message: 'Error interno del servidor',
        error: process.env.NODE_ENV === 'development' ? err.message : {}
    });
});

// Inicializar servidor
const startServer = async () => {
    try {
        // TODO: Inicializar base de datos después
        // await initializeDatabase();
        
        // Iniciar servidor
        app.listen(PORT, () => {
            console.log(`🚀 Servidor MINICORE ejecutándose en puerto ${PORT}`);
            console.log(`📡 API disponible en: http://localhost:${PORT}/api`);
            console.log(`🏠 Página principal: http://localhost:${PORT}`);
            console.log(`⚡ Funcionalidad core: http://localhost:${PORT}/api/ventas/comisiones`);
        });
    } catch (error) {
        console.error('❌ Error iniciando servidor:', error);
        process.exit(1);
    }
};

// Iniciar aplicación
startServer();

export default app;