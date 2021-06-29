import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Typography,
  Accordion,
  AccordionDetails,
  AccordionSummary,
} from "@material-ui/core";
import FilterList from "@material-ui/icons/FilterList";
import Rating from "@material-ui/lab/Rating";

import { GenreProps } from "../../types";

const useStyles = makeStyles((theme) => ({
  accordion: {
    background: "none",
    boxShadow: "none",
    "&:before": {
      display: "none",
    },
  },
  accordionHeader: {
    justifyContent: "flex-start",
    paddingLeft: 0,
    "& .MuiAccordionSummary-content": {
      flexGrow: 0,
    },
    "& svg": {
      width: 18,
      height: 18,
    },
  },
  accordionDetails: {
    borderBottom: "1px solid " + theme.palette.primary.main,
  },
  heading: {
    fontSize: "18px",
    letterSpacing: 1.2,
  },
}));

type Props = {
  rating: number;
  filterAction: (r) => void;
};

const GenreFilter: React.FC<Props> = ({ rating, filterAction }) => {
  const classes = useStyles();

  return (
    <Accordion className={classes.accordion}>
      <AccordionSummary
        expandIcon={<FilterList />}
        aria-controls="panel1a-content"
        id="panel1a-header"
        className={classes.accordionHeader}
      >
        <Typography variant="h5" className={classes.heading}>
          Filter by rating
        </Typography>
      </AccordionSummary>
      <AccordionDetails className={classes.accordionDetails}>
        <Rating
          name="half-rating-read"
          value={rating}
          size="small"
          precision={0.5}
          onChange={(e, v) => filterAction(v)}
          max={10}
        />
      </AccordionDetails>
    </Accordion>
  );
};

export default GenreFilter;
