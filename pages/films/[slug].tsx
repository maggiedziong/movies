import Layout from "../../components/layout";
import { Theme } from "@material-ui/core";

import { sortMovies, filmDetails, getImageSettings } from "../../lib/api";
import { Container, Box, Grid, Typography, Link } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import Head from "next/head";

import { GetStaticProps, GetStaticPaths } from "next";

type Props = {
  size: string;
};
const useStyles = makeStyles({
  container: {
    padding: "50px 120px",
    position: "absolute",
    top: 0,
  },
  content: {
    marginTop: "30vh",
  },
  title: {
    fontWeight: "lighter",
    fontSize: (props: Props) => props.size,
    "& span": {
      fontSize: "40%",
    },
  },
  poster: {
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    height: "90vh",
    width: "100%",
    top: 0,
    position: "absolute",
    "&::before": {
      content: "''",
      position: "absolute",
      height: "100%",
      width: "100%",
      backgroundImage:
        "radial-gradient(farthest-side at 90% 21%, transparent, rgb(26, 29, 41))",
    },
  },
  logosWrap: {
    display: "flex",
    alignItems: "center",
    margin: "10px 0 100px",
  },
  logos: {
    marginRight: 20,
  },
  invert: {
    filter: "invert(1)",
  },
});

const Film = ({ filmData, imageSettings }) => {
  const imgBasePath = imageSettings.base_url;
  const backdropSize = imageSettings.backdrop_sizes[3];
  const logoSize = imageSettings.logo_sizes[1];
  const duration = filmData.runtime;
  const hours = Math.floor(duration / 60);
  const minutes = duration % 60;
  const runTime = `${hours}h ${minutes}m`;
  const title = filmData.title;
  const titleLength = title.length;
  const titleFontSize =
    titleLength < 8
      ? "7vw"
      : titleLength < 17
      ? "5.3vw"
      : titleLength < 25
      ? "4vw"
      : "3.4vw";

  const classes = useStyles({ size: titleFontSize });
  console.log(titleLength);
  console.log(titleFontSize);
  console.log(filmData);
  console.log(imageSettings);

  return (
    <Layout>
      <Head>
        <title>{filmData.title}</title>
      </Head>

      <Box
        className={classes.poster}
        style={{
          backgroundImage: `url(${
            imgBasePath + backdropSize + filmData.backdrop_path
          })`,
        }}
      ></Box>
      <div className={classes.container}>
        <Grid container spacing={3} className={classes.content}>
          <Grid item xs={12} md={8} lg={7}>
            <Typography variant="h1" component="h2" className={classes.title}>
              {title.split(":")[0]}
              {title.split(":")[1] && (
                <>
                  :
                  <br />
                </>
              )}
              {title.split(":")[1]}{" "}
              <span>({filmData.release_date.split("-")[0]})</span>
            </Typography>

            <Box className={classes.logosWrap}>
              {filmData.production_companies.map((c) => (
                <div className={classes.logos}>
                  <img
                    key={c.id}
                    src={imgBasePath + logoSize + c.logo_path}
                    className={classes.invert}
                    alt={c.name}
                  />
                </div>
              ))}
            </Box>
            <Typography variant="body2" paragraph>
              {runTime}
              {"  •  "}
              {filmData.genres.map((g, i) => (
                <span key={g.id}>
                  {g.name}
                  {filmData.genres[i + 1] ? "  -  " : ""}
                </span>
              ))}
            </Typography>

            <Typography variant="h6" gutterBottom>
              Overview
            </Typography>
            <Typography variant="body1" paragraph>
              {filmData.overview}
            </Typography>

            <Link href={filmData.homepage}> Go to film homepage </Link>
          </Grid>
        </Grid>
      </div>
      <Container>hi</Container>
    </Layout>
  );
};

export default Film;

export const getStaticPaths: GetStaticPaths = async () => {
  const allMovies = await sortMovies();
  return {
    paths: allMovies?.map((film) => `/films/${film.slug}`) || [],
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const filmData = await filmDetails(params.slug);
  const imageSettings = await getImageSettings();
  console.log(filmData);
  return {
    props: {
      filmData,
      imageSettings,
    },
  };
};
