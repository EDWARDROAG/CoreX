// Archivo: ContactPage.jsx
// CoreX - Generado automáticamente

/* ========================================================================== */
/*                                                                            */
/*  📄 ARCHIVO: ContactPage.jsx                                               */
/*  📁 UBICACIÓN: frontend/src/pages/Public/ContactPage.jsx                   */
/*  🚀 MÓDULO: Páginas Públicas                                               */
/*  🏷️  VERSIÓN: v1.0.0                                                      */
/*  📅 ÚLTIMA ACTUALIZACIÓN: 2026-05-22 10:30                                 */
/*  👨‍💻 AUTOR: CoreX Team                                                      */
/*                                                                            */
/* ========================================================================== */
/*                                                                            */
/*  🎯 PROPÓSITO                                                              */
/*  ------------------------------------------------------------------------  */
/*  Página de contacto del sitio CoreX. Proporciona información de contacto,  */
/*  ubicación, horarios de atención, y un formulario para enviar mensajes    */
/*  directamente por WhatsApp.                                               */
/*                                                                            */
/*  🧩 FUNCIONALIDADES PRINCIPALES                                            */
/*  ------------------------------------------------------------------------  */
/*  ✅ Mostrar información de contacto (teléfono, email)                      */
/*  ✅ Mostrar horarios de atención                                           */
/*  ✅ Mostrar ubicación (mapa embebido)                                      */
/*  ✅ Formulario de contacto con validación                                  */
/*  ✅ Envío de mensajes por WhatsApp                                         */
/*  ✅ Enlaces a redes sociales                                               */
/*                                                                            */
/*  📦 DEPENDENCIAS                                                           */
/*  ------------------------------------------------------------------------  */
/*  • React - Librería principal                                              */
/*  • useState - Hook de React                                                */
/*  • useWhatsApp - Hook para enlaces de WhatsApp                             */
/*                                                                            */
/*  🔗 RELACIONES                                                             */
/*  ------------------------------------------------------------------------  */
/*  • Importado por: AppRoutes.js                                             */
/*  • Usa: useWhatsApp                                                        */
/*  • Navega a: WhatsApp para envío de mensajes                               */
/*                                                                            */
/*  ⚠️ NOTAS IMPORTANTES                                                      */
/*  ------------------------------------------------------------------------  */
/*  • El formulario envía mensajes por WhatsApp                              */
/*  • No se almacenan datos en el servidor                                    */
/*  • El mapa usa iframe de Google Maps                                       */
/*                                                                            */
/*  🛠️ HISTORIAL DE CAMBIOS                                                   */
/*  ------------------------------------------------------------------------  */
/*  [v1.0.0] - 2026-05-22                                                    */
/*      ✅ Creación inicial                                                   */
/*      ✅ Información de contacto                                            */
/*      ✅ Horarios de atención                                               */
/*      ✅ Formulario de contacto                                             */
/*      ✅ Integración con WhatsApp                                           */
/*      ✅ Mapa de ubicación                                                  */
/*                                                                            */
/* ========================================================================== */

import React, { useState } from 'react';
import { useWhatsApp } from '../../hooks/useWhatsApp';

/* ========================================================================== */
/*  DATOS DE CONTACTO                                                         */
/* ========================================================================== */

const CONTACT_INFO = {
  phone: '311 561 0825',
  phoneInternational: '+57 311 561 0825',
  email: 'corexservice@gmail.com',
  address: 'Calle 123 #45-67, Centro Comercial Tecnológico, Local 305',
  city: 'Bogotá, Colombia',
  schedule: {
    weekdays: 'Lunes a Viernes: 9:00 AM - 7:00 PM',
    saturday: 'Sábados: 10:00 AM - 4:00 PM',
    sunday: 'Domingos: Cerrado'
  }
};

const SOCIAL_MEDIA = [
  { name: 'Facebook', url: 'https://facebook.com/corex', icon: '📘', color: 'bg-blue-700' },
  { name: 'Instagram', url: 'https://instagram.com/corex', icon: '📷', color: 'bg-pink-600' },
  { name: 'WhatsApp', url: 'https://wa.me/573115610825', icon: '💬', color: 'bg-green-500' },
  { name: 'TikTok', url: 'https://tiktok.com/@corex', icon: '🎵', color: 'bg-black' }
];

/* ========================================================================== */
/*  COMPONENTE PRINCIPAL                                                      */
/* ========================================================================== */

