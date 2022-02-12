import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import App from "./app/App";

const theme = createTheme({
  palette: {
    primary: {
      main: "#6667AB",
    },
    secondary: {
      main: "#DF88B7",
    },
  },
  components: {
    MuiChip: {
      defaultProps: {
        sx: { borderRadius: 2, minWidth: 40 },
        size: "small",
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
