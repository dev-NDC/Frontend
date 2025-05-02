import React, { useContext } from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, Typography } from "@mui/material";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import AdminContext from "../../../Context/Admin/AdminContext";
import CustomerContext from "../../../Context/Admin/Agency/AgencyContext";


function ViewAgency() {
    const {setCurrentActiveButton} = useContext(AdminContext);
    const {getSingleAgencyData,setLoading,setAgencyDetails,AllAgencyData} = useContext(CustomerContext )
    const handleViewDetails = (user) => {
        setAgencyDetails(null)
        setLoading(true);
        getSingleAgencyData(user.id)
        setCurrentActiveButton(6)
    };

    return (
        <div>
            <TableContainer component={Paper} sx={{ mt: 3, p: 2, borderRadius: 2, boxShadow: 3 }}>
            <Typography variant="h6" sx={{ mb: 2, fontWeight: "bold" }}>Customer List</Typography>
            <Table>
                <TableHead>
                    <TableRow sx={{ backgroundColor: "#003366" }}>
                        <TableCell sx={{ color: "white", fontWeight: "bold" }}>Agency Name</TableCell>
                        <TableCell sx={{ color: "white", fontWeight: "bold" }}>Email</TableCell>
                        <TableCell sx={{ color: "white", fontWeight: "bold" }}>Contact Number</TableCell>
                        <TableCell sx={{ color: "white", fontWeight: "bold" }}>Companies</TableCell>
                        <TableCell sx={{ color: "white", fontWeight: "bold" }}>Action</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {AllAgencyData.map((agency, index) => (
                        <TableRow key={index} hover>
                            <TableCell>{agency.agencyName}</TableCell>
                            <TableCell>{agency.agencyEmail}</TableCell>
                            <TableCell>{agency.agencyContactNumber}</TableCell>
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
