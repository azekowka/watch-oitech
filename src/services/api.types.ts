export interface Movie {
  id: number;
  title: string;
  originalTitle: string;
  overview: string;
  posterPath: string | null;
  backdropPath: string | null;
  releaseDate: string;
  voteAverage: number;
  voteCount: number;
  popularity: number;
  genres: { id: number; name?: string; }[];
  adult: boolean;
  originalLanguage: string;
}

export interface MovieDetailsResponse extends Movie {
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
  };
  videos: {
    results: Array<{
      id: string;
      key: string;
      site: string;
      type: string;
    }>;
  };
  similar: {
    results: Movie[];
  };
}

export interface TrendingMoviesResponse {
  page: number;
  totalPages: number;
  totalResults: number;
  results: Movie[];
}

export interface SearchMoviesResponse extends TrendingMoviesResponse {} 