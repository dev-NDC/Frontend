import React, { useContext } from "react";
import {
    TextField,
    FormControl,
    FormLabel,
    RadioGroup,
    FormControlLabel,
    Radio,
    Select,
    MenuItem,
    InputLabel,
    Button,
    Typography,
    Box,
} from "@mui/material";
import { Row, Col } from "react-bootstrap";
import CreateNewOrderContext from "../../../Context/Admin/CreateNewOrder/CreateNewOrderContext";
import DonarPass from "./DonarPass";

function ParticipantInformation() {
    const {
        currentPosition,
        maxPosition,
        setCurrentPosition,
        setMaxPosition,
        formData,
        setFormData,
        getSiteInformation,
    } = useContext(CreateNewOrderContext);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value,
        }));
    };

    const handlePrevious = () => {
        setCurrentPosition(currentPosition - 1);
    };

    const handleContinue = () => {
        if (currentPosition === maxPosition) {
            setMaxPosition(maxPosition + 1);
        }
        setCurrentPosition(currentPosition + 1);
        getSiteInformation();
    };

    const handSubmitLink = () => {
        getSiteInformation();
    }

    // Check that all required fields are non-empty
    const validateRequiredFields = () => {
        const required = [
            formData.firstName,
            formData.lastName,
            formData.ssn,
            formData.dob,
            formData.phone1,
            formData.address,
            formData.city,
            formData.state,
            formData.zip,
        ];
        return required.every((val) => val?.toString().trim() !== "");
    };

    return (
        <Box p={2}>
            <Typography variant="h6" className="fw-bold mb-1">
                Participant Information
            </Typography>
            <Typography variant="body2" color="text.secondary" className="mb-4">
                Use the form below to enter participant information. All required fields are marked <span className="text-danger">*</span>.
            </Typography>

            <Row className="mb-3">
                <Col md={4}>
                    <TextField
                        fullWidth
                        required
                        label="First Name"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                    />
                </Col>
                <Col md={4}>
                    <TextField
                        fullWidth
                        label="Middle Name"
                        name="middleName"
                        value={formData.middleName}
                        onChange={handleChange}
                    />
                </Col>
                <Col md={4}>
                    <TextField
                        fullWidth
                        required
                        label="Last Name"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                    />
                </Col>
            </Row>

            <Row className="mb-3">
                <Col md={4}>
                    <TextField
                        fullWidth
                        required
                        label="SSN/EID"
                        name="ssn"
                        value={formData.ssn}
                        onChange={handleChange}
                    />
                </Col>
                <Col md={4}>
                    <TextField
                        fullWidth
                        required
                        type="date"
                        InputLabelProps={{ shrink: true }}
                        label="DOB"
                        name="dob"
                        value={formData.dob}
                        onChange={handleChange}
                    />
                </Col>
                <Col md={4}>
                    <TextField
                        fullWidth
                        required
                        label="Phone 1"
                        name="phone1"
                        value={formData.phone1}
                        onChange={handleChange}
                    />
                </Col>
            </Row>

            <Row className="mb-3">
                <Col md={6}>
                    <TextField
                        fullWidth
                        label="Phone 2"
                        name="phone2"
                        value={formData.phone2}
                        onChange={handleChange}
                    />
                </Col>

                <Col md={6}>
                    <TextField
                        fullWidth
                        label="Order Expires"
                        type="datetime-local"
                        InputLabelProps={{ shrink: true }}
                        name="orderExpires"
                        value={formData.orderExpires}
                        onChange={handleChange}
                    />
                </Col>
            </Row>

            <Row className="mb-3">
                <Col md={4}>
                    <FormControl>
                        <FormLabel>Observed Collection?</FormLabel>
                        <RadioGroup
                            row
                            name="observed"
                            value={formData.observed}
                            onChange={handleChange}
                        >
                            <FormControlLabel value="0" control={<Radio />} label="No" />
                            <FormControlLabel value="1" control={<Radio />} label="Yes" />
                        </RadioGroup>
                    </FormControl>
                </Col>
            </Row>

            <Row className="mb-3">
                <Col>
                    <Typography variant="subtitle1" sx={{ fontWeight: "bold", mb: 1 }}>
                        Participant Address
                    </Typography>
                </Col>
            </Row>

            <Row className="mb-3">
                <Col md={6}>
                    <TextField
                        fullWidth
                        required
                        label="Address"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                    />
                </Col>
                <Col md={6}>
                    <TextField
                        fullWidth
                        label="Address 2"
                        name="address2"
                        value={formData.address2}
                        onChange={handleChange}
                    />
                </Col>
            </Row>

            <Row className="mb-4">
                <Col md={4}>
                    <TextField
                        fullWidth
                        required
                        label="City"
                        name="city"
                        value={formData.city}
                        onChange={handleChange}
                    />
                </Col>
                <Col md={4}>
                    <FormControl fullWidth required>
                        <InputLabel id="state-label">State</InputLabel>
                        <Select
                            labelId="state-label"
                            name="state"
                            value={formData.state}
                            onChange={handleChange}
                            label="State"
                            MenuProps={menuProps}
                            sx={{
                                backgroundColor: "#fff",
                                borderRadius: 2,
                            }}
                        >
                            <MenuItem value="">
                                <em>Select state</em>
                            </MenuItem>
                            {US_STATES.map((state) => (
                                <MenuItem
                                    key={state.value}
                                    value={state.value}
                                    sx={{
                                        fontWeight: formData.state === state.value ? 600 : 400,
                                        color: formData.state === state.value ? "#003366" : "#222",
                                        fontSize: 15,
                                    }}
                                >
                                    {state.label}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Col>
                <Col md={4}>
                    <TextField
                        fullWidth
                        required
                        label="Zip Code"
                        name="zip"
                        value={formData.zip}
                        onChange={handleChange}
                    />
                </Col>
            </Row>
            <DonarPass />
            <Box display="flex" justifyContent="space-between">
                <Button variant="outlined" onClick={handlePrevious}>
                    Previous
                </Button>
                <Box>
                    {formData.sendLink ? (
                        <Button
                            variant="contained"
                            onClick={handSubmitLink}
                            disabled={!validateRequiredFields()}
                        >
                            Submit
                        </Button>
                    ) : (
                        <Button
                            variant="contained"
                            onClick={handleContinue}
                            disabled={!validateRequiredFields()}
                        >
                            Continue
                        </Button>
                    )}
                </Box>

            </Box>
        </Box>
    );
}

export default ParticipantInformation;


const US_STATES = [
    { label: "Alabama", value: "AL" }, { label: "Alaska", value: "AK" }, { label: "Arizona", value: "AZ" },
    { label: "Arkansas", value: "AR" }, { label: "California", value: "CA" }, { label: "Colorado", value: "CO" },
    { label: "Connecticut", value: "CT" }, { label: "Delaware", value: "DE" }, { label: "Florida", value: "FL" },
    { label: "Georgia", value: "GA" }, { label: "Hawaii", value: "HI" }, { label: "Idaho", value: "ID" },
    { label: "Illinois", value: "IL" }, { label: "Indiana", value: "IN" }, { label: "Iowa", value: "IA" },
    { label: "Kansas", value: "KS" }, { label: "Kentucky", value: "KY" }, { label: "Louisiana", value: "LA" },
    { label: "Maine", value: "ME" }, { label: "Maryland", value: "MD" }, { label: "Massachusetts", value: "MA" },
    { label: "Michigan", value: "MI" }, { label: "Minnesota", value: "MN" }, { label: "Mississippi", value: "MS" },
    { label: "Missouri", value: "MO" }, { label: "Montana", value: "MT" }, { label: "Nebraska", value: "NE" },
    { label: "Nevada", value: "NV" }, { label: "New Hampshire", value: "NH" }, { label: "New Jersey", value: "NJ" },
    { label: "New Mexico", value: "NM" }, { label: "New York", value: "NY" }, { label: "North Carolina", value: "NC" },
    { label: "North Dakota", value: "ND" }, { label: "Ohio", value: "OH" }, { label: "Oklahoma", value: "OK" },
    { label: "Oregon", value: "OR" }, { label: "Pennsylvania", value: "PA" }, { label: "Rhode Island", value: "RI" },
    { label: "South Carolina", value: "SC" }, { label: "South Dakota", value: "SD" }, { label: "Tennessee", value: "TN" },
    { label: "Texas", value: "TX" }, { label: "Utah", value: "UT" }, { label: "Vermont", value: "VT" },
    { label: "Virginia", value: "VA" }, { label: "Washington", value: "WA" }, { label: "West Virginia", value: "WV" },
    { label: "Wisconsin", value: "WI" }, { label: "Wyoming", value: "WY" },
];

const menuProps = {
    PaperProps: {
        style: {
            maxHeight: 250, // Limit height for scrolling
            width: 250,
            marginTop: 6,   // Adds gap between input and dropdown
            borderRadius: 8,
            boxShadow: "0 4px 20px rgba(0,0,0,0.09)",
            padding: 0,
        },
    },
    MenuListProps: {
        style: {
            padding: 0,
        }
    }
};