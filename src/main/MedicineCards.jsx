import React, { useEffect, useState, useRef } from "react";
import {
  Card,
  Button,
  Container,
  Typography,
  CardContent,
  CardMedia,
  CardActions,
  Grid,
  Fab,
  IconButton,
  Box,
  CircularProgress,
} from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { motion, useInView } from "framer-motion";

import Navbar from "./Navbar";
import Footer from "./Footer";
import { useApiManager } from "../apiManager/apiManager";
import logoMed from "../assets/images/pic.jpg";
import { getImageUrl } from "../helpers/getImageUrl";

const About = () => {
  const user = useSelector((state) => state.storeReducer.user);

  const [medicines, setMedicines] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [totalMed, setTotalMed] = useState(null);
  const cardsRef = useRef(null);
  const isInView = useInView(cardsRef, { once: true, margin: "-50px" });

  const apiManager = useApiManager();
  const navigate = useNavigate();

  // Fetch medicines with pagination using useApiManager
  useEffect(() => {
    const fetchMedicines = async () => {
      setIsLoading(true);
      try {
        let url = user
          ? `/medicines?page=${page}`
          : `/medicines/no-auth?page=${page}`;
        const { data, error } = await apiManager.get(url);
        if (error) {
          console.log("🚀 ~ fetchMedicines ~ error:", error);
          return;
        }

        setTotalMed(data?.totalMedicine);
        setMedicines([...medicines, ...data?.data]);
      } catch (error) {
        console.log("🚀 ~ fetchMedicines ~ error:", error);
        setError("Error fetching medicines.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchMedicines();
  }, [page]);

  // Handle Load More button
  const handleLoadMore = () => {
    setPage((prevPage) => prevPage + 1);
  };

  // Handle navigation for updating or getting medicine
  const handleMedicineAction = (actionType, medicine) => {
    if (actionType === "update") {
      navigate(`/user/medicine/update/${medicine?._id}`); // Navigate to update medicine page
    } else if (actionType === "get") {
      // navigate(`/user/medicine/detail/${medicine?._id}`);
      navigate(
        `/user/medicine/prescribe/${medicine?._id}?&med=${medicine?.name}`
      );
    }
  };

  const cardsVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
  };

  // If no user is logged in
  // if (!user) {
  //   return (
  //     <>
  //       <Navbar title="Helping Hands" />
  //       <Button
  //         sx={{ mt: { sm: 5, xs: 3 }, ml: { sm: 5, xs: 2 }, radius: "40px" }}
  //         onClick={() => navigate(-1)}
  //       >
  //         <ArrowBackIcon />
  //       </Button>
  //       <Container sx={{ mt: 5, height: "100vh" }}>
  //         <Typography variant="h6" align="center">
  //           Please log in to view available medicines.
  //         </Typography>
  //       </Container>
  //       <Footer />
  //     </>
  //   );
  // }

  return (
    <>
      <Navbar title="Helping Hands" />
      {isLoading ? (
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
      ) : (
        <Container>
          {/* Conditional button for Donor */}
          {user?.role == "Donor" && (
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
              onClick={() => navigate("/user/medicine/add")} // Navigate to Add Medicine page
            >
              <AddIcon />
            </Fab>
          )}

          <Typography variant="h4" align="center" mt={5} mb={5}>
            {user?.role == "Donor" ? "My" : "Available"} Medicines
          </Typography>

          {error ? (
            <Typography variant="h6" color="error" align="center">
              {error}
            </Typography>
          ) : (
            <>
              <Box
                ref={cardsRef}
                component={motion.div}
                sx={{ mb: 4 }}
                initial="hidden"
                animate={!isInView ? "visible" : "hidden"}
                variants={cardsVariants}
                transition={{ duration: 0.6, ease: "easeIn" }}
              >
                <Grid container spacing={4}>
                  {medicines?.map((medicine, index) => (
                    <Grid item key={index} xs={12} sm={6} md={4}>
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
                        {user?.role === "Donor" && (
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
                            onClick={() =>
                              handleMedicineAction("update", medicine)
                            }
                          >
                            <EditIcon sx={{ color: "#1976d2" }} />{" "}
                            {/* Primary color for the edit icon */}
                          </IconButton>
                        )}

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
                              <strong>Batch Number:</strong>{" "}
                              {medicine?.batchNumber}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                              <strong>Manufacturer:</strong>{" "}
                              {medicine?.manufacturer}
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
                            <strong>Description:</strong>{" "}
                            {medicine?.description}
                          </Typography>
                        </CardContent>

                        {/* Card Actions */}
                        {/* Get button for Recipient */}
                        {user?.role === "Recipient" && (
                          <CardActions
                            sx={{
                              display: "flex",
                              justifyContent: "space-between",
                              padding: 2,
                              borderTop: "1px solid #e0e0e0", // Add a border to separate actions
                            }}
                          >
                            <Button
                              variant="contained"
                              color="secondary"
                              onClick={() =>
                                handleMedicineAction("get", medicine)
                              }
                            >
                              Get Medicine
                            </Button>
                          </CardActions>
                        )}
                      </Card>
                    </Grid>
                  ))}
                </Grid>
              </Box>

              {/* Load More button for pagination */}
              {medicines?.length > 0 && medicines?.length < totalMed && (
                <Box sx={{ display: "flex", justifyContent: "center" }}>
                  <LoadingButton
                    sx={{
                      mb: 4,
                      mt: 4,
                    }}
                    onClick={handleLoadMore}
                    loading={isLoading}
                    disabled={isLoading}
                  >
                    Load More
                    {/* {isLoading ? "Loading..." : "Load More"} */}
                  </LoadingButton>
                </Box>
              )}

              {/* No data found message */}
              {!isLoading && medicines?.length === 0 && (
                <Typography variant="h6" align="center" sx={{ mt: 4 }}>
                  No medicines found.
                </Typography>
              )}
            </>
          )}
        </Container>
      )}
      <Footer />
    </>
  );
};

export default About;
