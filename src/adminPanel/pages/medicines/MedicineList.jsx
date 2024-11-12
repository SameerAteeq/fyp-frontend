

import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import CloseIcon from '@mui/icons-material/Close';
import PropTypes from 'prop-types';
import IconButton from '@mui/material/IconButton';

import Button from '@mui/material/Button';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import axios from 'axios';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import LastPageIcon from '@mui/icons-material/LastPage';
import TableFooter from '@mui/material/TableFooter';
import Tooltip from '@mui/material/Tooltip';
import { useNavigate } from 'react-router';
import { Popconfirm, message, Tag  } from 'antd';
import Swal from "sweetalert2";
import { Modal } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
function TablePaginationActions(props) {
  const theme = useTheme();
  const { count, page, rowsPerPage, onPageChange } = props;

  const handleFirstPageButtonClick = (event) => {
    onPageChange(event, 0);
  };

  const handleBackButtonClick = (event) => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (event) => {
    onPageChange(event, page + 1);
  };

  const handleLastPageButtonClick = (event) => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };
  
  return (
    <Box sx={{ flexShrink: 0, ml: 2.5 }}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </Box>
  );
}

TablePaginationActions.propTypes = {
  count: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
};




export default function RecipientsList() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [rows, setRows] = React.useState([]);
  
  // const [open, setOpen] = React.useState(false);

  const [open1, setOpen1] = React.useState(null);


const navigate = useNavigate()
  
const getProductDetails = async () => {
  try {
    const response = await axios.get('http://localhost:4000/askDonator');
    const data = response.data.database; // Assuming the API returns the 'database' property
    
    setRows(data);
  } catch (error) {
    console.error(error);
    // Handle error, show error message to user, etc.
  }
};

//  const getProductDetails = async () => {
//   try {
//     const response =()=>  axios.get('http://localhost:4000/askDonator');

//     response().then((res)=>{
//           // res?.data?.database
          
//      console.log('contactttt',res?.data?.database)
//      setRows(res?.data?.database)
//     });
//     // .catch(())
//      // Assuming your API returns an array of objects
//     // setRows(res?.data?.database);
//   } catch (error) {
//     console.error(error);
//     // Handle error, show error message to user, etc.
//   }
// };
React.useEffect(() => {
  getProductDetails()
},[])
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  const handleOpen = (row) =>{
  setOpen1(row)}
  //  setOpen(true);
  const handleClose = () => {
  setOpen1(null)}
    // setOpen(false);

//   function editStatus(obj) {axios.put('http://localhost:4000/approveStatus')}
//   const handleChangeStatus =  (row) => {
   
//     let data = {
//         medicineName: row.medicineName
//     }
// editStatus(data).then((res)=>{
//       message.success("Case Deleted successfully")
// })
    
//     }
const handleChangeStatus = (row) => {
  const data = {
    medicineName: row.medicineName,
    email:row.email
  };

  axios.put('http://localhost:4000/approveStatus', data)
    .then((res) => {
      // message.success("Medicine status updated successfully");
      Swal.fire({
        title: "Successul",
        text: "Approved Successfully.",
        icon: "success",
        confirmButtonColor: "#0875b8",
      });
      navigate('/donors')
      // navigate('/allMedicine')
      
    })
    .catch((error) => {
      console.error("Error:", error);
      Swal.fire({
        title: "Successul",
        text: "Approved Successfully.",
        icon: "success",
        confirmButtonColor: "#0875b8",
      });
      // message.error("An error occurred while updating medicine status");
    });
};

