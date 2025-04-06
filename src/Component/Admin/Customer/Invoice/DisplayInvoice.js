import React, { useContext, useEffect, useState } from "react";
import {
    Dialog, DialogTitle, DialogContent, DialogActions,
    Button, IconButton, Table, TableBody, TableCell,
    TableContainer, TableHead, TableRow, Typography,
    TextField, CircularProgress, MenuItem, Select, InputLabel, FormControl
} from "@mui/material";
import { Edit, Delete, Visibility, Download } from "@mui/icons-material";
import CustomerContext from "../../../../Context/Admin/Customer/CustomerContext";
import InvoiceContext from "../../../../Context/Admin/Customer/Invoice/InvoiceContext";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

function DisplayInvoice() {
    const { currentId, userDetails,getSingleUserData } = useContext(CustomerContext);
    const { updateInvoice, deleteInvoice } = useContext(InvoiceContext);

    const [loading, setLoading] = useState(true);
    const [invoices, setInvoices] = useState([]);
    const [openModal, setOpenModal] = useState(null);
    const [selectedInvoice, setSelectedInvoice] = useState(null);
    const [editData, setEditData] = useState({});

    useEffect(() => {
        if (userDetails?.invoices) {
            setInvoices(userDetails.invoices);
            setLoading(false);
        }
    }, [userDetails]);

    const handleOpen = (type, invoice) => {
        setSelectedInvoice(invoice);
        setEditData(invoice);
        setOpenModal(type);
    };

    const handleClose = () => {
        setOpenModal(null);
        setSelectedInvoice(null);
        setEditData({});
    };

    const handleDownload = async (invoice) => {
        const container = document.createElement("div");
        container.style.position = "fixed";
        container.style.top = "-9999px";
        container.style.width = "600px";
        container.style.padding = "20px";
        container.style.backgroundColor = "white";
        container.innerHTML = `
            <h2>Invoice</h2>
            <p><strong>Invoice Number:</strong> ${invoice.invoiceNumber}</p>
            <p><strong>Amount:</strong> ₹${invoice.amount}</p>
            <p><strong>Date:</strong> ${new Date(invoice.date).toLocaleDateString()}</p>
            <p><strong>Status:</strong> ${invoice.status}</p>
        `;

        document.body.appendChild(container);

        const canvas = await html2canvas(container, { scale: 2 });
        const imgData = canvas.toDataURL("image/png");

        const pdf = new jsPDF("p", "mm", "a4");
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

        pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
        pdf.save(`${invoice.invoiceNumber || "invoice"}.pdf`);

        document.body.removeChild(container);
    };

    const handleUpdate = async () => {
        await updateInvoice(currentId, selectedInvoice._id, editData);
        getSingleUserData(currentId);
        handleClose();
    };

    const handleDelete = async () => {
        await deleteInvoice(currentId, selectedInvoice._id);
        getSingleUserData(currentId);
        handleClose();
    };

    if (loading) return <CircularProgress />;

    return (
        <TableContainer>
            <Table>
                <TableHead style={{ backgroundColor: "#0b2f6a" }}>
                    <TableRow>
                        <TableCell style={{ color: "white" }}>Sr</TableCell>
                        <TableCell style={{ color: "white" }}>Invoice Number</TableCell>
                        <TableCell style={{ color: "white" }}>Amount</TableCell>
                        <TableCell style={{ color: "white" }}>Date</TableCell>
                        <TableCell style={{ color: "white" }}>Status</TableCell>
                        <TableCell style={{ color: "white" }} align="right">Actions</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {invoices.map((invoice, index) => (
                        <TableRow key={index}>
                            <TableCell>{index + 1}</TableCell>
                            <TableCell>{invoice.invoiceNumber}</TableCell>
                            <TableCell>${invoice.amount}</TableCell>
                            <TableCell>{new Date(invoice.date).toLocaleDateString()}</TableCell>
                            <TableCell>{invoice.status}</TableCell>
                            <TableCell align="right">
                                <IconButton onClick={() => handleOpen("view", invoice)}><Visibility /></IconButton>
                                <IconButton onClick={() => handleDownload(invoice)}><Download /></IconButton>
                                <IconButton onClick={() => handleOpen("edit", invoice)}><Edit /></IconButton>
                                <IconButton onClick={() => handleOpen("delete", invoice)}><Delete /></IconButton>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>

            {/* View Modal */}
            <Dialog open={openModal === "view"} onClose={handleClose} maxWidth="sm" fullWidth>
                <DialogTitle>Invoice Details</DialogTitle>
                <DialogContent>
                    <Typography><strong>Invoice Number:</strong> {selectedInvoice?.invoiceNumber}</Typography>
                    <Typography><strong>Amount:</strong> ${selectedInvoice?.amount}</Typography>
                    <Typography><strong>Date:</strong> {new Date(selectedInvoice?.date).toLocaleDateString()}</Typography>
                    <Typography><strong>Status:</strong> {selectedInvoice?.status}</Typography>

                    {selectedInvoice?.file?.data && (
                        <iframe
                            src={URL.createObjectURL(
                                new Blob([new Uint8Array(selectedInvoice.file.data)], { type: selectedInvoice.mimeType })
                            )}
                            title="Invoice File"
                            width="100%"
                            height="400px"
                            style={{ marginTop: "1rem", borderRadius: 8 }}
                        />
                    )}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">Close</Button>
                </DialogActions>
            </Dialog>

            {/* Edit Modal */}
            <Dialog open={openModal === "edit"} onClose={handleClose}>
                <DialogTitle>Edit Invoice</DialogTitle>
                <DialogContent>
                    <TextField
                        margin="dense"
                        label="Invoice Number"
                        fullWidth
                        value={editData.invoiceNumber || ""}
                        onChange={(e) => setEditData({ ...editData, invoiceNumber: e.target.value })}
                    />
                    <TextField
                        margin="dense"
                        label="Amount"
                        type="number"
                        fullWidth
                        value={editData.amount || ""}
                        onChange={(e) => setEditData({ ...editData, amount: e.target.value })}
                    />
                    <TextField
                        margin="dense"
                        label="Date"
                        type="date"
                        fullWidth
                        value={editData.date?.slice(0, 10) || ""}
                        onChange={(e) => setEditData({ ...editData, date: e.target.value })}
                        InputLabelProps={{ shrink: true }}
                    />
                    <FormControl fullWidth style={{ marginTop: 16 }}>
                        <InputLabel>Status</InputLabel>
                        <Select
                            value={editData.status || "Pending"}
                            onChange={(e) => setEditData({ ...editData, status: e.target.value })}
                        >
                            <MenuItem value="Pending">Pending</MenuItem>
                            <MenuItem value="Paid">Paid</MenuItem>
                            <MenuItem value="Unpaid">Unpaid</MenuItem>
                        </Select>
                    </FormControl>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="secondary">Cancel</Button>
                    <Button onClick={handleUpdate} color="primary" variant="contained">Update</Button>
                </DialogActions>
            </Dialog>

            {/* Delete Modal */}
            <Dialog open={openModal === "delete"} onClose={handleClose}>
                <DialogTitle>Confirm Delete</DialogTitle>
                <DialogContent>
                    <Typography>Are you sure you want to delete this invoice?</Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">Cancel</Button>
                    <Button onClick={handleDelete} color="secondary" variant="contained">Delete</Button>
                </DialogActions>
            </Dialog>
        </TableContainer>
    );
}

export default DisplayInvoice;
