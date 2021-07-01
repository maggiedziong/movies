export type MovieGridProps = {
  movies: Movies[];
  filterGenres?: string[];
  filterRating?: number;
  sortBy?: string;
};

export interface Movies {
  id: number;
  title: string;
  slug: string;
  popularity: number;
  rating: number;
  genres: string[];
  image: string;
  summary: string;
}

export type ImageProps = {
  base_url: string;
  poster_sizes: string[];
};

export type FilmProps = {
  id: number;
  genre_ids: number[];
  title: string;
  popularity: number;
  vote_average: number;
  overview: string;
  poster_path: string;
  original_language: string;
  release_date: string;
};

export type GenreProps = {
  id: number;
  name: string;
  value?: number;
};

export type GenreArrayProps = {
  genreFilter: GenreProps[];
};

export type MovieProps = {
  images: ImageProps;
  films: FilmProps[];
  genres?: GenreProps[];
};
