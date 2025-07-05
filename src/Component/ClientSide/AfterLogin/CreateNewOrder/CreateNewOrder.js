import React, { useContext } from "react";
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

    return (
        <Box sx={{ marginTop: '90px', marginBottom: '50px', paddingTop: '60px', minHeight: `calc(100vh - 220px)` }}>
            <Container maxWidth="md" sx={{ p: 3, border: "3px solid #ccc", borderRadius: 2 }}>

                {/* Show message or schedule components based on membership status */}
                {userData?.Membership?.planStatus === "Pending" ? (
                    <Typography
                        color="warning.main"
                        variant="body1"
                        align="center"
                        sx={{ fontWeight: 'bold', my: 4, mx: 1 }}
                    >
                        Your account is under review.
                    </Typography>
                ) : userData?.Membership?.planStatus === "Inactive" ? (
                    <Typography
                        color="error"
                        variant="body1"
                        align="center"
                        sx={{ fontWeight: 'bold', my: 4, mx: 1 }}
                    >
                        Your account is inactive. Please contact admin to activate your account.
                    </Typography>
                ) : (
                    <>
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
                        {/* Renders the correct step based on `currentPosition` */}
                        {renderStep()}
                    </>
                )}
            </Container>
        </Box>
    );

}

export default CreateNewOrder;