const handleStatusDelete =  (row) => {
  const data = {
    medicineName: row.medicineName,
    email:row.email
  };
  axios.delete('http://localhost:4000/deleteMedicine', {data})
    .then((res) => {
      // message.success("Medicine deleted successfully");
      Swal.fire({
        title: "Successul",
        text: "Deleted Successfully.",
        icon: "success",
        confirmButtonColor: "#0875b8",
      });
      navigate('/donors')
      // navigate('/allMedicine')
      
    })
    .catch((error) => {
      console.error("Error:", error);
      Swal.fire({
        title: "Successul",
        text: "Deleted Successfully.",
        icon: "success",
        confirmButtonColor: "#0875b8",
      });
      // message.error("An error occurred while updating medicine status");
    });
};

  return (
    <>
       <TableContainer component={Paper}>
      <Table sx={{ minWidth: 500 }} aria-label="custom pagination table">
        <TableHead>
        <Typography
            gutterBottom
            variant="h5"
            component="div"
            sx={{ padding: "20px" }}
          >
            Medicines
          </Typography>
        <TableRow>
              <TableCell component="th" scope="row">
                Medicine Name
              </TableCell>
              <TableCell style={{ width: 160 }} align="right">
                Donor Name
              </TableCell>
              <TableCell style={{ width: 160 }} align="right">
              Quantity
              </TableCell>
              <TableCell style={{ width: 160 }} align="right">
              Expiry Date
              </TableCell>
              <TableCell style={{ width: 160 }} align="right">
              Status
              </TableCell>
              <TableCell style={{ width: 160 }} align="right">
              Delete
              </TableCell>
              <TableCell style={{ width: 160 }} align="right">
              Image
              </TableCell>
            </TableRow>
        </TableHead>
        <TableBody>
          {(rowsPerPage > 0
            ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            : rows
          ).map((row) => (
            <TableRow>
              <TableCell component="th" scope="row">
                {row.medicineName}
              </TableCell>
              <TableCell style={{ width: 160 }} align="right">
                {row.name}
              </TableCell>
              <TableCell style={{ width: 160 }} align="right">
              {row.medicineQty}
              </TableCell>
              <TableCell style={{ width: 160 }} align="right">
              {row.medicineExp}
              </TableCell>
              { row.status=='pending'?(
              <TableCell style={{ width: 160 }} align="right">
              <Popconfirm
                       title= 'Status Change To'
                      onConfirm={() => handleChangeStatus(row)}
                      onCancel={()=> handleStatusDelete(row)}
                       okText="Approved"
                         cancelText="Declined"
                                                        >
                                                          <Tag color="#58869e" >
              {row.status}
              </Tag>
              </Popconfirm>
              </TableCell>):(<TableCell style={{ width: 160 }} align="right"> <Tag color="green" >
              {row.status}
              </Tag>
              </TableCell>)
}
<TableCell style={{ width: 160 }} align="right">
              <IconButton onClick={()=>handleStatusDelete(row)}><DeleteIcon sx={{color:'red'}}/></IconButton>
              </TableCell>
<TableCell style={{ width: 160 }} align="right">
              <Button variant='outlined' onClick={()=>handleOpen(row)}>Open</Button>
              </TableCell>
              
             
            </TableRow>
          ))}
           
        </TableBody>
        
        <TableFooter>
          <TableRow>
            <TableCell  align="right" colSpan={7}>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
              colSpan={3}
              count={rows.length}
              rowsPerPage={rowsPerPage}
              page={page}
              SelectProps={{
                inputProps: {
                  'aria-label': 'rows per page',
                },
                native: true,
              }}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              ActionsComponent={TablePaginationActions}
            />
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </TableContainer>
    <Modal  style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }} open={Boolean(open1)} onClose={handleClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
                   <>
                   <div style={{width:'auto', maxHeight: '100vh', overflow: 'auto'}} >
                    <CloseIcon onClick={handleClose} sx={{color:'white',mt:1,ml:67}}/>
                    {console.log("asasasasasas",Boolean(open1))}
        <img
          src={open1?.medicineImg}
          alt="Medicine"
          style={{ width: '100%', height: '100%', objectFit: 'contain' }}
        />
      </div>
                  {/* { console.log(row?.medicineImg)} */}
                    {/* <img src={row?.medicineImg}/> */}
                   </>
    </Modal>
    
 </>
  );
}
