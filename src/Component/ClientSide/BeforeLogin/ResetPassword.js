import React, { useState } from "react";
import { useSearchParams } from "react-router-dom";
import {
    Container,
    Box,
    TextField,
    Button,
    Typography,
    Paper,
    Alert,
} from "@mui/material";
import axios from "axios";

import { toast } from "react-toastify";
import { useNavigate } from "react-router";

const API_URL = process.env.REACT_APP_API_URL;

function ResetPassword() {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const token = searchParams.get("token");
    const email = searchParams.get("email");

    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (password.length < 6) {
            setError("Password must be at least 6 characters long.");
            return;
        }

        if (password !== confirmPassword) {
            setError("Passwords do not match.");
            return;
        }

        setError("");

        try {
            const res = await axios.post(`${API_URL}/loginAndSignUp/resetPassword`, {
                email,
                token,
                password,
            });

            toast.success(res.data.message || "Password reset successful.");
            setPassword("");
            setConfirmPassword("");
            navigate("/login");
        } catch (err) {
            toast.error(err.response?.data?.message || "Something went wrong.");
        }
    };

    return (
        <Box sx={{ marginTop: "90px" }}>
            <Container maxWidth="sm" sx={{ minHeight: `calc(100vh - 220px)`, alignContent: 'center' }}>
                <Paper elevation={3} className="p-4" style={{ borderRadius: "20px" }}>
                    <Typography variant="h5" align="center" gutterBottom>
                        Reset Your Password
                    </Typography>

                    {error && <Alert severity="error">{error}</Alert>}

                    <form onSubmit={handleSubmit} className="mt-3">
                        <div className="mb-3">
                            <TextField
                                label="New Password"
                                type="password"
                                variant="outlined"
                                fullWidth
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        <div className="mb-3">
                            <TextField
                                label="Confirm New Password"
                                type="password"
                                variant="outlined"
                                fullWidth
                                required
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                            />
                        </div>
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            fullWidth
                            sx={{ mt: 1, borderRadius: 2 }}
                        >
                            Reset Password
                        </Button>
                    </form>
                </Paper>
            </Container>
        </Box>
    );
}

export default ResetPassword;
