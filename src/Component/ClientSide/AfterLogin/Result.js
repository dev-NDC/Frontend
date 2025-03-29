import React, { useState } from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, IconButton, Menu, MenuItem, Paper, Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography, Box, useMediaQuery } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";

const dummyResults = [
    { name: "Ved Prakash", license: "12345", date: "Mar 27, 2025", testType: "Driving Test", status: "Passed" }
];

function Result() {
    const [menuAnchor, setMenuAnchor] = useState(null);
    const [selectedResult, setSelectedResult] = useState(null);
    const [viewOpen, setViewOpen] = useState(false);
    const isTablet = useMediaQuery("(max-width:1200px)");
    const isMobile = useMediaQuery("(max-width:500px)");

    const handleMenuOpen = (event, result) => {
        setMenuAnchor(event.currentTarget);
        setSelectedResult(result);
    };

    const handleMenuClose = () => {
        setMenuAnchor(null);
    };

    const handleViewOpen = () => {
        setViewOpen(true);
        handleMenuClose();
    };

    return (
        <div className="container" style={{marginTop:'100px'}}>
            <Typography variant="h3" align="center" gutterBottom>Test Results</Typography>
            <TableContainer component={Paper} sx={{ mt: 3, p: 2, borderRadius: 2, boxShadow: 3, overflowX: "auto" }}>
                <Table>
                    <TableHead>
                        <TableRow sx={{ backgroundColor: "#003366" }}>
                            <TableCell sx={{ color: "white", fontWeight: "bold" }}>Sr</TableCell>
                            <TableCell sx={{ color: "white", fontWeight: "bold" }}>Driver Name</TableCell>
                            {!isMobile && !isTablet && <TableCell sx={{ color: "white", fontWeight: "bold" }}>License #</TableCell>}
                            {!isMobile && !isTablet && <TableCell sx={{ color: "white", fontWeight: "bold" }}>Date</TableCell>}
                            {!isMobile && <TableCell sx={{ color: "white", fontWeight: "bold" }}>Test Type</TableCell>}
                            {!isMobile && <TableCell sx={{ color: "white", fontWeight: "bold" }}>Status</TableCell>}
                            <TableCell sx={{ color: "white", fontWeight: "bold" }}>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {dummyResults.map((result, index) => (
                            <TableRow key={index} hover>
                                <TableCell>{index + 1}</TableCell>
                                <TableCell>{result.name}</TableCell>
                                {!isMobile && !isTablet && <TableCell>{result.license}</TableCell>}
                                {!isMobile && !isTablet && <TableCell>{result.date}</TableCell>}
                                {!isMobile && <TableCell>{result.testType}</TableCell>}
                                {!isMobile && <TableCell>{result.status}</TableCell>}
                                <TableCell>
                                    <IconButton onClick={(event) => handleMenuOpen(event, result)}>
                                        <MoreVertIcon />
                                    </IconButton>
                                    <Menu anchorEl={menuAnchor} open={Boolean(menuAnchor)} onClose={handleMenuClose}>
                                        <MenuItem onClick={handleViewOpen}>View More Details</MenuItem>
                                    </Menu>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>

                {/* View More Details Modal */}
                <Dialog open={viewOpen} onClose={() => setViewOpen(false)}>
                    <DialogTitle>Test Result Details</DialogTitle>
                    <DialogContent>
                        <Box sx={{ p: 2, borderRadius: 2, boxShadow: 1, bgcolor: "#f9f9f9" }}>
                            <Typography variant="h6" gutterBottom>{selectedResult?.name}</Typography>
                            <Typography variant="body1"><strong>License #:</strong> {selectedResult?.license}</Typography>
                            <Typography variant="body1"><strong>Date:</strong> {selectedResult?.date}</Typography>
                            <Typography variant="body1"><strong>Test Type:</strong> {selectedResult?.testType}</Typography>
                            <Typography variant="body1"><strong>Status:</strong> {selectedResult?.status}</Typography>
                        </Box>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => setViewOpen(false)} color="secondary">Close</Button>
                    </DialogActions>
                </Dialog>
            </TableContainer>
        </div>
    );
}

export default Result;
