import React, { useContext, useState } from "react";
import { TextField, Button, Box, Typography, Grid, MenuItem } from "@mui/material";
import SignupContext from "../../../../Context/ClientSide/SignUp/SignupContext";

function CompanyInfo() {
    const { currentPosition, maxPosition, companyInfoData, setCompanyInfoData, setCurrentPosition, setMaxPosition } = useContext(SignupContext);

    const [emailError, setEmailError] = useState(false);
    const [contactNumberError, setContactNumberError] = useState(false);
    const [usdotError, setUsdotError] = useState(false);
    const [employeesError, setEmployeesError] = useState(false);
    const [zipError, setZipError] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCompanyInfoData({ ...companyInfoData, [name]: value });

        if (name === "companyEmail") {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            setEmailError(!emailRegex.test(value));
        }

        if (["contactNumber", "usdot", "employees", "zip"].includes(name)) {
            if (/^\d*$/.test(value)) {  // Allows only digits
                setCompanyInfoData({ ...companyInfoData, [name]: value });
                if (name === "contactNumber") setContactNumberError(false);
                if (name === "usdot") setUsdotError(false);
                if (name === "employees") setEmployeesError(false);
                if (name === "zip") setZipError(false);
            } else {
                if (name === "contactNumber") setContactNumberError(true);
                if (name === "usdot") setUsdotError(true);
                if (name === "employees") setEmployeesError(true);
                if (name === "zip") setZipError(true);
            }
        }
    };

    const isFormValid =
        Object.values(companyInfoData).every(value => value.trim() !== "") &&
        !emailError &&
        !contactNumberError &&
        !usdotError &&
        !employeesError &&
        !zipError;

    const handleNext = () => {
        if (currentPosition === maxPosition) {
            setMaxPosition(maxPosition + 1);
        }
        setCurrentPosition(currentPosition + 1);
    };

    return (
        <Box sx={{ width: "100%", maxWidth: 800, mx: "auto", p: 3 }}>
            <Typography variant="h6" fontWeight="bold">Company Information</Typography>

            <Grid container spacing={2} mt={1}>
                <Grid item xs={12} md={6}>
                    <TextField
                        label="Company Name"
                        name="companyName"
                        value={companyInfoData.companyName}
                        onChange={handleChange}
                        fullWidth
                        required
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <TextField
                        label="USDOT#"
                        name="usdot"
                        value={companyInfoData.usdot}
                        onChange={handleChange}
                        placeholder="e.g., 23"
                        fullWidth
                        required
                        error={usdotError}
                        helperText={usdotError ? "Only digits are allowed" : ""}
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <TextField
                        label="Contact Number"
                        name="contactNumber"
                        value={companyInfoData.contactNumber}
                        onChange={handleChange}
                        placeholder="(000) 000-0000"
                        fullWidth
                        required
                        error={contactNumberError}
                        helperText={contactNumberError ? "Only digits are allowed" : ""}
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <TextField
                        label="Company E-mail"
                        name="companyEmail"
                        value={companyInfoData.companyEmail}
                        onChange={handleChange}
                        placeholder="example@example.com"
                        fullWidth
                        required
                        error={emailError}
                        helperText={emailError ? "Enter a valid email address" : ""}
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <TextField
                        label="Safety Agency Name"
                        name="safetyAgencyName"
                        value={companyInfoData.safetyAgencyName}
                        onChange={handleChange}
                        fullWidth
                        required
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <TextField
                        label="No. of Employees/Drivers"
                        name="employees"
                        value={companyInfoData.employees}
                        onChange={handleChange}
                        placeholder="e.g., 23"
                        fullWidth
                        required
                        error={employeesError}
                        helperText={employeesError ? "Only digits are allowed" : ""}
                    />
                </Grid>
                <Grid item xs={12}>
                    <Typography variant="body2" fontWeight="bold">Address *</Typography>
                    <TextField
                        name="address"
                        value={companyInfoData.address}
                        onChange={handleChange}
                        placeholder="Street Address"
                        fullWidth
                        required
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        name="suite"
                        value={companyInfoData.suite}
                        onChange={handleChange}
                        placeholder="Suite/Apt/Unit#"
                        fullWidth
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <TextField
                        name="city"
                        value={companyInfoData.city}
                        onChange={handleChange}
                        placeholder="City"
                        fullWidth
                        required
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <TextField
                        select
                        name="state"
                        label="State / Province"
                        value={companyInfoData.state}
                        onChange={handleChange}
                        fullWidth
                        required
                        SelectProps={{
                            MenuProps: menuProps,
                        }}
                    >
                        {US_STATES.map((option) => (
                            <MenuItem key={option.value} value={option.value}>
                                {option.label}
                            </MenuItem>
                        ))}
                    </TextField>
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        name="zip"
                        value={companyInfoData.zip}
                        onChange={handleChange}
                        placeholder="Postal / Zip Code"
                        fullWidth
                        required
                        error={zipError}
                        helperText={zipError ? "Only digits are allowed" : ""}
                    />
                </Grid>
                <Grid item xs={12} sx={{ display: "flex", justifyContent: "flex-end" }}>
                    <Button
                        variant="contained"
                        onClick={handleNext}
                        style={{
                            backgroundColor: isFormValid ? "#003366" : "#E0E0E0",
                            color: isFormValid ? "#FFFFFF" : "#A0A0A0",
                            cursor: isFormValid ? "pointer" : "not-allowed"
                        }}
                        disabled={!isFormValid}
                    >
                        Next
                    </Button>
                </Grid>
            </Grid>
        </Box>
    );
}

