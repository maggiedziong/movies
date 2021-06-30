import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Select, FormControl, InputLabel, MenuItem } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  select: {
    minWidth: "180px",
  },
}));

type Props = {
  sortAction: (s) => void;
};

const SortBy: React.FC<Props> = ({ sortAction }) => {
  const classes = useStyles();
  const [sort, setSort] = useState();

  const setSortVal = (val) => {
    sortAction(val);
    setSort(val);
  };

  return (
    <FormControl variant="outlined" className={classes.select}>
      <InputLabel id="demo-simple-select-filled-label">Sort by</InputLabel>
      <Select
        labelId="demo-simple-select-filled-label"
        id="demo-simple-select-filled"
        value={sort ? sort : ""}
        label="Sort by"
        onChange={(e) => setSortVal(e.target.value)}
      >
        <MenuItem value="">
          <em>Reset</em>
        </MenuItem>
        <MenuItem value={"rd"}>Release Date (Latest)</MenuItem>
        <MenuItem value={"az"}>Alphabetically</MenuItem>
        <MenuItem value={"p"}>Popularity</MenuItem>
      </Select>
    </FormControl>
  );
};

export default SortBy;
