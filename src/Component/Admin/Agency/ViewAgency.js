import React, { useContext, useState, useMemo } from "react";
import {
    Table, Box, TableBody, TableCell, TableContainer, TableHead, TableRow,
    Paper, IconButton, Typography, TextField, TableSortLabel
} from "@mui/material";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

import ExportAgency from "./ExportAgency";
import CreateNewAgency from "./CreateNewAgency";
import AdminContext from "../../../Context/Admin/AdminContext";
import CustomerContext from "../../../Context/Admin/Agency/AgencyContext";

const normalizePhoneNumber = require('../../Utils/normalizePhone');

function ViewAgency() {
    const { setCurrentActiveButton } = useContext(AdminContext);
    const { getSingleAgencyData, setLoading, setAgencyDetails, AllAgencyData } = useContext(CustomerContext);

    const [filterText, setFilterText] = useState("");
    const [sortOrder, setSortOrder] = useState("asc");

    const handleViewDetails = (user) => {
        setAgencyDetails(null);
        setLoading(true);
        getSingleAgencyData(user.id);
        setCurrentActiveButton(6);
    };

    const handleSort = () => {
        setSortOrder(prev => (prev === "asc" ? "desc" : "asc"));
    };

    const filteredData = useMemo(() => {
        const filtered = AllAgencyData.filter(agency =>
            agency.agencyName.toLowerCase().includes(filterText.toLowerCase())
        );
        return filtered.sort((a, b) => {
            const nameA = a.agencyName.toLowerCase();
            const nameB = b.agencyName.toLowerCase();
            if (sortOrder === "asc") return nameA.localeCompare(nameB);
            else return nameB.localeCompare(nameA);
        });
    }, [AllAgencyData, filterText, sortOrder]);

    return (
        <div>
            <TableContainer component={Paper} sx={{ mt: 3, p: 2, borderRadius: 2, boxShadow: 3 }}>
                <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                    <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                        Agency List
                    </Typography>
                    <Box display="flex" gap={2}>
                        <TextField
                            label="Search by Agency Name"
                            variant="outlined"
                            size="small"
                            value={filterText}
                            onChange={(e) => setFilterText(e.target.value)}
                        />
                        <CreateNewAgency />
                        <ExportAgency />
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
                                        '&.Mui-active': { color: "white" },
                                        '& .MuiTableSortLabel-icon': { color: "white !important" }
                                    }}
                                >
                                    Agency Name
                                </TableSortLabel>
                            </TableCell>
                            <TableCell sx={{ color: "white", fontWeight: "bold" }}>Email</TableCell>
                            <TableCell sx={{ color: "white", fontWeight: "bold" }}>Contact Number</TableCell>
                            <TableCell sx={{ color: "white", fontWeight: "bold" }}>Agency Code</TableCell>
                            <TableCell sx={{ color: "white", fontWeight: "bold" }}>Companies</TableCell>
                            <TableCell sx={{ color: "white", fontWeight: "bold" }}>Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filteredData.map((agency, index) => (
                            <TableRow key={index} hover>
                                <TableCell>{agency.agencyName}</TableCell>
                                <TableCell>{agency.agencyEmail}</TableCell>
                                <TableCell>{normalizePhoneNumber(agency.agencyContactNumber)}</TableCell>
                                <TableCell>{agency.agencyCode}</TableCell>
                                <TableCell>{agency.numberOfCompanies}</TableCell>
                                <TableCell>
                                    <IconButton onClick={() => handleViewDetails(agency)}>
                                        <ArrowForwardIosIcon />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
}

export default ViewAgency;
