import React, { useState, useContext } from "react";
import {
  Dialog, DialogTitle, DialogContent, DialogActions,
  TextField, Button
} from "@mui/material";
import AdminContext from "../../../Context/Admin/Admin/AdminContext";

function EditAdminModal({ open, onClose, admin }) {
  const { updateAdminInformation } = useContext(AdminContext);

  const [firstName, setFirstName] = useState(admin.firstName || "");
  const [lastName, setLastName] = useState(admin.lastName || "");
  const [email, setEmail] = useState(admin.email || "");
  const [contactNumber, setContactNumber] = useState(admin.contactNumber || "");

  const handleSave = () => {
    const updatedAdmin = {
      ...admin,
      firstName,
      lastName,
      email,
      contactNumber,
    };
    updateAdminInformation(updatedAdmin);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth>
      <DialogTitle>Edit Admin</DialogTitle>
      <DialogContent sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 2,}}>
        <TextField
          label="First Name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          fullWidth
        />
        <TextField
          label="Last Name"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          fullWidth
        />
        <TextField
          label="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          fullWidth
        />
        <TextField
          label="Contact Number"
          value={contactNumber}
          onChange={(e) => setContactNumber(e.target.value)}
          fullWidth
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="inherit">Cancel</Button>
        <Button
          onClick={handleSave}
          variant="contained"
          sx={{
            backgroundColor: "#002D72",
            color: "#fff",
            borderRadius: "6px",
            padding: "10px 20px",
            fontWeight: "bold",
            textTransform: "none",
            boxShadow: "0 2px 6px rgba(0,0,0,0.2)"
          }}
        >
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default EditAdminModal;
