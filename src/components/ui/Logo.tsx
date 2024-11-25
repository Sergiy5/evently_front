import React from 'react';

import logo from '../../../public/images/logo.svg';

const MainLogo: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  return (
    <header className="w-full h-16 flex justify-between items-center px-4 bg-gray-100">
      <div
        className="relative w-[84px] h-[88px] flex items-center justify-center"
        onClick={scrollToTop}
      >
        <div className="relative group w-full h-full">
          <img
            src={logo}
            alt="Logo"
            className="absolute inset-0 w-full h-full object-contain"
          />
          {/* Букви "о" на лініях */}
          <div className="absolute flex space-x-2 top-[58%] left-[51%] transform -translate-x-1/2 -translate-y-1/2">
            <span className="text-2xl text-black-900 group-hover:-translate-y-2 transition-transform duration-300">
              o
            </span>
            <span className="text-2xl text-black-900 group-hover:-translate-y-2 transition-transform duration-300">
              o
            </span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default MainLogo;
