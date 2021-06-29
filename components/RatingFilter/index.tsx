import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Box, Button } from "@material-ui/core";
import Rating from "@material-ui/lab/Rating";

import { GenreProps } from "../../types";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-end",
    height: "100%",
  },
}));

type Props = {
  rating: number;
  filterAction: (r) => void;
};

const GenreFilter: React.FC<Props> = ({ rating, filterAction }) => {
  const classes = useStyles();

  return (
    <Grid container spacing={3}>
      <Rating
        name="half-rating-read"
        value={rating}
        size="small"
        precision={0.5}
        onChange={(e, v) => filterAction(v)}
        max={10}
      />
    </Grid>
  );
};

export default GenreFilter;
