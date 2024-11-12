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

const Recipient = () => {
  const [recipient, setRecipient] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  // Pagination states
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const navigate = useNavigate();
  const apiManager = useApiManager();
  const dispatch = useDispatch();

  useEffect(() => {
    fetchRecipient();
  }, []);

  const fetchRecipient = async () => {
    try {
      const { data, error } = await apiManager.get(
        `admin/recipients?page=${page == 0 ? 1 : page}&limit=${rowsPerPage}`
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
      setRecipient(data?.recipients);
    } catch (err) {
      console.error("Error fetching recipient:", err);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  // Handle page change
  const handleChangePage = (event, newPage) => {
    console.log("🚀 ~ handleChangePage ~ newPage:", newPage);
    setPage(newPage);
    fetchRecipient();
  };

  // Handle rows per page change
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    // setPage(0);
    fetchRecipient();
  };

  // Navigate to donor detail page
  const handleViewDetails = (id) => {
    navigate(`/admin/recipient/${id}`);
  };

  // // Calculate the data to display based on pagination
  // const recipient? = recipient.slice(
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
        Failed to load recipient. Please try again later.
      </Typography>
    );
  }

  return (
    <Box sx={{ width: "100%", mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Recipient
      </Typography>
      <TableContainer component={Paper}>
        <Table aria-label="recipient table customized">
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
            {recipient?.map((recipient, index) => (
              <TableRow key={recipient?._id}>
                <TableCell align="center">{index + 1}</TableCell>
                <TableCell>{recipient?.name}</TableCell>
                <TableCell>{recipient?.email}</TableCell>
                <TableCell>{recipient?.phone}</TableCell>
                <TableCell>{recipient?.address}</TableCell>
                <TableCell align="center">
                  <Button
                    variant="text"
                    color="primary"
                    onClick={() => handleViewDetails(recipient?._id)}
                  >
                    <RemoveRedEyeIcon />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
            {recipient?.length === 0 && (
              <TableRow>
                <TableCell colSpan={6} align="center">
                  No recipient found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
        <TablePagination
          component="div"
          count={recipient?.length}
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

export default Recipient;
