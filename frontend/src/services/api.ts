import axios from 'axios';
import { ApiResponse, ComisionCalculada, Vendedor, Ventas, Reglas, FiltroComisiones } from '../types';

// Configuración base de axios
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001/api';

const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
    timeout: 10000, // 10 segundos
});

// Interceptor para logging
api.interceptors.request.use(
    (config) => {
        console.log(`🔍 API Request: ${config.method?.toUpperCase()} ${config.url}`);
        return config;
    },
    (error) => {
        console.error('❌ API Request Error:', error);
        return Promise.reject(error);
    }
);

api.interceptors.response.use(
    (response) => {
        console.log(`✅ API Response: ${response.status} ${response.config.url}`);
        return response;
    },
    (error) => {
        console.error('❌ API Response Error:', error.response?.data || error.message);
        return Promise.reject(error);
    }
);

// Servicios de la API

// FUNCIONALIDAD CORE: Obtener comisiones por fechas
export const obtenerComisionesPorFechas = async (filtros: FiltroComisiones): Promise<ApiResponse<ComisionCalculada[]>> => {
    try {
        const params = new URLSearchParams({
            fecha_inicio: filtros.fecha_inicio,
            fecha_fin: filtros.fecha_fin,
        });
        
        if (filtros.vendedor_id) {
            params.append('vendedor_id', filtros.vendedor_id.toString());
        }

        const response = await api.get(`/ventas/comisiones?${params.toString()}`);
        return response.data;
    } catch (error: any) {
        throw new Error(error.response?.data?.message || 'Error obteniendo comisiones');
    }
};

// Obtener todos los vendedores
export const obtenerVendedores = async (): Promise<ApiResponse<Vendedor[]>> => {
    try {
        const response = await api.get('/vendedores');
        return response.data;
    } catch (error: any) {
        throw new Error(error.response?.data?.message || 'Error obteniendo vendedores');
    }
};

// Obtener todas las ventas
export const obtenerVentas = async (): Promise<ApiResponse<Ventas[]>> => {
    try {
        const response = await api.get('/ventas');
        return response.data;
    } catch (error: any) {
        throw new Error(error.response?.data?.message || 'Error obteniendo ventas');
    }
};

// Obtener todas las reglas
export const obtenerReglas = async (): Promise<ApiResponse<Reglas[]>> => {
    try {
        const response = await api.get('/reglas');
        return response.data;
    } catch (error: any) {
        throw new Error(error.response?.data?.message || 'Error obteniendo reglas');
    }
};

// Verificar estado del servidor
export const verificarSalud = async (): Promise<any> => {
    try {
        const response = await api.get('/health');
        return response.data;
    } catch (error: any) {
        throw new Error('Error conectando con el servidor');
    }
};

export default api;