import React, { useContext } from "react";
import {
    TextField,
    FormControl,
    FormLabel,
    RadioGroup,
    FormControlLabel,
    Radio,
    Checkbox,
    Select,
    MenuItem,
    InputLabel,
    Button,
    Typography,
    Box,
} from "@mui/material";
import { Row, Col } from "react-bootstrap";
import CreateNewOrderContext from "../../../Context/Admin/CreateNewOrder/CreateNewOrderContext";

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

    // Check that all required fields are non-empty
    const validateRequiredFields = () => {
        const required = [
            formData.firstName,
            formData.lastName,
            formData.ssn,
            formData.dob,
            formData.phone1,
            formData.locationCode,
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
                <Col md={4}>
                    <TextField
                        fullWidth
                        label="Phone 2"
                        name="phone2"
                        value={formData.phone2}
                        onChange={handleChange}
                    />
                </Col>
                <Col md={4}>
                    <TextField
                        fullWidth
                        required
                        label="Location Code"
                        name="locationCode"
                        value={formData.locationCode}
                        onChange={handleChange}
                    />
                </Col>
                <Col md={4}>
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
                    <FormControlLabel
                        control={
                            <Checkbox
                                name="participantAddress"
                                checked={formData.participantAddress}
                                onChange={handleChange}
                            />
                        }
                        label="Participant Address"
                    />
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
                        <InputLabel>State</InputLabel>
                        <Select
                            name="state"
                            value={formData.state}
                            onChange={handleChange}
                            label="State"
                        >
                            <MenuItem value="">Select state</MenuItem>
                            <MenuItem value="CA">California</MenuItem>
                            <MenuItem value="NY">New York</MenuItem>
                            <MenuItem value="TX">Texas</MenuItem>
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

            <Box display="flex" justifyContent="space-between">
                <Button variant="outlined" onClick={handlePrevious}>
                    Previous
                </Button>
                <Button
                    variant="contained"
                    onClick={handleContinue}
                    disabled={!validateRequiredFields()}
                >
                    Continue
                </Button>
            </Box>
        </Box>
    );
}

export default ParticipantInformation;
