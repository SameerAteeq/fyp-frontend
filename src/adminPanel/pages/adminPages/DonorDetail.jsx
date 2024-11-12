// components/DonorDetail.js
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

const DonorDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const apiManager = useApiManager();

  const dispatch = useDispatch();
  const [donor, setDonor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const fetchDonor = async () => {
    try {
      const { data, error } = await apiManager.get(`/admin/user/Donor/${id}`);
      console.log("🚀 ~ fetchDonor ~ data:", data);
      if (error) {
        dispatch(
          showToast({
            error: error,
            severity: "error",
          })
        );
      }
      setLoading(false);
      setDonor(data?.data);
    } catch (err) {
      console.error("Error fetching donor details:", err);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDonor();
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

  if (error || !donor) {
    return (
      <Typography variant="h6" color="error" align="center" sx={{ mt: 4 }}>
        Failed to load donor details. Please try again later.
      </Typography>
    );
  }

  return (
    <Box sx={{ width: "80%", margin: "auto", mt: 4 }}>
      <Button
        variant="outlined"
        startIcon={<ArrowBackIcon />}
        onClick={() => navigate("/admin/donors")}
      >
        Back to Donors
      </Button>
      <Paper sx={{ p: 4, mt: 2 }} elevation={10}>
        <Typography variant="h4" gutterBottom>
          Donor Details
        </Typography>
        <Stack direction="row" justifyContent={"space-between"}>
          <Typography variant="h6">Name:</Typography>
          <Typography variant="body1" gutterBottom>
            {donor?.name}
          </Typography>
        </Stack>
        <Stack direction="row" justifyContent={"space-between"}>
          <Typography variant="h6">Email:</Typography>
          <Typography variant="body1" gutterBottom>
            {donor?.email}
          </Typography>
        </Stack>

        <Stack direction="row" justifyContent={"space-between"}>
          <Typography variant="h6">Phone:</Typography>
          <Typography variant="body1" gutterBottom>
            {donor?.phone}
          </Typography>
        </Stack>

        <Stack direction="row" justifyContent={"space-between"}>
          <Typography variant="h6">Address:</Typography>
          <Typography variant="body1" gutterBottom>
            {donor?.address}
          </Typography>
        </Stack>

        <Stack direction="row" justifyContent={"space-between"}>
          <Typography variant="h6">Created At:</Typography>
          <Typography variant="body1" gutterBottom>
            {new Date(donor?.createdAt).toLocaleString()}
          </Typography>
        </Stack>
      </Paper>
      {donor?.medicines?.length > 0 && (
        <Container sx={{ mt: 4 }}>
          <Typography variant="h6" gutterBottom>
            Donation Medicine
          </Typography>
          <Grid container spacing={4}>
            {donor?.medicines?.map((medicine, index) => (
              <Grid item key={index} xs={12} sm={6}>
                <Card
                  elevation={10}
                  sx={{
                    borderRadius: 3,
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    position: "relative",
                    backgroundColor: "#f5f5f5", // Light background color for card
                    boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.5)", // Custom shadow for elevation effect
                    transition: "transform 0.3s ease-in-out", // Smooth transition on hover
                    "&:hover": {
                      transform: "translateY(-5px)", // Slight raise on hover for interactivity
                    },
                  }}
                >
                  {/* Update Button on top of the image */}

                  {/* Image at the top of the card */}
                  {/* <CardMedia
                    component="img"
                    height="180"
                    image={logoMed}
                    alt={medicine?.name}
                    sx={{
                      borderTopLeftRadius: "12px", // Rounded corners on the image
                      borderTopRightRadius: "12px",
                    }}
                  /> */}

                  {/* Content below the image */}
                  <CardContent sx={{ flexGrow: 1, padding: 3 }}>
                    <Typography variant="h6" color="text.primary" mb={2}>
                      {medicine?.name}
                    </Typography>

                    <Typography
                      variant="body2"
                      color={
                        medicine?.donationStatus == "Pending"
                          ? "#00ff11"
                          : "#ff0000"
                      }
                      align="right"
                      sx={{ mb: 2 }}
                    >
                      <strong>{medicine?.donationStatus}</strong>
                    </Typography>
                    {/* Medicine Details */}
                    <Box sx={{ mb: 2 }}>
                      <Typography variant="body2" color="text.secondary">
                        <strong>Type:</strong> {medicine?.type}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        <strong>Expiration:</strong>
                        &nbsp;
                        {new Intl.DateTimeFormat("en-GB", {
                          day: "2-digit",
                          month: "2-digit",
                          year: "2-digit",
                        }).format(new Date(medicine?.expirationDate))}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        <strong>Dosage:</strong> {medicine?.dosage}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        <strong>Batch Number:</strong> {medicine?.batchNumber}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        <strong>Manufacturer:</strong> {medicine?.manufacturer}
                      </Typography>
                    </Box>

                    <Box sx={{ mb: 2 }}>
                      <Typography variant="body2" color="text.secondary">
                        <strong>Price:</strong> ${medicine?.price}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        <strong>Quantity Available:</strong>{" "}
                        {medicine?.quantityAvailable}
                      </Typography>
                    </Box>

                    <Typography variant="body2" color="text.secondary">
                      <strong>Description:</strong> {medicine?.description}
                    </Typography>
                  </CardContent>

                  {/* Card Actions */}
                  {/* Get button for Recipient */}
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      )}
    </Box>
  );
};

export default DonorDetail;
