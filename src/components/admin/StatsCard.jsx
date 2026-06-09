// Archivo: StatsCard.jsx
// CoreX - Generado automáticamente

/* ========================================================================== */
/*                                                                            */
/*  📄 ARCHIVO: StatsCard.jsx                                                 */
/*  📁 UBICACIÓN: frontend/src/components/admin/StatsCard.jsx                 */
/*  🚀 MÓDULO: Componentes de Administración                                  */
/*  🏷️  VERSIÓN: v1.0.0                                                      */
/*  📅 ÚLTIMA ACTUALIZACIÓN: 2026-05-22 10:30                                 */
/*  👨‍💻 AUTOR: CoreX Team                                                      */
/*                                                                            */
/* ========================================================================== */
/*                                                                            */
/*  🎯 PROPÓSITO                                                              */
/*  ------------------------------------------------------------------------  */
/*  Tarjeta de estadística para el dashboard del administrador. Muestra      */
/*  métricas clave como total de ventas, productos, usuarios, etc., con       */
/*  íconos y colores personalizables.                                        */
/*                                                                            */
/*  🧩 FUNCIONALIDADES PRINCIPALES                                            */
/*  ------------------------------------------------------------------------  */
/*  ✅ Mostrar título y valor                                                 */
/*  ✅ Mostrar subtítulo opcional                                             */
/*  ✅ Mostrar tendencia (aumento/disminución)                                */
/*  ✅ Icono personalizable                                                   */
/*  ✅ Color configurable                                                     */
/*  ✅ Efecto hover y animación                                               */
/*                                                                            */
/*  📦 DEPENDENCIAS                                                           */
/*  ------------------------------------------------------------------------  */
/*  • React - Librería principal                                              */
/*  • PropTypes - Validación de props                                         */
/*                                                                            */
/*  🔗 RELACIONES                                                             */
/*  ------------------------------------------------------------------------  */
/*  • Importado por: AdminDashboard                                           */
/*  • Usado en el dashboard principal                                         */
/*                                                                            */
/*  ⚠️ NOTAS IMPORTANTES                                                      */
/*  ------------------------------------------------------------------------  */
/*  • El valor se formatea automáticamente como moneda si es un número grande */
/*  • El color afecta el borde superior y el ícono                            */
/*  • La tendencia muestra flecha y color según el valor                      */
/*                                                                            */
/*  🛠️ HISTORIAL DE CAMBIOS                                                   */
/*  ------------------------------------------------------------------------  */
/*  [v1.0.0] - 2026-05-22                                                    */
/*      ✅ Creación inicial                                                   */
/*      ✅ Estructura base                                                    */
/*      ✅ Formato de moneda                                                  */
/*      ✅ Tendencia                                                          */
/*      ✅ Animaciones                                                        */
/*                                                                            */
/* ========================================================================== */

import React from 'react';
import PropTypes from 'prop-types';

/* ========================================================================== */
/*  COMPONENTE PRINCIPAL                                                      */
/* ========================================================================== */

