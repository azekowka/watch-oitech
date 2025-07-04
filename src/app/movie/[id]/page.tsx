'use client';

import { use, useEffect, useState } from 'react';
import Image from 'next/image';
import { useMoviesStore } from '@/store/movies.store';
import PageWrapper from '@/components/common/page-wrapper';
import Sidebar from '@/components/common/sidebar';
import FavoriteButton from '@/components/ui/favorite-button';

const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p';

interface MoviePageProps {
  params: Promise<{
    id: string;
  }>;
}

export default function MoviePage({ params }: MoviePageProps) {
  const resolvedParams = use(params);
  const { movieDetails, fetchMovieDetails } = useMoviesStore();
  const { currentMovie, isLoading, error } = movieDetails;
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    fetchMovieDetails(Number(resolvedParams.id));
  }, [fetchMovieDetails, resolvedParams.id]);

  if (error) {
    return (
      <div className="flex min-h-screen bg-gray-900">
        {/* Sidebar */}
        <div className={`${sidebarOpen ? 'block' : 'hidden'} lg:block w-64 fixed left-0 top-0 h-full bg-gray-900`}>
          <Sidebar />
        </div>

        {/* Main Content */}
        <div className="flex-1 lg:ml-64">
          <PageWrapper>
            <div className="flex flex-col items-center justify-center min-h-screen p-4">
              <h1 className="text-2xl font-bold text-red-500 mb-4">Error</h1>
              <p className="text-gray-200">{error}</p>
            </div>
          </PageWrapper>
        </div>

        {/* Mobile Overlay */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}
      </div>
    );
  }

  if (isLoading || !currentMovie) {
    return (
      <div className="flex min-h-screen bg-gray-900">
        {/* Sidebar */}
        <div className={`${sidebarOpen ? 'block' : 'hidden'} lg:block w-64 fixed left-0 top-0 h-full bg-gray-900`}>
          <Sidebar />
        </div>

        {/* Main Content */}
        <div className="flex-1 lg:ml-64">
          <PageWrapper>
            <div className="flex justify-center items-center min-h-screen">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white"></div>
            </div>
          </PageWrapper>
        </div>

        {/* Mobile Overlay */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}
      </div>
    );
  }

  const trailerVideo = currentMovie.videos.results.find(
    (video) => video.type === 'Trailer' && video.site === 'YouTube'
  );

  return (
    <div className="flex min-h-screen bg-gray-900">
      {/* Sidebar */}
      <div className={`${sidebarOpen ? 'block' : 'hidden'} lg:block w-64 fixed left-0 top-0 h-full bg-gray-900`}>
        <Sidebar />
      </div>

      {/* Main Content */}
      <div className="flex-1 lg:ml-64">
        <PageWrapper>
          {/* Hamburger Menu */}
          <button
            className="lg:hidden fixed top-4 left-4 z-50 p-2"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            <span className={`bg-white block transition-all duration-300 ease-out h-0.5 w-6 rounded-sm ${sidebarOpen ? 'rotate-45 translate-y-1' : '-translate-y-0.5'}`}></span>
            <span className={`bg-white block transition-all duration-300 ease-out h-0.5 w-6 rounded-sm my-0.5 ${sidebarOpen ? 'opacity-0' : 'opacity-100'}`}></span>
            <span className={`bg-white block transition-all duration-300 ease-out h-0.5 w-6 rounded-sm ${sidebarOpen ? '-rotate-45 -translate-y-1' : 'translate-y-0.5'}`}></span>
          </button>

          <div className="relative">
            {/* Backdrop */}
            {currentMovie.backdropPath && (
              <div className="absolute top-0 left-0 w-full h-[50vh] overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-gray-900 z-10" />
                <Image
                  src={currentMovie.backdropPath}
                  alt={currentMovie.title}
                  fill
                  className="object-cover opacity-50"
                  priority
                  sizes="100vw"
                />
              </div>
            )}

            {/* Content */}
            <div className="relative z-20 pt-[20vh]">
              <div className="container mx-auto px-4">
                <div className="flex flex-col md:flex-row gap-8">
                  {/* Poster */}
                  <div className="w-full md:w-1/3 lg:w-1/4">
                    <div className="relative aspect-[2/3] rounded-lg overflow-hidden">
                      {currentMovie.posterPath ? (
                        <Image
                          src={currentMovie.posterPath}
                          alt={currentMovie.title}
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 33vw, 25vw"
                        />
                      ) : (
                        <div className="w-full h-full bg-gray-700 flex items-center justify-center">
                          <span className="text-gray-400">No image</span>
                        </div>
                      )}
                      <FavoriteButton
                        movie={currentMovie}
                        className="absolute top-4 right-4"
                      />
                    </div>
                  </div>

                  {/* Details */}
                  <div className="flex-1">
                    <h1 className="text-4xl font-bold mb-2">{currentMovie.title}</h1>
                    {currentMovie.tagline && (
                      <p className="text-xl text-gray-400 italic mb-4">{currentMovie.tagline}</p>
                    )}

                    <div className="flex items-center gap-4 mb-6">
                      <div className="flex items-center">
                        <svg className="w-6 h-6 text-yellow-400 mr-1" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                        <span className="text-lg">{currentMovie.voteAverage.toFixed(1)}</span>
                      </div>
                      <span className="text-gray-400">|</span>
                      <span>{new Date(currentMovie.releaseDate).getFullYear()}</span>
                      <span className="text-gray-400">|</span>
                      <span>{Math.floor(currentMovie.runtime / 60)}h {currentMovie.runtime % 60}m</span>
                    </div>

                    {currentMovie.overview && (
                      <div className="mb-6">
                        <h2 className="text-xl font-semibold mb-2">Overview</h2>
                        <p className="text-gray-300">{currentMovie.overview}</p>
                      </div>
                    )}

                    {currentMovie.genres.length > 0 && (
                      <div className="mb-6">
                        <h2 className="text-xl font-semibold mb-2">Genres</h2>
                        <div className="flex flex-wrap gap-2">
                          {currentMovie.genres.map((genre) => (
                            <span
                              key={genre.id}
                              className="px-3 py-1 bg-gray-700 rounded-full text-sm"
                            >
                              {genre.name}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {trailerVideo && (
                      <div className="mb-6">
                        <h2 className="text-xl font-semibold mb-2">Trailer</h2>
                        <div className="relative aspect-video rounded-lg overflow-hidden">
                          <iframe
                            src={`https://www.youtube.com/embed/${trailerVideo.key}`}
                            title="Movie Trailer"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                            className="absolute top-0 left-0 w-full h-full"
                          />
                        </div>
                      </div>
                    )}

                    {currentMovie.credits.cast.length > 0 && (
                      <div className="mb-6">
                        <h2 className="text-xl font-semibold mb-2">Cast</h2>
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                          {currentMovie.credits.cast.slice(0, 8).map((actor) => (
                            <div key={actor.id} className="flex items-center gap-2">
                              <div className="relative w-12 h-12 rounded-full overflow-hidden bg-gray-700">
                                {actor.profile_path && (
                                  <Image
                                    src={`${IMAGE_BASE_URL}/w185${actor.profile_path}`}
                                    alt={actor.name}
                                    fill
                                    className="object-cover"
                                    sizes="48px"
                                  />
                                )}
                              </div>
                              <div>
                                <p className="font-medium">{actor.name}</p>
                                <p className="text-sm text-gray-400">{actor.character}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {currentMovie.similar.results.length > 0 && (
                      <div>
                        <h2 className="text-xl font-semibold mb-2">Similar Movies</h2>
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                          {currentMovie.similar.results.slice(0, 4).map((movie) => (
                            <div key={movie.id} className="bg-gray-800 rounded-lg overflow-hidden">
                              <div className="relative aspect-[2/3]">
                                {movie.posterPath ? (
                                  <Image
                                    src={movie.posterPath}
                                    alt={movie.title}
                                    fill
                                    className="object-cover"
                                    sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                                  />
                                ) : (
                                  <div className="w-full h-full bg-gray-700 flex items-center justify-center">
                                    <span className="text-gray-400">No image</span>
                                  </div>
                                )}
                              </div>
                              <div className="p-2">
                                <h3 className="font-medium line-clamp-1">{movie.title}</h3>
                                <p className="text-sm text-gray-400">
                                  {new Date(movie.releaseDate).getFullYear()}
                                </p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </PageWrapper>
      </div>
    </div>
  );
} 