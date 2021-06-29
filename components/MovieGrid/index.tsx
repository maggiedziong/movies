import React from "react";
import Image from "next/image";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Typography, Box } from "@material-ui/core";
import { MovieGridProps, Movies } from "../../types";
import MoviePod from "../MoviePod";

const useStyles = makeStyles((theme) => ({
  oops: {
    marginTop: "20vh",
    color: theme.palette.background.default,
    background: theme.palette.primary.main,
    padding: "10px 15px",
    display: "flex",
    alignItems: "center",
  },
  oopsText: {
    marginRight: "10px",
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
        <Grid item container xs={12} justify="center" alignItems="center">
          <Box className={classes.oops}>
            <Typography variant="h5" className={classes.oopsText}>
              Oops! No films match your criteria at the moment
            </Typography>
            <Image
              src="/images/seenoevil.png"
              width="30px"
              height="30px"
              alt="Oops"
            />
          </Box>
        </Grid>
      )}
    </Grid>
  );
};

export default MovieGrid;
