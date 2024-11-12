// import React from 'react'

// const Footer = () => {
//   return (
//     <>
//  <div className=''>

//     <footer className="bd-footer py-5 mt-5 bg-light">
//       <div className="container py-5">
//         <div className="row">
//           <div className="col-lg-3 mb-3">
//             <a className="d-inline-flex align-items-center mb-2 link-dark text-decoration-none" href="/" aria-label="Helping Hands">
//               <img src="./images/main-logo.png" width={40} height={32} className="d-block me-2" viewBox="0 0 118 94" role="img" />
//               <span className="fs-5">Helping Hands</span>
//             </a>
//             <ul className="list-unstyled small text-muted">
//               <li className="mb-2">Empowering access to unused medicines for those in need, our project aims to bridge the gap between surplus medications and individuals facing healthcare challenges, ensuring a healthier future for all.</li>
//             </ul>
//           </div>
//           <div className="col-6 col-lg-3 offset-lg-1 mb-3">
//             <h5>Quick Links</h5>
//             <ul className="list-unstyled">
//               <li className="mb-2"><a href="/">Home</a></li>
//               <li className="mb-2"><a href="/medicines">Medicines</a></li>
//               <li className="mb-2"><a href="/about">About Us</a></li>
//               <li className="mb-2"><a href="/contact">Contact</a></li>
//             </ul>
//           </div>
//           <div className="col-6 col-lg-3 mb-3">
//             <h5>Contact Us</h5>
//             <ul className="list-unstyled">
//               <li className="mb-2">Email: contact@Helping Hands.com</li>
//               <li className="mb-2">Phone: +123-456-7890</li>
//               <li className="mb-2">Address: Karachi,Pakistan</li>
//             </ul>
//           </div>
//           <div className="col-6 col-lg-2 mb-3">
//             <h5>Follow Us</h5>
//             <ul className="list-unstyled">
//               <li className="mb-2"><a href="https://facebook.com/Helping Hands" target="_blank" rel="noopener noreferrer">Facebook</a></li>
//               <li className="mb-2"><a href="https://twitter.com/Helping Hands" target="_blank" rel="noopener noreferrer">Twitter</a></li>
//               <li className="mb-2"><a href="https://instagram.com/Helping Hands" target="_blank" rel="noopener noreferrer">Instagram</a></li>
//             </ul>
//           </div>
//         </div>
//       </div>

//       <div className="my-5 pt-3 text-muted text-center text-small">
//         <p className="mb-1">&copy; 2023 Helping Hands</p>
//         <ul className="list-inline">
//           <li className="list-inline-item"><a href="/">Privacy Policy</a></li>
//           <li className="list-inline-item"><a href="/">Terms & Conditions</a></li>
//           <li className="list-inline-item"><a href="/">Support</a></li>
//         </ul>
//       </div>
//     </footer>

//  </div>

//     </>

//   )
// }

// export default Footer

// Footer.js
import React from "react";
import {
  Box,
  Container,
  Grid,
  Typography,
  Link,
  IconButton,
  Paper,
  Divider,
  styled,
} from "@mui/material";
import {
  Facebook as FacebookIcon,
  Twitter as TwitterIcon,
  Instagram as InstagramIcon,
} from "@mui/icons-material";

import MyLogo from "../assets/images/main-logo.png";

// Styled components
const StyledFooter = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  padding: theme.spacing(5),
  marginTop: theme.spacing(5),
  borderRadius: 0,
  boxShadow: theme.shadows[3],
}));

const Footer = () => {
  return (
    <StyledFooter elevation={0}>
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <Link
              href="/"
              underline="none"
              color="inherit"
              aria-label="Helping Hands"
              display="flex"
              alignItems="center"
            >
              <img
                src={MyLogo}
                alt="Helping Hands Logo"
                width={40}
                height={32}
              />
              <Typography variant="h6" sx={{ ml: 1 }}>
                Helping Hands
              </Typography>
            </Link>
            <Typography variant="body2" color="textSecondary" sx={{ mt: 2 }}>
              Empowering access to unused medicines for those in need, our
              project aims to bridge the gap between surplus medications and
              individuals facing healthcare challenges, ensuring a healthier
              future for all.
            </Typography>
          </Grid>

          <Grid item xs={12} md={4}>
            <Typography variant="h6">Quick Links</Typography>
            <Divider sx={{ my: 1 }} />
            <Grid container spacing={1}>
              <Grid item xs={6}>
                <Link href="/" color="inherit" underline="hover">
                  Home
                </Link>
              </Grid>
              <Grid item xs={6}>
                <Link href="/medicines" color="inherit" underline="hover">
                  Medicines
                </Link>
              </Grid>
              <Grid item xs={6}>
                <Link href="/about" color="inherit" underline="hover">
                  About Us
                </Link>
              </Grid>
              <Grid item xs={6}>
                <Link href="/contact" color="inherit" underline="hover">
                  Contact
                </Link>
              </Grid>
            </Grid>
          </Grid>

          <Grid item xs={12} md={4}>
            <Typography variant="h6">Contact Us</Typography>
            <Divider sx={{ my: 1 }} />
            <Typography variant="body2">
              Email: contact@Helping Hands.com
            </Typography>
            <Typography variant="body2">Phone: +123-456-7890</Typography>
            <Typography variant="body2">Address: Karachi, Pakistan</Typography>
          </Grid>

          <Grid item xs={12}>
            <Typography variant="h6">Follow Us</Typography>
            <Divider sx={{ my: 1 }} />
            <Box>
              <IconButton
                component={Link}
                href="https://facebook.com/Helping Hands"
                target="_blank"
                rel="noopener noreferrer"
                color="inherit"
              >
                <FacebookIcon />
              </IconButton>
              <IconButton
                component={Link}
                href="https://twitter.com/Helping Hands"
                target="_blank"
                rel="noopener noreferrer"
                color="inherit"
              >
                <TwitterIcon />
              </IconButton>
              <IconButton
                component={Link}
                href="https://instagram.com/Helping Hands"
                target="_blank"
                rel="noopener noreferrer"
                color="inherit"
              >
                <InstagramIcon />
              </IconButton>
            </Box>
          </Grid>
        </Grid>

        <Divider sx={{ my: 5 }} />

        <Box textAlign="center" color="textSecondary">
          <Typography variant="body2">&copy; 2023 Helping Hands</Typography>
          <Box>
            <Link href="/" color="inherit" underline="hover" sx={{ mx: 1 }}>
              Privacy Policy
            </Link>
            <Link href="/" color="inherit" underline="hover" sx={{ mx: 1 }}>
              Terms & Conditions
            </Link>
            <Link href="/" color="inherit" underline="hover" sx={{ mx: 1 }}>
              Support
            </Link>
          </Box>
        </Box>
      </Container>
    </StyledFooter>
  );
};

export default Footer;
