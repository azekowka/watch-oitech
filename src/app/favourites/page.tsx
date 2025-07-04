'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Sidebar from '@/components/common/sidebar';
import PageWrapper from '@/components/common/page-wrapper';
import { useFavoritesStore } from '@/store/favorites.store';

const FavouritesPage: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { favorites, removeFromFavorites } = useFavoritesStore();

  return (
    <div className="flex flex-row justify-start items-start w-full min-h-screen lg:pl-[274px] bg-[linear-gradient(358deg,#37302a_0%,#191817_50%,#191817_100%)]">
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
      <div className={`${sidebarOpen ? 'block' : 'hidden'} lg:block fixed top-0 left-0 h-full z-40`}>
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
        <PageWrapper>
          <div className="flex flex-col justify-start items-start w-full px-4 sm:px-6 lg:px-8 pt-6 pb-6 sm:pb-8 lg:pb-10">
            {/* Page Title */}
            <h2 className="text-lg sm:text-xl lg:text-2xl font-semibold font-poppins leading-8 text-left text-white mb-6 sm:mb-8 lg:mb-10">
              Favourites
            </h2>

            {favorites.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 w-full">
                {favorites.map((movie) => (
                  <div key={movie.id} className="relative group">
                    <Link href={`/movie/${movie.id}`}>
                      <div className="relative w-full aspect-[2/3] rounded-[20px] overflow-hidden">
                        {movie.posterPath ? (
                          <Image
                            src={movie.posterPath}
                            alt={movie.title}
                            fill
                            className="object-cover transition-transform duration-300 group-hover:scale-105"
                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
                          />
                        ) : (
                          <div className="w-full h-full bg-gray-700 flex items-center justify-center">
                            <span className="text-gray-400">No image</span>
                          </div>
                        )}
                        <div className="absolute bottom-0 left-0 right-0 bg-[linear-gradient(148deg,#fffffff2_0%,#fffffff2_100%)] rounded-b-[20px] p-4">
                          <h3 className="font-medium text-black truncate">{movie.title}</h3>
                          <p className="text-sm text-gray-600">
                            {new Date(movie.releaseDate).getFullYear()}
                          </p>
                        </div>
                      </div>
                    </Link>
                    <button
                      onClick={() => removeFromFavorites(movie.id)}
                      className="absolute top-4 right-4 p-2 bg-[linear-gradient(146deg,#ffffff_0%,#ffffff00_100%)] border border-[linear-gradient(326deg,#ffffff_0%,#ffffff00_100%)] rounded-lg shadow-[0px_4px_11px_#888888ff] hover:scale-110 transition-all duration-200"
                      aria-label="Remove from favorites"
                    >
                      <Image
                        src="/images/img_vector.svg"
                        alt="Remove from favorites"
                        width={16}
                        height={16}
                        className="w-4 h-4"
                      />
                    </button>
                  </div>
                ))}
              </div>
            ) : (
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
                    href="/trending"
                    className="inline-flex items-center px-6 py-3 bg-[#6100c2] text-white rounded-[14px] hover:bg-purple-700 transition-colors"
                  >
                    Browse Trending Movies
                  </Link>
                </div>
              </div>
            )}
          </div>
        </PageWrapper>
      </div>
    </div>
  );
};

export default FavouritesPage;