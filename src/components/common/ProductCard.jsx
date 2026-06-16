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
    <div className="corex-product-card group">
      <Link to={`/products/${product.id}`}>
        <div className="relative h-48 overflow-hidden bg-gray-50">
          <img
            src={product.imagen_url || '/placeholder-image.png'}
            alt={product.nombre}
            className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
            onError={handleImageError}
          />
          {renderConditionBadge()}
          {renderStockBadge()}
        </div>

        <div className="p-4">
          <h3 className="mb-1 line-clamp-1 text-lg font-semibold text-gray-900">{product.nombre}</h3>
          {product.categoria_nombre && (
            <p className="mb-2 text-xs text-gray-500">{product.categoria_nombre}</p>
          )}
          <div className="mb-3">
            <span className="corex-price text-2xl">{formatPrice(product.precio)}</span>
          </div>
        </div>
      </Link>

      <div className="flex gap-2 px-4 pb-4">
        {product.stock === 1 ? (
          <>
            <button type="button" onClick={handleQuickBuy} className="corex-btn-whatsapp flex-1 px-3 py-2 text-sm">
              Comprar
            </button>
            <button
              type="button"
              onClick={handleInquiry}
              className="corex-btn-gradient corex-btn-gradient--sm flex-1"
            >
              Consultar
            </button>
          </>
        ) : (
          <button type="button" disabled className="corex-btn-outline w-full cursor-not-allowed">
            Producto Vendido
          </button>
        )}
      </div>
    </div>
  );
};

export default ProductCard;