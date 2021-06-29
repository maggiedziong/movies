import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Box, Button } from "@material-ui/core";

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
  genreFilter: string[];
  activeFilter: string[];
  filterAction: (genre) => void;
};

const MovieGrid: React.FC<Props> = ({
  genreFilter,
  filterAction,
  activeFilter,
}) => {
  const classes = useStyles();
  return (
    <Grid container spacing={3}>
      <h3> </h3>
      <div className="filters__display">
        <div className="filters__display__inner">
          {genreFilter.map((g) => (
            <Button
              onClick={() => {
                filterAction(g);
              }}
              key={g}
              color={activeFilter.includes(g) ? "primary" : "default"}
            >
              {g}
            </Button>
          ))}
        </div>
      </div>
    </Grid>
  );
};

export default MovieGrid;
