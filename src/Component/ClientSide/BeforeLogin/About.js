import React from "react";
import { Box, Grid, Card, CardContent, Typography } from "@mui/material";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import FlightIcon from "@mui/icons-material/Flight";
import VerifiedIcon from "@mui/icons-material/Verified";
import ConstructionIcon from "@mui/icons-material/Construction";
import TrainIcon from "@mui/icons-material/Train";
import MedicalServicesIcon from "@mui/icons-material/MedicalServices";

function About() {
    return (
        <>
            <div style={{ marginTop: '90px' }}>
                <div className="container" style={{ paddingTop: '50px' }}>
                    <div className="row" style={{background: "linear-gradient(to bottom, white, blue)",padding:"30px 0px"}}>
                        <div className="col-md-6" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <div className="text-center">
                                <p style={{ fontWeight: 700 }}>ABOUT US</p>
                                <p style={{ fontSize: '48px', fontWeight: 900, marginBottom: '0px' }}>Helping the trucking Industry</p>
                                <p><b>Our company was founded with the goal of empowering drivers through technology, and we remain committed to this mission today.</b></p>
                                <p><b>We are driven by a passion for innovation and a desire to make a positive impact on the world. </b></p>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <img style={{ borderRadius: '10px', width: '100%' }} src="./Images/BeforeLogin/About/pexels-photo-4033152.avif" alt="" />
                        </div>
                    </div>
                    <div className="row" style={{background: "linear-gradient(to top, white, blue)",padding:"30px 0px"}}>
                        <h1 className="text-center" style={{ marginBottom: '20px', fontWeight: 900 }}>Strength in Our numbers</h1>
                        <div className="col-md-3">
                            <p style={{ marginBottom: '0px', fontSize: '40px', fontWeight: 900 }}>10,000+</p>
                            <p style={{ color: 'blue' }}><b>Drug Tests</b></p>
                        </div>

                        <div className="col-md-3">
                            <p style={{ marginBottom: '0px', fontSize: '40px', fontWeight: 900 }}>800+</p>
                            <p style={{ color: 'blue' }}><b>Customers</b></p>
                        </div>
                        <div className="col-md-3">
                            <p style={{ marginBottom: '0px', fontSize: '40px', fontWeight: 900 }}>50+</p>
                            <p style={{ color: 'blue' }}><b>Daily Drug Tests</b></p>
                        </div>

                        <div className="col-md-3">
                            <p style={{ marginBottom: '0px', fontSize: '40px', fontWeight: 900 }}>20,000+</p>
                            <p style={{ color: 'blue' }}><b>Locations</b></p>
                        </div>
                    </div>

                    <div style={{ marginTop: '50px' }}>
                        <p>CORE VALUES</p>
                        <p style={{ fontSize: '40px', fontWeight: 900 }}>What we do:</p>
                        <div className="row">
                            <div className="col-md-6">
                                <p>We cover various industries to provide best Employment Solutions focusing on Drug Testing for Safe working Environment. </p>
                            </div>
                        </div>
                        <Box sx={{ flexGrow: 1, padding: 2 }}>
                            <Grid container spacing={3} alignItems="stretch">
                                {cardData.map((item, index) => (
                                    <Grid item xs={12} sm={6} md={6} lg={4} key={index}>
                                        <Card sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
                                            <CardContent sx={{ flexGrow: 1 }}>
                                                {item.icon}
                                                <Typography variant="h6" gutterBottom>
                                                    <b>{item.title}</b>
                                                </Typography>
                                                <Typography variant="body2">{item.content}</Typography>
                                            </CardContent>
                                        </Card>
                                    </Grid>
                                ))}
                            </Grid>
                        </Box>
                    </div>
                </div>

                <div style={{backgroundColor:'black',padding:"50px 0px"}}>
                    <div className="container">
                        <div style={{ marginTop: '50px' }}>
                            <p style={{color:'white'}}>CORE VALUES</p>
                            <p style={{ fontSize: '40px', fontWeight: 900,color:'white' }}>What we do:</p>
                            <div className="row">
                                <div className="col-md-6">
                                    <p style={{color:'white'}}>We cover various industries to provide best Employment Solutions focusing on Drug Testing for Safe working Environment. </p>
                                </div>
                            </div>
                            <Box sx={{ flexGrow: 1, padding: 2 }}>
                                <Grid container spacing={3} alignItems="stretch">
                                    {cardData2.map((item, index) => (
                                        <Grid item xs={12} sm={6} md={6} lg={4} key={index}>
                                            <Card sx={{ height: "100%", display: "flex", flexDirection: "column",backgroundColor:'black' }}>
                                                <CardContent sx={{ flexGrow: 1 }}>
                                                    {item.icon}
                                                    <Typography variant="h6" gutterBottom sx={{color:'whitesmoke'}}>
                                                        <b>{item.title}</b>
                                                    </Typography>
                                                    <Typography variant="body2" sx={{color:'whitesmoke'}}>{item.content}</Typography>
                                                </CardContent>
                                            </Card>
                                        </Grid>
                                    ))}
                                </Grid>
                            </Box>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default About;


const cardData = [
    {
        title: "FMCSA",
        content:
            "Our FMCSA DOT testing services ensure compliance with federal regulations for safety-sensitive transportation employees. We offer comprehensive drug and alcohol testing programs, including pre-employment, random, post-accident, and return-to-duty testing. Our certified labs and Medical Review Officers (MROs) provide accurate and timely results, helping companies meet Federal Motor Carrier Safety Administration (FMCSA) requirements. We also assist with Clearinghouse queries and reporting to ensure full regulatory compliance, protecting both businesses and their drivers.",
        icon: <LocalShippingIcon sx={{ fontSize: 40, color: "#1976d2" }} />,
    },
    {
        title: "FAA",
        content:
            "Our FAA drug and alcohol testing services help aviation employers comply with Federal Aviation Administration regulations. We provide pre-employment, random, post-accident, and return-to-duty tests for safety-sensitive employees such as pilots, air traffic controllers, and maintenance staff. Using certified labs and Medical Review Officers (MROs), we ensure timely, accurate results that meet FAA requirements, helping companies maintain safety and regulatory compliance in the aviation industry.",
        icon: <FlightIcon sx={{ fontSize: 40, color: "#1976d2" }} />,
    },
    {
        title: "SAMHSA",
        content:
            "Our SAMHSA-certified lab testing services guarantee the highest standards for drug and alcohol testing. These laboratories meet the rigorous standards of the Substance Abuse and Mental Health Services Administration (SAMHSA) and are authorized for DOT-mandated drug testing. With precise testing protocols and quality control, we provide reliable, legally defensible results for businesses requiring strict compliance, ensuring safety and integrity in the workplace.",
        icon: <VerifiedIcon sx={{ fontSize: 40, color: "#1976d2" }} />,
    },
    {
        title: "CONSTRUCTION",
        content:
            "Our construction industry drug testing services are designed to ensure a safe, compliant, and productive work environment. We offer comprehensive testing programs for pre-employment, random, post-accident, and reasonable suspicion cases. Utilizing SAMHSA-certified labs and certified Medical Review Officers (MROs), we provide accurate and timely results, helping construction companies maintain safety standards and regulatory compliance. Our services are tailored to the unique demands of the construction sector, minimizing downtime while ensuring a drug-free workplace.",
        icon: <ConstructionIcon sx={{ fontSize: 40, color: "#1976d2" }} />,
    },
    {
        title: "FRA",
        content:
            "Our FRA drug and alcohol testing services are designed to meet Federal Railroad Administration (FRA) requirements for safety-sensitive railroad employees. We offer pre-employment, random, post-accident, and reasonable suspicion testing to ensure a drug-free work environment in the rail industry. Using certified labs and Medical Review Officers (MROs), we provide accurate, reliable results that help companies stay compliant with FRA regulations and maintain safety across all operations.",
        icon: <TrainIcon sx={{ fontSize: 40, color: "#1976d2" }} />,
    },
    {
        title: "NURSES/DOCTORS",
        content:
            "Our drug testing services for medical positions ensure that healthcare employers meet regulatory and safety standards. We provide pre-employment, random, post-accident, and reasonable suspicion testing for doctors, nurses, technicians, and other medical professionals. Using SAMHSA-certified labs and Medical Review Officers (MROs), we deliver fast and accurate results, helping to maintain a drug-free workplace in sensitive healthcare environments. These services help protect patient safety while ensuring compliance with industry regulations.",
        icon: <MedicalServicesIcon sx={{ fontSize: 40, color: "#1976d2" }} />,
    },
];

const cardData2 = [
    {
        title: "Innovation",
        content:
            "We are committed to constantly pushing boundaries and exploring new ideas, technologies, and solutions to drive innovation and progress.",
        icon: <LocalShippingIcon sx={{ fontSize: 40, color: "#1976d2" }} />,
    },
    {
        title: "Customers first",
        content:
            "Our customers are at the center of everything we do, and we are dedicated to providing them with the best possible experience and support.",
        icon: <FlightIcon sx={{ fontSize: 40, color: "#1976d2" }} />,
    },
    {
        title: "Teamwork",
        content:
            "We believe in the power of collaboration and teamwork, and we strive to foster a supportive and inclusive environment",
        icon: <VerifiedIcon sx={{ fontSize: 40, color: "#1976d2" }} />,
    },
    {
        title: "Accountability",
        content:
            "We take responsibility for our actions and decisions, and we hold ourselves accountable to the highest standards.",
        icon: <ConstructionIcon sx={{ fontSize: 40, color: "#1976d2" }} />,
    },
    {
        title: "Continuous learning",
        content:
            "We believe in the importance of continuous learning and growth, and we encourage our team members to pursue development opportunities.",
        icon: <TrainIcon sx={{ fontSize: 40, color: "#1976d2" }} />,
    },
    {
        title: "Agility",
        content:
            "We are adaptable and nimble, and we embrace change as an opportunity to grow and improve.",
        icon: <MedicalServicesIcon sx={{ fontSize: 40, color: "#1976d2" }} />,
    },
];