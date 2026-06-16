import React from 'react';
import { Link } from 'react-router-dom';
import { IMAGES } from '../../utils/assets';
import { trustFeatures, pcTiers, services, randomPads } from '../../data/homeContent';
import { getWhatsAppLink } from '../../utils/whatsappHelper';
import SectionHeader from '../../components/ui/SectionHeader';

const HomePage = () => (
  <div className="corex-page">
    <section className="corex-hero">
      <div className="corex-container corex-hero__split">
        <div className="corex-hero__inner">
          <h1 className="corex-hero__title">
            Servicio Técnico y Armado de <span className="corex-gradient-text">PCs Gamer</span>
          </h1>
          <p className="corex-hero__tagline">ESTÉTICA • POTENCIA • RENDIMIENTO</p>
          <p className="corex-hero__description">
            Mantenimiento profesional y armado de equipos personalizados a tu medida.
          </p>
          <a
            href={getWhatsAppLink('general')}
            target="_blank"
            rel="noopener noreferrer"
            className="corex-btn-gradient corex-btn-gradient--md corex-hero__cta"
          >
            Cotizar ahora <span aria-hidden>→</span>
          </a>
        </div>
        <div className="corex-hero__media">
          <img
            src={IMAGES.banner}
            alt="PC Gamer CoreX con iluminación RGB"
            className="corex-hero__banner-img"
            fetchPriority="high"
          />
        </div>
      </div>
    </section>

    <section className="border-b border-gray-100 bg-white py-10">
      <div className="corex-container">
        <div className="corex-trust-grid">
          {trustFeatures.map((feature) => (
            <div key={feature.title} className="corex-trust-item">
              <img src={feature.icon} alt={feature.title} />
              <div>
                <p className="corex-trust-item__title">{feature.title}</p>
                <p className="corex-trust-item__desc">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>

    <section className="corex-section bg-white">
      <div className="corex-container">
        <SectionHeader title="Nuestras PCs" linkTo="/products" />
        <div className="corex-grid-4">
          {pcTiers.map((pc) => (
            <Link key={pc.id} to={pc.link} className="corex-pc-card">
              <div className="corex-pc-card__image-wrap">
                <span className={`${pc.labelColor} absolute left-3 top-3 rounded px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white`}>
                  {pc.label}
                </span>
                <img src={pc.image} alt={pc.title} />
              </div>
              <div className="corex-pc-card__body">
                <h3 className="font-bold text-gray-900">{pc.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-gray-500">{pc.description}</p>
              </div>
            </Link>
          ))}
        </div>
        <div className="mt-10 text-center">
          <Link to="/products" className="corex-btn-gradient corex-btn-gradient--lg">
            Ver todas las PCs <span aria-hidden>→</span>
          </Link>
        </div>
      </div>
    </section>

    <section className="corex-section corex-section-alt">
      <div className="corex-container">
        <SectionHeader title="Nuestros Servicios" linkTo="/maintenance" linkLabel="Ver todos →" />
        <div className="corex-grid-4">
          {services.map((service) => (
            <Link key={service.id} to={service.link} className="corex-service-card group relative block">
              {service.background && (
                <img src={service.background} alt="" className="absolute inset-0 h-full w-full object-cover opacity-30 transition group-hover:opacity-40" />
              )}
              <div className="relative flex min-h-[280px] flex-col p-5">
                <img src={service.icon} alt={service.title} className="mb-3 h-14 w-14 object-contain" />
                <h3 className="corex-display text-xl font-bold" style={{ color: service.accent }}>{service.title}</h3>
                <ul className="mt-3 flex-1 space-y-1.5">
                  {service.bullets.map((item) => (
                    <li key={item} className="text-sm text-gray-300">• {item}</li>
                  ))}
                </ul>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>

    <section className="corex-section bg-white">
      <div className="corex-container">
        <div className="mb-2 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-gray-400">Random Pads</p>
          <h2 className="corex-section-title mt-2">Nuevos Modelos</h2>
        </div>
        <div className="corex-grid-4 mt-10">
          {randomPads.map((pad) => (
            <Link key={pad.id} to="/products?categoria=perifericos" className="corex-pad-card">
              <div className={`aspect-[4/3] bg-gradient-to-br ${pad.gradient}`} />
              <div className="p-4 text-center">
                <h3 className="text-sm font-semibold text-gray-900">{pad.name}</h3>
                <p className="corex-price mt-1 text-sm">{pad.price}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  </div>
);

export default HomePage;
