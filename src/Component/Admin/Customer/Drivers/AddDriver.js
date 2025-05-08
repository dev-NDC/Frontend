import React, { useContext, useState } from "react";
import { Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle, Typography } from "@mui/material";

import DriverContext from "../../../../Context/Admin/Customer/Driver/DriverContext";
import CustomerContext from "../../../../Context/Admin/Customer/CustomerContext";

function AddDriver() {
    const { currentId, getSingleUserData } = useContext(CustomerContext);
    const { AddDriver } = useContext(DriverContext);
    const [open, setOpen] = useState(false);
    const [driverData, setDriverData] = useState({
        name: "",
        license: "",
        dob: "",
        email: "",
        phone: ""
    });

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleChange = (e) => {
        setDriverData({ ...driverData, [e.target.name]: e.target.value });
    };

    const handleSave = async () => {
        await AddDriver(driverData, currentId);
        getSingleUserData(currentId);
        setOpen(false);
    };

    return (
        <div style={{ display: "flex", justifyContent: "flex-end", margin: "20px" }}>
            <Button variant="contained" color="primary" onClick={handleClickOpen} style={{
                backgroundColor: "#002D72",         // Navy Blue
                color: "#fff",                      // White text
                borderRadius: "6px",
                padding: "10px 20px",
                fontWeight: "bold",
                textTransform: "none",
                display: "flex",
                alignItems: "center",
                gap: "8px",                         // spacing between icon and text
                boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
            }}>
                + Add Driver
            </Button>

            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Add New Driver</DialogTitle>
                <DialogContent>
                    <TextField fullWidth margin="dense" label="Name" name="name" onChange={handleChange} />
                    <TextField fullWidth margin="dense" label="License #" name="license" onChange={handleChange} />
                    <Typography variant="subtitle2" style={{ marginTop: "10px" }}>Date of Birth (DOB)</Typography>
                    <TextField fullWidth margin="dense" type="date" name="dob" onChange={handleChange} InputLabelProps={{ shrink: true }} />
                    <TextField fullWidth margin="dense" label="Email" name="email" type="email" onChange={handleChange} />
                    <TextField fullWidth margin="dense" label="Phone No" name="phone" onChange={handleChange} />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="secondary">Cancel</Button>
                    <Button onClick={handleSave} color="primary" variant="contained">Save Driver</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default AddDriver;