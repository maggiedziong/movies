import axios from "axios";
import { FilmProps } from "../types";

const fetchAPI = async (path: string, query?: string) => {
  const apiKey = "?api_key=97ddb8ca2d59ad40b178f1c6b2b8747b";
  const dbUrl = "https://api.themoviedb.org/3/";
  const settings = "&language=en-US&page=1";
  const optionalQuery = query ? query : "";

  try {
    const response = await axios.get(
      dbUrl + path + apiKey + settings + optionalQuery
    );
    return response;
  } catch (error) {
    console.error(error);
  }
};

const getNowShowing = async () => {
  const showing = await fetchAPI("movie/now_playing");
  const r = showing.data.results;
  // console.error(r);
  return r;
};

const getGenres = async () => {
  const genres = await fetchAPI("genre/movie/list");
  const r = genres.data.genres;
  return r;
};

export const getImageSettings = async () => {
  const genres = await fetchAPI("configuration");
  const r = genres.data.images;
  return r;
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

  const cleanMovies = movieContent.map((movie: FilmProps) => {
    const movieDataFiltered = {
      id: movie.id,
      title: movie.title,
      slug: movie.title.replace(/\s+/g, "-").toLowerCase(),
      language: movie.original_language,
      popularity: movie.popularity,
      releaseDate: movie.release_date,
      rating: movie.vote_average,
      genres: nameGenres(movie, genreContent),
      summary: movie.overview,
      image: imgURL + imgSize + movie.poster_path,
    };

    if (!movieStore.some((movie) => movie.key === movieDataFiltered.id)) {
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

export const filmDetails = async (slug) => {
  const allMovies = await sortMovies();
  const getID = allMovies.find((m) => m.slug === slug).id;
  const film = await fetchAPI(
    `movie/${getID}`,
    "&append_to_response=videos,images"
  );
  console.log("film");
  console.log(film);

  return film.data;
};

export const doSearch = async (query) => {
  const result = await fetchAPI(`search/movie/`, `&query=${query}`);
  console.log(result);
  return result;
};
