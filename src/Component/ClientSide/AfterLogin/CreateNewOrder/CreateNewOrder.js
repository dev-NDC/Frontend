import React, { useContext, useEffect, useState } from "react";
import { Container, Box, Typography } from "@mui/material";

import OrderInformation from "./OrderInformation";
import ParticipantInformation from "./ParticipantInformation";
import ChooseCollectionSite from "./ChooseCollectionSite";
import SubmitOrder from "./SubmitOrder";
import CurrentTurn from "./CurrentTurn";

import CreateNewOrderContext from "../../../../Context/ClientSide/AfterLogin/CreateNewOrder/CreateNewOrderContext";
import HomeContext from "../../../../Context/ClientSide/AfterLogin/Home/HomeContext";

function CreateNewOrder() {
    const { currentPosition } = useContext(CreateNewOrderContext);
    const { userData } = useContext(HomeContext);
    const [membershipStatus, setMembershipStatus] = useState("active");

    useEffect(() => {
        if (userData) {
            setMembershipStatus(userData?.Membership?.planStatus);
        }
    }, [userData]);

    // Function to render the component based on `currentPosition`
    const renderStep = () => {
        switch (currentPosition) {
            case 1:
                return <OrderInformation />;
            case 2:
                return <ParticipantInformation />;
            case 3:
                return <ChooseCollectionSite />;
            case 4:
                return <SubmitOrder />;
            default:
                return <OrderInformation />; // Default to first step
        }
    };

    if (membershipStatus === "active") {
        return (
            <Box sx={{ marginTop: '90px', paddingTop: '60px', minHeight: `calc(100vh - 220px)` }}>
                <Container maxWidth="md" sx={{ p: 3, border: "3px solid #ccc", borderRadius: 2 }}>
                    <Typography variant="h4" align="center" sx={{ fontWeight: 900, color: 'rgba(9,51,120,1)' }} gutterBottom>
                        Create New Order
                    </Typography>
                    <hr />
                    <CurrentTurn />
                    <p className="text-center" style={{ margin: "30px 10px" }}>
                        <b>All fields marked with * are required and must be filled.</b>
                    </p>

                    {renderStep()}
                </Container>
            </Box>
        );
    } else if (membershipStatus === "pending") {
        return (
            <Container maxWidth="sm" sx={{ mt: 10 }}>
                <Typography variant="h5" color="warning.main" align="center">
                    Your account is pending approval. Please wait for activation.
                </Typography>
            </Container>
        );
    } else if (membershipStatus === "inactive") {
        return (
            <Container maxWidth="sm" sx={{ mt: 10 }}>
                <Typography variant="h5" color="error.main" align="center">
                    Your account is inactive. Please contact support.
                </Typography>
            </Container>
        );
    } else {
        return null; // or a loading spinner / unknown status message
    }

}

export default CreateNewOrder;
