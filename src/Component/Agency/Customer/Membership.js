import React, { useState, useContext, useEffect } from "react";
import {
  Box, Card, CardContent, Typography, Grid, useMediaQuery, CircularProgress
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import CustomerContext from "../../../Context/Agency/Customer/CustomerContext";

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
    </Box>
  );
};

export default MembershipInformation;
