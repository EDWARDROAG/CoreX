// Archivo: FilterBar.jsx
// CoreX - Generado automáticamente

/* ========================================================================== */
/*                                                                            */
/*  📄 ARCHIVO: FilterBar.jsx                                                 */
/*  📁 UBICACIÓN: frontend/src/components/common/FilterBar.jsx                */
/*  🚀 MÓDULO: Componentes Comunes                                            */
/*  🏷️  VERSIÓN: v1.0.0                                                      */
/*  📅 ÚLTIMA ACTUALIZACIÓN: 2026-05-22 10:30                                 */
/*  👨‍💻 AUTOR: CoreX Team                                                      */
/*                                                                            */
/* ========================================================================== */
/*                                                                            */
/*  🎯 PROPÓSITO                                                              */
/*  ------------------------------------------------------------------------  */
/*  Barra de filtros para la página de productos. Permite filtrar por        */
/*  categoría, condición (nuevo/segunda) y búsqueda por nombre.              */
/*                                                                            */
/*  🧩 FUNCIONALIDADES PRINCIPALES                                            */
/*  ------------------------------------------------------------------------  */
/*  ✅ Filtro por categoría                                                   */
/*  ✅ Filtro por condición (nuevo/segunda)                                   */
/*  ✅ Búsqueda por nombre de producto                                        */
/*  ✅ Botón para limpiar todos los filtros                                   */
/*  ✅ Contador de filtros activos                                            */
/*  ✅ Diseño responsivo                                                      */
/*                                                                            */
/*  📦 DEPENDENCIAS                                                           */
/*  ------------------------------------------------------------------------  */
/*  • React - Librería principal                                              */
/*  • useState, useEffect - Hooks de React                                    */
/*  • useCategories - Hook personalizado para categorías                      */
/*                                                                            */
/*  🔗 RELACIONES                                                             */
/*  ------------------------------------------------------------------------  */
/*  • Importado por: ProductsPage                                             */
/*  • Usa: useCategories                                                      */
/*                                                                            */
/*  ⚠️ NOTAS IMPORTANTES                                                      */
/*  ------------------------------------------------------------------------  */
/*  • Los filtros se sincronizan con la URL                                   */
/*  • El botón de limpiar resetea todos los filtros                           */
/*  • El buscador tiene debounce para evitar muchas peticiones                */
/*                                                                            */
/*  🛠️ HISTORIAL DE CAMBIOS                                                   */
/*  ------------------------------------------------------------------------  */
/*  [v1.0.0] - 2026-05-22                                                    */
/*      ✅ Creación inicial                                                   */
/*      ✅ Filtro por categoría                                               */
/*      ✅ Filtro por condición                                               */
/*      ✅ Búsqueda                                                           */
/*      ✅ Limpiar filtros                                                    */
/*      ✅ Contador de activos                                                */
/*                                                                            */
/* ========================================================================== */

import React, { useState, useEffect, useCallback } from 'react';
import { useCategories } from '../../hooks/useCategories';

/* ========================================================================== */
/*  COMPONENTE PRINCIPAL                                                      */
/* ========================================================================== */

