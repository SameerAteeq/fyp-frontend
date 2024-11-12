// import * as React from "react";
// import AppBar from "@mui/material/AppBar";
// import Toolbar from "@mui/material/Toolbar";
// import Typography from "@mui/material/Typography";
// import Container from "@mui/material/Container";
// import Button from "@mui/material/Button";
// import MyLogo from "../assets/images/main-logo.png";

// import { Link } from "react-router-dom";
// import { useNavigate } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import { setUser } from "../store/reducer";

// function ResponsiveAppBar() {
//   const user = useSelector((state) => state.storeReducer.user);
//   const navigate = useNavigate();
//   const dispatch = useDispatch();

//   const handleLogout = () => {
//     // Clear token from localStorage and update isLoggedIn state
//     localStorage.removeItem("token");
//     dispatch(setUser(null));
//     navigate("/");
//   };

//   const decodeToken = (token) => {
//     try {
//       const base64Url = token.split(".")[1];
//       const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
//       const decodedData = JSON.parse(atob(base64));
//       console.log("dec", decodedData);
//       return decodedData;
//     } catch (error) {
//       console.error("Error decoding token:", error);
//       return null;
//     }
//   };

//   return (
//     <AppBar
//       position="static"
//       sx={{ backgroundColor: "#58869e", color: "white" }}
//     >
//       <Container maxWidth="xl">
//         <Toolbar
//           disableGutters
//           sx={{ display: "flex", justifyContent: "space-between" }}
//         >
//           <div style={{ display: "flex", alignItems: "center" }}>
//             {/* <Avatar alt="Remy Sharp" src={MyLogo}  sx={{ display: { xs: 'none', md: 'flex' }, mr: 1,width:90,height:50 }} /> */}
//             <img src={MyLogo} width="100px" height="60px" />
//             <Typography
//               variant="h6"
//               noWrap
//               component={Link}
//               to="/"
//               sx={{
//                 mr: 5,
//                 display: { xs: "none", md: "flex" },
//                 fontFamily: "monospace",
//                 fontWeight: 700,
//                 color: "white",
//                 textDecoration: "none",
//                 "&:hover": {
//                   color: "white",
//                   textDecoration: "none",
//                 },
//               }}
//             >
//               Helping Hands
//             </Typography>

//             <Button component={Link} to="/">
//               <Typography color="white">Home</Typography>
//             </Button>

//             <Button component={Link} to="/about">
//               <Typography color="white">About</Typography>
//             </Button>

//             <Button component={Link} to="/medicines">
//               <Typography color="white">Medicines</Typography>
//             </Button>

//             <Button component={Link} to="/contact">
//               <Typography color="white">Contact Us</Typography>
//             </Button>

//             <Button component={Link} to="/blog">
//               <Typography color="white">Blogs</Typography>
//             </Button>
//           </div>

//           <div>
//             {user ? (
//               <Button
//                 onClick={handleLogout}
//                 color="inherit"
//                 sx={{
//                   "&:hover": {
//                     color: "white",
//                     textDecoration: "none",
//                   },
//                 }}
//               >
//                 Logout
//               </Button>
//             ) : (
//               <>
//                 <Button
//                   component={Link}
//                   to="/sign-in"
//                   color="inherit"
//                   sx={{
//                     "&:hover": {
//                       color: "white",
//                       textDecoration: "none",
//                     },
//                   }}
//                 >
//                   Login
//                 </Button>
//                 <Button
//                   component={Link}
//                   to="/sign-up"
//                   color="inherit"
//                   sx={{
//                     "&:hover": {
//                       color: "white",
//                       textDecoration: "none",
//                     },
//                   }}
//                 >
//                   Sign Up
//                 </Button>
//               </>
//             )}
//           </div>
//         </Toolbar>
//       </Container>
//     </AppBar>
//   );
// }
// export default ResponsiveAppBar;

