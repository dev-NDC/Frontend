import React, { useState } from "react";
import { 
  Box, Card, CardContent, Typography, IconButton, 
  Modal, TextField, Button, Grid, Divider, useMediaQuery 
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { useTheme } from "@mui/material/styles";

const PaymentInformation = () => {
  const [open, setOpen] = useState(false);
  const [paymentInfo, setPaymentInfo] = useState({
    creditCardNumber: "**** **** **** 1234",
    cvv: "123",
    expiryMonth: "03",
    expiryYear: "2025",
    billingZip: "98001",
    accountNumber: "000000000",
    routingNumber: "000000000",
    accountName: "John Doe",
  });

  const [tempPaymentInfo, setTempPaymentInfo] = useState({ ...paymentInfo });

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

  const handleUpdate = () => {
    setPaymentInfo({ ...tempPaymentInfo });
    setOpen(false);
  };

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", marginTop:'100px', px: 2 }}>
      <Card sx={{ width: isMobile ? "100%" : 600, p: 3, position: "relative", borderRadius: 3, boxShadow: 3 }}>
        <IconButton onClick={handleOpen} sx={{ position: "absolute", top: 15, right: 15, color: "primary.main" }}>
          <EditIcon />
        </IconButton>
        <CardContent>
          <Typography variant="h5" sx={{ mb: 3, fontWeight: "bold", color: "primary.main" }}>
            Payment Information
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle2" sx={{ fontWeight: "bold", color: "text.secondary" }}>Credit Card Number:</Typography>
              <Typography variant="body1" sx={{ color: "#003366", fontWeight: 700 }}>{paymentInfo.creditCardNumber}</Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle2" sx={{ fontWeight: "bold", color: "text.secondary" }}>3-Digit CVV:</Typography>
              <Typography variant="body1" sx={{ color: "#003366", fontWeight: 700 }}>{paymentInfo.cvv}</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="subtitle2" sx={{ fontWeight: "bold", color: "text.secondary" }}>Expiry Date Month:</Typography>
              <Typography variant="body1" sx={{ color: "#003366", fontWeight: 700 }}>{paymentInfo.expiryMonth}</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="subtitle2" sx={{ fontWeight: "bold", color: "text.secondary" }}>Expiry Date Year:</Typography>
              <Typography variant="body1" sx={{ color: "#003366", fontWeight: 700 }}>{paymentInfo.expiryYear}</Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="subtitle2" sx={{ fontWeight: "bold", color: "text.secondary" }}>Billing Zip Code:</Typography>
              <Typography variant="body1" sx={{ color: "#003366", fontWeight: 700 }}>{paymentInfo.billingZip}</Typography>
            </Grid>
            <Grid item xs={12}>
              <Divider sx={{ my: 2 }} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle2" sx={{ fontWeight: "bold", color: "#7B4F24" }}>Account Number:</Typography>
              <Typography variant="body1" sx={{ color: "#003366", fontWeight: 700 }}>{paymentInfo.accountNumber}</Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle2" sx={{ fontWeight: "bold", color: "#7B4F24" }}>Routing Number:</Typography>
              <Typography variant="body1" sx={{ color: "#003366", fontWeight: 700 }}>{paymentInfo.routingNumber}</Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="subtitle2" sx={{ fontWeight: "bold", color: "#7B4F24" }}>Account Name:</Typography>
              <Typography variant="body1" sx={{ color: "#003366", fontWeight: 700 }}>{paymentInfo.accountName}</Typography>
            </Grid>
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
                  value={value}
                  onChange={handleChange}
                  variAccountant="outlined"
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
