import React, { useContext, useState } from "react";
import {
    Box,
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    Typography,
} from "@mui/material";
import axios from "axios";

import AgencyContext from "../../../Context/Admin/Agency/AgencyContext";
import { toast } from "react-toastify";
const API_URL = "http://localhost:8000/api";


function CreateNewAgency() {
    const {getAllAgencyData}  = useContext(AgencyContext)
    const [open, setOpen] = useState(false);
    const [email, setEmail] = useState("");
    const [confirmEmail, setConfirmEmail] = useState("");
    const [error, setError] = useState("");
    const [successMsg, setSuccessMsg] = useState("");

    const handleOpen = () => {
        setOpen(true);
        setEmail("");
        setConfirmEmail("");
        setError("");
        setSuccessMsg("");
    };

    const handleClose = () => {
        setOpen(false);
    };

    const validateEmail = (email) => {
        // Simple email regex
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    };

    const handleSubmit = async () => {
        setError("");
        setSuccessMsg("");

        if (!validateEmail(email) || !validateEmail(confirmEmail)) {
            setError("Enter valid email addresses.");
            return;
        }

        if (email !== confirmEmail) {
            setError("Emails do not match.");
            return;
        }

        try {
            // eslint-disable-next-line
            const res = await axios.post(`${API_URL}/admin/createNewAgency`, { email });
            setEmail("");
            setConfirmEmail("");
            toast.success("Agency created and mail sent to user successfully")
            handleClose();
            getAllAgencyData();
        } catch (err) {
            console.log(err)
            toast.error(err.response?.data?.message || "Something went wrong.");
        }
    };

    return (
        <div>
            <Box display="flex" justifyContent="center" mt={2}>
                <Button variant="contained" color="primary" onClick={handleOpen}>
                    Create New Agency
                </Button>
            </Box>

            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Create New Agency</DialogTitle>
                <DialogContent>
                    <TextField
                        fullWidth
                        margin="dense"
                        label="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        type="email"
                        required
                    />
                    <TextField
                        fullWidth
                        margin="dense"
                        label="Confirm Email"
                        value={confirmEmail}
                        onChange={(e) => setConfirmEmail(e.target.value)}
                        type="email"
                        required
                    />

                    {error && <Typography color="error">{error}</Typography>}
                    {successMsg && <Typography color="primary">{successMsg}</Typography>}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button variant="contained" onClick={handleSubmit}>
                        Submit
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default CreateNewAgency;
