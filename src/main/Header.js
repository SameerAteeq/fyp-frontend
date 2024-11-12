// import React from "react";
// import PropTypes from 'prop-types'
// import { Link } from "react-router-dom";

// export default function Header(props) {
//   let imgStyle = {
//     height: "600px",
//     width: "100%",
//   };
//   let TextSize = {
//     fontSize: '20px'
//   }
//   let Text = {
//     fontSize: '25px'
//   }
//   let BacContent = {
//     backgroundImage: 'url(./medine/header2.png)',
// 	  backgroundRepeat: 'no-repeat',
//     backgroundPosition: 'center',
//     backgroundSize: 'cover',
//     height: '600px',
//     width: '100%',
//     paddingTop: '200px',
// 	  paddingBottom:' 100px',
// 	  textAlign: 'center',
//     color: 'white',
//     paddingRight: '50px',
//     paddingLeft: '50px',
//   }
//   return (
//     <div>

//    <div className="content" style={BacContent}>
//       {/* <img src="./medine/medicine10.jpg" class="img-fluid" alt="..." style={{height: '600px', width: '100%'}}/> */}
//       <h1>Donate Your Unused Medicines And Change Lives</h1>
//       {/* <p>Sharing health, spreading hope</p> */}
//       <p style={{fontSize: '1.5rem'}}>Bridge the gap, save a life</p>
//       {/* <p>From your cabinet to someone's cure</p> */}
//       </div>

//     </div>
//   );
// }

// Header.propTypes = {
//   title: PropTypes.string.isRequired,
//   about: PropTypes.string.isRequired
// }

// Header.defaultProps = {
//   title: 'Set Your Title Here',
//   about: 'About'
// }
// Header.js
// import React from "react";
// import PropTypes from "prop-types";
// import { Button, Box, Typography, styled } from "@mui/material";

// // Styled components
// const BannerContainer = styled(Box)(({ theme }) => ({
//   backgroundImage: "url(./medine/header2.png)",
//   backgroundRepeat: "no-repeat",
//   backgroundPosition: "center",
//   backgroundSize: "cover",
//   height: "600px",
//   display: "flex",
//   flexDirection: "column",
//   justifyContent: "center",
//   alignItems: "center",
//   color: "white",
//   position: "relative",
//   overflow: "hidden",
//   textAlign: "center",
//   padding: "0 50px",
//   [theme.breakpoints.down("sm")]: {
//     padding: "0 20px",
//   },
// }));

// const Overlay = styled(Box)(({ theme }) => ({
//   position: "absolute",
//   top: 0,
//   left: 0,
//   right: 0,
//   bottom: 0,
//   backgroundColor: "rgba(0, 0, 0, 0.5)", // Dark overlay
//   zIndex: 1,
// }));

// const AnimatedText = styled(Typography)(({ theme }) => ({
//   fontSize: "2.5rem",
//   animation: "fadeIn 2s ease-in-out",
//   "@keyframes fadeIn": {
//     "0%": { opacity: 0 },
//     "100%": { opacity: 1 },
//   },
// }));

// const Header = (props) => {
//   return (
//     <BannerContainer>
//       <Overlay />
//       <AnimatedText variant="h1" gutterBottom zIndex={2}>
//         Donate Your Unused Medicines And Change Lives
//       </AnimatedText>
//       <Typography
//         variant="h5"
//         gutterBottom
//         sx={{
//           fontSize: "1.5rem",
//           animation: "fadeIn 2s ease-in-out 0.5s",
//           zIndex: 2,
//         }}
//       >
//         Bridge the gap, save a life
//       </Typography>
//     </BannerContainer>
//   );
// };

// Header.propTypes = {
//   title: PropTypes.string.isRequired,
//   about: PropTypes.string.isRequired,
// };

// Header.defaultProps = {
//   title: "Set Your Title Here",
//   about: "About",
// };

// export default Header;


import React from "react";
import PropTypes from "prop-types";
import { Button, Box, Typography, styled } from "@mui/material";

// Styled components
const BannerContainer = styled(Box)(({ theme }) => ({
  backgroundImage: "url(./medine/header2.png)",
  backgroundRepeat: "no-repeat",
  backgroundPosition: "center",
  backgroundSize: "cover",
  height: "600px",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  color: "white",
  position: "relative",
  overflow: "hidden",
  textAlign: "center",
  padding: "0 50px",
  [theme.breakpoints.down("sm")]: {
    padding: "0 20px",
  },
}));

const Overlay = styled(Box)(({ theme }) => ({
  position: "absolute",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: "rgba(0, 0, 0, 0.2)", // Dark overlay
  zIndex: 1,
}));

const AnimatedText = styled(Typography)(({ theme }) => ({
  fontSize: "2.5rem",
  animation: "fadeIn 2s ease-in-out",
  "@keyframes fadeIn": {
    "0%": { opacity: 0 },
    "100%": { opacity: 1 },
  },
}));

// Blob Shape SVG
const BlobShape = styled("svg")({
  position: "absolute",
  bottom: "0",
  left: 0,
  right: 0,
  width: "100%",
  height: "auto", // Reduced height for the blob
  zIndex: 1,
});

const Header = (props) => {
  return (
    <BannerContainer>
      <Overlay />
      <AnimatedText variant="h1" gutterBottom zIndex={2}>
        Donate Your Unused Medicines And Change Lives
      </AnimatedText>
      <Typography
        variant="h5"
        gutterBottom
        sx={{
          fontSize: "1.5rem",
          animation: "fadeIn 2s ease-in-out 0.5s",
          zIndex: 2,
        }}
      >
        Bridge the gap, save a life
      </Typography>

      {/* Blob Shape */}
      {/* <BlobShape xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
        <path
          fill="#f4f4f4" // Adjust color if needed
          fillOpacity="1"
          d="M0,256L48,229.3C96,203,192,149,288,149.3C384,149,480,203,576,208C672,213,768,171,864,138.7C960,107,1056,85,1152,117.3C1248,149,1344,235,1392,277.3L1440,320L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
        ></path>
      </BlobShape> */}
    </BannerContainer>
  );
};

Header.propTypes = {
  title: PropTypes.string.isRequired,
  about: PropTypes.string.isRequired,
};

Header.defaultProps = {
  title: "Set Your Title Here",
  about: "About",
};

export default Header;
