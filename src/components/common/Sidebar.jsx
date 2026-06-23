// Archivo: Sidebar.jsx
// CoreX - Generado automáticamente

/* ========================================================================== */
/*                                                                            */
/*  📄 ARCHIVO: Sidebar.jsx                                                   */
/*  📁 UBICACIÓN: frontend/src/components/common/Sidebar.jsx                  */
/*  🚀 MÓDULO: Componentes Comunes                                            */
/*  🏷️  VERSIÓN: v1.0.0                                                      */
/*  📅 ÚLTIMA ACTUALIZACIÓN: 2026-05-22 10:30                                 */
/*  👨‍💻 AUTOR: CoreX Team                                                      */
/*                                                                            */
/* ========================================================================== */
/*                                                                            */
/*  🎯 PROPÓSITO                                                              */
/*  ------------------------------------------------------------------------  */
/*  Barra lateral (sidebar) para las secciones de administración y cajero.   */
/*  Proporciona navegación rápida a las diferentes secciones del panel       */
/*  según el rol del usuario.                                                */
/*                                                                            */
/*  🧩 FUNCIONALIDADES PRINCIPALES                                            */
/*  ------------------------------------------------------------------------  */
/*  ✅ Navegación específica por rol (admin/cajero)                           */
/*  ✅ Colapsable (abrir/cerrar)                                              */
/*  ✅ Indicador de página activa                                             */
/*  ✅ Iconos para cada sección                                               */
/*  ✅ Responsivo (se oculta en móviles)                                      */
/*  ✅ Contador de notificaciones (opcional)                                  */
/*                                                                            */
/*  📦 DEPENDENCIAS                                                           */
/*  ------------------------------------------------------------------------  */
/*  • React - Librería principal                                              */
/*  • useState - Hook de React                                                */
/*  • NavLink - React Router DOM                                              */
/*  • useAuth - Hook personalizado para autenticación                         */
/*                                                                            */
/*  🔗 RELACIONES                                                             */
/*  ------------------------------------------------------------------------  */
/*  • Importado por: AdminLayout, CajeroLayout                                */
/*  • Usa: useAuth                                                            */
/*  • Se muestra en páginas protegidas                                        */
/*                                                                            */
/*  ⚠️ NOTAS IMPORTANTES                                                      */
/*  ------------------------------------------------------------------------  */
/*  • Los enlaces cambian según el rol del usuario                            */
/*  • Se puede colapsar para ahorrar espacio                                  */
/*  • En móviles se muestra como menú hamburguesa                             */
/*                                                                            */
/*  🛠️ HISTORIAL DE CAMBIOS                                                   */
/*  ------------------------------------------------------------------------  */
/*  [v1.0.0] - 2026-05-22                                                    */
/*      ✅ Creación inicial                                                   */
/*      ✅ Enlaces por rol                                                    */
/*      ✅ Colapsable                                                        */
/*      ✅ Indicador activo                                                   */
/*      ✅ Diseño responsivo                                                  */
/*                                                                            */
/* ========================================================================== */

import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

