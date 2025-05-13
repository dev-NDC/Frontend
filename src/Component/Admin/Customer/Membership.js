import React, { useState, useContext, useEffect } from "react";
import {
  Box, Card, CardContent, Typography, IconButton, Modal,
  TextField, Button, Grid, Divider, useMediaQuery, CircularProgress,
  Chip
} from "@mui/material";
import { MenuItem, FormControl, InputLabel, Select } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { useTheme } from "@mui/material/styles";
import CustomerContext from "../../../Context/Admin/Customer/CustomerContext";

const MembershipInformation = () => {
  const { userDetails, updateMembershipInformation } = useContext(CustomerContext);
  const [open, setOpen] = useState(false);
  const [membershipInfo, setMembershipInfo] = useState({});
  const [tempMembershipInfo, setTempMembershipInfo] = useState({});
  const [loading, setLoading] = useState(true);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  useEffect(() => {
    if (userDetails?.Membership) {
      const mem = userDetails.Membership;
      setMembershipInfo(mem);
      setTempMembershipInfo({
        ...mem,
        planStartDate: mem.planStartDate?.slice(0, 10) || "",
        planEndDate: mem.planEndDate?.slice(0, 10) || "",
        package: mem.package?.map(p => p.package_name) || [],
        order_reason: mem.order_reason?.map(r => r.order_reason_name) || [],
      });
      setLoading(false);
    }
  }, [userDetails]);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleChange = (e) => {
    setTempMembershipInfo({ ...tempMembershipInfo, [e.target.name]: e.target.value });
  };

  const handleRemoveItem = (field, item) => {
    setTempMembershipInfo(prev => ({
      ...prev,
      [field]: prev[field].filter(val => val !== item)
    }));
  };

  const handleUpdate = async () => {
    const formattedInfo = {
      ...tempMembershipInfo,
      package: tempMembershipInfo.package.map(name => ({ package_name: name })),
      order_reason: tempMembershipInfo.order_reason.map(name => ({ order_reason_name: name })),
    };
    await updateMembershipInformation(formattedInfo);
    setOpen(false);
  };

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", marginTop: "40px", px: 2 }}>
      <Card sx={{ width: isMobile ? "100%" : 600, p: 3, position: "relative", borderRadius: 3, boxShadow: 3 }}>
        <IconButton onClick={handleOpen} sx={{ position: "absolute", top: 15, right: 15, color: "primary.main" }}>
          <EditIcon />
        </IconButton>
        <CardContent>
          <Typography variant="h5" sx={{ mb: 3, fontWeight: "bold", color: "primary.main" }}>
            Membership Information
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle2">Current Plan:</Typography>
              <Typography variant="body1" sx={{ fontWeight: 700 }}>{membershipInfo.selectedPlan || "N/A"}</Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle2">Join Date:</Typography>
              <Typography variant="body1" sx={{ fontWeight: 700 }}>
                {membershipInfo.planStartDate ? new Date(membershipInfo.planStartDate).toLocaleDateString() : "N/A"}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle2">Expiry Date:</Typography>
              <Typography variant="body1" sx={{ fontWeight: 700 }}>
                {membershipInfo.planEndDate ? new Date(membershipInfo.planEndDate).toLocaleDateString() : "N/A"}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle2">Status:</Typography>
              <Typography variant="body1" sx={{ fontWeight: 700, color: membershipInfo.planStatus === "Active" ? "green" : "red" }}>
                {membershipInfo.planStatus || "N/A"}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle2">OrgId:</Typography>
              <Typography variant="body1" sx={{ fontWeight: 700 }}>{membershipInfo.orgId || "N/A"}</Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle2">Location Code:</Typography>
              <Typography variant="body1" sx={{ fontWeight: 700 }}>{membershipInfo.locationCode || "N/A"}</Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="subtitle2">Packages:</Typography>
              <Typography variant="body1" sx={{ fontWeight: 700 }}>
                {membershipInfo.package?.length
                  ? membershipInfo.package.map((pkg) => pkg.package_name).join(", ")
                  : "N/A"}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="subtitle2">Reason Names:</Typography>
              <Typography variant="body1" sx={{ fontWeight: 700 }}>
                {membershipInfo.order_reason?.length
                  ? membershipInfo.order_reason.map((reason) => reason.order_reason_name).join(", ")
                  : "N/A"}
              </Typography>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {/* Edit Modal */}
      <Modal open={open} onClose={handleClose}>
        <Box sx={{ width: isMobile ? "90%" : 500, bgcolor: "background.paper", p: 4, m: "auto", mt: 10, borderRadius: 3, boxShadow: 5 }}>
          <Typography variant="h6" sx={{ mb: 2, fontWeight: "bold", color: "primary.main" }}>
            Edit Membership Information
          </Typography>
          <Divider sx={{ mb: 3 }} />
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField name="selectedPlan" fullWidth size="small" label="Current Plan" value={tempMembershipInfo.selectedPlan || ""} onChange={handleChange} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField name="planStartDate" type="date" fullWidth size="small" label="Join Date" value={tempMembershipInfo.planStartDate || ""} onChange={handleChange} InputLabelProps={{ shrink: true }} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField name="planEndDate" type="date" fullWidth size="small" label="Expiry Date" value={tempMembershipInfo.planEndDate || ""} onChange={handleChange} InputLabelProps={{ shrink: true }} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth size="small">
                <InputLabel>Status</InputLabel>
                <Select name="planStatus" value={tempMembershipInfo.planStatus || ""} onChange={handleChange} label="Status">
                  <MenuItem value="Active">Active</MenuItem>
                  <MenuItem value="Inactive">Inactive</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField name="orgId" fullWidth size="small" label="OrgId" value={tempMembershipInfo.orgId || ""} onChange={handleChange} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField name="locationCode" fullWidth size="small" label="Location Code" value={tempMembershipInfo.locationCode || ""} onChange={handleChange} />
            </Grid>

            {/* Selected Packages Chips */}
            <Grid item xs={12}>
              <Typography variant="subtitle2">Selected Packages:</Typography>
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mt: 1 }}>
                {tempMembershipInfo.package?.map((item, i) => (
                  <Chip key={i} label={item} onDelete={() => handleRemoveItem("package", item)} />
                ))}
              </Box>
            </Grid>

            <Grid item xs={12}>
              <FormControl fullWidth size="small">
                <InputLabel>Packages</InputLabel>
                <Select multiple name="package" value={tempMembershipInfo.package || []} onChange={(e) => setTempMembershipInfo({ ...tempMembershipInfo, package: e.target.value })} renderValue={(selected) => selected.join(", ")}>
                  <MenuItem value="DOT11">DOT11</MenuItem>
                  <MenuItem value="DOTBATUR">DOTBATUR</MenuItem>
                  <MenuItem value="NONDOT">NONDOT</MenuItem>
                  <MenuItem value="DOTPACK">DOTPACK</MenuItem>
                  <MenuItem value="NONPACK">NONPACK</MenuItem>
                  <MenuItem value="NDCDEMO">NDCDEMO</MenuItem>
                  <MenuItem value="DOTDEMO">DOTDEMO</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            {/* Selected Reasons Chips */}
            <Grid item xs={12}>
              <Typography variant="subtitle2">Selected Reasons:</Typography>
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mt: 1 }}>
                {tempMembershipInfo.order_reason?.map((item, i) => (
                  <Chip key={i} label={item} onDelete={() => handleRemoveItem("order_reason", item)} />
                ))}
              </Box>
            </Grid>

            <Grid item xs={12}>
              <FormControl fullWidth size="small">
                <InputLabel>Reason Names</InputLabel>
                <Select multiple name="order_reason" value={tempMembershipInfo.order_reason || []} onChange={(e) => setTempMembershipInfo({ ...tempMembershipInfo, order_reason: e.target.value })} renderValue={(selected) => selected.join(", ")}>
                  <MenuItem value="PRE-EMPLOYMENT">PRE-EMPLOYMENT</MenuItem>
                  <MenuItem value="RANDOM">RANDOM</MenuItem>
                  <MenuItem value="POST-ACCIDENT">POST-ACCIDENT</MenuItem>
                </Select>
              </FormControl>
            </Grid>
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

export default MembershipInformation;
