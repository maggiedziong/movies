import Head from "next/head";
import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { LinearProgress } from "@material-ui/core";
import MovieGrid from "../components/MovieGrid";
import { Movies } from "../components/MovieGrid/types";
import Layout, { siteTitle } from "../components/layout";
import { getSortedPostsData } from "../lib/posts";
import { GetStaticProps } from "next";
import axios from "axios";

type Images = {
  base_url: string;
  poster_sizes: string[];
};

type MovieProps = {
  genre_ids: number[];
  title: string;
  popularity: number;
  vote_average: number;
  overview: string;
  poster_path: string;
};

type GenreProps = {
  id: number;
  name: string;
};

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
  const [movieData, setMovieData] = useState([]);
  const [genreData, setGenreData] = useState([]);
  const [imageData, setImageData] = useState<Images>();
  const [movies, setMovies] = useState<Movies[]>([]);

  const sortMovies = () => {
    const cleanMovies = movieData.map((movie: MovieProps, i: number) => {
      const imgURL = imageData?.base_url ?? "/coming-soon.jpeg";
      const imgSize = imageData?.poster_sizes[4] ?? "";
      const cx = imgURL + imgSize + movie.poster_path;

      const sortGenres = movie.genre_ids.map((id: number) =>
        genreData
          .filter((g: GenreProps) => id === g.id)
          .map((g: any) => g.name)
          .toString()
      );

      const movieDataFiltered = {
        key: i,
        title: movie.title,
        popularity: movie.popularity,
        rating: movie.vote_average,
        genres: sortGenres,
        summary: movie.overview,
        image: cx,
      };

      setMovies((oldMovies) => [...oldMovies, movieDataFiltered]);

      return movieDataFiltered;
    });

    return cleanMovies;
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
          setMovieData(responses[0].data.results);
          setGenreData(responses[1].data.genres);
          setImageData(responses[2].data.images);
          console.log(responses[0].data.results);
          // console.log(responses[1].data.genres);
          // console.log(responses[2].data.images);
          setLoading(false);
          sortMovies();
        })
      );
    };

    fetchMovieData();
  }, []);

  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>

      {/* <Container className={classes.root}> */}
      {loading ? (
        <div className={classes.loaderWrapper}>
          <LinearProgress className={classes.progress} />
        </div>
      ) : (
        movieData && <MovieGrid movies={movies} />
      )}
      {/* </Container> */}

      {/* <section className={utilStyles.headingMd}>
        <p>[Your Self Introduction]</p>
        <p>
          (This is a sample website - you’ll be building a site like this in{" "}
          <a href="https://nextjs.org/learn">our Next.js tutorial</a>.)
        </p>
      </section>
      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>Blog</h2>
        <ul className={utilStyles.list}>
          {allPostsData.map(({ id, date, title }) => (
            <li className={utilStyles.listItem} key={id}>
              <Link href={`/posts/${id}`}>
                <a>{title}</a>
              </Link>
              <br />
              <small className={utilStyles.lightText}>
                <Date dateString={date} />
              </small>
            </li>
          ))}
        </ul>
      </section> */}
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