// import * as React from "react";
// import AppBar from "@mui/material/AppBar";
// import Toolbar from "@mui/material/Toolbar";
// import Typography from "@mui/material/Typography";
// import Container from "@mui/material/Container";
// import Button from "@mui/material/Button";
// import IconButton from "@mui/material/IconButton";
// import MenuIcon from "@mui/icons-material/Menu";
// import Drawer from "@mui/material/Drawer";
// import List from "@mui/material/List";
// import ListItem from "@mui/material/ListItem";
// import ListItemText from "@mui/material/ListItemText";
// import Divider from "@mui/material/Divider";
// import MyLogo from "../assets/images/main-logo.png";
// import { Link } from "react-router-dom";
// import { useNavigate } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import { setUser } from "../store/reducer";

// function ResponsiveAppBar() {
//   const user = useSelector((state) => state.storeReducer.user);
//   const navigate = useNavigate();
//   const dispatch = useDispatch();

//   const [mobileOpen, setMobileOpen] = React.useState(false);

//   const handleDrawerToggle = () => {
//     setMobileOpen(!mobileOpen);
//   };

//   const handleLogout = () => {
//     // Clear token from localStorage and update isLoggedIn state
//     localStorage.removeItem("token");
//     localStorage.removeItem("@role");
//     dispatch(setUser(null));
//     navigate("/");
//   };

//   const drawer = (
//     <div style={{ width: "250px" }}>
//       <div
//         style={{
//           display: "flex",
//           justifyContent: "center",
//           margin: "10px 0 0",
//         }}
//       >
//         <img src={MyLogo} alt="Helping Hands Logo" width="200px" height="120px" />
//       </div>
//       <List>
//         <ListItem button component={Link} to="/" onClick={handleDrawerToggle}>
//           <ListItemText primary="Home" />
//         </ListItem>
//         <ListItem
//           button
//           component={Link}
//           to="/about"
//           onClick={handleDrawerToggle}
//         >
//           <ListItemText primary="About" />
//         </ListItem>
//         <ListItem
//           button
//           component={Link}
//           to="/medicines"
//           onClick={handleDrawerToggle}
//         >
//           <ListItemText primary="Medicines" />
//         </ListItem>
//         <ListItem
//           button
//           component={Link}
//           to="/contact"
//           onClick={handleDrawerToggle}
//         >
//           <ListItemText primary="Contact Us" />
//         </ListItem>
//         <ListItem
//           button
//           component={Link}
//           to="/blog"
//           onClick={handleDrawerToggle}
//         >
//           <ListItemText primary="Blogs" />
//         </ListItem>
//         <Divider />
//         {user ? (
//           <ListItem button onClick={handleLogout}>
//             <ListItemText primary="Logout" />
//           </ListItem>
//         ) : (
//           <>
//             <ListItem
//               button
//               component={Link}
//               to="/sign-in"
//               onClick={handleDrawerToggle}
//             >
//               <ListItemText primary="Login" />
//             </ListItem>
//             <ListItem
//               button
//               component={Link}
//               to="/sign-up"
//               onClick={handleDrawerToggle}
//             >
//               <ListItemText primary="Sign Up" />
//             </ListItem>
//           </>
//         )}
//       </List>
//     </div>
//   );

