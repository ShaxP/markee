import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import App from "./app/App";

const theme = createTheme({
  palette: {
    primary: {
      main: "#6266F1",
    },
    secondary: {
      main: "#39BDF7",
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          fontFamily: "Lato",
          fontWeight: "bold",
          textTransform: "none",
          borderRadius: 12,
          boxShadow: "0px 4px 12px 0px rgba(98, 102, 241, 0.4)",
        },
      },
    },
    MuiTypography: {
      styleOverrides: {
        paragraph: {
          fontFamily: "Lato",
        },
        h1: {
          fontFamily: "Lato",
        },
        h2: {
          fontFamily: "Lato",
        },
        h3: {
          fontFamily: "Lato",
        },
        h4: {
          fontFamily: "Lato",
        },
        h5: {
          fontFamily: "Lato",
        },
        h6: {
          fontFamily: "Lato",
        },
        subtitle1: {
          fontFamily: "Lato",
          fontWeight: "bold",
        },
        button: {
          fontFamily: "Lato",
          fontWeight: "bold",
        },
        caption: {
          fontFamily: "Lato",
          fontStyle: "italic",
        },
        body1: {
          fontFamily: "Lato",
        },
        body2: {
          fontFamily: "Lato",
          color: "#64748B",
        },
      },
    },
    MuiCssBaseline: {
      styleOverrides: `
        @font-face {
          font-family: 'Lato';
          font-style: normal;
          font-display: swap;
          font-weight: 400;
          src: url('http://fonts.googleapis.com/css?family=Lato&subset=latin,latin-ext');
          unicodeRange: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF;
        }
      `,
    },
    MuiChip: {
      defaultProps: {
        sx: { borderRadius: 2, minWidth: 40 },
        size: "small",
      },
    },
    MuiListItemText: {
      styleOverrides: {
        primary: {
          fontFamily: "Lato",
          fontWeight: "bold",
        },
      },
    },
    MuiListSubheader: {
      styleOverrides: {
        root: {
          fontFamily: "Lato",
          fontWeight: "normal",
          fontSize: 20,
          letterSpacing: "0.8px",
        },
      },
    },
  },
});

const Home: NextPage = () => {
  return (
    <div>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </div>
  );
};

export default Home;
