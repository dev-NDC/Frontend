import React, { useContext, useState, useEffect } from "react";
import {
    Dialog, DialogTitle, DialogContent, DialogActions, Button,
    IconButton, Table, TableBody, TableCell, TableContainer,
    TableHead, TableRow, Typography, CircularProgress
} from "@mui/material";
import { Visibility, Download } from "@mui/icons-material";
import CustomerContext from "../../../../Context/Agency/Customer/CustomerContext";

function DisplayResult() {
    const { userDetails } = useContext(CustomerContext);

    const [loading, setLoading] = useState(true);
    const [results, setResults] = useState([]);
    const [openModal, setOpenModal] = useState(null);
    const [selectedResult, setSelectedResult] = useState(null);

    useEffect(() => {
        if (userDetails?.results) {
            setResults(userDetails.results);
            setLoading(false);
        }
    }, [userDetails]);

    const handleOpen = (type, result) => {
        setSelectedResult(result);
        setOpenModal(type);
    };

    const handleClose = () => {
        setOpenModal(null);
        setSelectedResult(null);
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

    const getStatusColor = (status) => {
        if (status?.toLowerCase() === "negative") return "green";
        if (status?.toLowerCase() === "positive") return "red";
        return "orange";
    };

    const formatDate = (date) =>
        date ? new Date(date).toLocaleDateString("en-US", {
            month: "2-digit",
            day: "2-digit",
            year: "numeric"
        }) : "N/A";

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
                    {results.length > 0 ? (
                        results.map((result, index) => (
                            <TableRow key={index}>
                                <TableCell>{index + 1}</TableCell>
                                <TableCell>{result.driverName}</TableCell>
                                <TableCell>{result.licenseNumber}</TableCell>
                                <TableCell>{formatDate(result.date)}</TableCell>
                                <TableCell>{result.testType}</TableCell>
                                <TableCell sx={{ fontWeight: "bold", color: getStatusColor(result.status) }}>
                                    {result.status}
                                </TableCell>
                                <TableCell>{result.caseNumber}</TableCell>
                                <TableCell align="right">
                                    <IconButton onClick={() => handleOpen("view", result)}><Visibility /></IconButton>
                                    <IconButton onClick={() => handleDownload(result)}><Download /></IconButton>
                                </TableCell>
                            </TableRow>
                        ))
                    ) : (
                        <TableRow>
                            <TableCell colSpan={8} align="center">
                                <b>No Result to display</b>
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>

            {/* View Modal */}
            <Dialog open={openModal === "view"} onClose={handleClose} maxWidth="sm" fullWidth>
                <DialogTitle>Result Details</DialogTitle>
                <DialogContent>
                    <Typography gutterBottom><strong>Name:</strong> {selectedResult?.driverName}</Typography>
                    <Typography gutterBottom><strong>License Number:</strong> {selectedResult?.licenseNumber}</Typography>
                    <Typography gutterBottom><strong>Date:</strong> {formatDate(selectedResult?.date)}</Typography>
                    <Typography gutterBottom><strong>Test Type:</strong> {selectedResult?.testType}</Typography>
                    <Typography gutterBottom sx={{ fontWeight: "bold", color: getStatusColor(selectedResult?.status) }}>
                        <strong>Status:</strong> {selectedResult?.status}
                    </Typography>
                    <Typography gutterBottom><strong>Case Number:</strong> {selectedResult?.caseNumber}</Typography>

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
                    <Button onClick={handleClose} color="primary">Close</Button>
                </DialogActions>
            </Dialog>
        </TableContainer>
    );
}

export default DisplayResult;
