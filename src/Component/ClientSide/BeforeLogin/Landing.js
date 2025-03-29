import React from "react";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import { Card, CardContent, Typography, Grid, Container, CardMedia } from "@mui/material";

function Landing() {
    return (
        <>
            <div style={{ marginTop: '90px' }}>
                <div style={{ backgroundColor: "#f5f5f5", padding: '20px 0px' }}>
                    <div className="container" style={{ paddingTop: "10px" }}>
                        <div className="row">
                            <div className="col-md-6" style={{ paddingTop: "40px", display: 'flex', flexDirection: 'column', justifyContent: 'center',marginTop:'15px' }}>
                                <p style={{ color: 'blue', fontSize: '20px', fontWeight: 600 }}>#1 in Workplace Safety</p>
                                <p className="text-center" style={{ fontSize: '56px', fontWeight: 900, marginBottom: "0px" }}>Comprehensive DOT Drug Testing Services</p>
                                <p className="text-center">Ensure a safer workplace with SafetyChecks through precise and reliable testing services.</p>
                                <Button component={Link} to="/pricing" variant="contained" color="primary" style={{ width: '100%' }}>Sign Up Today</Button>
                            </div>
                            <div className="col-md-6" style={{marginTop:'15px'}}>
                                <img src="./Images/BeforeLogin/Landing/1.avif" style={{ width: '100%', borderRadius: '10px' }} alt="" />
                            </div>
                        </div>
                    </div>
                </div>

                <div style={{ backgroundColor: 'rgb(54, 107, 191)', marginTop: '30px', padding: "30px 0px" }}>
                    <div className="container">
                        <p className="text-center" style={{ fontSize: '56px', fontWeight: '900' }}>CALL US - (360)249-7511</p>
                        <p className="text-center" style={{ fontSize: '28px', fontWeight: '800', color: 'white', marginBottom: '0px' }}>The #1 solution for DOT drug testing and screening</p>
                        <p className="text-center" style={{ fontSize: '18px', color: 'white' }}>As recognized by leading healthcare providers and occupational safety experts</p>
                    </div>
                </div>
                <div className="container" style={{ marginTop: "30px" }}>
                    <p className="text-center" style={{ fontSize: '40px', fontWeight: 900, marginBottom: '0px' }}>Comprehensive Occupational Screening Services</p>
                    <p className="text-center"><b>Ensuring Safety and Compliance for Your Workforce</b></p>
                </div>
                <Container style={{ marginTop: "40px" }}>
                    <Grid container spacing={3}>
                        {services.map((service, index) => (
                            <Grid item xs={12} md={4} key={index}>
                                <Card style={{ height: "100%" }}>
                                    <CardMedia component="img" height="290" image={service.image} alt={service.title} />
                                    <CardContent>
                                        <Typography variant="h6" fontWeight="bold">
                                            {service.title}
                                        </Typography>
                                        <Typography variant="body2" color="textSecondary">
                                            {service.description}
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                </Container>
            </div>
        </>
    );
}

export default Landing;

const services = [
    {
        title: "Occupational Services",
        image: "./Images/BeforeLogin/Landing/occupational services.png",
        description:
            "Comprehensive occupational services focus on maintaining workforce health and ensuring compliance with safety regulations. These services include regular health assessments, wellness programs, injury prevention strategies, and training on safety practices. By fostering a culture of health and safety, organizations can enhance employee well-being, reduce absenteeism, and improve productivity. Additionally, staying compliant with regulations minimizes legal risks and promotes a positive company image, ultimately benefiting both employees and the organization.",
    },
    {
        title: "Pre-Employment Screening",
        image: "./Images/BeforeLogin/Landing/Pre-Employment Screening.png",
        description:
            "Streamlining hiring through thorough pre-employment screening is essential for identifying the right candidates for your organization. This process involves comprehensive evaluations, including background checks, skill assessments, and health screenings, to verify qualifications and compatibility with the company culture. By implementing effective screening practices, employers can reduce turnover rates, enhance team dynamics, and ensure compliance with industry regulations. Ultimately, thorough pre-employment screening leads to more informed hiring decisions, saving time and resources while building a stronger workforce.",
    },
    {
        title: "Drug Testing",
        image: "./Images/BeforeLogin/Landing/Drug Testing.png",
        description:
            "Our efficient and reliable drug testing services are tailored to meet Department of Transportation (DOT) standards while addressing your company's specific needs. We offer a comprehensive range of testing options, including pre-employment, random, and post-incident screenings, ensuring compliance and safety in the workplace. With quick turnaround times and secure reporting, our services help you maintain a drug-free environment while minimizing disruption to your operations. Trust us to support your commitment to safety and regulatory compliance with a customized approach that fits your organization perfectly.",
    },
];
