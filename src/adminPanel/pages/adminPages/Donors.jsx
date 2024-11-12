// components/DonorsTable.js
import React, { useState, useEffect } from "react";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  TablePagination,
  CircularProgress,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useApiManager } from "../../../apiManager/apiManager";
import { useDispatch } from "react-redux";
import { showToast } from "../../../store/reducer";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";

const Donors = () => {
  const [donors, setDonors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  // Pagination states
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const navigate = useNavigate();
  const apiManager = useApiManager();
  const dispatch = useDispatch();

  useEffect(() => {
    fetchDonors();
  }, []);

  const fetchDonors = async () => {
    try {
      console.log("🚀 ~ fetchDonors ~ rowsPerPage:", rowsPerPage);
      const { data, error } = await apiManager.get(
        `admin/donors?page=${page == 0 ? 1 : page}&limit=${rowsPerPage}`
      );

      if (error) {
        dispatch(
          showToast({
            message: error,
            severity: "error",
          })
        );

        return;
      }
      setDonors(data?.donors);
    } catch (err) {
      console.error("Error fetching donors:", err);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  // Handle page change
  const handleChangePage = (event, newPage) => {
    console.log("🚀 ~ handleChangePage ~ newPage:", newPage);
    setPage(newPage);
    fetchDonors();
  };

  // Handle rows per page change
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    // setPage(0);
    fetchDonors();
  };

  // Navigate to donor detail page
  const handleViewDetails = (id) => {
    navigate(`/admin/donors/${id}`);
  };

  // // Calculate the data to display based on pagination
  // const donors? = donors.slice(
  //   page * rowsPerPage,
  //   page * rowsPerPage + rowsPerPage
  // );

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "60vh",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Typography variant="h6" color="error" align="center" sx={{ mt: 4 }}>
        Failed to load donors. Please try again later.
      </Typography>
    );
  }

  return (
    <Box sx={{ width: "100%", mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Donors
      </Typography>
      <TableContainer component={Paper}>
        <Table aria-label="donors table customized">
          <TableHead>
            <TableRow sx={{ backgroundColor: "primary.main" }}>
              <TableCell sx={{ color: "#fff", fontSize: 16 }} align="center">
                No.
              </TableCell>
              <TableCell sx={{ color: "#fff", fontSize: 16 }}>
                Donor Name
              </TableCell>
              <TableCell sx={{ color: "#fff", fontSize: 16 }}>Email</TableCell>
              <TableCell sx={{ color: "#fff", fontSize: 16 }}>Phone</TableCell>
              <TableCell sx={{ color: "#fff", fontSize: 16 }}>
                Address
              </TableCell>
              <TableCell sx={{ color: "#fff", fontSize: 16 }} align="center">
                Actions
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {donors?.map((donor, index) => (
              <TableRow key={donor?._id}>
                <TableCell align="center">{index + 1}</TableCell>
                <TableCell>{donor?.name}</TableCell>
                <TableCell>{donor?.email}</TableCell>
                <TableCell>{donor?.phone}</TableCell>
                <TableCell>{donor?.address}</TableCell>
                <TableCell align="center">
                  <Button
                    variant="text"
                    color="primary"
                    onClick={() => handleViewDetails(donor?._id)}
                  >
                    <RemoveRedEyeIcon />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
            {donors?.length === 0 && (
              <TableRow>
                <TableCell colSpan={6} align="center">
                  No donors found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
        <TablePagination
          component="div"
          count={donors?.length}
          page={page}
          onPageChange={handleChangePage}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          rowsPerPageOptions={[5, 10, 25]}
          sx={{ backgroundColor: "primary.main", color: "#fff" }}
        />
      </TableContainer>
    </Box>
  );
};

export default Donors;
