'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Button from '@/components/ui/button';
import Sidebar from '@/components/common/sidebar';
import PageWrapper from '@/components/common/page-wrapper';

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
  const [activeNavItem, setActiveNavItem] = useState('Trending');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Dummy data for trending movies
  const [trendingMovies, setTrendingMovies] = useState<MovieCard[]>([
    {
      id: '1',
      title: 'Tokyo Train',
      year: '2022',
      genre: 'Action comedy',
      image: '/images/img_rectangle_213.png',
      isFavorite: false
    },
    {
      id: '2',
      title: 'Moonfall Again',
      year: '2022',
      genre: 'Sci-fi',
      image: '/images/img_rectangle_213_300x254.png',
      isFavorite: false
    },
    {
      id: '3',
      title: 'Life in Paris',
      year: '2020',
      genre: 'Comedy drama',
      image: '/images/img_rectangle_213_1.png',
      isFavorite: true
    },
    {
      id: '4',
      title: 'House of Gucci',
      year: '2021',
      genre: 'Drama',
      image: '/images/img_rectangle_213_2.png',
      isFavorite: true
    }
  ]);

  const [featuredMovie, setFeaturedMovie] = useState<FeaturedMovie>({
    title: 'House of Wealth',
    year: '2023',
    genre: 'Drama',
    duration: '2h 38m',
    rating: '7.8/10',
    description: 'The movie follows the lives of a wealthy family, the Johnsons, who appear to have it all: a grand mansion, luxurious cars, and expensive designer clothing. However, behind the facade of their lavish lifestyle, there are deep-seated tensions and secrets that threaten to tear the family apart.',
    image: '/images/img_rectangle_239.webp',
    isFavorite: false
  });

  const handleNavItemClick = (item: string) => {
    setActiveNavItem(item);
  };

  const toggleMovieFavorite = (movieId: string) => {
    setTrendingMovies(prev => 
      prev.map(movie => 
        movie.id === movieId 
          ? { ...movie, isFavorite: !movie.isFavorite }
          : movie
      )
    );
  };

  const toggleFeaturedFavorite = () => {
    setFeaturedMovie(prev => ({ ...prev, isFavorite: !prev.isFavorite }));
  };

  const handleWatchNow = () => {
    console.log('Watch now clicked for:', featuredMovie.title);
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
        <PageWrapper>
        <div className="flex flex-col justify-start items-start w-full px-4 sm:px-6 lg:px-8 pt-6 pb-6 sm:pb-8 lg:pb-10">
        {/* Trending Section */}
        <section className="w-full mb-12 sm:mb-16 lg:mb-14">
            <h2 className="text-lg sm:text-xl lg:text-xl font-semibold font-poppins leading-8 lg:leading-[30px] text-white mb-4 sm:mb-6 lg:mb-4">
            Trending at this moment
          </h2>
          {/* Trending Movies Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-6 w-full">
            {trendingMovies.map((movie) => (
              <div key={movie.id} className="relative w-full">
                <div className="relative w-full h-64 sm:h-72 lg:h-[300px] rounded-xl sm:rounded-2xl lg:rounded-[20px] overflow-hidden group">
                  <Image
                    src={movie.image}
                    alt={movie.title}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  />
                  {/* Favorite Button */}
                  <button
                    onClick={() => toggleMovieFavorite(movie.id)}
                    className="absolute top-4 sm:top-5 lg:top-5 right-4 sm:right-5 lg:right-5 w-8 h-8 sm:w-10 sm:h-10 lg:w-8 lg:h-8 bg-[linear-gradient(146deg,#ffffff_0%,#ffffff00_100%)] border border-[linear-gradient(326deg,#ffffff_0%,#ffffff00_100%)] rounded-lg shadow-[0px_4px_11px_#888888ff] flex items-center justify-center transition-all duration-200 hover:scale-110"
                    aria-label={movie.isFavorite ? 'Remove from favorites' : 'Add to favorites'}
                  >
                    <Image
                      src={movie.isFavorite ? "/images/img_vector.svg" : "/images/img_frame_6.svg"}
                      alt="Favorite"
                      width={16}
                      height={16}
                      className="w-3 h-3 sm:w-4 sm:h-4 lg:w-4 lg:h-4"
                    />
                  </button>
                  {/* Movie Info Overlay */}
                  <div className="absolute bottom-0 left-0 right-0 bg-[linear-gradient(148deg,#fffffff2_0%,#fffffff2_100%)] rounded-b-xl sm:rounded-b-2xl lg:rounded-b-[20px] p-4 sm:p-5 lg:p-5 shadow-[0px_4px_20px_#888888ff]">
                      <h3 className="text-sm sm:text-base lg:text-base font-semibold font-poppins leading-6 text-black mb-1">
                      {movie.title}
                    </h3>
                      <p className="text-xs sm:text-sm lg:text-sm font-normal font-poppins leading-5 lg:leading-[21px] text-black">
                      {movie.year} | {movie.genre}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
          
        {/* Featured Movie Section */}
        <section className="flex flex-col lg:flex-row justify-start items-center w-full gap-6 sm:gap-8 lg:gap-6">
          {/* Featured Movie Image */}
          <div className="w-full lg:w-1/2">
            <Image
              src={featuredMovie.image}
              alt={featuredMovie.title}
              width={534}
              height={430}
              className="w-full h-64 sm:h-80 lg:h-[430px] object-cover rounded-xl sm:rounded-2xl lg:rounded-[20px]"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
          {/* Featured Movie Details */}
          <div className="flex flex-col justify-start items-center w-full lg:w-1/2 px-0 lg:px-4">
            {/* Title and Rating */}
            <div className="flex flex-col sm:flex-row justify-center items-start sm:items-center w-full mb-4 sm:mb-6 lg:mb-4 gap-2 sm:gap-4">
                <h2 className="text-2xl sm:text-3xl lg:text-[32px] font-semibold font-poppins leading-10 lg:leading-[49px] text-white">
                {featuredMovie.title}
              </h2>
              <div className="flex flex-row justify-end items-center gap-2 sm:gap-3 lg:gap-2">
                <Image
                  src="/images/img_star.svg"
                  alt="Rating"
                  width={24}
                  height={24}
                  className="w-5 h-5 sm:w-6 sm:h-6 lg:w-6 lg:h-6"
                />
                  <span className="text-base sm:text-lg lg:text-lg font-medium font-poppins leading-7 text-white">
                  {featuredMovie.rating}
                </span>
              </div>
            </div>
            {/* Movie Meta Info */}
            <div className="flex flex-col sm:flex-row justify-start items-start sm:items-center w-full mb-4 sm:mb-6 lg:mb-5 gap-2 sm:gap-6 lg:gap-9">
                <span className="text-base sm:text-lg lg:text-lg font-medium font-poppins leading-7 text-white">
                {featuredMovie.year}
              </span>
                <span className="text-base sm:text-lg lg:text-lg font-medium font-poppins leading-7 text-white">
                {featuredMovie.genre}
              </span>
                <span className="text-base sm:text-lg lg:text-lg font-medium font-poppins leading-7 text-white">
                {featuredMovie.duration}
              </span>
            </div>
            {/* Description */}
              <p className="text-sm sm:text-base lg:text-base font-normal font-poppins leading-6 text-white w-full mb-6 sm:mb-8 lg:mb-7">
              {featuredMovie.description}
            </p>
            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row justify-start items-center w-full gap-3 sm:gap-4 lg:gap-4">
              <Button
                onClick={handleWatchNow}
                variant="primary"
                size="md"
                  className="w-full sm:w-auto bg-[#6100c2] text-white hover:bg-purple-700 px-6 sm:px-8 lg:px-6 py-3 sm:py-4 lg:py-3 rounded-lg sm:rounded-xl lg:rounded-[14px] font-medium"
              >
                Watch now
              </Button>
              <button
                onClick={toggleFeaturedFavorite}
                className="w-12 h-12 sm:w-14 sm:h-14 lg:w-[54px] lg:h-[54px] bg-[linear-gradient(146deg,#ffffff_0%,#ffffff00_100%)] border border-[linear-gradient(326deg,#ffffff_0%,#ffffff00_100%)] rounded-lg sm:rounded-xl lg:rounded-[14px] shadow-[0px_4px_20px_#888888ff] flex items-center justify-center transition-all duration-200 hover:scale-110"
                aria-label={featuredMovie.isFavorite ? 'Remove from favorites' : 'Add to favorites'}
              >
                <Image
                  src={featuredMovie.isFavorite ? "/images/img_heart_deep_purple_a700.svg" : "/images/img_heart_deep_purple_a700.svg"}
                  alt="Favorite"
                  width={24}
                  height={24}
                  className="w-5 h-5 sm:w-6 sm:h-6 lg:w-6 lg:h-6"
                />
              </button>
            </div>
          </div>
        </section>
        </div>
        </PageWrapper>
      </div>
    </div>
  );
};

export default WatchHomePage;