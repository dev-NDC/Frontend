import React, { useContext, useState } from "react";
import {
    Box,
    Typography,
    TextField,
    MenuItem,
    FormControlLabel,
    Radio,
    RadioGroup,
    Button,
    Grid
} from "@mui/material";
import SignupContext from "../../../../Context/ClientSide/SignUp/SignupContext";

function Payment() {
    const { currentPosition, maxPosition, paymentData, setPaymentData, setCurrentPosition, setMaxPosition } = useContext(SignupContext);

    const [errors, setErrors] = useState({
        creditCardNumber: false,
        cvv: false,
        billingZip: false,
        accountNumber: false,
        routingNumber: false,
        accountName: false,
    });

    const handleChange = (e) => {
        const { name, value } = e.target;

        // Ensure empty inputs are stored as empty strings
        const updatedValue = value || "";

        setPaymentData({ ...paymentData, [name]: updatedValue });

        // Validation rules
        switch (name) {
            case "creditCardNumber":
                setErrors({ ...errors, creditCardNumber: !/^\d{16}$/.test(updatedValue) });
                break;
            case "cvv":
                setErrors({ ...errors, cvv: !/^\d{3}$/.test(updatedValue) });
                break;
            case "billingZip":
                setErrors({ ...errors, billingZip: !/^\d+$/.test(updatedValue) });
                break;
            case "accountNumber":
                setErrors({ ...errors, accountNumber: !/^\d+$/.test(updatedValue) });
                break;
            case "routingNumber":
                setErrors({ ...errors, routingNumber: !/^\d{9}$/.test(updatedValue) });
                break;
            case "accountName":
                setErrors({ ...errors, accountName: typeof updatedValue === "string" && updatedValue.trim() === "" });
                break;
            default:
                break;
        }
    };

    // Ensuring valid form submission
    const isFormValid =
        Object.entries(paymentData).every(([key, value]) =>
            typeof value === "string" ? value.trim() !== "" : Boolean(value)
        ) && Object.values(errors).every(error => !error);

    const handleNext = () => {
        if (currentPosition === maxPosition) {
            setMaxPosition(maxPosition + 1);
        }
        setCurrentPosition(currentPosition + 1);
    };

    return (
        <Box sx={{ width: "100%", mx: "auto" }}>
            <Typography variant="h6" fontWeight="bold">Payment Information</Typography>

            <Typography variant="subtitle1" fontWeight="bold" mt={2}>Card Details *</Typography>
            
            <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                    <TextField
                        fullWidth
                        label="Credit Card Number"
                        name="creditCardNumber"
                        value={paymentData.creditCardNumber}
                        onChange={handleChange}
                        error={errors.creditCardNumber}
                        helperText={errors.creditCardNumber ? "Must be 16 digits" : ""}
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <TextField
                        fullWidth
                        label="3-Digit CVV"
                        name="cvv"
                        value={paymentData.cvv}
                        onChange={handleChange}
                        error={errors.cvv}
                        helperText={errors.cvv ? "Must be 3 digits" : ""}
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <TextField
                        fullWidth
                        select
                        label="Exp Date Month"
                        name="expMonth"
                        value={paymentData.expMonth}
                        onChange={handleChange}
                    >
                        {[...Array(12)].map((_, i) => (
                            <MenuItem key={i} value={i + 1}>{i + 1}</MenuItem>
                        ))}
                    </TextField>
                </Grid>
                <Grid item xs={12} md={6}>
                    <TextField
                        fullWidth
                        select
                        label="Exp Date Year"
                        name="expYear"
                        value={paymentData.expYear}
                        onChange={handleChange}
                    >
                        {[...Array(10)].map((_, i) => (
                            <MenuItem key={i} value={2025 + i}>{2025 + i}</MenuItem>
                        ))}
                    </TextField>
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        fullWidth
                        label="Billing Zipcode"
                        name="billingZip"
                        value={paymentData.billingZip}
                        onChange={handleChange}
                        error={errors.billingZip}
                        helperText={errors.billingZip ? "Only numbers allowed" : ""}
                    />
                </Grid>
            </Grid>

            <Typography variant="body2" mt={2}>
                I authorize Nationwide Drug Centers to electronically debit my bank account according to the terms outlined below...
            </Typography>

            <Typography variant="subtitle1" fontWeight="bold" mt={2}>E-Check ACH *</Typography>

            <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                    <TextField
                        fullWidth
                        label="Account Number"
                        name="accountNumber"
                        value={paymentData.accountNumber}
                        onChange={handleChange}
                        error={errors.accountNumber}
                        helperText={errors.accountNumber ? "Only numbers allowed" : ""}
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <TextField
                        fullWidth
                        label="Routing Number"
                        name="routingNumber"
                        value={paymentData.routingNumber}
                        onChange={handleChange}
                        error={errors.routingNumber}
                        helperText={errors.routingNumber ? "Must be exactly 9 digits" : ""}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        fullWidth
                        label="Account Name"
                        name="accountName"
                        value={paymentData.accountName}
                        onChange={handleChange}
                        error={errors.accountName}
                        helperText={errors.accountName ? "Account Name is required" : ""}
                    />
                </Grid>
            </Grid>

            <Typography variant="subtitle1" mt={2}>Account Type:</Typography>
            <RadioGroup row name="accountType" value={paymentData.accountType} onChange={handleChange}>
                <FormControlLabel value="saving" control={<Radio />} label="Saving" />
                <FormControlLabel value="checking" control={<Radio />} label="Checking" />
                <FormControlLabel value="consumer" control={<Radio />} label="Consumer" />
                <FormControlLabel value="business" control={<Radio />} label="Business" />
            </RadioGroup>

            <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
                <Button
                    variant="contained"
                    sx={{
                        backgroundColor: isFormValid ? "#003366" : "#E0E0E0",
                        color: isFormValid ? "#FFFFFF" : "#A0A0A0",
                        cursor: isFormValid ? "pointer" : "not-allowed",
                    }}
                    onClick={handleNext}
                    disabled={!isFormValid}
                >
                    Next
                </Button>
            </Box>
        </Box>
    );
}

export default Payment;
