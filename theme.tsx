import { createMuiTheme } from "@material-ui/core/styles";

const theme = createMuiTheme({
  overrides: {
    MuiCssBaseline: {
      "@global": {
        html: {
          height: "100%",
        },
        body: {
          height: "100%",
        },
        root: {
          height: "100%",
        },
      },
    },
  },
  palette: {
    type: "dark",
    primary: {
      main: "#DAA520",
    },
    secondary: {
      main: "#19857b",
    },
    error: {
      main: "#e83b46",
    },
  },
  typography: {
    h1: {
      letterSpacing: "1px",
      fontWeight: "bold",
      fontSize: "60px",
      textTransform: "uppercase",
      color: "#DAA520",
    },
  },
});

export default theme;
