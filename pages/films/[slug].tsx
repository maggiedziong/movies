import Layout from "../../components/layout";
import { sortMovies, filmDetails, getImageSettings } from "../../lib/api";
import { Container, Box, Grid, Typography, Link } from "@material-ui/core";

import Head from "next/head";
import Image from "next/image";

import { GetStaticProps, GetStaticPaths } from "next";

const Film = ({ filmData, imageSettings }) => {
  const imgBasePath = imageSettings.base_url;
  const posterSize = imageSettings.poster_sizes[4];
  const logoSize = imageSettings.logo_sizes[1];

  console.log(filmData);
  console.log(imageSettings);
  return (
    <Layout>
      <Head>
        <title>{filmData.title}</title>
      </Head>
      <Container>
        <Grid container spacing={3}>
          <Grid item xs={6} sm={4} md={3}>
            <Image
              src={imgBasePath + posterSize + filmData.poster_path}
              width={500}
              height={750}
            />
          </Grid>
          <Grid item xs={6} sm={8} md={9}>
            <Typography variant="h1" component="h2">
              {filmData.title}
            </Typography>
            <Typography variant="body2">
              Runtime: {filmData.runtime} minutes
              {filmData.genres.map((g) => (
                <span key={g.id}> | {g.name}</span>
              ))}
            </Typography>
            <Box>
              Release date:{" "}
              {filmData.release_date.split("-").reverse().join("/")}
            </Box>
            <Typography variant="h6">Overview</Typography>
            <Typography variant="body1">{filmData.overview}</Typography>

            <Box>
              {filmData.production_companies.map((c) => (
                <div key={c.id}>
                  <Image
                    src={imgBasePath + logoSize + c.logo_path}
                    alt={c.name}
                    width={92}
                    height={31}
                  />
                </div>
              ))}
            </Box>

            <Link href={filmData.homepage}> view </Link>
          </Grid>
        </Grid>

        {/* <Box>Homepage: {</Box> */}

        {/* <Box>OG Title: {filmData.original_title}</Box>
        <Box>OG Language: {filmData.original_language}</Box> */}

        {/* <Box>Status: {filmData.status}</Box> */}
        {/* <Box>
          poster: {imgBasePath + filmData.poster_path}
          <Image
            src={imgBasePath + posterSize + filmData.poster_path}
            width={200}
            height={150}
          />
        </Box>
        <Box>
          backdrop:
          <Image
            src={imgBasePath + backgdropSize + filmData.backdrop_path}
            width={200}
            height={150}
          />
        </Box> */}
      </Container>
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
  return {
    props: {
      filmData,
      imageSettings,
    },
  };
};
