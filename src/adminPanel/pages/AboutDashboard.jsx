import React from 'react'
import Sidenav from '../components/Sidenav'
import Navbar from '../components/Navbar'
import AccordionDash from '../components/AccordionDash'
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Stack from '@mui/material/Stack';
import '../Dash.css'
import MedicationIcon from '@mui/icons-material/Medication';
import CreditCardIcon from '@mui/icons-material/CreditCard';
// import {LineChart}  from '../charts/LineChart';
// import PieChart from '../charts/PieChart';
import CountUp from 'react-countup';
import DonorsList from './medicines/DonorsList';
import PeopleIcon from '@mui/icons-material/People';
import EmojiPeopleIcon from '@mui/icons-material/EmojiPeople';
import axios from 'axios';
import  NotFound from './NotFound404'


const AboutDashboard = () => {
    const [rows, setRows] = React.useState([]);
    const [rows1, setRows1] = React.useState([]);
    const [rows2, setRows2] = React.useState([]);
    
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
    React.useEffect(() => {
        getProductDetails()
        getProductDetailsDonor()
        getMedicine()

        const clientToken = JSON.parse(localStorage.getItem('clientToken')); // Retrieve token object from local storage
        const token = clientToken?.data; // Extract the token string
        //   console.log("token",token)
        if (token){
          setIsLoggedIn(token)
        }
        else{
          setIsLoggedIn(false)
        }
        
        
        
        
        
        
        

     },[])
    
     const getProductDetails = async () => {
      try {
        const response =()=>  axios.get('http://localhost:4000/receipient');
    
        response().then((res)=>{
              // res?.data?.database
              
         console.log('dddddddddddd',res?.data?.length)
         setRows(res?.data?.length)
        });
        // .catch(())
         // Assuming your API returns an array of objects
        // setRows(res?.data?.database);
      } catch (error) {
        console.error(error);
        // Handle error, show error message to user, etc.
      }
    };
    const getProductDetailsDonor = async () => {
        try {
          const response =()=>  axios.get('http://localhost:4000/donor');
      
          response().then((res)=>{
                // res?.data?.database
                
           console.log('contactttt',res?.data?.length)
           setRows1(res?.data?.length)
           
          });
          // .catch(())
           // Assuming your API returns an array of objects
          // setRows(res?.data?.database);
        } catch (error) {
          console.error(error);
          // Handle error, show error message to user, etc.
        }
      };
      const getMedicine = async () => {
        try {
          const response =()=>  axios.get('http://localhost:4000/askDonator');
      
          response().then((res)=>{
                // res?.data?.database
                
           console.log('contactttt',res?.data?.database?.length)
           setRows2(res?.data?.database?.length)
           
          });
          // .catch(())
           // Assuming your API returns an array of objects
          // setRows(res?.data?.database);
        } catch (error) {
          console.error(error);
          // Handle error, show error message to user, etc.
        }
      };
   
    return (
        <>
        {isLoggedIn =='admin' ?(
        

        <div className='bgcolor'>
        <Navbar />
            <Box height={70} />
            <Box sx={{ display: 'flex' }}>
                <Sidenav />
                <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                    <Grid container spacing={2}>
                        <Grid item xs={8}>
                            <Stack spacing={2} direction="row" >
                                <Card sx={{ minWidth: 49 + "%", height: 150}} className='gradientlight'>
                                    <CardContent>
                                        <div className='iconstyle'>
                                        <MedicationIcon/>
                                        </div>
                                        <Typography gutterBottom variant="h5" component="div" sx={{color: '#fff'}}>
                                        <CountUp delay={0.4} end={rows2} duration={0.8} /> Total Medicines Available
                                        </Typography>
                                        {/* <Typography gutterBottom variant="body2" component="div" sx={{color:"#ccd1d1"}}>
                                        Donation of this month at this time
                                        </Typography> */}
                                     
                                    </CardContent>
                                </Card>
                                <Card sx={{ minWidth: 49 + "%", height: 150}} className='gradientlight'>
                                    <CardContent>
                                    <div className='iconstyle'>
                                    <PeopleIcon/>
                                        </div>
                                        <Typography gutterBottom variant="h5" component="div" sx={{color: '#fff'}}>
                                        <CountUp delay={0.4} end={rows1} duration={0.8}/> Total Donors
                                        </Typography>
                                        {/* <Typography gutterBottom variant="body2" component="div" sx={{color:"#ccd1d1"}}>
                                        Collection of this month at this time
                                        </Typography> */}
                                    
                                    </CardContent>
                                </Card>
                            </Stack>
                        </Grid>
                        <Grid item xs={4}>
                            <Stack spacing={2}>
                            <Card sx={{ minWidth: 49 + "%", height: 150}} className='gradientlight'>
                                    <CardContent>
                                    <div className='iconstyle'>
                                    <EmojiPeopleIcon/>
                                        </div>
                                        <Typography gutterBottom variant="h5" component="div" sx={{color: '#fff'}}>
                                        <CountUp delay={0.4} end={rows} duration={0.8}/> Total Recipients 
                                        </Typography>
                                        {/* <Typography gutterBottom variant="body2" component="div" sx={{color:"#ccd1d1"}}>
                                        Collection of this month at this time
                                        </Typography> */}
                                    
                                    </CardContent>
                                </Card>
                                {/* <Card sx={{ maxWidth: 345 }} className='gradientlight'>
                                 
                                    <Stack spacing={2} direction="row"  >
                                        <div className='iconstyle'>
                                        <EmojiPeopleIcon/>
                                        </div>
                                        
                                      <div className='paddingall'>
                                      <span className='pricetitle'><CountUp delay={0.4} end={678} duration={0.8}/> Medicines</span>
                                      <br />
                                      <span className='pricesubtitle'>Total Medicines Available</span>
                                      </div>
                                      </Stack>
                                  
                                </Card>
                                <Card sx={{ maxWidth: 345 }} className='gradientlight'>
                                    
                                    <Stack spacing={2} direction="row"  >
                                        <div className='iconstyleblack'>
                                        <MedicationIcon/>
                                        </div>
                                        
                                      <div className='paddingall'>
                                      <span className='pricetitle'><CountUp delay={0.4} end={107} duration={0.8}/> Medicines</span>
                                      <br />
                                      <span className='pricesubtitle'>Total Medicines Available</span>
                                      </div>
                                      </Stack>
                                   
                                </Card> */}
                            </Stack>
                        </Grid>
                    </Grid>
                    <Box height={20} />
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <Card sx={{ height: 80 + "vh" }}>
                                <CardContent>
                                {/* <div className='paddingall'>
                                      <span className='pricetitle'>List of Donors:</span>
                                </div> */}
                                {/* <AccordionDash/> */}
                                <DonorsList/>
                                </CardContent>
                            </Card>
                        </Grid>
                        {/* <Grid item xs={4}>
                            <Card sx={{ height: 80 + "vh" }}>
                            <CardContent>
                            <Box height={50}/>
                            <LineChart/>
                            </CardContent>
                            </Card>
                        </Grid> */}
                    </Grid>
                </Box>
            </Box>
        </div>
          )  :(<NotFound/>)
        }


        </>
    )
}

export default AboutDashboard





















