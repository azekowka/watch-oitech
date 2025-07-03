'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import Button from '@/components/ui/button';
import PageWrapper from '@/components/common/page-wrapper';
import Sidebar from '@/components/common/sidebar';
import Header from '@/components/common/header';

interface MovieCard {
  id: number;
  title: string;
  year: string;
  genre: string;
  image: string;
  isFavorite: boolean;
}
interface ContinueWatchingCard {
  id: number;
  image: string;
  isFavorite: boolean;
}
const HomePage: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [trendingMovies, setTrendingMovies] = useState<MovieCard[]>([
    {
      id: 1,
      title: 'Tokyo Train',
      year: '2022',
      genre: 'Action comedy',
      image: '/images/img_rectangle_213.png',
      isFavorite: false
    },
    {
      id: 2,
      title: 'Moonfall',
      year: '2022',
      genre: 'Sci-fi',
      image: '/images/img_rectangle_213_300x254.png',
      isFavorite: false
    },
    {
      id: 3,
      title: 'Life in Paris',
      year: '2023',
      genre: 'Documentary series',
      image: '/images/img_rectangle_213_1.png',
      isFavorite: true
    },
    {
      id: 4,
      title: 'House of Gucci',
      year: '2021',
      genre: 'Drama',
      image: '/images/img_rectangle_213_2.png',
      isFavorite: true
    }
  ]);
  const [continueWatching, setContinueWatching] = useState<ContinueWatchingCard[]>([
    {
      id: 1,
      image: '/images/img_rectangle_215.png',
      isFavorite: false
    },
    {
      id: 2,
      image: '/images/img_rectangle_216.png',
      isFavorite: true
    },
    {
      id: 3,
      image: '/images/img_rectangle_217.png',
      isFavorite: true
    }
  ]);
  const toggleFavorite = (id: number, type: 'trending' | 'continue') => {
    if (type === 'trending') {
      setTrendingMovies(prev => 
        prev.map(movie => 
          movie.id === id ? { ...movie, isFavorite: !movie.isFavorite } : movie
        )
      );
    } else {
      setContinueWatching(prev => 
        prev.map(item => 
          item.id === id ? { ...item, isFavorite: !item.isFavorite } : item
        )
      );
    }
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
          <div className="flex flex-col justify-start items-start w-full px-4 sm:px-6 lg:px-8 mr-8 sm:mr-10 lg:mr-11">
            {/* Trending Section */}
            <div className="flex flex-col gap-4 justify-start items-start w-full">
              <h2 className="text-xl font-poppins font-semibold leading-7 text-left text-[#ffffff]">
                Trending
              </h2>
              {/* Trending Movies Grid */}
              <div className="flex flex-row gap-4 sm:gap-6 w-full overflow-x-auto pb-4">
                {trendingMovies.map((movie) => (
                  <div key={movie.id} className="flex-shrink-0 w-64 sm:w-[254px]">
                    <div className="relative w-full h-[300px] rounded-[20px] overflow-hidden">
                      <Image
                        src={movie.image}
                        alt={movie.title}
                        fill
                        className="object-cover"
                        sizes="(max-width: 640px) 256px, 254px"
                      />
                      {/* Favorite Button */}
                      <button
                        onClick={() => toggleFavorite(movie.id, 'trending')}
                        className="absolute top-5 right-5 w-8 h-8 bg-[linear-gradient(146deg,#ffffff_0%,#ffffff00_100%)] border-0 rounded-lg shadow-[0px_4px_11px_#888888ff] flex items-center justify-center transition-all duration-200 hover:scale-110"
                        aria-label={movie.isFavorite ? 'Remove from favorites' : 'Add to favorites'}
                      >
                        <Image
                          src={movie.isFavorite ? "/images/img_vector.svg" : "/images/img_frame_6.svg"}
                          alt="Favorite"
                          width={16}
                          height={16}
                          className="w-4 h-4"
                        />
                      </button>
                      {/* Movie Info */}
                      <div className="absolute bottom-0 left-0 right-0 bg-[linear-gradient(148deg,#fffffff2_0%,#fffffff2_100%)] rounded-b-[20px] p-4 shadow-[0px_4px_20px_#888888ff]">
                        <h3 className="text-base font-poppins font-semibold leading-6 text-left text-[#000000] mb-1">
                          {movie.title}
                        </h3>
                        <p className="text-sm font-poppins font-normal leading-5 text-left text-[#000000]">
                          {movie.year} | {movie.genre}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            {/* Continue Watching Section */}
            <div className="flex flex-col justify-start items-start w-full mt-8">
              <h2 className="text-xl font-poppins font-semibold leading-7 text-left text-[#ffffff] mb-4">
                Continue watching
              </h2>
              {/* Continue Watching Grid */}
              <div className="flex flex-row gap-4 sm:gap-6 w-full overflow-x-auto pb-4">
                {continueWatching.map((item) => (
                  <div key={item.id} className="flex-shrink-0 w-80 sm:w-[348px]">
                    <div className="relative w-full h-52 rounded-[20px] overflow-hidden">
                      <Image
                        src={item.image}
                        alt="Continue watching"
                        fill
                        className="object-cover"
                        sizes="(max-width: 640px) 320px, 348px"
                      />
                      {/* Favorite Button */}
                      <button
                        onClick={() => toggleFavorite(item.id, 'continue')}
                        className="absolute top-5 right-5 w-8 h-8 bg-[linear-gradient(146deg,#ffffff_0%,#ffffff00_100%)] border-0 rounded-lg shadow-[0px_4px_11px_#888888ff] flex items-center justify-center transition-all duration-200 hover:scale-110"
                        aria-label={item.isFavorite ? 'Remove from favorites' : 'Add to favorites'}
                      >
                        <Image
                          src={item.isFavorite ? "/images/img_vector.svg" : "/images/img_frame_6.svg"}
                          alt="Favorite"
                          width={16}
                          height={16}
                          className="w-4 h-4"
                        />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </PageWrapper>
      </div>
    </div>
  );
};
export default HomePage;