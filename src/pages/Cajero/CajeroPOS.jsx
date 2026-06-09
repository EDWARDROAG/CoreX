// Archivo: CajeroPOS.jsx
// CoreX - Generado automáticamente

/* ========================================================================== */
/*                                                                            */
/*  📄 ARCHIVO: CajeroPOS.jsx                                                 */
/*  📁 UBICACIÓN: frontend/src/pages/Cajero/CajeroPOS.jsx                     */
/*  🚀 MÓDULO: Páginas de Cajero                                              */
/*  🏷️  VERSIÓN: v1.0.0                                                      */
/*  📅 ÚLTIMA ACTUALIZACIÓN: 2026-05-22 10:30                                 */
/*  👨‍💻 AUTOR: CoreX Team                                                      */
/*                                                                            */
/* ========================================================================== */
/*                                                                            */
/*  🎯 PROPÓSITO                                                              */
/*  ------------------------------------------------------------------------  */
/*  Página principal del punto de venta (POS) para cajeros. Permite buscar   */
/*  productos, agregarlos al carrito, procesar ventas con múltiples métodos  */
/*  de pago, generar facturas y subir comprobantes de transferencia.         */
/*                                                                            */
/*  🧩 FUNCIONALIDADES PRINCIPALES                                            */
/*  ------------------------------------------------------------------------  */
/*  ✅ Buscar productos en tiempo real                                        */
/*  ✅ Agregar productos al carrito                                           */
/*  ✅ Modificar cantidades                                                   */
/*  ✅ Eliminar productos del carrito                                         */
/*  ✅ Procesar venta (efectivo/transferencia)                                */
/*  ✅ Subir comprobante de transferencia                                     */
/*  ✅ Generar factura PDF                                                    */
/*  ✅ Imprimir factura                                                       */
/*                                                                            */
/*  📦 DEPENDENCIAS                                                           */
/*  ------------------------------------------------------------------------  */
/*  • React - Librería principal                                              */
/*  • useState, useEffect, useCallback - Hooks de React                       */
/*  • useSales - Hook personalizado para ventas                               */
/*  • useProducts - Hook personalizado para productos                         */
/*  • useCart - Hook personalizado para carrito                               */
/*  • LoadingSpinner - Componente de carga                                    */
/*                                                                            */
/*  🔗 RELACIONES                                                             */
/*  ------------------------------------------------------------------------  */
/*  • Importado por: AppRoutes.js                                             */
/*  • Usa: useSales, useProducts, useCart, LoadingSpinner                     */
/*  • Navega a: /cajero/history (historial de ventas)                         */
/*                                                                            */
/*  ⚠️ NOTAS IMPORTANTES                                                      */
/*  ------------------------------------------------------------------------  */
/*  • Accesible por usuarios con rol cajero o admin                           */
/*  • Transferencia requiere subir comprobante                                */
/*  • La factura se genera automáticamente                                    */
/*                                                                            */
/*  🛠️ HISTORIAL DE CAMBIOS                                                   */
/*  ------------------------------------------------------------------------  */
/*  [v1.0.0] - 2026-05-22                                                    */
/*      ✅ Creación inicial                                                   */
/*      ✅ Búsqueda de productos                                              */
/*      ✅ Carrito de compras                                                 */
/*      ✅ Procesamiento de ventas                                            */
/*      ✅ Múltiples métodos de pago                                          */
/*      ✅ Subida de comprobantes                                             */
/*      ✅ Generación de factura                                              */
/*                                                                            */
/* ========================================================================== */

import React, { useState, useEffect, useCallback } from 'react';
import { useSales } from '../../hooks/useSales';
import { useProducts } from '../../hooks/useProducts';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import CartItem from '../../components/cajero/CartItem';
import PaymentSelector from '../../components/cajero/PaymentSelector';
import ReceiptUploader from '../../components/cajero/ReceiptUploader';

/* ========================================================================== */
/*  COMPONENTE PRINCIPAL                                                      */
/* ========================================================================== */

