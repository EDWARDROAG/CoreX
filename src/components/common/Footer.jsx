import React from 'react';
import { Link } from 'react-router-dom';
import { IMAGES } from '../../utils/assets';
import { SITE_CONTACT, FOOTER_NAV, FOOTER_SOCIAL } from '../../data/siteInfo';
import { getWhatsAppLink } from '../../utils/whatsappHelper';

const FooterColumnTitle = ({ children }) => (
  <h3 className="corex-display mb-4 text-sm font-bold uppercase tracking-widest text-white">
    {children}
  </h3>
);

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-black text-white">
      {/* Franja de marca: imagen izquierda | logo + texto derecha */}
      <div className="border-b border-white/10">
        <div className="corex-container corex-footer-brand">
          <img
            src={IMAGES.elitePc}
            alt="PC Gamer CoreX"
            className="corex-footer-brand__image"
          />
          <div className="corex-footer-brand__content">
            <img src={IMAGES.logoWhite} alt="CoreX Technologies" className="h-9 w-auto sm:h-10" />
            <p className="max-w-md text-base text-gray-300 sm:text-lg">
              Tecnología que impulsa tu juego al siguiente nivel.
            </p>
            <p className="corex-display text-2xl font-bold sm:text-3xl">
              <span className="corex-gradient-text">POWER INSIDE.</span>
            </p>
          </div>
        </div>
      </div>

      {/* Footer principal: 3 columnas */}
      <div className="corex-container py-10">
        <div className="corex-footer-grid">
          <div>
            <FooterColumnTitle>Secciones</FooterColumnTitle>
            <ul className="space-y-2.5">
              {FOOTER_NAV.map((item) => (
                <li key={item.label}>
                  <Link to={item.path} className="text-sm text-gray-400 transition hover:text-white">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
            <p className="mt-5 text-xs leading-relaxed text-gray-500">
              Servicio técnico, armado de PCs gamer y venta de periféricos.
            </p>
            <div className="mt-3 flex flex-wrap gap-3">
              {FOOTER_SOCIAL.map((social) => (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-medium text-gray-400 transition hover:text-purple-400"
                >
                  {social.name}
                </a>
              ))}
            </div>
          </div>

          <div>
            <FooterColumnTitle>Contacto</FooterColumnTitle>
            <ul className="space-y-3 text-sm text-gray-400">
              <li>
                <span className="mb-0.5 block text-xs uppercase tracking-wide text-gray-500">Teléfono</span>
                <a href={`tel:${SITE_CONTACT.phone.replace(/\s/g, '')}`} className="transition hover:text-white">
                  {SITE_CONTACT.phone}
                </a>
              </li>
              <li>
                <span className="mb-0.5 block text-xs uppercase tracking-wide text-gray-500">Email</span>
                <a href={`mailto:${SITE_CONTACT.email}`} className="transition hover:text-white">
                  {SITE_CONTACT.email}
                </a>
              </li>
              <li>
                <span className="mb-0.5 block text-xs uppercase tracking-wide text-gray-500">WhatsApp</span>
                <a
                  href={getWhatsAppLink('general')}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition hover:text-green-400"
                >
                  Escríbenos ahora
                </a>
              </li>
              <li>
                <span className="mb-0.5 block text-xs uppercase tracking-wide text-gray-500">Horario</span>
                <p>{SITE_CONTACT.schedule.weekdays}</p>
                <p>{SITE_CONTACT.schedule.saturday}</p>
                <p className="text-red-400">{SITE_CONTACT.schedule.sunday}</p>
              </li>
            </ul>
          </div>

          <div>
            <FooterColumnTitle>Ubicación</FooterColumnTitle>
            <address className="not-italic text-sm leading-relaxed text-gray-400">
              <p>{SITE_CONTACT.address}</p>
              <p className="mt-1 font-medium text-gray-300">{SITE_CONTACT.city}</p>
            </address>
            <a
              href={SITE_CONTACT.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="corex-footer-map"
              aria-label="Abrir ubicación en Google Maps"
            >
              <iframe
                src={SITE_CONTACT.mapsEmbedUrl}
                title="Mapa de ubicación CoreX"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </a>
            <p className="mt-2 text-xs text-gray-500">Clic en el mapa para abrir en Google Maps</p>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="corex-container flex flex-col items-center justify-between gap-3 py-5 text-center text-xs text-gray-500 sm:flex-row sm:text-left">
          <p>© {year} CoreX Technologies. Todos los derechos reservados.</p>
          <p>Tecnología • Gaming • Servicio Técnico</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
