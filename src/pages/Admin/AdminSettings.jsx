// Archivo: AdminSettings.jsx
// CoreX - Generado automáticamente

/* ========================================================================== */
/*                                                                            */
/*  📄 ARCHIVO: AdminSettings.jsx                                             */
/*  📁 UBICACIÓN: frontend/src/pages/Admin/AdminSettings.jsx                  */
/*  🚀 MÓDULO: Páginas de Administración                                      */
/*  🏷️  VERSIÓN: v1.0.0                                                      */
/*  📅 ÚLTIMA ACTUALIZACIÓN: 2026-05-22 10:30                                 */
/*  👨‍💻 AUTOR: CoreX Team                                                      */
/*                                                                            */
/* ========================================================================== */
/*                                                                            */
/*  🎯 PROPÓSITO                                                              */
/*  ------------------------------------------------------------------------  */
/*  Página de configuración general del sistema CoreX. Permite al            */
/*  administrador personalizar la apariencia, información de contacto,       */
/*  y preferencias generales del sistema.                                    */
/*                                                                            */
/*  🧩 FUNCIONALIDADES PRINCIPALES                                            */
/*  ------------------------------------------------------------------------  */
/*  ✅ Configuración del tema (oscuro/claro)                                 */
/*  ✅ Configuración de información de contacto                               */
/*  ✅ Configuración de WhatsApp                                             */
/*  ✅ Configuración de empresa                                               */
/*  ✅ Preferencias de notificaciones                                         */
/*  ✅ Cambio de contraseña del administrador                                 */
/*                                                                            */
/*  📦 DEPENDENCIAS                                                           */
/*  ------------------------------------------------------------------------  */
/*  • React - Librería principal                                              */
/*  • useState, useEffect - Hooks de React                                    */
/*  • useAuth - Hook personalizado para autenticación                         */
/*  • useSettings - Hook personalizado para configuración                     */
/*  • useTheme - Hook personalizado para tema                                 */
/*  • LoadingSpinner - Componente de carga                                    */
/*                                                                            */
/*  🔗 RELACIONES                                                             */
/*  ------------------------------------------------------------------------  */
/*  • Importado por: AppRoutes.js                                             */
/*  • Usa: useAuth, useSettings, useTheme, LoadingSpinner                     */
/*                                                                            */
/*  ⚠️ NOTAS IMPORTANTES                                                      */
/*  ------------------------------------------------------------------------  */
/*  • Solo accesible por usuarios administradores                             */
/*  • Los cambios se guardan en localStorage y/o backend                      */
/*  • El tema se aplica globalmente                                           */
/*                                                                            */
/*  🛠️ HISTORIAL DE CAMBIOS                                                   */
/*  ------------------------------------------------------------------------  */
/*  [v1.0.0] - 2026-05-22                                                    */
/*      ✅ Creación inicial                                                   */
/*      ✅ Configuración de tema                                              */
/*      ✅ Configuración de empresa                                           */
/*      ✅ Configuración de WhatsApp                                          */
/*      ✅ Cambio de contraseña                                               */
/*      ✅ Preferencias de notificaciones                                     */
/*                                                                            */
/* ========================================================================== */

import React, { useState, useEffect } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { useSettings } from '../../hooks/useSettings';
import { useTheme } from '../../hooks/useTheme';
import LoadingSpinner from '../../components/common/LoadingSpinner';

/* ========================================================================== */
/*  COMPONENTE PRINCIPAL                                                      */
/* ========================================================================== */

