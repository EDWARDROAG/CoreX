// Archivo: Footer.jsx
// CoreX - Generado automáticamente

/* ========================================================================== */
/*                                                                            */
/*  📄 ARCHIVO: Footer.jsx                                                    */
/*  📁 UBICACIÓN: frontend/src/components/common/Footer.jsx                   */
/*  🚀 MÓDULO: Componentes Comunes                                            */
/*  🏷️  VERSIÓN: v1.0.0                                                      */
/*  📅 ÚLTIMA ACTUALIZACIÓN: 2026-05-22 10:30                                 */
/*  👨‍💻 AUTOR: CoreX Team                                                      */
/*                                                                            */
/* ========================================================================== */
/*                                                                            */
/*  🎯 PROPÓSITO                                                              */
/*  ------------------------------------------------------------------------  */
/*  Pie de página principal del sitio CoreX. Contiene información de         */
/*  contacto, enlaces rápidos, redes sociales, y datos legales.              */
/*                                                                            */
/*  🧩 FUNCIONALIDADES PRINCIPALES                                            */
/*  ------------------------------------------------------------------------  */
/*  ✅ Mostrar información de contacto                                        */
/*  ✅ Enlaces rápidos a secciones principales                                */
/*  ✅ Enlaces a redes sociales                                               */
/*  ✅ Información de derechos de autor                                       */
/*  ✅ Año actual dinámico                                                    */
/*  ✅ Diseño responsivo                                                      */
/*                                                                            */
/*  📦 DEPENDENCIAS                                                           */
/*  ------------------------------------------------------------------------  */
/*  • React - Librería principal                                              */
/*  • Link - React Router DOM                                                 */
/*  • useWhatsApp - Hook personalizado para WhatsApp                          */
/*                                                                            */
/*  🔗 RELACIONES                                                             */
/*  ------------------------------------------------------------------------  */
/*  • Importado por: App.jsx                                                  */
/*  • Usa: useWhatsApp                                                        */
/*  • Se muestra en todas las páginas                                         */
/*                                                                            */
/*  ⚠️ NOTAS IMPORTANTES                                                      */
/*  ------------------------------------------------------------------------  */
/*  • El año se actualiza automáticamente                                     */
/*  • Los enlaces de WhatsApp abren en nueva pestaña                          */
/*  • Se adapta a móviles y desktop                                           */
/*                                                                            */
/*  🛠️ HISTORIAL DE CAMBIOS                                                   */
/*  ------------------------------------------------------------------------  */
/*  [v1.0.0] - 2026-05-22                                                    */
/*      ✅ Creación inicial                                                   */
/*      ✅ Información de contacto                                            */
/*      ✅ Enlaces rápidos                                                    */
/*      ✅ Redes sociales                                                     */
/*      ✅ Copyright dinámico                                                 */
/*                                                                            */
/* ========================================================================== */

import React from 'react';
import { Link } from 'react-router-dom';
import { useWhatsApp } from '../../hooks/useWhatsApp';

/* ========================================================================== */
/*  COMPONENTE PRINCIPAL                                                      */
/* ========================================================================== */

