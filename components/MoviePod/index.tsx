import React from "react";
import Link from "next/link";
import { makeStyles } from "@material-ui/core/styles";
import { Box, Link as MUILink } from "@material-ui/core";
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
}));

const MoviePod: React.FC<Props> = ({ movie }) => {
  const classes = useStyles();
  return (
    <Box className={classes.container}>
      <Link href={`/films/${movie.slug}`} passHref>
        <MUILink color="textPrimary">
          <h3 className={classes.title}>{movie.title}</h3>
        </MUILink>
      </Link>
      <Link href={`/films/${movie.slug}`} passHref>
        <MUILink>
          <div
            className={classes.poster}
            style={{ backgroundImage: "url(" + movie.image + ")" }}
          ></div>
        </MUILink>
      </Link>
      <Rating
        name="half-rating-read"
        value={movie.rating}
        size="small"
        precision={0.5}
        readOnly
        max={10}
      />
    </Box>
  );
};

export default MoviePod;
