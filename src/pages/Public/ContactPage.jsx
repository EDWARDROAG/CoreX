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
import PageHero from '../../components/ui/PageHero';
import { getWhatsAppLink } from '../../utils/whatsappHelper';

/* ========================================================================== */
/*  DATOS DE CONTACTO                                                         */
/* ========================================================================== */

import { SITE_CONTACT, FOOTER_SOCIAL } from '../../data/siteInfo';

const CONTACT_INFO = SITE_CONTACT;

const SOCIAL_MEDIA = FOOTER_SOCIAL.map((s) => ({
  ...s,
  icon: s.name === 'Facebook' ? '📘' : s.name === 'Instagram' ? '📷' : s.name === 'WhatsApp' ? '💬' : '🎵',
  color: s.name === 'Facebook' ? 'bg-blue-700' : s.name === 'Instagram' ? 'bg-pink-600' : s.name === 'WhatsApp' ? 'bg-green-500' : 'bg-black',
}));

/* ========================================================================== */
/*  COMPONENTE PRINCIPAL                                                      */
/* ========================================================================== */

const ContactPage = () => {
  const { getDefaultWhatsAppNumber } = useWhatsApp();
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
    window.open(getWhatsAppLink('contact'), '_blank');
  };

  return (
    <>
      <PageHero
        title="Contacto"
        subtitle="Estamos aquí para ayudarte. Escríbenos por cualquiera de nuestros canales."
        breadcrumbs={[
          { label: 'Inicio', to: '/' },
          { label: 'Contacto' },
        ]}
      />

      <div className="corex-section corex-section-alt">
        <div className="corex-container">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
            <div className="space-y-6 lg:col-span-1">
              <div className="corex-card p-6">
                <h2 className="corex-section-title mb-4 text-xl">Información de Contacto</h2>
                <div className="space-y-4 text-sm">
                  <div>
                    <p className="text-gray-500">Teléfono</p>
                    <a href={`tel:${CONTACT_INFO.phone.replace(/\s/g, '')}`} className="font-semibold text-gray-900 hover:text-purple-600">
                      {CONTACT_INFO.phone}
                    </a>
                  </div>
                  <div>
                    <p className="text-gray-500">Email</p>
                    <a href={`mailto:${CONTACT_INFO.email}`} className="font-semibold text-gray-900 hover:text-purple-600">
                      {CONTACT_INFO.email}
                    </a>
                  </div>
                  <div>
                    <p className="text-gray-500">Dirección</p>
                    <p className="font-semibold text-gray-900">{CONTACT_INFO.address}</p>
                    <p className="text-gray-500">{CONTACT_INFO.city}</p>
                  </div>
                </div>
              </div>

              <div className="corex-card p-6">
                <h2 className="corex-section-title mb-4 text-xl">Horarios</h2>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between gap-4">
                    <span className="text-gray-500">Lunes a Viernes</span>
                    <span className="font-medium">9:00 AM - 7:00 PM</span>
                  </div>
                  <div className="flex justify-between gap-4">
                    <span className="text-gray-500">Sábados</span>
                    <span className="font-medium">10:00 AM - 4:00 PM</span>
                  </div>
                  <div className="flex justify-between gap-4">
                    <span className="text-gray-500">Domingos</span>
                    <span className="font-medium text-red-500">Cerrado</span>
                  </div>
                </div>
              </div>

              <div className="corex-card p-6">
                <h2 className="corex-section-title mb-4 text-xl">Síguenos</h2>
                <div className="grid grid-cols-2 gap-3">
                  {SOCIAL_MEDIA.map((social) => (
                    <a
                      key={social.name}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`${social.color} flex items-center justify-center gap-2 rounded-lg px-4 py-2 text-sm text-white transition hover:opacity-90`}
                    >
                      <span>{social.icon}</span>
                      <span>{social.name}</span>
                    </a>
                  ))}
                </div>
              </div>
            </div>

            <div className="lg:col-span-2">
              <div className="corex-card p-6">
                <h2 className="corex-section-title mb-4 text-xl">Envíanos un Mensaje</h2>

                {formSent ? (
                  <div className="corex-empty-state">
                    <h3 className="text-xl font-bold text-gray-900">¡Mensaje enviado!</h3>
                    <p className="corex-page-subtitle">Te redirigiremos a WhatsApp para completar tu mensaje</p>
                  </div>
                ) : (
                  <form onSubmit={handleFormSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                      <div>
                        <label className="corex-label" htmlFor="name">Nombre *</label>
                        <input id="name" type="text" name="name" value={formData.name} onChange={handleFormChange} className="corex-input" required />
                      </div>
                      <div>
                        <label className="corex-label" htmlFor="phone">Teléfono *</label>
                        <input id="phone" type="tel" name="phone" value={formData.phone} onChange={handleFormChange} className="corex-input" required />
                      </div>
                    </div>
                    <div>
                      <label className="corex-label" htmlFor="email">Email</label>
                      <input id="email" type="email" name="email" value={formData.email} onChange={handleFormChange} className="corex-input" />
                    </div>
                    <div>
                      <label className="corex-label" htmlFor="subject">Asunto *</label>
                      <input id="subject" type="text" name="subject" value={formData.subject} onChange={handleFormChange} className="corex-input" required />
                    </div>
                    <div>
                      <label className="corex-label" htmlFor="message">Mensaje *</label>
                      <textarea id="message" name="message" value={formData.message} onChange={handleFormChange} rows="5" className="corex-textarea" required />
                    </div>
                    <button type="submit" className="corex-btn-gradient corex-btn-gradient--md w-full sm:w-auto">
                      Enviar por WhatsApp
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>

          <div className="corex-card mt-8 p-6">
            <h2 className="corex-section-title mb-4 text-xl">Nuestra Ubicación</h2>
            <div className="aspect-video w-full overflow-hidden rounded-lg">
              <iframe
                src={CONTACT_INFO.mapsEmbedUrl}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Ubicación CoreX"
                className="h-full w-full"
              />
            </div>
            <p className="mt-3 text-center text-sm text-gray-500">
              {CONTACT_INFO.address}, {CONTACT_INFO.city}
            </p>
          </div>

          <div className="mt-8 text-center">
            <button type="button" onClick={handleWhatsAppContact} className="corex-btn-whatsapp px-8 py-3">
              Chatear por WhatsApp
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ContactPage;