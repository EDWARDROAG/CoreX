// Archivo: HomePage.jsx
// CoreX - Generado automáticamente

/* ========================================================================== */
/*                                                                            */
/*  📄 ARCHIVO: HomePage.jsx                                                  */
/*  📁 UBICACIÓN: frontend/src/pages/Public/HomePage.jsx                      */
/*  🚀 MÓDULO: Páginas Públicas                                               */
/*  🏷️  VERSIÓN: v1.0.0                                                      */
/*  📅 ÚLTIMA ACTUALIZACIÓN: 2026-05-21 10:30                                 */
/*  👨‍💻 AUTOR: CoreX Team                                                      */
/*                                                                            */
/* ========================================================================== */
/*                                                                            */
/*  🎯 PROPÓSITO                                                              */
/*  ------------------------------------------------------------------------  */
/*  Página principal del sitio web CoreX. Muestra los productos destacados,  */
/*  las categorías de mantenimiento y venta, y un resumen de los servicios   */
/*  ofrecidos. Es la primera impresión que tienen los clientes.              */
/*                                                                            */
/*  🧩 FUNCIONALIDADES PRINCIPALES                                            */
/*  ------------------------------------------------------------------------  */
/*  ✅ Mostrar banner principal con llamado a la acción                       */
/*  ✅ Listar productos destacados                                            */
/*  ✅ Mostrar secciones de mantenimiento por categoría                       */
/*  ✅ Mostrar servicios ofrecidos                                            */
/*  ✅ Enlaces rápidos a categorías                                           */
/*  ✅ Botones de contacto por WhatsApp                                       */
/*                                                                            */
/*  📦 DEPENDENCIAS                                                           */
/*  ------------------------------------------------------------------------  */
/*  • React - Librería principal                                              */
/*  • useState, useEffect - Hooks de React                                    */
/*  • ProductCard - Componente de tarjeta de producto                         */
/*  • useProducts - Hook personalizado para productos                         */
/*  • useWhatsApp - Hook para enlaces de WhatsApp                             */
/*                                                                            */
/*  🔗 RELACIONES                                                             */
/*  ------------------------------------------------------------------------  */
/*  • Importado por: AppRoutes.js                                             */
/*  • Usa: ProductCard, useProducts, useWhatsApp                              */
/*  • Navega a: /products, /maintenance/:type                                 */
/*                                                                            */
/*  ⚠️ NOTAS IMPORTANTES                                                      */
/*  ------------------------------------------------------------------------  */
/*  • Los productos destacados se cargan desde la API                         */
/*  • Las categorías de mantenimiento son estáticas por ahora                 */
/*  • El banner debe ser responsivo para móviles                               */
/*                                                                            */
/*  🛠️ HISTORIAL DE CAMBIOS                                                   */
/*  ------------------------------------------------------------------------  */
/*  [v1.0.0] - 2026-05-21                                                    */
/*      ✅ Creación inicial                                                   */
/*      ✅ Banner principal                                                   */
/*      ✅ Productos destacados                                               */
/*      ✅ Secciones de mantenimiento                                         */
/*      ✅ Integración con WhatsApp                                           */
/*                                                                            */
/* ========================================================================== */

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ProductCard from '../../components/common/ProductCard';
import { useProducts } from '../../hooks/useProducts';
import { useWhatsApp } from '../../hooks/useWhatsApp';
import { getWhatsAppLink } from '../../utils/whatsappHelper';

/* ========================================================================== */
/*  COMPONENTE PRINCIPAL                                                      */
/* ========================================================================== */