const StatsCard = ({ 
  title, 
  value, 
  subtitle, 
  icon, 
  color = 'blue',
  trend,
  trendValue,
  onClick,
  loading = false
}) => {
  
  /* ========================================================================= */
  /*  CONFIGURACIÓN DE COLORES                                                 */
  /* ========================================================================= */

  const colorConfig = {
    blue: {
      bg: 'bg-blue-50 dark:bg-blue-900/20',
      border: 'border-blue-500',
      iconBg: 'bg-blue-500',
      text: 'text-blue-600 dark:text-blue-400',
      trendUp: 'text-green-600',
      trendDown: 'text-red-600'
    },
    green: {
      bg: 'bg-green-50 dark:bg-green-900/20',
      border: 'border-green-500',
      iconBg: 'bg-green-500',
      text: 'text-green-600 dark:text-green-400',
      trendUp: 'text-green-600',
      trendDown: 'text-red-600'
    },
    purple: {
      bg: 'bg-purple-50 dark:bg-purple-900/20',
      border: 'border-purple-500',
      iconBg: 'bg-purple-500',
      text: 'text-purple-600 dark:text-purple-400',
      trendUp: 'text-green-600',
      trendDown: 'text-red-600'
    },
    orange: {
      bg: 'bg-orange-50 dark:bg-orange-900/20',
      border: 'border-orange-500',
      iconBg: 'bg-orange-500',
      text: 'text-orange-600 dark:text-orange-400',
      trendUp: 'text-green-600',
      trendDown: 'text-red-600'
    },
    red: {
      bg: 'bg-red-50 dark:bg-red-900/20',
      border: 'border-red-500',
      iconBg: 'bg-red-500',
      text: 'text-red-600 dark:text-red-400',
      trendUp: 'text-green-600',
      trendDown: 'text-red-600'
    },
    yellow: {
      bg: 'bg-yellow-50 dark:bg-yellow-900/20',
      border: 'border-yellow-500',
      iconBg: 'bg-yellow-500',
      text: 'text-yellow-600 dark:text-yellow-400',
      trendUp: 'text-green-600',
      trendDown: 'text-red-600'
    }
  };

  const colors = colorConfig[color] || colorConfig.blue;

  /* ========================================================================= */
  /*  FORMATEAR VALOR                                                          */
  /* ========================================================================= */

  const formatValue = () => {
    if (value === undefined || value === null) return '0';
    
    // Si es un número grande, formatear como moneda
    if (typeof value === 'number') {
      if (value >= 1000000) {
        return `$${value.toLocaleString('es-CO')}`;
      }
      return value.toLocaleString('es-CO');
    }
    
    return value;
  };

  /* ========================================================================= */
  /*  RENDERIZADO DE TENDENCIA                                                 */
  /* ========================================================================= */

  const renderTrend = () => {
    if (!trend) return null;
    
    const isPositive = trend === 'up' || (typeof trendValue === 'number' && trendValue > 0);
    const trendColor = isPositive ? colors.trendUp : colors.trendDown;
    const trendIcon = isPositive ? '📈' : '📉';
    const trendText = trendValue 
      ? `${isPositive ? '+' : ''}${trendValue}%` 
      : (isPositive ? 'Aumento' : 'Disminución');
    
    return (
      <div className={`flex items-center gap-1 text-xs ${trendColor} mt-2`}>
        <span>{trendIcon}</span>
        <span>{trendText}</span>
        <span className="text-gray-400">vs período anterior</span>
      </div>
    );
  };

  /* ========================================================================= */
  /*  RENDERIZADO DE CARGA                                                     */
  /* ========================================================================= */

  if (loading) {
    return (
      <div className={`${colors.bg} rounded-xl shadow-md p-5 border-l-4 ${colors.border} animate-pulse`}>
        <div className="flex justify-between items-start">
          <div className="flex-1">
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-24 mb-2"></div>
            <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-32"></div>
          </div>
          <div className={`w-12 h-12 ${colors.iconBg} rounded-lg opacity-50`}></div>
        </div>
      </div>
    );
  }

  /* ========================================================================= */
  /*  RENDERIZADO PRINCIPAL                                                    */
  /* ========================================================================= */

  return (
    <div 
      className={`${colors.bg} rounded-xl shadow-md hover:shadow-lg transition-all duration-300 p-5 border-l-4 ${colors.border} ${
        onClick ? 'cursor-pointer transform hover:-translate-y-1' : ''
      }`}
      onClick={onClick}
    >
      <div className="flex justify-between items-start">
        <div className="flex-1">
          {/* Título */}
          <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
            {title}
          </p>
          
          {/* Valor */}
          <p className={`text-2xl font-bold ${colors.text}`}>
            {formatValue()}
          </p>
          
          {/* Subtítulo */}
          {subtitle && (
            <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
              {subtitle}
            </p>
          )}
          
          {/* Tendencia */}
          {renderTrend()}
        </div>
        
        {/* Icono */}
        {icon && (
          <div className={`w-12 h-12 ${colors.iconBg} rounded-lg flex items-center justify-center text-white text-2xl shadow-sm`}>
            {icon}
          </div>
        )}
      </div>
    </div>
  );
};

/* ========================================================================== */
/*  PROPTYPES                                                                 */
/* ========================================================================== */

StatsCard.propTypes = {
  title: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  subtitle: PropTypes.string,
  icon: PropTypes.string,
  color: PropTypes.oneOf(['blue', 'green', 'purple', 'orange', 'red', 'yellow']),
  trend: PropTypes.oneOf(['up', 'down']),
  trendValue: PropTypes.number,
  onClick: PropTypes.func,
  loading: PropTypes.bool
};

/* ========================================================================== */
/*  EXPORTAR COMPONENTE                                                       */
/* ========================================================================== */

export default StatsCard;