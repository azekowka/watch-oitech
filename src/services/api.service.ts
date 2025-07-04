import { Movie, MovieDetailsResponse, SearchMoviesResponse, TrendingMoviesResponse } from './api.types';

const API_URL = 'https://api.themoviedb.org/3';
const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;
const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p';

if (!API_KEY) {
  throw new Error('TMDB_API_KEY is missing in environment variables');
}

const headers = {
  'Authorization': `Bearer ${API_KEY}`,
  'accept': 'application/json',
};

class ApiError extends Error {
  constructor(public status: number, message: string) {
    super(message);
    this.name = 'ApiError';
  }
}

interface TMDBResponse {
  status_message?: string;
}

async function handleResponse<T extends TMDBResponse>(response: Response): Promise<T> {
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({ status_message: 'Unknown error' }));
    throw new ApiError(
      response.status,
      `API Error: ${response.status} - ${response.statusText}. ${errorData.status_message}`
    );
  }
  return response.json();
}

interface TMDBMovie {
  id: number;
  title: string;
  original_title: string;
  overview: string;
  poster_path: string | null;
  backdrop_path: string | null;
  release_date: string;
  vote_average: number;
  vote_count: number;
  popularity: number;
  genres?: Array<{ id: number; name?: string }>;
  genre_ids?: number[];
  adult: boolean;
  original_language: string;
}

// Helper function to format movie data
function formatMovieData(movie: TMDBMovie): Movie {
  return {
    id: movie.id,
    title: movie.title,
    originalTitle: movie.original_title,
    overview: movie.overview,
    posterPath: movie.poster_path ? `${IMAGE_BASE_URL}/w500${movie.poster_path}` : null,
    backdropPath: movie.backdrop_path ? `${IMAGE_BASE_URL}/original${movie.backdrop_path}` : null,
    releaseDate: movie.release_date,
    voteAverage: movie.vote_average,
    voteCount: movie.vote_count,
    popularity: movie.popularity,
    genres: movie.genres || movie.genre_ids?.map((id: number) => ({ id })) || [],
    adult: movie.adult,
    originalLanguage: movie.original_language,
  };
}

interface TMDBMovieList extends TMDBResponse {
  page: number;
  total_pages: number;
  total_results: number;
  results: TMDBMovie[];
}

interface TMDBMovieDetails extends TMDBMovie, TMDBResponse {
  tagline: string;
  status: string;
  runtime: number;
  revenue: number;
  budget: number;
  credits: {
    cast: Array<{
      id: number;
      name: string;
      character: string;
      profile_path: string | null;
    }>;
    crew: Array<{
      id: number;
      name: string;
      job: string;
      department: string;
    }>;
  };
  videos: {
    results: Array<{
      id: string;
      key: string;
      name: string;
      site: string;
      type: string;
    }>;
  };
  similar: {
    results: TMDBMovie[];
  };
}

export const api = {
  async getTrendingMovies(page: number = 1): Promise<TrendingMoviesResponse> {
    try {
      const response = await fetch(
        `${API_URL}/trending/movie/week?page=${page}`,
        { headers }
      );
      const data = await handleResponse<TMDBMovieList>(response);
      
      return {
        page: data.page,
        totalPages: data.total_pages,
        totalResults: data.total_results,
        results: data.results.map(formatMovieData),
      };
    } catch (error) {
      console.error('Error fetching trending movies:', error);
      throw error;
    }
  },

  async getMovieById(id: number): Promise<MovieDetailsResponse> {
    try {
      const response = await fetch(
        `${API_URL}/movie/${id}?append_to_response=credits,videos,similar`,
        { headers }
      );
      const data = await handleResponse<TMDBMovieDetails>(response);
      return {
        ...formatMovieData(data),
        tagline: data.tagline,
        status: data.status,
        runtime: data.runtime,
        revenue: data.revenue,
        budget: data.budget,
        credits: data.credits,
        videos: data.videos,
        similar: {
          results: data.similar?.results?.map(formatMovieData) || [],
        },
      };
    } catch (error) {
      console.error(`Error fetching movie ${id}:`, error);
      throw error;
    }
  },

  async searchMovies(query: string, page: number = 1): Promise<SearchMoviesResponse> {
    try {
      const response = await fetch(
        `${API_URL}/search/movie?query=${encodeURIComponent(query)}&page=${page}`,
        { headers }
      );
      const data = await handleResponse<TMDBMovieList>(response);
      
      return {
        page: data.page,
        totalPages: data.total_pages,
        totalResults: data.total_results,
        results: data.results.map(formatMovieData),
      };
    } catch (error) {
      console.error('Error searching movies:', error);
      throw error;
    }
  },
}; 