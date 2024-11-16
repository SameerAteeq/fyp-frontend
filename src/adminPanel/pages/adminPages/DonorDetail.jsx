import React, { useState, useEffect } from "react";
import {
  Paper,
  CircularProgress,
  Card,
  Typography,
  CardContent,
  Grid,
  Box,
  Button,
  Container,
  Stack,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useApiManager } from "../../../apiManager/apiManager";
import { useDispatch } from "react-redux";
import { showToast } from "../../../store/reducer";

const DonorDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const apiManager = useApiManager();

  const dispatch = useDispatch();
  const [donor, setDonor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [selectedMedicine, setSelectedMedicine] = useState(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  const fetchDonor = async () => {
    try {
      const { data, error } = await apiManager.get(`/admin/user/Donor/${id}`);
      if (error) {
        dispatch(
          showToast({
            message: error,
            severity: "error",
          })
        );
      }
      setDonor(data?.data);
    } catch (err) {
      console.error("Error fetching donor details:", err);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (medicineId) => {
    try {
      const { data, error } = await apiManager.delete(
        `/medicines/${medicineId}`
      );
      if (error) {
        dispatch(
          showToast({
            message: error,
            severity: "error",
          })
        );
        return;
      }

      dispatch(
        showToast({
          message: "Medicine deleted successfully",
          severity: "success",
        })
      );

      // Refresh the donor data
      fetchDonor();
    } catch (err) {
      console.error("Error deleting medicine:", err);
      dispatch(
        showToast({
          message: "Failed to delete the medicine. Please try again.",
          severity: "error",
        })
      );
    } finally {
      setDeleteDialogOpen(false);
      setSelectedMedicine(null);
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
            {donor?.medicines?.map((medicine) => (
              <Grid item key={medicine.id} xs={12} sm={6}>
                <Card
                  elevation={10}
                  sx={{
                    borderRadius: 3,
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    position: "relative",
                    backgroundColor: "#f5f5f5",
                  }}
                >
                  {/* Small Delete Button */}
                  <Button
                    size="small"
                    variant="contained"
                    sx={{
                      position: "absolute",
                      top: 8,
                      right: 8,
                      backgroundColor: "red",
                      color: "white",
                      "&:hover": {
                        backgroundColor: "darkred",
                      },
                    }}
                    onClick={() => {
                      setSelectedMedicine(medicine._id);
                      setDeleteDialogOpen(true);
                    }}
                  >
                    Delete
                  </Button>
                  <CardContent sx={{ flexGrow: 1, padding: 3 }}>
                    <Typography variant="h6" color="text.primary" mb={2}>
                      {medicine?.name}
                    </Typography>
                    <Typography
                      variant="body2"
                      color={
                        medicine?.donationStatus === "Pending"
                          ? "#00ff11"
                          : "#ff0000"
                      }
                      align="right"
                      sx={{ mb: 2 }}
                    >
                      <strong>{medicine?.donationStatus}</strong>
                    </Typography>
                    <Box sx={{ mb: 2 }}>
                      <Typography variant="body2" color="text.secondary">
                        <strong>Type:</strong> {medicine?.type}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        <strong>Expiration:</strong>{" "}
                        {new Date(
                          medicine?.expirationDate
                        ).toLocaleDateString()}
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
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      )}

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
      >
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this medicine? This action cannot be
            undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => setDeleteDialogOpen(false)}
            color="secondary"
            variant="outlined"
          >
            Cancel
          </Button>
          <Button
            onClick={() => handleDelete(selectedMedicine)}
            color="error"
            variant="contained"
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default DonorDetail;
