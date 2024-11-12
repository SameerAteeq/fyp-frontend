// components/CompanyDetail.js
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
  IconButton,
  Fab,
} from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useApiManager } from "../../../apiManager/apiManager";
import { useDispatch } from "react-redux";
import { showToast } from "../../../store/reducer";
import logoMed from "../../../assets/images/pic.jpg";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import { getImageUrl } from "../../../helpers/getImageUrl";

const CompanyDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const apiManager = useApiManager();

  const dispatch = useDispatch();
  const [company, setcompany] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const fetchCompany = async () => {
    try {
      const { data, error } = await apiManager.get(`/admin/company/${id}`);
      console.log("🚀 ~ fetchCompany ~ data:", data);
      if (error) {
        dispatch(
          showToast({
            error: error,
            severity: "error",
          })
        );
      }
      setLoading(false);
      setcompany(data?.company);
    } catch (err) {
      console.error("Error fetching company details:", err);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCompany();
  }, [id]);

  // Handle navigation for updating or getting medicine
  const handleMedicineAction = (actionType, medicine) => {
    if (actionType === "update") {
      navigate(`/admin/company/${company?._id}/medicine/${medicine?._id}`); // Navigate to update medicine page
    } else if (actionType === "get") {
      navigate(`/admin/company/${medicine?._id}/medicine`);
    }
  };

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

  if (error || !company) {
    return (
      <Typography variant="h6" color="error" align="center" sx={{ mt: 4 }}>
        Failed to load company details. Please try again later.
      </Typography>
    );
  }

  return (
    <Box sx={{ width: "80%", margin: "auto", mt: 4 }}>
      <Fab
        color="primary"
        aria-label="add"
        sx={{
          position: "fixed",
          bottom: 16,
          right: 16,
          width: 56, // Customize size if needed
          height: 56,
          borderRadius: "50%",
        }}
        onClick={() => navigate(`/admin/company/${company?._id}/add`)} // Navigate to Add Medicine page
      >
        <AddIcon />
      </Fab>
      <Button
        variant="outlined"
        startIcon={<ArrowBackIcon />}
        onClick={() => navigate("/admin/company")}
      >
        Back to company
      </Button>
      <Paper sx={{ p: 4, mt: 2 }} elevation={10}>
        <Typography variant="h4" gutterBottom>
          Company Details
        </Typography>

        <Stack direction="row" justifyContent={"space-between"}>
          <Typography variant="h6">Name:</Typography>
          <Typography variant="body1" gutterBottom>
            {company?.name}
          </Typography>
        </Stack>

        <Stack direction="row" justifyContent={"space-between"}>
          <Typography variant="h6">Phone:</Typography>
          <Typography variant="body1" gutterBottom>
            {company?.contactNumber}
          </Typography>
        </Stack>

        <Stack direction="row" justifyContent={"space-between"}>
          <Typography variant="h6">Address:</Typography>
          <Typography variant="body1" gutterBottom>
            {company?.address}
          </Typography>
        </Stack>

        <Stack direction="row" justifyContent={"space-between"}>
          <Typography variant="h6">Total Medicine:</Typography>
          <Typography variant="body1" gutterBottom>
            {company?.medicines?.length}
          </Typography>
        </Stack>

        <Stack direction="row" justifyContent={"space-between"}>
          <Typography variant="h6">Created At:</Typography>
          <Typography variant="body1" gutterBottom>
            {new Date(company?.createdAt).toLocaleString()}
          </Typography>
        </Stack>
      </Paper>
      {company?.medicines?.length > 0 && (
        <Container sx={{ mt: 4 }}>
          <Typography variant="h6" gutterBottom>
            Donation Medicine
          </Typography>
          <Grid container spacing={4}>
            {company?.medicines?.map((medicine, index) => (
              <Grid item key={index} xs={12} sm={12} md={6}>
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
                  <IconButton
                    sx={{
                      position: "absolute",
                      top: 16,
                      right: 16,
                      backgroundColor: "#fff", // White button background for better visibility
                      borderRadius: "50%",
                      padding: "8px",
                      "&:hover": {
                        backgroundColor: "#e0e0e0", // Gray hover effect
                      },
                    }}
                    onClick={() => handleMedicineAction("update", medicine)}
                  >
                    <EditIcon sx={{ color: "#1976d2" }} />{" "}
                    {/* Primary color for the edit icon */}
                  </IconButton>
                  {/* Image at the top of the card */}
                  <CardMedia
                    component="img"
                    height="180"
                    image={getImageUrl(medicine?.image)}
                    alt={medicine?.name}
                    sx={{
                      borderTopLeftRadius: "12px", // Rounded corners on the image
                      borderTopRightRadius: "12px",
                    }}
                  />

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

export default CompanyDetail;
