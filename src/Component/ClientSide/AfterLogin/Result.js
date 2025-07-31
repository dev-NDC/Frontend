// src/components/Result.js
import React, { useState, useEffect, useContext } from "react";
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  IconButton, Menu, MenuItem, Paper, Dialog, DialogTitle,
  DialogContent, DialogActions, Button, Typography, Box, useMediaQuery
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import HomeContext from "../../../Context/ClientSide/AfterLogin/Home/HomeContext";

export default function Result() {
  const [menuAnchor, setMenuAnchor]       = useState(null);
  const [selectedResult, setSelectedResult] = useState(null);
  const [viewOpen, setViewOpen]           = useState(false);
  const isTablet                          = useMediaQuery("(max-width:1200px)");
  const isMobile                          = useMediaQuery("(max-width:500px)");
  const { userData }                      = useContext(HomeContext);
  const [results, setResults]             = useState([]);

  useEffect(() => {
    if (userData?.results) {
      setResults(userData.results);
    }
  }, [userData]);

  const handleMenuOpen = (e, result) => {
    setMenuAnchor(e.currentTarget);
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
    if (!status) return "#f8bf2c";
    const s = status.toLowerCase();
    if (s === "negative" || s === "completed") return "green";
    if (s === "positive") return "red";
    return "#f8bf2c";
  };

  const downloadFile = (file) => {
    const link = document.createElement("a");
    link.href = file.url;
    link.download = file.filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="container" style={{ marginTop: 100 }}>
      <Typography variant="h3" align="center" gutterBottom>
        Test Results
      </Typography>
      <TableContainer component={Paper} sx={{ mt: 3, p: 2, borderRadius: 2, boxShadow: 3, overflowX: "auto" }}>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: "#003366" }}>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>Sr</TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>Driver Name</TableCell>
              {!isMobile && !isTablet && <TableCell sx={{ color: "white", fontWeight: "bold" }}>License #</TableCell>}
              {!isMobile && !isTablet && <TableCell sx={{ color: "white", fontWeight: "bold" }}>Date</TableCell>}
              {!isMobile && <TableCell sx={{ color: "white", fontWeight: "bold" }}>Test Type</TableCell>}
              {!isMobile && <TableCell sx={{ color: "white", fontWeight: "bold" }}>Order Status</TableCell>}
              {!isMobile && <TableCell sx={{ color: "white", fontWeight: "bold" }}>Result Status</TableCell>}
              {!isMobile && <TableCell sx={{ color: "white", fontWeight: "bold" }}>Case Number</TableCell>}
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {results.map((r, idx) => (
              <TableRow key={idx} hover>
                <TableCell>{idx + 1}</TableCell>
                <TableCell>{r.driverName}</TableCell>
                {!isMobile && !isTablet && <TableCell>{r.licenseNumber}</TableCell>}
                {!isMobile && !isTablet && (
                  <TableCell>{new Date(r.date).toLocaleDateString("en-US")}</TableCell>
                )}
                {!isMobile && <TableCell>{r.testType}</TableCell>}
                {!isMobile && (
                  <TableCell sx={{ fontWeight: "bold", color: getStatusColor(r.orderStatus) }}>
                    {r.orderStatus || "N/A"}
                  </TableCell>
                )}
                {!isMobile && (
                  <TableCell sx={{ fontWeight: "bold", color: getStatusColor(r.resultStatus) }}>
                    {r.resultStatus || "N/A"}
                  </TableCell>
                )}
                {!isMobile && <TableCell>{r.caseNumber}</TableCell>}
                <TableCell>
                  <IconButton onClick={(e) => handleMenuOpen(e, r)}>
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
          <DialogContent dividers>
            <Typography gutterBottom><strong>Name:</strong> {selectedResult?.driverName}</Typography>
            <Typography gutterBottom><strong>License #:</strong> {selectedResult?.licenseNumber}</Typography>
            <Typography gutterBottom><strong>Date:</strong> {selectedResult && new Date(selectedResult.date).toLocaleDateString("en-US")}</Typography>
            <Typography gutterBottom><strong>Test Type:</strong> {selectedResult?.testType}</Typography>
            <Typography gutterBottom>
              <strong>Order Status:</strong>{" "}
              <span style={{ color: getStatusColor(selectedResult?.orderStatus), fontWeight: "bold" }}>
                {selectedResult?.orderStatus || "N/A"}
              </span>
            </Typography>
            <Typography gutterBottom>
              <strong>Result Status:</strong>{" "}
              <span style={{ color: getStatusColor(selectedResult?.resultStatus), fontWeight: "bold" }}>
                {selectedResult?.resultStatus || "N/A"}
              </span>
            </Typography>
            <Typography gutterBottom><strong>Case Number:</strong> {selectedResult?.caseNumber}</Typography>

            {selectedResult?.resultImages?.length > 0 ? (
              selectedResult.resultImages.map((file, i) => (
                <Box key={i} sx={{ mt: 2 }}>
                  {file.mimeType === "application/pdf" ? (
                    <iframe
                      src={file.url}
                      title={file.filename}
                      width="100%"
                      height="400px"
                      style={{ borderRadius: 8 }}
                    />
                  ) : (
                    <Box
                      component="img"
                      src={file.url}
                      alt={file.filename}
                      sx={{ width: "100%", borderRadius: 1 }}
                    />
                  )}
                  <Button sx={{ mt: 1 }} variant="outlined" onClick={() => downloadFile(file)}>
                    Download {file.filename}
                  </Button>
                </Box>
              ))
            ) : (
              <Typography sx={{ mt: 2, fontStyle: "italic" }}>
                No files available to view/download.
              </Typography>
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
