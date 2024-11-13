// import React from "react";
// import {
//   Box,
//   Typography,
//   Card,
//   CardContent,
//   CardMedia,
//   Chip,
//   Grid,
//   Button,
// } from "@mui/material";
// import WhatsAppIcon from "@mui/icons-material/WhatsApp";
// import AccessTimeIcon from "@mui/icons-material/AccessTime";
// import MedicationIcon from "@mui/icons-material/Medication";
// import PriceCheckIcon from "@mui/icons-material/PriceCheck";
// import { Link } from "react-router-dom";

// import Navbar from "../Navbar";
// import Footer from "../Footer";
// // Helper function to format the date
// const formatDate = (dateStr) => {
//   return new Intl.DateTimeFormat("en-GB", {
//     day: "2-digit",
//     month: "2-digit",
//     year: "2-digit",
//   }).format(new Date(dateStr));
// };

// const MedicineDetail = ({ data }) => {
//   const {
//     name,
//     type,
//     manufacturer,
//     batchNumber,
//     dosage,
//     expirationDate,
//     price,
//     quantityAvailable,
//     description,
//     donationStatus,
//     donor,
//   } = data;

//   return (
//     <>
//       <Navbar title="Helping Hands" />
//       <Container>
//         <Card
//           sx={{
//             maxWidth: 800,
//             margin: "auto",
//             mt: 5,
//             boxShadow: "0px 8px 20px rgba(0, 0, 0, 0.1)",
//             borderRadius: 3,
//             padding: 3,
//           }}
//         >
//           <CardMedia
//             component="img"
//             height="200"
//             image="/medicine-placeholder.jpg" // Placeholder for image
//             alt={name}
//             sx={{ borderRadius: 2 }}
//           />
//           <CardContent>
//             <Typography variant="h4" component="div" gutterBottom>
//               {name}
//             </Typography>

//             <Grid container spacing={3}>
//               {/* Medicine Information */}
//               <Grid item xs={12} sm={6}>
//                 <Box display="flex" alignItems="center" mb={1}>
//                   <MedicationIcon sx={{ mr: 1, color: "primary.main" }} />
//                   <Typography variant="body1" color="text.secondary">
//                     <strong>Type:</strong> {type}
//                   </Typography>
//                 </Box>
//                 <Box display="flex" alignItems="center" mb={1}>
//                   <Typography variant="body1" color="text.secondary">
//                     <strong>Manufacturer:</strong> {manufacturer}
//                   </Typography>
//                 </Box>
//                 <Box display="flex" alignItems="center" mb={1}>
//                   <Typography variant="body1" color="text.secondary">
//                     <strong>Batch Number:</strong> {batchNumber}
//                   </Typography>
//                 </Box>
//                 <Box display="flex" alignItems="center" mb={1}>
//                   <Typography variant="body1" color="text.secondary">
//                     <strong>Dosage:</strong> {dosage}
//                   </Typography>
//                 </Box>
//               </Grid>

//               {/* Additional Information */}
//               <Grid item xs={12} sm={6}>
//                 <Box display="flex" alignItems="center" mb={1}>
//                   <AccessTimeIcon sx={{ mr: 1, color: "error.main" }} />
//                   <Typography variant="body1" color="text.secondary">
//                     <strong>Expiration Date:</strong>{" "}
//                     {formatDate(expirationDate)}
//                   </Typography>
//                 </Box>
//                 <Box display="flex" alignItems="center" mb={1}>
//                   <PriceCheckIcon sx={{ mr: 1, color: "success.main" }} />
//                   <Typography variant="body1" color="text.secondary">
//                     <strong>Price:</strong> ${price}
//                   </Typography>
//                 </Box>
//                 <Box display="flex" alignItems="center" mb={1}>
//                   <Typography variant="body1" color="text.secondary">
//                     <strong>Quantity Available:</strong> {quantityAvailable}
//                   </Typography>
//                 </Box>
//                 <Box display="flex" alignItems="center" mb={1}>
//                   <Typography variant="body1" color="text.secondary">
//                     <strong>Status:</strong>
//                     <Chip
//                       label={donationStatus}
//                       color={
//                         donationStatus === "Pending"
//                           ? "warning"
//                           : donationStatus === "Approved"
//                           ? "success"
//                           : "error"
//                       }
//                       sx={{ ml: 1 }}
//                     />
//                   </Typography>
//                 </Box>
//               </Grid>
//             </Grid>