const AdminSettings = () => {
  const { user, changePassword, loading: authLoading } = useAuth();
  const { getSettings, updateSettings, loading: settingsLoading } = useSettings();
  const { theme, toggleTheme, setTheme } = useTheme();
  
  const [activeTab, setActiveTab] = useState('general');
  const [isLoading, setIsLoading] = useState(true);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  
  // Configuración general
  const [generalSettings, setGeneralSettings] = useState({
    site_name: 'CoreX',
    site_description: 'Soluciones Tecnológicas',
    contact_email: 'corexservice@gmail.com',
    contact_phone: '3115610825',
    address: 'Calle 123 #45-67, Centro Comercial Tecnológico, Local 305',
    city: 'Bogotá, Colombia'
  });
  
  // Configuración de WhatsApp
  const [whatsappSettings, setWhatsappSettings] = useState({
    whatsapp_number: '573115610825',
    whatsapp_message_default: 'Hola, me gustaría obtener más información sobre sus productos y servicios.',
    whatsapp_button_text: 'Consultar por WhatsApp'
  });
  
  // Preferencias
  const [preferences, setPreferences] = useState({
    notifications_enabled: true,
    email_notifications: true,
    low_stock_alert: true,
    daily_summary: false,
    items_per_page: 12,
    default_currency: 'COP'
  });
  
  // Cambio de contraseña
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  /* ========================================================================= */
  /*  CARGAR CONFIGURACIÓN                                                     */
  /* ========================================================================= */

  useEffect(() => {
    const loadSettings = async () => {
      setIsLoading(true);
      try {
        const data = await getSettings();
        if (data) {
          if (data.general) setGeneralSettings(prev => ({ ...prev, ...data.general }));
          if (data.whatsapp) setWhatsappSettings(prev => ({ ...prev, ...data.whatsapp }));
          if (data.preferences) setPreferences(prev => ({ ...prev, ...data.preferences }));
        }
      } catch (err) {
        console.error('Error loading settings:', err);
      } finally {
        setIsLoading(false);
      }
    };
    
    loadSettings();
  }, [getSettings]);

  /* ========================================================================= */
  /*  MANEJAR CAMBIOS EN FORMULARIOS                                           */
  /* ========================================================================= */

  const handleGeneralChange = (e) => {
    const { name, value } = e.target;
    setGeneralSettings(prev => ({ ...prev, [name]: value }));
  };

  const handleWhatsappChange = (e) => {
    const { name, value } = e.target;
    setWhatsappSettings(prev => ({ ...prev, [name]: value }));
  };

  const handlePreferencesChange = (e) => {
    const { name, value, type, checked } = e.target;
    setPreferences(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData(prev => ({ ...prev, [name]: value }));
  };

  /* ========================================================================= */
  /*  GUARDAR CONFIGURACIÓN                                                    */
  /* ========================================================================= */

  const handleSaveGeneral = async () => {
    try {
      await updateSettings({ general: generalSettings });
      setSuccessMessage('Configuración general guardada');
      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (err) {
      console.error('Error saving general settings:', err);
      setErrorMessage('Error al guardar la configuración');
      setTimeout(() => setErrorMessage(''), 3000);
    }
  };

  const handleSaveWhatsapp = async () => {
    try {
      await updateSettings({ whatsapp: whatsappSettings });
      setSuccessMessage('Configuración de WhatsApp guardada');
      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (err) {
      console.error('Error saving whatsapp settings:', err);
      setErrorMessage('Error al guardar la configuración');
      setTimeout(() => setErrorMessage(''), 3000);
    }
  };

  const handleSavePreferences = async () => {
    try {
      await updateSettings({ preferences });
      setSuccessMessage('Preferencias guardadas');
      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (err) {
      console.error('Error saving preferences:', err);
      setErrorMessage('Error al guardar las preferencias');
      setTimeout(() => setErrorMessage(''), 3000);
    }
  };

  /* ========================================================================= */
  /*  CAMBIAR CONTRASEÑA                                                       */
  /* ========================================================================= */

  const handleChangePassword = async (e) => {
    e.preventDefault();
    
    if (!passwordData.currentPassword) {
      setErrorMessage('La contraseña actual es requerida');
      return;
    }
    
    if (!passwordData.newPassword) {
      setErrorMessage('La nueva contraseña es requerida');
      return;
    }
    
    if (passwordData.newPassword.length < 6) {
      setErrorMessage('La nueva contraseña debe tener al menos 6 caracteres');
      return;
    }
    
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setErrorMessage('Las contraseñas nuevas no coinciden');
      return;
    }
    
    try {
      await changePassword({
        currentPassword: passwordData.currentPassword,
        newPassword: passwordData.newPassword
      });
      setSuccessMessage('Contraseña actualizada exitosamente');
      setPasswordData({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      });
      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (err) {
      console.error('Error changing password:', err);
      setErrorMessage(err.message || 'Error al cambiar la contraseña');
      setTimeout(() => setErrorMessage(''), 3000);
    }
  };

  /* ========================================================================= */
  /*  TEMAS                                                                   */
  /* ========================================================================= */

  const themes = [
    { id: 'light', name: 'Claro', icon: '☀️', description: 'Tema claro para ambientes iluminados' },
    { id: 'dark', name: 'Oscuro', icon: '🌙', description: 'Tema oscuro para ambientes con poca luz' },
    { id: 'system', name: 'Sistema', icon: '💻', description: 'Usar la configuración del sistema' }
  ];

  /* ========================================================================= */
  /*  RENDERIZADO DE TABS                                                      */
  /* ========================================================================= */

  const tabs = [
    { id: 'general', label: '⚙️ General', icon: '⚙️' },
    { id: 'whatsapp', label: '💬 WhatsApp', icon: '💬' },
    { id: 'preferences', label: '🎨 Preferencias', icon: '🎨' },
    { id: 'security', label: '🔒 Seguridad', icon: '🔒' },
    { id: 'theme', label: '🎨 Tema', icon: '🎨' }
  ];

  /* ========================================================================= */
  /*  RENDERIZADO PRINCIPAL                                                    */
  /* ========================================================================= */

  if (isLoading || authLoading || settingsLoading) {
    return (
      <div className="flex justify-center items-center h-96">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      
      {/* Encabezado */}
      <div>
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
          Configuración
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Personaliza la configuración del sistema
        </p>
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

      {/* Tabs */}
      <div className="border-b border-gray-200 dark:border-gray-700">
        <nav className="flex flex-wrap gap-2">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 rounded-t-lg transition ${
                activeTab === tab.id
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'
              }`}
            >
              {tab.icon} {tab.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Contenido de tabs */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        
        {/* Tab General */}
        {activeTab === 'general' && (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold mb-4">Información General</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Nombre del Sitio</label>
                <input
                  type="text"
                  name="site_name"
                  value={generalSettings.site_name}
                  onChange={handleGeneralChange}
                  className="w-full px-3 py-2 border rounded-lg dark:bg-gray-700"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Descripción</label>
                <input
                  type="text"
                  name="site_description"
                  value={generalSettings.site_description}
                  onChange={handleGeneralChange}
                  className="w-full px-3 py-2 border rounded-lg dark:bg-gray-700"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Email de Contacto</label>
                <input
                  type="email"
                  name="contact_email"
                  value={generalSettings.contact_email}
                  onChange={handleGeneralChange}
                  className="w-full px-3 py-2 border rounded-lg dark:bg-gray-700"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Teléfono de Contacto</label>
                <input
                  type="text"
                  name="contact_phone"
                  value={generalSettings.contact_phone}
                  onChange={handleGeneralChange}
                  className="w-full px-3 py-2 border rounded-lg dark:bg-gray-700"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium mb-1">Dirección</label>
                <input
                  type="text"
                  name="address"
                  value={generalSettings.address}
                  onChange={handleGeneralChange}
                  className="w-full px-3 py-2 border rounded-lg dark:bg-gray-700"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Ciudad</label>
                <input
                  type="text"
                  name="city"
                  value={generalSettings.city}
                  onChange={handleGeneralChange}
                  className="w-full px-3 py-2 border rounded-lg dark:bg-gray-700"
                />
              </div>
            </div>
            
            <div className="flex justify-end pt-4">
              <button
                onClick={handleSaveGeneral}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
              >
                Guardar Cambios
              </button>
            </div>
          </div>
        )}

        {/* Tab WhatsApp */}
        {activeTab === 'whatsapp' && (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold mb-4">Configuración de WhatsApp</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">
                  Número de WhatsApp (con código de país)
                </label>
                <input
                  type="text"
                  name="whatsapp_number"
                  value={whatsappSettings.whatsapp_number}
                  onChange={handleWhatsappChange}
                  placeholder="Ej: 573115610825"
                  className="w-full px-3 py-2 border rounded-lg dark:bg-gray-700"
                />
                <p className="text-xs text-gray-500 mt-1">Formato: código país + número (ej: 573115610825)</p>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Mensaje por Defecto</label>
                <textarea
                  name="whatsapp_message_default"
                  value={whatsappSettings.whatsapp_message_default}
                  onChange={handleWhatsappChange}
                  rows="3"
                  className="w-full px-3 py-2 border rounded-lg dark:bg-gray-700"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Texto del Botón</label>
                <input
                  type="text"
                  name="whatsapp_button_text"
                  value={whatsappSettings.whatsapp_button_text}
                  onChange={handleWhatsappChange}
                  className="w-full px-3 py-2 border rounded-lg dark:bg-gray-700"
                />
              </div>
            </div>
            
            <div className="flex justify-end pt-4">
              <button
                onClick={handleSaveWhatsapp}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
              >
                Guardar Cambios
              </button>
            </div>
          </div>
        )}

        {/* Tab Preferencias */}
        {activeTab === 'preferences' && (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold mb-4">Preferencias del Sistema</h2>
            
            <div className="space-y-3">
              <label className="flex items-center justify-between cursor-pointer py-2">
                <span>Activar notificaciones</span>
                <input
                  type="checkbox"
                  name="notifications_enabled"
                  checked={preferences.notifications_enabled}
                  onChange={handlePreferencesChange}
                  className="w-5 h-5"
                />
              </label>
              
              <label className="flex items-center justify-between cursor-pointer py-2">
                <span>Notificaciones por email</span>
                <input
                  type="checkbox"
                  name="email_notifications"
                  checked={preferences.email_notifications}
                  onChange={handlePreferencesChange}
                  className="w-5 h-5"
                />
              </label>
              
              <label className="flex items-center justify-between cursor-pointer py-2">
                <span>Alerta de bajo stock</span>
                <input
                  type="checkbox"
                  name="low_stock_alert"
                  checked={preferences.low_stock_alert}
                  onChange={handlePreferencesChange}
                  className="w-5 h-5"
                />
              </label>
              
              <label className="flex items-center justify-between cursor-pointer py-2">
                <span>Resumen diario de ventas</span>
                <input
                  type="checkbox"
                  name="daily_summary"
                  checked={preferences.daily_summary}
                  onChange={handlePreferencesChange}
                  className="w-5 h-5"
                />
              </label>
              
              <div>
                <label className="block text-sm font-medium mb-1">Productos por página</label>
                <select
                  name="items_per_page"
                  value={preferences.items_per_page}
                  onChange={handlePreferencesChange}
                  className="w-full px-3 py-2 border rounded-lg dark:bg-gray-700"
                >
                  <option value={12}>12 productos</option>
                  <option value={24}>24 productos</option>
                  <option value={48}>48 productos</option>
                  <option value={96}>96 productos</option>
                </select>
              </div>
            </div>
            
            <div className="flex justify-end pt-4">
              <button
                onClick={handleSavePreferences}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
              >
                Guardar Cambios
              </button>
            </div>
          </div>
        )}

        {/* Tab Seguridad */}
        {activeTab === 'security' && (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold mb-4">Cambiar Contraseña</h2>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
              Usuario: <strong>{user?.email}</strong>
            </p>
            
            <form onSubmit={handleChangePassword} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Contraseña Actual</label>
                <input
                  type="password"
                  name="currentPassword"
                  value={passwordData.currentPassword}
                  onChange={handlePasswordChange}
                  className="w-full px-3 py-2 border rounded-lg dark:bg-gray-700"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Nueva Contraseña</label>
                <input
                  type="password"
                  name="newPassword"
                  value={passwordData.newPassword}
                  onChange={handlePasswordChange}
                  className="w-full px-3 py-2 border rounded-lg dark:bg-gray-700"
                  required
                />
                <p className="text-xs text-gray-500 mt-1">Mínimo 6 caracteres</p>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Confirmar Nueva Contraseña</label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={passwordData.confirmPassword}
                  onChange={handlePasswordChange}
                  className="w-full px-3 py-2 border rounded-lg dark:bg-gray-700"
                  required
                />
              </div>
              
              <div className="flex justify-end pt-4">
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                >
                  Cambiar Contraseña
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Tab Tema */}
        {activeTab === 'theme' && (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold mb-4">Apariencia</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {themes.map(themeOption => (
                <button
                  key={themeOption.id}
                  onClick={() => setTheme(themeOption.id)}
                  className={`p-4 border-2 rounded-lg text-center transition ${
                    theme === themeOption.id
                      ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                      : 'border-gray-200 dark:border-gray-700 hover:border-gray-300'
                  }`}
                >
                  <div className="text-4xl mb-2">{themeOption.icon}</div>
                  <h3 className="font-semibold">{themeOption.name}</h3>
                  <p className="text-xs text-gray-500 mt-1">{themeOption.description}</p>
                </button>
              ))}
            </div>
            
            <div className="mt-4 p-4 bg-gray-100 dark:bg-gray-700 rounded-lg">
              <p className="text-sm">
                💡 El tema se aplica automáticamente a toda la interfaz del sistema.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminSettings;