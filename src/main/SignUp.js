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
// import { useNavigate } from "react-router-dom";
// import { createTheme, ThemeProvider } from "@mui/material/styles";
// import Select from "@mui/material/Select";
// import MenuItem from "@mui/material/MenuItem";
// import InputLabel from "@mui/material/InputLabel";
// import Swal from "sweetalert2";
// import "./signin.css";
// function Copyright(props) {
//   return (
//     <Typography
//       variant="body2"
//       color="text.secondary"
//       align="center"
//       {...props}
//     >
//       {"Copyright © "}
//       Helping Hands
//       {new Date().getFullYear()}
//       {"."}
//     </Typography>
//   );
// }

// const theme = createTheme();

// export default function SignUp() {
//   const navigate = useNavigate();
//   const [role, setrole] = useState("");
//   const [fdata, setFdata] = useState({
//     fname: "",
//     lname: "",
//     email: "",
//     password: "",
//     role: "",
//   });

//   return (
//     <div className="a">
//       <ThemeProvider theme={theme}>
//         <Container component="main" maxWidth="xs">
//           <CssBaseline />
//           <Box
//             sx={{
//               marginTop: 8,
//               display: "flex",
//               flexDirection: "column",
//               alignItems: "center",
//             }}
//           >
//             <Avatar sx={{ m: 1, bgcolor: "#58869e" }}>
//               <LockOutlinedIcon />
//             </Avatar>
//             <Typography component="h1" variant="h5">
//               Sign up
//             </Typography>
//             {errormsg ? <h5 style={{ color: "red" }}>{errormsg}</h5> : null}
//             <Box
//               //  component="form" noValidate onSubmit={handleSubmit}
//               sx={{ mt: 3 }}
//             >
//               <Grid container spacing={2}>
//                 <Grid item xs={12} sm={6}>
//                   <TextField
//                     autoComplete="given-name"
//                     name="firstName"
//                     required
//                     fullWidth
//                     id="firstName"
//                     label="First Name"
//                     autoFocus
//                     onClick={() => setErrormsg(null)}
//                     onChange={(e) =>
//                       setFdata({ ...fdata, fname: e.target.value })
//                     }
//                   />
//                 </Grid>
//                 <Grid item xs={12} sm={6}>
//                   <TextField
//                     required
//                     fullWidth
//                     id="lastName"
//                     label="Last Name"
//                     name="lastName"
//                     autoComplete="family-name"
//                     onClick={() => setErrormsg(null)}
//                     onChange={(e) =>
//                       setFdata({ ...fdata, lname: e.target.value })
//                     }
//                   />
//                 </Grid>
//                 <Grid item xs={12}>
//                   <TextField
//                     required
//                     fullWidth
//                     id="email"
//                     label="Email Address"
//                     name="email"
//                     autoComplete="email"
//                     onClick={() => setErrormsg(null)}
//                     onChange={(e) =>
//                       setFdata({ ...fdata, email: e.target.value })
//                     }
//                   />
//                 </Grid>
//                 <Grid item xs={12}>
//                   <TextField
//                     required
//                     fullWidth
//                     name="password"
//                     label="Password"
//                     type="password"
//                     id="password"
//                     autoComplete="new-password"
//                     onClick={() => setErrormsg(null)}
//                     onChange={(e) =>
//                       setFdata({ ...fdata, password: e.target.value })
//                     }
//                   />
//                 </Grid>
//                 <Grid item xs={12}>
//                   <InputLabel sx={{ color: "black" }}>User Role</InputLabel>
//                   <Select
//                     required
//                     fullWidth
//                     value={fdata.role}
//                     onChange={(e) =>
//                       setFdata({ ...fdata, role: e.target.value })
//                     }
//                     label="User Role"
//                     sx={{
//                       "&:focus": {
//                         backgroundColor: "transparent", // Prevent the default focus background color
//                       },
//                       "&:before": {
//                         borderColor: "black", // Set the border color before selection
//                       },
//                       "&:after": {
//                         borderColor: "black", // Set the border color after selection
//                       },
//                       "& fieldset": {
//                         borderColor: "black", // Set the border color of the fieldset
//                       },
//                       "& option": {
//                         color: "black", // Set the color of the options
//                       },
//                     }}
//                   >
//                     <MenuItem value="donor">Donor</MenuItem>
//                     <MenuItem value="receipient">Receipient</MenuItem>
//                   </Select>
//                 </Grid>
//                 {/* <Grid item xs={12}>
//                 <FormControlLabel
//                   control={<Checkbox value="allowExtraEmails" color="primary" />}
//                   label="I want to receive inspiration, marketing promotions and updates via email."
//                 />
//               </Grid> */}
//               </Grid>
//               <Button
//                 // type="submit"
//                 fullWidth
//                 variant="contained"
//                 sx={{ mt: 3, mb: 2, backgroundColor: "#58869e" }}
//                 onClick={() => {
//                   Sendtobackend();
//                 }}
//               >
//                 Sign Up
//               </Button>
//               <Grid container justifyContent="flex-end">
//                 <Grid item>
//                   <Link href="sign-in" variant="body2">
//                     Already have an account? Sign in
//                   </Link>
//                 </Grid>
//               </Grid>
//             </Box>
//           </Box>
//           <Copyright sx={{ mt: 5 }} />
//         </Container>
//       </ThemeProvider>
//     </div>
//   );
// }