const Footer = () => {
  const { getDefaultWhatsAppNumber } = useWhatsApp();
  const currentYear = new Date().getFullYear();

  /* ========================================================================= */
  /*  ENLACES RÁPIDOS                                                          */
  /* ========================================================================= */

  const quickLinks = [
    { path: '/', label: 'Inicio' },
    { path: '/products', label: 'Productos' },
    { path: '/maintenance', label: 'Mantenimiento' },
    { path: '/contact', label: 'Contacto' }
  ];

  /* ========================================================================= */
  /*  CATEGORÍAS DE MANTENIMIENTO                                              */
  /* ========================================================================= */

  const maintenanceLinks = [
    { path: '/maintenance/celulares', label: 'Celulares' },
    { path: '/maintenance/computadores', label: 'Computadores' },
    { path: '/maintenance/laptops', label: 'Laptops' },
    { path: '/maintenance/impresoras', label: 'Impresoras' }
  ];

  /* ========================================================================= */
  /*  REDES SOCIALES                                                           */
  /* ========================================================================= */

  const socialLinks = [
    { name: 'Facebook', url: 'https://facebook.com/corex', icon: '📘', color: 'hover:bg-blue-700' },
    { name: 'Instagram', url: 'https://instagram.com/corex', icon: '📷', color: 'hover:bg-pink-600' },
    { name: 'WhatsApp', url: `https://wa.me/${getDefaultWhatsAppNumber()}`, icon: '💬', color: 'hover:bg-green-600' },
    { name: 'TikTok', url: 'https://tiktok.com/@corex', icon: '🎵', color: 'hover:bg-black' }
  ];

  /* ========================================================================= */
  /*  RENDERIZADO DE SECCIÓN                                                   */
  /* ========================================================================= */

  const renderSection = (title, links, isExternal = false) => {
    return (
      <div>
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
          {title}
        </h3>
        <ul className="space-y-2">
          {links.map((link, idx) => (
            <li key={idx}>
              {isExternal ? (
                <a
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition"
                >
                  {link.icon && <span className="mr-2">{link.icon}</span>}
                  {link.label}
                </a>
              ) : (
                <Link
                  to={link.path}
                  className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition"
                >
                  {link.label}
                </Link>
              )}
            </li>
          ))}
        </ul>
      </div>
    );
  };

  /* ========================================================================= */
  /*  RENDERIZADO DE REDES SOCIALES                                            */
  /* ========================================================================= */

  const renderSocialLinks = () => {
    return (
      <div>
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
          Síguenos
        </h3>
        <div className="flex gap-3">
          {socialLinks.map((social, idx) => (
            <a
              key={idx}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`w-10 h-10 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center text-xl transition ${social.color} hover:text-white`}
              aria-label={social.name}
            >
              {social.icon}
            </a>
          ))}
        </div>
      </div>
    );
  };

  /* ========================================================================= */
  /*  RENDERIZADO PRINCIPAL                                                    */
  /* ========================================================================= */

  return (
    <footer className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 mt-auto">
      {/* Footer principal */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* Logo y descripción */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-indigo-700 rounded-lg flex items-center justify-center text-white font-bold text-xl">
                C
              </div>
              <span className="text-xl font-bold text-gray-800 dark:text-white">CoreX</span>
            </div>
            <p className="text-gray-600 dark:text-gray-400 mb-4 text-sm">
              Soluciones tecnológicas para tus dispositivos. 
              Mantenimiento, venta de equipos nuevos y usados, 
              accesorios y más.
            </p>
            <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
              <span>📍</span>
              <span>Bogotá, Colombia</span>
            </div>
          </div>

          {/* Enlaces rápidos */}
          {renderSection('Enlaces Rápidos', quickLinks)}

          {/* Mantenimiento */}
          {renderSection('Mantenimiento', maintenanceLinks)}

          {/* Redes sociales y contacto */}
          <div>
            {renderSocialLinks()}
            
            <div className="mt-6">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
                Contacto
              </h3>
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                  <span>📞</span>
                  <a href="tel:3115610825" className="hover:text-blue-600 transition">
                    311 561 0825
                  </a>
                </div>
                <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                  <span>✉️</span>
                  <a href="mailto:corexservice@gmail.com" className="hover:text-blue-600 transition">
                    corexservice@gmail.com
                  </a>
                </div>
                <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                  <span>⏰</span>
                  <span>Lun-Vie: 9am - 7pm</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                  <span>📅</span>
                  <span>Sáb: 10am - 4pm</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-gray-200 dark:border-gray-800">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
            <p>
              © {currentYear} CoreX. Todos los derechos reservados.
            </p>
            <div className="flex gap-6">
              <Link to="/privacy" className="hover:text-blue-600 transition">
                Política de Privacidad
              </Link>
              <Link to="/terms" className="hover:text-blue-600 transition">
                Términos y Condiciones
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;