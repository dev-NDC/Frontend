import React, { useContext, useState } from "react";
import {
    Button,
    TextField,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Typography
} from "@mui/material";
import CustomerContext from "../../../../Context/Admin/Customer/CustomerContext";
import ResultContext from "../../../../Context/Admin/Customer/Result/ResultContext";

function AddResult() {
    const { currentId, getSingleUserData } = useContext(CustomerContext);
    const { addResult } = useContext(ResultContext);

    const [open, setOpen] = useState(false);
    const [resultData, setResultData] = useState({
        name: "",
        licenseNumber: "",
        date: "",
        testType: "",
        file: null,
    });

    const handleClickOpen = () => setOpen(true);

    const handleClose = () => {
        setOpen(false);
        setResultData({
            name: "",
            licenseNumber: "",
            date: "",
            testType: "",
            file: null,
        });
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setResultData((prev) => ({ ...prev, [name]: value }));
    };

    const handleFileChange = (e) => {
        setResultData((prev) => ({
            ...prev,
            file: e.target.files[0],
        }));
    };

    const handleSave = async () => {
        const formData = new FormData();
        formData.append("name", resultData.name);
        formData.append("licenseNumber", resultData.licenseNumber);
        formData.append("date", resultData.date);
        formData.append("testType", resultData.testType);
        formData.append("file", resultData.file);
        formData.append("currentId", currentId);
        await addResult(formData);
        getSingleUserData(currentId);
        handleClose();
    };

    return (
        <div style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            padding: "30px"
        }}>
            <Button
                onClick={handleClickOpen}
                style={{
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
                }}
            >
                <i className="fas fa-plus-circle"></i> Add Result
            </Button>

            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Add New Result</DialogTitle>
                <DialogContent>
                    <TextField
                        fullWidth
                        margin="dense"
                        label="Driver Name"
                        name="name"
                        value={resultData.name}
                        onChange={handleChange}
                    />
                    <TextField
                        fullWidth
                        margin="dense"
                        label="License Number"
                        name="licenseNumber"
                        value={resultData.licenseNumber}
                        onChange={handleChange}
                    />
                    <Typography variant="subtitle2" style={{ marginTop: "10px" }}>Test Date</Typography>
                    <TextField
                        fullWidth
                        margin="dense"
                        type="date"
                        name="date"
                        value={resultData.date}
                        onChange={handleChange}
                        InputLabelProps={{ shrink: true }}
                    />
                    <TextField
                        fullWidth
                        margin="dense"
                        label="Test Type"
                        name="testType"
                        value={resultData.testType}
                        onChange={handleChange}
                    />
                    <Typography variant="subtitle2" style={{ marginTop: "10px" }}>Upload File</Typography>
                    <input
                        type="file"
                        accept=".pdf,.jpg,.jpeg,.png"
                        onChange={handleFileChange}
                        style={{ marginTop: "5px" }}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="secondary">Cancel</Button>
                    <Button onClick={handleSave} color="primary" variant="contained">Save Result</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default AddResult;
