import React, { useState, useContext, useEffect } from "react";
import {
    Table, TableBody, TableCell, TableContainer, TableHead,
    TableRow, IconButton, Menu, MenuItem, Paper, Typography,
    useMediaQuery, Dialog, DialogTitle, DialogContent, DialogActions,
    Button, Box
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import HomeContext from "../../../Context/ClientSide/AfterLogin/Home/HomeContext";

function Invoice() {
    const { userData } = useContext(HomeContext);
    const [menuAnchor, setMenuAnchor] = useState(null);
    const [selectedInvoice, setSelectedInvoice] = useState(null);
    const [viewOpen, setViewOpen] = useState(false);
    const isMobile = useMediaQuery("(max-width:500px)");
    const [invoices, setInvoices] = useState([]);

    useEffect(() => {
        if (userData) {
            setInvoices(userData.invoices);
        }
    }, [userData]);

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

    const handleViewClose = () => {
        setViewOpen(false);
        setSelectedInvoice(null);
    };

    return (
        <div className="container" style={{ marginTop: '100px' }}>
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
                        {invoices.map((invoice, index) => (
                            <TableRow key={index} hover>
                                <TableCell>{invoice.invoiceNumber}</TableCell>
                                {!isMobile && <TableCell>{new Date(invoice.date).toLocaleDateString()}</TableCell>}
                                {!isMobile && <TableCell>${invoice.amount}</TableCell>}
                                {!isMobile && (
                                    <TableCell>
                                        <Typography sx={{ color: invoice.status === "Paid" ? "green" : "red" }}>
                                            {invoice.status}
                                        </Typography>
                                    </TableCell>
                                )}
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

                {/* View Details Modal */}
                <Dialog open={viewOpen} onClose={handleViewClose} maxWidth="sm" fullWidth>
                    <DialogTitle>Invoice Details</DialogTitle>
                    <DialogContent dividers>
                        <Typography gutterBottom><strong>Invoice Number:</strong> {selectedInvoice?.invoiceNumber}</Typography>
                        <Typography gutterBottom><strong>Date:</strong> {new Date(selectedInvoice?.date).toLocaleDateString()}</Typography>
                        <Typography gutterBottom><strong>Amount:</strong> ${selectedInvoice?.amount}</Typography>
                        <Typography gutterBottom><strong>Status:</strong> {selectedInvoice?.status}</Typography>

                        {selectedInvoice?.file?.data && (
                            <Box mt={2}>
                                <Typography gutterBottom><strong>Attached File Preview:</strong></Typography>
                                <iframe
                                    src={URL.createObjectURL(
                                        new Blob(
                                            [new Uint8Array(selectedInvoice.file.data)],
                                            { type: selectedInvoice.mimeType }
                                        )
                                    )}
                                    title="Invoice File"
                                    width="100%"
                                    height="400px"
                                    style={{ borderRadius: 8, border: "1px solid #ccc" }}
                                />
                            </Box>
                        )}
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleViewClose} color="primary">Close</Button>
                    </DialogActions>
                </Dialog>
            </TableContainer>
        </div>
    );
}

export default Invoice;
