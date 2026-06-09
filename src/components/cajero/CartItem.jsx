// Archivo: CartItem.jsx
// CoreX - Generado automáticamente

/* ========================================================================== */
/*                                                                            */
/*  📄 ARCHIVO: CartItem.jsx                                                  */
/*  📁 UBICACIÓN: frontend/src/components/cajero/CartItem.jsx                 */
/*  🚀 MÓDULO: Componentes de Cajero                                          */
/*  🏷️  VERSIÓN: v1.0.0                                                      */
/*  📅 ÚLTIMA ACTUALIZACIÓN: 2026-05-22 10:30                                 */
/*  👨‍💻 AUTOR: CoreX Team                                                      */
/*                                                                            */
/* ========================================================================== */
/*                                                                            */
/*  🎯 PROPÓSITO                                                              */
/*  ------------------------------------------------------------------------  */
/*  Componente que representa un producto individual en el carrito de        */
/*  compras del punto de venta (POS). Muestra la información del producto,   */
/*  permite modificar la cantidad y eliminar del carrito.                    */
/*                                                                            */
/*  🧩 FUNCIONALIDADES PRINCIPALES                                            */
/*  ------------------------------------------------------------------------  */
/*  ✅ Mostrar imagen, nombre y precio del producto                           */
/*  ✅ Mostrar subtotal por producto                                          */
/*  ✅ Modificar cantidad (+ / -)                                             */
/*  ✅ Eliminar producto del carrito                                          */
/*  ✅ Validar cantidad mínima (1)                                            */
/*                                                                            */
/*  📦 DEPENDENCIAS                                                           */
/*  ------------------------------------------------------------------------  */
/*  • React - Librería principal                                              */
/*  • PropTypes - Validación de props                                         */
/*                                                                            */
/*  🔗 RELACIONES                                                             */
/*  ------------------------------------------------------------------------  */
/*  • Importado por: CajeroCart, CajeroPOS                                    */
/*  • Usa: callbacks para actualizar el carrito                               */
/*                                                                            */
/*  ⚠️ NOTAS IMPORTANTES                                                      */
/*  ------------------------------------------------------------------------  */
/*  • La cantidad no puede ser menor a 1                                      */
/*  • El subtotal se calcula como precio * cantidad                           */
/*  • Soporta imágenes con fallback                                           */
/*                                                                            */
/*  🛠️ HISTORIAL DE CAMBIOS                                                   */
/*  ------------------------------------------------------------------------  */
/*  [v1.0.0] - 2026-05-22                                                    */
/*      ✅ Creación inicial                                                   */
/*      ✅ Estructura base                                                    */
/*      ✅ Controles de cantidad                                              */
/*      ✅ Botón de eliminar                                                  */
/*      ✅ Formato de moneda                                                  */
/*                                                                            */
/* ========================================================================== */

import React from 'react';
import PropTypes from 'prop-types';

/* ========================================================================== */
/*  COMPONENTE PRINCIPAL                                                      */
/* ========================================================================== */

const CartItem = ({ item, onUpdateQuantity, onRemove }) => {
  
  /* ========================================================================= */
  /*  FORMATEAR PRECIO                                                         */
  /* ========================================================================= */

  const formatPrice = (price) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(price);
  };

  /* ========================================================================= */
  /*  INCREMENTAR CANTIDAD                                                     */
  /* ========================================================================= */

  const handleIncrement = () => {
    onUpdateQuantity(item.id, item.quantity + 1);
  };

  /* ========================================================================= */
  /*  DECREMENTAR CANTIDAD                                                     */
  /* ========================================================================= */

  const handleDecrement = () => {
    if (item.quantity > 1) {
      onUpdateQuantity(item.id, item.quantity - 1);
    }
  };

  /* ========================================================================= */
  /*  CAMBIAR CANTIDAD DIRECTAMENTE                                            */
  /* ========================================================================= */

  const handleQuantityChange = (e) => {
    let value = parseInt(e.target.value);
    if (isNaN(value)) value = 1;
    if (value < 1) value = 1;
    onUpdateQuantity(item.id, value);
  };

  /* ========================================================================= */
  /*  MANEJAR ELIMINAR                                                         */
  /* ========================================================================= */

  const handleRemove = () => {
    onRemove(item.id);
  };

  /* ========================================================================= */
  /*  RENDERIZADO DE IMAGEN                                                    */
  /* ========================================================================= */

  const handleImageError = (e) => {
    e.target.src = '/placeholder-image.png';
  };

  /* ========================================================================= */
  /*  RENDERIZADO PRINCIPAL                                                    */
  /* ========================================================================= */

  return (
    <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition">
      
      {/* Imagen */}
      <img
        src={item.imagen_url || '/placeholder-image.png'}
        alt={item.nombre}
        className="w-12 h-12 object-cover rounded"
        onError={handleImageError}
      />
      
      {/* Información del producto */}
      <div className="flex-1 min-w-0">
        <p className="font-medium text-gray-800 dark:text-white truncate">
          {item.nombre}
        </p>
        <p className="text-sm text-gray-500">
          {formatPrice(item.precio)}
        </p>
      </div>
      
      {/* Controles de cantidad */}
      <div className="flex items-center gap-2">
        <button
          onClick={handleDecrement}
          className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-500 transition text-lg font-bold"
          aria-label="Disminuir cantidad"
        >
          -
        </button>
        
        <input
          type="number"
          value={item.quantity}
          onChange={handleQuantityChange}
          min="1"
          className="w-12 text-center px-1 py-1 border rounded dark:bg-gray-600 dark:border-gray-500"
          aria-label="Cantidad"
        />
        
        <button
          onClick={handleIncrement}
          className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-500 transition text-lg font-bold"
          aria-label="Aumentar cantidad"
        >
          +
        </button>
      </div>
      
      {/* Subtotal */}
      <div className="min-w-[100px] text-right">
        <p className="font-semibold text-blue-600 dark:text-blue-400">
          {formatPrice(item.precio * item.quantity)}
        </p>
      </div>
      
      {/* Botón eliminar */}
      <button
        onClick={handleRemove}
        className="text-red-500 hover:text-red-700 transition p-1"
        aria-label="Eliminar producto"
      >
        🗑️
      </button>
    </div>
  );
};

/* ========================================================================== */
/*  PROPTYPES                                                                 */
/* ========================================================================== */

CartItem.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    nombre: PropTypes.string.isRequired,
    precio: PropTypes.number.isRequired,
    quantity: PropTypes.number.isRequired,
    imagen_url: PropTypes.string
  }).isRequired,
  onUpdateQuantity: PropTypes.func.isRequired,
  onRemove: PropTypes.func.isRequired
};

/* ========================================================================== */
/*  EXPORTAR COMPONENTE                                                       */
/* ========================================================================== */

export default CartItem;