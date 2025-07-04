import { create } from 'zustand';
import { Movie, MovieDetailsResponse } from '@/services/api.types';
import { api } from '@/services/api.service';

interface MoviesState {
  trending: {
    movies: Movie[];
    page: number;
    totalPages: number;
    isLoading: boolean;
    error: string | null;
  };
  search: {
    query: string;
    movies: Movie[];
    page: number;
    totalPages: number;
    isLoading: boolean;
    error: string | null;
  };
  movieDetails: {
    currentMovie: MovieDetailsResponse | null;
    isLoading: boolean;
    error: string | null;
  };
  fetchTrendingMovies: (page?: number) => Promise<void>;
  searchMovies: (query: string, page?: number) => Promise<void>;
  fetchMovieDetails: (id: number) => Promise<void>;
  clearSearch: () => void;
}

export const useMoviesStore = create<MoviesState>((set, get) => ({
  trending: {
    movies: [],
    page: 1,
    totalPages: 1,
    isLoading: false,
    error: null,
  },
  search: {
    query: '',
    movies: [],
    page: 1,
    totalPages: 1,
    isLoading: false,
    error: null,
  },
  movieDetails: {
    currentMovie: null,
    isLoading: false,
    error: null,
  },

  fetchTrendingMovies: async (page = 1) => {
    set(state => ({
      trending: {
        ...state.trending,
        isLoading: true,
        error: null,
      },
    }));

    try {
      const response = await api.getTrendingMovies(page);
      set(state => ({
        trending: {
          movies: page === 1 ? response.results : [...state.trending.movies, ...response.results],
          page: response.page,
          totalPages: response.totalPages,
          isLoading: false,
          error: null,
        },
      }));
    } catch (error) {
      set(state => ({
        trending: {
          ...state.trending,
          isLoading: false,
          error: error instanceof Error ? error.message : 'Failed to fetch trending movies',
        },
      }));
    }
  },

  searchMovies: async (query: string, page = 1) => {
    set(state => ({
      search: {
        ...state.search,
        query,
        isLoading: true,
        error: null,
      },
    }));

    if (!query.trim()) {
      set(state => ({
        search: {
          ...state.search,
          movies: [],
          isLoading: false,
        },
      }));
      return;
    }

    try {
      const response = await api.searchMovies(query, page);
      set(state => ({
        search: {
          ...state.search,
          movies: page === 1 ? response.results : [...state.search.movies, ...response.results],
          page: response.page,
          totalPages: response.totalPages,
          isLoading: false,
          error: null,
        },
      }));
    } catch (error) {
      set(state => ({
        search: {
          ...state.search,
          isLoading: false,
          error: error instanceof Error ? error.message : 'Failed to search movies',
        },
      }));
    }
  },

  fetchMovieDetails: async (id: number) => {
    set(state => ({
      movieDetails: {
        ...state.movieDetails,
        isLoading: true,
        error: null,
      },
    }));

    try {
      const movie = await api.getMovieById(id);
      set({
        movieDetails: {
          currentMovie: movie,
          isLoading: false,
          error: null,
        },
      });
    } catch (error) {
      set(state => ({
        movieDetails: {
          ...state.movieDetails,
          isLoading: false,
          error: error instanceof Error ? error.message : 'Failed to fetch movie details',
        },
      }));
    }
  },

  clearSearch: () => {
    set(state => ({
      search: {
        ...state.search,
        query: '',
        movies: [],
        page: 1,
        totalPages: 1,
        error: null,
      },
    }));
  },
})); 