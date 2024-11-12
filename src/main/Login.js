// import React, { useState } from "react";
// import Avatar from "@mui/material/Avatar";
// import Button from "@mui/material/Button";
// import CssBaseline from "@mui/material/CssBaseline";
// import TextField from "@mui/material/TextField";
// import FormControlLabel from "@mui/material/FormControlLabel";
// import Checkbox from "@mui/material/Checkbox";
// import Link from "@mui/material/Link";
// import Grid from "@mui/material/Grid";
// import Box from "@mui/material/Box";
// import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
// import Typography from "@mui/material/Typography";
// import Container from "@mui/material/Container";
// import { createTheme, ThemeProvider } from "@mui/material/styles";
// import "./signin.css";
// import { useNavigate } from "react-router-dom";
// import Swal from "sweetalert2";
// // import {
// //   BrowserRouter as Router,
// //   Routes,
// //   Route,
// //   Link
// // } from "react-router-dom";
// import SignUp from "./SignUp";

// function Copyright(props) {
//   return (
//     <Typography variant="body2" align="center" {...props}>
//       {"Copyright © "}
//       Helping Hands
//       {new Date().getFullYear()}
//       {"."}
//     </Typography>
//   );
// }

// const theme = createTheme();

// export default function SignIn() {
//   const [fdata, setFdata] = useState({
//     email: "",
//     password: "",
//   });

//   const [errormsg, setErrormsg] = useState(null);
//   const navigate = useNavigate();
//   const Sendtobackend = () => {
//     console.log(fdata);
//     if (fdata.email == "" || fdata.password == "") {
//       setErrormsg("All fields are required");
//       return;
//     } else {
//       fetch("http://localhost:4000/signin", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(fdata),
//       })
//         .then((res) => res.json())
//         .then((data) => {
//           // console.log(data);
//           if (data.error) {
//             setErrormsg(data.error);
//             Swal.fire({
//               icon: "error",
//               title: "Error",
//               text: data.error,
//               confirmButtonColor: "#0875b8",
//             });
//           } else {
//             // alert('loggedin successfully');
//             Swal.fire({
//               title: "Successul",
//               text: "Login Successfully.",
//               icon: "success",
//               confirmButtonColor: "#0875b8",
//             });
//             console.log("goggoog", data?.data);
//             console.log(data?.token);

//             localStorage.setItem("clientToken", JSON.stringify(data));
//             if (data?.data == "admin") {
//               navigate("/admin");
//             } else {
//               Swal.fire({
//                 title: "Successul",
//                 text: "Login Successfully.",
//                 icon: "success",
//                 confirmButtonColor: "#0875b8",
//               });
//               navigate("/");
//             }
//             // navigation.navigate('Profile');
//           }
//         });
//     }
//   };
//   // const handleSubmit = (event) => {
//   //   event.preventDefault();
//   //   const data = new FormData(event.currentTarget);
//   //   console.log({
//   //     email: data.get('email'),
//   //     password: data.get('password'),
//   //   });
//   // };

//   return (
//     <div
//       className="a"
//       // style='bg-color:secondary'
//     >
//       {/* <ThemeProvider
//     theme={theme}
//      sx={{  bgcolor: 'secondary' }}>  */}
//       <Container component="main" maxWidth="xs" className="ab">
//         <CssBaseline />
//         <Box
//           sx={{
//             marginTop: 8,
//             display: "flex",
//             flexDirection: "column",
//             alignItems: "center",
//           }}
//         >
//           <Avatar sx={{ m: 1, backgroundColor: "#58869e" }}>
//             <LockOutlinedIcon sx={{ backgroundColor: "#58869e" }} />
//           </Avatar>
//           <Typography component="h1" variant="h5">
//             Sign in
//           </Typography>
//           {errormsg ? <h5 style={{ color: "red" }}>{errormsg}</h5> : null}
//           <Box
//             component="form"
//             // onSubmit={handleSubmit} noValidate
//             sx={{ mt: 1 }}
//           >
//             <TextField
//               margin="normal"
//               required
//               fullWidth
//               id="email"
//               label="Email Address"
//               name="email"
//               autoComplete="email"
//               autoFocus
//               onClick={() => setErrormsg(null)}
//               onChange={(e) =>
//                 setFdata({ ...fdata, email: e.target.value })
//               }
//             />
//             <TextField
//               margin="normal"
//               required
//               fullWidth
//               name="password"
//               label="Password"
//               type="password"
//               id="password"
//               autoComplete="current-password"
//               onChange={(e) =>
//                 setFdata({ ...fdata, password: e.target.value })
//               }
//               onClick={() => setErrormsg(null)}
//             />
//             {/* <Link href='ask' variant="body2"> */}
//             <Button
//               // type="submit"
//               fullWidth
//               variant="contained"
//               sx={{ mt: 3, mb: 2, backgroundColor: "#58869e" }}
//               onClick={() => Sendtobackend()}
//             >
//               Sign In
//             </Button>
//             {/* </Link> */}

