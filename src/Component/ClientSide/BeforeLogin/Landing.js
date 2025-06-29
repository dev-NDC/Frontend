import React from "react";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import {
  Card,
  CardContent,
  Typography,
  Grid,
  Container,
  CardMedia,
} from "@mui/material";
import { motion } from "framer-motion";
import VaccinesIcon from "@mui/icons-material/Vaccines";
import DescriptionIcon from "@mui/icons-material/Description";
import AssessmentIcon from "@mui/icons-material/Assessment";
import SchoolIcon from "@mui/icons-material/School";

function Landing() {
  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        style={{ marginTop: "90px" }}
      >
        <div >
          {/* === Background Image Hero Section === */}
          <div
            style={{
              backgroundImage: 'url("./Images/BeforeLogin/Landing/1.avif")',
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
              padding: "80px 0px",
              color: "white",
            }}
          >
            <div className="container">
              <div className="row">
                <div
                  className="col-md-12"
                  style={{
                    paddingTop: "40px",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    textAlign: "center",
                  }}
                >
                  <p
                    style={{
                      color: "blue",
                      fontSize: "20px",
                      fontWeight: 600,
                    }}
                  >
                    #1 in Workplace Safety
                  </p>
                  <p
                    style={{
                      fontSize: "50px",
                      fontWeight: 900,
                      marginBottom: "0px",
                    }}
                  >
                    Comprehensive{" "}
                    <span style={{ color: "red" }}>DOT Drug </span>
                    Testing Services
                  </p>
                  <p>
                    Ensure a safer workplace with SafetyChecks through precise
                    and reliable testing services.
                  </p>
                  <Button
                    component={Link}
                    to="/pricing"
                    variant="contained"
                    style={{
                      width: "100%",
                      maxWidth: "300px",
                      backgroundColor: "#0a0a42",
                      color: "white",
                    }}
                  >
                    Sign Up Now
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* === Blue Banner Section === */}
          <div
            style={{
              backgroundColor: "rgb(54, 107, 191)",
              marginTop: "30px",
              padding: "30px 0px",
            }}
          >
            <div className="container">
              <p
                className="text-center"
                style={{ fontSize: "56px", fontWeight: "900" }}
              >
                CALL US - (360)249-7511
              </p>
              <p
                className="text-center"
                style={{
                  fontSize: "28px",
                  fontWeight: "800",
                  color: "white",
                  marginBottom: "0px",
                }}
              >
                The #1 solution for DOT drug testing and screening
              </p>
              <p
                className="text-center"
                style={{ fontSize: "18px", color: "white" }}
              >
                As recognized by leading healthcare providers and occupational
                safety experts
              </p>
            </div>
          </div>

          {/* === Occupational Screening Section === */}
          <div className="container" style={{ marginTop: "30px" }}>
            <p
              className="text-center"
              style={{ fontSize: "36px", fontWeight: 900, marginBottom: "0px" }}
            >
              Comprehensive <span style={{ color: "blue" }}>Occupational </span>
              Screening Services
            </p>
            <p className="text-center">
              <b>Ensuring Safety and Compliance for Your Workforce</b>
            </p>
          </div>

          {/* === Services Cards (Old) === */}
          <Container style={{ marginTop: "40px" }}>
            <Grid container spacing={3}>
              {services.map((service, index) => (
                <Grid item xs={12} md={4} key={index}>
                  <motion.div
                    whileHover={{
                      scale: 1.05,
                      boxShadow: "0px 10px 20px rgba(0,0,0,0.2)",
                    }}
                    transition={{ type: "spring", stiffness: 300 }}
                    style={{ height: "100%" }}
                  >
                    <Card style={{ height: "100%" }}>
                      <CardMedia
                        component="img"
                        height="290"
                        image={service.image}
                        alt={service.title}
                      />
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

          {/* === DOT Consortium Programs Cards (New Custom Section) === */}
          <Container style={{ marginTop: "60px", marginBottom: "50px" }}>
  <Typography
    variant="h4"
    align="center"
    fontWeight="bold"
    style={{ marginBottom: "0px", color: "#0a0a42" }}
  >
    Labworks USA
  </Typography>
  <Typography
    variant="h5"
    align="center"
    fontWeight="600"
    style={{ marginBottom: "30px" }}
  >
    DOT Consortium Programs
  </Typography>

  <Grid container spacing={3}>
    {programs.map((program, index) => (
      <Grid item xs={12} md={6} key={index}>
        <motion.div
          whileHover={{
            scale: 1.03,
            boxShadow: "0px 12px 24px rgba(0,0,0,0.15)",
          }}
          transition={{ type: "spring", stiffness: 300 }}
          style={{ height: "100%" }}
        >
          <Card
            elevation={3}
            style={{
              height: "100%",
              minHeight: "320px", // Fixed height for consistency
              padding: "20px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              borderRadius: "12px",
            }}
          >
            <div style={{ display: "flex", gap: "15px" }}>
              <div style={{ fontSize: "40px", color: "#1976d2" }}>
                {program.icon}
              </div>
              <div>
                <Typography
                  variant="h6"
                  fontWeight="bold"
                  gutterBottom
                  style={{ color: "#0a0a42" }}
                >
                  {program.title}
                </Typography>
                <ul style={{ paddingLeft: "20px", margin: 0 }}>
                  {program.points.map((point, i) => (
                    <li
                      key={i}
                      style={{ marginBottom: "4px", fontSize: "0.95rem" }}
                    >
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            {program.button && (
              <Button
                variant="contained"
                style={{
                  backgroundColor: "#0a0a42",
                  color: "#fff",
                  marginTop: "16px",
                  alignSelf: "flex-start",
                }}
              >
                {program.button}
              </Button>
            )}
          </Card>
        </motion.div>
      </Grid>
    ))}

    {/* Leave a blank card for spacing (optional) */}
    {programs.length % 2 !== 0 && (
      <Grid item xs={12} md={6}>
        <div style={{ height: "100%", minHeight: "320px" }} />
      </Grid>
    )}
  </Grid>
</Container>

        </div>
      </motion.div>
    </>
  );
}

export default Landing;

// === Existing Image-Based Services ===
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

// === New Custom Program Cards ===
const programs = [
  {
    title: "Drug & Alcohol Testing",
    icon: <VaccinesIcon fontSize="inherit" />,
    points: [
      "Random DOT Drug and Alcohol Testing Consortium",
      "Collection Site Network 20,000+ Locations",
      "24/7 Emergency, Post accident & Onsite Collection",
      "Pre-Employment Testing",
      "Medical Review Officer (MRO) Review",
      "Return to duty / SAP follow up program assistance",
    ],
    button: "Sign Up Now!",
  },
  {
    title: "FMCSA Clearinghouse",
    icon: <DescriptionIcon fontSize="inherit" />,
    points: [
      "FMCSA Clearinghouse registration assistance is now available",
      "One-on-one with FMCSA Clearinghouse specialists",
      "Help managing your responsibilities",
      "Required for all Owner Operators",
    ],
  },
  {
    title: "File Management",
    icon: <AssessmentIcon fontSize="inherit" />,
    points: [
      "Immediate Enrollment Certification",
      "Online Account Portal Access",
      "Statistical Reporting, MIS Compliance Reports",
      "Friendly support for audit requirements",
      "Electronic Chain of Custody Forms (eCCF)",
    ],
  },
  {
    title: "Supervisor / DER Training",
    icon: <SchoolIcon fontSize="inherit" />,
    points: [
      "Free with 5 or more drivers",
      "DOT Approved Supervisor Training Available to non-members",
    ],
    button: "Non-Members Purchase",
  },
];
