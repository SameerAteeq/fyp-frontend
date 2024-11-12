// import React from "react";
// import { Box } from "@mui/material";

// import Navbar from "./components/Navbar";
// import Sidenav from "./components/Sidenav";

// export default function AdminLayout({ children }) {
//   return (
//     <>
//       <Navbar />
//       {/* <Box sx={{ display: "flex", flexWrap: "wrap" }}> */}
//       <Sidenav />
//       {children}
//       {/* </Box> */}
//     </>
//   );
// }

import React from "react";
import { Box, useMediaQuery } from "@mui/material";
import Navbar from "./components/Navbar";
import Sidenav from "./components/Sidenav";

export default function AdminLayout({ children }) {
  // Detect screen width less than 767px
  const isSmallScreen = useMediaQuery("(max-width: 992px)");
  return (
    <>
      {/* Navbar at the top */}
      <Navbar />

      {/* Flexbox container for Sidenav and Children */}
      <Box
        sx={{
          display: "flex",
          minHeight: "100vh",
          position: "relative",
        }}
      >
        {/* Sidenav fixed to the left */}
        <Sidenav />

        {/* Main content area, comes after Sidenav */}
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: 3,
            pt: "80px",
            ...(isSmallScreen && {
              pl: "90px",
            }),
          }}
        >
          {children}
        </Box>
      </Box>
    </>
  );
}