//             {/* Medicine Description */}
//             <Typography variant="body1" color="text.secondary" mt={2}>
//               <strong>Description:</strong> {description}
//             </Typography>

//             {/* Donor Information */}
//             <Box mt={4}>
//               <Typography variant="h5" component="div" gutterBottom>
//                 Donor Information
//               </Typography>
//               <Typography variant="body1" color="text.secondary">
//                 <strong>Name:</strong> {donor.name}
//               </Typography>
//               <Typography variant="body1" color="text.secondary">
//                 <strong>Email:</strong> {donor.email}
//               </Typography>
//               <Box display="flex" alignItems="center" mt={1}>
//                 <Typography variant="body1" color="text.secondary">
//                   <strong>Phone:</strong>
//                 </Typography>
//                 <Button
//                   startIcon={<WhatsAppIcon sx={{ color: "#25D366" }} />}
//                   sx={{ ml: 1 }}
//                   component={Link}
//                   to={`https://wa.me/${donor.phone}`}
//                   target="_blank"
//                   rel="noopener noreferrer"
//                 >
//                   {donor.phone}
//                 </Button>
//               </Box>
//               <Typography variant="body1" color="text.secondary">
//                 <strong>Address:</strong> {donor.address}
//               </Typography>
//             </Box>
//           </CardContent>
//         </Card>
//       </Container>
//       <Footer />
//     </>
//   );
// };

// export default MedicineDetail;

import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  CardMedia,
  Chip,
  Grid,
  Button,
  CircularProgress,
  Divider,
} from "@mui/material";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import PriceCheckIcon from "@mui/icons-material/PriceCheck";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Link, useNavigate, useParams } from "react-router-dom";

import Navbar from "../Navbar";
import Footer from "../Footer";
import { useApiManager } from "../../apiManager/apiManager";
import logoMed from "../../assets/images/pic.jpg";
import { getImageUrl } from "../../helpers/getImageUrl";

// Helper function to format the date
const formatDate = (dateStr) => {
  return new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "2-digit",
    year: "2-digit",
  }).format(new Date(dateStr));
};

