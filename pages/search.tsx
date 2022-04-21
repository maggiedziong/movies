import { Container, Box, Grid, Typography, Link } from "@material-ui/core";

import { useRouter } from "next/router";

const Search = ({ query }) => {
  const router = useRouter();
  const { pid } = router.query;
  console.log("a ", router.query.name);
  return <Typography>{query}</Typography>;
};

export default Search;

export const getInitialProps = async ({ query }) => {
  const router = useRouter();
  const { pid } = router.query;
  console.log(router.query);
  console.log("q: ", query);
  const { name } = query;

  return query;
};
