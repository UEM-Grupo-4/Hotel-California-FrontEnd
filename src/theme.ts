import { createTheme } from "@mui/material";

export const theme = createTheme({
  palette: {
    primary: {
      main: "#E3A72F",
      light: "#F0BD5A",
      dark: "#CF921F",
      contrastText: "#FFFFFF",
    },
  },

  components: {
    MuiTypography: {
      styleOverrides: {
        root: {
          fontFamily: "Inclusive Sans",
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        containedPrimary: {
          backgroundColor: "#E3A72F",
          color: "#FFFFFF",
          border: "1px solid #D29A2A",

          "&:hover": {
            backgroundColor: "#CF921F",
          },

          "&:active": {
            backgroundColor: "#B87E12",
          },

          "&:disabled": {
            border: "none",
          },
        },
      },
    },
  },
});
