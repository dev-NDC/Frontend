import React, { useContext, useMemo, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Typography,
  CircularProgress,
  TextField,
  Box,
  Tooltip
} from "@mui/material";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { ArrowUpward, ArrowDownward } from "@mui/icons-material";

import AdminContext from "../../../Context/Agency/AgencyContext";
import CustomerContext from "../../../Context/Agency/Customer/CustomerContext";
const normalizePhoneNumber = require('../../Utils/normalizePhone');

function ViewCustomer() {
  const adminContext = useContext(AdminContext);
  const customerContext = useContext(CustomerContext);

  const [filterText, setFilterText] = useState("");
  const [filterUsdot, setFilterUsdot] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");

  const { AllUserData, setCurrentActiveButton } = adminContext || {};
  const { getSingleUserData, setLoading, setUserDetails } = customerContext || {};

  const filteredData = useMemo(() => {
    const filtered = AllUserData?.filter(user =>
      user.companyName?.toLowerCase().includes(filterText.toLowerCase()) &&
      user.companyUSDOTNumber?.toLowerCase().includes(filterUsdot.toLowerCase())
    ) || [];

    return filtered.sort((a, b) => {
      const nameA = a.companyName.toLowerCase();
      const nameB = b.companyName.toLowerCase();
      return sortOrder === "asc" ? nameA.localeCompare(nameB) : nameB.localeCompare(nameA);
    });
  }, [AllUserData, filterText, sortOrder, filterUsdot]);

  const handleSortToggle = () => {
    setSortOrder(prev => (prev === "asc" ? "desc" : "asc"));
  };

  const handleViewDetails = (user) => {
    setUserDetails(null);
    setLoading(true);
    getSingleUserData(user.id);
    setCurrentActiveButton(5);
  };

  if (!adminContext || !customerContext) {
    return <Typography color="error">Context not available.</Typography>;
  }

  if (!AllUserData) {
    return (
      <Box display="flex" justifyContent="center" mt={5}>
        <CircularProgress />
      </Box>
    );
  }

  if (AllUserData.length === 0) {
    return (
      <Typography variant="h6" align="center" sx={{ mt: 5 }}>
        No customers found.
      </Typography>
    );
  }

  return (
    <TableContainer component={Paper} sx={{ mt: 3, p: 2, borderRadius: 2, boxShadow: 3 }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <Typography variant="h6" sx={{ fontWeight: "bold" }}>
          Customer List
        </Typography>
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <TextField
            size="small"
            label="Filter by Company Name"
            variant="outlined"
            value={filterText}
            onChange={(e) => setFilterText(e.target.value)}
          />
          <TextField
            size="small"
            label="Filter by USDOT Number"
            variant="outlined"
            value={filterUsdot}
            onChange={(e) => setFilterUsdot(e.target.value)}
          />
        </Box>
      </Box>


      <Table>
        <TableHead>
          <TableRow sx={{ backgroundColor: "#003366" }}>
            <TableCell sx={{ color: "white", fontWeight: "bold" }}>
              <Box display="flex" alignItems="center">
                Company Name
                <Tooltip title={`Sort ${sortOrder === "asc" ? "Descending" : "Ascending"}`}>
                  <IconButton onClick={handleSortToggle} size="small" sx={{ ml: 1 }}>
                    {sortOrder === "asc" ? (
                      <ArrowUpward sx={{ color: "white" }} fontSize="small" />
                    ) : (
                      <ArrowDownward sx={{ color: "white" }} fontSize="small" />
                    )}
                  </IconButton>
                </Tooltip>
              </Box>
            </TableCell>
            <TableCell sx={{ color: "white", fontWeight: "bold" }}>Contact No</TableCell>
            <TableCell sx={{ color: "white", fontWeight: "bold" }}>Email</TableCell>
            <TableCell sx={{ color: "white", fontWeight: "bold" }}>Active Employees</TableCell>
            <TableCell sx={{ color: "white", fontWeight: "bold" }}>Status</TableCell>
            <TableCell sx={{ color: "white", fontWeight: "bold" }}>Details</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {filteredData.map((user, index) => (
            <TableRow key={index} hover>
              <TableCell>{user.companyName}</TableCell>
              <TableCell>{normalizePhoneNumber(user.companyContactNumber)}</TableCell>
              <TableCell>{user.companyEmail}</TableCell>
              <TableCell>{user.activeDriversCount}</TableCell>
              <TableCell
                sx={{
                  color: user.status === "Active" ? "green" : "red",
                  fontWeight: "bold"
                }}
              >
                {user.status}
              </TableCell>
              <TableCell>
                <IconButton onClick={() => handleViewDetails(user)}>
                  <ArrowForwardIosIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default ViewCustomer;
