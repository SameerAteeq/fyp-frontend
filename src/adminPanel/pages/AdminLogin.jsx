import React, { useEffect, useState } from "react";

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
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
// import "./signin.css"; // Ensure this file contains any custom styles you want to add
import { useDispatch, useSelector } from "react-redux";
import { setUser, showToast } from "../../store/reducer";
import { useApiManager } from "../../apiManager/apiManager";
import { useNavigate } from "react-router-dom";

export default function AdminLogin() {
  const { post } = useApiManager();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.storeReducer);

  const [isLoading, setIsLoading] = useState(false);
  const [fdata, setFdata] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    if (user?.role === "admin") {
      navigate("/admin");
    }
  }, [user]);

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
    const { data, error } = await post("/admin/login", fdata);
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
    navigate("/admin");
  };

  return (
    <Container
      component="main"
      // maxWidth="xs"
      maxWidth={false}
      className="sign-up-container"
      sx={{
        bgcolor: "primary.main",
        padding: "20px",
        height: "100vh",
      }}
    >
      <Paper elevation={24} sx={{ maxWidth: 600, margin: "0 auto" }}>
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            // bgcolor: "primary.light",
            borderRadius: "40px",
            padding: "40px",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Admin Login
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
          </Box>
        </Box>
      </Paper>
      <Box sx={{ mt: 8, textAlign: "center" }}>
        <Typography variant="body2" color="text.secondary">
          {"Copyright © "}
          Helping Hands
          {new Date().getFullYear()}
          {"."}
        </Typography>
      </Box>
    </Container>
  );
}
