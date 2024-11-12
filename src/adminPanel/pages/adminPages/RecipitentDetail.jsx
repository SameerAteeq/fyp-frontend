// components/recipitentDetail.js
import React, { useState, useEffect } from "react";
import {
  Paper,
  CircularProgress,
  Card,
  Typography,
  CardContent,
  CardMedia,
  Grid,
  Box,
  Button,
  Container,
  Stack,
} from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useApiManager } from "../../../apiManager/apiManager";
import { useDispatch } from "react-redux";
import { showToast } from "../../../store/reducer";
import logoMed from "../../../assets/images/pic.jpg";

const RecipientDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const apiManager = useApiManager();

  const dispatch = useDispatch();
  const [recipitent, setRecipitent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const fetchRecipitent = async () => {
    try {
      const { data, error } = await apiManager.get(
        `/admin/user/Recipient/${id}`
      );
      if (error) {
        dispatch(
          showToast({
            error: error,
            severity: "error",
          })
        );
      }
      setLoading(false);
      setRecipitent(data?.data);
    } catch (err) {
      console.error("Error fetching recipitent details:", err);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRecipitent();
  }, [id]);

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "60vh",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (error || !recipitent) {
    return (
      <Typography variant="h6" color="error" align="center" sx={{ mt: 4 }}>
        Failed to load recipitent details. Please try again later.
      </Typography>
    );
  }

  return (
    <Box sx={{ width: "80%", margin: "auto", mt: 4 }}>
      <Button
        variant="outlined"
        startIcon={<ArrowBackIcon />}
        onClick={() => navigate("/admin/recipitents")}
      >
        Back to recipitents
      </Button>
      <Paper sx={{ p: 4, mt: 2 }} elevation={10}>
        <Typography variant="h4" gutterBottom>
          Recipitent Details
        </Typography>
        <Stack direction="row" justifyContent={"space-between"}>
          <Typography variant="h6">Name:</Typography>
          <Typography variant="body1" gutterBottom>
            {recipitent?.name}
          </Typography>
        </Stack>
        <Stack direction="row" justifyContent={"space-between"}>
          <Typography variant="h6">Email:</Typography>
          <Typography variant="body1" gutterBottom>
            {recipitent?.email}
          </Typography>
        </Stack>

        <Stack direction="row" justifyContent={"space-between"}>
          <Typography variant="h6">Phone:</Typography>
          <Typography variant="body1" gutterBottom>
            {recipitent?.phone}
          </Typography>
        </Stack>

        <Stack direction="row" justifyContent={"space-between"}>
          <Typography variant="h6">Address:</Typography>
          <Typography variant="body1" gutterBottom>
            {recipitent?.address}
          </Typography>
        </Stack>

        <Stack direction="row" justifyContent={"space-between"}>
          <Typography variant="h6">Created At:</Typography>
          <Typography variant="body1" gutterBottom>
            {new Date(recipitent?.createdAt).toLocaleString()}
          </Typography>
        </Stack>
      </Paper>
    </Box>
  );
};

export default RecipientDetail;
