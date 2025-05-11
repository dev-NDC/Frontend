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
    const [accountStatus, setAccountStatus] = useState("Checking");

    useEffect(() => {
        setAccountStatus(userData.Membership?.planStatus || "Inactive");
        // eslint-disable-next-line
    }, []);

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
                return <OrderInformation />;
        }
    };

    const renderContent = () => {
        if (accountStatus === "Pending") {
            return (
                <Typography variant="h6" align="center" color="orange" sx={{ mt: 10 }}>
                    Your account is pending verification. Please wait for approval.
                </Typography>
            );
        }

        if (accountStatus === "Inactive") {
            return (
                <Typography variant="h6" align="center" color="error" sx={{ mt: 10 }}>
                    Your account is inactive. Please contact support for assistance.
                </Typography>
            );
        }

        if (accountStatus === "Active") {
            return (
                <Box sx={{ marginTop: '90px', marginBottom: '50px', paddingTop: '60px', minHeight: `calc(100vh - 220px)` }}>
                    <Container maxWidth="md" sx={{ p: 3, border: "3px solid #ccc", borderRadius: 2 }}>
                        <Typography variant="h4" align="center" sx={{ fontWeight: 900, color: 'rgba(9,51,120,1)' }} gutterBottom>
                            Create New Order
                        </Typography>
                        <hr />
                        <CurrentTurn />
                        <Typography
                            variant="body1"
                            align="center"
                            sx={{ fontWeight: 'bold', my: 4, mx: 1 }}
                        >
                            All fields marked with * are required and must be filled.
                        </Typography>
                        {renderStep()}
                    </Container>
                </Box>
            );
        }

        // Optional: fallback message while status is still loading
        return (
            <Typography variant="h6" align="center" sx={{ mt: 10 }}>
                Checking account status...
            </Typography>
        );
    };

    return renderContent();
}

export default CreateNewOrder;