export default CompanyInfo;


const US_STATES = [
    { label: "Alabama", value: "AL" },
    { label: "Alaska", value: "AK" },
    { label: "Arizona", value: "AZ" },
    { label: "Arkansas", value: "AR" },
    { label: "California", value: "CA" },
    { label: "Colorado", value: "CO" },
    { label: "Connecticut", value: "CT" },
    { label: "Delaware", value: "DE" },
    { label: "Florida", value: "FL" },
    { label: "Georgia", value: "GA" },
    { label: "Hawaii", value: "HI" },
    { label: "Idaho", value: "ID" },
    { label: "Illinois", value: "IL" },
    { label: "Indiana", value: "IN" },
    { label: "Iowa", value: "IA" },
    { label: "Kansas", value: "KS" },
    { label: "Kentucky", value: "KY" },
    { label: "Louisiana", value: "LA" },
    { label: "Maine", value: "ME" },
    { label: "Maryland", value: "MD" },
    { label: "Massachusetts", value: "MA" },
    { label: "Michigan", value: "MI" },
    { label: "Minnesota", value: "MN" },
    { label: "Mississippi", value: "MS" },
    { label: "Missouri", value: "MO" },
    { label: "Montana", value: "MT" },
    { label: "Nebraska", value: "NE" },
    { label: "Nevada", value: "NV" },
    { label: "New Hampshire", value: "NH" },
    { label: "New Jersey", value: "NJ" },
    { label: "New Mexico", value: "NM" },
    { label: "New York", value: "NY" },
    { label: "North Carolina", value: "NC" },
    { label: "North Dakota", value: "ND" },
    { label: "Ohio", value: "OH" },
    { label: "Oklahoma", value: "OK" },
    { label: "Oregon", value: "OR" },
    { label: "Pennsylvania", value: "PA" },
    { label: "Rhode Island", value: "RI" },
    { label: "South Carolina", value: "SC" },
    { label: "South Dakota", value: "SD" },
    { label: "Tennessee", value: "TN" },
    { label: "Texas", value: "TX" },
    { label: "Utah", value: "UT" },
    { label: "Vermont", value: "VT" },
    { label: "Virginia", value: "VA" },
    { label: "Washington", value: "WA" },
    { label: "West Virginia", value: "WV" },
    { label: "Wisconsin", value: "WI" },
    { label: "Wyoming", value: "WY" },
];

const menuProps = {
    PaperProps: {
        style: {
            maxHeight: 200, // limit dropdown height to 200px
        },
    },
};