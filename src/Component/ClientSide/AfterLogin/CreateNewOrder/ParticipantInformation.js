import React, { useState,useContext } from "react";
import { Form, Row, Col, Button } from "react-bootstrap";
import CreateNewOrderContext from "../../../../Context/ClientSide/AfterLogin/CreateNewOrder/CreateNewOrderContext";
function ParticipantInformation() {
    const { currentPosition, maxPosition, setCurrentPosition, setMaxPosition } = useContext(CreateNewOrderContext);
    const [formData, setFormData] = useState({
        firstName: "",
        middleName: "",
        lastName: "",
        ssn: "",
        dob: "",
        phone1: "",
        phone2: "",
        locationCode: "",
        orderExpires: "",
        observed: "No",
        participantAddress: true,
        address: "",
        address2: "",
        city: "",
        state: "",
        zip: "",
    });

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
        console.log("Collected Participant Info:", formData);
        if (currentPosition === maxPosition) {
            setMaxPosition(maxPosition + 1);
        }
        setCurrentPosition(currentPosition + 1);
    };

    return (
        <Form>
            <h5 className="mb-1 fw-bold">Participant Information</h5>
            <p className="text-muted mb-4">
                Use the form below to enter participant information. All required fields are marked <span className="text-danger">*</span>.
            </p>

            <Row className="mb-3">
                <Col md={4}>
                    <Form.Label>First Name <span className="text-danger">*</span></Form.Label>
                    <Form.Control name="firstName" value={formData.firstName} onChange={handleChange} required />
                </Col>
                <Col md={4}>
                    <Form.Label>Middle Name</Form.Label>
                    <Form.Control name="middleName" value={formData.middleName} onChange={handleChange} />
                </Col>
                <Col md={4}>
                    <Form.Label>Last Name <span className="text-danger">*</span></Form.Label>
                    <Form.Control name="lastName" value={formData.lastName} onChange={handleChange} required />
                </Col>
            </Row>

            <Row className="mb-3">
                <Col md={4}>
                    <Form.Label>SSN/EID <span className="text-danger">*</span></Form.Label>
                    <Form.Control name="ssn" value={formData.ssn} onChange={handleChange} required />
                </Col>
                <Col md={4}>
                    <Form.Label>DOB <span className="text-danger">*</span></Form.Label>
                    <Form.Control type="date" name="dob" value={formData.dob} onChange={handleChange} required />
                </Col>
                <Col md={4}>
                    <Form.Label>Phone 1 <span className="text-danger">*</span></Form.Label>
                    <Form.Control name="phone1" value={formData.phone1} onChange={handleChange} required />
                </Col>
            </Row>

            <Row className="mb-3">
                <Col md={4}>
                    <Form.Label>Phone 2</Form.Label>
                    <Form.Control name="phone2" value={formData.phone2} onChange={handleChange} />
                </Col>
                <Col md={4}>
                    <Form.Label>Location Code <span className="text-danger">*</span></Form.Label>
                    <Form.Control name="locationCode" value={formData.locationCode} onChange={handleChange} required />
                </Col>
                <Col md={4}>
                    <Form.Label>Order Expires</Form.Label>
                    <Form.Control type="datetime-local" name="orderExpires" value={formData.orderExpires} onChange={handleChange} />
                </Col>
            </Row>

            <Row className="mb-3">
                <Col md={4}>
                    <Form.Label>Observed Collection?</Form.Label>
                    <div>
                        <Form.Check
                            inline
                            label="No"
                            name="observed"
                            type="radio"
                            id="observed-no"
                            value="No"
                            checked={formData.observed === "No"}
                            onChange={handleChange}
                        />
                        <Form.Check
                            inline
                            label="Yes"
                            name="observed"
                            type="radio"
                            id="observed-yes"
                            value="Yes"
                            checked={formData.observed === "Yes"}
                            onChange={handleChange}
                        />
                    </div>
                </Col>
            </Row>

            <Row className="mb-2">
                <Col>
                    <Form.Check
                        type="checkbox"
                        label="Participant Address"
                        name="participantAddress"
                        checked={formData.participantAddress}
                        onChange={handleChange}
                    />
                </Col>
            </Row>

            <Row className="mb-3">
                <Col md={6}>
                    <Form.Label>Address <span className="text-danger">*</span></Form.Label>
                    <Form.Control name="address" value={formData.address} onChange={handleChange} required />
                </Col>
                <Col md={6}>
                    <Form.Label>Address 2</Form.Label>
                    <Form.Control name="address2" value={formData.address2} onChange={handleChange} />
                </Col>
            </Row>

            <Row className="mb-4">
                <Col md={4}>
                    <Form.Label>City <span className="text-danger">*</span></Form.Label>
                    <Form.Control name="city" value={formData.city} onChange={handleChange} required />
                </Col>
                <Col md={4}>
                    <Form.Label>State <span className="text-danger">*</span></Form.Label>
                    <Form.Select name="state" value={formData.state} onChange={handleChange} required>
                        <option value="">Select state</option>
                        <option value="CA">California</option>
                        <option value="NY">New York</option>
                        <option value="TX">Texas</option>
                        {/* Add more states as needed */}
                    </Form.Select>
                </Col>
                <Col md={4}>
                    <Form.Label>Zip Code <span className="text-danger">*</span></Form.Label>
                    <Form.Control name="zip" value={formData.zip} onChange={handleChange} required />
                </Col>
            </Row>

            <div className="d-flex justify-content-between">
                <Button variant="secondary" onClick={handlePrevious}>
                    Previous
                </Button>
                <Button variant="primary" onClick={handleContinue}>
                    Continue
                </Button>
            </div>
        </Form>
    );
}

export default ParticipantInformation;
