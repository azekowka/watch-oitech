'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import SearchBar from './search-bar';

interface HeaderProps {
  className?: string;
}

const Header: React.FC<HeaderProps> = ({ className = '' }) => {
  const [activeCategory, setActiveCategory] = useState('Movies');

  const categories = ['Movies', 'Series', 'Documentaries'];

  const handleCategoryClick = (category: string) => {
    setActiveCategory(category);
  };

  return (
    <header 
      className={`
        flex 
        justify-between 
        items-center 
        w-full 
        px-4 
        sm:px-6 
        md:px-8 
        py-4 
        mr-2.5 
        ${className}
      `.trim().replace(/\s+/g, ' ')}
      role="banner"
    >
      {/* Navigation Menu */}
      <nav 
        className="flex gap-8 justify-center items-center"
        role="menubar"
        aria-label="Content categories"
      >
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => handleCategoryClick(category)}
            className={`
              text-base 
              font-poppins 
              font-medium 
              leading-6 
              text-left 
              text-[#ffffff] 
              transition-all 
              duration-200 
              hover:text-[#6100c2] 
              ${activeCategory === category ? 'text-[#6100c2]' : ''}
            `.trim().replace(/\s+/g, ' ')}
            role="menuitem"
          >
            {category}
          </button>
        ))}
      </nav>

      {/* Search Bar */}
      <div className="flex-1 max-w-xl mx-4">
        <SearchBar />
      </div>

      {/* User Actions */}
      <div className="flex justify-between items-start w-full max-w-[18%] gap-4">
        {/* Notifications */}
        <button 
          className="relative transition-all duration-200 hover:scale-110"
          aria-label="Notifications"
        >
          <Image
            src="/images/img_bell.svg"
            alt="Notifications"
            width={24}
            height={24}
            className="w-6 h-6 text-gray-400 hover:text-white transition-colors"
          />
          <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></span>
        </button>

        {/* User Profile */}
        <div className="flex gap-2 justify-center items-center">
          <button 
            className="transition-all duration-200 hover:scale-110"
            aria-label="User profile"
          >
            <Image
              src="/images/img_ellipse_757.png"
              alt="User avatar"
              width={32}
              height={32}
              className="w-8 h-8 rounded-2xl"
            />
          </button>
          <span className="text-base font-poppins font-medium leading-6 text-left text-[#ffffff]">
            Tetiana
          </span>
        </div>
      </div>
    </header>
  );
};

export default Header;