const ContactPage = () => {
  const { generateGeneralInquiryLink, getDefaultWhatsAppNumber } = useWhatsApp();
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    subject: '',
    message: ''
  });
  const [formSent, setFormSent] = useState(false);

  /* ========================================================================= */
  /*  MANEJAR FORMULARIO                                                        */
  /* ========================================================================= */

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    
    const message = `📋 *NUEVO CONTACTO DESDE WEB* 📋\n\n` +
      `*Nombre:* ${formData.name}\n` +
      `*Teléfono:* ${formData.phone}\n` +
      `*Email:* ${formData.email}\n` +
      `*Asunto:* ${formData.subject}\n\n` +
      `*Mensaje:*\n${formData.message}`;
    
    const whatsappLink = `https://wa.me/${getDefaultWhatsAppNumber()}?text=${encodeURIComponent(message)}`;
    window.open(whatsappLink, '_blank');
    setFormSent(true);
    
    // Resetear formulario
    setFormData({
      name: '',
      phone: '',
      email: '',
      subject: '',
      message: ''
    });
    
    setTimeout(() => {
      setFormSent(false);
    }, 5000);
  };

  const handleWhatsAppContact = () => {
    const link = generateGeneralInquiryLink();
    window.open(link, '_blank');
  };

  /* ========================================================================= */
  /*  RENDERIZADO                                                              */
  /* ========================================================================= */

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 py-8">
        
        {/* Encabezado */}
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white mb-4">
            Contáctanos
          </h1>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Estamos aquí para ayudarte. Contáctanos por cualquiera de nuestros canales
          </p>
        </div>

        {/* Grid principal */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          
          {/* Información de contacto */}
          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 mb-6">
              <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4">
                Información de Contacto
              </h2>
              
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="text-blue-500 text-xl">📞</div>
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Teléfono</p>
                    <a href={`tel:${CONTACT_INFO.phone.replace(/\s/g, '')}`} className="text-gray-800 dark:text-white hover:text-blue-600">
                      {CONTACT_INFO.phone}
                    </a>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="text-blue-500 text-xl">✉️</div>
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Email</p>
                    <a href={`mailto:${CONTACT_INFO.email}`} className="text-gray-800 dark:text-white hover:text-blue-600">
                      {CONTACT_INFO.email}
                    </a>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="text-blue-500 text-xl">📍</div>
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Dirección</p>
                    <p className="text-gray-800 dark:text-white">{CONTACT_INFO.address}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{CONTACT_INFO.city}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Horarios */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 mb-6">
              <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4">
                Horarios de Atención
              </h2>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Lunes a Viernes</span>
                  <span className="text-gray-800 dark:text-white font-medium">9:00 AM - 7:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Sábados</span>
                  <span className="text-gray-800 dark:text-white font-medium">10:00 AM - 4:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Domingos</span>
                  <span className="text-red-500">Cerrado</span>
                </div>
              </div>
            </div>

            {/* Redes Sociales */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
              <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4">
            Síguenos
              </h2>
              <div className="grid grid-cols-2 gap-3">
                {SOCIAL_MEDIA.map((social) => (
                  <a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`${social.color} text-white px-4 py-2 rounded-lg flex items-center justify-center gap-2 hover:opacity-90 transition`}
                  >
                    <span>{social.icon}</span>
                    <span className="text-sm">{social.name}</span>
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Formulario de contacto */}
          <div className="lg:col-span-2">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
              <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4">
                Envíanos un Mensaje
              </h2>
              
              {formSent ? (
                <div className="text-center py-8">
                  <div className="text-5xl mb-4">✅</div>
                  <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
                    ¡Mensaje Enviado!
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    Te redirigiremos a WhatsApp para completar tu mensaje
                  </p>
                </div>
              ) : (
                <form onSubmit={handleFormSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Nombre *
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleFormChange}
                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Teléfono *
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleFormChange}
                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        required
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleFormChange}
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Asunto *
                    </label>
                    <input
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleFormChange}
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Mensaje *
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleFormChange}
                      rows="5"
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                    ></textarea>
                  </div>
                  
                  <button
                    type="submit"
                    className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
                  >
                    Enviar por WhatsApp
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>

        {/* Mapa de ubicación */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
          <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4">
            Nuestra Ubicación
          </h2>
          <div className="aspect-video w-full rounded-lg overflow-hidden">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1x3976.789955282096!2d-74.083115!3d4.60971!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8e3f99bf6d8f8b8b%3A0x8b8b8b8b8b8b8b8b!2sBogot%C3%A1!5e0!3m2!1ses!2sco!4v1699999999999!5m2!1ses!2sco"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Ubicación CoreX"
              className="w-full h-full"
            ></iframe>
          </div>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-3 text-center">
            {CONTACT_INFO.address}, {CONTACT_INFO.city}
          </p>
        </div>

        {/* Botón flotante de WhatsApp */}
        <div className="fixed bottom-6 right-6 z-50">
          <button
            onClick={handleWhatsAppContact}
            className="bg-green-500 text-white p-4 rounded-full shadow-lg hover:bg-green-600 transition transform hover:scale-105 flex items-center justify-center"
          >
            <span className="text-2xl">💬</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;