//   return (
//     <AppBar position="static" sx={{ color: "white" }}>
//       <Container maxWidth="xl">
//         <Toolbar
//           disableGutters
//           sx={{ display: "flex", justifyContent: "space-between" }}
//         >
//           {/* Logo and left-aligned menu items */}
//           <div style={{ display: "flex", alignItems: "center" }}>
//             <img
//               src={MyLogo}
//               alt="Helping Hands Logo"
//               width="100px"
//               height="60px"
//             />
//             <Typography
//               variant="h6"
//               noWrap
//               component={Link}
//               to="/"
//               sx={{
//                 ml: 2,
//                 display: { xs: "none", md: "block" },
//                 fontFamily: "monospace",
//                 fontWeight: 700,
//                 color: "white",
//                 textDecoration: "none",
//                 "&:hover": {
//                   color: "white",
//                 },
//               }}
//             >
//               Helping Hands
//             </Typography>
//             <Button
//               component={Link}
//               to="/"
//               sx={{
//                 color: "white",
//                 ml: 2,
//                 display: {
//                   xs: "none",
//                   md: "inline-block",
//                   "&:hover": {
//                     color: "white",
//                   },
//                 },
//               }}
//             >
//               Home
//             </Button>
//             <Button
//               component={Link}
//               to="/about"
//               sx={{
//                 color: "white",
//                 display: {
//                   xs: "none",
//                   md: "inline-block",
//                   "&:hover": {
//                     color: "white",
//                   },
//                 },
//               }}
//             >
//               About
//             </Button>
//             <Button
//               component={Link}
//               to="/medicines"
//               sx={{
//                 color: "white",
//                 display: {
//                   xs: "none",
//                   md: "inline-block",
//                   "&:hover": {
//                     color: "white",
//                   },
//                 },
//               }}
//             >
//               Medicines
//             </Button>
//             <Button
//               component={Link}
//               to="/contact"
//               sx={{
//                 color: "white",
//                 display: {
//                   xs: "none",
//                   md: "inline-block",
//                   "&:hover": {
//                     color: "white",
//                   },
//                 },
//               }}
//             >
//               Contact Us
//             </Button>
//             <Button
//               component={Link}
//               to="/blog"
//               sx={{
//                 color: "white",
//                 display: {
//                   xs: "none",
//                   md: "inline-block",
//                   "&:hover": {
//                     color: "white",
//                   },
//                 },
//               }}
//             >
//               Blogs
//             </Button>
//           </div>

//           {/* Right-aligned login/logout buttons */}
//           <div>
//             {user ? (
//               <Button
//                 onClick={handleLogout}
//                 sx={{
//                   color: "white",
//                   display: {
//                     xs: "none",
//                     md: "inline-block",
//                     "&:hover": {
//                       color: "white",
//                     },
//                   },
//                 }}
//               >
//                 Logout
//               </Button>
//             ) : (
//               <>
//                 <Button
//                   component={Link}
//                   to="/sign-in"
//                   sx={{
//                     color: "white",
//                     display: {
//                       xs: "none",
//                       md: "inline-block",
//                       "&:hover": {
//                         color: "white",
//                       },
//                     },
//                   }}
//                 >
//                   Login
//                 </Button>
//                 <Button
//                   component={Link}
//                   to="/sign-up"
//                   sx={{
//                     color: "white",
//                     display: {
//                       xs: "none",
//                       md: "inline-block",
//                       "&:hover": {
//                         color: "white",
//                       },
//                     },
//                   }}
//                 >
//                   Sign Up
//                 </Button>
//               </>
//             )}
//           </div>

//           {/* Mobile Menu */}
//           <IconButton
//             color="inherit"
//             aria-label="open drawer"
//             edge="start"
//             onClick={handleDrawerToggle}
//             sx={{ display: { md: "none" } }}
//           >
//             <MenuIcon />
//           </IconButton>

//           {/* Mobile Drawer */}
//           <Drawer
//             anchor="left"
//             open={mobileOpen}
//             onClose={handleDrawerToggle}
//             ModalProps={{ keepMounted: true }}
//             PaperProps={{ sx: { width: 250 } }} // Set drawer width to 400px
//           >
//             {drawer}
//           </Drawer>
//         </Toolbar>
//       </Container>
//     </AppBar>
//   );
// }

// export default ResponsiveAppBar;

// ResponsiveAppBar.js
import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Container,
  Button,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Divider,
  Box,
  useScrollTrigger,
  Slide,
  styled,
  Stack,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
