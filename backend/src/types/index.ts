// Interfaces básicas para MINICORE
export interface Vendedor {
    id: number;
    nombre: string;
    email: string;
    telefono?: string;
    fecha_ingreso: Date;
    activo: boolean;
}

export interface Ventas {
    id: number;
    vendedor_id: number;
    monto: number;
    fecha_venta: Date;
    producto?: string;
    cliente?: string;
}

export interface Reglas {
    id: number;
    nombre: string;
    monto_min: number;
    monto_max?: number;
    porcentaje_comision: number;
    activo: boolean;
}

export interface ComisionCalculada {
    vendedor: Vendedor;
    ventas: Ventas[];
    total_ventas: number;
    comision_total: number;
    regla_aplicada: Reglas;
    fecha_inicio: string;
    fecha_fin: string;
}

export interface ApiResponse<T> {
    success: boolean;
    data?: T;
    message?: string;
    error?: string;
}

// Configuración para SQL Server
export interface DatabaseConfig {
    server: string;
    database: string;
    options: {
        trustedConnection: boolean;
        encrypt: boolean;
        trustServerCertificate?: boolean;
    };
}