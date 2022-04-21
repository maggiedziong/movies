import React from "react";
import Link from "next/link";
import { makeStyles } from "@material-ui/core/styles";
import FastRewind from "@material-ui/icons/FastRewind";
import { Typography, Button, Grid } from "@material-ui/core";
import Search from "../Search";

const useStyles = makeStyles((theme) => ({
  header: {
    width: "100%",
    textAlign: "center",
    padding: "20px 6vw",
  },
  back: {
    position: "absolute",
    top: 50,
    left: 70,
    height: 50,
    zIndex: 5,
  },
  backIcon: {
    height: "50px",
    width: "50px",
    fill: theme.palette.primary.main,
  },
}));

const Header = ({ title, home }: { title?: string; home?: boolean }) => {
  const classes = useStyles();

  return (
    <header className={classes.header}>
      <Grid container spacing={3}>
        <Grid item xs={3} md={2}>
          {!home && (
            <div className={classes.back}>
              <Link href="/">
                <Button>
                  <FastRewind className={classes.backIcon} />
                </Button>
              </Link>
            </div>
          )}
        </Grid>
        <Grid item xs={6} md={8}>
          {title && <Typography variant="h1">{title}</Typography>}
        </Grid>
        <Grid item xs={12} md={2}>
          <Search />
        </Grid>
      </Grid>
    </header>
  );
};

export default Header;
