'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Header from '@/components/common/header';
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
  const sidebarItems = [
    { icon: '/images/img_film.svg', label: 'Home', href: '/', active: false },
    { icon: '/images/img_heart.svg', label: 'Favourites', href: '/favourites', active: true },
    { icon: '/images/img_trending_up.svg', label: 'Trending', href: '#', active: false },
    { icon: '/images/img_calendar.svg', label: 'Coming soon', href: '#', active: false },
    { icon: '/images/img_users.svg', label: 'Community', href: '#', active: false },
    { icon: '/images/img_search.svg', label: 'Social', href: '#', active: false },
    { icon: '/images/img_sliders.svg', label: 'Settings', href: '#', active: false },
    { icon: '/images/img_log_out.svg', label: 'Logout', href: '#', active: false }
  ];
  const toggleFavorite = (id: string) => {
    setFavorites(prev => prev.map(item => 
      item.id === id ? { ...item, isFavorited: !item.isFavorited } : item
    ));
  };
  return (
    <div className="flex flex-row justify-start items-center w-full min-h-screen bg-[linear-gradient(358deg,#37302a_0%,#191817_50%,#191817_100%)]">
      {/* Sidebar */}
      <div className={`${sidebarOpen ? 'block' : 'hidden'} lg:block fixed lg:relative z-50 lg:z-auto`}>
        <div className="flex flex-col gap-12 sm:gap-14 lg:gap-16 justify-start items-center w-64 sm:w-72 lg:w-80 h-screen bg-global-1 shadow-[2px_0px_90px_#6100c266] px-8 sm:px-10 lg:px-12 py-8 sm:py-10 lg:py-12">
          {/* Logo */}
          <div className="flex flex-row justify-start items-center w-full">
            <Image
              src="/images/img_coffee.svg"
              alt="Watch Logo"
              width={32}
              height={32}
              className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8"
            />
            <h1 className="text-lg sm:text-xl lg:text-2xl font-bold font-poppins leading-8 tracking-wider text-left text-global-2 uppercase ml-2 sm:ml-3 lg:ml-4">
              WATCH
            </h1>
          </div>
          {/* Navigation Items */}
          <div className="flex flex-col justify-start items-center w-full gap-6 sm:gap-8 lg:gap-10">
            {/* Main Navigation */}
            <div className="flex flex-col w-full gap-6 sm:gap-8 lg:gap-10">
              {sidebarItems.slice(0, 4).map((item, index) => (
                <Link
                  key={index}
                  href={item.href}
                  className="flex flex-row justify-start items-center w-full group"
                >
                  <Image
                    src={item.icon}
                    alt={item.label}
                    width={24}
                    height={24}
                    className="w-5 h-5 sm:w-6 sm:h-6 group-hover:opacity-80 transition-opacity"
                  />
                  <p className={`text-sm sm:text-base lg:text-lg font-poppins leading-6 text-left ml-3 sm:ml-4 transition-colors ${
                    item.active ? 'font-bold text-global-2' : 'font-normal text-global-3 group-hover:text-global-2'
                  }`}>
                    {item.label}
                  </p>
                </Link>
              ))}
            </div>
            {/* Community & Social */}
            <div className="flex flex-col w-full gap-6 sm:gap-8">
              {sidebarItems.slice(4, 6).map((item, index) => (
                <Link
                  key={index + 4}
                  href={item.href}
                  className="flex flex-row justify-start items-center w-full group"
                >
                  <Image
                    src={item.icon}
                    alt={item.label}
                    width={24}
                    height={24}
                    className="w-5 h-5 sm:w-6 sm:h-6 group-hover:opacity-80 transition-opacity"
                  />
                  <p className="text-sm sm:text-base lg:text-lg font-normal font-poppins leading-6 text-left text-global-3 group-hover:text-global-2 transition-colors ml-3 sm:ml-4">
                    {item.label}
                  </p>
                </Link>
              ))}
            </div>
            {/* Settings & Logout */}
            <div className="flex flex-col w-full gap-4 sm:gap-5 lg:gap-6 mt-auto">
              {sidebarItems.slice(6).map((item, index) => (
                <Link
                  key={index + 6}
                  href={item.href}
                  className="flex flex-row justify-start items-center w-full group"
                >
                  <Image
                    src={item.icon}
                    alt={item.label}
                    width={24}
                    height={24}
                    className="w-5 h-5 sm:w-6 sm:h-6 group-hover:opacity-80 transition-opacity"
                  />
                  <p className="text-sm sm:text-base lg:text-lg font-normal font-poppins leading-6 text-left text-global-3 group-hover:text-global-2 transition-colors ml-3 sm:ml-4">
                    {item.label}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
      {/* Main Content */}
      <div className="flex flex-col justify-start items-start w-full lg:flex-1 min-h-screen">
        {/* Mobile Menu Button */}
        <button 
          className="block lg:hidden p-4 text-global-2"
          onClick={() => setSidebarOpen(!sidebarOpen)}
          aria-label="Toggle sidebar"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
        {/* Header */}
        <Header className="w-full px-4 sm:px-6 lg:px-8" />
        {/* Page Content */}
        <div className="flex flex-col justify-start items-start w-full px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-10">
          {/* Page Title */}
          <h2 className="text-lg sm:text-xl lg:text-2xl font-semibold font-poppins leading-8 text-left text-global-2 mb-6 sm:mb-8 lg:mb-10">
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
                    <h3 className="text-sm sm:text-base lg:text-lg font-semibold font-poppins leading-6 text-left text-global-1 mb-1">
                      {item.title}
                    </h3>
                    <p className="text-xs sm:text-sm lg:text-base font-normal font-poppins leading-5 text-left text-global-1">
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
                <h3 className="text-lg sm:text-xl lg:text-2xl font-semibold text-global-2 mb-2">
                  No favorites yet
                </h3>
                <p className="text-sm sm:text-base text-global-3 mb-6">
                  Start adding movies and series to your favorites collection
                </p>
                <Link
                  href="/"
                  className="inline-flex items-center px-4 py-2 bg-button-1 text-button-1 rounded-lg hover:bg-purple-700 transition-colors"
                >
                  Browse Content
                </Link>
              </div>
            </div>
          )}
          {/* Additional Info Row (from JSON) */}
          {favorites.length > 0 && (
            <div className="flex flex-row justify-center items-center w-full mt-12 sm:mt-16 lg:mt-20 px-4 sm:px-8 lg:px-20">
              <div className="flex flex-col sm:flex-row justify-between items-center w-full max-w-4xl gap-4 sm:gap-8">
                <p className="text-xs sm:text-sm lg:text-base font-normal font-poppins leading-5 text-left text-global-1">
                  2022 | Action comedy
                </p>
                <div className="flex flex-row justify-between items-center gap-8 sm:gap-16 lg:gap-32">
                  <p className="text-xs sm:text-sm lg:text-base font-normal font-poppins leading-5 text-left text-global-1">
                    2022 | Action comedy
                  </p>
                  <p className="text-xs sm:text-sm lg:text-base font-normal font-poppins leading-5 text-left text-global-1">
                    2022 | Action comedy
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
export default FavouritesPage;