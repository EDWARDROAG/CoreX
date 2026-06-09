// Archivo: ProductCard.jsx
// CoreX - Generado automáticamente

/* ========================================================================== */
/*                                                                            */
/*  📄 ARCHIVO: ProductCard.jsx                                               */
/*  📁 UBICACIÓN: frontend/src/components/common/ProductCard.jsx              */
/*  🚀 MÓDULO: Componentes Comunes                                            */
/*  🏷️  VERSIÓN: v1.0.0                                                      */
/*  📅 ÚLTIMA ACTUALIZACIÓN: 2026-05-22 10:30                                 */
/*  👨‍💻 AUTOR: CoreX Team                                                      */
/*                                                                            */
/* ========================================================================== */
/*                                                                            */
/*  🎯 PROPÓSITO                                                              */
/*  ------------------------------------------------------------------------  */
/*  Tarjeta de producto para mostrar en listados y catálogos. Muestra la     */
/*  imagen, nombre, precio, condición y botón de WhatsApp del producto.      */
/*  Es reutilizable en diferentes secciones del sitio.                       */
/*                                                                            */
/*  🧩 FUNCIONALIDADES PRINCIPALES                                            */
/*  ------------------------------------------------------------------------  */
/*  ✅ Mostrar imagen del producto                                            */
/*  ✅ Mostrar nombre, precio y condición                                     */
/*  ✅ Mostrar badge de condición (nuevo/segunda)                             */
/*  ✅ Botón de consulta por WhatsApp                                         */
/*  ✅ Enlace a página de detalle                                             */
/*  ✅ Manejo de imagen fallback                                              */
/*                                                                            */
/*  📦 DEPENDENCIAS                                                           */
/*  ------------------------------------------------------------------------  */
/*  • React - Librería principal                                              */
/*  • Link - React Router DOM                                                 */
/*  • useWhatsApp - Hook personalizado para WhatsApp                          */
/*                                                                            */
/*  🔗 RELACIONES                                                             */
/*  ------------------------------------------------------------------------  */
/*  • Importado por: HomePage, ProductsPage, ProductDetailPage                */
/*  • Usa: useWhatsApp                                                        */
/*                                                                            */
/*  ⚠️ NOTAS IMPORTANTES                                                      */
/*  ------------------------------------------------------------------------  */
/*  • El precio se formatea en pesos colombianos                              */
/*  • La condición afecta el color del badge                                  */
/*  • El enlace de WhatsApp se abre en nueva pestaña                          */
/*                                                                            */
/*  🛠️ HISTORIAL DE CAMBIOS                                                   */
/*  ------------------------------------------------------------------------  */
/*  [v1.0.0] - 2026-05-22                                                    */
/*      ✅ Creación inicial                                                   */
/*      ✅ Estructura de tarjeta                                              */
/*      ✅ Badge de condición                                                 */
/*      ✅ Botón de WhatsApp                                                  */
/*      ✅ Enlace a detalle                                                   */
/*                                                                            */
/* ========================================================================== */

import React from 'react';
import { Link } from 'react-router-dom';
import { useWhatsApp } from '../../hooks/useWhatsApp';

/* ========================================================================== */
/*  COMPONENTE PRINCIPAL                                                      */
/* ========================================================================== */

const ProductCard = ({ product }) => {
  const { generateQuickBuyLink, generateProductInquiryLink } = useWhatsApp();

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
  /*  MANEJAR COMPRA RÁPIDA                                                    */
  /* ========================================================================= */

  const handleQuickBuy = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const link = generateQuickBuyLink(product);
    window.open(link, '_blank');
  };

  /* ========================================================================= */
  /*  MANEJAR CONSULTA                                                         */
  /* ========================================================================= */

  const handleInquiry = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const link = generateProductInquiryLink(product);
    window.open(link, '_blank');
  };

  /* ========================================================================= */
  /*  IMAGEN FALLBACK                                                          */
  /* ========================================================================= */

  const handleImageError = (e) => {
    e.target.src = '/placeholder-image.png';
  };

  /* ========================================================================= */
  /*  RENDERIZADO DE BADGE DE CONDICIÓN                                        */
  /* ========================================================================= */

  const renderConditionBadge = () => {
    if (product.condicion === 'nuevo') {
      return (
        <span className="absolute top-2 left-2 bg-green-500 text-white text-xs font-semibold px-2 py-1 rounded-full">
          🆕 Nuevo
        </span>
      );
    }
    return (
      <span className="absolute top-2 left-2 bg-orange-500 text-white text-xs font-semibold px-2 py-1 rounded-full">
        🔄 Segunda
      </span>
    );
  };

  /* ========================================================================= */
  /*  RENDERIZADO DE BADGE DE STOCK                                            */
  /* ========================================================================= */

  const renderStockBadge = () => {
    if (product.stock === 0) {
      return (
        <span className="absolute top-2 right-2 bg-red-500 text-white text-xs font-semibold px-2 py-1 rounded-full">
          Vendido
        </span>
      );
    }
    return null;
  };

  /* ========================================================================= */
  /*  RENDERIZADO PRINCIPAL                                                    */
  /* ========================================================================= */

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-lg transition overflow-hidden group">
      <Link to={`/products/${product.id}`}>
        {/* Imagen */}
        <div className="relative h-48 overflow-hidden bg-gray-100 dark:bg-gray-700">
          <img
            src={product.imagen_url || '/placeholder-image.png'}
            alt={product.nombre}
            className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
            onError={handleImageError}
          />
          {renderConditionBadge()}
          {renderStockBadge()}
        </div>

        {/* Contenido */}
        <div className="p-4">
          {/* Nombre */}
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-1 line-clamp-1">
            {product.nombre}
          </h3>
          
          {/* Categoría */}
          {product.categoria_nombre && (
            <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">
              {product.categoria_nombre}
            </p>
          )}
          
          {/* Precio */}
          <div className="flex items-baseline gap-1 mb-3">
            <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">
              {formatPrice(product.precio)}
            </span>
          </div>
        </div>
      </Link>

      {/* Botones de acción */}
      <div className="px-4 pb-4 flex gap-2">
        {product.stock === 1 ? (
          <>
            <button
              onClick={handleQuickBuy}
              className="flex-1 bg-green-500 text-white py-2 rounded-lg text-sm font-semibold hover:bg-green-600 transition"
            >
              💬 Comprar
            </button>
            <button
              onClick={handleInquiry}
              className="flex-1 bg-blue-600 text-white py-2 rounded-lg text-sm font-semibold hover:bg-blue-700 transition"
            >
              Consultar
            </button>
          </>
        ) : (
          <button
            disabled
            className="w-full bg-gray-300 text-gray-500 py-2 rounded-lg text-sm font-semibold cursor-not-allowed"
          >
            Producto Vendido
          </button>
        )}
      </div>
    </div>
  );
};

export default ProductCard;