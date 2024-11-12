// ImageUploadBox.js
import React, { useState } from "react";
import { Grid, Box, Typography, Button, CircularProgress } from "@mui/material";
import Tesseract from "tesseract.js";
import { parse, isAfter, format } from "date-fns";

const ImageUploadBox = ({ setImage, userDate, boxHeight = 200 }) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [preview, setPreview] = useState(null);

  //   const [userDate, setUserDate] = useState("12-12-2005");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Handle image upload
  const handleImageUpload = (event) => {
    setError("");
    const file = event.target.files[0];
    if (file) {
      setSelectedImage(file);
      setImage(file);

      // Create a preview URL for the selected image
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
      // checkDate();
    }
  };

  // const detectDates = (paragraph) => {
  //   console.log("🚀 ~ detectDates ~ paragraph:", paragraph);
  //   const datePatterns = [
  //     /\b(\d{2})[\/\-](\d{2})[\/\-](\d{2})\b/g, // DD/MM/YY or MM/DD/YY
  //     /\b(\d{2})[\/\-](\d{2})\b/g, // MM/YY or DD/YY
  //     /\b(\d{4})[\/\-](\d{2})[\/\-](\d{2})\b/g, // YYYY/MM/DD or YYYY/DD/MM
  //     /\b(\d{2})[\/\-](\d{2})[\/\-](\d{4})\b/g, // DD/MM/YYYY or MM/DD/YYYY
  //     /\b(\d{4})[\/\-](\d{2})\b/g, // YYYY/MM or YYYY/DD
  //   ];

  //   const detectedDates = [];

  //   // Loop through all patterns
  //   datePatterns.forEach((pattern) => {
  //     let match;
  //     while ((match = pattern.exec(paragraph)) !== null) {
  //       detectedDates.push(match[0]); // Add matched date to the array
  //     }
  //   });

  //   return detectedDates;
  // };

  // const checkDate = async () => {
  //   setLoading(true);
  //   try {
  //     const result = await Tesseract.recognize(selectedImage);
  //     const dates = detectDates(result?.data.text);

  //     if (!dates?.length) {
  //       setError("No matching expiry date found in the image.");
  //     }

  //     let isMatchFound = false;
  //     dates?.forEach((dateStr) => {
  //       // console.log("🚀 ~ matches.forEach ~ dateStr:", dateStr);
  //       if (compareDates(dateStr, userDate)) {
  //         isMatchFound = true;
  //       }
  //     });

  //     if (!isMatchFound) {
  //       setError("No matching expiry date match found in the image.");
  //     }

  //     if (isMatchFound) {
  //       setImage(selectedImage);
  //     }
  //   } catch (err) {
  //     console.log("🚀 ~ checkDate ~ err:", err);
  //   } finally {
  //     setLoading(false);
  //   }

  //   // Tesseract.recognize(selectedImage, "eng", {
  //   //   //   logger: (m) => console.log(m),
  //   // })
  //   //   .then(({ data: { text } }) => {
  //   //     // console.log("OCR Result:", text);

  //   //     // Use a regex to capture all potential date formats
  //   //     const dateRegex = /(\d{1,2}[\/\-]\d{1,2}[\/\-]\d{2,4})/g;
  //   //     const matches = text.match(dateRegex);

  //   //     if (matches && matches.length > 0) {
  //   //       let isMatchFound = false;

  //   //       // Loop through all found dates and try to compare each
  //   //       matches.forEach((dateStr) => {
  //   //         // console.log("🚀 ~ matches.forEach ~ dateStr:", dateStr);
  //   //         if (compareDates(dateStr, userDate)) {
  //   //           isMatchFound = true;
  //   //         }
  //   //       });
  //   //       console.log("🚀   ~ .then ~ isMatchFound:", isMatchFound);

  //   //       if (!isMatchFound) {
  //   //         setError("No matching expiry date found in the image.");
  //   //       }

  //   //       if (isMatchFound) {
  //   //         setImage(selectedImage);
  //   //       }
  //   //     } else {
  //   //       setError("No valid date found in the image.");
  //   //     }
  //   //     setLoading(false);
  //   //   })
  //   //   .catch((err) => {
  //   //     console.error("OCR Error:", err);
  //   //     setError("Failed to process the image.");
  //   //     setLoading(false);
  //   //   });
  // };

  // const compareDates = (extracted, userInput) => {
  //   try {
  //     const extractedDate = extracted.replace(/\//g, "-");
  //     const userDate = userInput;
  //     const convertDateFormat = (dateString) => {
  //       const [year, month, day] = dateString.split("-");
  //       return `${month}-${day}-${year}`;
  //     };

  //     console.log(
  //       "🚀 ~ compareDates ~ extractedDate == userDate:",
  //       convertDateFormat(extractedDate),
  //       userDate
  //     );
  //     if (extractedDate == userDate) {
  //       return true;
  //     } else {
  //       return false;
  //     }
  //   } catch (err) {
  //     console.error("Date Comparison Error:", err);
  //     setError("Failed to parse dates.");
  //     return false;
  //   }
  // };

  //   const checkDate = () => {
  //     Tesseract.recognize(selectedImage, "eng", {
  //       logger: (m) => console.log(m),
  //     })
  //       .then(({ data: { text } }) => {
  //         console.log("OCR Result:", text);
  //         // Extract date from text using regex (assuming date format is MM/DD/YYYY or similar)
  //         const dateRegex = /(\d{1,2}[\/\-]\d{1,2}[\/\-]\d{2,4})/;
  //         const match = text.match(dateRegex);
  //         if (match && match[1]) {
  //           setExtractedDate(match[1]);
  //           console.log("🚀 ~ .then ~ match[1]:", match, userDate);
  //           //   compareDates(match[1], userDate);
  //         } else {
  //           setError("No valid date found in the image.");
  //         }
  //         setLoading(false);
  //       })
  //       .catch((err) => {
  //         console.error("OCR Error:", err);
  //         setError("Failed to process the image.");
  //         setLoading(false);
  //       });
  //   };

  //   const compareDates = (extracted, userInput) => {
  //     try {
  //       // Parse dates
  //       const extractedParsed = parse(extracted, "MM-dd-yyyy", new Date());
  //       const userParsed = parse(userInput, "yyyy-MM-dd", new Date());

  //       console.log(
  //         "🚀 ~ compareDates ~ formattedExtracted:",
  //         extracted,
  //         userInput,
  //         extractedParsed,
  //         userParsed
  //       );
  //       return;
  //       // Format dates for consistency
  //       const formattedExtracted = format(extractedParsed, "yyyy-MM-dd");
  //       const formattedUser = format(userParsed, "yyyy-MM-dd");

  //       // Compare dates
  //       if (isAfter(extractedParsed, userParsed)) {
  //         setMatchResult(
  //           `The medicine expires on ${formattedExtracted}, which is after the entered date ${formattedUser}.`
  //         );
  //       } else if (formattedExtracted === formattedUser) {
  //         setMatchResult(
  //           `The medicine expires on the same date as entered: ${formattedExtracted}.`
  //         );
  //       } else {
  //         setMatchResult(
  //           `The medicine expired on ${formattedExtracted}, which is before the entered date ${formattedUser}.`
  //         );
  //       }
  //     } catch (err) {
  //       console.error("Date Comparison Error:", err);
  //       setError("Failed to parse dates.");
  //     }
  //   };

  return (
    <>
      {loading && <CircularProgress size={20} />}
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        sx={{ mt: 2 }}
      >
        {error && (
          <Typography color={"red"} mb={1}>
            {error}
          </Typography>
        )}
        <Grid item xs={12} sm={8} md={6}>
          <Box
            component="label"
            htmlFor="image-upload"
            sx={{
              border: "2px dashed #58869e",
              borderRadius: 2,
              padding: 4,
              textAlign: "center",
              cursor: "pointer",
              transition: "background-color 0.3s, border-color 0.3s",
              "&:hover": {
                backgroundColor: "#f5f5f5",
                borderColor: "#3f51b5",
              },
              position: "relative",
              height: boxHeight,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              overflow: "hidden",
            }}
          >
            <input
              id="image-upload"
              type="file"
              accept="image/*"
              hidden
              onChange={handleImageUpload}
            />

            {preview ? (
              <Box
                component="img"
                src={preview}
                alt="Selected"
                sx={{
                  maxWidth: "100%",
                  maxHeight: "100%",
                  objectFit: "cover",
                  borderRadius: 2,
                }}
              />
            ) : (
              // Display Upload Prompt
              <Typography variant="h6" color="#58869e">
                Click or Drag & Drop to Upload Medicine Image
              </Typography>
            )}
          </Box>
        </Grid>
      </Grid>
    </>
  );
};

export default ImageUploadBox;
