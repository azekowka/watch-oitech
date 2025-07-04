'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useMoviesStore } from '@/store/movies.store';
import { useDebounce } from '@/hooks/use-debounce';

export default function SearchBar() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const debouncedQuery = useDebounce(query, 300);

  const { search, searchMovies, clearSearch } = useMoviesStore();
  const { movies, isLoading, error } = search;

  useEffect(() => {
    if (debouncedQuery) {
      searchMovies(debouncedQuery);
    } else {
      clearSearch();
    }
  }, [debouncedQuery, searchMovies, clearSearch]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    setIsOpen(!!value);
  };

  const formatRating = (rating: number): string => {
    return typeof rating === 'number' && !isNaN(rating) ? rating.toFixed(1) : '0.0';
  };

  return (
    <div className="relative">
      <div className="relative">
        <input
          type="text"
          value={query}
          onChange={handleInputChange}
          placeholder="Search movies..."
          className="w-full bg-gray-800 text-white rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
        <svg
          className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </div>

      {isOpen && (query || isLoading || error) && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-gray-800 rounded-lg shadow-lg overflow-hidden z-50">
          {isLoading && (
            <div className="p-4 text-center">
              <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-white mx-auto"></div>
            </div>
          )}

          {error && (
            <div className="p-4 text-red-500 text-center">
              {error}
            </div>
          )}

          {!isLoading && !error && movies.length === 0 && query && (
            <div className="p-4 text-gray-400 text-center">
              No movies found
            </div>
          )}

          {!isLoading && !error && movies.length > 0 && (
            <div className="max-h-[70vh] overflow-y-auto">
              {movies.map((movie) => (
                <Link
                  key={movie.id}
                  href={`/movie/${movie.id}`}
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-4 p-4 hover:bg-gray-700 transition-colors"
                >
                  <div className="relative w-12 h-16 flex-shrink-0">
                    {movie.posterPath ? (
                      <Image
                        src={movie.posterPath}
                        alt={movie.title}
                        fill
                        className="object-cover rounded"
                      />
                    ) : (
                      <div className="w-full h-full bg-gray-700 rounded flex items-center justify-center">
                        <span className="text-xs text-gray-400">No image</span>
                      </div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium text-white truncate">{movie.title}</h3>
                    <p className="text-sm text-gray-400">
                      {movie.releaseDate ? new Date(movie.releaseDate).getFullYear() : 'N/A'}
                    </p>
                  </div>
                  {movie.voteAverage > 0 && (
                    <div className="flex items-center gap-1 px-2 py-1 bg-gray-700 rounded">
                      <svg className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      <span className="text-sm">{formatRating(movie.voteAverage)}</span>
                    </div>
                  )}
                </Link>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
} 