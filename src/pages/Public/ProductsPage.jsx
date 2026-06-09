// Archivo: ProductsPage.jsx
// CoreX - Generado automáticamente

/* ========================================================================== */
/*                                                                            */
/*  📄 ARCHIVO: ProductsPage.jsx                                              */
/*  📁 UBICACIÓN: frontend/src/pages/Public/ProductsPage.jsx                  */
/*  🚀 MÓDULO: Páginas Públicas                                               */
/*  🏷️  VERSIÓN: v1.0.0                                                      */
/*  📅 ÚLTIMA ACTUALIZACIÓN: 2026-05-22 10:30                                 */
/*  👨‍💻 AUTOR: CoreX Team                                                      */
/*                                                                            */
/* ========================================================================== */
/*                                                                            */
/*  🎯 PROPÓSITO                                                              */
/*  ------------------------------------------------------------------------  */
/*  Página de catálogo de productos del sitio CoreX. Muestra todos los       */
/*  productos disponibles con filtros por categoría, condición y búsqueda,   */
/*  y paginación para facilitar la navegación.                               */
/*                                                                            */
/*  🧩 FUNCIONALIDADES PRINCIPALES                                            */
/*  ------------------------------------------------------------------------  */
/*  ✅ Listar productos con paginación                                        */
/*  ✅ Filtrar por categoría                                                  */
/*  ✅ Filtrar por condición (nuevo/segunda)                                  */
/*  ✅ Búsqueda por nombre de producto                                        */
/*  ✅ Vista de cuadrícula de productos                                       */
/*  ✅ Enlaces de WhatsApp para cada producto                                 */
/*                                                                            */
/*  📦 DEPENDENCIAS                                                           */
/*  ------------------------------------------------------------------------  */
/*  • React - Librería principal                                              */
/*  • useState, useEffect - Hooks de React                                    */
/*  • useSearchParams - Manejo de query params                                */
/*  • ProductCard - Componente de tarjeta de producto                         */
/*  • FilterBar - Componente de filtros                                       */
/*  • Pagination - Componente de paginación                                   */
/*  • useProducts - Hook personalizado para productos                         */
/*                                                                            */
/*  🔗 RELACIONES                                                             */
/*  ------------------------------------------------------------------------  */
/*  • Importado por: AppRoutes.js                                             */
/*  • Usa: ProductCard, FilterBar, Pagination, useProducts                    */
/*  • Navega a: /products/:id para detalle                                    */
/*                                                                            */
/*  ⚠️ NOTAS IMPORTANTES                                                      */
/*  ------------------------------------------------------------------------  */
/*  • Los filtros se sincronizan con la URL                                   */
/*  • La paginación es del lado del servidor                                  */
/*  • Soporta vista de grid y lista (futuro)                                  */
/*                                                                            */
/*  🛠️ HISTORIAL DE CAMBIOS                                                   */
/*  ------------------------------------------------------------------------  */
/*  [v1.0.0] - 2026-05-22                                                    */
/*      ✅ Creación inicial                                                   */
/*      ✅ Listado de productos                                               */
/*      ✅ Filtros y búsqueda                                                 */
/*      ✅ Paginación                                                         */
/*      ✅ Integración con URL params                                         */
/*                                                                            */
/* ========================================================================== */

import React, { useState, useEffect, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import ProductCard from '../../components/common/ProductCard';
import FilterBar from '../../components/common/FilterBar';
import Pagination from '../../components/common/Pagination';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import { useProducts } from '../../hooks/useProducts';

/* ========================================================================== */
/*  CONFIGURACIÓN                                                             */
/* ========================================================================== */

const PRODUCTS_PER_PAGE = 12;

/* ========================================================================== */
/*  COMPONENTE PRINCIPAL                                                      */
/* ========================================================================== */

const ProductsPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { getProducts, loading, error } = useProducts();
  
  const [products, setProducts] = useState([]);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalItems: 0
  });
  const [filters, setFilters] = useState({
    categoria_id: searchParams.get('categoria') || '',
    condicion: searchParams.get('condicion') || '',
    search: searchParams.get('search') || ''
  });

  /* ========================================================================= */
  /*  CARGAR PRODUCTOS                                                         */
  /* ========================================================================= */

  const loadProducts = useCallback(async () => {
    const page = parseInt(searchParams.get('page')) || 1;
    
    const params = {
      page,
      limit: PRODUCTS_PER_PAGE,
      ...filters
    };
    
    // Limpiar parámetros vacíos
    Object.keys(params).forEach(key => {
      if (!params[key]) delete params[key];
    });
    
    const result = await getProducts(params);
    
    if (result) {
      setProducts(result.data || []);
      setPagination({
        currentPage: result.pagination?.page || page,
        totalPages: result.pagination?.totalPages || 1,
        totalItems: result.pagination?.total || 0
      });
    }
  }, [filters, searchParams, getProducts]);

  useEffect(() => {
    loadProducts();
  }, [loadProducts]);

  /* ========================================================================= */
  /*  MANEJAR FILTROS                                                          */
  /* ========================================================================= */

  const handleFilterChange = (newFilters) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
    // Resetear a página 1 cuando cambian los filtros
    searchParams.delete('page');
    setSearchParams(searchParams);
  };

  const handleSearch = (searchTerm) => {
    setFilters(prev => ({ ...prev, search: searchTerm }));
    searchParams.delete('page');
    if (searchTerm) {
      searchParams.set('search', searchTerm);
    } else {
      searchParams.delete('search');
    }
    setSearchParams(searchParams);
  };

  const handleClearFilters = () => {
    setFilters({
      categoria_id: '',
      condicion: '',
      search: ''
    });
    searchParams.delete('categoria');
    searchParams.delete('condicion');
    searchParams.delete('search');
    searchParams.delete('page');
    setSearchParams(searchParams);
  };

  /* ========================================================================= */
  /*  MANEJAR PAGINACIÓN                                                       */
  /* ========================================================================= */

  const handlePageChange = (page) => {
    searchParams.set('page', page);
    setSearchParams(searchParams);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  /* ========================================================================= */
  /*  RENDERIZADO                                                              */
  /* ========================================================================= */

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 py-8">
        
        {/* Encabezado */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">
            Catálogo de Productos
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            Explora todos nuestros productos, desde celulares hasta accesorios
          </p>
        </div>

        {/* Barra de filtros */}
        <FilterBar
          filters={filters}
          onFilterChange={handleFilterChange}
          onSearch={handleSearch}
          onClearFilters={handleClearFilters}
        />

        {/* Resultados */}
        <div className="mb-4 flex justify-between items-center">
          <p className="text-gray-600 dark:text-gray-400 text-sm">
            {pagination.totalItems > 0 ? (
              <>Mostrando {products.length} de {pagination.totalItems} productos</>
            ) : (
              !loading && 'No se encontraron productos'
            )}
          </p>
        </div>

        {/* Grid de productos */}
        {loading ? (
          <div className="flex justify-center py-12">
            <LoadingSpinner />
          </div>
        ) : error ? (
          <div className="text-center py-12">
            <div className="text-red-500 mb-2">⚠️</div>
            <p className="text-red-500">Error al cargar productos: {error}</p>
            <button
              onClick={loadProducts}
              className="mt-4 text-blue-600 hover:underline"
            >
              Reintentar
            </button>
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-lg shadow">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
              No se encontraron productos
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Intenta con otros filtros o realiza una nueva búsqueda
            </p>
            <button
              onClick={handleClearFilters}
              className="mt-4 text-blue-600 hover:underline"
            >
              Limpiar filtros
            </button>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
            
            {/* Paginación */}
            {pagination.totalPages > 1 && (
              <div className="mt-8">
                <Pagination
                  currentPage={pagination.currentPage}
                  totalPages={pagination.totalPages}
                  onPageChange={handlePageChange}
                />
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default ProductsPage;