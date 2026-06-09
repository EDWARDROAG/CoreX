// Archivo: Navbar.jsx
// CoreX - Generado automáticamente

/* ========================================================================== */
/*                                                                            */
/*  📄 ARCHIVO: Navbar.jsx                                                    */
/*  📁 UBICACIÓN: frontend/src/components/common/Navbar.jsx                   */
/*  🚀 MÓDULO: Componentes Comunes                                            */
/*  🏷️  VERSIÓN: v1.0.0                                                      */
/*  📅 ÚLTIMA ACTUALIZACIÓN: 2026-05-22 10:30                                 */
/*  👨‍💻 AUTOR: CoreX Team                                                      */
/*                                                                            */
/* ========================================================================== */
/*                                                                            */
/*  🎯 PROPÓSITO                                                              */
/*  ------------------------------------------------------------------------  */
/*  Barra de navegación principal del sitio CoreX. Proporciona acceso        */
/*  rápido a las secciones principales del sitio: inicio, productos,         */
/*  mantenimiento, contacto, y panel de administración según el rol.         */
/*                                                                            */
/*  🧩 FUNCIONALIDADES PRINCIPALES                                            */
/*  ------------------------------------------------------------------------  */
/*  ✅ Navegación responsiva (mobile friendly)                                */
/*  ✅ Menú desplegable para pantallas pequeñas                               */
/*  ✅ Mostrar/ocultar elementos según rol del usuario                        */
/*  ✅ Botón de login/logout                                                  */
/*  ✅ Selector de tema (oscuro/claro)                                        */
/*  ✅ Enlaces a secciones principales                                        */
/*                                                                            */
/*  📦 DEPENDENCIAS                                                           */
/*  ------------------------------------------------------------------------  */
/*  • React - Librería principal                                              */
/*  • useState - Hook de React                                                */
/*  • Link, useNavigate - React Router DOM                                    */
/*  • useAuth - Hook personalizado para autenticación                         */
/*  • useTheme - Hook personalizado para tema                                 */
/*                                                                            */
/*  🔗 RELACIONES                                                             */
/*  ------------------------------------------------------------------------  */
/*  • Importado por: App.jsx                                                  */
/*  • Usa: useAuth, useTheme                                                  */
/*  • Se muestra en todas las páginas                                         */
/*                                                                            */
/*  ⚠️ NOTAS IMPORTANTES                                                      */
/*  ------------------------------------------------------------------------  */
/*  • El menú se colapsa en dispositivos móviles                              */
/*  • Los enlaces de admin solo se muestran para usuarios administradores     */
/*  • El enlace de POS solo se muestra para cajeros y admins                  */
/*  • Soporta tema oscuro/claro                                               */
/*                                                                            */
/*  🛠️ HISTORIAL DE CAMBIOS                                                   */
/*  ------------------------------------------------------------------------  */
/*  [v1.0.0] - 2026-05-22                                                    */
/*      ✅ Creación inicial                                                   */
/*      ✅ Navegación responsiva                                              */
/*      ✅ Integración con autenticación                                      */
/*      ✅ Selector de tema                                                   */
/*      ✅ Menú móvil                                                         */
/*                                                                            */
/* ========================================================================== */

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { useTheme } from '../../hooks/useTheme';

/* ========================================================================== */
/*  COMPONENTE PRINCIPAL                                                      */
/* ========================================================================== */

