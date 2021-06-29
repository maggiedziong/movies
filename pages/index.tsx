import Head from "next/head";
import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { LinearProgress } from "@material-ui/core";
import MovieGrid from "../components/MovieGrid";
import Filter from "../components/Filter";
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
}));

const Home = () => {
  const classes = useStyles();
  const [loading, setLoading] = useState(true);
  const [movieData, setMovieData] = useState<MovieProps>();
  const [movies, setMovies] = useState<Movies[]>([]);
  const [allGenres, setAllGenres] = useState<GenreProps[]>([]); // all genres from the api
  const [activeGenres, setActiveGenres] = useState([]); // genres for the listing only
  const [genreFilter, setGenreFilter] = useState([]); // currently selected genres in the filter
  const fml = [];

  const sortMovies = () => {
    console.log("----");
    console.log("data");
    console.log(movieData);
    console.log("----");

    const cleanMovies = movieData?.films.map((movie: FilmProps, i: number) => {
      const imgURL = movieData.images.base_url ?? "/coming-soon.jpeg";
      const imgSize = movieData.images.poster_sizes[4] ?? "";
      const cx = imgURL + imgSize + movie.poster_path;

      const sortGenres = movie.genre_ids.map((id: number) =>
        allGenres
          ?.filter((g: GenreProps) => id === g.id)
          .map((g: any) => g.name)
          .toString()
      );

      const movieDataFiltered = {
        key: i,
        title: movie.title,
        language: movie.original_language,
        popularity: movie.popularity,
        releaseDate: movie.release_date,
        rating: movie.vote_average,
        genres: sortGenres,
        summary: movie.overview,
        image: cx,
      };

      if (!movies.some((movie) => movie.key === movieDataFiltered.key)) {
        setMovies((currentMovies) => [...currentMovies, movieDataFiltered]);
      }

      sortGenres.map((g) => {
        const item = { name: g, number: 0 };
        fml.includes(g) ? console.log(fml) : fml.push(item);
        setActiveGenres([...fml]);
      });

      return movieDataFiltered;
    });
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
    console.log("activeGenres ", activeGenres);
    console.log("fml", fml);
  }, [movieData]);

  const filterByGenre = (genre: GenreProps) => {
    console.log("genre: ", genre);

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
          <Filter
            genreFilter={activeGenres}
            activeFilter={genreFilter}
            filterAction={(genre) => filterByGenre(genre)}
          />

          {/* {activeGenres.map((g) => (
            <div key={g}>{g}</div>
          ))} */}
          <MovieGrid movies={movies} filterGenres={genreFilter} />
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
