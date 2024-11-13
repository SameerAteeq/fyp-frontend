import React, { useState, useEffect } from "react";
import {
  Container,
  TextField,
  Button,
  Grid,
  Typography,
  MenuItem,
  Paper,
} from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useDispatch } from "react-redux";

import Navbar from "../Navbar";
import Footer from "../Footer";
import { showToast } from "../../store/reducer";
import { useApiManager } from "../../apiManager/apiManager";
import { useNavigate, useParams } from "react-router-dom";
import ImageUploadBox from "../../components/chatBot/imageUploadBox";

const UpdateMedicine = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams(); // Assuming the medicine ID is passed in the URL
  const apiManager = useApiManager();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    type: "",
    manufacturer: "",
    batchNumber: "",
    dosage: "",
    expirationDate: "",
    price: "",
    quantityAvailable: "",
    description: "",
    donationStatus: "",
    image: "",
    frontImage: "",
  });

  // Fetch medicine data on load
  useEffect(() => {
    const fetchMedicine = async () => {
      setIsLoading(true);
      try {
        const { data, error } = await apiManager.get(`/medicines/${id}`);
        if (error) {
          dispatch(
            showToast({
              message: error,
              severity: "error",
            })
          );
          return;
        }
        setFormData(data?.data); // Set the form data with the fetched medicine
      } catch (error) {
        console.error("Error fetching medicine", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMedicine();
  }, [id]);

  // Form validation
  const validateForm = () => {
    if (
      (!formData.name ||
        !formData.type ||
        !formData.manufacturer ||
        !formData.batchNumber ||
        !formData.dosage ||
        !formData.expirationDate ||
        !formData.price ||
        !formData.quantityAvailable ||
        !formData.description ||
        !formData.donationStatus ||
        !formData.image,
      !formData.frontImage)
    )
      return true;
    return false;
  };

  // Handler for input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    // Handle the form submission logic here
    if (validateForm()) {
      dispatch(
        showToast({
          message: "All Fields are required",
          severity: "error",
        })
      );
      return;
    }
    setIsLoading(true);
    try {
      // API call using the useApiManager hook
      const { data, error } = await apiManager.put(
        `/medicines/${id}`,
        formData,
        { "Content-Type": "multipart/form-data" }
      ); // Use PUT method for update

      if (error) {
        dispatch(
          showToast({
            message: error,
            severity: "error",
          })
        );
        return;
      }

      // Success - Reset form or redirect
      console.log("Medicine updated successfully", data);
      dispatch(
        showToast({
          message: "Medicine updated successfully",
        })
      );
    } catch (error) {
      console.error("Error updating medicine", error);
      dispatch(
        showToast({
          message: error,
          severity: "error",
        })
      );
    } finally {
      setIsLoading(false); // Stop loading
    }
  };

  return (
    <>
      <Navbar title="Helping Hands" />
      <Container maxWidth={false}>
        <Button
          sx={{ mt: { sm: 5, xs: 3 }, ml: { sm: 5, xs: 2 }, radius: "40px" }}
          onClick={() => navigate(-1)}
        >
          <ArrowBackIcon />
        </Button>
        <Typography variant="h4" align="center" gutterBottom mt={5} mb={3}>
          Update Medicine
        </Typography>
        <Paper
          sx={{
            maxWidth: 600,
            m: "0 auto",
            padding: { sm: "40px", xs: "20px" },
          }}
          elevation={24}
        >
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                variant="standard"
                label="Name"
                name="name"
                value={formData.name}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                select
                variant="standard"
                label="Medicine Type"
                name="type"
                value={formData.type}
                onChange={handleChange}
              >
                {[
                  "Tablet",
                  "Syrup",
                  "Injection",
                  "Capsule",
                  "Cream",
                  "Drops",
                ].map((item, i) => (
                  <MenuItem value={item} key={i}>
                    {item}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                variant="standard"
                label="Manufacturer"
                name="manufacturer"
                value={formData.manufacturer}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                variant="standard"
                label="Batch Number"
                name="batchNumber"
                value={formData.batchNumber}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                variant="standard"
                label="Dosage"
                name="dosage"
                value={formData.dosage}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                variant="standard"
                label="Expiration Date"
                name="expirationDate"
                type="date"
                value={formData.expirationDate}
                onChange={handleChange}
                InputLabelProps={{
                  shrink: true, // Ensures the label doesn't overlap with the date picker
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                variant="standard"
                label="Price"
                name="price"
                type="number"
                value={formData.price}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                variant="standard"
                label="Quantity Available"
                name="quantityAvailable"
                type="number"
                value={formData.quantityAvailable}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                variant="standard"
                label="Description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                multiline
                rows={3}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                select
                variant="standard"
                label="Donation Status"
                name="donationStatus"
                value={formData.donationStatus}
                onChange={handleChange}
              >
                <MenuItem value="Pending">Pending</MenuItem>
                <MenuItem value="Distributed">Distributed</MenuItem>
              </TextField>
            </Grid>
            <Grid item xs={12}>
              <Typography>Front Image</Typography>
              <ImageUploadBox
                uploadText="Click or Drag & Drop to Update Medicine Front Image"
                fieldName="frontImage" // Specify which field to update
                setImage={(imgObj) =>
                  setFormData((prevData) => ({
                    ...prevData,
                    frontImage: imgObj,
                  }))
                }
              />
            </Grid>
            <Grid item xs={12}>
              <Typography>Expiry Image</Typography>
              <ImageUploadBox
                fieldName="image" // Specify which field to update
                uploadText="Click or Drag & Drop to Update Medicine Expiry Image"
                setImage={(imgObj) =>
                  setFormData((prevData) => ({
                    ...prevData,
                    image: imgObj,
                  }))
                }
                userDate={formData?.expirationDate}
              />
            </Grid>
            <Grid item xs={12}>
              <LoadingButton
                fullWidth
                variant="contained"
                color="primary"
                onClick={handleSubmit}
                sx={{ mt: 2 }}
                loading={isLoading}
                disabled={isLoading}
              >
                Update
              </LoadingButton>
            </Grid>
          </Grid>
        </Paper>
      </Container>
      <Footer />
    </>
  );
};

export default UpdateMedicine;
