import React, { useState, useContext, useEffect } from "react";
import {
  Box, Card, CardContent, Typography, IconButton,
  Modal, TextField, Button, Grid, Divider, useMediaQuery, CircularProgress
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { useTheme } from "@mui/material/styles";
import CustomerContext from "../../../Context/Admin/Customer/CustomerContext";
import dayjs from "dayjs";

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
      setMembershipInfo(userDetails.Membership);
      setTempMembershipInfo({
        ...userDetails.Membership,
        planStartDate: userDetails.Membership.planStartDate?.slice(0, 10) || "",
        planEndDate: userDetails.Membership.planEndDate?.slice(0, 10) || ""
      });
      setLoading(false);
    }
  }, [userDetails]);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (e) => {
    setTempMembershipInfo({ ...tempMembershipInfo, [e.target.name]: e.target.value });
  };

  const handleUpdate = async () => {
    await updateMembershipInformation(tempMembershipInfo);
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
    <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", marginTop: "100px", px: 2 }}>
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
              <Typography variant="subtitle2" sx={{ fontWeight: "bold", color: "text.secondary" }}>Current Plan:</Typography>
              <Typography variant="body1" sx={{ color: "#003366", fontWeight: 700 }}>
                {membershipInfo.selectedPlan || "N/A"}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle2" sx={{ fontWeight: "bold", color: "text.secondary" }}>Join Date:</Typography>
              <Typography variant="body1" sx={{ color: "#003366", fontWeight: 700 }}>
                {membershipInfo.planStartDate ? dayjs(membershipInfo.planStartDate).format("YYYY-MM-DD") : "N/A"}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle2" sx={{ fontWeight: "bold", color: "text.secondary" }}>Expiry Date:</Typography>
              <Typography variant="body1" sx={{ color: "#003366", fontWeight: 700 }}>
                {membershipInfo.planEndDate ? dayjs(membershipInfo.planEndDate).format("YYYY-MM-DD") : "N/A"}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle2" sx={{ fontWeight: "bold", color: "text.secondary" }}>Status:</Typography>
              <Typography variant="body1" sx={{ color: "#003366", fontWeight: 700 }}>
                {membershipInfo.planStatus || "N/A"}
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
              <TextField
                fullWidth
                size="small"
                label="Current Plan"
                name="selectedPlan"
                value={tempMembershipInfo.selectedPlan || ""}
                onChange={handleChange}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                size="small"
                label="Join Date"
                name="planStartDate"
                type="date"
                value={tempMembershipInfo.planStartDate || ""}
                onChange={handleChange}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                size="small"
                label="Expiry Date"
                name="planEndDate"
                type="date"
                value={tempMembershipInfo.planEndDate || ""}
                onChange={handleChange}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                size="small"
                label="Status"
                name="planStatus"
                value={tempMembershipInfo.planStatus || ""}
                onChange={handleChange}
                variant="outlined"
              />
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
