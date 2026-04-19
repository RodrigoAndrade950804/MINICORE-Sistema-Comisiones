import React, { useState, useEffect } from 'react';
import { ComisionCalculada, Vendedor, EstadoCarga, FiltroComisiones, ReglaComisionInfo } from '../types';
import { obtenerComisionesPorFechas, obtenerVendedores } from '../services/api';
import { format } from 'date-fns';
import './ComisionCalculator.css';

const ComisionCalculator: React.FC = () => {
    // Estados
    const [filtros, setFiltros] = useState<FiltroComisiones>({
        fecha_inicio: '2025-06-01', // ← CAMBIADO A 2025
        fecha_fin: '2025-06-30',    // ← CAMBIADO A 2025
        vendedor_id: undefined
    });

    const [estado, setEstado] = useState<EstadoCarga>({
        cargando: false,
        error: null,
        datos: null,
        resumen: null
    });

    const [vendedores, setVendedores] = useState<Vendedor[]>([]);

    // ← NUEVAS REGLAS ACTUALIZADAS
    const reglasComision: ReglaComisionInfo[] = [
        { rango: '$0 - $600', porcentaje: 6.0, nombre: 'Comisión Básica', color: '#10b981' },
        { rango: '$601 - $800', porcentaje: 8.0, nombre: 'Comisión Media', color: '#3b82f6' },
        { rango: '$801 - $1,000', porcentaje: 10.0, nombre: 'Comisión Alta', color: '#8b5cf6' },
        { rango: '$1,000+', porcentaje: 15.0, nombre: 'Comisión Premium', color: '#f59e0b' }
    ];

    // Cargar vendedores al montar el componente
    useEffect(() => {
        cargarVendedores();
    }, []);

    const cargarVendedores = async () => {
        try {
            const response = await obtenerVendedores();
            if (response.success && response.data) {
                setVendedores(response.data);
            }
        } catch (error) {
            console.error('Error cargando vendedores:', error);
        }
    };

    // FUNCIONALIDAD CORE: Calcular comisiones
    const calcularComisiones = async (e: React.FormEvent) => {
        e.preventDefault();
        
        setEstado(prev => ({ ...prev, cargando: true, error: null }));

        try {
            console.log('🔍 Calculando comisiones con filtros:', filtros);
            
            const response = await obtenerComisionesPorFechas(filtros);
            
            if (response.success) {
                setEstado({
                    cargando: false,
                    error: null,
                    datos: response.data || [],
                    resumen: response.resumen || null
                });
                
                console.log('✅ Comisiones calculadas:', response.data);
            } else {
                setEstado(prev => ({
                    ...prev,
                    cargando: false,
                    error: response.message || 'Error calculando comisiones'
                }));
            }
        } catch (error: any) {
            setEstado(prev => ({
                ...prev,
                cargando: false,
                error: error.message || 'Error inesperado'
            }));
            console.error('❌ Error calculando comisiones:', error);
        }
    };

    const handleFiltroChange = (campo: keyof FiltroComisiones, valor: string) => {
        setFiltros(prev => ({
            ...prev,
            [campo]: campo === 'vendedor_id' ? (valor ? parseInt(valor) : undefined) : valor
        }));
    };

    const limpiarFiltros = () => {
        setFiltros({
            fecha_inicio: '2025-06-01', // ← CAMBIADO A 2025
            fecha_fin: '2025-06-30',    // ← CAMBIADO A 2025
            vendedor_id: undefined
        });
        setEstado({
            cargando: false,
            error: null,
            datos: null,
            resumen: null
        });
    };

    const formatearMoneda = (monto: number): string => {
        return new Intl.NumberFormat('es-US', {
            style: 'currency',
            currency: 'USD'
        }).format(monto);
    };

    const formatearFecha = (fecha: string | Date): string => {
        const fechaObj = typeof fecha === 'string' ? new Date(fecha) : fecha;
        return format(fechaObj, 'dd/MM/yyyy');
    };

    return (
        <div className="comision-calculator">
            <div className="calculator-header">
                <h2>⚡ Cálculo de Comisiones por Sumatoria Mensual</h2>
                <p>Funcionalidad CORE - Sistema actualizado con nuevas reglas de comisión</p>
            </div>

            {/* ← NUEVA SECCIÓN: Reglas de Comisión */}
            <div className="reglas-info">
                <h3>📊 Reglas de Comisión Actualizadas</h3>
                <p className="reglas-descripcion">
                    <strong>Sistema de cálculo:</strong> Las comisiones se calculan sobre la sumatoria total de ventas del período seleccionado, no por venta individual.
                </p>
                <div className="reglas-grid">
                    {reglasComision.map((regla, index) => (
                        <div key={index} className="regla-card" style={{ borderLeftColor: regla.color }}>
                            <div className="regla-header">
                                <span className="regla-nombre">{regla.nombre}</span>
                                <span className="regla-porcentaje" style={{ color: regla.color }}>
                                    {regla.porcentaje}%
                                </span>
                            </div>
                            <div className="regla-rango">{regla.rango}</div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Formulario de filtros */}
            <form onSubmit={calcularComisiones} className="filtros-form">
                <div className="filtros-grid">
                    <div className="campo">
                        <label htmlFor="fecha_inicio">📅 Fecha Inicio:</label>
                        <input
                            type="date"
                            id="fecha_inicio"
                            value={filtros.fecha_inicio}
                            onChange={(e) => handleFiltroChange('fecha_inicio', e.target.value)}
                            required
                        />
                    </div>

                    <div className="campo">
                        <label htmlFor="fecha_fin">📅 Fecha Fin:</label>
                        <input
                            type="date"
                            id="fecha_fin"
                            value={filtros.fecha_fin}
                            onChange={(e) => handleFiltroChange('fecha_fin', e.target.value)}
                            required
                        />
                    </div>

                    <div className="campo">
                        <label htmlFor="vendedor_id">👤 Vendedor (Opcional):</label>
                        <select
                            id="vendedor_id"
                            value={filtros.vendedor_id || ''}
                            onChange={(e) => handleFiltroChange('vendedor_id', e.target.value)}
                        >
                            <option value="">Todos los vendedores</option>
                            {vendedores.map(vendedor => (
                                <option key={vendedor.id} value={vendedor.id}>
                                    {vendedor.nombre}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                <div className="botones">
                    <button 
                        type="submit" 
                        disabled={estado.cargando}
                        className="btn-calcular"
                    >
                        {estado.cargando ? '⏳ Calculando...' : '🧮 Calcular Comisiones'}
                    </button>
                    
                    <button 
                        type="button" 
                        onClick={limpiarFiltros}
                        className="btn-limpiar"
                    >
                        🗑️ Limpiar
                    </button>
                </div>
            </form>

            {/* Estados de la aplicación */}
            {estado.error && (
                <div className="error">
                    <h3>❌ Error</h3>
                    <p>{estado.error}</p>
                </div>
            )}

            {estado.cargando && (
                <div className="loading">
                    <div className="spinner"></div>
                    <p>Calculando comisiones...</p>
                </div>
            )}

            {/* Resumen de resultados */}
            {estado.resumen && (
                <div className="resumen">
                    <h3>📊 Resumen del Período</h3>
                    <div className="resumen-grid">
                        <div className="resumen-item">
                            <span className="label">Vendedores con ventas:</span>
                            <span className="valor">{estado.resumen.total_vendedores}</span>
                        </div>
                        <div className="resumen-item">
                            <span className="label">Total en ventas:</span>
                            <span className="valor">{formatearMoneda(estado.resumen.total_ventas_periodo)}</span>
                        </div>
                        <div className="resumen-item destacado">
                            <span className="label">Total comisiones:</span>
                            <span className="valor">{formatearMoneda(estado.resumen.total_comision_general)}</span>
                        </div>
                        <div className="resumen-item">
                            <span className="label">Ventas encontradas:</span>
                            <span className="valor">{estado.resumen.ventas_encontradas}</span>
                        </div>
                    </div>
                    {/* ← NUEVA información del sistema */}
                    {estado.resumen.sistema_calculo && (
                        <div className="sistema-info">
                            <p><strong>💡 Sistema de cálculo:</strong> {estado.resumen.sistema_calculo}</p>
                        </div>
                    )}
                </div>
            )}

            {/* Resultados detallados */}
            {estado.datos && estado.datos.length > 0 && (
                <div className="resultados">
                    <h3>💰 Comisiones Calculadas</h3>
                    
                    {estado.datos.map((comision, index) => (
                        <div key={index} className="comision-card">
                            <div className="comision-header">
                                <h4>👤 {comision.vendedor.nombre}</h4>
                                <p className="email">{comision.vendedor.email}</p>
                            </div>

                            <div className="comision-stats">
                                <div className="stat">
                                    <span className="label">Total Ventas del Período:</span>
                                    <span className="valor">{formatearMoneda(comision.total_ventas)}</span>
                                </div>
                                <div className="stat destacado">
                                    <span className="label">Comisión Calculada:</span>
                                    <span className="valor">{formatearMoneda(comision.comision_total)}</span>
                                </div>
                                <div className="stat">
                                    <span className="label">Regla aplicada:</span>
                                    <span className="valor">
                                        {comision.regla_aplicada.nombre} ({comision.regla_aplicada.porcentaje_comision}%)
                                    </span>
                                </div>
                                <div className="stat">
                                    <span className="label">Rango:</span>
                                    <span className="valor">{comision.regla_aplicada.rango}</span>
                                </div>
                                <div className="stat">
                                    <span className="label">Cantidad de ventas:</span>
                                    <span className="valor">{comision.ventas.length}</span>
                                </div>
                            </div>

                            {/* ← NUEVA nota de cálculo */}
                            {comision.nota_calculo && (
                                <div className="nota-calculo">
                                    <p><strong>📝 Nota:</strong> {comision.nota_calculo}</p>
                                </div>
                            )}

                            {/* Detalle de ventas */}
                            <details className="ventas-detalle">
                                <summary>Ver detalle de ventas ({comision.ventas.length})</summary>
                                <div className="ventas-lista">
                                    {comision.ventas.map((venta, vIndex) => (
                                        <div key={vIndex} className="venta-item">
                                            <div className="venta-info">
                                                <span className="fecha">{formatearFecha(venta.fecha_venta)}</span>
                                                <span className="producto">{venta.producto}</span>
                                                <span className="cliente">{venta.cliente}</span>
                                                <span className="monto">{formatearMoneda(venta.monto)}</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </details>
                        </div>
                    ))}
                </div>
            )}

            {estado.datos && estado.datos.length === 0 && !estado.cargando && (
                <div className="sin-resultados">
                    <h3>📭 Sin resultados</h3>
                    <p>No se encontraron ventas en el período seleccionado.</p>
                    <p>Intenta cambiar las fechas o seleccionar otro vendedor.</p>
                </div>
            )}
        </div>
    );
};

export default ComisionCalculator;