const HomePage = () => {
  const { getFeaturedProducts, loading, error } = useProducts();
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { generateServiceLink } = useWhatsApp();

  /* ========================================================================= */
  /*  CATEGORÍAS DE SERVICIOS                                                  */
  /* ========================================================================= */

  const serviceCategories = [
    {
      id: 'celulares',
      title: 'Mantenimiento de Celulares',
      description: 'Reparación y mantenimiento de equipos móviles',
      icon: '📱',
      color: 'bg-blue-500',
      link: '/maintenance/celulares'
    },
    {
      id: 'computadores',
      title: 'Mantenimiento de Computadores',
      description: 'PC de escritorio, limpieza y reparación',
      icon: '💻',
      color: 'bg-green-500',
      link: '/maintenance/computadores'
    },
    {
      id: 'laptops',
      title: 'Mantenimiento de Laptops',
      description: 'Portátiles, cambio de piezas y optimización',
      icon: '🖥️',
      color: 'bg-purple-500',
      link: '/maintenance/laptops'
    },
    {
      id: 'impresoras',
      title: 'Mantenimiento de Impresoras',
      description: 'Impresoras de tinta y láser',
      icon: '🖨️',
      color: 'bg-orange-500',
      link: '/maintenance/impresoras'
    }
  ];

  /* ========================================================================= */
  /*  CATEGORÍAS DE VENTA                                                      */
  /* ========================================================================= */

  const saleCategories = [
    { id: 'celulares', name: 'Celulares', icon: '📱', link: '/products?categoria=celulares' },
    { id: 'laptops', name: 'Laptops', icon: '💻', link: '/products?categoria=laptops' },
    { id: 'computadores', name: 'Computadores', icon: '🖥️', link: '/products?categoria=computadores' },
    { id: 'impresoras', name: 'Impresoras', icon: '🖨️', link: '/products?categoria=impresoras' },
    { id: 'accesorios', name: 'Accesorios', icon: '🎧', link: '/products?categoria=accesorios' }
  ];

  /* ========================================================================= */
  /*  CARGAR PRODUCTOS DESTACADOS                                              */
  /* ========================================================================= */

  useEffect(() => {
    const loadFeaturedProducts = async () => {
      setIsLoading(true);
      try {
        const products = await getFeaturedProducts(8);
        setFeaturedProducts(products);
      } catch (err) {
        console.error('Error loading featured products:', err);
      } finally {
        setIsLoading(false);
      }
    };

    loadFeaturedProducts();
  }, []);

  /* ========================================================================= */
  /*  RENDERIZADO                                                              */
  /* ========================================================================= */

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      
      {/* ===================================================================== */}
      {/* BANNER PRINCIPAL                                                      */}
      {/* ===================================================================== */}
      <section className="relative bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="relative container mx-auto px-4 py-20 md:py-32">
          <div className="max-w-2xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              CoreX - Soluciones Tecnológicas
            </h1>
            <p className="text-lg md:text-xl mb-6 opacity-90">
              Mantenimiento, venta de equipos nuevos y usados, accesorios y más.
              ¡Todo lo que necesitas en un solo lugar!
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                to="/products"
                className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition text-center"
              >
                Ver Productos
              </Link>
              <a
                href={getWhatsAppLink('general')}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-green-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-600 transition text-center"
              >
                Consultar por WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ===================================================================== */}
      {/* SERVICIOS DE MANTENIMIENTO                                             */}
      {/* ===================================================================== */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-3">
            Servicios de Mantenimiento
          </h2>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Ofrecemos mantenimiento preventivo y correctivo para todo tipo de dispositivos
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {serviceCategories.map((service) => (
            <div
              key={service.id}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-lg transition p-6 text-center"
            >
              <div className={`${service.color} w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-3xl`}>
                {service.icon}
              </div>
              <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
                {service.title}
              </h3>
              <p className="text-gray-500 dark:text-gray-400 text-sm mb-4">
                {service.description}
              </p>
              <Link
                to={service.link}
                className="text-blue-600 dark:text-blue-400 hover:underline text-sm font-medium"
              >
                Ver más →
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* ===================================================================== */}
      {/* PRODUCTOS DESTACADOS                                                   */}
      {/* ===================================================================== */}
      <section className="bg-gray-100 dark:bg-gray-800 py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-3">
              Productos Destacados
            </h2>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Los productos más populares de nuestro catálogo
            </p>
          </div>

          {isLoading ? (
            <div className="flex justify-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
          ) : error ? (
            <div className="text-center text-red-500 py-12">
              Error al cargar productos: {error}
            </div>
          ) : featuredProducts.length === 0 ? (
            <div className="text-center text-gray-500 dark:text-gray-400 py-12">
              No hay productos destacados disponibles
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {featuredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}

          <div className="text-center mt-10">
            <Link
              to="/products"
              className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
            >
              Ver todos los productos
            </Link>
          </div>
        </div>
      </section>

      {/* ===================================================================== */}
      {/* CATEGORÍAS DE VENTA                                                   */}
      {/* ===================================================================== */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-3">
            Categorías de Venta
          </h2>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Explora nuestro catálogo por categoría
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {saleCategories.map((category) => (
            <Link
              key={category.id}
              to={category.link}
              className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 text-center hover:shadow-lg transition group"
            >
              <div className="text-4xl mb-3 group-hover:scale-110 transition">
                {category.icon}
              </div>
              <h3 className="text-gray-800 dark:text-white font-medium">
                {category.name}
              </h3>
            </Link>
          ))}
        </div>
      </section>

      {/* ===================================================================== */}
      {/* LLAMADO A LA ACCIÓN FINAL                                             */}
      {/* ===================================================================== */}
      <section className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">
            ¿Necesitas ayuda o tienes dudas?
          </h2>
          <p className="text-lg mb-6 opacity-90 max-w-2xl mx-auto">
            Contáctanos por WhatsApp y te atenderemos de inmediato
          </p>
          <a
            href={getWhatsAppLink('general')}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-green-500 text-white px-8 py-3 rounded-lg font-semibold hover:bg-green-600 transition text-lg"
          >
            <span>📱</span>
            Escríbenos por WhatsApp
          </a>
        </div>
      </section>
    </div>
  );
};

export default HomePage;