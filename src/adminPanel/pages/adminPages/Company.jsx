// components/companyTable.js
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
  Stack,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useApiManager } from "../../../apiManager/apiManager";
import { useDispatch } from "react-redux";
import { showToast } from "../../../store/reducer";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import EditIcon from "@mui/icons-material/Edit";
import AddCircleIcon from "@mui/icons-material/AddCircle";

const Company = () => {
  const [company, setCompany] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  // Pagination states
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const navigate = useNavigate();
  const apiManager = useApiManager();
  const dispatch = useDispatch();

  useEffect(() => {
    fetchCompany();
  }, []);

  const fetchCompany = async () => {
    try {
      const { data, error } = await apiManager.get(
        `admin/companies?page=${page == 0 ? 1 : page}&limit=${rowsPerPage}`
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
      setCompany(data?.companies);
    } catch (err) {
      console.error("Error fetching company:", err);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  // Handle page change
  const handleChangePage = (event, newPage) => {
    console.log("🚀 ~ handleChangePage ~ newPage:", newPage);
    setPage(newPage);
    fetchCompany();
  };

  // Handle rows per page change
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    // setPage(0);
    fetchCompany();
  };

  // Navigate to donor detail page
  const handleViewDetails = (id) => {
    navigate(`/admin/company/${id}`);
  };

  // // Calculate the data to display based on pagination
  // const company? = company.slice(
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
        Failed to load company. Please try again later.
      </Typography>
    );
  }

  return (
    <Box sx={{ width: "100%", mt: 4 }}>
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Typography variant="h4" gutterBottom>
          Company
        </Typography>
        <Button
          variant="text"
          color="primary"
          onClick={() => navigate("/admin/companies/add")}
          sx={{
            "&:hover": {
              backgroundColor: "#e0e0e0", // Gray hover effect
            },
          }}
        >
          <AddCircleIcon sx={{ fontSize: 40 }} />
        </Button>
      </Stack>
      <TableContainer component={Paper}>
        <Table aria-label="company table customized">
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
                Total Medicines
              </TableCell>
              <TableCell sx={{ color: "#fff", fontSize: 16 }} align="center">
                Actions
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {company?.map((company, index) => (
              <TableRow key={company?._id}>
                <TableCell align="center">{index + 1}</TableCell>
                <TableCell>{company?.name}</TableCell>
                <TableCell>{company?.contactNumber}</TableCell>
                <TableCell>{company?.address}</TableCell>
                <TableCell>{company?.medicines?.length}</TableCell>
                <TableCell align="center">
                  <Button
                    variant="text"
                    color="primary"
                    onClick={() => handleViewDetails(company?._id)}
                    sx={{
                      "&:hover": {
                        backgroundColor: "#e0e0e0", // Gray hover effect
                      },
                    }}
                  >
                    <RemoveRedEyeIcon />
                  </Button>

                  <Button
                    variant="text"
                    color="primary"
                    onClick={() =>
                      navigate(`/admin/companies/edit/${company?._id}`)
                    }
                    sx={{
                      "&:hover": {
                        backgroundColor: "#e0e0e0", // Gray hover effect
                      },
                    }}
                  >
                    <EditIcon />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
            {company?.length === 0 && (
              <TableRow>
                <TableCell colSpan={6} align="center">
                  No company found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
        <TablePagination
          component="div"
          count={company?.length}
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

export default Company;
