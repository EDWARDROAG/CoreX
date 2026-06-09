// Archivo: MaintenancePage.jsx
// CoreX - Generado automáticamente

/* ========================================================================== */
/*                                                                            */
/*  📄 ARCHIVO: MaintenancePage.jsx                                           */
/*  📁 UBICACIÓN: frontend/src/pages/Public/MaintenancePage.jsx               */
/*  🚀 MÓDULO: Páginas Públicas                                               */
/*  🏷️  VERSIÓN: v1.0.0                                                      */
/*  📅 ÚLTIMA ACTUALIZACIÓN: 2026-05-22 10:30                                 */
/*  👨‍💻 AUTOR: CoreX Team                                                      */
/*                                                                            */
/* ========================================================================== */
/*                                                                            */
/*  🎯 PROPÓSITO                                                              */
/*  ------------------------------------------------------------------------  */
/*  Página de servicios de mantenimiento del sitio CoreX. Muestra los        */
/*  diferentes tipos de mantenimiento ofrecidos (celulares, computadores,    */
/*  laptops, impresoras), sus precios y características.                     */
/*                                                                            */
/*  🧩 FUNCIONALIDADES PRINCIPALES                                            */
/*  ------------------------------------------------------------------------  */
/*  ✅ Mostrar servicios de mantenimiento por categoría                       */
/*  ✅ Listar precios y tipos de mantenimiento                                */
/*  ✅ Mostrar características y beneficios                                   */
/*  ✅ Botón de consulta por WhatsApp                                         */
/*  ✅ Formulario de contacto para cotización                                 */
/*  ✅ Información de tiempo de entrega                                       */
/*                                                                            */
/*  📦 DEPENDENCIAS                                                           */
/*  ------------------------------------------------------------------------  */
/*  • React - Librería principal                                              */
/*  • useState - Hook de React                                                */
/*  • useParams - Hook para parámetros de URL                                 */
/*  • useWhatsApp - Hook para enlaces de WhatsApp                             */
/*                                                                            */
/*  🔗 RELACIONES                                                             */
/*  ------------------------------------------------------------------------  */
/*  • Importado por: AppRoutes.js                                             */
/*  • Usa: useWhatsApp                                                        */
/*  • Navega a: WhatsApp para consultas                                       */
/*                                                                            */
/*  ⚠️ NOTAS IMPORTANTES                                                      */
/*  ------------------------------------------------------------------------  */
/*  • Los precios son referenciales                                           */
/*  • El tiempo de entrega puede variar según la complejidad                  */
/*  • Incluye garantía en todos los servicios                                 */
/*                                                                            */
/*  🛠️ HISTORIAL DE CAMBIOS                                                   */
/*  ------------------------------------------------------------------------  */
/*  [v1.0.0] - 2026-05-22                                                    */
/*      ✅ Creación inicial                                                   */
/*      ✅ Listado de servicios                                               */
/*      ✅ Precios y características                                          */
/*      ✅ Integración con WhatsApp                                           */
/*      ✅ Formulario de contacto                                             */
/*                                                                            */
/* ========================================================================== */

import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useWhatsApp } from '../../hooks/useWhatsApp';

/* ========================================================================== */
/*  DATOS DE SERVICIOS DE MANTENIMIENTO                                       */
/* ========================================================================== */

const MAINTENANCE_SERVICES = {
  celulares: {
    title: 'Mantenimiento de Celulares',
    icon: '📱',
    color: 'bg-blue-500',
    description: 'Servicio técnico especializado para todo tipo de celulares',
    services: [
      {
        name: 'Diagnóstico General',
        price: 'Gratis',
        description: 'Revisión completa del equipo sin compromiso',
        features: ['Evaluación de daños', 'Presupuesto sin costo', 'Tiempo estimado: 30min']
      },
      {
        name: 'Cambio de Pantalla',
        price: 'Desde $80.000',
        description: 'Reemplazo de pantalla rota o con fallas',
        features: ['Piezas originales', 'Garantía 3 meses', 'Tiempo: 1-2 horas']
      },
      {
        name: 'Cambio de Batería',
        price: 'Desde $60.000',
        description: 'Reemplazo de batería desgastada',
        features: ['Batería nueva original', 'Prueba de carga', 'Tiempo: 1 hora']
      },
      {
        name: 'Limpieza Interna',
        price: '$40.000',
        description: 'Limpieza de conector de carga y componentes',
        features: ['Eliminación de polvo', 'Limpieza de puertos', 'Tiempo: 1 hora']
      },
      {
        name: 'Reparación de Placa',
        price: 'Desde $120.000',
        description: 'Reparación de fallas en placa madre',
        features: ['Microsoldadura', 'Diagnóstico avanzado', 'Tiempo: 2-3 días']
      },
      {
        name: 'Recuperación de Datos',
        price: 'Desde $150.000',
        description: 'Recuperación de fotos, contactos y archivos',
        features: ['Software especializado', 'Confidencialidad', 'Tiempo: 2-5 días']
      }
    ]
  },
  computadores: {
    title: 'Mantenimiento de Computadores',
    icon: '💻',
    color: 'bg-green-500',
    description: 'Servicio técnico para PC de escritorio',
    services: [
      {
        name: 'Diagnóstico General',
        price: 'Gratis',
        description: 'Revisión completa del equipo',
        features: ['Evaluación de hardware', 'Presupuesto sin costo', 'Tiempo: 30min']
      },
      {
        name: 'Mantenimiento Preventivo',
        price: '$60.000',
        description: 'Limpieza y optimización del sistema',
        features: ['Limpieza física', 'Optimización de software', 'Tiempo: 2 horas']
      },
      {
        name: 'Formateo e Instalación',
        price: '$80.000',
        description: 'Instalación limpia de Windows',
        features: ['Drivers actualizados', 'Software básico', 'Tiempo: 3-4 horas']
      },
      {
        name: 'Actualización de RAM/SSD',
        price: 'Desde $100.000 + pieza',
        description: 'Mejora de rendimiento del equipo',
        features: ['Instalación profesional', 'Pruebas de rendimiento', 'Tiempo: 1-2 horas']
      },
      {
        name: 'Reparación de Fuente',
        price: 'Desde $80.000',
        description: 'Reparación o cambio de fuente de poder',
        features: ['Pruebas de voltaje', 'Piezas de calidad', 'Tiempo: 2 horas']
      },
      {
        name: 'Eliminación de Virus',
        price: '$50.000',
        description: 'Limpieza de malware y virus',
        features: ['Antivirus especializado', 'Optimización', 'Tiempo: 2 horas']
      }
    ]
  },
  laptops: {
    title: 'Mantenimiento de Laptops',
    icon: '🖥️',
    color: 'bg-purple-500',
    description: 'Servicio técnico para portátiles',
    services: [
      {
        name: 'Diagnóstico General',
        price: 'Gratis',
        description: 'Revisión completa del portátil',
        features: ['Evaluación completa', 'Presupuesto sin costo', 'Tiempo: 30min']
      },
      {
        name: 'Limpieza y Mantenimiento',
        price: '$70.000',
        description: 'Limpieza de ventiladores y disipador',
        features: ['Pasta térmica nueva', 'Limpieza interna', 'Tiempo: 2 horas']
      },
      {
        name: 'Cambio de Teclado',
        price: 'Desde $90.000',
        description: 'Reemplazo de teclado dañado',
        features: ['Teclado original', 'Prueba de teclas', 'Tiempo: 2-3 horas']
      },
      {
        name: 'Reparación de Bisagras',
        price: 'Desde $70.000',
        description: 'Reparación de bisagras rotas',
        features: ['Refuerzo estructural', 'Alineación', 'Tiempo: 2 horas']
      },
      {
        name: 'Cambio de Pantalla',
        price: 'Desde $180.000',
        description: 'Reemplazo de pantalla rota',
        features: ['Pantalla compatible', 'Garantía 3 meses', 'Tiempo: 2 horas']
      },
      {
        name: 'Recuperación de Datos',
        price: 'Desde $150.000',
        description: 'Recuperación de información',
        features: ['Disco duro dañado', 'Software especializado', 'Tiempo: 2-5 días']
      }
    ]
  },
  impresoras: {
    title: 'Mantenimiento de Impresoras',
    icon: '🖨️',
    color: 'bg-orange-500',
    description: 'Servicio técnico para impresoras',
    services: [
      {
        name: 'Diagnóstico General',
        price: 'Gratis',
        description: 'Revisión completa de la impresora',
        features: ['Evaluación de fallas', 'Presupuesto sin costo', 'Tiempo: 30min']
      },
      {
        name: 'Limpieza de Cabezales',
        price: '$50.000',
        description: 'Limpieza profunda de cabezales',
        features: ['Mejora de calidad', 'Prueba de impresión', 'Tiempo: 1-2 horas']
      },
      {
        name: 'Recarga de Tóner/Tinta',
        price: 'Desde $30.000',
        description: 'Recarga de cartuchos',
        features: ['Tinta de calidad', 'Prueba incluida', 'Tiempo: 30min']
      },
      {
        name: 'Reparación de Atascos',
        price: 'Desde $40.000',
        description: 'Eliminación de papel atascado',
        features: ['Limpieza de rodillos', 'Prueba de alimentación', 'Tiempo: 1 hora']
      },
      {
        name: 'Cambio de Cabezal',
        price: 'Desde $120.000',
        description: 'Reemplazo de cabezal dañado',
        features: ['Cabezal compatible', 'Alineación', 'Tiempo: 2 horas']
      },
      {
        name: 'Instalación y Configuración',
        price: '$40.000',
        description: 'Configuración en red',
        features: ['USB/WiFi', 'Prueba de conexión', 'Tiempo: 1 hora']
      }
    ]
  }
};

