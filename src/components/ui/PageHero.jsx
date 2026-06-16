import React from 'react';
import { Link } from 'react-router-dom';

const PageHero = ({ title, subtitle, breadcrumbs = [] }) => (
  <section className="corex-page-hero">
    <div className="corex-container">
      {breadcrumbs.length > 0 && (
        <nav className="corex-breadcrumb" aria-label="Breadcrumb">
          {breadcrumbs.map((crumb, index) => (
            <React.Fragment key={crumb.label}>
              {index > 0 && <span>/</span>}
              {crumb.to ? (
                <Link to={crumb.to}>{crumb.label}</Link>
              ) : (
                <span>{crumb.label}</span>
              )}
            </React.Fragment>
          ))}
        </nav>
      )}
      <h1 className="corex-page-title text-white">{title}</h1>
      {subtitle && <p className="mt-3 max-w-2xl text-gray-400">{subtitle}</p>}
    </div>
  </section>
);

export default PageHero;
