import React, { useState, useContext, useEffect } from "react";
import {
  Box, Card, CardContent, Typography, Grid, useMediaQuery, CircularProgress
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import CustomerContext from "../../../Context/Agency/Customer/CustomerContext";
import dayjs from "dayjs";

const MembershipInformation = () => {
  const { userDetails } = useContext(CustomerContext);
  const [membershipInfo, setMembershipInfo] = useState({});
  const [loading, setLoading] = useState(true);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  useEffect(() => {
    if (userDetails?.Membership) {
      setMembershipInfo(userDetails.Membership);
      setLoading(false);
    }
  }, [userDetails]);


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
    </Box>
  );
};

export default MembershipInformation;
