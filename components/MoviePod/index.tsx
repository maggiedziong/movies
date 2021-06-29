import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Box } from "@material-ui/core";
import Rating from "@material-ui/lab/Rating";
import { Movies } from "../../types";

type Props = {
  movie: Movies;
};

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

const MoviePod: React.FC<Props> = ({ movie }) => {
  const classes = useStyles();
  return (
    <Box className={classes.container}>
      <h3 className={classes.title}>{movie.title}</h3>
      <div
        className={classes.poster}
        style={{ backgroundImage: "url(" + movie.image + ")" }}
      ></div>

      {/* <Box className={classes.genre}>
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
  );
};

export default MoviePod;
