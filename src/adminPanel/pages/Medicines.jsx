import React from 'react'
import Sidenav from '../components/Sidenav'
import Box from '@mui/material/Box';
import Navbar from '../components/Navbar'
import Typography from '@mui/material/Typography';
import MedicineList from './medicines/MedicineList';

const Medicines = () => {
    return (
        <>
        <div className="bgcolor">
            <Navbar/>
            <Box height={70}/>
            <Box sx={{display: 'flex'}}>
                <Sidenav/>
                <Box component="main" sx={{flexGrow: 1, p:3}}>
                <MedicineList/>
                </Box>
            </Box>
           
        </div>
       </>
    )
}

export default Medicines