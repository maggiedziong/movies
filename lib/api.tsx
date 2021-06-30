import axios from "axios";
import { FilmProps } from "../types";

export const fetchAPI = async (path: string) => {
  const apiKey = "97ddb8ca2d59ad40b178f1c6b2b8747b";
  const dbUrl = "https://api.themoviedb.org/3/";
  const settings = "&language=en-US&page=1";

  try {
    const response = await axios.get(dbUrl + path + apiKey + settings);
    return response;
  } catch (error) {
    console.error(error);
  }
};

export const getNowShowing = async () => {
  const showing = await fetchAPI("movie/now_playing?api_key=");
  const r = showing.data.results;
  return r;
};

export const getGenres = async () => {
  const genres = await fetchAPI("genre/movie/list?api_key=");
  const r = genres.data.genres;
  // const res = JSON.stringify({ r });
  return r;
};

export const getImageSettings = async () => {
  const genres = await fetchAPI("configuration?api_key=");
  const r = genres.data.images;

  return r;
};

//todo delete?
export const movieContent = async () => {
  const moviesData = {
    films: await getNowShowing(),
    images: getImageSettings(),
  };

  return moviesData;
};

export const nameGenres = (movie, genreContent) => {
  return movie.genre_ids.map(
    (id: number) => genreContent.find((g) => g.id === id).name
  );
};

export const sortMovies = async () => {
  const movieContent = await getNowShowing();
  const genreContent = await getGenres();
  const imageContent = await getImageSettings();

  const imgURL = imageContent.base_url;
  const imgSize = imageContent.poster_sizes[4];

  const movieStore = [];

  const cleanMovies = movieContent.map((movie: FilmProps, i: number) => {
    const movieDataFiltered = {
      key: i,
      title: movie.title,
      language: movie.original_language,
      popularity: movie.popularity,
      releaseDate: movie.release_date,
      rating: movie.vote_average,
      genres: nameGenres(movie, genreContent),
      summary: movie.overview,
      image: imgURL + imgSize + movie.poster_path,
    };

    if (!movieStore.some((movie) => movie.key === movieDataFiltered.key)) {
      movieStore.push({ ...movieDataFiltered });
    }

    return movieDataFiltered;
  });

  return cleanMovies;
};

export const genreList = async () => {
  const movieContent = await getNowShowing();
  const genreContent = await getGenres();
  const genreStore = [];

  const activeGenres = movieContent.map((movie: FilmProps, i: number) => {
    return movie.genre_ids.map((id: number) => {
      const genreNames = genreContent.find((g) => g.id === id).name;
      const obj = { id: id, name: genreNames, value: 1 };

      if (genreStore.some((g) => g.id === id)) {
        const getItem = genreStore.findIndex((f) => f.id === id);
        genreStore[getItem].value = genreStore[getItem].value + 1;
      } else {
        genreStore.push(obj);
      }
    });
  });

  return genreStore;
};