/* ========================================================================== */
/*  COMPONENTE PRINCIPAL                                                      */
/* ========================================================================== */

const MaintenancePage = () => {
  const { type } = useParams();
  const { generateServiceInquiryLink, getDefaultWhatsAppNumber } = useWhatsApp();
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    device: '',
    issue: ''
  });
  const [formSent, setFormSent] = useState(false);

  // Determinar qué servicio mostrar
  const service = MAINTENANCE_SERVICES[type] || MAINTENANCE_SERVICES.celulares;
  const isSpecificService = MAINTENANCE_SERVICES[type] !== undefined;

  /* ========================================================================= */
  /*  MANEJAR FORMULARIO                                                        */
  /* ========================================================================= */

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    
    const message = `📱 *SOLICITUD DE MANTENIMIENTO* 📱\n\n` +
      `*Servicio:* ${service.title}\n` +
      `*Cliente:* ${formData.name}\n` +
      `*Teléfono:* ${formData.phone}\n` +
      `*Equipo:* ${formData.device}\n` +
      `*Problema:* ${formData.issue}`;
    
    const whatsappLink = `https://wa.me/${getDefaultWhatsAppNumber()}?text=${encodeURIComponent(message)}`;
    window.open(whatsappLink, '_blank');
    setFormSent(true);
    
    setTimeout(() => {
      setFormSent(false);
    }, 3000);
  };

  /* ========================================================================= */
  /*  GENERAR ENLACE DE CONSULTA                                               */
  /* ========================================================================= */

  const handleServiceInquiry = (serviceName) => {
    const link = generateServiceInquiryLink(type || 'celulares');
    window.open(link, '_blank');
  };

  /* ========================================================================= */
  /*  RENDERIZADO                                                              */
  /* ========================================================================= */

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 py-8">
        
        {/* Breadcrumb */}
        <div className="mb-6 text-sm text-gray-500 dark:text-gray-400">
          <Link to="/" className="hover:text-blue-600">Inicio</Link>
          <span className="mx-2">/</span>
          <span className="text-gray-700 dark:text-gray-300">{service.title}</span>
        </div>

        {/* Encabezado */}
        <div className="text-center mb-12">
          <div className={`${service.color} w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 text-4xl`}>
            {service.icon}
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white mb-4">
            {service.title}
          </h1>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            {service.description}
          </p>
        </div>

        {/* Grid de servicios */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {service.services.map((item, index) => (
            <div
              key={index}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-lg transition p-6"
            >
              <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
                {item.name}
              </h3>
              <div className="text-2xl font-bold text-blue-600 dark:text-blue-400 mb-3">
                {item.price}
              </div>
              <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
                {item.description}
              </p>
              <ul className="space-y-2 mb-6">
                {item.features.map((feature, idx) => (
                  <li key={idx} className="text-sm text-gray-500 dark:text-gray-400 flex items-start gap-2">
                    <span className="text-green-500">✓</span>
                    {feature}
                  </li>
                ))}
              </ul>
              <button
                onClick={() => handleServiceInquiry(item.name)}
                className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition text-center"
              >
                Consultar por WhatsApp
              </button>
            </div>
          ))}
        </div>

        {/* Beneficios adicionales */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-8 mb-12">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white text-center mb-8">
            ¿Por qué elegirnos?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-4xl mb-3">🔧</div>
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">
                Técnicos Especializados
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                Personal capacitado y con experiencia
              </p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-3">✅</div>
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">
                Garantía Garantizada
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                Todos los servicios tienen garantía
              </p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-3">⚡</div>
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">
                Servicio Rápido
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                Entregas en el menor tiempo posible
              </p>
            </div>
          </div>
        </div>

        {/* Formulario de contacto */}
        {!isSpecificService && (
          <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-xl shadow-lg p-8 text-white">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold mb-2">
                ¿Necesitas una cotización personalizada?
              </h2>
              <p className="opacity-90">
                Déjanos tus datos y te contactaremos a la brevedad
              </p>
            </div>
            
            {formSent ? (
              <div className="text-center py-8">
                <div className="text-4xl mb-3">✅</div>
                <p className="text-lg font-semibold">¡Solicitud enviada!</p>
                <p className="opacity-80">Te contactaremos por WhatsApp en breve</p>
              </div>
            ) : (
              <form onSubmit={handleFormSubmit} className="max-w-lg mx-auto">
                <div className="mb-4">
                  <input
                    type="text"
                    name="name"
                    placeholder="Tu nombre"
                    value={formData.name}
                    onChange={handleFormChange}
                    className="w-full px-4 py-2 rounded-lg text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white"
                    required
                  />
                </div>
                <div className="mb-4">
                  <input
                    type="tel"
                    name="phone"
                    placeholder="Tu teléfono"
                    value={formData.phone}
                    onChange={handleFormChange}
                    className="w-full px-4 py-2 rounded-lg text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white"
                    required
                  />
                </div>
                <div className="mb-4">
                  <input
                    type="text"
                    name="device"
                    placeholder="Tipo de equipo"
                    value={formData.device}
                    onChange={handleFormChange}
                    className="w-full px-4 py-2 rounded-lg text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white"
                    required
                  />
                </div>
                <div className="mb-6">
                  <textarea
                    name="issue"
                    placeholder="Describe el problema"
                    value={formData.issue}
                    onChange={handleFormChange}
                    rows="3"
                    className="w-full px-4 py-2 rounded-lg text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white"
                    required
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="w-full bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition"
                >
                  Enviar por WhatsApp
                </button>
              </form>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default MaintenancePage;