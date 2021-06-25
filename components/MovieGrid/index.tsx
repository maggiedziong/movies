import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Box, Paper } from "@material-ui/core";
import Rating from "@material-ui/lab/Rating";

import { MovieGridProps, Movies } from "../../types";

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

const MovieGrid: React.FC<MovieGridProps> = ({ movies }) => {
  const classes = useStyles();
  return (
    <Grid container spacing={3}>
      {movies.map((movie: Movies, i: number) => (
        <Grid item xs={6} sm={4} md={3} lg={2} key={movie.key}>
          <Box className={classes.container}>
            <h3 className={classes.title}>{movie.title}</h3>
            <div
              className={classes.poster}
              style={{ backgroundImage: "url(" + movie.image + ")" }}
            ></div>

            {/* 
            <Box className={classes.genre}>
              {movie.genres.map((genre) => (
                <span key={genre}>{genre}</span>
              ))}
            </Box> */}
            <Rating
              name="half-rating-read"
              value={movie.rating}
              size="small"
              precision={0.5}
              readOnly
              max={10}
            />

            <div className={classes.summary}>{movie.summary}</div>
          </Box>
        </Grid>
      ))}
    </Grid>
  );
};

export default MovieGrid;
