import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Movie } from '@/services/api.types';

interface FavoritesState {
  favorites: Movie[];
  addToFavorites: (movie: Movie) => void;
  removeFromFavorites: (movieId: number) => void;
  isFavorite: (movieId: number) => boolean;
}

export const useFavoritesStore = create<FavoritesState>()(
  persist(
    (set, get) => ({
      favorites: [],
      addToFavorites: (movie) => {
        set((state) => ({
          favorites: [...state.favorites, movie],
        }));
      },
      removeFromFavorites: (movieId) => {
        set((state) => ({
          favorites: state.favorites.filter((movie) => movie.id !== movieId),
        }));
      },
      isFavorite: (movieId) => {
        return get().favorites.some((movie) => movie.id === movieId);
      },
    }),
    {
      name: 'favorites-storage',
    }
  )
); 