const CajeroPOS = () => {
  const { createSale, generateInvoice, loading: salesLoading } = useSales();
  const { searchProducts, loading: productsLoading } = useProducts();
  
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [cart, setCart] = useState([]);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('efectivo');
  const [clientData, setClientData] = useState({
    nombre: '',
    telefono: ''
  });
  const [comprobanteFile, setComprobanteFile] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [showReceiptUploader, setShowReceiptUploader] = useState(false);

  /* ========================================================================= */
  /*  BUSCAR PRODUCTOS                                                         */
  /* ========================================================================= */

  const handleSearch = useCallback(async () => {
    if (!searchTerm.trim()) {
      setSearchResults([]);
      return;
    }
    
    try {
      const results = await searchProducts({ search: searchTerm, limit: 10 });
      setSearchResults(results || []);
    } catch (err) {
      console.error('Error searching products:', err);
      setErrorMessage('Error al buscar productos');
      setTimeout(() => setErrorMessage(''), 3000);
    }
  }, [searchTerm, searchProducts]);

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      if (searchTerm) {
        handleSearch();
      } else {
        setSearchResults([]);
      }
    }, 500);
    
    return () => clearTimeout(delayDebounce);
  }, [searchTerm, handleSearch]);

  /* ========================================================================= */
  /*  AGREGAR AL CARRITO                                                       */
  /* ========================================================================= */

  const addToCart = (product) => {
    if (product.stock === 0) {
      setErrorMessage('Este producto ya está vendido');
      setTimeout(() => setErrorMessage(''), 3000);
      return;
    }
    
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === product.id);
      
      if (existingItem) {
        return prevCart.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1, subtotal: (item.quantity + 1) * item.precio }
            : item
        );
      }
      
      return [...prevCart, {
        id: product.id,
        nombre: product.nombre,
        precio: product.precio,
        quantity: 1,
        subtotal: product.precio,
        imagen_url: product.imagen_url
      }];
    });
    
    setSuccessMessage(`"${product.nombre}" agregado al carrito`);
    setTimeout(() => setSuccessMessage(''), 2000);
  };

  /* ========================================================================= */
  /*  ACTUALIZAR CANTIDAD                                                      */
  /* ========================================================================= */

  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity < 1) {
      removeFromCart(productId);
      return;
    }
    
    setCart(prevCart =>
      prevCart.map(item =>
        item.id === productId
          ? { ...item, quantity: newQuantity, subtotal: newQuantity * item.precio }
          : item
      )
    );
  };

  /* ========================================================================= */
  /*  ELIMINAR DEL CARRITO                                                     */
  /* ========================================================================= */

  const removeFromCart = (productId) => {
    setCart(prevCart => prevCart.filter(item => item.id !== productId));
  };

  /* ========================================================================= */
  /*  CALCULAR TOTAL                                                           */
  /* ========================================================================= */

  const getTotal = () => {
    return cart.reduce((sum, item) => sum + item.subtotal, 0);
  };

  /* ========================================================================= */
  /*  PROCESAR VENTA                                                           */
  /* ========================================================================= */

  const handleProcessSale = () => {
    if (cart.length === 0) {
      setErrorMessage('El carrito está vacío');
      setTimeout(() => setErrorMessage(''), 3000);
      return;
    }
    
    if (paymentMethod === 'transferencia' && !comprobanteFile) {
      setErrorMessage('Debe subir el comprobante de transferencia');
      setTimeout(() => setErrorMessage(''), 3000);
      return;
    }
    
    setShowPaymentModal(true);
  };

  const handleConfirmSale = async () => {
    setIsProcessing(true);
    
    try {
      const saleData = {
        items: cart.map(item => ({
          producto_id: item.id,
          cantidad: item.quantity,
          precio_unitario: item.precio,
          subtotal: item.subtotal
        })),
        cliente_nombre: clientData.nombre || null,
        cliente_telefono: clientData.telefono || null,
        metodo_pago: paymentMethod,
        total: getTotal()
      };
      
      const formData = new FormData();
      formData.append('data', JSON.stringify(saleData));
      if (comprobanteFile) {
        formData.append('comprobante', comprobanteFile);
      }
      
      const result = await createSale(formData);
      
      if (result && result.sale) {
        setSuccessMessage(`Venta #${result.sale.factura_numero} registrada exitosamente`);
        
        // Limpiar carrito
        setCart([]);
        setClientData({ nombre: '', telefono: '' });
        setComprobanteFile(null);
        setShowPaymentModal(false);
        
        // Generar factura
        if (result.factura_pdf) {
          await generateInvoice(result.sale.id);
        }
        
        setTimeout(() => setSuccessMessage(''), 3000);
      }
    } catch (err) {
      console.error('Error processing sale:', err);
      setErrorMessage(err.message || 'Error al procesar la venta');
      setTimeout(() => setErrorMessage(''), 3000);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleCloseModal = () => {
    setShowPaymentModal(false);
  };

  /* ========================================================================= */
  /*  RENDERIZADO DE RESULTADOS DE BÚSQUEDA                                    */
  /* ========================================================================= */

  const renderSearchResults = () => {
    if (!searchTerm) return null;
    
    if (productsLoading) {
      return (
        <div className="flex justify-center py-4">
          <LoadingSpinner size="small" />
        </div>
      );
    }
    
    if (searchResults.length === 0 && searchTerm) {
      return (
        <div className="text-center py-4 text-gray-500">
          No se encontraron productos para "{searchTerm}"
        </div>
      );
    }
    
    return (
      <div className="grid grid-cols-1 gap-2 max-h-96 overflow-y-auto">
        {searchResults.map(product => (
          <div
            key={product.id}
            onClick={() => addToCart(product)}
            className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600 transition"
          >
            <img
              src={product.imagen_url || '/placeholder-image.png'}
              alt={product.nombre}
              className="w-12 h-12 object-cover rounded"
              onError={(e) => { e.target.src = '/placeholder-image.png'; }}
            />
            <div className="flex-1">
              <p className="font-medium text-gray-800 dark:text-white">{product.nombre}</p>
              <p className="text-sm text-gray-500">${product.precio?.toLocaleString('es-CO')}</p>
            </div>
            <button className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700">
              Agregar
            </button>
          </div>
        ))}
      </div>
    );
  };

  /* ========================================================================= */
  /*  RENDERIZADO DEL CARRITO                                                  */
  /* ========================================================================= */

  const renderCart = () => {
    if (cart.length === 0) {
      return (
        <div className="text-center py-12 text-gray-500">
          🛒 El carrito está vacío
        </div>
      );
    }
    
    return (
      <div className="space-y-3 max-h-96 overflow-y-auto">
        {cart.map(item => (
          <CartItem
            key={item.id}
            item={item}
            onUpdateQuantity={updateQuantity}
            onRemove={removeFromCart}
          />
        ))}
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
            Punto de Venta (POS)
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Registrar nuevas ventas
          </p>
        </div>
        <div className="text-right">
          <p className="text-sm text-gray-500">Cajero</p>
          <p className="font-medium">{JSON.parse(localStorage.getItem('user'))?.nombre || 'Usuario'}</p>
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

      {/* Grid principal */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Panel izquierdo: Búsqueda y productos */}
        <div className="lg:col-span-2 space-y-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Buscar producto por nombre..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-2 pl-10 border rounded-lg dark:bg-gray-700 dark:border-gray-600"
                autoFocus
              />
              <div className="absolute left-3 top-2.5 text-gray-400">🔍</div>
            </div>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
            <h2 className="text-lg font-semibold mb-3">Resultados de búsqueda</h2>
            {renderSearchResults()}
          </div>
        </div>
        
        {/* Panel derecho: Carrito y total */}
        <div className="space-y-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
            <h2 className="text-lg font-semibold mb-3">Carrito de Compras</h2>
            {renderCart()}
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
            <div className="space-y-2">
              <div className="flex justify-between text-lg font-bold">
                <span>Total:</span>
                <span className="text-blue-600">${getTotal().toLocaleString('es-CO')}</span>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Cliente (opcional)</label>
                <input
                  type="text"
                  placeholder="Nombre del cliente"
                  value={clientData.nombre}
                  onChange={(e) => setClientData(prev => ({ ...prev, nombre: e.target.value }))}
                  className="w-full px-3 py-2 border rounded-lg dark:bg-gray-700 mb-2"
                />
                <input
                  type="tel"
                  placeholder="Teléfono del cliente"
                  value={clientData.telefono}
                  onChange={(e) => setClientData(prev => ({ ...prev, telefono: e.target.value }))}
                  className="w-full px-3 py-2 border rounded-lg dark:bg-gray-700"
                />
              </div>
              
              <PaymentSelector
                value={paymentMethod}
                onChange={setPaymentMethod}
                onUploadClick={() => setShowReceiptUploader(true)}
              />
              
              <button
                onClick={handleProcessSale}
                disabled={cart.length === 0 || (paymentMethod === 'transferencia' && !comprobanteFile)}
                className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition"
              >
                Procesar Venta
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Modal de confirmación */}
      {showPaymentModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-md w-full mx-4">
            <h2 className="text-xl font-bold mb-4">Confirmar Venta</h2>
            
            <div className="space-y-3 mb-4">
              <div className="flex justify-between">
                <span>Productos:</span>
                <span>{cart.length} items</span>
              </div>
              <div className="flex justify-between font-bold">
                <span>Total:</span>
                <span className="text-blue-600">${getTotal().toLocaleString('es-CO')}</span>
              </div>
              <div className="flex justify-between">
                <span>Método de pago:</span>
                <span>{paymentMethod === 'efectivo' ? '💰 Efectivo' : '📱 Transferencia'}</span>
              </div>
              {clientData.nombre && (
                <div className="flex justify-between">
                  <span>Cliente:</span>
                  <span>{clientData.nombre}</span>
                </div>
              )}
            </div>
            
            <div className="flex justify-end gap-3">
              <button
                onClick={handleCloseModal}
                className="px-4 py-2 border rounded-lg hover:bg-gray-100"
              >
                Cancelar
              </button>
              <button
                onClick={handleConfirmSale}
                disabled={isProcessing}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50"
              >
                {isProcessing ? 'Procesando...' : 'Confirmar Venta'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal de subida de comprobante */}
      {showReceiptUploader && (
        <ReceiptUploader
          onFileSelect={setComprobanteFile}
          onClose={() => setShowReceiptUploader(false)}
          existingFile={comprobanteFile}
        />
      )}
    </div>
  );
};

export default CajeroPOS;