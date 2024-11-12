// import React from "react";
// import Sidenav from "../components/Sidenav";
// import Navbar from "../components/Navbar";
// import AccordionDash from "../components/AccordionDash";
// import Box from "@mui/material/Box";
// import Typography from "@mui/material/Typography";
// import Grid from "@mui/material/Grid";
// import Card from "@mui/material/Card";
// import CardContent from "@mui/material/CardContent";
// import Stack from "@mui/material/Stack";
// import "../Dash.css";
// import NotFound from "../../NotFound404";
// import axios from "axios";
// import MedicationIcon from "@mui/icons-material/Medication";
// import CreditCardIcon from "@mui/icons-material/CreditCard";
// // import BarChart from '../charts/BarChart';
// import CountUp from "react-countup";
// import MedicineList from "./medicines/MedicineList";
// import MedicalServicesIcon from "@mui/icons-material/MedicalServices";
// import PeopleIcon from "@mui/icons-material/People";
// import EmojiPeopleIcon from "@mui/icons-material/EmojiPeople";
// const Home = () => {
//   const [rows, setRows] = React.useState([]);
//   const [rows1, setRows1] = React.useState([]);
//   const [rows2, setRows2] = React.useState([]);

//   const [isLoggedIn, setIsLoggedIn] = React.useState(false);
//   React.useEffect(() => {
//     getProductDetails();
//     getProductDetailsDonor();
//     getMedicine();
//     const clientToken = JSON.parse(localStorage.getItem("clientToken")); // Retrieve token object from local storage
//     const token = clientToken?.data; // Extract the token string
//     //   console.log("token",token)
//     if (token) {
//       setIsLoggedIn(token);
//     } else {
//       setIsLoggedIn(false);
//     }
//   }, []);

//   const getProductDetails = async () => {
//     try {
//       const response = () => axios.get("http://localhost:4000/receipient");

//       response().then((res) => {
//         // res?.data?.database

//         console.log("dddddddddddd", res?.data?.length);
//         setRows(res?.data?.length);
//       });
//       // .catch(())
//       // Assuming your API returns an array of objects
//       // setRows(res?.data?.database);
//     } catch (error) {
//       console.error(error);
//       // Handle error, show error message to user, etc.
//     }
//   };
//   const getProductDetailsDonor = async () => {
//     try {
//       const response = () => axios.get("http://localhost:4000/donor");

//       response().then((res) => {
//         // res?.data?.database

//         console.log("contactttt", res?.data?.length);
//         setRows1(res?.data?.length);
//       });
//       // .catch(())
//       // Assuming your API returns an array of objects
//       // setRows(res?.data?.database);
//     } catch (error) {
//       console.error(error);
//       // Handle error, show error message to user, etc.
//     }
//   };
//   const getMedicine = async () => {
//     try {
//       const response = () => axios.get("http://localhost:4000/askDonator");

//       response().then((res) => {
//         // res?.data?.database

//         console.log("contactttt", res?.data?.database?.length);
//         setRows2(res?.data?.database?.length);
//       });
//       // .catch(())
//       // Assuming your API returns an array of objects
//       // setRows(res?.data?.database);
//     } catch (error) {
//       console.error(error);
//       // Handle error, show error message to user, etc.
//     }
//   };
//   return (
//     <>
//       <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
//         <Grid container spacing={2}>
//           <Grid item xs={8}>
//             <Stack spacing={2} direction="row">
//               <Card
//                 sx={{ minWidth: 49 + "%", minHeight: 150 }}
//                 className="gradientlight"
//               >
//                 <CardContent>
//                   <div className="iconstyle">
//                     <MedicationIcon />
//                   </div>
//                   <Typography
//                     gutterBottom
//                     variant="h5"
//                     component="div"
//                     sx={{ color: "#fff" }}
//                   >
//                     <CountUp delay={0.4} end={rows2} duration={0.8} /> Total
//                     Medicines Available
//                   </Typography>
//                 </CardContent>
//               </Card>
//               <Card
//                 sx={{ minWidth: 49 + "%", minHeight: 150 }}
//                 className="gradientlight"
//               >
//                 <CardContent>
//                   <div className="iconstyle">
//                     <PeopleIcon />
//                   </div>
//                   <Typography
//                     gutterBottom
//                     variant="h5"
//                     component="div"
//                     sx={{ color: "#fff" }}
//                   >
//                     <CountUp delay={0.4} end={rows1} duration={0.8} /> Total
//                     Donors
//                   </Typography>
//                 </CardContent>
//               </Card>
//             </Stack>
//           </Grid>
//           <Grid item xs={4}>
//             <Stack spacing={2}>
//               <Card
//                 sx={{ minWidth: 49 + "%", minHeight: 150 }}
//                 className="gradientlight"
//               >
//                 <CardContent>
//                   <div className="iconstyle">
//                     <EmojiPeopleIcon />
//                   </div>
//                   <Typography
//                     gutterBottom
//                     variant="h5"
//                     component="div"
//                     sx={{ color: "#fff" }}
//                   >
//                     <CountUp delay={0.4} end={rows} duration={0.8} /> Total
//                     Recipients
//                   </Typography>
//                 </CardContent>
//               </Card>
//             </Stack>
//           </Grid>
//         </Grid>
//       </Box>
//     </>
//   );
// };

// export default Home;

import React, { useState, useEffect } from "react";
import { Box, Typography, Grid, Card, CardContent, Stack } from "@mui/material";
import CountUp from "react-countup";
import MedicationIcon from "@mui/icons-material/Medication";
import PeopleIcon from "@mui/icons-material/People";
import EmojiPeopleIcon from "@mui/icons-material/EmojiPeople";
import VolunteerActivismIcon from "@mui/icons-material/VolunteerActivism";
import VaccinesIcon from "@mui/icons-material/Vaccines";
import { useApiManager } from "../../apiManager/apiManager";
import { useDispatch } from "react-redux";
import { showToast } from "../../store/reducer";
import "../Dash.css";

const Home = () => {
  const [dashData, setDashData] = useState({
    donorsCount: 0,
    recipientsCount: 0,
    totalDonatedMedicines: 0,
  });

  const apiManager = useApiManager();
  const dispatch = useDispatch();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const { data, error } = await apiManager.get("/admin/dashboard");
      console.log("🚀 ~ fetchData ~ data:", data);
      if (error) {
        dispatch(
          showToast({
            message: error,
            severity: "error",
          })
        );

        return;
      }

      setDashData(data);
    } catch (error) {
      console.error(error);
    }
  };

  const cardData = [
    {
      icon: <VaccinesIcon />,
      count: dashData?.totalDonatedMedicines,
      label: "Total Medicines Available",
    },
    {
      icon: <VolunteerActivismIcon />,
      count: dashData?.donorsCount,
      label: "Total Donors",
    },
    {
      icon: <EmojiPeopleIcon />,
      count: dashData?.recipientsCount,
      label: "Total Recipients",
    },
    {
      icon: <MedicationIcon />,
      count: dashData?.totalMedicineCompanies,
      label: "Total Companies",
    },
  ];

  return (
    <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
      <Grid container spacing={2}>
        {cardData?.map((item, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card sx={{ height: "100%" }} className="gradientlight">
              <CardContent>
                <Stack alignItems="left">
                  <div className="iconstyle">
                    <Typography variant="h6" sx={{ color: "#fff" }}>
                      {item?.icon} {item?.label}
                    </Typography>
                  </div>
                  <Typography variant="h5" sx={{ color: "#fff" }}>
                    <CountUp end={item?.count} duration={0.8} />
                  </Typography>
                </Stack>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Home;
