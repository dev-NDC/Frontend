import React, { useContext, useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  CircularProgress,
  Box
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

  const downloadFile = (file) => {
    const link = document.createElement("a");
    link.href = file.url;
    link.download = file.filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const formatDate = (date) =>
    date
      ? new Date(date).toLocaleDateString("en-US", {
          month: "2-digit",
          day: "2-digit",
          year: "numeric",
        })
      : "N/A";

  if (loading) return <CircularProgress sx={{ mt: 4 }} />;

  return (
    <TableContainer>
      <Table>
        <TableHead sx={{ backgroundColor: "#0b2f6a" }}>
          <TableRow>
            {[
              "Sr",
              "Name",
              "License #",
              "Test Date",
              "Test Type",
              "Order Status",
              "Result Status",
              "Case Number",
              "Actions"
            ].map((h, i) => (
              <TableCell key={i} sx={{ color: "white" }}>
                {h}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>

        <TableBody>
          {results.map((result, idx) => (
            <TableRow key={result._id} hover>
              <TableCell>{idx + 1}</TableCell>
              <TableCell>{result.driverName}</TableCell>
              <TableCell>{result.licenseNumber}</TableCell>
              <TableCell>{formatDate(result.date)}</TableCell>
              <TableCell>{result.testType}</TableCell>
              <TableCell>
                <Typography sx={{ fontWeight: "bold", color: result.orderStatus.toLowerCase() === "pending" ? "orange" : result.orderStatus.toLowerCase() === "completed" ? "green" : "orange" }}>
                  {result.orderStatus}
                </Typography>
              </TableCell>
              <TableCell>
                <Typography sx={{ fontWeight: "bold", color: result.resultStatus.toLowerCase() === "positive" ? "red" : result.resultStatus.toLowerCase() === "negative" ? "green" : "orange" }}>
                  {result.resultStatus}
                </Typography>
              </TableCell>
              <TableCell>{result.caseNumber}</TableCell>
              <TableCell align="right">
                <IconButton onClick={() => handleOpen("view", result)}>
                  <Visibility />
                </IconButton>
                <IconButton onClick={() => handleOpen("download", result)}>
                  <Download />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* View Modal */}
      <Dialog open={openModal === "view"} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle>Result Details</DialogTitle>
        <DialogContent dividers>
          {selectedResult?.resultImages?.length > 0 ? (
            selectedResult.resultImages.map((file, i) => {
              if (file.mimeType.startsWith("image/")) {
                return (
                  <Box key={i} component="img" src={file.url} alt={file.filename} sx={{ width: "100%", mt: 2, borderRadius: 1 }} />
                );
              } else if (file.mimeType === "application/pdf") {
                return (
                  <iframe
                    key={i}
                    src={file.url}
                    title={file.filename}
                    width="100%"
                    height="400px"
                    style={{ borderRadius: 8, marginTop: "1rem" }}
                  />
                );
              }
              return (
                <Typography key={i} sx={{ mt: 2, fontStyle: "italic" }}>
                  Cannot preview {file.filename}. Please download.
                </Typography>
              );
            })
          ) : (
            <Typography>No files to preview.</Typography>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>

      {/* Download Modal */}
      <Dialog open={openModal === "download"} onClose={handleClose}>
        <DialogTitle>Download Files</DialogTitle>
        <DialogContent dividers>
          {selectedResult?.resultImages?.length > 0 ? (
            selectedResult.resultImages.map((file, i) => (
              <Button key={i} fullWidth sx={{ mb: 1 }} onClick={() => downloadFile(file)}>
                {file.filename}
              </Button>
            ))
          ) : (
            <Typography>No files available for download.</Typography>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </TableContainer>
  );
}

export default DisplayResult;