

// frontend/src/context/CartContext.jsx
import React, { createContext, useState, useContext, useEffect } from 'react';

// Crear el contexto
const CartContext = createContext({});

// Hook personalizado para usar el contexto
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart debe usarse dentro de un CartProvider');
  }
  return context;
};

// Provider component
export const CartProvider = ({ children }) => {
  // Estado del carrito
  const [cartItems, setCartItems] = useState(() => {
    // Cargar carrito guardado en localStorage
    const savedCart = localStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [coupon, setCoupon] = useState(null);

  // Guardar carrito en localStorage cada vez que cambie
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems));
  }, [cartItems]);

  // Calcular totales
  const subtotal = cartItems.reduce((total, item) => {
    const price = item.price * (1 - (item.discount || 0) / 100);
    return total + (price * item.quantity);
  }, 0);

  const discount = coupon ? subtotal * (coupon.discount / 100) : 0;
  const total = subtotal - discount;
  const itemCount = cartItems.reduce((count, item) => count + item.quantity, 0);

  // Agregar producto al carrito
  const addToCart = (product, quantity = 1, selectedOptions = {}) => {
    setLoading(true);
    try {
      setCartItems(prevItems => {
        const existingItemIndex = prevItems.findIndex(
          item => item.id === product.id && 
                  JSON.stringify(item.selectedOptions) === JSON.stringify(selectedOptions)
        );

        if (existingItemIndex > -1) {
          // Actualizar cantidad si ya existe
          const updatedItems = [...prevItems];
          updatedItems[existingItemIndex].quantity += quantity;
          return updatedItems;
        } else {
          // Agregar nuevo item
          return [...prevItems, {
            ...product,
            quantity,
            selectedOptions,
            addedAt: new Date().toISOString()
          }];
        }
      });
      setError(null);
      return { success: true };
    } catch (err) {
      setError('Error al agregar producto al carrito');
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  };

  // Actualizar cantidad de un producto
  const updateQuantity = (itemId, options, newQuantity) => {
    if (newQuantity < 1) {
      removeFromCart(itemId, options);
      return;
    }

    setCartItems(prevItems =>
      prevItems.map(item => {
        const isSameItem = item.id === itemId && 
                          JSON.stringify(item.selectedOptions) === JSON.stringify(options);
        if (isSameItem) {
          return { ...item, quantity: newQuantity };
        }
        return item;
      })
    );
  };

  // Remover producto del carrito
  const removeFromCart = (itemId, options) => {
    setCartItems(prevItems =>
      prevItems.filter(item => {
        const isSameItem = item.id === itemId && 
                          JSON.stringify(item.selectedOptions) === JSON.stringify(options);
        return !isSameItem;
      })
    );
  };

  // Vaciar carrito completo
  const clearCart = () => {
    setCartItems([]);
    setCoupon(null);
  };

  // Aplicar cupón de descuento
  const applyCoupon = async (couponCode) => {
    setLoading(true);
    try {
      // Simular verificación de cupón con API
      // const response = await api.post('/coupons/validate', { code: couponCode });
      
      // Simulación de respuesta
      const validCoupons = {
        'SAVE10': { discount: 10, code: 'SAVE10', description: '10% de descuento' },
        'SAVE20': { discount: 20, code: 'SAVE20', description: '20% de descuento' },
        'FREESHIP': { discount: 0, freeShipping: true, description: 'Envío gratis' }
      };

      const couponData = validCoupons[couponCode.toUpperCase()];
      
      if (couponData) {
        setCoupon({ ...couponData, code: couponCode.toUpperCase() });
        setError(null);
        return { success: true, coupon: couponData };
      } else {
        throw new Error('Cupón inválido');
      }
    } catch (err) {
      setError(err.message || 'Error al aplicar cupón');
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  };

  // Remover cupón
  const removeCoupon = () => {
    setCoupon(null);
  };

  // Verificar si un producto está en el carrito
  const isInCart = (productId, options = {}) => {
    return cartItems.some(item => 
      item.id === productId && 
      JSON.stringify(item.selectedOptions) === JSON.stringify(options)
    );
  };

  // Obtener cantidad de un producto específico
  const getItemQuantity = (productId, options = {}) => {
    const item = cartItems.find(item => 
      item.id === productId && 
      JSON.stringify(item.selectedOptions) === JSON.stringify(options)
    );
    return item ? item.quantity : 0;
  };

  // Calcular envío (ejemplo)
  const calculateShipping = (zipCode) => {
    // Lógica para calcular envío basado en código postal
    const baseShipping = 5.99;
    const freeShippingThreshold = 50;
    
    if (total >= freeShippingThreshold || coupon?.freeShipping) {
      return 0;
    }
    return baseShipping;
  };

  // Formatear precios
  const formatPrice = (price) => {
    return new Intl.NumberFormat('es-ES', {
      style: 'currency',
      currency: 'EUR'
    }).format(price);
  };

  // Valor del contexto
  const value = {
    // Datos
    cartItems,
    subtotal,
    discount,
    total,
    itemCount,
    loading,
    error,
    coupon,
    
    // Métodos principales
    addToCart,
    updateQuantity,
    removeFromCart,
    clearCart,
    
    // Métodos de cupones
    applyCoupon,
    removeCoupon,
    
    // Utilidades
    isInCart,
    getItemQuantity,
    calculateShipping,
    formatPrice,
    
    // Estado del carrito
    isEmpty: cartItems.length === 0,
    hasCoupon: !!coupon
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};

export default CartContext;