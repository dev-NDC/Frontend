import React, { useState, useContext, useEffect } from "react";
import {
  Box, Card, CardContent, Typography, IconButton,
  Modal, TextField, Button, Grid, Divider, useMediaQuery, CircularProgress
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { useTheme } from "@mui/material/styles";
import CustomerContext from "../../../Context/Admin/Customer/CustomerContext";

const PaymentInformation = () => {
  const { userDetails, updatePaymentInformation } = useContext(CustomerContext);
  const [open, setOpen] = useState(false);
  const [paymentInfo, setPaymentInfo] = useState({});
  const [tempPaymentInfo, setTempPaymentInfo] = useState({});
  const [loading, setLoading] = useState(true); // Added loading state

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  useEffect(() => {
    if (userDetails?.paymentData) {
      setPaymentInfo(userDetails.paymentData);
      setTempPaymentInfo(userDetails.paymentData);
      setLoading(false); // Data is now loaded
    }
  }, [userDetails]);

  const handleOpen = () => {
    setTempPaymentInfo({ ...paymentInfo });
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (e) => {
    setTempPaymentInfo({ ...tempPaymentInfo, [e.target.name]: e.target.value });
  };

  const handleUpdate = async () => {
    await updatePaymentInformation(tempPaymentInfo);
    setOpen(false);
  };

  // Show a loading spinner until the data is available
  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", marginTop: "100px", px: 2 }}>
      <Card sx={{ width: isMobile ? "100%" : 600, p: 3, position: "relative", borderRadius: 3, boxShadow: 3 }}>
        <IconButton onClick={handleOpen} sx={{ position: "absolute", top: 15, right: 15, color: "primary.main" }}>
          <EditIcon />
        </IconButton>
        <CardContent>
          <Typography variant="h5" sx={{ mb: 3, fontWeight: "bold", color: "primary.main" }}>
            Payment Information
          </Typography>
          <Grid container spacing={2}>
            {[
              { label: "Credit Card Number", key: "creditCardNumber" },
              { label: "3-Digit CVV", key: "cvv" },
              { label: "Expiry Date Month", key: "expMonth" },
              { label: "Expiry Date Year", key: "expYear" },
              { label: "Billing Zip Code", key: "billingZip" },
              { label: "Account Number", key: "accountNumber", color: "#7B4F24" },
              { label: "Routing Number", key: "routingNumber", color: "#7B4F24" },
              { label: "Account Name", key: "accountName", color: "#7B4F24" }
            ].map(({ label, key, color }) => (
              <Grid item xs={12} sm={6} key={key}>
                <Typography variant="subtitle2" sx={{ fontWeight: "bold", color: color || "text.secondary" }}>
                  {label}:
                </Typography>
                <Typography variant="body1" sx={{ color: "#003366", fontWeight: 700 }}>
                  {paymentInfo[key] || "N/A"}
                </Typography>
              </Grid>
            ))}
          </Grid>
        </CardContent>
      </Card>

      {/* Edit Modal */}
      <Modal open={open} onClose={handleClose}>
        <Box sx={{ width: isMobile ? "90%" : 500, bgcolor: "background.paper", p: 4, m: "auto", mt: 10, borderRadius: 3, boxShadow: 5 }}>
          <Typography variant="h6" sx={{ mb: 2, fontWeight: "bold", color: "primary.main" }}>Edit Payment Information</Typography>
          <Divider sx={{ mb: 3 }} />
          <Grid container spacing={2}>
            {Object.entries(tempPaymentInfo).map(([key, value]) => (
              <Grid item xs={12} sm={6} key={key}>
                <TextField
                  fullWidth
                  size="small"
                  label={key.replace(/([A-Z])/g, " $1").trim()}
                  name={key}
                  value={value || ""}
                  onChange={handleChange}
                  variant="outlined"
                />
              </Grid>
            ))}
          </Grid>
          <Box sx={{ mt: 4, display: "flex", justifyContent: "flex-end", gap: 2 }}>
            <Button onClick={handleClose} variant="outlined">Cancel</Button>
            <Button onClick={handleUpdate} variant="contained">Update</Button>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
};

export default PaymentInformation;
