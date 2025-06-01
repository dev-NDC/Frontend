import React, { useEffect, useState } from "react";
import {
    Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
    IconButton, Dialog, DialogTitle, DialogContent, DialogActions, Button,
    Typography, CircularProgress
} from "@mui/material";
import { Visibility, Download } from "@mui/icons-material";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import axios from "axios";


const API_URL = process.env.REACT_APP_API_URL;

function DisplayResult() {
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(true);
    const [openModal, setOpenModal] = useState(false);
    const [selectedResult, setSelectedResult] = useState(null);

    useEffect(() => {
        const fetchResults = async () => {
            try {
                const res = await axios.get(`${API_URL}/admin/getAllResult`);
                console.log(res.data.data)
                setResults(res.data.data || []);
            } catch (err) {
                console.error("Error fetching results:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchResults();
    }, []);

    const handleView = (result) => {
        setSelectedResult(result);
        setOpenModal(true);
    };

    const handleClose = () => {
        setOpenModal(false);
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

    if (loading) return <CircularProgress />;

    return (
        <TableContainer>
            <Table>
                <TableHead style={{ backgroundColor: "#0b2f6a" }}>
                    <TableRow>
                        <TableCell style={{ color: "white" }}>Sr</TableCell>
                        <TableCell style={{ color: "white" }}>Company Name</TableCell>
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
                            <TableCell>{result.companyName}</TableCell>
                            <TableCell>{result.driverName}</TableCell>
                            <TableCell>{result.licenseNumber}</TableCell>
                            <TableCell>{new Date(result.testDate).toLocaleDateString()}</TableCell>
                            <TableCell>{result.testType}</TableCell>
                            <TableCell>{result.status}</TableCell>
                            <TableCell>{result.caseNumber}</TableCell>
                            <TableCell align="right">
                                <IconButton onClick={() => handleView(result)}><Visibility /></IconButton>
                                <IconButton onClick={() => handleDownload(result)}><Download /></IconButton>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>

            {/* View Modal */}
            <Dialog open={openModal} onClose={handleClose} maxWidth="sm" fullWidth>
                <DialogTitle>Result Details</DialogTitle>
                <DialogContent>
                    <Typography gutterBottom><strong>Name:</strong> {selectedResult?.driverName}</Typography>
                    <Typography gutterBottom><strong>License Number:</strong> {selectedResult?.licenseNumber}</Typography>
                    <Typography gutterBottom><strong>Date:</strong> {new Date(selectedResult?.date).toLocaleDateString()}</Typography>
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
        </TableContainer>
    );
}

export default DisplayResult;
