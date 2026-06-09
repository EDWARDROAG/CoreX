// Archivo: ProductForm.jsx
// CoreX - Generado automáticamente

/* ========================================================================== */
/*                                                                            */
/*  📄 ARCHIVO: ProductForm.jsx                                               */
/*  📁 UBICACIÓN: frontend/src/components/admin/ProductForm.jsx               */
/*  🚀 MÓDULO: Componentes de Administración                                  */
/*  🏷️  VERSIÓN: v1.0.0                                                      */
/*  📅 ÚLTIMA ACTUALIZACIÓN: 2026-05-22 10:30                                 */
/*  👨‍💻 AUTOR: CoreX Team                                                      */
/*                                                                            */
/* ========================================================================== */
/*                                                                            */
/*  🎯 PROPÓSITO                                                              */
/*  ------------------------------------------------------------------------  */
/*  Formulario para la creación y edición de productos. Permite al admin     */
/*  ingresar toda la información del producto, incluyendo imágenes,          */
/*  precios, categorías y condición.                                         */
/*                                                                            */
/*  🧩 FUNCIONALIDADES PRINCIPALES                                            */
/*  ------------------------------------------------------------------------  */
/*  ✅ Crear nuevo producto                                                   */
/*  ✅ Editar producto existente                                              */
/*  ✅ Subir y previsualizar imagen                                           */
/*  ✅ Seleccionar categoría                                                  */
/*  ✅ Seleccionar condición (nuevo/segunda)                                  */
/*  ✅ Marcar como destacado                                                  */
/*  ✅ Validaciones de campos                                                 */
/*                                                                            */
/*  📦 DEPENDENCIAS                                                           */
/*  ------------------------------------------------------------------------  */
/*  • React - Librería principal                                              */
/*  • useState, useEffect - Hooks de React                                    */
/*  • useNavigate, useParams - React Router DOM                               */
/*  • useProducts - Hook personalizado para productos                         */
/*  • useCategories - Hook personalizado para categorías                      */
/*                                                                            */
/*  🔗 RELACIONES                                                             */
/*  ------------------------------------------------------------------------  */
/*  • Importado por: AdminProducts                                            */
/*  • Usa: useProducts, useCategories                                         */
/*                                                                            */
/*  ⚠️ NOTAS IMPORTANTES                                                      */
/*  ------------------------------------------------------------------------  */
/*  • Solo accesible por administradores                                      */
/*  • La imagen se optimiza automáticamente                                   */
/*  • El precio se formatea en pesos colombianos                              */
/*                                                                            */
/*  🛠️ HISTORIAL DE CAMBIOS                                                   */
/*  ------------------------------------------------------------------------  */
/*  [v1.0.0] - 2026-05-22                                                    */
/*      ✅ Creación inicial                                                   */
/*      ✅ Campos del formulario                                              */
/*      ✅ Subida de imagen                                                   */
/*      ✅ Validaciones                                                       */
/*      ✅ Preview de imagen                                                  */
/*                                                                            */
/* ========================================================================== */

import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useProducts } from '../../hooks/useProducts';
import { useCategories } from '../../hooks/useCategories';
import LoadingSpinner from '../common/LoadingSpinner';
import ErrorAlert from '../common/ErrorAlert';

/* ========================================================================== */
/*  COMPONENTE PRINCIPAL                                                      */
/* ========================================================================== */

const ProductForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { createProduct, updateProduct, getProductById, loading } = useProducts();
  const { getCategories } = useCategories();
  
  const [formData, setFormData] = useState({
    nombre: '',
    descripcion: '',
    precio: '',
    condicion: 'nuevo',
    categoria_id: '',
    destacado: false
  });
  
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState('');
  const [categories, setCategories] = useState([]);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [serverError, setServerError] = useState('');

  const isEditing = !!id;

  /* ========================================================================= */
  /*  CARGAR CATEGORÍAS Y PRODUCTO (SI EDITANDO)                               */
  /* ========================================================================= */

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      try {
        // Cargar categorías
        const cats = await getCategories();
        setCategories(cats || []);
        
        // Si es edición, cargar producto
        if (isEditing) {
          const product = await getProductById(id);
          if (product) {
            setFormData({
              nombre: product.nombre || '',
              descripcion: product.descripcion || '',
              precio: product.precio || '',
              condicion: product.condicion || 'nuevo',
              categoria_id: product.categoria_id || '',
              destacado: product.destacado || false
            });
            if (product.imagen_url) {
              setImagePreview(product.imagen_url);
            }
          }
        }
      } catch (err) {
        console.error('Error loading data:', err);
        setServerError('Error al cargar los datos');
      } finally {
        setIsLoading(false);
      }
    };
    
    loadData();
  }, [id, isEditing, getCategories, getProductById]);

  /* ========================================================================= */
  /*  MANEJAR CAMBIOS EN FORMULARIO                                            */
  /* ========================================================================= */

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    // Limpiar error del campo
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  /* ========================================================================= */
  /*  MANEJAR SUBIDA DE IMAGEN                                                 */
  /* ========================================================================= */

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validar tipo
      const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
      if (!allowedTypes.includes(file.type)) {
        setErrors(prev => ({ ...prev, imagen: 'Formato no permitido. Use JPG, PNG o WEBP' }));
        return;
      }
      
      // Validar tamaño (5MB)
      if (file.size > 5 * 1024 * 1024) {
        setErrors(prev => ({ ...prev, imagen: 'El archivo es demasiado grande. Máximo 5MB' }));
        return;
      }
      
      setImageFile(file);
      setErrors(prev => ({ ...prev, imagen: '' }));
      
      // Crear preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  /* ========================================================================= */
  /*  VALIDAR FORMULARIO                                                       */
  /* ========================================================================= */

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.nombre.trim()) {
      newErrors.nombre = 'El nombre del producto es requerido';
    } else if (formData.nombre.length < 3) {
      newErrors.nombre = 'El nombre debe tener al menos 3 caracteres';
    }
    
    if (!formData.precio) {
      newErrors.precio = 'El precio es requerido';
    } else if (parseFloat(formData.precio) <= 0) {
      newErrors.precio = 'El precio debe ser mayor a 0';
    }
    
    if (!formData.categoria_id) {
      newErrors.categoria_id = 'Debe seleccionar una categoría';
    }
    
    if (!imageFile && !imagePreview && !isEditing) {
      newErrors.imagen = 'Debe seleccionar una imagen para el producto';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  /* ========================================================================= */
  /*  MANEJAR ENVÍO                                                            */
  /* ========================================================================= */

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Crear FormData para enviar archivo
      const submitData = new FormData();
      submitData.append('nombre', formData.nombre);
      submitData.append('descripcion', formData.descripcion);
      submitData.append('precio', parseFloat(formData.precio));
      submitData.append('condicion', formData.condicion);
      submitData.append('categoria_id', formData.categoria_id);
      submitData.append('destacado', formData.destacado);
      
      if (imageFile) {
        submitData.append('imagen', imageFile);
      }
      
      if (isEditing) {
        await updateProduct(id, submitData);
      } else {
        await createProduct(submitData);
      }
      
      navigate('/admin/products');
    } catch (err) {
      console.error('Error saving product:', err);
      setServerError(err.message || 'Error al guardar el producto');
    } finally {
      setIsSubmitting(false);
    }
  };

  /* ========================================================================= */
  /*  RENDERIZADO DE CARGA                                                     */
  /* ========================================================================= */

  if (isLoading) {
    return (
      <div className="flex justify-center py-12">
        <LoadingSpinner />
      </div>
    );
  }

  /* ========================================================================= */
  /*  RENDERIZADO PRINCIPAL                                                    */
  /* ========================================================================= */

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        
        {/* Encabezado */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
            {isEditing ? 'Editar Producto' : 'Nuevo Producto'}
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            {isEditing ? 'Modifica la información del producto' : 'Completa los datos para agregar un nuevo producto'}
          </p>
        </div>

        {/* Error del servidor */}
        {serverError && (
          <div className="mb-4">
            <ErrorAlert message={serverError} onClose={() => setServerError('')} />
          </div>
        )}

        {/* Formulario */}
        <form onSubmit={handleSubmit} className="space-y-5">
          
          {/* Nombre */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Nombre del producto *
            </label>
            <input
              type="text"
              name="nombre"
              value={formData.nombre}
              onChange={handleChange}
              className={`w-full px-3 py-2 border rounded-lg dark:bg-gray-700 ${
                errors.nombre ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
              }`}
            />
            {errors.nombre && (
              <p className="text-xs text-red-500 mt-1">{errors.nombre}</p>
            )}
          </div>

          {/* Descripción */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Descripción
            </label>
            <textarea
              name="descripcion"
              rows="4"
              value={formData.descripcion}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg dark:bg-gray-700 border-gray-300 dark:border-gray-600"
            />
          </div>

          {/* Precio y Categoría */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Precio *
              </label>
              <div className="relative">
                <span className="absolute left-3 top-2.5 text-gray-500">$</span>
                <input
                  type="number"
                  name="precio"
                  value={formData.precio}
                  onChange={handleChange}
                  step="1000"
                  min="0"
                  className={`w-full pl-8 pr-3 py-2 border rounded-lg dark:bg-gray-700 ${
                    errors.precio ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                  }`}
                />
              </div>
              {errors.precio && (
                <p className="text-xs text-red-500 mt-1">{errors.precio}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Categoría *
              </label>
              <select
                name="categoria_id"
                value={formData.categoria_id}
                onChange={handleChange}
                className={`w-full px-3 py-2 border rounded-lg dark:bg-gray-700 ${
                  errors.categoria_id ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                }`}
              >
                <option value="">Seleccionar categoría</option>
                {categories.map(cat => (
                  <option key={cat.id} value={cat.id}>
                    {cat.icon && <span>{cat.icon}</span>} {cat.nombre}
                  </option>
                ))}
              </select>
              {errors.categoria_id && (
                <p className="text-xs text-red-500 mt-1">{errors.categoria_id}</p>
              )}
            </div>
          </div>

          {/* Condición y Destacado */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Condición *
              </label>
              <select
                name="condicion"
                value={formData.condicion}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-lg dark:bg-gray-700 border-gray-300 dark:border-gray-600"
              >
                <option value="nuevo">🆕 Nuevo</option>
                <option value="segunda">🔄 Segunda Mano</option>
              </select>
            </div>

            <div className="flex items-center pt-6">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  name="destacado"
                  checked={formData.destacado}
                  onChange={handleChange}
                  className="w-4 h-4"
                />
                <span className="text-sm text-gray-700 dark:text-gray-300">
                  Marcar como producto destacado
                </span>
              </label>
            </div>
          </div>

          {/* Imagen */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Imagen del producto {!isEditing && '*'}
            </label>
            
            <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-dashed rounded-lg border-gray-300 dark:border-gray-600">
              {imagePreview ? (
                <div className="text-center">
                  <img
                    src={imagePreview}
                    alt="Vista previa"
                    className="mx-auto h-32 w-32 object-cover rounded-lg"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      setImageFile(null);
                      setImagePreview('');
                    }}
                    className="mt-2 text-sm text-red-600 hover:text-red-800"
                  >
                    Eliminar imagen
                  </button>
                </div>
              ) : (
                <div className="text-center">
                  <div className="text-4xl mb-2">📸</div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Arrastra y suelta una imagen, o haz clic para seleccionar
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    JPG, PNG o WEBP (máx. 5MB)
                  </p>
                  <input
                    type="file"
                    accept="image/jpeg,image/jpg,image/png,image/webp"
                    onChange={handleImageChange}
                    className="hidden"
                    id="image-upload"
                  />
                  <label
                    htmlFor="image-upload"
                    className="mt-3 inline-block px-4 py-2 bg-blue-600 text-white text-sm rounded-lg cursor-pointer hover:bg-blue-700"
                  >
                    Seleccionar imagen
                  </label>
                </div>
              )}
            </div>
            {errors.imagen && (
              <p className="text-xs text-red-500 mt-1">{errors.imagen}</p>
            )}
          </div>

          {/* Botones */}
          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={() => navigate('/admin/products')}
              className="px-4 py-2 border rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 flex items-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  Guardando...
                </>
              ) : (
                isEditing ? 'Actualizar Producto' : 'Crear Producto'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductForm;