// src/components/DisplayResult.js

import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography
} from "@mui/material";
import { Visibility, Download } from "@mui/icons-material";
import axios from "axios";
import Cookies from "js-cookie";

const API_URL = process.env.REACT_APP_API_URL;

export default function DisplayResult() {
  const [results, setResults]               = useState([]);
  const [filteredResults, setFiltered]      = useState([]);
  const [loading, setLoading]               = useState(true);
  const [openViewModal, setOpenViewModal]   = useState(false);
  const [openDownloadModal, setOpenDownloadModal] = useState(false);
  const [selectedResult, setSelectedResult] = useState(null);
  const [searchTerm, setSearchTerm]         = useState("");

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const token = Cookies.get("token");
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        const res = await axios.get(`${API_URL}/agency/getAllResult`);
        const data = res.data.data || [];
        setResults(data);
        setFiltered(data);
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
    setFiltered(
      results.filter(r =>
        r.driverName.toLowerCase().includes(lower) ||
        r.companyName.toLowerCase().includes(lower)
      )
    );
  }, [searchTerm, results]);

  const handleView = (r) => {
    setSelectedResult(r);
    setOpenViewModal(true);
  };
  const handleCloseView = () => {
    setOpenViewModal(false);
    setSelectedResult(null);
  };

  const handleOpenDownload = (r) => {
    setSelectedResult(r);
    setOpenDownloadModal(true);
  };
  const handleCloseDownload = () => {
    setOpenDownloadModal(false);
    setSelectedResult(null);
  };

  // Simplified download: use the data URI directly
  const downloadFile = (file) => {
    const link = document.createElement("a");
    link.href = file.url;
    link.download = file.filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (loading) {
    return <CircularProgress sx={{ mt: 5 }} />;
  }

  return (
    <Box>
      <TableContainer component={Paper} sx={{ mt: 3, p: 2, borderRadius: 2, boxShadow: 3 }}>
        <Box sx={{
          mb: 2,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
        }}>
          <Typography variant="h6" sx={{ fontWeight: "bold" }}>
            Result List
          </Typography>
          <TextField
            size="small"
            placeholder="Search by Name or Company"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            sx={{ width: 250, mt: { xs: 1, sm: 0 } }}
          />
        </Box>

        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: "#003366" }}>
              {[
                "Sr",
                "Company Name",
                "Name",
                "License #",
                "Test Date",
                "Test Type",
                "Order Status",
                "Result Status",
                "Case Number",
                "Actions"
              ].map((h, i) => (
                <TableCell key={i} sx={{ color: "white", fontWeight: "bold" }}>
                  {h}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>

          <TableBody>
            {filteredResults.map((r, idx) => (
              <TableRow key={idx} hover>
                <TableCell>{idx + 1}</TableCell>
                <TableCell>{r.companyName}</TableCell>
                <TableCell>{r.driverName}</TableCell>
                <TableCell>{r.licenseNumber}</TableCell>
                <TableCell>{new Date(r.testDate).toLocaleDateString("en-US")}</TableCell>
                <TableCell>{r.testType}</TableCell>
                <TableCell>
                  <Typography sx={{
                    color:
                      r.orderStatus.toLowerCase() === "pending"   ? "orange" :
                      r.orderStatus.toLowerCase() === "completed" ? "green"  : "orange",
                    fontWeight: "bold"
                  }}>
                    {r.orderStatus}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography sx={{
                    color:
                      r.resultStatus.toLowerCase() === "positive" ? "red" :
                      r.resultStatus.toLowerCase() === "negative" ? "green" : "orange",
                    fontWeight: "bold"
                  }}>
                    {r.resultStatus}
                  </Typography>
                </TableCell>
                <TableCell>{r.caseNumber}</TableCell>
                <TableCell align="right">
                  <IconButton onClick={() => handleView(r)}>
                    <Visibility />
                  </IconButton>
                  <IconButton onClick={() => handleOpenDownload(r)}>
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
        <DialogContent dividers>
          <Typography gutterBottom><strong>Company:</strong> {selectedResult?.companyName}</Typography>
          <Typography gutterBottom><strong>Name:</strong> {selectedResult?.driverName}</Typography>
          <Typography gutterBottom><strong>License #:</strong> {selectedResult?.licenseNumber}</Typography>
          <Typography gutterBottom>
            <strong>Date:</strong> {selectedResult && new Date(selectedResult.testDate).toLocaleDateString("en-US")}
          </Typography>
          <Typography gutterBottom><strong>Test Type:</strong> {selectedResult?.testType}</Typography>
          <Typography gutterBottom><strong>Order Status:</strong> {selectedResult?.orderStatus}</Typography>
          <Typography gutterBottom><strong>Result Status:</strong> {selectedResult?.resultStatus}</Typography>

          {selectedResult?.resultImages?.map((file, i) => (
            file.url.startsWith("data:application/pdf")
              ? <iframe
                  key={i}
                  src={file.url}
                  title={file.filename}
                  width="100%"
                  height="400px"
                  style={{ borderRadius: 8, marginTop: "1rem" }}
                />
              : <Box
                  key={i}
                  component="img"
                  src={file.url}
                  alt={file.filename}
                  sx={{ width: "100%", borderRadius: 1, mt: 2 }}
                />
          ))}

        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseView}>Close</Button>
        </DialogActions>
      </Dialog>

      {/* Download Modal */}
      <Dialog open={openDownloadModal} onClose={handleCloseDownload}>
        <DialogTitle>Select file to download</DialogTitle>
        <DialogContent dividers>
          {selectedResult?.resultImages?.length > 0
            ? selectedResult.resultImages.map((file, i) => (
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
            : <Typography>No files available for download.</Typography>
          }
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDownload}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
