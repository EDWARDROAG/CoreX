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
import PageHero from '../../components/ui/PageHero';
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
    <>
      <PageHero
        title="PC Gamer & Catálogo"
        subtitle="Explora equipos, periféricos y accesorios con el sello CoreX Technologies"
        breadcrumbs={[
          { label: 'Inicio', to: '/' },
          { label: 'Productos' },
        ]}
      />

      <div className="corex-section corex-section-alt">
        <div className="corex-container">
          <FilterBar
            filters={filters}
            onFilterChange={handleFilterChange}
            onSearch={handleSearch}
            onClearFilters={handleClearFilters}
          />

          <p className="mb-4 text-sm text-gray-500">
            {pagination.totalItems > 0 ? (
              <>Mostrando {products.length} de {pagination.totalItems} productos</>
            ) : (
              !loading && 'No se encontraron productos'
            )}
          </p>

          {loading ? (
            <div className="flex justify-center py-12">
              <LoadingSpinner />
            </div>
          ) : error ? (
            <div className="corex-empty-state">
              <p className="text-red-500">Error al cargar productos: {error}</p>
              <button type="button" onClick={loadProducts} className="corex-link mt-4">
                Reintentar
              </button>
            </div>
          ) : products.length === 0 ? (
            <div className="corex-empty-state">
              <h3 className="corex-section-title text-xl">No se encontraron productos</h3>
              <p className="corex-page-subtitle">Intenta con otros filtros o realiza una nueva búsqueda</p>
              <button type="button" onClick={handleClearFilters} className="corex-btn-gradient corex-btn-gradient--sm mt-6">
                Limpiar filtros
              </button>
            </div>
          ) : (
            <>
              <div className="corex-grid-4">
                {products.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>

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
    </>
  );
};

export default ProductsPage;