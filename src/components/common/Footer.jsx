import React from 'react';
import { IMAGES } from '../../utils/assets';

const Footer = () => {
  return (
    <footer className="relative overflow-hidden bg-black text-white">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-8 px-4 py-12 sm:px-6 lg:flex-row lg:px-8 lg:py-16">
        <div className="flex-shrink-0">
          <img src={IMAGES.logoWhite} alt="CoreX Technologies" className="h-10 w-auto" />
        </div>

        <div className="max-w-xl text-center lg:text-left">
          <p className="text-lg text-gray-300 sm:text-xl">
            Tecnología que impulsa tu juego al siguiente nivel.
          </p>
          <p className="corex-display mt-1 text-2xl font-bold sm:text-3xl">
            <span className="corex-gradient-text">POWER INSIDE.</span>
          </p>
        </div>

        <div className="hidden flex-shrink-0 lg:block">
          <img
            src={IMAGES.elitePc}
            alt="PC Gamer CoreX"
            className="h-36 w-auto object-contain opacity-90"
          />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