const Navbar = () => {
  const { user, isAuthenticated, logout, userRole } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  /* ========================================================================= */
  /*  MANEJAR LOGOUT                                                           */
  /* ========================================================================= */

  const handleLogout = () => {
    logout();
    navigate('/');
    setIsUserMenuOpen(false);
  };

  /* ========================================================================= */
  /*  CERRAR MENÚ AL HACER CLICK EN UN ENLACE                                  */
  /* ========================================================================= */

  const handleLinkClick = () => {
    setIsMenuOpen(false);
    setIsUserMenuOpen(false);
  };

  /* ========================================================================= */
  /*  ENLACES DE NAVEGACIÓN                                                    */
  /* ========================================================================= */

  const navLinks = [
    { path: '/', label: 'Inicio', icon: '🏠' },
    { path: '/products', label: 'Productos', icon: '📦' },
    { path: '/maintenance', label: 'Mantenimiento', icon: '🔧' },
    { path: '/contact', label: 'Contacto', icon: '📞' }
  ];

  // Enlaces para administradores
  const adminLinks = [
    { path: '/admin/dashboard', label: 'Dashboard', icon: '📊' },
    { path: '/admin/products', label: 'Productos', icon: '📦' },
    { path: '/admin/categories', label: 'Categorías', icon: '📁' },
    { path: '/admin/users', label: 'Usuarios', icon: '👥' },
    { path: '/admin/sales', label: 'Ventas', icon: '💰' },
    { path: '/admin/reports', label: 'Reportes', icon: '📈' },
    { path: '/admin/backup', label: 'Backups', icon: '💾' },
    { path: '/admin/settings', label: 'Configuración', icon: '⚙️' }
  ];

  // Enlaces para cajeros
  const cajeroLinks = [
    { path: '/cajero/pos', label: 'Punto de Venta', icon: '🛒' },
    { path: '/cajero/history', label: 'Mis Ventas', icon: '📜' }
  ];

  /* ========================================================================= */
  /*  RENDERIZADO DE MENÚ MÓVIL                                                */
  /* ========================================================================= */

  const renderMobileMenu = () => {
    if (!isMenuOpen) return null;

    return (
      <div className="md:hidden absolute top-16 left-0 right-0 bg-white dark:bg-gray-800 shadow-lg z-50">
        <div className="flex flex-col p-4 space-y-3">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              onClick={handleLinkClick}
              className="flex items-center gap-2 px-3 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition"
            >
              <span>{link.icon}</span>
              <span>{link.label}</span>
            </Link>
          ))}
          
          {/* Enlaces de administrador en móvil */}
          {isAuthenticated && userRole === 'admin' && (
            <>
              <div className="border-t border-gray-200 dark:border-gray-700 my-2"></div>
              <p className="text-xs text-gray-500 px-3">Administración</p>
              {adminLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={handleLinkClick}
                  className="flex items-center gap-2 px-3 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition"
                >
                  <span>{link.icon}</span>
                  <span>{link.label}</span>
                </Link>
              ))}
            </>
          )}
          
          {/* Enlaces de cajero en móvil */}
          {isAuthenticated && userRole === 'cajero' && (
            <>
              <div className="border-t border-gray-200 dark:border-gray-700 my-2"></div>
              <p className="text-xs text-gray-500 px-3">Caja</p>
              {cajeroLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={handleLinkClick}
                  className="flex items-center gap-2 px-3 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition"
                >
                  <span>{link.icon}</span>
                  <span>{link.label}</span>
                </Link>
              ))}
            </>
          )}
          
          {/* Botón de tema en móvil */}
          <div className="border-t border-gray-200 dark:border-gray-700 my-2"></div>
          <button
            onClick={() => {
              toggleTheme();
              handleLinkClick();
            }}
            className="flex items-center gap-2 px-3 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition"
          >
            <span>{theme === 'dark' ? '☀️' : '🌙'}</span>
            <span>{theme === 'dark' ? 'Modo Claro' : 'Modo Oscuro'}</span>
          </button>
          
          {/* Botón de login/logout en móvil */}
          {isAuthenticated ? (
            <button
              onClick={() => {
                handleLogout();
                handleLinkClick();
              }}
              className="flex items-center gap-2 px-3 py-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition"
            >
              <span>🚪</span>
              <span>Cerrar Sesión</span>
            </button>
          ) : (
            <Link
              to="/login"
              onClick={handleLinkClick}
              className="flex items-center gap-2 px-3 py-2 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition"
            >
              <span>🔑</span>
              <span>Iniciar Sesión</span>
            </Link>
          )}
        </div>
      </div>
    );
  };

  /* ========================================================================= */
  /*  RENDERIZADO DE MENÚ DE USUARIO (DESKTOP)                                 */
  /* ========================================================================= */

  const renderUserMenu = () => {
    if (!isAuthenticated) {
      return (
        <Link
          to="/login"
          className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition"
        >
          Iniciar Sesión
        </Link>
      );
    }

    return (
      <div className="relative">
        <button
          onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
          className="flex items-center gap-2 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition"
        >
          <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center text-sm font-bold">
            {user?.nombre?.charAt(0).toUpperCase() || 'U'}
          </div>
          <span className="hidden sm:inline">{user?.nombre?.split(' ')[0]}</span>
          <span className="text-xs">▼</span>
        </button>
        
        {isUserMenuOpen && (
          <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 z-50">
            <div className="p-3 border-b border-gray-200 dark:border-gray-700">
              <p className="font-medium text-gray-800 dark:text-white">{user?.nombre}</p>
              <p className="text-xs text-gray-500">{user?.email}</p>
              <p className="text-xs text-blue-600 mt-1">
                {userRole === 'admin' ? '👑 Administrador' : '💰 Cajero'}
              </p>
            </div>
            
            {userRole === 'admin' && (
              <div className="py-1">
                <Link
                  to="/admin/dashboard"
                  onClick={handleLinkClick}
                  className="flex items-center gap-2 px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  <span>📊</span> Dashboard
                </Link>
              </div>
            )}
            
            {userRole === 'cajero' && (
              <div className="py-1">
                <Link
                  to="/cajero/pos"
                  onClick={handleLinkClick}
                  className="flex items-center gap-2 px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  <span>🛒</span> Punto de Venta
                </Link>
              </div>
            )}
            
            <div className="border-t border-gray-200 dark:border-gray-700 my-1"></div>
            
            <button
              onClick={handleLogout}
              className="w-full text-left flex items-center gap-2 px-4 py-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20"
            >
              <span>🚪</span> Cerrar Sesión
            </button>
          </div>
        )}
      </div>
    );
  };

  /* ========================================================================= */
  /*  RENDERIZADO PRINCIPAL                                                    */
  /* ========================================================================= */

  return (
    <nav className="bg-white dark:bg-gray-800 shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2" onClick={handleLinkClick}>
            <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-indigo-700 rounded-lg flex items-center justify-center text-white font-bold text-xl">
              C
            </div>
            <span className="text-xl font-bold text-gray-800 dark:text-white">CoreX</span>
          </Link>

          {/* Enlaces desktop */}
          <div className="hidden md:flex items-center space-x-6">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition"
              >
                {link.label}
              </Link>
            ))}
            
            {/* Enlaces admin (desktop) */}
            {isAuthenticated && userRole === 'admin' && (
              <div className="relative group">
                <button className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition flex items-center gap-1">
                  Admin <span className="text-xs">▼</span>
                </button>
                <div className="absolute left-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50">
                  {adminLinks.map((link) => (
                    <Link
                      key={link.path}
                      to={link.path}
                      onClick={handleLinkClick}
                      className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                      <span className="mr-2">{link.icon}</span>
                      {link.label}
                    </Link>
                  ))}
                </div>
              </div>
            )}
            
            {/* Enlaces cajero (desktop) */}
            {isAuthenticated && userRole === 'cajero' && (
              <div className="relative group">
                <button className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition flex items-center gap-1">
                  Caja <span className="text-xs">▼</span>
                </button>
                <div className="absolute left-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50">
                  {cajeroLinks.map((link) => (
                    <Link
                      key={link.path}
                      to={link.path}
                      onClick={handleLinkClick}
                      className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                      <span className="mr-2">{link.icon}</span>
                      {link.label}
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Acciones derecha */}
          <div className="flex items-center gap-4">
            {/* Selector de tema */}
            <button
              onClick={toggleTheme}
              className="hidden md:block text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition"
              aria-label="Cambiar tema"
            >
              {theme === 'dark' ? '☀️' : '🌙'}
            </button>
            
            {/* Menú de usuario */}
            <div className="hidden md:block">
              {renderUserMenu()}
            </div>
            
            {/* Botón menú móvil */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden text-gray-700 dark:text-gray-300 focus:outline-none"
              aria-label="Menú"
            >
              {isMenuOpen ? '✕' : '☰'}
            </button>
          </div>
        </div>
      </div>
      
      {/* Menú móvil */}
      {renderMobileMenu()}
    </nav>
  );
};

export default Navbar;