// import HomeIcon from '@mui/icons-material/Home';
// import CallIcon from '@mui/icons-material/Call';
// import MedicationIcon from '@mui/icons-material/Medication';
// import InfoIcon from '@mui/icons-material/Info';
// import CommentIcon from '@mui/icons-material/Comment';
import { Home, Call, Medication, Info, Comment } from "@mui/icons-material";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../store/reducer";
import MyLogo from "../assets/images/main-logo.png";

// Hide AppBar on scroll (optional)
function HideOnScroll(props) {
  const { children } = props;
  const trigger = useScrollTrigger();

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
}

// Styled Components
const Offset = styled("div")(({ theme }) => theme.mixins.toolbar);

const StyledLink = styled(Link)(({ theme, active }) => ({
  textDecoration: "none",
  color: active ? theme.palette.secondary.main : "white",
  fontWeight: active ? 700 : 500,
  "&:hover": {
    color: theme.palette.secondary.main,
  },
  position: "relative",
  "&:after": {
    content: '""',
    position: "absolute",
    width: active ? "100%" : "0",
    height: "2px",
    bottom: "-4px",
    left: "0",
    backgroundColor: theme.palette.secondary.main,
    transition: "width 0.3s",
  },
  "&:hover:after": {
    width: "100%",
  },
}));

const DrawerLink = styled(Link)(({ theme }) => ({
  textDecoration: "none",
  color: theme.palette.text.primary,
}));

