import React from "react";
import Image from "next/image";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Typography } from "@material-ui/core";
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

const MovieGrid: React.FC<MovieGridProps> = ({
  movies,
  filterGenres,
  filterRating,
}) => {
  const classes = useStyles();
  const filteredMovies = movies.filter((m) =>
    m.genres.some((g) => filterGenres.includes(g))
  );
  const finalMovieList = filteredMovies.length !== 0 ? filteredMovies : movies;
  const ratingFilter = finalMovieList.filter((r) => r.rating >= filterRating);

  return (
    <Grid container spacing={3}>
      {ratingFilter.length ? (
        ratingFilter.map((movie: Movies, i: number) => (
          <Grid item xs={6} sm={4} md={3} lg={2} key={movie.key}>
            <MoviePod movie={movie} />
          </Grid>
        ))
      ) : (
        <Grid item xs={6} sm={4}>
          <Typography>
            Oops! No films match your criteria at the moment
            <Image
              src="/images/seenoevil.png"
              width="30px"
              height="30px"
              alt="Oops"
            />
          </Typography>
        </Grid>
      )}
    </Grid>
  );
};

export default MovieGrid;
