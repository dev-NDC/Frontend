import React, { useEffect, useState } from "react";
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  IconButton, Dialog, DialogTitle, DialogContent, DialogActions, Button,
  Typography, CircularProgress, Paper, Box, TextField
} from "@mui/material";
import { Visibility, Download } from "@mui/icons-material";
import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;

function DisplayResult() {
  const [results, setResults] = useState([]);
  const [filteredResults, setFilteredResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openModal, setOpenModal] = useState(false);
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
    const filtered = results.filter((r) =>
      r.driverName?.toLowerCase().includes(lower) ||
      r.companyName?.toLowerCase().includes(lower)
    );
    setFilteredResults(filtered);
  }, [searchTerm, results]);

  const handleView = (result) => {
    setSelectedResult(result);
    setOpenModal(true);
  };

  const handleClose = () => {
    setOpenModal(false);
    setSelectedResult(null);
  };

const handleDownload = (result) => {
  try {
    const base64Data = result.resultImage?.split(',')[1];
    if (!base64Data) {
      alert("No PDF found to download.");
      return;
    }

    const byteArray = Uint8Array.from(atob(base64Data), (char) =>
      char.charCodeAt(0)
    );

    const blob = new Blob([byteArray], { type: "application/pdf" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `${result.driverName || "result"}.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  } catch (error) {
    console.error("Error downloading PDF:", error);
  }
};

      const blob = new Blob([byteArray], { type: "application/pdf" });
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = `${result.driverName || "result"}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error("Error downloading PDF:", error);
    }
  };

  if (loading) return <CircularProgress sx={{ mt: 5 }} />;

  return (
    <Box>
      <TableContainer component={Paper} sx={{ mt: 3, p: 2, borderRadius: 2, boxShadow: 3 }}>
        {/* Result List Heading and Search Bar */}
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
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>Status</TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>Case Number</TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold" }} align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredResults.map((result, index) => (
              <TableRow key={index} hover>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{result.companyName}</TableCell>
                <TableCell>{result.driverName}</TableCell>
                <TableCell>{result.licenseNumber}</TableCell>
                <TableCell>{new Date(result.testDate).toLocaleDateString('en-US')}</TableCell>
                <TableCell>{result.testType}</TableCell>
                <TableCell>
                  <Typography
                    style={{
                      color:
                        result.status === "Positive"
                          ? "red"
                          : result.status?.toLowerCase() === "negative"
                            ? "green"
                            : "orange",
                      fontWeight: "bold",
                    }}
                  >
                    {result.status}
                  </Typography>
                </TableCell>
                <TableCell>{result.caseNumber}</TableCell>
                <TableCell align="right">
                  <IconButton onClick={() => handleView(result)}><Visibility /></IconButton>
                  <IconButton onClick={() => handleDownload(result)}><Download /></IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* View Modal */}
      <Dialog open={openModal} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle>Result Details</DialogTitle>
        <DialogContent>
          <Typography gutterBottom><strong>Name:</strong> {selectedResult?.driverName}</Typography>
          <Typography gutterBottom><strong>License Number:</strong> {selectedResult?.licenseNumber}</Typography>
          <Typography gutterBottom><strong>Company Name:</strong> {selectedResult?.companyName}</Typography>
          <Typography gutterBottom>
            <strong>Date:</strong> {selectedResult?.testDate
              ? new Date(selectedResult.testDate).toLocaleDateString('en-US')
              : ''}
          </Typography>
          <Typography gutterBottom><strong>Test Type:</strong> {selectedResult?.testType}</Typography>

          {selectedResult?.resultImage?.startsWith("data:application/pdf") && (
            <iframe
              src={selectedResult.resultImage}
              title="PDF Preview"
              width="100%"
              height="500px"
              style={{ borderRadius: 8, marginTop: '1rem' }}
            />
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default DisplayResult;
