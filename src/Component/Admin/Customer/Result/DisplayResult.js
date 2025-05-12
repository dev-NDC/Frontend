import React, { useContext, useState, useEffect } from "react";
import {
    Dialog, DialogTitle, DialogContent, DialogActions, Button,
    IconButton, Table, TableBody, TableCell, TableContainer,
    TableHead, TableRow, Typography, TextField, CircularProgress
} from "@mui/material";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { Edit, Delete, Visibility, Download } from "@mui/icons-material";
import CustomerContext from "../../../../Context/Admin/Customer/CustomerContext";
import ResultContext from "../../../../Context/Admin/Customer/Result/ResultContext";

function DisplayResult() {
    const { currentId, userDetails,getSingleUserData } = useContext(CustomerContext);
    const { updateResult, deleteResult } = useContext(ResultContext);

    const [loading, setLoading] = useState(true);
    const [results, setResults] = useState([]);
    const [openModal, setOpenModal] = useState(null);
    const [selectedResult, setSelectedResult] = useState(null);
    const [editData, setEditData] = useState({});

    useEffect(() => {
        if (userDetails?.results) {
            setResults(userDetails.results);
            setLoading(false);
        }
    }, [userDetails]);

    const handleOpen = (type, result) => {
        setSelectedResult(result);
        setEditData(result);
        setOpenModal(type);
    };

    const handleClose = () => {
        setOpenModal(null);
        setSelectedResult(null);
        setEditData({});
    };

    const handleDownload = async (result) => {
        const container = document.createElement("div");
        container.style.position = "fixed";
        container.style.top = "-9999px";
        container.style.width = "600px";
        container.style.padding = "20px";
        container.style.backgroundColor = "white";
        container.innerHTML = `
            <h2>Test Result</h2>
            <p><strong>Name:</strong> ${result.name}</p>
            <p><strong>License Number:</strong> ${result.licenseNumber}</p>
            <p><strong>Date:</strong> ${new Date(result.date).toLocaleDateString()}</p>
            <p><strong>Test Type:</strong> ${result.testType}</p>
            <img id="resultImage" src="" style="width:100%; margin-top:10px; border-radius:10px;" />
        `;

        const blob = new Blob([new Uint8Array(result.file.data)], { type: result.mimeType });
        const imageUrl = URL.createObjectURL(blob);
        container.querySelector("#resultImage").src = imageUrl;

        document.body.appendChild(container);

        const canvas = await html2canvas(container, { scale: 2 });
        const imgData = canvas.toDataURL("image/png");

        const pdf = new jsPDF("p", "mm", "a4");
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

        pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
        pdf.save(`${result.name || "result"}.pdf`);

        document.body.removeChild(container);
        URL.revokeObjectURL(imageUrl);
    };

    const handleUpdate = async () => {
        await updateResult(currentId, selectedResult._id, editData);
        getSingleUserData(currentId);
        handleClose();
    };

    const handleDelete = async () => {
        await deleteResult(currentId, selectedResult._id);
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
                        <TableCell style={{ color: "white" }}>Name</TableCell>
                        <TableCell style={{ color: "white" }}>License #</TableCell>
                        <TableCell style={{ color: "white" }}>Test Date</TableCell>
                        <TableCell style={{ color: "white" }}>Test Type</TableCell>
                        <TableCell style={{ color: "white" }}>Status</TableCell>
                        <TableCell style={{ color: "white" }}>Case Number</TableCell>
                        <TableCell style={{ color: "white" }} align="right">Actions</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {results.map((result, index) => (
                        <TableRow key={index}>
                            <TableCell>{index + 1}</TableCell>
                            <TableCell>{result.name}</TableCell>
                            <TableCell>{result.licenseNumber}</TableCell>
                            <TableCell>{new Date(result.date).toLocaleDateString()}</TableCell>
                            <TableCell>{result.testType}</TableCell>
                            <TableCell>{result.status}</TableCell>
                            <TableCell>{result.caseNumber}</TableCell>
                            <TableCell align="right">
                                <IconButton onClick={() => handleOpen("view", result)}><Visibility /></IconButton>
                                <IconButton onClick={() => handleDownload(result)}><Download /></IconButton>
                                <IconButton onClick={() => handleOpen("edit", result)}><Edit /></IconButton>
                                <IconButton onClick={() => handleOpen("delete", result)}><Delete /></IconButton>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>

            {/* View Modal */}
            <Dialog open={openModal === "view"} onClose={handleClose} maxWidth="sm" fullWidth>
                <DialogTitle>Result Details</DialogTitle>
                <DialogContent>
                    <Typography gutterBottom><strong>Name:</strong> {selectedResult?.name}</Typography>
                    <Typography gutterBottom><strong>License Number:</strong> {selectedResult?.licenseNumber}</Typography>
                    <Typography gutterBottom><strong>Date:</strong> {new Date(selectedResult?.date).toLocaleDateString()}</Typography>
                    <Typography gutterBottom><strong>Test Type:</strong> {selectedResult?.testType}</Typography>

                    {selectedResult?.file?.data && (
                        <img
                            src={URL.createObjectURL(
                                new Blob(
                                    [new Uint8Array(selectedResult.file.data)],
                                    { type: selectedResult.mimeType || "image/png" }
                                )
                            )}
                            alt="Result"
                            style={{ width: "100%", marginTop: "1rem", borderRadius: 8 }}
                        />
                    )}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">Close</Button>
                </DialogActions>
            </Dialog>

            {/* Edit Modal */}
            <Dialog open={openModal === "edit"} onClose={handleClose}>
                <DialogTitle>Edit Result</DialogTitle>
                <DialogContent>
                    <TextField
                        margin="dense"
                        label="Name"
                        fullWidth
                        value={editData.name ?? ""}
                        onChange={(e) => setEditData({ ...editData, name: e.target.value })}
                    />

                    <TextField
                        margin="dense"
                        label="License Number"
                        fullWidth
                        value={editData.licenseNumber ?? ""}
                        onChange={(e) => setEditData({ ...editData, licenseNumber: e.target.value })}
                    />

                    <TextField
                        margin="dense"
                        label="Test Date"
                        type="date"
                        fullWidth
                        value={editData.date ? editData.date.slice(0, 10) : ""}
                        onChange={(e) => setEditData({ ...editData, date: e.target.value })}
                        InputLabelProps={{ shrink: true }}
                    />

                    <TextField
                        margin="dense"
                        label="Test Type"
                        fullWidth
                        value={editData.testType ?? ""}
                        onChange={(e) => setEditData({ ...editData, testType: e.target.value })}
                    />

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
                    <Typography>Are you sure you want to delete this result?</Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">Cancel</Button>
                    <Button onClick={handleDelete} color="secondary" variant="contained">Delete</Button>
                </DialogActions>
            </Dialog>
        </TableContainer>
    );
}

export default DisplayResult;
