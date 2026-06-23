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
import PageHero from '../../components/ui/PageHero';
import SectionHeader from '../../components/ui/SectionHeader';
import { useProducts } from '../../hooks/useProducts';
import { useWhatsApp } from '../../hooks/useWhatsApp';
import { APP_ENV } from '../../config/env';

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
    if (APP_ENV.isVitrina) {
      navigate('/products', { replace: true });
      return;
    }

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
  }, [id, getProductById, getProducts, navigate]);

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
      <div className="corex-section flex min-h-[50vh] items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <>
      <PageHero
        title={product?.nombre || 'Producto'}
        subtitle={product?.categoria_nombre}
        breadcrumbs={[
          { label: 'Inicio', to: '/' },
          { label: 'Productos', to: '/products' },
          { label: product?.nombre || 'Detalle' },
        ]}
      />

      <div className="corex-section corex-section-alt">
        <div className="corex-container">
          <div className="corex-card overflow-hidden">
            <div className="grid grid-cols-1 gap-8 p-6 md:grid-cols-2 md:p-8">
              <div className="flex items-center justify-center rounded-lg bg-gray-50 p-4">
                {product?.imagen_url ? (
                  <img
                    src={product.imagen_url}
                    alt={product.nombre}
                    className="max-h-96 max-w-full rounded-lg object-contain"
                    onError={(e) => { e.target.src = '/placeholder-image.png'; }}
                  />
                ) : (
                  <div className="flex h-64 w-full items-center justify-center text-gray-400">Sin imagen</div>
                )}
              </div>

              <div>
                <div className="mb-4">
                  {product?.condicion === 'nuevo' ? (
                    <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700">Nuevo</span>
                  ) : (
                    <span className="rounded-full bg-orange-100 px-3 py-1 text-xs font-semibold text-orange-700">Segunda Mano</span>
                  )}
                </div>

                <h1 className="corex-page-title mb-4 normal-case">{product?.nombre}</h1>
                <p className="corex-price mb-6 text-3xl">${product?.precio?.toLocaleString('es-CO')}</p>

                {product?.descripcion && (
                  <div className="mb-6">
                    <h3 className="corex-section-title mb-2 text-lg">Descripción</h3>
                    <p className="whitespace-pre-wrap text-gray-600">{product.descripcion}</p>
                  </div>
                )}

                <div className="mt-6 flex flex-col gap-4 sm:flex-row">
                  <button type="button" onClick={handleQuickBuy} className="corex-btn-whatsapp flex-1 px-6 py-3">
                    Comprar por WhatsApp
                  </button>
                  <button type="button" onClick={handleInquiry} className="corex-btn-gradient corex-btn-gradient--md flex-1">
                    Consultar
                  </button>
                </div>

                <p className="mt-4 text-center text-xs text-gray-500">* Precios sujetos a disponibilidad de stock</p>
              </div>
            </div>
          </div>

          {relatedProducts.length > 0 && (
            <div className="mt-12">
              <SectionHeader title="Productos Relacionados" linkTo="/products" />
              <div className="corex-grid-4">
                {relatedProducts.map((relProduct) => (
                  <ProductCard key={relProduct.id} product={relProduct} />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default ProductDetailPage;