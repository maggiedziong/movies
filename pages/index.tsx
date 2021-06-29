import Head from "next/head";
import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { LinearProgress } from "@material-ui/core";
import MovieGrid from "../components/MovieGrid";
import GenreFilter from "../components/GenreFilter";
import RatingFilter from "../components/RatingFilter";
import { Movies, MovieProps, GenreProps, FilmProps } from "../types";
import Layout, { siteTitle } from "../components/layout";
import { getSortedPostsData } from "../lib/posts";
import { GetStaticProps } from "next";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    height: "100vh",
    background: theme.palette.background.default,
  },
  loaderWrapper: {
    width: "100%",
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  progress: {
    width: "80%",
  },
  filterWrapper: {
    marginBottom: "30px",
  },
}));

const Home = () => {
  const classes = useStyles();
  const [loading, setLoading] = useState(true);
  const [movieData, setMovieData] = useState<MovieProps>();
  const [movies, setMovies] = useState<Movies[]>([]);
  const [allGenres, setAllGenres] = useState<GenreProps[]>([]); // all genres from the api
  const [activeGenres, setActiveGenres] = useState<GenreProps[]>([]); // genres for the listing only
  const [genreFilter, setGenreFilter] = useState([]); // currently selected genres in the filter
  const [ratingFilter, setRatingFilter] = useState<number>(5); // currently selected genres in the filter

  const sortMovies = () => {
    const imgURL = movieData?.images.base_url ?? "/coming-soon.jpeg";
    const imgSize = movieData?.images.poster_sizes[4] ?? "";
    const genreStore = [];
    const movieStore = [];

    const cleanMovies = movieData?.films.map((movie: FilmProps, i: number) => {
      const sortGenres = movie.genre_ids.map((id: number) => {
        const genreNames = allGenres.find((g) => g.id === id).name;
        const obj = { id: id, name: genreNames, value: 1 };

        if (genreStore.some((g) => g.id === obj.id)) {
          const getItem = genreStore.findIndex((f) => f.id === obj.id);
          genreStore[getItem].value = genreStore[getItem].value + 1;
        } else {
          genreStore.push(obj);
        }

        return genreNames;
      });

      const movieDataFiltered = {
        key: i,
        title: movie.title,
        language: movie.original_language,
        popularity: movie.popularity,
        releaseDate: movie.release_date,
        rating: movie.vote_average,
        genres: sortGenres,
        summary: movie.overview,
        image: imgURL + imgSize + movie.poster_path,
      };

      console.log(movieDataFiltered);
      if (!movieStore.some((movie) => movie.key === movieDataFiltered.key)) {
        movieStore.push(movieDataFiltered);
      }
    });

    setActiveGenres(genreStore);
    setMovies(movieStore);
  };

  useEffect(() => {
    const fetchMovieData = async () => {
      const apiKey = "97ddb8ca2d59ad40b178f1c6b2b8747b";
      const dbUrl = "https://api.themoviedb.org/3/";
      const settings = "&language=en-US&page=1";

      await Promise.all([
        axios.get(dbUrl + "movie/now_playing?api_key=" + apiKey + settings),
        axios.get(dbUrl + "genre/movie/list?api_key=" + apiKey + settings),
        axios.get(dbUrl + "configuration?api_key=" + apiKey),
      ]).then(
        axios.spread((...responses) => {
          const moviesData: MovieProps = {
            films: responses[0].data.results,
            images: responses[2].data.images,
          };
          setAllGenres(responses[1].data.genres);
          setMovieData(moviesData);
          setLoading(false);
        })
      );
    };

    fetchMovieData();
  }, []);

  useEffect(() => {
    sortMovies();
  }, [movieData]);

  const filterByGenre = (genre: GenreProps) => {
    if (genreFilter.includes(genre)) {
      const newList = genreFilter.filter((g) => g !== genre);
      setGenreFilter(newList);
    } else {
      setGenreFilter([...genreFilter, genre]);
    }
  };

  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>

      {loading ? (
        <div className={classes.loaderWrapper}>
          <LinearProgress className={classes.progress} />
        </div>
      ) : (
        <>
          <div className={classes.filterWrapper}>
            <GenreFilter
              genreFilter={activeGenres}
              activeFilter={genreFilter}
              filterAction={(genre) => filterByGenre(genre)}
            />
            <RatingFilter
              rating={ratingFilter}
              filterAction={(r) => setRatingFilter(r)}
            />
          </div>
          <MovieGrid
            movies={movies}
            filterGenres={genreFilter}
            filterRating={ratingFilter}
          />
        </>
      )}
    </Layout>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const allPostsData = getSortedPostsData();
  return {
    props: {
      allPostsData,
    },
  };
};

export default Home;
