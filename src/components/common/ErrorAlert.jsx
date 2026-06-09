// Archivo: ErrorAlert.jsx
// CoreX - Generado automáticamente

/* ========================================================================== */
/*                                                                            */
/*  📄 ARCHIVO: ErrorAlert.jsx                                                */
/*  📁 UBICACIÓN: frontend/src/components/common/ErrorAlert.jsx               */
/*  🚀 MÓDULO: Componentes Comunes                                            */
/*  🏷️  VERSIÓN: v1.0.0                                                      */
/*  📅 ÚLTIMA ACTUALIZACIÓN: 2026-05-22 10:30                                 */
/*  👨‍💻 AUTOR: CoreX Team                                                      */
/*                                                                            */
/* ========================================================================== */
/*                                                                            */
/*  🎯 PROPÓSITO                                                              */
/*  ------------------------------------------------------------------------  */
/*  Componente de alerta de error reutilizable. Muestra mensajes de error    */
/*  con diferentes estilos, iconos y opciones de cierre.                     */
/*                                                                            */
/*  🧩 FUNCIONALIDADES PRINCIPALES                                            */
/*  ------------------------------------------------------------------------  */
/*  ✅ Mostrar mensaje de error                                               */
/*  ✅ Diferentes tipos (error, warning, info)                                */
/*  ✅ Auto-cierre después de X segundos                                      */
/*  ✅ Botón de cierre manual                                                 */
/*  ✅ Iconos personalizados                                                  */
/*  ✅ Animación de entrada/salida                                            */
/*                                                                            */
/*  📦 DEPENDENCIAS                                                           */
/*  ------------------------------------------------------------------------  */
/*  • React - Librería principal                                              */
/*  • useState, useEffect - Hooks de React                                    */
/*  • PropTypes - Validación de props                                         */
/*                                                                            */
/*  🔗 RELACIONES                                                             */
/*  ------------------------------------------------------------------------  */
/*  • Importado por: múltiples componentes                                    */
/*  • Usado en formularios y acciones                                        */
/*                                                                            */
/*  ⚠️ NOTAS IMPORTANTES                                                      */
/*  ------------------------------------------------------------------------  */
/*  • Se puede cerrar automática o manualmente                                */
/*  • Soporta diferentes niveles de severidad                                 */
/*  • Accesible con roles ARIA                                                */
/*                                                                            */
/*  🛠️ HISTORIAL DE CAMBIOS                                                   */
/*  ------------------------------------------------------------------------  */
/*  [v1.0.0] - 2026-05-22                                                    */
/*      ✅ Creación inicial                                                   */
/*      ✅ Tipos de alerta                                                    */
/*      ✅ Auto-cierre                                                        */
/*      ✅ Animación                                                          */
/*      ✅ Botón de cierre                                                    */
/*                                                                            */
/* ========================================================================== */

import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

/* ========================================================================== */
/*  CONFIGURACIÓN POR TIPO                                                    */
/* ========================================================================== */

const TYPE_CONFIG = {
  error: {
    icon: '❌',
    bgColor: 'bg-red-50 dark:bg-red-900/20',
    borderColor: 'border-red-400',
    textColor: 'text-red-800 dark:text-red-200',
    buttonColor: 'text-red-500 hover:text-red-700'
  },
  warning: {
    icon: '⚠️',
    bgColor: 'bg-yellow-50 dark:bg-yellow-900/20',
    borderColor: 'border-yellow-400',
    textColor: 'text-yellow-800 dark:text-yellow-200',
    buttonColor: 'text-yellow-500 hover:text-yellow-700'
  },
  info: {
    icon: 'ℹ️',
    bgColor: 'bg-blue-50 dark:bg-blue-900/20',
    borderColor: 'border-blue-400',
    textColor: 'text-blue-800 dark:text-blue-200',
    buttonColor: 'text-blue-500 hover:text-blue-700'
  },
  success: {
    icon: '✅',
    bgColor: 'bg-green-50 dark:bg-green-900/20',
    borderColor: 'border-green-400',
    textColor: 'text-green-800 dark:text-green-200',
    buttonColor: 'text-green-500 hover:text-green-700'
  }
};