function ResponsiveAppBar() {
  const user = useSelector((state) => state.storeReducer.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleLogout = () => {
    // Clear token from localStorage and update user state
    localStorage.removeItem("token");
    localStorage.removeItem("@role");
    dispatch(setUser(null));
    navigate("/");
  };

  // const navItems = [
  //   { text: "Home", path: "/" },
  //   { text: "About", path: "/about" },
  //   { text: "Medicines", path: "/medicines" },
  //   { text: "Contact Us", path: "/contact" },
  //   { text: "Blogs", path: "/blog" },
  // ];

  const navItems = [
    {
      text: "Home",
      path: "/",
      icon: <Home sx={{ color: "secondary.main" }} />,
    },
    {
      text: "About",
      path: "/about",
      icon: <Info sx={{ color: "secondary.main" }} />,
    },
    {
      text: "Medicines",
      path: "/medicines",
      icon: <Medication sx={{ color: "secondary.main" }} />,
    },
    {
      text: "Contact Us",
      path: "/contact",
      icon: <Call sx={{ color: "secondary.main" }} />,
    },
    {
      text: "Blogs",
      path: "/blog",
      icon: <Comment sx={{ color: "secondary.main" }} />,
    },
  ];
  const drawer = (
    <Box
      onClick={handleDrawerToggle}
      sx={{ textAlign: "center" }}
      role="presentation"
    >
      <Box sx={{ display: "flex", justifyContent: "center", p: 2 }}>
        <img src={MyLogo} alt="Helping Hands Logo" width="150px" />
      </Box>

      <Divider />
      <List>
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <ListItem key={item.text} disablePadding>
              <ListItemButton
                sx={{
                  textAlign: "center",
                  backgroundColor: isActive ? "action.selected" : "inherit",
                }}
                component={Link}
                to={item.path}
              >
                <ListItemText primary={item.text} />
              </ListItemButton>
            </ListItem>
          );
        })}
        <Divider />
        {user ? (
          <ListItem disablePadding>
            <ListItemButton onClick={handleLogout} sx={{ textAlign: "center" }}>
              <ListItemText primary="Logout" />
            </ListItemButton>
          </ListItem>
        ) : (
          <>
            <ListItem disablePadding>
              <ListItemButton
                component={Link}
                to="/sign-in"
                sx={{ textAlign: "center" }}
              >
                <ListItemText primary="Login" />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton
                component={Link}
                to="/sign-up"
                sx={{ textAlign: "center" }}
              >
                <ListItemText primary="Sign Up" />
              </ListItemButton>
            </ListItem>
          </>
        )}
      </List>
    </Box>
  );

  return (
    <>
      <HideOnScroll>
        <AppBar position="fixed" sx={{ backgroundColor: "primary.main" }}>
          <Container maxWidth="xl">
            <Toolbar
              disableGutters
              sx={{ display: "flex", justifyContent: "space-between" }}
            >
              {/* Logo and Brand Name */}
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Link
                  to="/"
                  style={{
                    textDecoration: "none",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <img src={MyLogo} alt="Helping Hands Logo" width="80px" />
                  <Typography
                    variant="h6"
                    noWrap
                    sx={{
                      ml: 1,
                      display: { xs: "none", sm: "block" },
                      fontFamily: "monospace",
                      fontWeight: 700,
                      letterSpacing: ".1rem",
                      // color: "primary.light",
                      color: "white",
                      textDecoration: "none",
                      transition: "color 0.3s",
                    }}
                  >
                    Helping Hands
                  </Typography>
                </Link>
              </Box>

              {/* Navigation Links for Desktop */}

              <Box
                sx={{
                  display: { xs: "none", md: "flex" },
                  alignItems: "center",
                  gap: 1,
                }}
              >
                {navItems.map((item) => {
                  const isActive = location.pathname === item.path;
                  return (
                    <Button
                      key={item.text}
                      sx={{ ml: 2 }}
                      LinkComponent={Link}
                      to={item.path}
                    >
                      <Stack alignItems="center" gap={0.4}>
                        {item.icon}
                        <Typography color="white" variant="caption">
                          {item.text}
                        </Typography>
                      </Stack>
                    </Button>
                  );
                })}
              </Box>

              {/* Authentication Buttons for Desktop */}
              <Box
                sx={{
                  display: { xs: "none", md: "flex" },
                  alignItems: "center",
                }}
              >
                {user ? (
                  <Button
                    onClick={handleLogout}
                    sx={{
                      ml: 2,
                      color: "white",
                      transition: "background-color 0.3s",
                      "&:hover": {
                        backgroundColor: "rgba(255, 255, 255, 0.1)",
                      },
                    }}
                  >
                    Logout
                  </Button>
                ) : (
                  <>
                    <Button
                      component={Link}
                      to="/sign-in"
                      sx={{
                        ml: 2,
                        color: "white",
                        // transition: "background-color 0.3s",
                        // "&:hover": {
                        //   backgroundColor: "rgba(255, 255, 255, 0.1)",
                        // },
                      }}
                    >
                      Login
                    </Button>
                    <Button
                      LinkComponent={Link}
                      to="/sign-up"
                      variant="contained"
                      sx={{
                        ml: 2,
                        color: "white",
                        // transition: "background-color 0.3s, border-color 0.3s",
                        // "&:hover": {
                        //   backgroundColor: "rgba(255, 255, 255, 0.1)",
                        //   borderColor: "#ffeb3b",
                        // },
                      }}
                    >
                      Sign Up
                    </Button>
                  </>
                )}
              </Box>

              {/* Mobile Menu Button */}
              <IconButton
                color="inherit"
                aria-label="open drawer"
                edge="end"
                onClick={handleDrawerToggle}
                sx={{ display: { md: "none" } }}
              >
                <MenuIcon />
              </IconButton>
            </Toolbar>
          </Container>
        </AppBar>
      </HideOnScroll>

      {/* Offset for fixed AppBar */}
      <Offset />

      {/* Mobile Drawer */}
      <Drawer
        anchor="left"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{ keepMounted: true }} // Better open performance on mobile.
        sx={{
          display: { xs: "block", md: "none" },
          "& .MuiDrawer-paper": { boxSizing: "border-box", width: 250 },
        }}
      >
        {drawer}
      </Drawer>
    </>
  );
}

export default ResponsiveAppBar;
