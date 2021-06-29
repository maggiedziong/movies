import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid } from "@material-ui/core";
import { MovieGridProps, Movies } from "../../types";
import MoviePod from "../MoviePod";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-end",
    height: "100%",
  },
  title: {
    display: "flex",
    alignItems: "flex-end",
    flexGrow: 1,
  },
  poster: {
    backgroundSize: "contain",
    backgroundRepeat: "no-repeat",
    backgroundColor: "black",
    width: "100%",
    paddingTop: "150%",
    marginBottom: "10px",
  },
  genre: {
    display: "inline-block",
    padding: "0 5px",
    background: theme.palette.primary.main,
    color: theme.palette.background.default,
  },
  summary: {
    display: "none",
  },
}));

const MovieGrid: React.FC<MovieGridProps> = ({ movies, filterGenres }) => {
  const classes = useStyles();
  const filteredMovies = movies.filter((m) =>
    m.genres.some((g) => filterGenres.includes(g))
  );
  const finalMovieList = filteredMovies.length !== 0 ? filteredMovies : movies;

  return (
    <Grid container spacing={3}>
      {finalMovieList.map((movie: Movies, i: number) => (
        <Grid item xs={6} sm={4} md={3} lg={2} key={movie.key}>
          <MoviePod movie={movie} />
        </Grid>
      ))}
    </Grid>
  );
};

export default MovieGrid;
