import React, { useState } from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, IconButton, Menu, MenuItem, Paper, Typography, useMediaQuery, Dialog, DialogTitle, DialogContent, DialogActions, Button, Box } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";

const dummyInvoices = [
    { invoiceNumber: "INV-001", date: "Mar 27, 2025", amount: "$500", status: "Paid" }
];

function Invoice() {
    const [menuAnchor, setMenuAnchor] = useState(null);
    const [selectedInvoice, setSelectedInvoice] = useState(null);
    const [viewOpen, setViewOpen] = useState(false);
    const isMobile = useMediaQuery("(max-width:500px)");

    const handleMenuOpen = (event, invoice) => {
        setMenuAnchor(event.currentTarget);
        setSelectedInvoice(invoice);
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
            <Typography variant="h3" align="center" gutterBottom>Invoices</Typography>
            <TableContainer component={Paper} sx={{ mt: 3, p: 2, borderRadius: 2, boxShadow: 3, overflowX: "auto" }}>
                
                <Table>
                    <TableHead>
                        <TableRow sx={{ backgroundColor: "#003366" }}>
                            <TableCell sx={{ color: "white", fontWeight: "bold" }}>Invoice Number</TableCell>
                            {!isMobile && <TableCell sx={{ color: "white", fontWeight: "bold" }}>Date</TableCell>}
                            {!isMobile && <TableCell sx={{ color: "white", fontWeight: "bold" }}>Amount</TableCell>}
                            {!isMobile && <TableCell sx={{ color: "white", fontWeight: "bold" }}>Status</TableCell>}
                            <TableCell sx={{ color: "white", fontWeight: "bold" }}>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {dummyInvoices.map((invoice, index) => (
                            <TableRow key={index} hover>
                                <TableCell>{invoice.invoiceNumber}</TableCell>
                                {!isMobile && <TableCell>{invoice.date}</TableCell>}
                                {!isMobile && <TableCell>{invoice.amount}</TableCell>}
                                {!isMobile && <TableCell>{invoice.status}</TableCell>}
                                <TableCell>
                                    <IconButton onClick={(event) => handleMenuOpen(event, invoice)}>
                                        <MoreVertIcon />
                                    </IconButton>
                                    <Menu anchorEl={menuAnchor} open={Boolean(menuAnchor)} onClose={handleMenuClose}>
                                        <MenuItem onClick={handleViewOpen}>View Details</MenuItem>
                                    </Menu>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>

                {/* View More Details Modal */}
                <Dialog open={viewOpen} onClose={() => setViewOpen(false)}>
                    <DialogTitle>Invoice Details</DialogTitle>
                    <DialogContent>
                        <Box sx={{ p: 2, borderRadius: 2, boxShadow: 1, bgcolor: "#f9f9f9" }}>
                            <Typography variant="h6" gutterBottom>{selectedInvoice?.invoiceNumber}</Typography>
                            <Typography variant="body1"><strong>Date:</strong> {selectedInvoice?.date}</Typography>
                            <Typography variant="body1"><strong>Amount:</strong> {selectedInvoice?.amount}</Typography>
                            <Typography variant="body1"><strong>Status:</strong> {selectedInvoice?.status}</Typography>
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

export default Invoice;
