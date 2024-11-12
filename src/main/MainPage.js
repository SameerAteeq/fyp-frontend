// import React from "react";
// import { useSelector } from "react-redux";

// import Navbar from "./Navbar";
// import Header from "./Header";
// import Cards from "./Cards";
// import Carousel from "./Carousel";
// import Footer from "./Footer";
// const MainPage = () => {
//   const user = useSelector((state) => state.storeReducer.user);
//   return (
//     <div>
//       <Navbar title="Helping Hands" />
//       <Header />
//       <Cards role={user?.role} />
//       <Carousel />
//       <Footer />
//     </div>
//   );
// };

// export default MainPage;

// MainPage.js
// import React from "react";
// import { useSelector } from "react-redux";
// import { Box, Typography, Container } from "@mui/material";

// import Navbar from "./Navbar";
// import Header from "./Header";
// import Cards from "./Cards";
// import Carousel from "./Carousel";
// import Footer from "./Footer";

// const MainPage = () => {
//   const user = useSelector((state) => state.storeReducer.user);

//   return (
//     <Box sx={{ backgroundColor: "#f4f4f4", minHeight: "100vh" }}>
//       <Navbar title="Helping Hands" />
//       <Header />
//       <Container maxWidth="lg">
//         {/* Cards Section */}
//         <Box sx={{ mb: 4 }}>
//           <Cards role={user?.role} />
//         </Box>

//         {/* Carousel Section */}
//         <Box sx={{ mb: 4 }}>
//           <Carousel />
//         </Box>
//       </Container>
//       <Footer />
//     </Box>
//   );
// };

// export default MainPage;

import React, { useRef } from "react";
import { useSelector } from "react-redux";
import { Box, Container } from "@mui/material";
import { motion, useInView } from "framer-motion";

import Navbar from "./Navbar";
import Header from "./Header";
import Cards from "./Cards";
import Carousel from "./Carousel";
import Footer from "./Footer";

const MainPage = () => {
  const user = useSelector((state) => state.storeReducer.user);
  const cardsRef = useRef(null);
  const isInView = useInView(cardsRef, { once: true, margin: "-50px" });

  // Define animation variants for Cards section
  const cardsVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <Box sx={{ backgroundColor: "#f4f4f4", minHeight: "100vh" }}>
      <Navbar title="Helping Hands" />
      <Header />
      <Container maxWidth="lg">
        {/* Cards Section with Scroll Animation */}
        <Box
          ref={cardsRef}
          component={motion.div}
          sx={{ mb: 4 }}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={cardsVariants}
          transition={{ duration: 0.6, ease: "easeIn" }}
        >
          <Cards role={user?.role} />
        </Box>

        {/* Carousel Section */}
        <Box sx={{ mb: 4 }}>
          <Carousel />
        </Box>
      </Container>
      <Footer />
    </Box>
  );
};

export default MainPage;
