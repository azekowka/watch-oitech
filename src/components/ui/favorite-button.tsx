import React from 'react';
import Image from 'next/image';
import { useFavoritesStore } from '@/store/favorites.store';
import { Movie } from '@/services/api.types';

interface FavoriteButtonProps {
  movie: Movie;
  className?: string;
}

const FavoriteButton: React.FC<FavoriteButtonProps> = ({ movie, className = '' }) => {
  const { isFavorite, addToFavorites, removeFromFavorites } = useFavoritesStore();
  const isMovieFavorite = isFavorite(movie.id);

  const toggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (isMovieFavorite) {
      removeFromFavorites(movie.id);
    } else {
      addToFavorites(movie);
    }
  };

  return (
    <button
      onClick={toggleFavorite}
      className={`p-2 bg-[linear-gradient(146deg,#ffffff_0%,#ffffff00_100%)] border border-[linear-gradient(326deg,#ffffff_0%,#ffffff00_100%)] rounded-lg shadow-[0px_4px_11px_#888888ff] hover:scale-110 transition-all duration-200 ${className}`}
      aria-label={isMovieFavorite ? 'Remove from favorites' : 'Add to favorites'}
    >
      <Image
        src={isMovieFavorite ? '/images/img_vector.svg' : '/images/img_heart.svg'}
        alt={isMovieFavorite ? 'Remove from favorites' : 'Add to favorites'}
        width={16}
        height={16}
        className="w-4 h-4"
      />
    </button>
  );
};

export default FavoriteButton; 