import React, { useState } from "react";
import { Container, Typography, Button, Box } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

import ImageUploadBox from "../../components/chatBot/imageUploadBox";
import Navbar from "../../adminPanel/components/Navbar";
import Footer from "../Footer";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { LoadingButton } from "@mui/lab";
import { detectTextFromImageFile } from "../../helpers/readImageText";

const MedicinePrescibe = () => {
  const [imageObj, setImageObj] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [searchParam] = useSearchParams();

  const navigate = useNavigate();
  const { id } = useParams();

  // Assuming detectTextFromImageFile is already defined as per previous messages

  const handleImageUpload = async (event) => {
    if (!imageObj) return;

    setLoading(true);

    try {
      // Use the helper function to detect text
      const textDetections = await detectTextFromImageFile(imageObj);

      // Process the detected text if needed
      checkMedicine(textDetections); // Pass detected text to `checkMedicine`
    } catch (err) {
      console.error("Error processing the image:", err);
      // Handle error as needed
    } finally {
      setLoading(false);
    }
  };

  const checkMedicine = (TextDetections) => {
    const medName = searchParam.get("med");

    const isMedicine = TextDetections?.find((text) => {
      return text.DetectedText.toLowerCase().includes(medName.toLowerCase());
    });

    if (isMedicine) {
      navigate(`/user/medicine/detail/${id}`);
    } else {
      setError(true);
    }
  };

  return (
    <>
      <Navbar title="Helping Hands" />
      <Container sx={{ mt: 10 }} maxWidth="md">
        <Button
          sx={{ mt: { md: 5, sm: 3 }, ml: { md: 5, sm: 2 }, radius: "40px" }}
          onClick={() => navigate(-1)}
        >
          <ArrowBackIcon />
        </Button>
        <Typography variant="h4" align="center" gutterBottom>
          Upload Your Prescribed Medicine
        </Typography>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            marginBottom: 4,
          }}
        >
          <ImageUploadBox
            setImage={(imgObj) => (setError(false), setImageObj(imgObj))}
            boxHeight={300}
          />
        </Box>
        {error && (
          <Typography variant="body2" align="center" gutterBottom color="error">
            The medicine which prescribe you is not match.
          </Typography>
        )}
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <LoadingButton
            fullWidth
            variant="contained"
            loading={loading}
            onClick={handleImageUpload}
            sx={{ mt: 1, maxWidth: "300px", color: "primary.light" }} // Add margin-top for spacing
          >
            Verify Medicine
          </LoadingButton>
        </Box>
      </Container>
      <Footer />
    </>
  );
};

export default MedicinePrescibe;
