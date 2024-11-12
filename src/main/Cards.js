// import React from "react";

// const Cards = ({ role = null }) => {
//   return (
//     <div className="mx-5 my-5">
//       <h1 className="text-center mb-5">FOR OUR COMMUNITY</h1>

//       <div className="row mb-2">
//         <div className="col-md-6">
//           <div className="row g-0 border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 h-100 position-relative">
//             <div className="col p-4 d-flex flex-column position-static">
//               {/* <strong className="d-inline-block mb-2 text-primary">World</strong> */}
//               <h3 className="mb-2">Donate Medicines</h3>
//               {/* <div className="mb-1 text-muted">Nov 12</div> */}
//               <p className="card-text ">
//                 Donate now and make a difference on our medicine donation
//                 website. Your unused medicines can bring relief and support to
//                 those in need. Join us in our mission to improve healthcare
//                 accessibility and donate today. Donate today and be a catalyst
//                 for positive change in healthcare. Your contribution, no matter
//                 how small, can make a significant impact on lives across
//                 Pakistan.{" "}
//               </p>
//               {role == "Donor" && (
//                 <a href="/medicines" className="btn btn-lg btn-outline-success">
//                   Go to Donate
//                 </a>
//               )}
//             </div>

//             <div className="col-auto d-none d-lg-block">
//               <img
//                 className="bd-placeholder-img"
//                 width={200}
//                 height={250}
//                 src="./medine/donate2.jpeg"
//                 alt=""
//               />
//             </div>
//           </div>
//         </div>

//         {/* <div className="row mb-2"> */}
//         <div className="col-md-6">
//           <div className="row g-0 border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 h-100 position-relative">
//             <div className="col p-4 d-flex flex-column position-static">
//               {/* <strong className="d-inline-block mb-2 text-primary">World</strong> */}
//               <h3 className="mb-2">Collect Medicine</h3>
//               {/* <div className="mb-1 text-muted">Nov 12</div> */}
//               <p className="card-text">
//                 Retrieve the necessary medications hassle-free using our
//                 platform. We ensure access to donated medications for empowering
//                 your healthcare journey. Browse available medicines, request,
//                 and enjoy a streamlined collection process. We offer cost-free
//                 medicines to alleviate your financial burdens. Rest assured, our
//                 medications undergo meticulous verification for safety and
//                 effectiveness.
//               </p>
//               {/* <a href="#" className="btn btn-primary">Get your Medicine</a> */}
//               {/* <a href="/medicines" className="btn btn-lg btn-outline-success">
//                 Get your Medicine
//               </a> */}
//               {role == "Recipient" && (
//                 <a href="/medicines" className="btn btn-lg btn-outline-success">
//                   Get Medicine
//                 </a>
//               )}
//               {/* {isLoggedIn=='receipient' ?(
//                  <a href="/medicines" className="btn btn-lg btn-outline-success">Get your Medicine</a>
//              ):(<></>)
//               } */}
//             </div>
//             <div className="col-auto d-none d-lg-block">
//               <img
//                 className="bd-placeholder-img"
//                 width={200}
//                 height={250}
//                 src="./medine/deserving.jpg"
//                 alt=""
//               />
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* </div> */}
//     </div>
//   );
// };

// Cards.js
import React from "react";
import {
  Box,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Button,
  useTheme,
  useMediaQuery,
  styled,
  Fade,
} from "@mui/material";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

// Styled Components
const StyledCard = styled(Card)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  transition: "transform 0.3s, box-shadow 0.3s",
  height: "100%",
  "&:hover": {
    transform: "translateY(-10px)",
    boxShadow: theme.shadows[6],
  },
}));

const AnimatedButton = styled(Button)(({ theme }) => ({
  marginTop: theme.spacing(2),
  transition: "background-color 0.3s, transform 0.3s",
  "&:hover": {
    color: theme.palette.primary.light,
    backgroundColor: theme.palette.secondary.main,
    transform: "scale(1.05)",
  },
}));

const Cards = ({ role = null }) => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));

  // Animation variants for Framer Motion
  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.2 },
    }),
  };

  // Card Data
  const cardData = [
    {
      title: "Donate Medicines",
      description:
        "Donate now and make a difference on our medicine donation website. Your unused medicines can bring relief and support to those in need. Join us in our mission to improve healthcare accessibility and donate today. Donate today and be a catalyst for positive change in healthcare. Your contribution, no matter how small, can make a significant impact on lives across Pakistan.",
      image: "/medine/donate2.jpeg",
      buttonText: "Go to Donate",
      buttonLink: "/medicines",
      role: "Donor",
    },
    {
      title: "Collect Medicine",
      description:
        "Retrieve the necessary medications hassle-free using our platform. We ensure access to donated medications for empowering your healthcare journey. Browse available medicines, request, and enjoy a streamlined collection process. We offer cost-free medicines to alleviate your financial burdens. Rest assured, our medications undergo meticulous verification for safety and effectiveness.",
      image: "/medine/deserving.jpg",
      buttonText: "Get Medicine",
      buttonLink: "/medicines",
      role: "Recipient",
    },
  ];

  return (
    <Box sx={{ py: 5, px: { xs: 2, md: 5 }, backgroundColor: "#f5f5f5" }}>
      <Typography
        variant="h4"
        align="center"
        gutterBottom
        sx={{ fontWeight: "bold", mb: 4 }}
      >
        FOR OUR COMMUNITY
      </Typography>

      <Grid container spacing={4}>
        {cardData.map((card, index) => {
          // Determine if the card should be displayed based on the role
          if (role && card.role !== role) {
            return null;
          }

          return (
            <Grid
              item
              xs={12}
              md={6}
              key={index}
              component={motion.div}
              custom={index}
              initial="hidden"
              animate="visible"
              variants={cardVariants}
            >
              <StyledCard elevation={3}>
                {/* Image */}
                <CardMedia
                  component="img"
                  height="250"
                  image={card.image}
                  alt={card.title}
                  sx={{
                    objectFit: "cover",
                  }}
                />

                {/* Content */}
                <CardContent>
                  <Typography
                    variant="h5"
                    component="div"
                    gutterBottom
                    sx={{ fontWeight: "bold" }}
                  >
                    {card.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {card.description}
                  </Typography>
                  {/* Conditional Button */}
                  {role === card.role && (
                    <AnimatedButton
                      variant="contained"
                      color="primary"
                      component={Link}
                      to={card.buttonLink}
                    >
                      {card.buttonText}
                    </AnimatedButton>
                  )}
                </CardContent>
              </StyledCard>
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
};

export default Cards;
