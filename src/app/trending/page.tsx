'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Button from '@/components/ui/button';
import Sidebar from '@/components/common/sidebar';
import PageWrapper from '@/components/common/page-wrapper';
import { useMoviesStore } from '@/store/movies.store';
import { getTrendingMovies } from '@/services/api.service';
import { Movie } from '@/services/api.types';
import FavoriteButton from '@/components/ui/favorite-button';

interface MovieCard {
  id: string;
  title: string;
  year: string;
  genre: string;
  image: string;
  isFavorite: boolean;
}

interface FeaturedMovie {
  title: string;
  year: string;
  genre: string;
  duration: string;
  rating: string;
  description: string;
  image: string;
  isFavorite: boolean;
}

const WatchHomePage: React.FC = () => {
  const { trending, fetchTrendingMovies } = useMoviesStore();
  const { movies, isLoading, error } = trending;
  const [activeNavItem, setActiveNavItem] = useState('Trending');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    // Debug: Log environment variables (without exposing sensitive data)
    console.log('API URL configured:', !!process.env.NEXT_PUBLIC_KINOPOISK_API_URL);
    console.log('API Key configured:', !!process.env.NEXT_PUBLIC_KINOPOISK_API_KEY);
    
    fetchTrendingMovies();
  }, [fetchTrendingMovies]);

  const handleNavItemClick = (item: string) => {
    setActiveNavItem(item);
  };

  const handleLoadMore = () => {
    if (!isLoading && trending.page < trending.totalPages) {
      fetchTrendingMovies(trending.page + 1).catch(error => {
        console.error('Failed to load more movies:', error);
      });
    }
  };

  if (error) {
    return (
      <PageWrapper>
        <div className="flex flex-col items-center justify-center min-h-screen p-4">
          <h1 className="text-2xl font-bold text-red-500 mb-4">Error</h1>
          <p className="text-gray-200">{error}</p>
        </div>
      </PageWrapper>
    );
  }

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
          <div className="p-6">
            <h1 className="text-2xl font-bold mb-6">Trending Movies</h1>
            
            {isLoading && movies.length === 0 ? (
              <div className="flex justify-center items-center min-h-[50vh]">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white"></div>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                {movies.map((movie) => (
                  <div key={movie.id} className="relative group">
                    <Link
                      href={`/movie/${movie.id}`}
                      className="bg-gray-800 rounded-lg overflow-hidden hover:scale-105 transition-transform duration-200"
                    >
                      <div className="relative aspect-[2/3] w-full">
                        {movie.posterPath ? (
                          <Image
                            src={movie.posterPath}
                            alt={movie.title}
                            fill
                            className="object-cover"
                            sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, (max-width: 1280px) 25vw, 20vw"
                          />
                        ) : (
                          <div className="w-full h-full bg-gray-700 flex items-center justify-center">
                            <span className="text-gray-400">No image</span>
                          </div>
                        )}
                      </div>
                      <div className="p-4">
                        <h2 className="font-semibold text-lg mb-2 line-clamp-1">{movie.title}</h2>
                        <div className="flex justify-between items-center">
                          <span className="text-gray-400">{new Date(movie.releaseDate).getFullYear()}</span>
                          <div className="flex items-center">
                            <svg className="w-4 h-4 text-yellow-400 mr-1" fill="currentColor" viewBox="0 0 20 20">
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                            <span>{movie.voteAverage.toFixed(1)}</span>
                          </div>
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
        </PageWrapper>
      </div>
    </div>
  );
};

export default WatchHomePage;