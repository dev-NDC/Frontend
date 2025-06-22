import React, { useState, useEffect, useContext } from "react";
import {
    Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
    IconButton, Menu, MenuItem, Paper, Dialog, DialogTitle,
    DialogContent, DialogActions, Button, Typography, useMediaQuery
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import HomeContext from "../../../Context/ClientSide/AfterLogin/Home/HomeContext";

function Result() {
    const [menuAnchor, setMenuAnchor] = useState(null);
    const [selectedResult, setSelectedResult] = useState(null);
    const [viewOpen, setViewOpen] = useState(false);
    const isTablet = useMediaQuery("(max-width:1200px)");
    const isMobile = useMediaQuery("(max-width:500px)");
    const { userData } = useContext(HomeContext);
    const [results, setResults] = useState([]);

    useEffect(() => {
        if (userData) {
            setResults(userData.results);
        }
    }, [userData]);

    const handleMenuOpen = (event, result) => {
        setMenuAnchor(event.currentTarget);
        setSelectedResult(result);
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
        setSelectedResult(null);
    };

    const getStatusColor = (status) => {
        if (!status) return "#f8bf2c"; // yellow for undefined/null
        const normalized = status.toLowerCase();
        if (normalized === "negative") return "green";
        if (normalized === "positive") return "red";
        return "#f8bf2c"; // yellow for all others
    };

    return (
        <div className="container" style={{ marginTop: '100px' }}>
            <Typography variant="h3" align="center" gutterBottom>Test Results</Typography>
            <TableContainer component={Paper} sx={{ mt: 3, p: 2, borderRadius: 2, boxShadow: 3, overflowX: "auto" }}>
                <Table>
                    <TableHead>
                        <TableRow sx={{ backgroundColor: "#003366" }}>
                            <TableCell sx={{ color: "white", fontWeight: "bold" }}>Sr</TableCell>
                            <TableCell sx={{ color: "white", fontWeight: "bold" }}>Driver Name</TableCell>
                            {!isMobile && !isTablet && <TableCell sx={{ color: "white", fontWeight: "bold" }}>License #</TableCell>}
                            {!isMobile && !isTablet && <TableCell sx={{ color: "white", fontWeight: "bold" }}>Date</TableCell>}
                            {!isMobile && <TableCell sx={{ color: "white", fontWeight: "bold" }}>Test Type</TableCell>}
                            {!isMobile && <TableCell sx={{ color: "white", fontWeight: "bold" }}>Status</TableCell>}
                            {!isMobile && <TableCell sx={{ color: "white", fontWeight: "bold" }}>Case Number</TableCell>}
                            <TableCell sx={{ color: "white", fontWeight: "bold" }}>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {results.map((result, index) => (
                            <TableRow key={index} hover>
                                <TableCell>{index + 1}</TableCell>
                                <TableCell>{result.driverName}</TableCell>
                                {!isMobile && !isTablet && <TableCell>{result.licenseNumber}</TableCell>}
                                {!isMobile && !isTablet && (
                                    <TableCell>{new Date(result.date).toLocaleDateString("en-US")}</TableCell>
                                )}
                                {!isMobile && <TableCell>{result.testType}</TableCell>}
                                {!isMobile && (
                                    <TableCell
                                        sx={{
                                            fontWeight: "bold",
                                            color: getStatusColor(result.status)
                                        }}
                                    >
                                        {result.status || "N/A"}
                                    </TableCell>
                                )}
                                {!isMobile && <TableCell>{result.caseNumber}</TableCell>}
                                <TableCell>
                                    <IconButton onClick={(event) => handleMenuOpen(event, result)}>
                                        <MoreVertIcon />
                                    </IconButton>
                                    <Menu anchorEl={menuAnchor} open={Boolean(menuAnchor)} onClose={handleMenuClose}>
                                        <MenuItem onClick={handleViewOpen}>View More Details</MenuItem>
                                    </Menu>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>

                {/* View Modal */}
                <Dialog open={viewOpen} onClose={handleViewClose} maxWidth="sm" fullWidth>
                    <DialogTitle>Result Details</DialogTitle>
                    <DialogContent>
                        <Typography gutterBottom><strong>Name:</strong> {selectedResult?.driverName}</Typography>
                        <Typography gutterBottom><strong>License Number:</strong> {selectedResult?.licenseNumber}</Typography>
                        <Typography gutterBottom><strong>Date:</strong> {new Date(selectedResult?.date).toLocaleDateString("en-US")}</Typography>
                        <Typography gutterBottom><strong>Test Type:</strong> {selectedResult?.testType}</Typography>
                        <Typography gutterBottom>
                            <strong>Status:</strong>{" "}
                            <span style={{ color: getStatusColor(selectedResult?.status), fontWeight: "bold" }}>
                                {selectedResult?.status || "N/A"}
                            </span>
                        </Typography>
                        <Typography gutterBottom><strong>Case Number:</strong> {selectedResult?.caseNumber}</Typography>
                        {selectedResult?.file && (
    <>
        {selectedResult.mimeType === "application/pdf" ? (
            <iframe
                title="PDF Preview"
                src={`data:application/pdf;base64,${selectedResult.file}`}
                style={{
                    width: "100%",
                    height: "500px",
                    marginTop: "1rem",
                    border: "1px solid #ccc",
                    borderRadius: 8
                }}
            />
        ) : (
            <img
                src={`data:${selectedResult.mimeType};base64,${selectedResult.file}`}
                alt="Result"
                style={{ width: "100%", marginTop: "1rem", borderRadius: 8 }}
            />
        )}
    </>
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

export default Result;
