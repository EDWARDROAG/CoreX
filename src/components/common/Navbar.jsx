import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { IMAGES } from '../../utils/assets';

const navItems = [
  { path: '/', label: 'Inicio', end: true },
  { path: '/products', label: 'PC Gamer' },
  { path: '/maintenance', label: 'Servicios' },
  { path: '/products?categoria=consolas', label: 'Consolas' },
  { path: '/products?categoria=perifericos', label: 'Periféricos' },
  { path: '/contact', label: 'Contacto' },
];

const IconSearch = () => (
  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35M11 18a7 7 0 100-14 7 7 0 000 14z" />
  </svg>
);

const IconUser = () => (
  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
  </svg>
);

const IconCart = () => (
  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l3-8H6.4M7 13L5.4 5M7 13l-1.5 6h12M10 19.5a1.5 1.5 0 103 0 1.5 1.5 0 00-3 0zm8 0a1.5 1.5 0 103 0 1.5 1.5 0 00-3 0z" />
  </svg>
);

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-black text-white shadow-lg">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link to="/" className="flex items-center" onClick={() => setIsMenuOpen(false)}>
          <img src={IMAGES.logoWhite} alt="CoreX Technologies" className="h-8 w-auto sm:h-9" />
        </Link>

        <nav className="hidden items-center gap-6 lg:flex">
          {navItems.map((item) => (
            <NavLink
              key={item.label}
              to={item.path}
              end={item.end}
              className={({ isActive }) =>
                `text-sm font-medium tracking-wide transition ${
                  isActive
                    ? 'border-b-2 border-white pb-0.5 text-white'
                    : 'text-gray-300 hover:text-white'
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <button type="button" className="hidden text-gray-300 transition hover:text-white sm:block" aria-label="Buscar">
            <IconSearch />
          </button>
          <Link to="/login" className="hidden text-gray-300 transition hover:text-white sm:block" aria-label="Cuenta">
            <IconUser />
          </Link>
          <button type="button" className="hidden text-gray-300 transition hover:text-white sm:block" aria-label="Carrito">
            <IconCart />
          </button>

          <button
            type="button"
            className="rounded-md p-2 text-gray-300 hover:bg-white/10 hover:text-white lg:hidden"
            onClick={() => setIsMenuOpen((open) => !open)}
            aria-label="Menú"
          >
            {isMenuOpen ? '✕' : '☰'}
          </button>
        </div>
      </div>

      {isMenuOpen && (
        <nav className="border-t border-white/10 bg-black px-4 py-4 lg:hidden">
          <div className="flex flex-col gap-2">
            {navItems.map((item) => (
              <NavLink
                key={item.label}
                to={item.path}
                end={item.end}
                onClick={() => setIsMenuOpen(false)}
                className={({ isActive }) =>
                  `rounded-lg px-3 py-2 text-sm font-medium ${
                    isActive ? 'bg-white/10 text-white' : 'text-gray-300 hover:bg-white/5'
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </div>
        </nav>
      )}
    </header>
  );
};

export default Navbar;
