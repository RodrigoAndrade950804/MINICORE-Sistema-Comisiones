import sql from 'mssql';
import { DatabaseConfig } from '../types';

// Configuración de la base de datos SQL Server
const dbConfig: sql.config = {
    server: process.env.DB_SERVER || 'LENOVORODRIGO\\SQLEXPRESS',
    database: process.env.DB_DATABASE || 'minicore_db',
    options: {
        trustedConnection: true,
        encrypt: false,
        trustServerCertificate: true
    }
};

// Pool de conexiones
let pool: sql.ConnectionPool | null = null;

// Función para obtener conexión
export const getConnection = async () => {
    try {
        if (!pool) {
            pool = await sql.connect(dbConfig);
            console.log('✅ Conexión a SQL Server establecida - MINICORE');
        }
        return pool;
    } catch (error) {
        console.error('❌ Error conectando a SQL Server:', error);
        throw error;
    }
};

// Función para ejecutar queries
export const executeQuery = async (query: string, params: any = {}) => {
    try {
        const connection = await getConnection();
        const request = connection.request();
        
        // Agregar parámetros si existen
        Object.keys(params).forEach(key => {
            request.input(key, params[key]);
        });
        
        const result = await request.query(query);
        return result.recordset;
    } catch (error) {
        console.error('❌ Error ejecutando query:', error);
        throw error;
    }
};

export default pool;