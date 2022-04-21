import Head from "next/head";
import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { LinearProgress, Container } from "@material-ui/core";
import MovieGrid from "../components/MovieGrid";
import GenreFilter from "../components/GenreFilter";
import RatingFilter from "../components/RatingFilter";
import SortBy from "../components/SortBy";
import { Movies, GenreProps } from "../types";
import Layout, { siteTitle } from "../components/layout";
import { genreList, sortMovies } from "../lib/api";
import { GetStaticProps } from "next";

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
    display: "flex",
    alignItems: "flex-end",
  },
}));

const Home = ({ movieContent, genreContent }) => {
  const classes = useStyles();
  const [loading, setLoading] = useState(true);
  const [movies, setMovies] = useState<Movies[]>();
  const [genreFilter, setGenreFilter] = useState([]); // currently selected genres in the filter
  const [ratingFilter, setRatingFilter] = useState<number>(5); // currently selected genres in the filter
  const [sortBy, setSortBy] = useState<string>();

  useEffect(() => {
    const buildPage = async () => {
      await movieContent;
      setMovies(movieContent);
      setLoading(false);
    };
    buildPage();
  }, [movieContent]);

  const filterByGenre = (genre: GenreProps) => {
    if (genreFilter.includes(genre)) {
      const newList = genreFilter.filter((g) => g !== genre);
      setGenreFilter(newList);
    } else {
      setGenreFilter([...genreFilter, genre]);
    }
  };

  return (
    <Layout home header="Now Showing">
      <Head>
        <title>{siteTitle}</title>
      </Head>

      <Container>
        {loading ? (
          <div className={classes.loaderWrapper}>
            <LinearProgress className={classes.progress} />
          </div>
        ) : (
          <>
            <div className={classes.filterWrapper}>
              <div>
                <GenreFilter
                  genreFilter={genreContent}
                  activeFilter={genreFilter}
                  filterAction={(genre) => filterByGenre(genre)}
                />
                <RatingFilter
                  rating={ratingFilter}
                  filterAction={(r) => setRatingFilter(r)}
                />
              </div>
              <SortBy sortAction={(s) => setSortBy(s)} />
            </div>
            <MovieGrid
              movies={movies}
              filterGenres={genreFilter}
              filterRating={ratingFilter}
              sortBy={sortBy}
            />
          </>
        )}
      </Container>
    </Layout>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const genreContent = await genreList();
  const movieContent = await sortMovies();
  return {
    props: {
      movieContent,
      genreContent,
    },
  };
};

export default Home;
