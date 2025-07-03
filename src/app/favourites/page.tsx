'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Header from '@/components/common/header';
import Sidebar from '@/components/common/sidebar';

interface FavoriteItem {
  id: string;
  title: string;
  year: string;
  genre: string;
  image: string;
  isFavorited: boolean;
}

const FavouritesPage: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [favorites, setFavorites] = useState<FavoriteItem[]>([
    {
      id: '1',
      title: 'Bullet science',
      year: '2022',
      genre: 'Action comedy',
      image: '/images/img_rectangle_2155.webp',
      isFavorited: true
    },
    {
      id: '2',
      title: 'House of Gucci',
      year: '2022',
      genre: 'Drama',
      image: '/images/img_rectangle_2277.webp',
      isFavorited: true
    }
  ]);

  const toggleFavorite = (id: string) => {
    setFavorites(prev => prev.map(item => 
      item.id === id ? { ...item, isFavorited: !item.isFavorited } : item
    ));
  };

  return (
    <div className="flex flex-row justify-start items-start w-full bg-[linear-gradient(358deg,#37302a_0%,#191817_50%,#191817_100%)]">
      {/* Mobile Hamburger Menu */}
      <button 
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-[#21201e] rounded-md"
        onClick={() => setSidebarOpen(!sidebarOpen)}
        aria-label="Toggle menu"
      >
        <div className="w-6 h-6 flex flex-col justify-center items-center">
          <span className={`bg-white block transition-all duration-300 ease-out h-0.5 w-6 rounded-sm ${sidebarOpen ? 'rotate-45 translate-y-1' : '-translate-y-0.5'}`}></span>
          <span className={`bg-white block transition-all duration-300 ease-out h-0.5 w-6 rounded-sm my-0.5 ${sidebarOpen ? 'opacity-0' : 'opacity-100'}`}></span>
          <span className={`bg-white block transition-all duration-300 ease-out h-0.5 w-6 rounded-sm ${sidebarOpen ? '-rotate-45 -translate-y-1' : 'translate-y-0.5'}`}></span>
        </div>
      </button>

      {/* Sidebar */}
      <div className={`${sidebarOpen ? 'block' : 'hidden'} lg:block fixed lg:relative z-40 lg:z-auto`}>
        <Sidebar />
      </div>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div 
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-30"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main Content */}
      <div className="flex flex-col gap-1.5 justify-start items-center flex-1 w-full lg:w-auto">
        <div className="flex flex-col justify-start items-start w-full px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-10">
          {/* Header */}
          <Header className="w-full mb-6 sm:mb-8 lg:mb-10" />
          
          {/* Page Title */}
          <h2 className="text-lg sm:text-xl lg:text-2xl font-semibold font-poppins leading-8 text-left text-white mb-6 sm:mb-8 lg:mb-10">
            Favourites
          </h2>
          
          {/* Favorites Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6 sm:gap-8 lg:gap-10 w-full max-w-6xl">
            {favorites.map((item) => (
              <div key={item.id} className="relative w-full max-w-sm mx-auto">
                {/* Movie Card */}
                <div className="relative w-full h-64 sm:h-72 lg:h-80 rounded-2xl overflow-hidden group">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
                  />
                  {/* Favorite Button */}
                  <button
                    onClick={() => toggleFavorite(item.id)}
                    className="absolute top-4 right-4 p-2 bg-[linear-gradient(146deg,#ffffff_0%,#ffffff00_100%)] border border-[linear-gradient(326deg,#ffffff_0%,#ffffff00_100%)] rounded-lg shadow-[0px_4px_11px_#888888ff] hover:scale-110 transition-all duration-200"
                    aria-label={item.isFavorited ? 'Remove from favorites' : 'Add to favorites'}
                  >
                    <Image
                      src="/images/img_frame_6.svg"
                      alt="Favorite"
                      width={16}
                      height={16}
                      className="w-4 h-4"
                    />
                  </button>
                  {/* Movie Info Overlay */}
                  <div className="absolute bottom-0 left-0 right-0 bg-[linear-gradient(148deg,#fffffff2_0%,#fffffff2_100%)] rounded-b-2xl shadow-[0px_4px_20px_#888888ff] p-4 sm:p-5 lg:p-6">
                    <h3 className="text-sm sm:text-base lg:text-lg font-semibold font-poppins leading-6 text-left text-black mb-1">
                      {item.title}
                    </h3>
                    <p className="text-xs sm:text-sm lg:text-base font-normal font-poppins leading-5 text-left text-black">
                      {item.year} | {item.genre}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {/* Empty State */}
          {favorites.length === 0 && (
            <div className="flex flex-col items-center justify-center w-full py-16 sm:py-20 lg:py-24">
              <div className="text-center">
                <Image
                  src="/images/img_heart.svg"
                  alt="No favorites"
                  width={64}
                  height={64}
                  className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-4 opacity-50"
                />
                <h3 className="text-lg sm:text-xl lg:text-2xl font-semibold text-white mb-2">
                  No favorites yet
                </h3>
                <p className="text-sm sm:text-base text-white/70 mb-6">
                  Start adding movies and series to your favorites collection
                </p>
                <Link
                  href="/home"
                  className="inline-flex items-center px-4 py-2 bg-[#6100c2] text-white rounded-lg hover:bg-purple-700 transition-colors"
                >
                  Browse Content
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FavouritesPage;