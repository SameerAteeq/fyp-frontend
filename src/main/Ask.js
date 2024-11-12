// import React from 'react'
// import { Grid, Typography } from '@mui/material';
// import Chip from '@mui/material/Chip';
// import LockIcon from '@mui/icons-material/Lock';
// import PermIdentityIcon from '@mui/icons-material/PermIdentity';
// import TextField from '@mui/material/TextField';
// import { Container } from '@mui/material';
// import IconButton from '@mui/material/IconButton';
// import OutlinedInput from '@mui/material/OutlinedInput';
// import InputLabel from '@mui/material/InputLabel';
// import InputAdornment from '@mui/material/InputAdornment';
// import FormControl from '@mui/material/FormControl';
// import Visibility from '@mui/icons-material/Visibility';
// import VisibilityOff from '@mui/icons-material/VisibilityOff';
// import Button from '@mui/material/Button';
// import LoginIcon from '@mui/icons-material/Login';
// import PlayArrowIcon from '@mui/icons-material/PlayArrow';
// import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
// import FormControlLabel from '@mui/material/FormControlLabel';
// import Checkbox from '@mui/material/Checkbox';
// import AddToPhotosIcon from '@mui/icons-material/AddToPhotos';
// import { useState } from 'react';
// import { useNavigate } from 'react-router-dom';

// const Ask = () => {
//     // Password Field
//   const [showPassword, setShowPassword] = React.useState(false);
//   const [name, setName] = useState("")
//   const [email, setEmail] = useState("")
//   const [address, setAddress] = useState("")
//   const navigate = useNavigate()

//   const handleClickShowPassword = () => setShowPassword((show) => !show);

//   const handleMouseDownPassword = (event) => {
//     event.preventDefault();
//   };
//   const collectData = async () => {
//     console.warn(name, email, address);

//     // Send data to the server
//     let result = await fetch('http://localhost:4000/ask', {
//       method: 'post',
//       body: JSON.stringify({ name, email, address }),
//       headers: {
//         'Content-Type': 'application/json'
//       }
//     });

// Receive and parse the response
// const response = await result.json();

// Update the state with the received data
// setName(response.name);
// setEmail(response.email);
// setAddress(response.address);

// console.warn(response);

// Navigate to another route (e.g., '/')
//     navigate('/');
//   };

//   return (
//     <Grid container justify='center'  alignItems='center' direction='column'
//     style={{minHeight: '100vh'}} spacing={2} mt={8}
//     >
//       <Grid item>
//         <Typography variant='h2' color='primary' style={{textAlign:'center'}}>

//         <AddToPhotosIcon style={{fontSize:'3rem'}}/> Collect Your Medicines

//         </Typography>

//       </Grid>
//       <Grid item>
//       <AskCenter/>
//     </Grid>
//     </Grid>
//   )
// }

// export default Ask;

// const AskCenter = () => {

// const handleMouseDownPassword = (event) => {
//     event.preventDefault();
// };

//   return (
//     <Grid container direction='column' alignItems='center' justify='center'>
//       <p><TextField id="outlined-basic" label="Name" fullWidth variant="outlined" size='small'
//          style={{marginBottom: "1em"}}
//          onChange={(e) => setName(e.target.value)} value={name}/>
//       </p>

//       <p><TextField id="outlined-basic" label="Email" fullWidth variant="outlined" size='small'
//          style={{marginBottom: "1em"}}
//          onChange={(e) => setEmail(e.target.value)} value={email}/>
//       </p>

//       <p><TextField id="outlined-basic" label="Address" fullWidth variant="outlined" size='small'
//          style={{marginBottom: "1em"}}
//          onChange={(e) => setAddress(e.target.value)} value={address}/>
//       </p>

//       <p><Button onClick={collectData} on variant="contained" sx={{ width: '29ch' }} endIcon={<PlayArrowIcon />}>
//       Collect
//         </Button>
//       </p>

//     </Grid>
//   )
// }

