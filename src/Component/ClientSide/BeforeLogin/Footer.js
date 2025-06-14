import React from "react";
import { Grid, Typography, Link, Box } from "@mui/material";
import { Facebook, Twitter, LinkedIn, Instagram } from "@mui/icons-material";
import { Link as RouterLink } from "react-router-dom";

function Footer() {
    return (
        <Box
            component="footer"
            sx={{
                width: "100%",
                backgroundColor: "#f9f9f9",
                borderTop: "1px solid #ddd",
                mt: 6,
                py: 3,
            }}
        >
            <Grid
                container
                justifyContent="center"
                alignItems="center"
                spacing={2}
                sx={{ textAlign: "center" }}
            >
                {/* Navigation Links */}
                <Grid item xs={12} md={4}>
                    <Typography variant="body2" color="textSecondary">
                        <Link
                            component={RouterLink}
                            to="/"
                            color="inherit"
                            underline="none"
                            sx={{ mr: 2 }}
                        >
                            Home
                        </Link>
                        <Link
                            component={RouterLink}
                            to="/pricing"
                            color="inherit"
                            underline="none"
                            sx={{ mr: 2 }}
                        >
                            Pricing
                        </Link>
                        <Link
                            component={RouterLink}
                            to="/about"
                            color="inherit"
                            underline="none"
                        >
                            About Us
                        </Link>
                    </Typography>
                </Grid>

                {/* Copyright and Legal */}
                <Grid item xs={12} md={4}>
                    <Typography variant="body2" color="textSecondary">
                        &copy; Nationwide Drug Centers
                        <span style={{ margin: "0 10px" }}>|</span>
                        <Link
                            component={RouterLink}
                            to="/termsAndConditions"
                            color="inherit"
                            underline="none"
                            sx={{ mr: 2 }}
                        >
                            Terms of Use
                        </Link>
                        <Link
                            component={RouterLink}
                            to="/privacy"
                            color="inherit"
                            underline="none"
                        >
                            Privacy Policy
                        </Link>
                    </Typography>
                </Grid>

                {/* Social Icons */}
                <Grid item xs={12} md={4}>
                    <Box>
                        <Link href="#" color="inherit" sx={{ mx: 1 }}>
                            <Facebook fontSize="small" />
                        </Link>
                        <Link href="#" color="inherit" sx={{ mx: 1 }}>
                            <Twitter fontSize="small" />
                        </Link>
                        <Link href="#" color="inherit" sx={{ mx: 1 }}>
                            <LinkedIn fontSize="small" />
                        </Link>
                        <Link href="#" color="inherit" sx={{ mx: 1 }}>
                            <Instagram fontSize="small" />
                        </Link>
                    </Box>
                </Grid>
            </Grid>
        </Box>
    );
}

export default Footer;
