import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  CircularProgress,
  Paper,
  Box,
  TextField
} from "@mui/material";
import { Visibility, Download } from "@mui/icons-material";
import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;

function DisplayResult() {
  const [results, setResults] = useState([]);
  const [filteredResults, setFilteredResults] = useState([]);
  const [loading, setLoading] = useState(true);

  const [openViewModal, setOpenViewModal] = useState(false);
  const [openDownloadModal, setOpenDownloadModal] = useState(false);
  const [selectedResult, setSelectedResult] = useState(null);

  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const res = await axios.get(`${API_URL}/admin/getAllResult`);
        setResults(res.data.data || []);
        setFilteredResults(res.data.data || []);
      } catch (err) {
        console.error("Error fetching results:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchResults();
  }, []);

  useEffect(() => {
    const lower = searchTerm.toLowerCase();
    setFilteredResults(
      results.filter(
        (r) =>
          r.driverName?.toLowerCase().includes(lower) ||
          r.companyName?.toLowerCase().includes(lower)
      )
    );
  }, [searchTerm, results]);

  const handleView = (result) => {
    setSelectedResult(result);
    setOpenViewModal(true);
  };

  const handleCloseView = () => {
    setOpenViewModal(false);
    setSelectedResult(null);
  };

  const handleOpenDownload = (result) => {
    setSelectedResult(result);
    setOpenDownloadModal(true);
  };

  const handleCloseDownload = () => {
    setOpenDownloadModal(false);
    setSelectedResult(null);
  };

  const downloadFile = (file) => {
    try {
      const base64Data = file.url.split(",")[1];
      const byteArray = Uint8Array.from(atob(base64Data), (c) =>
        c.charCodeAt(0)
      );
      const blobType = file.url.match(/^data:(.+);base64/)?.[1] || "application/octet-stream";
      const blob = new Blob([byteArray], { type: blobType });
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = file.filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (err) {
      console.error("Error downloading file:", err);
    }
  };

  if (loading) return <CircularProgress sx={{ mt: 5 }} />;

  return (
    <Box>
      <TableContainer component={Paper} sx={{ mt: 3, p: 2, borderRadius: 2, boxShadow: 3 }}>
        <Box
          sx={{
            mb: 2,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
          }}
        >
          <Typography variant="h6" sx={{ fontWeight: "bold" }}>
            Result List
          </Typography>
          <TextField
            size="small"
            placeholder="Search by Name or Company"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            sx={{ width: "250px", mt: { xs: 1, sm: 0 } }}
          />
        </Box>

        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: "#003366" }}>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>Sr</TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>Company Name</TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>Name</TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>License #</TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>Test Date</TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>Test Type</TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>Result Status</TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>Order Status</TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>Case Number</TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold" }} align="right">
                Actions
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredResults.map((result, index) => (
              <TableRow key={index} hover>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{result.companyName}</TableCell>
                <TableCell>{result.driverName}</TableCell>
                <TableCell>{result.licenseNumber}</TableCell>
                <TableCell>
                  {new Date(result.testDate).toLocaleDateString("en-US")}
                </TableCell>
                <TableCell>{result.testType}</TableCell>
                <TableCell>
                  <Typography
                    sx={{
                      color:
                        result.resultStatus?.toLowerCase() === "positive"
                          ? "red"
                          : result.resultStatus?.toLowerCase() === "negative"
                          ? "green"
                          : "orange",
                      fontWeight: "bold",
                    }}
                  >
                    {result.resultStatus}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography
                    sx={{
                      color:
                        result.orderStatus?.toLowerCase() === "pending"
                          ? "red"
                          : result.orderStatus?.toLowerCase() === "completed"
                          ? "green"
                          : "orange",
                      fontWeight: "bold",
                    }}
                  >
                    {result.orderStatus}
                  </Typography>
                </TableCell>
                <TableCell>{result.caseNumber}</TableCell>
                <TableCell align="right">
                  <IconButton onClick={() => handleView(result)}>
                    <Visibility />
                  </IconButton>
                  <IconButton onClick={() => handleOpenDownload(result)}>
                    <Download />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* View Modal */}
      <Dialog open={openViewModal} onClose={handleCloseView} maxWidth="sm" fullWidth>
        <DialogTitle>Result Details</DialogTitle>
        <DialogContent>
          <Typography gutterBottom>
            <strong>Name:</strong> {selectedResult?.driverName}
          </Typography>
          <Typography gutterBottom>
            <strong>License Number:</strong> {selectedResult?.licenseNumber}
          </Typography>
          <Typography gutterBottom>
            <strong>Company Name:</strong> {selectedResult?.companyName}
          </Typography>
          <Typography gutterBottom>
            <strong>Date:</strong>{" "}
            {selectedResult?.testDate
              ? new Date(selectedResult.testDate).toLocaleDateString("en-US")
              : ""}
          </Typography>
          <Typography gutterBottom>
            <strong>Test Type:</strong> {selectedResult?.testType}
          </Typography>

          {selectedResult?.resultImages?.length > 0 ? (
            selectedResult.resultImages.map((file, i) => {
              const url = file.url;
              const isPDF = url.startsWith("data:application/pdf");
              return isPDF ? (
                <iframe
                  key={i}
                  src={url}
                  title={file.filename}
                  width="100%"
                  height="500px"
                  style={{ borderRadius: 8, marginTop: "1rem" }}
                />
              ) : (
                <Box
                  key={i}
                  component="img"
                  src={url}
                  alt={file.filename}
                  sx={{ width: "100%", borderRadius: 1, mt: 2 }}
                />
              );
            })
          ) : (
            <Typography sx={{ mt: 2, fontStyle: "italic" }}>
              No image available to show.
            </Typography>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseView}>Close</Button>
        </DialogActions>
      </Dialog>

      {/* Download Modal */}
      <Dialog open={openDownloadModal} onClose={handleCloseDownload}>
        <DialogTitle>Select file to download</DialogTitle>
        <DialogContent dividers>
          {selectedResult?.resultImages?.length > 0 ? (
            selectedResult.resultImages.map((file, i) => (
              <Button
                key={i}
                fullWidth
                sx={{ mb: 1 }}
                onClick={() => {
                  downloadFile(file);
                  handleCloseDownload();
                }}
              >
                {file.filename}
              </Button>
            ))
          ) : (
            <Typography>No files available for download.</Typography>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDownload}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default DisplayResult;