import React, { useEffect, useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import AddToPhotosIcon from "@mui/icons-material/AddToPhotos";
import Swal from "sweetalert2";

import "./signin.css";
function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      Helping Hands
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const theme = createTheme();

export default function Ask() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const medicineName = searchParams.get("medicineName");
  const [fdata, setFdata] = useState({
    name: "",
    email: "",
    address: "",
    medicineName: medicineName,
    medicineQty: 0,
  });
  useEffect(() => {
    // setFdata({ ...fdata, medicineName: medicineName })

    setFdata({
      ...fdata,
      medicineQty: Number(searchParams.get("medicineQty")),
    });
    const medicineQty = Number(searchParams.get("medicineQty"));
  }, []); // Get the location object
  // const state = location.state;
  // const medicineNamess = state ? state.medicineName : null;

  // console.log('medicineName>>>>',fdata.medicineName)

  // console.log('medicineQty>>>>',typeof(medicineQty))
  const navigate = useNavigate();
  // const [userRole, setUserRole] = useState('');

  const [errormsg, setErrormsg] = useState(null);

  const Sendtobackend = () => {
    console.log(fdata);
    if (fdata.name == "" || fdata.email == "" || fdata.address == "") {
      setErrormsg("All fields are required");
      return;
    } else {
      fetch("http://localhost:4000/ask", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(fdata),
      }).then((data) => {
        console.log(data);
        if (data.error) {
          // alert('Invalid Credentials')
          Swal.fire({
            icon: "error",
            title: "Failed",
            text: "Invalid Credentials",
            confirmButtonColor: "#0875b8",
          });
          setErrormsg(data.error);
        } else {
          // alert('Account created successfully')
          navigate("/");
          Swal.fire({
            title: "Successul",
            text: " Successful",
            icon: "success",
            confirmButtonColor: "#0875b8",
          });
          // Swal.fire('Successful ')
        }
      });
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      name: data.get("name"),
      email: data.get("email"),
    });
  };

  return (
    <div className="a">
      <ThemeProvider theme={theme}>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "#58869e" }}>
              <AddToPhotosIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Collect Your Medicines
            </Typography>
            {errormsg ? <h5 style={{ color: "red" }}>{errormsg}</h5> : null}
            <Box
              //  component="form" noValidate onSubmit={handleSubmit}
              sx={{ mt: 3 }}
            >
              <Grid container spacing={2}>
                <Grid item xs={12} sm={12}>
                  <TextField
                    autoComplete="given-name"
                    name="Name"
                    required
                    fullWidth
                    id="Name"
                    label="Name"
                    autoFocus
                    onClick={() => setErrormsg(null)}
                    onChange={(e) =>
                      setFdata({ ...fdata, name: e.target.value })
                    }
                  />
                </Grid>
                {/* <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="family-name"
                  onClick={() => setErrormsg(null)}
                  onChange={(e) => setFdata({ ...fdata, lname: e.target.value })}
                />
              </Grid> */}
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="email"
                    label="Email"
                    name="email"
                    autoComplete="email"
                    onClick={() => setErrormsg(null)}
                    onChange={(e) =>
                      setFdata({ ...fdata, email: e.target.value })
                    }
                  />
                </Grid>
                <Grid item xs={12} sm={12}>
                  <TextField
                    // required
                    fullWidth
                    id="medicineName"
                    label="Medicine Name"
                    name="medicineName"
                    autoComplete="family-name"
                    value={medicineName}
                    InputProps={{
                      readOnly: true,
                    }}
                    // onClick={() => setErrormsg(null)}
                    // onChange={(e) => setFdata({ ...fdata, address: e.target.value })}
                  />
                </Grid>
                <Grid item xs={12} sm={12}>
                  <TextField
                    type="number"
                    InputProps={{
                      // endAdornment: <>Minutes</>,
                      inputProps: {
                        step: "1",
                        min: 1, // Set the minimum value
                        max: fdata.medicineQty, // Set the maximum value
                      },
                    }}
                    // required
                    fullWidth
                    id="medicineQty"
                    label="Medicine Qty"
                    name="medicineQty"
                    autoComplete="family-name"
                    value={fdata.medicineQty}
                    // onClick={() => setErrormsg(null)}
                    onChange={(e) =>
                      setFdata({ ...fdata, medicineQty: e.target.value })
                    }
                  />
                </Grid>
                <Grid item xs={12} sm={12}>
                  <TextField
                    required
                    fullWidth
                    id="Address"
                    label="Address"
                    name="Address"
                    autoComplete="family-name"
                    onClick={() => setErrormsg(null)}
                    onChange={(e) =>
                      setFdata({ ...fdata, address: e.target.value })
                    }
                  />
                </Grid>
                {/* <Grid item xs={12}>
            <Select
              required
              fullWidth
              value={fdata.userRole}
              onChange={(e) => setFdata({ ...fdata, userRole: e.target.value })}
              label="User Role"
              sx={{
                '&:focus': {
                  backgroundColor: 'transparent', // Prevent the default focus background color
                },
                '&:before': {
                  borderColor: 'black', // Set the border color before selection
                },
                '&:after': {
                  borderColor: 'black', // Set the border color after selection
                },
                '& fieldset': {
                  borderColor: 'black', // Set the border color of the fieldset
                },
                '& option': {
                  color: 'black', // Set the color of the options
                },
              }}
            >
              <MenuItem value="donor">Donor</MenuItem>
              <MenuItem value="receipient">Receipient</MenuItem>
            </Select>
          </Grid> */}
                {/* <Grid item xs={12}>
                <FormControlLabel
                  control={<Checkbox value="allowExtraEmails" color="primary" />}
                  label="I want to receive inspiration, marketing promotions and updates via email."
                />
              </Grid> */}
              </Grid>
              <Button
                // type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2, backgroundColor: "#58869e" }}
                onClick={() => {
                  Sendtobackend();
                }}
              >
                Collect <PlayArrowIcon />
              </Button>
              {/* <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="signin" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid> */}
            </Box>
          </Box>
          <Copyright sx={{ mt: 5 }} />
        </Container>
      </ThemeProvider>
    </div>
  );
}