const Sidebar = ({ isOpen, onToggle, isMobile = false }) => {
  const { user, userRole, userName, logout } = useAuth();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      await logout();
    } finally {
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
  };

  const displayName = userName || user?.nombre || 'Usuario';
  const userInitial = displayName.charAt(0).toUpperCase();

  /* ========================================================================= */
  /*  MANEJAR COLAPSO                                                          */
  /* ========================================================================= */

  const handleToggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
    if (onToggle) onToggle(!isCollapsed);
  };

  /* ========================================================================= */
  /*  ENLACES POR ROL                                                          */
  /* ========================================================================= */

  // Enlaces para administradores
  const adminLinks = [
    { path: '/admin/dashboard', label: 'Dashboard', icon: '📊' },
    { path: '/admin/products', label: 'Productos', icon: '📦' },
    { path: '/admin/categories', label: 'Categorías', icon: '📁' },
    { path: '/admin/users', label: 'Usuarios', icon: '👥' },
    { path: '/admin/sales', label: 'Ventas', icon: '💰' },
    { path: '/admin/reports', label: 'Reportes', icon: '📈' },
    { path: '/admin/logs', label: 'Auditoría', icon: '📋' },
    { path: '/admin/backup', label: 'Backups', icon: '💾' },
    { path: '/admin/settings', label: 'Configuración', icon: '⚙️' }
  ];

  // Enlaces para cajeros
  const cajeroLinks = [
    { path: '/cajero/pos', label: 'Punto de Venta', icon: '🛒' },
    { path: '/cajero/history', label: 'Mis Ventas', icon: '📜' }
  ];

  // Seleccionar enlaces según rol
  const links = userRole === 'admin' ? adminLinks : cajeroLinks;

  /* ========================================================================= */
  /*  RENDERIZADO DE ENLACE                                                    */
  /* ========================================================================= */

  const renderNavLink = (link) => {
    return (
      <NavLink
        key={link.path}
        to={link.path}
        className={({ isActive }) =>
          `flex items-center gap-3 px-4 py-3 rounded-lg transition ${
            isActive
              ? 'bg-blue-600 text-white'
              : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
          } ${isCollapsed ? 'justify-center' : ''}`
        }
        title={isCollapsed ? link.label : ''}
      >
        <span className="text-xl">{link.icon}</span>
        {!isCollapsed && <span className="text-sm font-medium">{link.label}</span>}
      </NavLink>
    );
  };

  /* ========================================================================= */
  /*  RENDERIZADO DE CABECERA                                                  */
  /* ========================================================================= */

  const renderHeader = () => {
    if (isCollapsed) {
      return (
        <div className="flex justify-center py-4">
          <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-indigo-700 rounded-xl flex items-center justify-center text-white font-bold text-xl">
            C
          </div>
        </div>
      );
    }

    return (
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-indigo-700 rounded-lg flex items-center justify-center text-white font-bold text-lg">
            C
          </div>
          <span className="text-xl font-bold text-gray-800 dark:text-white">CoreX</span>
        </div>
        <div className="text-xs px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded-full">
          {userRole === 'admin' ? 'Admin' : 'Cajero'}
        </div>
      </div>
    );
  };

  /* ========================================================================= */
  /*  RENDERIZADO DE PERFIL DEL USUARIO                                        */
  /* ========================================================================= */

  const renderUserProfile = () => {
    if (isCollapsed) {
      return (
        <div className="flex justify-center mb-6">
          <div className="w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-xl">
            👤
          </div>
        </div>
      );
    }

    return (
      <div className="mb-6 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center text-lg font-bold">
            {userInitial}
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-medium text-gray-800 dark:text-white truncate">
              {displayName}
            </p>
            <p className="text-xs text-gray-500 truncate">
              {userRole === 'admin' ? 'Administrador' : 'Cajero'}
            </p>
          </div>
        </div>
      </div>
    );
  };

  /* ========================================================================= */
  /*  RENDERIZADO DEL PIE                                                      */
  /* ========================================================================= */

  const renderFooter = () => {
    if (isCollapsed) {
      return (
        <div className="space-y-2 border-t border-gray-200 pt-4 dark:border-gray-700">
          <div className="flex justify-center">
            <button
              type="button"
              onClick={handleLogout}
              disabled={isLoggingOut}
              className="p-2 text-red-500 transition hover:text-red-700 disabled:opacity-50"
              title="Cerrar sesión"
            >
              🚪
            </button>
          </div>
          <div className="flex justify-center">
            <button
              type="button"
              onClick={handleToggleCollapse}
              className="p-2 text-gray-500 transition hover:text-blue-600"
              title="Expandir"
            >
              ▶
            </button>
          </div>
        </div>
      );
    }

    return (
      <div className="space-y-2 border-t border-gray-200 pt-4 dark:border-gray-700">
        <NavLink
          to="/"
          className="flex w-full items-center justify-center gap-2 rounded-lg px-4 py-2 text-sm text-gray-600 transition hover:bg-gray-100 hover:text-gray-800 dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-white"
        >
          🌐 Ir al sitio público
        </NavLink>
        <button
          type="button"
          onClick={handleLogout}
          disabled={isLoggingOut}
          className="flex w-full items-center justify-center gap-2 rounded-lg px-4 py-2 text-sm text-red-600 transition hover:bg-red-50 disabled:opacity-50 dark:text-red-400 dark:hover:bg-red-900/20"
        >
          {isLoggingOut ? 'Saliendo...' : '🚪 Cerrar sesión'}
        </button>
        <button
          type="button"
          onClick={handleToggleCollapse}
          className="flex w-full items-center justify-center gap-2 px-4 py-2 text-sm text-gray-500 transition hover:text-blue-600"
        >
          ◀ Colapsar menú
        </button>
      </div>
    );
  };

  /* ========================================================================= */
  /*  RENDERIZADO PRINCIPAL                                                    */
  /* ========================================================================= */

  // Si es móvil y está cerrado, no mostrar
  if (isMobile && !isOpen) {
    return null;
  }

  return (
    <aside
      className={`bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 transition-all duration-300 ${
        isCollapsed ? 'w-20' : 'w-64'
      } ${isMobile ? 'fixed inset-y-0 left-0 z-50 shadow-xl' : 'relative'} flex flex-col h-full`}
    >
      {/* Contenido del sidebar */}
      <div className="flex-1 overflow-y-auto p-4">
        {renderHeader()}
        {renderUserProfile()}
        
        <nav className="space-y-1">
          {links.map(renderNavLink)}
        </nav>
      </div>
      
      <div className="p-4">
        {renderFooter()}
      </div>
    </aside>
  );
};

export default Sidebar;