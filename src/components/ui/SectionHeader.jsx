import React from 'react';
import { Link } from 'react-router-dom';

const SectionHeader = ({ title, linkTo, linkLabel = 'Ver todas →', centered = false }) => (
  <div className={`mb-8 flex items-end justify-between gap-4 ${centered ? 'flex-col items-center text-center' : ''}`}>
    <h2 className="corex-section-title">{title}</h2>
    {linkTo && (
      <Link to={linkTo} className="corex-link whitespace-nowrap">
        {linkLabel}
      </Link>
    )}
  </div>
);

export default SectionHeader;
