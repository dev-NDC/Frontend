import React, { useContext, useEffect, useState } from "react";
import {
  Card,
  Typography,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Box,
  TextField,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Chip,
  OutlinedInput,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@mui/material";
import {
  Business as BusinessIcon,
  Email as EmailIcon,
  Phone as PhoneIcon,
  Apartment as ApartmentIcon,
} from "@mui/icons-material";

import AgencyContext from "../../../Context/Admin/Agency/AgencyContext";
import axios from "axios";
const API_URL = process.env.REACT_APP_API_URL;

const CompanyDetails = () => {
  const { agencyDetails, updateAgencyInformation } = useContext(AgencyContext);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState(null);
  const [unhandledCompanies, setUnhandledCompanies] = useState([]);

  // NEW STATE for controlling dialog open/close
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);

  useEffect(() => {
    if (agencyDetails) {
      setFormData({
        agencyName: agencyDetails.agencyName || "",
        agencyEmail: agencyDetails.agencyEmail || "",
        agencyContactNumber: agencyDetails.agencyContactNumber || "",
        handledCompanies: agencyDetails.handledCompanies || [],
        _id: agencyDetails.id,
      });
    }
  }, [agencyDetails]);

  const fetchUnhandledCompanies = async () => {
    try {
      const response = await axios.get(`${API_URL}/admin/getCompanyList`);
      setUnhandledCompanies(response.data.data || []);
    } catch (err) {
      console.error("Failed to fetch unhandled companies", err);
    }
  };

  const handleEditToggle = () => {
    setEditMode((prev) => !prev);
    if (!editMode) fetchUnhandledCompanies();
  };

  const handleChange = (field) => (event) => {
    const value = event.target.value;
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleHandledCompaniesChange = (event) => {
    const selectedIds = event.target.value;
    const updatedCompanies = selectedIds.map((id) => {
      const fromHandled = formData.handledCompanies.find((c) => c.userId === id);
      const fromUnhandled = unhandledCompanies.find((c) => c.userId === id);
      return fromHandled || fromUnhandled || { userId: id, companyName: "Unknown" };
    });

    setFormData((prev) => ({
      ...prev,
      handledCompanies: updatedCompanies,
    }));
  };

  const handleSave = () => {
    updateAgencyInformation(formData);
    setEditMode(false);
  };

  const handleCancel = () => {
    if (agencyDetails) {
      setFormData({
        agencyName: agencyDetails.agencyName || "",
        agencyEmail: agencyDetails.agencyEmail || "",
        agencyContactNumber: agencyDetails.agencyContactNumber || "",
        handledCompanies: agencyDetails.handledCompanies || [],
        _id: agencyDetails.id,
      });
    }
    setEditMode(false);
  };

  // Instead of directly deleting, open the confirmation dialog
  const handleDeleteClick = () => {
    setOpenDeleteDialog(true);
  };

  // User confirms deletion
  const handleConfirmDelete = async () => {
    try {
      await axios.delete(`${API_URL}/admin/deleteAgency/${formData._id}`);
      alert("Agency deleted successfully.");
      window.location.reload(); // or redirect if needed
    } catch (error) {
      console.error("Failed to delete agency", error);
      alert("Failed to delete agency.");
    } finally {
      setOpenDeleteDialog(false);
    }
  };

  // User cancels deletion
  const handleCancelDelete = () => {
    setOpenDeleteDialog(false);
  };

  if (!formData) {
    return <Typography>Loading agency details...</Typography>;
  }

  const allCompaniesMap = {};
  unhandledCompanies.forEach((c) => (allCompaniesMap[c.userId] = c));
  formData.handledCompanies.forEach((c) => (allCompaniesMap[c.userId] = c));

  return (
    <Box sx={{ maxWidth: 800, margin: "30px auto", padding: "20px" }}>
      <Card elevation={3} sx={{ padding: "20px", position: "relative" }}>
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <Typography variant="h5" sx={{ fontWeight: "bold" }}>
            Agency Overview
          </Typography>
          {!editMode ? (
            <Box sx={{ display: "flex", gap: 2 }}>
              <Button
                variant="contained"
                color="primary"
                onClick={handleEditToggle}
                style={{
                  backgroundColor: "#002D72",
                  color: "#fff",
                  borderRadius: "6px",
                  padding: "10px 20px",
                  fontWeight: "bold",
                  textTransform: "none",
                  boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
                }}
              >
                Edit
              </Button>
              <Button variant="outlined" color="error" onClick={handleDeleteClick}>
                Delete
              </Button>
            </Box>
          ) : (
            <>
              <Button variant="contained" color="success" onClick={handleSave} sx={{ marginRight: 2 }}>
                Save
              </Button>
              <Button variant="outlined" color="error" onClick={handleCancel}>
                Cancel
              </Button>
            </>
          )}
        </Box>

        <Divider sx={{ marginBottom: 2, marginTop: 2 }} />

        <Box sx={{ marginBottom: 2 }}>
          {editMode ? (
            <>
              <TextField
                fullWidth
                label="Agency Name"
                value={formData.agencyName}
                onChange={handleChange("agencyName")}
                sx={{ marginBottom: 2 }}
              />
              <TextField
                fullWidth
                label="Email"
                value={formData.agencyEmail}
                onChange={handleChange("agencyEmail")}
                sx={{ marginBottom: 2 }}
              />
              <TextField
                fullWidth
                label="Contact Number"
                value={formData.agencyContactNumber}
                onChange={handleChange("agencyContactNumber")}
              />
            </>
          ) : (
            <>
              <Typography sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                <ApartmentIcon sx={{ mr: 1 }} />
                <strong>Name:</strong>&nbsp;{formData.agencyName}
              </Typography>
              <Typography sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                <EmailIcon sx={{ mr: 1 }} />
                <strong>Email:</strong>&nbsp;{formData.agencyEmail}
              </Typography>
              <Typography sx={{ display: "flex", alignItems: "center" }}>
                <PhoneIcon sx={{ mr: 1 }} />
                <strong>Contact:</strong>&nbsp;{formData.agencyContactNumber}
              </Typography>
            </>
          )}
        </Box>

        <Typography variant="h6" sx={{ fontWeight: "bold", mb: 1 }}>
          Handled Companies ({formData.handledCompanies.length})
        </Typography>
        <Divider sx={{ marginBottom: 2 }} />

        <List>
          {formData.handledCompanies.map((company, index) => (
            <ListItem key={index} disablePadding>
              <ListItemIcon>
                <BusinessIcon />
              </ListItemIcon>
              <ListItemText primary={company.companyName || "Unnamed Company"} />
            </ListItem>
          ))}
        </List>

        {editMode && (
          <FormControl fullWidth sx={{ mt: 3 }}>
            <InputLabel>Add More Companies</InputLabel>
            <Select
              multiple
              value={formData.handledCompanies.map((c) => c.userId)}
              onChange={handleHandledCompaniesChange}
              input={<OutlinedInput label="Add More Companies" />}
              renderValue={(selected) => (
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                  {selected.map((id) => (
                    <Chip key={id} label={allCompaniesMap[id]?.companyName || id} />
                  ))}
                </Box>
              )}
            >
              {unhandledCompanies.map((company) => (
                <MenuItem key={company.userId} value={company.userId}>
                  {company.companyName}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        )}

        {/* Delete Confirmation Dialog */}
        <Dialog open={openDeleteDialog} onClose={handleCancelDelete}>
          <DialogTitle>Confirm Delete</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Are you sure you want to delete this agency? This action cannot be undone.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCancelDelete} color="primary">
              Cancel
            </Button>
            <Button onClick={handleConfirmDelete} color="error" variant="contained">
              Delete
            </Button>
          </DialogActions>
        </Dialog>
      </Card>
    </Box>
  );
};

export default CompanyDetails;
