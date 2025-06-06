import React, { useContext, useState, useEffect } from "react";
import {
    Dialog, DialogTitle, DialogContent, DialogActions, Button,
    IconButton, Table, TableBody, TableCell, TableContainer,
    TableHead, TableRow, Typography, TextField, MenuItem, CircularProgress
} from "@mui/material";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { Edit, Delete, Visibility, Download } from "@mui/icons-material";
import CustomerContext from "../../../../Context/Admin/Customer/CustomerContext";
import ResultContext from "../../../../Context/Admin/Customer/Result/ResultContext";

function DisplayResult() {
    const { currentId, userDetails, getSingleUserData } = useContext(CustomerContext);
    const { updateResult, deleteResult } = useContext(ResultContext);

    const [loading, setLoading] = useState(true);
    const [results, setResults] = useState([]);
    const [openModal, setOpenModal] = useState(null);
    const [selectedResult, setSelectedResult] = useState(null);
    const [editData, setEditData] = useState({});
    const [previewUrl, setPreviewUrl] = useState(null);

    useEffect(() => {
        if (userDetails?.results) {
            setResults(userDetails.results);
            setLoading(false);
        }
    }, [userDetails]);

    useEffect(() => {
        return () => {
            if (previewUrl) URL.revokeObjectURL(previewUrl);
        };
    }, [previewUrl]);

    const handleOpen = (type, result) => {
        setSelectedResult(result);
        setEditData({ status: result.status });
        if (previewUrl) URL.revokeObjectURL(previewUrl);
        setPreviewUrl(null);
        setOpenModal(type);
    };

    const handleClose = () => {
        setOpenModal(null);
        setSelectedResult(null);
        setEditData({});
        if (previewUrl) URL.revokeObjectURL(previewUrl);
        setPreviewUrl(null);
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
            <p><strong>Name:</strong> ${result.driverName}</p>
            <p><strong>License Number:</strong> ${result.licenseNumber}</p>
            <p><strong>Date:</strong> ${new Date(result.date).toLocaleDateString("en-US")}</p>
            <p><strong>Test Type:</strong> ${result.testType}</p>
            <img id="resultImage" src="" style="width:100%; margin-top:10px; border-radius:10px;" />
        `;

        const imageUrl = `data:${result.mimeType};base64,${result.file}`;
        container.querySelector("#resultImage").src = imageUrl;

        document.body.appendChild(container);

        const canvas = await html2canvas(container, { scale: 2 });
        const imgData = canvas.toDataURL("image/png");

        const pdf = new jsPDF("p", "mm", "a4");
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

        pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
        pdf.save(`${result.driverName || "result"}.pdf`);

        document.body.removeChild(container);
    };

    const handleUpdate = async () => {
        const formData = new FormData();
        formData.append("currentId", currentId);
        formData.append("resultId", selectedResult._id);
        formData.append("updatedData", JSON.stringify(editData));

        if (previewUrl && document.querySelector("input[type='file']").files[0]) {
            formData.append("file", document.querySelector("input[type='file']").files[0]);
        }

        await updateResult(formData);
        getSingleUserData(currentId);
        handleClose();
    };

    const handleDelete = async () => {
        await deleteResult(currentId, selectedResult._id);
        getSingleUserData(currentId);
        handleClose();
    };

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const objectURL = URL.createObjectURL(file);
            setPreviewUrl(objectURL);

            const reader = new FileReader();
            reader.onload = (ev) => {
                if (ev.target.result) {
                    const base64Data = ev.target.result.split(',')[1];
                    setEditData((prev) => ({
                        ...prev,
                        file: {
                            data: Array.from(atob(base64Data), c => c.charCodeAt(0))
                        },
                        mimeType: file.type
                    }));
                }
            };
            reader.readAsDataURL(file);
        }
    };

    const getStatusTextColor = (status) => {
        switch (status) {
            case "Positive":
                return "#4caf50"; // Green
            case "Pending":
                return "#fbc02d"; // Yellow
            case "Negative":
                return "#f44336"; // Red
            case "In Progress":
                return "#ff9800"; // Orange
            default:
                return "#000"; // Default black
        }
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
                            <TableCell>{result.driverName}</TableCell>
                            <TableCell>{result.licenseNumber}</TableCell>
                            <TableCell>{new Date(result.date).toLocaleDateString("en-US")}</TableCell>
                            <TableCell>{result.testType}</TableCell>
                            <TableCell style={{ color: getStatusTextColor(result.status), fontWeight: "bold" }}>
                                {result.status}
                            </TableCell>
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
                    <Typography gutterBottom><strong>Name:</strong> {selectedResult?.driverName}</Typography>
                    <Typography gutterBottom><strong>License Number:</strong> {selectedResult?.licenseNumber}</Typography>
                    <Typography gutterBottom><strong>Date:</strong> {new Date(selectedResult?.date).toLocaleDateString("en-US")}</Typography>
                    <Typography gutterBottom><strong>Test Type:</strong> {selectedResult?.testType}</Typography>

                    {selectedResult?.file && (
                        <img
                            src={`data:${selectedResult.mimeType};base64,${selectedResult.file}`}
                            alt="Result"
                            style={{ width: "100%", marginTop: "1rem", borderRadius: 8 }}
                        />
                    )}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Close</Button>
                </DialogActions>
            </Dialog>

            {/* Edit Modal */}
            <Dialog open={openModal === "edit"} onClose={handleClose} maxWidth="sm" fullWidth>
                <DialogTitle>Edit Result</DialogTitle>
                <DialogContent>
                    <TextField
                        select
                        label="Status"
                        margin="dense"
                        fullWidth
                        value={editData.status || ""}
                        onChange={(e) => setEditData({ ...editData, status: e.target.value })}
                    >
                        <MenuItem value="">Select Status</MenuItem>
                        <MenuItem value="Pending">Pending</MenuItem>
                        <MenuItem value="Positive">Positive</MenuItem>
                        <MenuItem value="Negative">Negative</MenuItem>
                        <MenuItem value="In Progress">In Progress</MenuItem>
                    </TextField>

                    <Button variant="contained" component="label" sx={{ mt: 2 }}>
                        Upload Image
                        <input type="file" hidden accept="image/*" onChange={handleImageUpload} />
                    </Button>

                    <div style={{ marginTop: "1rem" }}>
                        <Typography variant="subtitle2">Image Preview:</Typography>
                        {previewUrl ? (
                            <img src={previewUrl} alt="New Preview" style={{ width: "100%", borderRadius: 8 }} />
                        ) : selectedResult?.file ? (
                            <img
                                src={`data:${selectedResult.mimeType};base64,${selectedResult.file}`}
                                alt="Current"
                                style={{ width: "100%", borderRadius: 8 }}
                            />
                        ) : (
                            <Typography color="text.secondary">No image available.</Typography>
                        )}
                    </div>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleUpdate} variant="contained" color="primary">Update</Button>
                </DialogActions>
            </Dialog>

            {/* Delete Modal */}
            <Dialog open={openModal === "delete"} onClose={handleClose}>
                <DialogTitle>Confirm Delete</DialogTitle>
                <DialogContent>
                    <Typography>Are you sure you want to delete this result?</Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleDelete} color="secondary" variant="contained">Delete</Button>
                </DialogActions>
            </Dialog>
        </TableContainer>
    );
}

export default DisplayResult;
