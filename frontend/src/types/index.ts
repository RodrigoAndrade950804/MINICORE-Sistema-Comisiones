// types/index.ts

// Interfaces que coinciden con el backend
export interface Vendedor {
    id: number;
    nombre: string;
    email: string;
    telefono?: string;
    fecha_ingreso?: Date | string;
    activo?: boolean;
}

export interface Ventas {
    id: number;
    vendedor_id: number;
    monto: number;
    fecha_venta: Date | string;
    producto?: string;
    cliente?: string;
}

export interface Reglas {
    id: number;
    nombre: string;
    monto_min: number;
    monto_max?: number | null;
    porcentaje_comision: number;
    activo: boolean;
    descripcion?: string;
}

export interface ComisionCalculada {
    vendedor: Vendedor;
    ventas: Ventas[];
    total_ventas: number;
    comision_total: number;
    regla_aplicada: {
        nombre: string;
        rango: string;
        porcentaje_comision: number;
    };
    fecha_inicio: string;
    fecha_fin: string;
    nota_calculo?: string; // ← NUEVO
}

export interface ApiResponse<T> {
    success: boolean;
    data?: T;
    message?: string;
    error?: string;
    resumen?: {
        filtros: {
            fecha_inicio: string;
            fecha_fin: string;
            vendedor_id?: string;
        };
        total_vendedores: number;
        total_ventas_periodo: number;
        total_comision_general: number;
        ventas_encontradas: number;
        sistema_calculo?: string; // ← NUEVO
    };
    nota?: string;
}

export interface FiltroComisiones {
    fecha_inicio: string;
    fecha_fin: string;
    vendedor_id?: number;
}

// Tipos para UI
export interface EstadoCarga {
    cargando: boolean;
    error: string | null;
    datos: ComisionCalculada[] | null;
    resumen: any | null;
}

// ← NUEVA interface para mostrar reglas
export interface ReglaComisionInfo {
    rango: string;
    porcentaje: number;
    nombre: string;
    color: string;
}