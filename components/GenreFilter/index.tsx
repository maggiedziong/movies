import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Typography,
  Button,
  Accordion,
  AccordionDetails,
  AccordionSummary,
} from "@material-ui/core";
import FilterList from "@material-ui/icons/FilterList";

const useStyles = makeStyles((theme) => ({
  accordion: {
    background: "none",
    boxShadow: "none",
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
  genreFilter: [
    {
      id: number;
      name: string;
      value: number;
    }
  ];
  activeFilter: string[];
  filterAction: (genre) => void;
};

const GenreFilter: React.FC<Props> = ({
  genreFilter,
  filterAction,
  activeFilter,
}) => {
  const classes = useStyles();

  return (
    <Accordion>
      <AccordionSummary
        expandIcon={<FilterList />}
        aria-controls="panel1a-content"
        id="panel1a-header"
        className={classes.accordionHeader}
      >
        <Typography variant="h5" className={classes.heading}>
          Filter by genre
        </Typography>
      </AccordionSummary>
      <AccordionDetails className={classes.accordionDetails}>
        {genreFilter.map((g) => (
          <Button
            onClick={() => {
              filterAction(g.name);
            }}
            key={g.id}
            color={activeFilter.includes(g.name) ? "primary" : "default"}
          >
            {g.name}
            {"   "}({g.value})
          </Button>
        ))}
      </AccordionDetails>
    </Accordion>
  );
};

export default GenreFilter;
