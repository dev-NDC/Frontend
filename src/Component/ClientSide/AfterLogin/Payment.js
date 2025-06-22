import React, { useState, useContext, useEffect } from "react";
import {
  Box, Card, CardContent, Typography, IconButton,
  Modal, TextField, Button, Grid, Divider, useMediaQuery
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useTheme } from "@mui/material/styles";
import HomeContext from "../../../Context/ClientSide/AfterLogin/Home/HomeContext";

const PaymentInformation = () => {
  const { userData, updatePayment, updateUserData } = useContext(HomeContext);
  const [open, setOpen] = useState(false);
  const [paymentInfo, setPaymentInfo] = useState(userData.paymentData);
  const [tempPaymentInfo, setTempPaymentInfo] = useState({ ...paymentInfo });

  const [showCardNumber, setShowCardNumber] = useState(false);
  const [showAccountNumber, setShowAccountNumber] = useState(false);

  useEffect(() => {
    setPaymentInfo(userData.paymentData);
    setTempPaymentInfo(userData.paymentData);
  }, [userData]);

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
    await updatePayment(tempPaymentInfo);
    updateUserData();
    setOpen(false);
  };

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", marginTop: '100px', px: 2 }}>
      <Card sx={{ width: isMobile ? "100%" : 600, p: 3, position: "relative", borderRadius: 3, boxShadow: 3 }}>
        <IconButton onClick={handleOpen} sx={{ position: "absolute", top: 15, right: 15, color: "primary.main" }}>
          <EditIcon />
        </IconButton>
        <CardContent>
          <Typography variant="h5" sx={{ mb: 3, fontWeight: "bold", color: "primary.main" }}>
            Payment Information
          </Typography>
          <Grid container spacing={2}>
            {/* Credit Card Number with visibility toggle */}
            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle2" sx={{ fontWeight: "bold", color: "text.secondary" }}>
                Credit Card Number:
              </Typography>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Typography variant="body1" sx={{ color: "#003366", fontWeight: 700, mr: 1 }}>
                  {showCardNumber
                    ? paymentInfo.creditCardNumber
                    : `************${paymentInfo.creditCardNumber?.slice(-4)}`}
                </Typography>
                <IconButton onClick={() => setShowCardNumber((prev) => !prev)} size="small">
                  {showCardNumber ? <VisibilityOff fontSize="small" /> : <Visibility fontSize="small" />}
                </IconButton>
              </Box>
            </Grid>

            {/* CVV */}
            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle2" sx={{ fontWeight: "bold", color: "text.secondary" }}>
                3-Digit CVV:
              </Typography>
              <Typography variant="body1" sx={{ color: "#003366", fontWeight: 700 }}>
                {paymentInfo.cvv}
              </Typography>
            </Grid>

            {/* Expiry Month */}
            <Grid item xs={6}>
              <Typography variant="subtitle2" sx={{ fontWeight: "bold", color: "text.secondary" }}>
                Expiry Date Month:
              </Typography>
              <Typography variant="body1" sx={{ color: "#003366", fontWeight: 700 }}>
                {paymentInfo.expMonth}
              </Typography>
            </Grid>

            {/* Expiry Year */}
            <Grid item xs={6}>
              <Typography variant="subtitle2" sx={{ fontWeight: "bold", color: "text.secondary" }}>
                Expiry Date Year:
              </Typography>
              <Typography variant="body1" sx={{ color: "#003366", fontWeight: 700 }}>
                {paymentInfo.expYear}
              </Typography>
            </Grid>

            {/* Billing Zip */}
            <Grid item xs={12}>
              <Typography variant="subtitle2" sx={{ fontWeight: "bold", color: "text.secondary" }}>
                Billing Zip Code:
              </Typography>
              <Typography variant="body1" sx={{ color: "#003366", fontWeight: 700 }}>
                {paymentInfo.billingZip}
              </Typography>
            </Grid>

            <Grid item xs={12}>
              <Divider sx={{ my: 2 }} />
            </Grid>

            {/* Account Number with toggle */}
            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle2" sx={{ fontWeight: "bold", color: "#7B4F24" }}>
                Account Number:
              </Typography>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Typography variant="body1" sx={{ color: "#003366", fontWeight: 700, mr: 1 }}>
                  {showAccountNumber
                    ? paymentInfo.accountNumber
                    : `********${paymentInfo.accountNumber?.slice(-4)}`}
                </Typography>
                <IconButton onClick={() => setShowAccountNumber((prev) => !prev)} size="small">
                  {showAccountNumber ? <VisibilityOff fontSize="small" /> : <Visibility fontSize="small" />}
                </IconButton>
              </Box>
            </Grid>

            {/* Routing Number */}
            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle2" sx={{ fontWeight: "bold", color: "#7B4F24" }}>
                Routing Number:
              </Typography>
              <Typography variant="body1" sx={{ color: "#003366", fontWeight: 700 }}>
                {paymentInfo.routingNumber}
              </Typography>
            </Grid>

            {/* Account Name */}
            <Grid item xs={12}>
              <Typography variant="subtitle2" sx={{ fontWeight: "bold", color: "#7B4F24" }}>
                Account Name:
              </Typography>
              <Typography variant="body1" sx={{ color: "#003366", fontWeight: 700 }}>
                {paymentInfo.accountName}
              </Typography>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {/* Edit Modal */}
      <Modal open={open} onClose={handleClose}>
        <Box sx={{ width: isMobile ? "90%" : 500, bgcolor: "background.paper", p: 4, m: "auto", mt: 10, borderRadius: 3, boxShadow: 5 }}>
          <Typography variant="h6" sx={{ mb: 2, fontWeight: "bold", color: "primary.main" }}>
            Edit Payment Information
          </Typography>
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
