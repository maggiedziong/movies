import React, { useState } from "react";
import Link from "next/link";
import Router from "next/router";
import { doSearch } from "../../lib/api";

import { makeStyles } from "@material-ui/core/styles";
import SearchIcon from "@material-ui/icons/Search";

import {
  Box,
  FormControl,
  Input,
  InputAdornment,
  IconButton,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    textAlign: "center",
    padding: "20px",
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

const Search = () => {
  const classes = useStyles();
  const [query, setQuery] = useState();

  const handleSearch = async (e) => {
    const query = e.target.value;
    // if (e.key === "Enter") {
    const result = await doSearch(query);
    console.log(result.data);

    // setQuery(e.target.value);
    // }
  };
  return (
    <Box>
      <FormControl className={classes.root}>
        {/* <Link href={`/search/${query}`}> */}
        <Input
          id="outlined-search"
          type="search"
          // variant="outlined"
          onKeyDown={(e) => e.key === "Enter" && handleSearch(e)}
          // endAdornment={
          //   <InputAdornment position="end">
          //     <Link
          //       href={{
          //         pathname: "/search",
          //         query: { name: "test" },
          //       }}
          //     >
          //       <SearchIcon />
          //     </Link>
          //   </InputAdornment>
          // }
        />
        {/* </Link> */}
      </FormControl>
    </Box>
  );
};

export default Search;
