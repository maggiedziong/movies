import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  header: {
    width: "100%",
    textAlign: "center",
    padding: "20px",
  },
}));

const Header = () => {
  const classes = useStyles();

  return (
    <header className={classes.header}>
      <Typography variant="h1">Now Showing</Typography>
    </header>
  );
};

export default Header;
