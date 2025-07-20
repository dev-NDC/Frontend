import React, { useContext, useState, useEffect } from "react";
import {
  Box, Card, CardContent, Typography, IconButton,
  Modal, TextField, Button, Grid, Divider, useMediaQuery, MenuItem
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { useTheme } from "@mui/material/styles";
import HomeContext from "../../../Context/ClientSide/AfterLogin/Home/HomeContext";
const normalizePhoneNumber = require("../../Utils/normalizePhone");
const usStates = [
  { label: "Alabama" }, { label: "Alaska" }, { label: "Arizona" },
  { label: "Arkansas" }, { label: "California" }, { label: "Colorado" },
  { label: "Connecticut" }, { label: "Delaware" }, { label: "Florida" },
  { label: "Georgia" }, { label: "Hawaii" }, { label: "Idaho" },
  { label: "Illinois" }, { label: "Indiana" }, { label: "Iowa" },
  { label: "Kansas" }, { label: "Kentucky" }, { label: "Louisiana" },
  { label: "Maine" }, { label: "Maryland" }, { label: "Massachusetts" },
  { label: "Michigan" }, { label: "Minnesota" }, { label: "Mississippi" },
  { label: "Missouri" }, { label: "Montana" }, { label: "Nebraska" },
  { label: "Nevada" }, { label: "New Hampshire" }, { label: "New Jersey" },
  { label: "New Mexico" }, { label: "New York" }, { label: "North Carolina" },
  { label: "North Dakota" }, { label: "Ohio" }, { label: "Oklahoma" },
  { label: "Oregon" }, { label: "Pennsylvania" }, { label: "Rhode Island" },
  { label: "South Carolina" }, { label: "South Dakota" }, { label: "Tennessee" },
  { label: "Texas" }, { label: "Utah" }, { label: "Vermont" },
  { label: "Virginia" }, { label: "Washington" }, { label: "West Virginia" },
  { label: "Wisconsin" }, { label: "Wyoming" }
];

const labelMap = {
  companyName: "Company Name",
  contactNumber: "Contact Number",
  usdot: "USDOT",
  zip: "ZIP",
  suite: "Suite",
  employees: "Employees",
  address: "Address",
  city: "City",
  state: "State",
  country: "Country",
  contactPerson: "Contact Person",
  email: "Email",
  website: "Website"
};

const formatLabel = (key) =>
  labelMap[key] || key.replace(/([A-Z])/g, " $1").replace(/_/g, " ").trim().replace(/\b\w/g, c => c.toUpperCase());

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const digitOnlyFields = ["contactNumber", "zip", "usdot", "employees", "suite"];

const CompanyDetails = () => {
  const { userData, updateCompanyInformation } = useContext(HomeContext);
  const [open, setOpen] = useState(false);
  const [companyInfoData, setCompanyInfoData] = useState(userData.companyInfoData);
  const [tempCompanyInfoData, setTempCompanyInfoData] = useState({ ...companyInfoData });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    setCompanyInfoData(userData.companyInfoData);
  }, [userData]);

  const handleOpen = () => {
    setTempCompanyInfoData({ ...companyInfoData });
    setErrors({});
    setOpen(true);
  };

  const handleClose = () => setOpen(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    let newErrors = { ...errors };

    if (digitOnlyFields.includes(name)) {
      if (!/^\d*$/.test(value)) return;
    }

    if (name === "contactNumber") {
      if (value.length !== 10) {
        newErrors.contactNumber = "Contact number must be 10 digits";
      } else {
        delete newErrors.contactNumber;
      }
    }

    if (name === "email") {
      if (value && !emailRegex.test(value)) {
        newErrors.email = "Invalid email format";
      } else {
        delete newErrors.email;
      }
    }

    setTempCompanyInfoData({ ...tempCompanyInfoData, [name]: value });
    setErrors(newErrors);
  };

  const handleUpdate = () => {
    if (Object.keys(errors).length === 0) {
      updateCompanyInformation(tempCompanyInfoData);
      setOpen(false);
    }
  };

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", marginTop: "100px", px: 2 }}>
      <Card sx={{ width: isMobile ? "100%" : 550, p: 3, position: "relative", borderRadius: 3, boxShadow: 3 }}>
        <IconButton onClick={handleOpen} sx={{ position: "absolute", top: 15, right: 15, color: "primary.main" }}>
          <EditIcon />
        </IconButton>
        <CardContent>
          <Typography variant="h5" sx={{ mb: 3, fontWeight: "bold", color: "primary.main" }}>
            Company Information
          </Typography>
          <Grid container spacing={2}>
            {Object.entries(companyInfoData)?.map(([key, value]) => {
              let displayValue = value;

              if (key === "contactNumber") {
                displayValue = normalizePhoneNumber(value);
              } else if (key.toLowerCase() === "usdot") {
                displayValue = String(value).toUpperCase();
              } else {
                displayValue = toTitleCase(value);
              }

              return (
                <Grid item xs={12} sm={6} key={key}>
                  <Typography
                    variant="subtitle2"
                    sx={{ fontWeight: "bold", color: "text.secondary" }}
                  >
                    {formatLabel(key)}:
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{ color: "#003366", fontWeight: 700 }}
                  >
                    {displayValue}
                  </Typography>
                </Grid>
              );
            })}
          </Grid>

        </CardContent>
      </Card>

      {/* Edit Modal */}
      <Modal open={open} onClose={handleClose}>
        <Box
          sx={{
            width: isMobile ? "90%" : 500,
            bgcolor: "background.paper",
            p: 4,
            m: "auto",
            mt: 10,
            borderRadius: 3,
            boxShadow: 5
          }}
        >
          <Typography variant="h6" sx={{ mb: 2, fontWeight: "bold", color: "primary.main" }}>
            Edit Company Details
          </Typography>
          <Divider sx={{ mb: 3 }} />
          <Grid container spacing={2}>
            {Object.entries(tempCompanyInfoData)?.map(([key, value]) => (
              <Grid item xs={12} sm={6} key={key}>
                {key === "state" ? (
                  <TextField
                    select
                    fullWidth
                    size="small"
                    label={formatLabel(key)}
                    name={key}
                    value={value}
                    onChange={handleChange}
                  >
                    {usStates.map((state) => (
                      <MenuItem key={state.label} value={state.label}>
                        {state.label}
                      </MenuItem>
                    ))}
                  </TextField>
                ) : (
                  <TextField
                    fullWidth
                    size="small"
                    label={formatLabel(key)}
                    name={key}
                    value={value}
                    onChange={handleChange}
                    variant="outlined"
                    type={
                      key === "email" ? "email" :
                        digitOnlyFields.includes(key) ? "tel" : "text"
                    }
                    inputProps={
                      digitOnlyFields.includes(key)
                        ? { inputMode: "numeric", pattern: "[0-9]*" }
                        : {}
                    }
                    error={Boolean(errors[key])}
                    helperText={errors[key] || ""}
                  />
                )}
              </Grid>
            ))}
          </Grid>
          <Box sx={{ mt: 4, display: "flex", justifyContent: "flex-end", gap: 2 }}>
            <Button onClick={handleClose} variant="outlined">Cancel</Button>
            <Button onClick={handleUpdate} variant="contained" disabled={Object.keys(errors).length > 0}>
              Update
            </Button>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
};

function toTitleCase(str) {
  if (!str || typeof str !== "string") return str;
  return str
    .toLowerCase()
    .split(" ")
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

export default CompanyDetails;