const MedicineDetail = () => {
  const { id } = useParams(); // Fetching medicine ID from URL params
  const apiManager = useApiManager();
  const navigate = useNavigate();
  const [medicineData, setMedicineData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch medicine data from API
  useEffect(() => {
    const fetchMedicineData = async () => {
      setLoading(true);
      const { data, error } = await apiManager.get(`/medicines/${id}`);
      if (error) {
        setError("Failed to load data. Please try again.");
        return;
      }

      setMedicineData(data?.data);
      setLoading(false);
    };

    fetchMedicineData();
  }, [id]);

  if (loading) {
    return (
      <>
        <Navbar title="Helping Hands" />
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
          }}
        >
          <CircularProgress />
        </Box>
        <Footer />
      </>
    );
  }

  if (error) {
    return (
      <>
        <Navbar title="Helping Hands" />
        <Button
          sx={{
            mt: { sm: 5, xs: 3 },
            ml: { sm: 5, xs: 2 },
            mb: 4,
            radius: "40px",
          }}
          onClick={() => navigate(-1)}
        >
          <ArrowBackIcon />
        </Button>
        <Typography variant="h6" color="error" align="center" height="50vh">
          {error}
        </Typography>
        <Footer />
      </>
    );
  }

  const {
    name,
    type,
    manufacturer,
    batchNumber,
    dosage,
    expirationDate,
    price,
    quantityAvailable,
    description,
    donationStatus,
    donor,
    image,
    frontImage,
  } = medicineData;

  return (
    <>
      <Navbar title="Helping Hands" />
      <Button
        sx={{
          mt: { sm: 5, xs: 3 },
          ml: { sm: 5, xs: 2 },
          radius: "40px",
        }}
        onClick={() => navigate(-1)}
      >
        <ArrowBackIcon />
      </Button>
      <Card
        sx={{
          maxWidth: 800,
          margin: "auto",
          mt: 3,
          boxShadow: "0px 8px 20px rgba(0, 0, 0, 0.1)",
          borderRadius: 3,
          padding: 3,
        }}
      >
        <CardMedia
          component="img"
          height="200"
          image={getImageUrl(frontImage ?? image)} // Placeholder for image
          alt={name}
          sx={{ borderRadius: 2 }}
        />
        <Divider sx={{ mt: "20px" }} />
        <CardContent>
          <Typography variant="h4" component="div" gutterBottom>
            {name}
          </Typography>

          <Grid container spacing={3}>
            {/* Medicine Information */}
            <Grid item xs={12} sm={6}>
              <Box display="flex" alignItems="center" mb={1}>
                <Typography variant="body1" color="text.secondary">
                  <strong>Type:</strong> {type}
                </Typography>
              </Box>
              <Box display="flex" alignItems="center" mb={1}>
                <Typography variant="body1" color="text.secondary">
                  <strong>Manufacturer:</strong> {manufacturer}
                </Typography>
              </Box>
              <Box display="flex" alignItems="center" mb={1}>
                <Typography variant="body1" color="text.secondary">
                  <strong>Batch Number:</strong> {batchNumber}
                </Typography>
              </Box>
              <Box display="flex" alignItems="center" mb={1}>
                <Typography variant="body1" color="text.secondary">
                  <strong>Dosage:</strong> {dosage}
                </Typography>
              </Box>
            </Grid>
            {/* Additional Information */}
            <Grid item xs={12} sm={6}>
              <Box display="flex" alignItems="center" mb={1}>
                <AccessTimeIcon sx={{ mr: 1, color: "error.main" }} />
                <Typography variant="body1" color="text.secondary">
                  <strong>Expiration Date:</strong> {formatDate(expirationDate)}
                </Typography>
              </Box>
              <Box display="flex" alignItems="center" mb={1}>
                <PriceCheckIcon sx={{ mr: 1, color: "success.main" }} />
                <Typography variant="body1" color="text.secondary">
                  <strong>Price:</strong> ${price}
                </Typography>
              </Box>
              <Box display="flex" alignItems="center" mb={1}>
                <Typography variant="body1" color="text.secondary">
                  <strong>Quantity Available:</strong> {quantityAvailable}
                </Typography>
              </Box>
              <Box display="flex" alignItems="center" mb={1}>
                <Typography variant="body1" color="text.secondary">
                  <strong>Status:</strong>
                  <Chip
                    label={donationStatus}
                    color={
                      donationStatus === "Pending"
                        ? "warning"
                        : donationStatus === "Approved"
                        ? "success"
                        : "error"
                    }
                    sx={{ ml: 1 }}
                  />
                </Typography>
              </Box>
            </Grid>
          </Grid>
          <Divider sx={{ mt: "20px" }} />

          {/* Medicine Description */}
          <Typography variant="body1" color="text.secondary" mt={2}>
            <strong>Description:</strong> {description}
          </Typography>
          <Divider sx={{ mt: "20px" }} />

          {frontImage && (
            <>
              <Typography variant="body1" color="text.secondary" mt={2}>
                <strong>Expiry Image:</strong>
              </Typography>

              <CardMedia
                component="img"
                height="200"
                image={getImageUrl(image)} // Placeholder for image
                alt={name}
                sx={{ borderRadius: 2 }}
              />
              <Divider sx={{ mt: "20px", mb: "6px" }} />
            </>
          )}

          {/* Donor Information */}
          <Box mt={4}>
            <Typography variant="h5" component="div" gutterBottom>
              Donor Information
            </Typography>
            <Typography variant="body1" color="text.secondary">
              <strong>Name:</strong> {donor.name}
            </Typography>
            <Typography variant="body1" color="text.secondary">
              <strong>Email:</strong> {donor.email}
            </Typography>
            <Box display="flex" alignItems="center" mt={1}>
              <Typography variant="body1" color="text.secondary">
                <strong>Phone:</strong>
              </Typography>
              <Button
                startIcon={<WhatsAppIcon sx={{ color: "#25D366" }} />}
                sx={{ ml: 1 }}
                component={Link}
                to={`https://wa.me/${donor.phone}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                {donor.phone}
              </Button>
            </Box>
            <Typography variant="body1" color="text.secondary">
              <strong>Address:</strong> {donor.address}
            </Typography>
          </Box>
        </CardContent>
      </Card>
      <Footer />
    </>
  );
};

export default MedicineDetail;
