import React, { useContext } from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, Typography } from "@mui/material";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import AdminContext from "../../../Context/Admin/AdminContext";
import CustomerContext from "../../../Context/Admin/Customer/CustomerContext";


function ViewCustomer() {
    const { AllUserData, setCurrentActiveButton} = useContext(AdminContext);
    const {getSingleUserData,setLoading,setUserDetails} = useContext(CustomerContext )
    const handleViewDetails = (user) => {
        setUserDetails(null)
        setLoading(true);
        getSingleUserData(user.id)
        setCurrentActiveButton(5)
    };

    return (
        <TableContainer component={Paper} sx={{ mt: 3, p: 2, borderRadius: 2, boxShadow: 3 }}>
            <Typography variant="h6" sx={{ mb: 2, fontWeight: "bold" }}>Customer List</Typography>
            <Table>
                <TableHead>
                    <TableRow sx={{ backgroundColor: "#003366" }}>
                        <TableCell sx={{ color: "white", fontWeight: "bold" }}>Company Name</TableCell>
                        <TableCell sx={{ color: "white", fontWeight: "bold" }}>Contact No</TableCell>
                        <TableCell sx={{ color: "white", fontWeight: "bold" }}>Email</TableCell>
                        <TableCell sx={{ color: "white", fontWeight: "bold" }}>Active Drivers</TableCell>
                        <TableCell sx={{ color: "white", fontWeight: "bold" }}>Status</TableCell>
                        <TableCell sx={{ color: "white", fontWeight: "bold" }}>Details</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {AllUserData.map((user, index) => (
                        <TableRow key={index} hover>
                            <TableCell>{user.companyName}</TableCell>
                            <TableCell>{user.companyContactNumber}</TableCell>
                            <TableCell>{user.companyEmail}</TableCell>
                            <TableCell>{user.activeDriversCount}</TableCell>
                            <TableCell sx={{ color: "green", fontWeight: "bold" }}>Active</TableCell>
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
