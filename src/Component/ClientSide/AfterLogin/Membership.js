import React, { useState } from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, useMediaQuery, Dialog, DialogTitle, DialogContent, DialogActions, Button, Box, Grid } from "@mui/material";

const dummyInvoices = [
    { description: "Certificate 1", issueDate: "Mar 10, 2025", expiryDate: "Mar 10, 2026" }
];

function Membership() {
    const [viewOpen, setViewOpen] = useState(false);
    const [selectedInvoice, setSelectedInvoice] = useState(null);
    const isMobile = useMediaQuery("(max-width:500px)");

    const handleViewOpen = (invoice) => {
        setSelectedInvoice(invoice);
        setViewOpen(true);
    };

    return (
        <div className="container" style={{marginTop:'100px'}}>
            <Box sx={{ p: 2, borderRadius: 2, boxShadow: 3, bgcolor: "white" }}>
            <Typography variant="h5" fontWeight="bold" gutterBottom>Membership Information</Typography>
            <Box sx={{ mb: 2, p: 2, borderRadius: 2, bgcolor: "#f5f5f5" }}>
                <Grid container spacing={2}>
                    <Grid item xs={12} md={6}>
                        <Typography variant="body1"><strong>Current Plan:</strong> Premium</Typography>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Typography variant="body1"><strong>Price:</strong> $99/year</Typography>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Typography variant="body1"><strong>Join Date:</strong> Mar 10, 2025 12:00 am</Typography>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Typography variant="body1"><strong>Expiry Date:</strong> Mar 10, 2026</Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="body1"><strong>Status:</strong> Active</Typography>
                    </Grid>
                </Grid>
            </Box>
            
            <Typography variant="h6" fontWeight="bold" gutterBottom>Certificate</Typography>
            <TableContainer component={Paper} sx={{ borderRadius: 2, boxShadow: 3, overflowX: "auto" }}>
                <Table>
                    <TableHead>
                        <TableRow sx={{ backgroundColor: "#003366" }}>
                            <TableCell sx={{ color: "white", fontWeight: "bold" }}>Sr</TableCell>
                            <TableCell sx={{ color: "white", fontWeight: "bold" }}>Description</TableCell>
                            {!isMobile && <TableCell sx={{ color: "white", fontWeight: "bold" }}>Issue Date</TableCell>}
                            {!isMobile && <TableCell sx={{ color: "white", fontWeight: "bold" }}>Expiration Date</TableCell>}
                            {isMobile && <TableCell sx={{ color: "white", fontWeight: "bold" }}>Actions</TableCell>}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {dummyInvoices.map((invoice, index) => (
                            <TableRow key={index} hover>
                                <TableCell>{index + 1}</TableCell>
                                <TableCell>{invoice.description}</TableCell>
                                {!isMobile && <TableCell>{invoice.issueDate}</TableCell>}
                                {!isMobile && <TableCell>{invoice.expiryDate}</TableCell>}
                                {isMobile && (
                                    <TableCell>
                                        <Button variant="contained" size="small" onClick={() => handleViewOpen(invoice)}>
                                            View Details
                                        </Button>
                                    </TableCell>
                                )}
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            {/* View More Details Modal */}
            <Dialog open={viewOpen} onClose={() => setViewOpen(false)}>
                <DialogTitle>Certificate Details</DialogTitle>
                <DialogContent>
                    <Box sx={{ p: 2, borderRadius: 2, boxShadow: 1, bgcolor: "#f9f9f9" }}>
                        <Typography variant="h6" gutterBottom>{selectedInvoice?.description}</Typography>
                        <Typography variant="body1"><strong>Issue Date:</strong> {selectedInvoice?.issueDate}</Typography>
                        <Typography variant="body1"><strong>Expiration Date:</strong> {selectedInvoice?.expiryDate}</Typography>
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setViewOpen(false)} color="secondary">Close</Button>
                </DialogActions>
            </Dialog>
        </Box>
        </div>
    );
}

export default Membership;
