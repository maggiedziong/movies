export type MovieProps = Movies[];

export type MovieGridProps = {
  movies: Movies[];
};

export interface Movies {
  key: number;
  title: string;
  popularity: number;
  rating: number;
  genres: string[];
  image: string;
  summary: string;
}