//             <Grid container>
//               {/* <Grid item xs>
//                 <Link href="#" variant="body2">
//                   Forgot password?
//                 </Link>
//               </Grid> */}
//               <Grid item>
//                 <Link href="signup" variant="body2">
//                   {"Don't have an account? Sign Up"}
//                 </Link>
//               </Grid>
//             </Grid>
//           </Box>
//         </Box>
//         <Copyright sx={{ mt: 8, mb: 4 }} />
//       </Container>
//       {/* </ThemeProvider> */}
//     </div>
//   );
// }

import React, { useState } from "react";
// import Avatar from "@mui/material/Avatar";
// import Button from "@mui/material/Button";
// import TextField from "@mui/material/TextField";
// import Link from "@mui/material/Link";
// import Grid from "@mui/material/Grid";
// import Box from "@mui/material/Box";
// import Typography from "@mui/material/Typography";
// import Container from "@mui/material/Container";
import {
  Avatar,
  Button,
  TextField,
  Link,
  Grid,
  Box,
  Typography,
  Container,
  Paper,
  CircularProgress,
  Stack,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import "./signin.css"; // Ensure this file contains any custom styles you want to add
import { useDispatch } from "react-redux";
import { setUser, showToast } from "../store/reducer";
import { useApiManager } from "../apiManager/apiManager";
import { useNavigate } from "react-router-dom";

export default function SignIn() {
  const { post } = useApiManager();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);
  const [fdata, setFdata] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (fdata.email === "" || fdata.password === "") {
      console.log("aya");
      dispatch(
        showToast({
          severity: "error",
          message: "All Fields required",
          title: "Form Error",
        })
      );
      return;
    }

    setIsLoading(true);
    const { data, error } = await post("/login", fdata);
    setIsLoading(false);
    if (error) {
      return dispatch(
        showToast({
          severity: "error",
          message: error,
        })
      );
    }

    localStorage.setItem("token", data?.token);
    localStorage.setItem("@role", data?.data?.role);
    dispatch(setUser(data?.data));
    navigate("/");
  };

  return (
    <Container
      component="main"
      maxWidth={false}
      className="sign-up-container"
      sx={{
        minHeight: "100vh",
        bgcolor: "primary.main",
        padding: "20px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <Paper
        elevation={24}
        sx={{ maxWidth: 600, margin: "0 auto", borderRadius: "40px" }}
      >
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",

            padding: "40px",
          }}
        >
          <Avatar sx={{ m: 1 }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box
            component="form"
            noValidate
            sx={{ mt: 1 }}
            onSubmit={handleSubmit}
          >
            <TextField
              variant="standard"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              onChange={(e) => setFdata({ ...fdata, email: e.target.value })}
              sx={{ mb: 2 }}
            />
            <TextField
              variant="standard"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={(e) => setFdata({ ...fdata, password: e.target.value })}
              sx={{ mb: 2 }}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              sx={{ mt: 5, mb: 3 }}
              disabled={isLoading}
            >
              {isLoading ? (
                <CircularProgress size={24} color="inherit" />
              ) : (
                "Sign In"
              )}
            </Button>
            <Grid container>
              <Grid item xs={12}>
                <Stack justifyContent="center" alignItems="center">
                  <Link href="/sign-up" variant="body2">
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Stack>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Paper>
      <Box sx={{ mt: 8, textAlign: "center" }}>
        <Typography variant="body2" color="white">
          {"Copyright © "}
          Helping Hands
          {new Date().getFullYear()}
          {"."}
        </Typography>
      </Box>
    </Container>
  );
}
