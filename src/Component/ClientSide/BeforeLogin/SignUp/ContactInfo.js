import React, { useContext, useState } from "react";
import {
    TextField,
    Button,
    Box,
    Typography,
    Grid,
    Tooltip
} from "@mui/material";
import SignupContext from "../../../../Context/ClientSide/SignUp/SignupContext";
import { getPasswordStrengthHints } from "./PasswordStrengthHelper";

function ContactInfo() {
    const {
        currentPosition,
        maxPosition,
        contactInfoData,
        setContactInfoData,
        setCurrentPosition,
        setMaxPosition
    } = useContext(SignupContext);

    const [passwordError, setPasswordError] = useState(false);
    const [confirmPasswordError, setConfirmPasswordError] = useState(false);
    const [emailError, setEmailError] = useState(false);
    const [phoneError, setPhoneError] = useState(false);
    const [passwordHints, setPasswordHints] = useState([]);

    const isStrongPassword = (password) => {
        const hints = getPasswordStrengthHints(password);
        setPasswordHints(hints);
        return hints.length === 0;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;

        if (name === "phone") {
            if (/^\d{0,10}$/.test(value)) {
                setContactInfoData({ ...contactInfoData, phone: value });
                if (value.length === 10) {
                    setPhoneError(false);
                    document.getElementsByName("email")[0]?.focus(); // Auto-focus to next
                } else {
                    setPhoneError(true);
                }
            } else {
                setPhoneError(true);
            }
        } else {
            setContactInfoData({ ...contactInfoData, [name]: value });

            if (name === "password") {
                const isStrong = isStrongPassword(value);
                setPasswordError(!isStrong);
            }

            if (name === "confirmPassword") {
                setConfirmPasswordError(value !== contactInfoData.password);
            }

            if (name === "email") {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                setEmailError(!emailRegex.test(value));
            }
        }
    };

    const isFormValid =
        Object.values(contactInfoData).every(value => value.trim() !== "") &&
        !passwordError &&
        !confirmPasswordError &&
        !emailError &&
        !phoneError;

    const handleNext = () => {
        if (currentPosition === maxPosition) {
            setMaxPosition(maxPosition + 1);
        }
        setCurrentPosition(currentPosition + 1);
    };

    return (
        <Box sx={{ width: "100%", mx: "auto" }}>
            <Typography variant="h6" fontWeight="bold">Contact Information</Typography>

            <Grid container spacing={2} mt={1}>
                <Grid item xs={12} md={6}>
                    <TextField
                        label="First Name"
                        name="firstName"
                        value={contactInfoData.firstName}
                        onChange={handleChange}
                        fullWidth
                        required
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <TextField
                        label="Last Name"
                        name="lastName"
                        value={contactInfoData.lastName}
                        onChange={handleChange}
                        fullWidth
                        required
                    />
                </Grid>
                <Grid item xs={12}>
                    <Tooltip title="Only digits allowed. We'll use this to contact you if needed.">
                        <TextField
                            label="Phone No"
                            name="phone"
                            value={contactInfoData.phone}
                            onChange={handleChange}
                            onKeyPress={(e) => {
                                if (!/[0-9]/.test(e.key)) {
                                    e.preventDefault(); // Block non-numeric
                                }
                            }}
                            onPaste={(e) => {
                                const paste = e.clipboardData.getData("text");
                                if (/\D/.test(paste)) {
                                    e.preventDefault(); // Block letters on paste
                                }
                            }}
                            fullWidth
                            required
                            error={phoneError}
                            helperText={
                                phoneError
                                    ? "Phone must be 10 digits and contain only numbers"
                                    : ""
                            }
                        />
                    </Tooltip>
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        label="Email"
                        name="email"
                        value={contactInfoData.email}
                        onChange={handleChange}
                        fullWidth
                        required
                        error={emailError}
                        helperText={emailError ? "Enter a valid email address" : ""}
                    />
                </Grid>
                <Grid item xs={12}>
                    <Typography variant="body2" color="textSecondary">
                        *By providing a telephone number and submitting this form you are consenting to be contacted by SMS text message. Message & data rates may apply. You can reply STOP to opt-out of further messaging.
                    </Typography>
                </Grid>
                <Grid item xs={12} md={6}>
                    <TextField
                        label="Password"
                        type="password"
                        name="password"
                        value={contactInfoData.password}
                        onChange={handleChange}
                        fullWidth
                        required
                        error={passwordError}
                        helperText={
                            passwordError ? "Password does not meet strength requirements" : ""
                        }
                    />
                    {passwordHints.length > 0 && (
                        <Box sx={{ mt: 1 }}>
                            <Typography variant="body2" color="textSecondary" fontWeight="bold">
                                Suggestions to make a strong password:
                            </Typography>
                            <ul style={{ paddingLeft: "18px", margin: 0 }}>
                                {passwordHints.map((hint, index) => (
                                    <li key={index} style={{ fontSize: "0.85rem", color: "#666" }}>
                                        {hint}
                                    </li>
                                ))}
                            </ul>
                        </Box>
                    )}
                </Grid>
                <Grid item xs={12} md={6}>
                    <TextField
                        label="Confirm Password"
                        type="password"
                        name="confirmPassword"
                        value={contactInfoData.confirmPassword}
                        onChange={handleChange}
                        fullWidth
                        required
                        error={confirmPasswordError}
                        helperText={confirmPasswordError ? "Passwords do not match" : ""}
                    />
                </Grid>
                <Grid item xs={12} sx={{ display: "flex", justifyContent: "flex-end" }}>
                    <Button
                        variant="contained"
                        onClick={handleNext}
                        style={{
                            backgroundColor: isFormValid ? "#003366" : "#E0E0E0",
                            color: isFormValid ? "#FFFFFF" : "#A0A0A0",
                            cursor: isFormValid ? "pointer" : "not-allowed"
                        }}
                        disabled={!isFormValid}
                    >
                        Next
                    </Button>
                </Grid>
            </Grid>
        </Box>
    );
}

export default ContactInfo;
