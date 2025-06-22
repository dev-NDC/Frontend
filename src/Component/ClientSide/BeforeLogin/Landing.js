import React from "react";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import { Card, CardContent, Typography, Grid, Container, CardMedia } from "@mui/material";
import { motion } from "framer-motion";

function Landing() {
    return (
        <>
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                style={{ marginTop: '90px' }}
            >
                <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
                    <div style={{ backgroundColor: "#f5f5f5", padding: '20px 0px' }}>
                        <div className="container" style={{ paddingTop: "10px" }}>
                            <div className="row">
                                <div className="col-md-6" style={{ paddingTop: "40px", display: 'flex', flexDirection: 'column', justifyContent: 'center', marginTop: '15px' }}>
                                    <p style={{ color: 'blue', fontSize: '20px', fontWeight: 600 }}>#1 in Workplace Safety</p>
                                    <p className="text-center" style={{ fontSize: '56px', fontWeight: 900, marginBottom: "0px" }}>Comprehensive DOT Drug Testing Services</p>
                                    <p className="text-center">Ensure a safer workplace with SafetyChecks through precise and reliable testing services.</p>
                                    <Button component={Link} to="/pricing" variant="contained" color="white" style={{ width: '100%' }}>Sign Up Now</Button>
                                </div>
                                <div className="col-md-6" style={{ marginTop: '15px' }}>
                                    <img
                                        src="./Images/BeforeLogin/Landing/1.avif"
                                        style={{ width: '100%', borderRadius: '5px', marginTop: '100px' }}
                                        alt=""
                                    />
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
                        <p className="text-center" style={{ fontSize: '36px', fontWeight: 900, marginBottom: '0px' }}>Comprehensive Occupational Screening Services</p>
                        <p className="text-center"><b>Ensuring Safety and Compliance for Your Workforce</b></p>
                    </div>

                    {/* Services Section */}
                    <Container style={{ marginTop: "40px" }}>
                        <Grid container spacing={3}>
                            {services.map((service, index) => (
                                <Grid item xs={12} md={4} key={index}>
                                    <motion.div
                                        whileHover={{ scale: 1.05, boxShadow: "0px 10px 20px rgba(0,0,0,0.2)" }}
                                        transition={{ type: "spring", stiffness: 300 }}
                                        style={{ height: "100%" }}
                                    >
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
                                    </motion.div>
                                </Grid>
                            ))}
                        </Grid>
                    </Container>

                    {/* Blog Articles Section */}
                    <div className="container" style={{ marginTop: "60px" }}>
                        <p className="text-center" style={{ fontSize: '40px', fontWeight: 900, marginBottom: '10px' }}>Latest Blog Articles</p>
                        <p className="text-center"><b>Learn More About Our Services</b></p>
                    </div>

                    <Container style={{ marginTop: "30px", marginBottom: "50px" }}>
                        <Grid container spacing={3}>
                            {blogArticles.map((article, index) => (
                                <Grid item xs={12} md={4} key={index}>
                                    <motion.div
                                        whileHover={{ scale: 1.05, boxShadow: "0px 10px 20px rgba(0,0,0,0.2)" }}
                                        transition={{ type: "spring", stiffness: 300 }}
                                        style={{ height: "100%" }}
                                    >
                                        <Card style={{ height: "100%", display: 'flex', flexDirection: 'column' }}>
                                            <CardMedia
                                                component="img"
                                                height="200"
                                                image={article.image}
                                                alt={article.title}
                                                style={{ objectFit: 'cover' }}
                                            />
                                            <CardContent>
                                                <Typography variant="h6" fontWeight="bold">
                                                    {article.title}
                                                </Typography>
                                                <Typography variant="body2" color="textSecondary" style={{ marginTop: "8px" }}>
                                                    {article.description}
                                                </Typography>
                                                <Button variant="outlined" color="primary" style={{ marginTop: "16px" }}>
                                                    Learn more
                                                </Button>
                                            </CardContent>
                                        </Card>
                                    </motion.div>
                                </Grid>
                            ))}
                        </Grid>
                    </Container>
                </div>
            </motion.div>
        </>
    );
}

export default Landing;

// Services and blog data (unchanged)
const services = [
    {
        title: "Occupational Services",
        image: "./Images/BeforeLogin/Landing/occupational services.png",
        description:
            "Comprehensive occupational services focus on maintaining workforce health and ensuring compliance with safety regulations. These services include regular health assessments, wellness programs, injury prevention strategies, and training on safety practices.",
    },
    {
        title: "Pre-Employment Screening",
        image: "./Images/BeforeLogin/Landing/Pre-Employment Screening.png",
        description:
            "Streamlining hiring through thorough pre-employment screening is essential for identifying the right candidates. This includes background checks, skill assessments, and health screenings to verify qualifications.",
    },
    {
        title: "Drug Testing",
        image: "./Images/BeforeLogin/Landing/Drug Testing.png",
        description:
            "Our efficient drug testing services meet DOT standards and your company’s needs. We offer pre-employment, random, and post-incident screenings with fast turnaround and secure reporting.",
    },
];

const blogArticles = [
    {
        title: "Ensuring Workplace Safety: How Occupational Services Protect Your Business",
        description: "Learn how occupational services safeguard your business by maintaining workplace safety standards...",
        image: "./Images/BeforeLogin/Landing/blankimage.jpeg",
    },
    {
        title: "The Importance of Comprehensive Pre-Employment Screening in Today's Job Market",
        description: "Understand why comprehensive pre-employment screening is essential in today's job market...",
        image: "./Images/BeforeLogin/Landing/blankimage.jpeg",
    },
    {
        title: "Unveiling the Best Practices for Effective DOT Drug Testing Programs",
        description: "Learn how to enhance your DOT Drug Testing Programs with our best practices guide...",
        image: "./Images/BeforeLogin/Landing/blankimage.jpeg",
    },
];
