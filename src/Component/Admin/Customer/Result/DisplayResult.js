import React, { useContext, useState, useEffect } from "react";
import {
    Dialog, DialogTitle, DialogContent, DialogActions, Button,
    IconButton, Table, TableBody, TableCell, TableContainer,
    TableHead, TableRow, Typography, TextField, MenuItem, CircularProgress
} from "@mui/material";
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

    const handleDownload = (result) => {
        if (!result?.file || !result?.mimeType) return;

        const link = document.createElement("a");
        link.href = `data:${result.mimeType};base64,${result.file}`;
        link.download = result.resultNumber || "result.pdf";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
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
                return "#f44336";
            case "Pending":
                return "#ff9800";
            case "Negative":
                return " #4caf50 ";
            case "In Progress":
                return "#ff9800";
            default:
                return "#000";
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

                    {selectedResult?.mimeType?.startsWith("image/") ? (
                        <img
                            src={`data:${selectedResult.mimeType};base64,${selectedResult.file}`}
                            alt="Invoice"
                            style={{ width: "100%", marginTop: "1rem", borderRadius: 8 }}
                        />
                    ) : selectedResult?.mimeType === "application/pdf" ? (
                        <iframe
                            src={`data:${selectedResult.mimeType};base64,${selectedResult.file}`}
                            title="PDF Preview"
                            style={{ width: "100%", height: "500px", marginTop: "1rem", borderRadius: 8 }}
                        />
                    ) : (
                        <Typography sx={{ mt: 2 }}>
                            <em>Preview not available for this file type. Please download to view.</em>
                        </Typography>
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
