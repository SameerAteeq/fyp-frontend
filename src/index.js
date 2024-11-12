import React from "react";
import ReactDOM from "react-dom/client";
import reportWebVitals from "./reportWebVitals";
// import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { ThemeProvider } from "@mui/material/styles";
import { createTheme } from "@mui/material/styles";

import "./index.css";
import App from "./App";
import { store } from "./store/store";

const root = ReactDOM.createRoot(document.getElementById("root"));

// const theme = createTheme({
//   palette: {
//     primary: {
//       main: "#d3d3d3", //   Change the primary color
//       // main: "#64a1c1", // Change the primary color
//       light: "#fff",
//     },
//     secondary: {
//       main: "#333", // Change the secondary color
//     },
//   },
//   typography: {
//     fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
//     h1: {
//       fontSize: "2.5rem",
//       fontWeight: 700,
//     },
//     h2: {
//       fontSize: "2rem",
//       fontWeight: 600,
//     },
//   },
// });

const theme = createTheme({
  palette: {
    primary: {
      main: "#0eb6ab", // A calming blue for the primary color, often associated with healthcare
      light: "#B3D7E1", // A lighter shade for backgrounds or accents
    },
    secondary: {
      main: "#FFFFFF", // A clean white for secondary elements, enhancing readability
    },
    error: {
      main: "#E57373", // A soft red for error messages, which is important in medical contexts
    },
    background: {
      default: "#F5F5F5", // Light gray background to keep it easy on the eyes
      paper: "#FFFFFF", // White background for cards or sections
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontSize: "2.5rem",
      fontWeight: 700,
      color: "#333333", // Darker color for headings for better contrast
    },
    h2: {
      fontSize: "2rem",
      fontWeight: 600,
      color: "#4A90E2", // Use the primary color for subheadings
    },
    body1: {
      fontSize: "1rem", // Default body text size
      color: "#555555", // Dark gray for body text for better readability
    },
    button: {
      textTransform: "none", // Avoid uppercase transformation for a more approachable look
      fontWeight: 600,
      fontSize: "1rem",
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: "8px", // Softer button edges
          padding: "10px 20px", // Generous padding for a better touch target
        },
        contained: {
          // Styles for contained variant
          backgroundColor: "#008080", // Primary color for contained
          color: "#FFFFFF", // Text color
          '&:hover': {
            backgroundColor: '#008080', // Change hover background to a lighter shade of the primary color
            color: '#FFFFFF', // Optional: change text color on hover
          },
        },
        outlined: {
          // Styles for outlined variant
          border: `2px solid #008080`, // Outline color
          color: "#008080", // Text color
          '&:hover': {
            backgroundColor: '#B2E0E0', // Lighter shade for hover
            color: '#FFFFFF', // Change text color on hover
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: "12px", // Rounded corners for a softer appearance
          boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)", // Subtle shadow for depth
        },
      },
    },
  },
});


root.render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        {/* <BrowserRouter> */}
        <App />
        {/* </BrowserRouter> */}
      </ThemeProvider>
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