import React, { useState } from "react";
import {
  Avatar,
  Button,
  TextField,
  Link,
  Grid,
  Box,
  Typography,
  Container,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Paper,
  CircularProgress,
  Stack,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import "./signin.css"; // assuming you still want to use some custom styles
import { useDispatch } from "react-redux";
import { setUser, showToast } from "../store/reducer";
import { useApiManager } from "../apiManager/apiManager";
import { useNavigate } from "react-router-dom";

function Copyright(props) {
  return (
    <Typography variant="body2" color="white" align="center" {...props}>
      {"Copyright © "}
      Helping Hands {new Date().getFullYear()} {"."}
    </Typography>
  );
}

export default function SignUp() {
  const dispatch = useDispatch();
  const { post } = useApiManager();
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);
  const [fdata, setFdata] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    role: "",
    address: "",
  });

  const handleSubmit = async () => {
    if (
      !fdata.name ||
      !fdata.email ||
      !fdata.password ||
      !fdata.role ||
      !fdata.phone ||
      !fdata.address
    ) {
      dispatch(
        showToast({
          message: "All Fields Required",
          severity: "error",
        })
      );
      return;
    }

    setIsLoading(true);
    const { data, error } = await post("/register", fdata);
    setIsLoading(false);

    if (error) {
      return dispatch(
        showToast({
          message: error,
          severity: "error",
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
        bgcolor: "primary.main",
        padding: "20px",
        minHeight: "100vh",
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
          <Typography component="h1" variant="h5" fontWeight="bold">
            Sign Up
          </Typography>
          {/* Error message (if any) */}
          <Box sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  variant="standard"
                  autoComplete="given-name"
                  name="Name"
                  required
                  fullWidth
                  id="name"
                  label="Name"
                  autoFocus
                  onChange={(e) => setFdata({ ...fdata, name: e.target.value })}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="standard"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  onChange={(e) =>
                    setFdata({ ...fdata, email: e.target.value })
                  }
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="standard"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  onChange={(e) =>
                    setFdata({ ...fdata, password: e.target.value })
                  }
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="standard"
                  autoComplete="given-address"
                  name="Address"
                  required
                  fullWidth
                  id="address"
                  label="Address"
                  autoFocus
                  onChange={(e) =>
                    setFdata({ ...fdata, address: e.target.value })
                  }
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="standard"
                  autoComplete="given-number"
                  name="Phone"
                  required
                  fullWidth
                  id="phone"
                  label="Phone"
                  autoFocus
                  type="tel"
                  onChange={(e) =>
                    setFdata({ ...fdata, phone: e.target.value })
                  }
                />
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth variant="standard">
                  <InputLabel id="user-role">Role *</InputLabel>
                  <Select
                    required
                    fullWidth
                    value={fdata.role}
                    label="Role *"
                    labelId="user-role"
                    onChange={(e) =>
                      setFdata({ ...fdata, role: e.target.value })
                    }
                  >
                    <MenuItem value="Donor">Donor</MenuItem>
                    <MenuItem value="Recipient">Recipient</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
            <Button
              fullWidth
              variant="contained"
              sx={{
                mt: 5,
                mb: 3,
              }}
              onClick={handleSubmit}
              disabled={isLoading}
            >
              {isLoading ? (
                <CircularProgress size={24} color="inherit" />
              ) : (
                "Sign Up"
              )}
            </Button>
            <Grid container>
              <Grid item xs={12}>
                <Stack justifyContent="center" alignItems="center">
                  <Link
                    href="/sign-in"
                    variant="body2"
                    style={{ textAlign: "center" }}
                  >
                    Already have an account? Sign in
                  </Link>
                </Stack>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Paper>
      <Copyright sx={{ pt: 5, pb: 1 }} />
    </Container>
  );
}
