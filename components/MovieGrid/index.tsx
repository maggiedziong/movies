import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Box, Paper } from "@material-ui/core";
import { MovieGridProps, Movies } from "./types";

const useStyles = makeStyles((theme) => ({
  poster: {
    backgroundSize: "contain",
    backgroundRepeat: "no-repeat",
    backgroundColor: "black",
    width: "100%",
    paddingTop: "144%",
  },
  genre: {
    marginRight: "10px",
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

  console.log(movies);

  return (
    <Grid container spacing={1}>
      {movies.map((movie: Movies, i: number) => (
        <Grid item xs={12} sm={6} md={4} lg={3} spacing={3} key={movie.key}>
          <Paper>
            <h3>{movie.title}</h3>

            <div
              className={classes.poster}
              style={{ backgroundImage: "url(" + movie.image + ")" }}
            >
              <span>{movie.rating} / 10</span>
            </div>

            <Box>
              {movie.genres.map((genre) => (
                <span className={classes.genre} key={genre}>
                  {genre}
                </span>
              ))}
            </Box>

            <div className={classes.summary}>{movie.summary}</div>
          </Paper>
        </Grid>
      ))}
    </Grid>
  );
};

export default MovieGrid;
