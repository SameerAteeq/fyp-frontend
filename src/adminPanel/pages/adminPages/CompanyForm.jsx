// components/CompanyForm.js
import React, { useState, useEffect } from "react";
import {
  Box,
  TextField,
  Button,
  Grid,
  Paper,
  Typography,
  CircularProgress,
  Alert,
} from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useApiManager } from "../../../apiManager/apiManager";
import { useDispatch } from "react-redux";
import { showToast } from "../../../store/reducer";

const CompanyForm = () => {
  const { id } = useParams(); // Get the company ID from URL params
  const navigate = useNavigate();
  const isEditMode = Boolean(id); // Determine if it's edit mode
  const apiManager = useApiManager();
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    name: "",
    address: "",
    contactNumber: "",
  });

  const [loading, setLoading] = useState(false); // For form submission
  const [fetching, setFetching] = useState(false); // For fetching existing data
  const [error, setError] = useState(null); // For error messages
  const [success, setSuccess] = useState(null); // For success messages

  useEffect(() => {
    if (isEditMode) {
      fetchCompanyData();
    }
    // eslint-disable-next-line
  }, [id]);

  const fetchCompanyData = async () => {
    setFetching(true);
    try {
      // const response = await axios.get(`http://localhost:4000/company/${id}`);

      const { data, error } = await apiManager.get(`/admin/company/${id}`);
      if (error) {
        dispatch(
          showToast({
            message: error,
            severity: "error",
          })
        );
      }
      const { name, address, contactNumber } = data?.company;
      setFormData({ name, address, contactNumber });
      setFetching(false);
    } catch (err) {
      console.error("Error fetching company data:", err);
      setError("Failed to fetch company data.");
      setFetching(false);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validate = () => {
    const { name, address, contactNumber } = formData;
    if (!name || !address || !contactNumber) {
      setError("All fields are required.");
      return false;
    }
    // Simple phone number validation
    // const phoneRegex = /^[0-9]{10}$/;
    // if (!phoneRegex.test(contactNumber)) {
    //   setError("Contact Number must be a 10-digit number.");
    //   return false;
    // }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if (!validate()) return;

    setLoading(true);
    try {
      if (isEditMode) {
        // Update existing company
        // await axios.put(`http://localhost:4000/admin/company/${id}`, formData);
        await apiManager.put(`/admin/company/${id}`, formData);
      } else {
        // Add new company
        await apiManager.post(`/admin/company`, formData);
        setFormData({ name: "", address: "", contactNumber: "" });
      }
      setLoading(false);

      dispatch(
        showToast({
          message: `Company ${isEditMode ? "Update" : "Added"} successfully`,
          severity: "success",
        })
      );
    } catch (err) {
      console.error("Error submitting form:", err);
      dispatch(
        showToast({
          message: error,
          severity: "error",
        })
      );
      setLoading(false);
    }
  };

  return (
    <Box sx={{ width: "100%", mt: 4 }}>
      <Button
        variant="outlined"
        startIcon={<ArrowBackIcon />}
        onClick={() => navigate("/admin/company")}
      >
        Back to company
      </Button>
      <Paper sx={{ padding: 4, maxWidth: 600, margin: "auto" }} elevation={3}>
        <Typography variant="h5" gutterBottom align="center">
          {isEditMode ? "Update Company" : "Add New Company"}
        </Typography>

        {fetching ? (
          <Box sx={{ display: "flex", justifyContent: "center", my: 4 }}>
            <CircularProgress />
          </Box>
        ) : (
          <form onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              {/* Name Field */}
              <Grid item xs={12}>
                <TextField
                  label="Company Name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  fullWidth
                  required
                />
              </Grid>

              {/* Address Field */}
              <Grid item xs={12}>
                <TextField
                  label="Address"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  fullWidth
                  required
                />
              </Grid>

              {/* Contact Number Field */}
              <Grid item xs={12}>
                <TextField
                  label="Contact Number"
                  name="contactNumber"
                  value={formData.contactNumber}
                  onChange={handleChange}
                  fullWidth
                  required
                  inputProps={{ maxLength: 10 }}
                />
              </Grid>

              {/* Error Message */}
              {error && (
                <Grid item xs={12}>
                  <Alert severity="error">{error}</Alert>
                </Grid>
              )}

              {/* Success Message */}
              {success && (
                <Grid item xs={12}>
                  <Alert severity="success">{success}</Alert>
                </Grid>
              )}

              {/* Submit Button */}
              <Grid item xs={12} sx={{ textAlign: "center" }}>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  disabled={loading}
                >
                  {loading
                    ? isEditMode
                      ? "Updating..."
                      : "Adding..."
                    : isEditMode
                    ? "Update Company"
                    : "Add Company"}
                </Button>
              </Grid>
            </Grid>
          </form>
        )}
      </Paper>
    </Box>
  );
};

export default CompanyForm;
