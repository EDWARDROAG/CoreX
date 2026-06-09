// Archivo: ProductDetailPage.jsx
// CoreX - Generado automáticamente

/* ========================================================================== */
/*                                                                            */
/*  📄 ARCHIVO: ProductDetailPage.jsx                                         */
/*  📁 UBICACIÓN: frontend/src/pages/Public/ProductDetailPage.jsx             */
/*  🚀 MÓDULO: Páginas Públicas                                               */
/*  🏷️  VERSIÓN: v1.0.0                                                      */
/*  📅 ÚLTIMA ACTUALIZACIÓN: 2026-05-22 10:30                                 */
/*  👨‍💻 AUTOR: CoreX Team                                                      */
/*                                                                            */
/* ========================================================================== */
/*                                                                            */
/*  🎯 PROPÓSITO                                                              */
/*  ------------------------------------------------------------------------  */
/*  Página de detalle de producto del sitio CoreX. Muestra la información    */
/*  completa de un producto específico, incluyendo imagen, precio,           */
/*  descripción, condición y botón de compra por WhatsApp.                   */
/*                                                                            */
/*  🧩 FUNCIONALIDADES PRINCIPALES                                            */
/*  ------------------------------------------------------------------------  */
/*  ✅ Mostrar información detallada del producto                             */
/*  ✅ Mostrar imagen del producto (optimizada)                               */
/*  ✅ Botón de compra rápida por WhatsApp                                    */
/*  ✅ Botón de consulta por WhatsApp                                         */
/*  ✅ Productos relacionados (misma categoría)                               */
/*  ✅ Soporte para productos nuevos y de segunda                             */
/*                                                                            */
/*  📦 DEPENDENCIAS                                                           */
/*  ------------------------------------------------------------------------  */
/*  • React - Librería principal                                              */
/*  • useState, useEffect - Hooks de React                                    */
/*  • useParams, useNavigate - Hooks de React Router                          */
/*  • ProductCard - Componente de tarjeta de producto                         */
/*  • LoadingSpinner - Componente de carga                                    */
/*  • useProducts - Hook personalizado para productos                         */
/*  • useWhatsApp - Hook para enlaces de WhatsApp                             */
/*                                                                            */
/*  🔗 RELACIONES                                                             */
/*  ------------------------------------------------------------------------  */
/*  • Importado por: AppRoutes.js                                             */
/*  • Usa: ProductCard, LoadingSpinner, useProducts, useWhatsApp              */
/*  • Navega a: /products (volver al catálogo)                                */
/*                                                                            */
/*  ⚠️ NOTAS IMPORTANTES                                                      */
/*  ------------------------------------------------------------------------  */
/*  • El ID del producto se obtiene de la URL                                 */
/*  • Muestra 404 si el producto no existe                                    */
/*  • Los productos relacionados se basan en la misma categoría               */
/*                                                                            */
/*  🛠️ HISTORIAL DE CAMBIOS                                                   */
/*  ------------------------------------------------------------------------  */
/*  [v1.0.0] - 2026-05-22                                                    */
/*      ✅ Creación inicial                                                   */
/*      ✅ Detalle del producto                                               */
/*      ✅ Botones de WhatsApp                                                */
/*      ✅ Productos relacionados                                             */
/*      ✅ Manejo de errores 404                                              */
/*                                                                            */
/* ========================================================================== */

import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import ProductCard from '../../components/common/ProductCard';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import { useProducts } from '../../hooks/useProducts';
import { useWhatsApp } from '../../hooks/useWhatsApp';

/* ========================================================================== */
/*  COMPONENTE PRINCIPAL                                                      */
/* ========================================================================== */

const ProductDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getProductById, getProducts, loading, error } = useProducts();
  const { generateQuickBuyLink, generateProductInquiryLink } = useWhatsApp();
  
  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  /* ========================================================================= */
  /*  CARGAR PRODUCTO Y RELACIONADOS                                           */
  /* ========================================================================= */

  useEffect(() => {
    const loadProduct = async () => {
      setIsLoading(true);
      setNotFound(false);
      
      try {
        // Cargar producto principal
        const productData = await getProductById(id);
        
        if (!productData) {
          setNotFound(true);
          return;
        }
        
        setProduct(productData);
        
        // Cargar productos relacionados (misma categoría, excluyendo el actual)
        const related = await getProducts({
          categoria_id: productData.categoria_id,
          limit: 4,
          page: 1
        });
        
        if (related && related.data) {
          const filtered = related.data.filter(p => p.id !== parseInt(id));
          setRelatedProducts(filtered.slice(0, 4));
        }
        
      } catch (err) {
        console.error('Error loading product:', err);
        setNotFound(true);
      } finally {
        setIsLoading(false);
      }
    };
    
    if (id) {
      loadProduct();
    }
  }, [id, getProductById, getProducts]);

  /* ========================================================================= */
  /*  MANEJAR COMPRA RÁPIDA                                                    */
  /* ========================================================================= */

  const handleQuickBuy = () => {
    if (product) {
      const whatsappLink = generateQuickBuyLink(product);
      window.open(whatsappLink, '_blank');
    }
  };

  /* ========================================================================= */
  /*  MANEJAR CONSULTA                                                         */
  /* ========================================================================= */

  const handleInquiry = () => {
    if (product) {
      const whatsappLink = generateProductInquiryLink(product);
      window.open(whatsappLink, '_blank');
    }
  };

  /* ========================================================================= */
  /*  RENDERIZADO DE PRODUCTO NO ENCONTRADO                                    */
  /* ========================================================================= */

  if (notFound) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center px-4">
          <div className="text-6xl mb-4">🔍</div>
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
            Producto no encontrado
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            El producto que buscas no existe o ha sido eliminado
          </p>
          <Link
            to="/products"
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Volver al catálogo
          </Link>
        </div>
      </div>
    );
  }

  /* ========================================================================= */
  /*  RENDERIZADO DE CARGA                                                     */
  /* ========================================================================= */

  if (isLoading || loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  /* ========================================================================= */
  /*  RENDERIZADO PRINCIPAL                                                    */
  /* ========================================================================= */

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 py-8">
        
        {/* Breadcrumb */}
        <div className="mb-6 text-sm text-gray-500 dark:text-gray-400">
          <Link to="/" className="hover:text-blue-600">Inicio</Link>
          <span className="mx-2">/</span>
          <Link to="/products" className="hover:text-blue-600">Productos</Link>
          <span className="mx-2">/</span>
          <span className="text-gray-700 dark:text-gray-300">{product?.nombre}</span>
        </div>

        {/* Detalle del producto */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-6 md:p-8">
            
            {/* Imagen del producto */}
            <div className="flex justify-center items-center bg-gray-100 dark:bg-gray-700 rounded-lg p-4">
              {product?.imagen_url ? (
                <img
                  src={product.imagen_url}
                  alt={product.nombre}
                  className="max-w-full max-h-96 object-contain rounded-lg"
                  onError={(e) => {
                    e.target.src = '/placeholder-image.png';
                  }}
                />
              ) : (
                <div className="w-full h-64 flex items-center justify-center text-gray-400">
                  <div className="text-center">
                    <div className="text-6xl mb-2">📦</div>
                    <p>Sin imagen</p>
                  </div>
                </div>
              )}
            </div>
            
            {/* Información del producto */}
            <div>
              {/* Condición */}
              <div className="mb-4">
                {product?.condicion === 'nuevo' ? (
                  <span className="inline-block bg-green-100 text-green-700 text-xs font-semibold px-3 py-1 rounded-full">
                    🆕 Nuevo
                  </span>
                ) : (
                  <span className="inline-block bg-orange-100 text-orange-700 text-xs font-semibold px-3 py-1 rounded-full">
                    🔄 Segunda Mano
                  </span>
                )}
              </div>
              
              {/* Nombre */}
              <h1 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-white mb-4">
                {product?.nombre}
              </h1>
              
              {/* Categoría */}
              {product?.categoria_nombre && (
                <div className="mb-4">
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    Categoría: {product.categoria_nombre}
                  </span>
                </div>
              )}
              
              {/* Precio */}
              <div className="mb-6">
                <span className="text-3xl font-bold text-blue-600 dark:text-blue-400">
                  ${product?.precio?.toLocaleString('es-CO')}
                </span>
              </div>
              
              {/* Descripción */}
              {product?.descripcion && (
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">
                    Descripción
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 whitespace-pre-wrap">
                    {product.descripcion}
                  </p>
                </div>
              )}
              
              {/* Botones de acción */}
              <div className="flex flex-col sm:flex-row gap-4 mt-6">
                <button
                  onClick={handleQuickBuy}
                  className="flex-1 bg-green-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-600 transition flex items-center justify-center gap-2"
                >
                  <span>💬</span>
                  Comprar por WhatsApp
                </button>
                <button
                  onClick={handleInquiry}
                  className="flex-1 bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition flex items-center justify-center gap-2"
                >
                  <span>❓</span>
                  Consultar
                </button>
              </div>
              
              {/* Nota de disponibilidad */}
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-4 text-center">
                * Los precios están sujetos a disponibilidad de stock
              </p>
            </div>
          </div>
        </div>

        {/* Productos relacionados */}
        {relatedProducts.length > 0 && (
          <div className="mt-12">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">
              Productos Relacionados
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {relatedProducts.map((relProduct) => (
                <ProductCard key={relProduct.id} product={relProduct} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetailPage;