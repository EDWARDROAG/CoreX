// Archivo: AdminProducts.jsx
// CoreX - Generado automáticamente

/* ========================================================================== */
/*                                                                            */
/*  📄 ARCHIVO: AdminProducts.jsx                                             */
/*  📁 UBICACIÓN: frontend/src/pages/Admin/AdminProducts.jsx                  */
/*  🚀 MÓDULO: Páginas de Administración                                      */
/*  🏷️  VERSIÓN: v1.0.0                                                      */
/*  📅 ÚLTIMA ACTUALIZACIÓN: 2026-05-22 10:30                                 */
/*  👨‍💻 AUTOR: CoreX Team                                                      */
/*                                                                            */
/* ========================================================================== */
/*                                                                            */
/*  🎯 PROPÓSITO                                                              */
/*  ------------------------------------------------------------------------  */
/*  Página de administración de productos del sistema CoreX. Permite al      */
/*  administrador gestionar todo el catálogo de productos, incluyendo        */
/*  creación, edición, eliminación, y gestión de stock.                     */
/*                                                                            */
/*  🧩 FUNCIONALIDADES PRINCIPALES                                            */
/*  ------------------------------------------------------------------------  */
/*  ✅ Listar productos con filtros y paginación                              */
/*  ✅ Crear nuevo producto                                                   */
/*  ✅ Editar producto existente                                              */
/*  ✅ Eliminar producto                                                      */
/*  ✅ Marcar producto como vendido                                           */
/*  ✅ Actualización masiva de precios                                        */
/*  ✅ Subir imágenes de productos                                            */
/*                                                                            */
/*  📦 DEPENDENCIAS                                                           */
/*  ------------------------------------------------------------------------  */
/*  • React - Librería principal                                              */
/*  • useState, useEffect - Hooks de React                                    */
/*  • ProductForm - Componente de formulario de producto                      */
/*  • useProducts - Hook personalizado para productos                         */
/*  • useCategories - Hook personalizado para categorías                      */
/*                                                                            */
/*  🔗 RELACIONES                                                             */
/*  ------------------------------------------------------------------------  */
/*  • Importado por: AppRoutes.js                                             */
/*  • Usa: ProductForm, useProducts, useCategories                            */
/*  • Navega a: /admin/products/new, /admin/products/edit/:id                 */
/*                                                                            */
/*  ⚠️ NOTAS IMPORTANTES                                                      */
/*  ------------------------------------------------------------------------  */
/*  • Solo accesible por usuarios administradores                             */
/*  • Soporta subida de imágenes con optimización automática                  */
/*  • Actualización masiva de precios por porcentaje                          */
/*                                                                            */
/*  🛠️ HISTORIAL DE CAMBIOS                                                   */
/*  ------------------------------------------------------------------------  */
/*  [v1.0.0] - 2026-05-22                                                    */
/*      ✅ Creación inicial                                                   */
/*      ✅ Listado de productos                                               */
/*      ✅ Filtros y búsqueda                                                 */
/*      ✅ Paginación                                                         */
/*      ✅ Modal de confirmación para eliminar                                */
/*      ✅ Actualización masiva de precios                                    */
/*                                                                            */
/* ========================================================================== */

import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { useProducts } from '../../hooks/useProducts';
import { useCategories } from '../../hooks/useCategories';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import { getMediaUrl } from '../../utils/media';

/* ========================================================================== */
/*  CONFIGURACIÓN                                                             */
/* ========================================================================== */

const PRODUCTS_PER_PAGE = 10;

/* ========================================================================== */
/*  COMPONENTE PRINCIPAL                                                      */
/* ========================================================================== */

const AdminProducts = () => {
  const { 
    getProducts, 
    deleteProduct, 
    markAsSold, 
    bulkUpdatePrices,
    loading 
  } = useProducts();
  const { getCategories } = useCategories();
  
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalItems: 0
  });
  const [filters, setFilters] = useState({
    categoria_id: '',
    condicion: '',
    search: ''
  });
  const [showBulkPriceModal, setShowBulkPriceModal] = useState(false);
  const [bulkPricePercentage, setBulkPricePercentage] = useState('');
  const [productToDelete, setProductToDelete] = useState(null);
  const [productToMarkSold, setProductToMarkSold] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showProductForm, setShowProductForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  /* ========================================================================= */
  /*  CARGAR PRODUCTOS                                                         */
  /* ========================================================================= */

  const loadProducts = useCallback(async () => {
    setIsLoading(true);
    try {
      const params = {
        page: pagination.currentPage,
        limit: PRODUCTS_PER_PAGE,
        ...filters
      };
      
      // Limpiar filtros vacíos
      Object.keys(params).forEach(key => {
        if (!params[key]) delete params[key];
      });
      
      const result = await getProducts(params);
      
      if (result) {
        setProducts(result.data || []);
        setPagination({
          currentPage: result.pagination?.page || 1,
          totalPages: result.pagination?.totalPages || 1,
          totalItems: result.pagination?.total || 0
        });
      }
    } catch (err) {
      console.error('Error loading products:', err);
      setErrorMessage('Error al cargar los productos');
    } finally {
      setIsLoading(false);
    }
  }, [pagination.currentPage, filters, getProducts]);

  /* ========================================================================= */
  /*  CARGAR CATEGORÍAS                                                        */
  /* ========================================================================= */

  const loadCategories = useCallback(async () => {
    try {
      const cats = await getCategories();
      setCategories(cats || []);
    } catch (err) {
      console.error('Error loading categories:', err);
    }
  }, [getCategories]);

  useEffect(() => {
    loadProducts();
    loadCategories();
  }, [loadProducts, loadCategories]);

  /* ========================================================================= */
  /*  MANEJAR FILTROS                                                          */
  /* ========================================================================= */

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
    setPagination(prev => ({ ...prev, currentPage: 1 }));
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setPagination(prev => ({ ...prev, currentPage: 1 }));
    loadProducts();
  };

  const handleClearFilters = () => {
    setFilters({
      categoria_id: '',
      condicion: '',
      search: ''
    });
    setPagination(prev => ({ ...prev, currentPage: 1 }));
  };

  /* ========================================================================= */
  /*  MANEJAR PAGINACIÓN                                                       */
  /* ========================================================================= */

  const handlePageChange = (page) => {
    setPagination(prev => ({ ...prev, currentPage: page }));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  /* ========================================================================= */
  /*  MANEJAR ELIMINACIÓN                                                      */
  /* ========================================================================= */

  const handleDeleteClick = (product) => {
    setProductToDelete(product);
  };

  const handleConfirmDelete = async () => {
    if (!productToDelete) return;
    
    try {
      await deleteProduct(productToDelete.id);
      setSuccessMessage(`Producto "${productToDelete.nombre}" eliminado`);
      setProductToDelete(null);
      loadProducts();
      
      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (err) {
      console.error('Error deleting product:', err);
      setErrorMessage('Error al eliminar el producto');
      setTimeout(() => setErrorMessage(''), 3000);
    }
  };

  /* ========================================================================= */
  /*  MANEJAR MARCAR COMO VENDIDO                                              */
  /* ========================================================================= */

  const handleMarkSoldClick = (product) => {
    setProductToMarkSold(product);
  };

  const handleConfirmMarkSold = async () => {
    if (!productToMarkSold) return;
    
    try {
      await markAsSold(productToMarkSold.id);
      setSuccessMessage(`Producto "${productToMarkSold.nombre}" marcado como vendido`);
      setProductToMarkSold(null);
      loadProducts();
      
      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (err) {
      console.error('Error marking product as sold:', err);
      setErrorMessage('Error al marcar producto como vendido');
      setTimeout(() => setErrorMessage(''), 3000);
    }
  };

  /* ========================================================================= */
  /*  MANEJAR ACTUALIZACIÓN MASIVA DE PRECIOS                                  */
  /* ========================================================================= */

  const handleBulkPriceUpdate = async () => {
    const percentage = parseFloat(bulkPricePercentage);
    
    if (isNaN(percentage)) {
      setErrorMessage('Ingrese un porcentaje válido');
      return;
    }
    
    try {
      const result = await bulkUpdatePrices(percentage);
      setSuccessMessage(`${result.length} productos actualizados con ${percentage}%`);
      setShowBulkPriceModal(false);
      setBulkPricePercentage('');
      loadProducts();
      
      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (err) {
      console.error('Error updating prices:', err);
      setErrorMessage('Error al actualizar precios');
      setTimeout(() => setErrorMessage(''), 3000);
    }
  };

  /* ========================================================================= */
  /*  RENDERIZADO DE PRODUCTOS                                                 */
  /* ========================================================================= */

  const renderProductRow = (product) => {
    return (
      <tr key={product.id} className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800">
        <td className="px-4 py-3">
          <img 
            src={getMediaUrl(product.imagen_url) || undefined}
            alt={product.nombre}
            className="w-12 h-12 object-cover rounded bg-gray-100"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = '';
              e.target.classList.add('opacity-40');
            }}
          />
        </td>
        <td className="px-4 py-3">
          <p className="font-medium text-gray-800 dark:text-white">{product.nombre}</p>
          <p className="text-xs text-gray-500">{product.categoria_nombre}</p>
        </td>
        <td className="px-4 py-3">
          <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
            product.condicion === 'nuevo' 
              ? 'bg-green-100 text-green-700' 
              : 'bg-orange-100 text-orange-700'
          }`}>
            {product.condicion === 'nuevo' ? '🆕 Nuevo' : '🔄 Segunda'}
          </span>
        </td>
        <td className="px-4 py-3 font-semibold text-blue-600 dark:text-blue-400">
          ${product.precio?.toLocaleString('es-CO')}
        </td>
        <td className="px-4 py-3">
          <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
            product.stock === 1 
              ? 'bg-green-100 text-green-700' 
              : 'bg-red-100 text-red-700'
          }`}>
            {product.stock === 1 ? '✅ Disponible' : '❌ Vendido'}
          </span>
        </td>
        <td className="px-4 py-3">
          <div className="flex gap-2">
            <Link
              to={`/admin/products/edit/${product.id}`}
              className="text-blue-600 hover:text-blue-800 dark:text-blue-400"
            >
              ✏️
            </Link>
            {product.stock === 1 && (
              <button
                onClick={() => handleMarkSoldClick(product)}
                className="text-green-600 hover:text-green-800 dark:text-green-400"
              >
                💰
              </button>
            )}
            <button
              onClick={() => handleDeleteClick(product)}
              className="text-red-600 hover:text-red-800 dark:text-red-400"
            >
              🗑️
            </button>
          </div>
        </td>
      </tr>
    );
  };

  /* ========================================================================= */
  /*  RENDERIZADO DE PAGINACIÓN                                                */
  /* ========================================================================= */

  const renderPagination = () => {
    const { currentPage, totalPages } = pagination;
    if (totalPages <= 1) return null;
    
    const pages = [];
    const maxVisible = 5;
    let startPage = Math.max(1, currentPage - Math.floor(maxVisible / 2));
    let endPage = Math.min(totalPages, startPage + maxVisible - 1);
    
    if (endPage - startPage + 1 < maxVisible) {
      startPage = Math.max(1, endPage - maxVisible + 1);
    }
    
    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }
    
    return (
      <div className="flex justify-center gap-2 mt-6">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-3 py-1 border rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100 dark:hover:bg-gray-700"
        >
          ←
        </button>
        {pages.map(page => (
          <button
            key={page}
            onClick={() => handlePageChange(page)}
            className={`px-3 py-1 border rounded ${
              page === currentPage 
                ? 'bg-blue-600 text-white border-blue-600' 
                : 'hover:bg-gray-100 dark:hover:bg-gray-700'
            }`}
          >
            {page}
          </button>
        ))}
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-3 py-1 border rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100 dark:hover:bg-gray-700"
        >
          →
        </button>
      </div>
    );
  };

  /* ========================================================================= */
  /*  RENDERIZADO PRINCIPAL                                                    */
  /* ========================================================================= */

  return (
    <div className="space-y-6">
      
      {/* Encabezado */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
            Productos
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Gestiona el catálogo de productos
          </p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={() => setShowBulkPriceModal(true)}
            className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition"
          >
            Actualizar Precios
          </button>
          <Link
            to="/admin/products/new"
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            + Nuevo Producto
          </Link>
        </div>
      </div>

      {/* Mensajes de éxito/error */}
      {successMessage && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-2 rounded">
          {successMessage}
        </div>
      )}
      {errorMessage && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded">
          {errorMessage}
        </div>
      )}

      {/* Filtros */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
        <form onSubmit={handleSearch} className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <input
            type="text"
            name="search"
            value={filters.search}
            onChange={handleFilterChange}
            placeholder="Buscar producto..."
            className="px-3 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600"
          />
          <select
            name="categoria_id"
            value={filters.categoria_id}
            onChange={handleFilterChange}
            className="px-3 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600"
          >
            <option value="">Todas las categorías</option>
            {categories.map(cat => (
              <option key={cat.id} value={cat.id}>{cat.nombre}</option>
            ))}
          </select>
          <select
            name="condicion"
            value={filters.condicion}
            onChange={handleFilterChange}
            className="px-3 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600"
          >
            <option value="">Todas las condiciones</option>
            <option value="nuevo">Nuevo</option>
            <option value="segunda">Segunda</option>
          </select>
          <div className="flex gap-2">
            <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
              Buscar
            </button>
            <button
              type="button"
              onClick={handleClearFilters}
              className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400"
            >
              Limpiar
            </button>
          </div>
        </form>
      </div>

      {/* Tabla de productos */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
        {isLoading ? (
          <div className="flex justify-center py-12">
            <LoadingSpinner />
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500">No hay productos registrados</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 dark:bg-gray-700">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Imagen</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Producto</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Condición</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Precio</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Stock</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {products.map(renderProductRow)}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Paginación */}
      {renderPagination()}

      {/* Modal de confirmación para eliminar */}
      {productToDelete && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-md w-full mx-4">
            <h2 className="text-xl font-bold mb-4">Confirmar Eliminación</h2>
            <p className="mb-6">
              ¿Estás seguro de eliminar el producto <strong>"{productToDelete.nombre}"</strong>?
              Esta acción no se puede deshacer.
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setProductToDelete(null)}
                className="px-4 py-2 border rounded-lg hover:bg-gray-100"
              >
                Cancelar
              </button>
              <button
                onClick={handleConfirmDelete}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
              >
                Eliminar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal de confirmación para marcar como vendido */}
      {productToMarkSold && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-md w-full mx-4">
            <h2 className="text-xl font-bold mb-4">Confirmar Venta</h2>
            <p className="mb-6">
              ¿Marcar <strong>"{productToMarkSold.nombre}"</strong> como vendido?
              El producto dejará de aparecer como disponible.
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setProductToMarkSold(null)}
                className="px-4 py-2 border rounded-lg hover:bg-gray-100"
              >
                Cancelar
              </button>
              <button
                onClick={handleConfirmMarkSold}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
              >
                Marcar como Vendido
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal de actualización masiva de precios */}
      {showBulkPriceModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-md w-full mx-4">
            <h2 className="text-xl font-bold mb-4">Actualización Masiva de Precios</h2>
            <p className="mb-4 text-gray-600 dark:text-gray-400">
              Aplica un porcentaje de aumento o descuento a todos los productos disponibles.
            </p>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Porcentaje</label>
              <input
                type="number"
                value={bulkPricePercentage}
                onChange={(e) => setBulkPricePercentage(e.target.value)}
                placeholder="Ej: 10 (aumento) o -5 (descuento)"
                className="w-full px-3 py-2 border rounded-lg dark:bg-gray-700"
              />
              <p className="text-xs text-gray-500 mt-1">
                Valores positivos = aumento, negativos = descuento
              </p>
            </div>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowBulkPriceModal(false)}
                className="px-4 py-2 border rounded-lg hover:bg-gray-100"
              >
                Cancelar
              </button>
              <button
                onClick={handleBulkPriceUpdate}
                className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
              >
                Aplicar Cambios
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminProducts;