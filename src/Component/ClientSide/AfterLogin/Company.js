import React, { useContext, useState,useEffect } from "react";
import { 
  Box, Card, CardContent, Typography, IconButton, 
  Modal, TextField, Button, Grid, Divider, useMediaQuery 
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { useTheme } from "@mui/material/styles";
import HomeContext from "../../../Context/ClientSide/AfterLogin/Home/HomeContext";

const CompanyDetails = () => {
  const {userData,updateCompanyInformation} = useContext(HomeContext)
  const [open, setOpen] = useState(false);
  // eslint-disable-next-line
  const [companyInfoData, setCompanyInfoData] = useState(userData.companyInfoData);
  const [tempCompanyInfoData, setTempCompanyInfoData] = useState({ ...companyInfoData });
  useEffect(() => {
    setCompanyInfoData(userData.companyInfoData);
  }, [userData]);

  const handleOpen = () => {
    setTempCompanyInfoData({ ...companyInfoData });
    setOpen(true);
  };
  
  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (e) => {
    setTempCompanyInfoData({ ...tempCompanyInfoData, [e.target.name]: e.target.value });
  };

  const handleUpdate = () => {
    updateCompanyInformation(tempCompanyInfoData);
    setOpen(false);
  };

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Box 
      sx={{ 
        display: "flex", 
        justifyContent: "center", 
        alignItems: "center", 
        marginTop:'100px',
        px: 2 // Added padding to avoid horizontal scrolling
      }}
    >
      <Card 
        sx={{ 
          width: isMobile ? "100%" : 550, 
          p: 3, 
          position: "relative", 
          borderRadius: 3, 
          boxShadow: 3 
        }}
      >
        <IconButton 
          onClick={handleOpen}
          sx={{ position: "absolute", top: 15, right: 15, color: "primary.main" }}
        >
          <EditIcon />
        </IconButton>
        <CardContent>
          <Typography variant="h5" sx={{ mb: 3, fontWeight: "bold", color: "primary.main" }}>
            Company Information
          </Typography>
          <Grid container spacing={2}>
            {Object.entries(companyInfoData).map(([key, value]) => (
              <Grid item xs={12} sm={6} key={key}>
                <Typography variant="subtitle2" sx={{ fontWeight: "bold", color: "text.secondary" }}>
                  {key.replace(/([A-Z])/g, " $1").trim()}:
                </Typography>
                <Typography variant="body1" sx={{color:'#003366', fontWeight:700}}>{value}</Typography>
              </Grid>
            ))}
          </Grid>
        </CardContent>
      </Card>
      
      {/* Edit Modal */}
      <Modal open={open} onClose={handleClose}>
        <Box sx={{ 
          width: isMobile ? "90%" : 500, 
          bgcolor: "background.paper", 
          p: 4, 
          m: "auto", 
          mt: 10, 
          borderRadius: 3, 
          boxShadow: 5 
        }}>
          <Typography variant="h6" sx={{ mb: 2, fontWeight: "bold", color: "primary.main" }}>
            Edit Company Details
          </Typography>
          <Divider sx={{ mb: 3 }} />
          <Grid container spacing={2}>
            {Object.entries(tempCompanyInfoData).map(([key, value]) => (
              <Grid item xs={12} sm={6} key={key}>
                <TextField
                  fullWidth
                  size="small"
                  label={key.replace(/([A-Z])/g, " $1").trim()}
                  name={key}
                  value={value}
                  onChange={handleChange}
                  variant="outlined"
                />
              </Grid>
            ))}
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

export default CompanyDetails;