/* ========================================================================== */
/*  COMPONENTE PRINCIPAL                                                      */
/* ========================================================================== */

const ErrorAlert = ({ 
  message, 
  type = 'error', 
  title = '',
  onClose, 
  autoClose = false,
  autoCloseTime = 5000,
  showIcon = true,
  dismissible = true
}) => {
  const [isVisible, setIsVisible] = useState(true);
  const [isLeaving, setIsLeaving] = useState(false);

  /* ========================================================================= */
  /*  AUTO-CIERRE                                                              */
  /* ========================================================================= */

  useEffect(() => {
    if (autoClose && isVisible) {
      const timer = setTimeout(() => {
        handleClose();
      }, autoCloseTime);
      
      return () => clearTimeout(timer);
    }
  }, [autoClose, autoCloseTime, isVisible]);

  /* ========================================================================= */
  /*  MANEJAR CIERRE                                                           */
  /* ========================================================================= */

  const handleClose = () => {
    setIsLeaving(true);
    setTimeout(() => {
      setIsVisible(false);
      if (onClose) onClose();
    }, 300);
  };

  /* ========================================================================= */
  /*  NO RENDERIZAR SI NO ES VISIBLE                                           */
  /* ========================================================================= */

  if (!isVisible) return null;

  /* ========================================================================= */
  /*  OBTENER CONFIGURACIÓN                                                    */
  /* ========================================================================= */

  const config = TYPE_CONFIG[type] || TYPE_CONFIG.error;
  const defaultTitle = {
    error: 'Error',
    warning: 'Advertencia',
    info: 'Información',
    success: 'Éxito'
  }[type] || 'Aviso';

  /* ========================================================================= */
  /*  RENDERIZADO                                                              */
  /* ========================================================================= */

  return (
    <div
      className={`${config.bgColor} border-l-4 ${config.borderColor} p-4 rounded-lg shadow-sm transition-all duration-300 ${
        isLeaving ? 'opacity-0 transform -translate-x-4' : 'opacity-100 transform translate-x-0'
      }`}
      role="alert"
      aria-live="polite"
    >
      <div className="flex items-start gap-3">
        {/* Icono */}
        {showIcon && (
          <div className="flex-shrink-0 text-xl">
            {config.icon}
          </div>
        )}
        
        {/* Contenido */}
        <div className="flex-1">
          <h3 className={`text-sm font-semibold ${config.textColor} mb-1`}>
            {title || defaultTitle}
          </h3>
          <div className={`text-sm ${config.textColor}`}>
            {typeof message === 'string' ? (
              <p>{message}</p>
            ) : (
              <ul className="list-disc list-inside space-y-1">
                {Object.values(message).map((err, idx) => (
                  <li key={idx}>{err}</li>
                ))}
              </ul>
            )}
          </div>
        </div>
        
        {/* Botón de cierre */}
        {dismissible && (
          <button
            onClick={handleClose}
            className={`flex-shrink-0 ${config.buttonColor} transition`}
            aria-label="Cerrar"
          >
            ✕
          </button>
        )}
      </div>
    </div>
  );
};

/* ========================================================================== */
/*  PROPTYPES                                                                 */
/* ========================================================================== */

ErrorAlert.propTypes = {
  message: PropTypes.oneOfType([PropTypes.string, PropTypes.object]).isRequired,
  type: PropTypes.oneOf(['error', 'warning', 'info', 'success']),
  title: PropTypes.string,
  onClose: PropTypes.func,
  autoClose: PropTypes.bool,
  autoCloseTime: PropTypes.number,
  showIcon: PropTypes.bool,
  dismissible: PropTypes.bool
};

/* ========================================================================== */
/*  EXPORTAR COMPONENTE                                                       */
/* ========================================================================== */

export default ErrorAlert;