const FilterBar = ({ filters = {}, onFilterChange, onSearch, onClearFilters }) => {
  const { getCategories, loading: categoriesLoading } = useCategories();
  
  const [categories, setCategories] = useState([]);
  const [localFilters, setLocalFilters] = useState({
    categoria_id: filters.categoria_id || '',
    condicion: filters.condicion || '',
    search: filters.search || ''
  });
  const [searchTerm, setSearchTerm] = useState(filters.search || '');
  const [activeFiltersCount, setActiveFiltersCount] = useState(0);

  /* ========================================================================= */
  /*  CARGAR CATEGORÍAS                                                        */
  /* ========================================================================= */

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const data = await getCategories();
        setCategories(data || []);
      } catch (err) {
        console.error('Error loading categories:', err);
      }
    };
    loadCategories();
  }, [getCategories]);

  /* ========================================================================= */
  /*  CONTAR FILTROS ACTIVOS                                                   */
  /* ========================================================================= */

  useEffect(() => {
    let count = 0;
    if (localFilters.categoria_id) count++;
    if (localFilters.condicion) count++;
    if (localFilters.search) count++;
    setActiveFiltersCount(count);
  }, [localFilters]);

  /* ========================================================================= */
  /*  MANEJAR CAMBIO DE FILTRO                                                 */
  /* ========================================================================= */

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    const newFilters = { ...localFilters, [name]: value };
    setLocalFilters(newFilters);
    
    if (onFilterChange) {
      onFilterChange({ [name]: value });
    }
  };

  /* ========================================================================= */
  /*  MANEJAR BÚSQUEDA CON DEBOUNCE                                            */
  /* ========================================================================= */

  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchTerm !== localFilters.search) {
        const newFilters = { ...localFilters, search: searchTerm };
        setLocalFilters(newFilters);
        
        if (onSearch) {
          onSearch(searchTerm);
        }
      }
    }, 500);
    
    return () => clearTimeout(timer);
  }, [searchTerm]);

  /* ========================================================================= */
  /*  MANEJAR BÚSQUEDA INMEDIATA (AL PRESIONAR ENTER)                          */
  /* ========================================================================= */

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    const newFilters = { ...localFilters, search: searchTerm };
    setLocalFilters(newFilters);
    
    if (onSearch) {
      onSearch(searchTerm);
    }
  };

  /* ========================================================================= */
  /*  LIMPIAR FILTROS                                                          */
  /* ========================================================================= */

  const handleClearFilters = () => {
    setLocalFilters({
      categoria_id: '',
      condicion: '',
      search: ''
    });
    setSearchTerm('');
    
    if (onClearFilters) {
      onClearFilters();
    }
  };

  /* ========================================================================= */
  /*  RENDERIZADO DE OPCIONES DE CATEGORÍA                                     */
  /* ========================================================================= */

  const renderCategoryOptions = () => {
    if (categoriesLoading) {
      return <option>Cargando...</option>;
    }
    
    return (
      <>
        <option value="">Todas las categorías</option>
        {categories.map(category => (
          <option key={category.id} value={category.id}>
            {category.icon && <span>{category.icon}</span>} {category.nombre}
          </option>
        ))}
      </>
    );
  };

  /* ========================================================================= */
  /*  RENDERIZADO DE OPCIONES DE CONDICIÓN                                     */
  /* ========================================================================= */

  const renderConditionOptions = () => {
    return (
      <>
        <option value="">Todas las condiciones</option>
        <option value="nuevo">🆕 Nuevo</option>
        <option value="segunda">🔄 Segunda Mano</option>
      </>
    );
  };

  /* ========================================================================= */
  /*  RENDERIZADO PRINCIPAL                                                    */
  /* ========================================================================= */

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 mb-6">
      <div className="flex flex-wrap items-end gap-4">
        
        {/* Búsqueda */}
        <div className="flex-1 min-w-[200px]">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Buscar producto
          </label>
          <form onSubmit={handleSearchSubmit} className="relative">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Nombre del producto..."
              className="w-full px-4 py-2 pl-10 border rounded-lg dark:bg-gray-700 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <div className="absolute left-3 top-2.5 text-gray-400">🔍</div>
          </form>
        </div>

        {/* Categoría */}
        <div className="w-full sm:w-48">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Categoría
          </label>
          <select
            name="categoria_id"
            value={localFilters.categoria_id}
            onChange={handleFilterChange}
            className="w-full px-3 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 focus:ring-2 focus:ring-blue-500"
          >
            {renderCategoryOptions()}
          </select>
        </div>

        {/* Condición */}
        <div className="w-full sm:w-40">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Condición
          </label>
          <select
            name="condicion"
            value={localFilters.condicion}
            onChange={handleFilterChange}
            className="w-full px-3 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 focus:ring-2 focus:ring-blue-500"
          >
            {renderConditionOptions()}
          </select>
        </div>

        {/* Botón limpiar */}
        <div className="flex items-center gap-2">
          {activeFiltersCount > 0 && (
            <button
              onClick={handleClearFilters}
              className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition flex items-center gap-2"
            >
              <span>✕</span>
              <span>Limpiar ({activeFiltersCount})</span>
            </button>
          )}
        </div>
      </div>

      {/* Filtros activos (badges) */}
      {activeFiltersCount > 0 && (
        <div className="flex flex-wrap gap-2 mt-4 pt-3 border-t border-gray-200 dark:border-gray-700">
          {localFilters.categoria_id && (
            <span className="inline-flex items-center gap-1 px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full text-xs">
              📁 {categories.find(c => c.id == localFilters.categoria_id)?.nombre || 'Categoría'}
              <button
                onClick={() => {
                  const newFilters = { ...localFilters, categoria_id: '' };
                  setLocalFilters(newFilters);
                  if (onFilterChange) onFilterChange({ categoria_id: '' });
                }}
                className="ml-1 hover:text-blue-900"
              >
                ✕
              </button>
            </span>
          )}
          
          {localFilters.condicion && (
            <span className="inline-flex items-center gap-1 px-2 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 rounded-full text-xs">
              {localFilters.condicion === 'nuevo' ? '🆕 Nuevo' : '🔄 Segunda'}
              <button
                onClick={() => {
                  const newFilters = { ...localFilters, condicion: '' };
                  setLocalFilters(newFilters);
                  if (onFilterChange) onFilterChange({ condicion: '' });
                }}
                className="ml-1 hover:text-green-900"
              >
                ✕
              </button>
            </span>
          )}
          
          {localFilters.search && (
            <span className="inline-flex items-center gap-1 px-2 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 rounded-full text-xs">
              🔍 {localFilters.search}
              <button
                onClick={() => {
                  setSearchTerm('');
                  const newFilters = { ...localFilters, search: '' };
                  setLocalFilters(newFilters);
                  if (onSearch) onSearch('');
                }}
                className="ml-1 hover:text-purple-900"
              >
                ✕
              </button>
            </span>
          )}
        </div>
      )}
    </div>
  );
};

export default FilterBar;