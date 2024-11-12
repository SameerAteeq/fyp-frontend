import React, { useState } from "react";
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
import { useNavigate } from "react-router-dom";
import ImageUploadBox from "../../components/chatBot/imageUploadBox";
import { extractAndValidateDate } from "../../helpers/checkExpiryOfMedicine";
import { detectTextFromImageFile } from "../../helpers/readImageText";

const AddMedicine = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const apiManager = useApiManager();
  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    type: "Tablet",
    manufacturer: "",
    batchNumber: "",
    dosage: "",
    expirationDate: "",
    price: "",
    quantityAvailable: "",
    description: "",
    donationStatus: "Pending",
    image: "",
  });

  // Form validation
  const validateForm = () => {
    if (
      !formData.name ||
      !formData.type ||
      !formData.manufacturer ||
      !formData.batchNumber ||
      !formData.dosage ||
      !formData.expirationDate ||
      !formData.price ||
      !formData.quantityAvailable ||
      !formData.description ||
      !formData.donationStatus ||
      !formData.image
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
    try {
      setIsLoading(true);

      // Validate form data
      if (validateForm()) {
        dispatch(
          showToast({
            message: "All Fields are required",
            severity: "error",
          })
        );
        return;
      }

      // Check if image is provided in formData and detect text if available
      if (formData.image && formData.image instanceof File) {
        // Use the helper function to detect text from the image
        const textDetections = await detectTextFromImageFile(formData.image);
        console.log("Detected text in image:", textDetections);

        const isDateMatch = extractAndValidateDate(
          textDetections,
          formData.expirationDate
        );
        console.log("🚀 ~ handleSubmit ~ isDateMatch:", isDateMatch);

        if (!isDateMatch) {
          dispatch(
            showToast({
              message: "No matching expiry date found in the image.",
              severity: "error",
            })
          );

          return;
        }
      }

      // Proceed with API call for form submission
      const { error } = await apiManager.post("/medicines", formData, {
        "Content-Type": "multipart/form-data",
      });

      if (error) {
        dispatch(
          showToast({
            message: error,
            severity: "error",
          })
        );
        return;
      }

      // Reset form data upon success
      setFormData({
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
      });

      dispatch(
        showToast({
          message: "Medicine added successfully",
          severity: "success",
        })
      );
    } catch (error) {
      console.error("Error adding medicine", error);
      dispatch(
        showToast({
          message: "An error occurred while adding the medicine",
          severity: "error",
        })
      );
    } finally {
      setIsLoading(false);
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
          Add Medicine
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
              <ImageUploadBox
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
                Submit
              </LoadingButton>
            </Grid>
          </Grid>
        </Paper>
      </Container>
      <Footer />
    </>
  );
};

export default AddMedicine;
