import React, { useContext, useState, useEffect } from "react";
import {
    Dialog, DialogTitle, DialogContent, DialogActions, Button,
    IconButton, Table, TableBody, TableCell, TableContainer,
    TableHead, TableRow, Typography, CircularProgress
} from "@mui/material";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
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
        <p><strong>Date:</strong> ${new Date(result.date).toLocaleDateString()}</p>
        <p><strong>Test Type:</strong> ${result.testType}</p>
        <p><strong>Status:</strong> ${result.status}</p>
        <p><strong>Case Number:</strong> ${result.caseNumber}</p>
        <img id="resultImage" src="data:${result.mimeType};base64,${result.file}" 
             style="width:100%; margin-top:10px; border-radius:10px;" />
    `;

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
                                <TableCell>{new Date(result.date).toLocaleDateString()}</TableCell>
                                <TableCell>{result.testType}</TableCell>
                                <TableCell>{result.status}</TableCell>
                                <TableCell>{result.caseNumber}</TableCell>
                                <TableCell align="right">
                                    <IconButton onClick={() => handleOpen("view", result)}><Visibility /></IconButton>
                                    <IconButton onClick={() => handleDownload(result)}><Download /></IconButton>
                                </TableCell>
                            </TableRow>
                        ))
                    ) : (
                        <TableRow>
                            <TableCell colSpan={6} align="center">
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
                    <Typography gutterBottom><strong>Date:</strong> {new Date(selectedResult?.date).toLocaleDateString()}</Typography>
                    <Typography gutterBottom><strong>Test Type:</strong> {selectedResult?.testType}</Typography>
                    <Typography gutterBottom><strong>Status:</strong> {selectedResult?.status}</Typography>
                    <Typography gutterBottom><strong>Case Number:</strong> {selectedResult?.caseNumber}</Typography>

                    {selectedResult?.file && (
                        <img
                            src={`data:${selectedResult.mimeType};base64,${selectedResult.file}`}
                            alt="Result"
                            style={{ width: "100%", marginTop: "1rem", borderRadius: 8 }}
                        />
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
