import React, { useContext, useState, useMemo, useEffect } from "react";
import {
    Box,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    IconButton,
    Typography,
    TextField,
    TableSortLabel
} from "@mui/material";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import AdminContext from "../../../Context/Admin/AdminContext";
import CustomerContext from "../../../Context/Admin/Customer/CustomerContext";


import ExportDriver from "./ExportDriver";
import ExportCompany from "./ExportCompany";

function ViewCustomer() {
    const { AllUserData, setCurrentActiveButton, getAllAdminData } = useContext(AdminContext);
    const { getSingleUserData, setLoading, setUserDetails } = useContext(CustomerContext);

    const [searchTerm, setSearchTerm] = useState("");
    const [searchTermByUSDOT, setSearchTermByUSDOT] = useState("");
    const [sortOrder, setSortOrder] = useState("asc");

    useEffect(() => {
        getAllAdminData();
        // eslint-disable-next-line
    }, []);

    const handleViewDetails = (user) => {
        setUserDetails(null);
        setLoading(true);
        getSingleUserData(user.id);
        setCurrentActiveButton(5);
    };

    const handleSort = () => {
        setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"));
    };

    const filteredAndSortedUsers = useMemo(() => {
        let filtered = AllUserData.filter((user) =>
            user.companyName.toLowerCase().includes(searchTerm.toLowerCase()) &&
            user.companyUSDOTNumber.toLowerCase().includes(searchTermByUSDOT.toLowerCase())
        );

        filtered.sort((a, b) => {
            const nameA = a.companyName.toLowerCase();
            const nameB = b.companyName.toLowerCase();
            if (nameA < nameB) return sortOrder === "asc" ? -1 : 1;
            if (nameA > nameB) return sortOrder === "asc" ? 1 : -1;
            return 0;
        });

        return filtered;
    }, [AllUserData, searchTerm, searchTermByUSDOT, sortOrder]);


    return (
        <TableContainer component={Paper} sx={{ mt: 3, p: 2, borderRadius: 2, boxShadow: 3 }}>
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    mb: 2,
                }}
            >
                <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                    Customer List
                </Typography>

                <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                    <TextField
                        size="small"
                        placeholder="Filter by Company Name"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <TextField
                        size="small"
                        placeholder="Filter by USDOT Code"
                        value={searchTermByUSDOT}
                        onChange={(e) => setSearchTermByUSDOT(e.target.value)}
                    />
                    <ExportDriver />
                    <ExportCompany />
                </Box>

            </Box>

            <Table>
                <TableHead>
                    <TableRow sx={{ backgroundColor: "#003366" }}>
                        <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                            <TableSortLabel
                                active={true}
                                direction={sortOrder}
                                onClick={handleSort}
                                sx={{
                                    color: "white",
                                    '&.Mui-active': {
                                        color: "white",
                                    },
                                    '& .MuiTableSortLabel-icon': {
                                        color: "white !important",
                                    },
                                }}
                            >
                                Company Name
                            </TableSortLabel>

                        </TableCell>
                        <TableCell sx={{ color: "white", fontWeight: "bold" }}>Contact No</TableCell>
                        <TableCell sx={{ color: "white", fontWeight: "bold" }}>Email</TableCell>
                        <TableCell sx={{ color: "white", fontWeight: "bold" }}>Active Employees</TableCell>
                        <TableCell sx={{ color: "white", fontWeight: "bold" }}>Status</TableCell>
                        <TableCell sx={{ color: "white", fontWeight: "bold" }}>Details</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {filteredAndSortedUsers.map((user, index) => (
                        <TableRow key={index} hover>
                            <TableCell>{user.companyName}</TableCell>
                            <TableCell>{user.companyContactNumber}</TableCell>
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
