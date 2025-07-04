'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Sidebar from '@/components/common/sidebar';
import PageWrapper from '@/components/common/page-wrapper';
import { useMoviesStore } from '@/store/movies.store';
import FavoriteButton from '@/components/ui/favorite-button';
import Button from '@/components/ui/button';
import Header from '@/components/common/header';
import { useFavoritesStore } from '@/store/favorites.store';

const MOVIES_PER_PAGE = 5; // Количество фильмов, показываемых за раз
const FAVORITES_PER_PAGE = 5;

const HomePage: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { trending, fetchTrendingMovies } = useMoviesStore();
  const { movies: trendingMovies, isLoading: loading, error } = trending;
  const [currentPage, setCurrentPage] = useState(0);
  const [currentFavoritesPage, setCurrentFavoritesPage] = useState(0);
  const { favorites } = useFavoritesStore();

  useEffect(() => {
    fetchTrendingMovies();
  }, [fetchTrendingMovies]);

  const totalPages = Math.ceil((trendingMovies?.length || 0) / MOVIES_PER_PAGE);
  const startIndex = currentPage * MOVIES_PER_PAGE;
  const visibleMovies = trendingMovies?.slice(startIndex, startIndex + MOVIES_PER_PAGE) || [];

  const totalFavoritesPages = Math.ceil(favorites.length / FAVORITES_PER_PAGE);
  const favoritesStartIndex = currentFavoritesPage * FAVORITES_PER_PAGE;
  const visibleFavorites = favorites.slice(favoritesStartIndex, favoritesStartIndex + FAVORITES_PER_PAGE);

  const showNextMovies = () => {
    setCurrentPage((prev) => (prev + 1) % totalPages);
  };

  const showNextFavorites = () => {
    setCurrentFavoritesPage((prev) => (prev + 1) % totalFavoritesPages);
  };

  const handleWatchNow = () => {
    console.log('Watch now clicked');
  };

  const handleAddToFavorites = () => {
    console.log('Added to favorites');
  };

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
        <PageWrapper showHeader={false}>
          {/* Hero Section */}
          <div 
            className="flex flex-row justify-start items-center w-full bg-cover bg-center bg-no-repeat pt-0 pb-10"
            style={{ backgroundImage: "url('/images/img_rectangle_201.png')" }}
          >
            <div className="flex flex-col justify-start items-start w-full px-4 sm:px-6 lg:px-8 mb-3 relative">
              <Header className="absolute top-0 left-0 w-full flex justify-between items-center px-4 sm:px-6 lg:px-8 py-4 z-10" />
              {/* Hero Content */}
              <div className="flex flex-col justify-start items-start w-full mt-32 sm:mt-24 lg:mt-32">
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-poppins font-semibold leading-tight lg:leading-[72px] text-left text-[#ffffff] mb-4">
                  Insider
                </h1>
                <p className="text-sm font-poppins font-normal leading-5 text-left text-[#ffffff] mb-8">
                  2022 | Comedy horror | 1 Season
                </p>
                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row justify-start items-start sm:items-center w-full gap-4">
                  <Button
                    onClick={handleWatchNow}
                    variant="primary"
                    size="lg"
                    className="bg-[#6100c2] text-white rounded-[14px] px-6 py-3"
                  >
                    Watch now
                  </Button>
                  <button
                    onClick={handleAddToFavorites}
                    className="flex items-center justify-center w-[54px] h-[54px] bg-[linear-gradient(146deg,#ffffff_0%,#ffffff00_100%)] border border-[linear-gradient(326deg,#ffffff_0%,#ffffff00_100%)] rounded-[14px] shadow-[0px_4px_20px_#888888ff] transition-all duration-200 hover:scale-110"
                    aria-label="Add to favorites"
                  >
                    <Image
                      src="/images/img_heart_deep_purple_a700.svg"
                      alt="Add to favorites"
                      width={24}
                      height={24}
                      className="w-6 h-6"
                    />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Content Sections */}
          <div className="flex flex-col justify-start items-start w-full px-4 sm:px-6 lg:px-8 pt-6 pb-6 sm:pb-8 lg:pb-10">
            {/* Trending Section */}
            <div className="w-full mb-8">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-lg sm:text-xl lg:text-2xl font-semibold font-poppins leading-8 text-left text-white">
                  Trending Movies
              </h2>
                <div className="flex items-center gap-4">
                  <button
                    onClick={showNextMovies}
                    className="p-2 bg-[#6100c2] rounded-full hover:bg-purple-700 transition-colors"
                    aria-label="Show next movies"
                  >
                    <svg 
                      width="24" 
                      height="24" 
                      viewBox="0 0 24 24" 
                      fill="none" 
                      xmlns="http://www.w3.org/2000/svg"
                      className="text-white"
                    >
                      <path 
                        d="M9 18L15 12L9 6" 
                        stroke="currentColor" 
                        strokeWidth="2" 
                        strokeLinecap="round" 
                        strokeLinejoin="round"
                      />
                    </svg>
                  </button>
                  <Link
                    href="/trending"
                    className="text-sm text-purple-500 hover:text-purple-400 transition-colors whitespace-nowrap"
                  >
                    View All
                  </Link>
                </div>
              </div>

              {loading ? (
                <div className="flex items-center justify-center h-64">
                  <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
                </div>
              ) : error ? (
                <div className="flex items-center justify-center h-64">
                  <p className="text-red-500">{error}</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
                  {visibleMovies.map((movie) => (
                    <div 
                      key={movie.id} 
                      className="relative group"
                    >
                      <Link href={`/movie/${movie.id}`}>
                        <div className="relative w-full aspect-[2/3] rounded-[20px] overflow-hidden">
                          {movie.posterPath ? (
                        <Image
                              src={movie.posterPath}
                              alt={movie.title}
                              fill
                              className="object-cover transition-transform duration-300 group-hover:scale-105"
                              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 20vw"
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
                      <FavoriteButton
                        movie={movie}
                        className="absolute top-4 right-4"
                      />
                  </div>
                ))}
              </div>
              )}
            </div>

            {/* Continue Watching Section */}
            <div className="w-full mb-8">
              <h2 className="text-lg sm:text-xl lg:text-2xl font-semibold font-poppins leading-8 text-left text-white mb-6">
                Continue Watching
              </h2>
              <div className="flex items-center justify-center h-64 bg-gray-800/50 rounded-[20px]">
                <div className="text-center">
                      <Image
                    src="/images/img_film.svg"
                    alt="No movies"
                    width={48}
                    height={48}
                    className="w-12 h-12 mx-auto mb-4 opacity-50"
                  />
                  <p className="text-white/70">No movies in progress</p>
                </div>
              </div>
            </div>

            {/* My List Section */}
            <div className="w-full">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-lg sm:text-xl lg:text-2xl font-semibold font-poppins leading-8 text-left text-white">
                  My List
                </h2>
                {favorites.length > 0 && (
                  <div className="flex items-center gap-4">
                      <button
                      onClick={showNextFavorites}
                      className="p-2 bg-[#6100c2] rounded-full hover:bg-purple-700 transition-colors"
                      aria-label="Show next favorites"
                      >
                      <svg 
                        width="24" 
                        height="24" 
                        viewBox="0 0 24 24" 
                        fill="none" 
                        xmlns="http://www.w3.org/2000/svg"
                        className="text-white"
                      >
                        <path 
                          d="M9 18L15 12L9 6" 
                          stroke="currentColor" 
                          strokeWidth="2" 
                          strokeLinecap="round" 
                          strokeLinejoin="round"
                        />
                      </svg>
                      </button>
                    <Link
                      href="/favourites"
                      className="text-sm text-purple-500 hover:text-purple-400 transition-colors whitespace-nowrap"
                    >
                      View All
                    </Link>
                  </div>
                )}
              </div>

              {favorites.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
                  {visibleFavorites.map((movie) => (
                    <div 
                      key={movie.id} 
                      className="relative group"
                    >
                      <Link href={`/movie/${movie.id}`}>
                        <div className="relative w-full aspect-[2/3] rounded-[20px] overflow-hidden">
                          {movie.posterPath ? (
                            <Image
                              src={movie.posterPath}
                              alt={movie.title}
                              fill
                              className="object-cover transition-transform duration-300 group-hover:scale-105"
                              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 20vw"
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
                      <FavoriteButton
                        movie={movie}
                        className="absolute top-4 right-4"
                      />
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex items-center justify-center h-64 bg-gray-800/50 rounded-[20px]">
                  <div className="text-center">
                    <Image
                      src="/images/img_heart.svg"
                      alt="No favorites"
                      width={48}
                      height={48}
                      className="w-12 h-12 mx-auto mb-4 opacity-50"
                    />
                    <p className="text-white/70">No favorites added yet</p>
                    <Link
                      href="/trending"
                      className="inline-block mt-4 px-6 py-2 bg-[#6100c2] text-white rounded-[14px] hover:bg-purple-700 transition-colors"
                    >
                      Browse Movies
                    </Link>
                  </div>
              </div>
              )}
            </div>
          </div>
        </PageWrapper>
      </div>
    </div>
  );
};

export default HomePage;