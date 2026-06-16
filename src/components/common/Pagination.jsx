import React from 'react';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  if (totalPages <= 1) return null;

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <nav className="flex flex-wrap items-center justify-center gap-2" aria-label="Paginación">
      <button
        type="button"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage <= 1}
        className="corex-btn-outline"
      >
        Anterior
      </button>

      {pages.map((page) => (
        <button
          key={page}
          type="button"
          onClick={() => onPageChange(page)}
          className={`corex-btn-outline ${page === currentPage ? 'corex-btn-outline--active' : ''}`}
        >
          {page}
        </button>
      ))}

      <button
        type="button"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage >= totalPages}
        className="corex-btn-outline"
      >
        Siguiente
      </button>
    </nav>
  );
};

export default Pagination;
