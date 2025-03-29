import React from "react";
import { Container, Grid, Typography, Link } from "@mui/material";
import { Facebook, Twitter, LinkedIn, Instagram } from "@mui/icons-material";

function Footer() {
    return (
        <div style={{ marginTop:'50px',padding:"30px 0px", borderTop: "1px solid #ddd" }}>
            <Container maxWidth="lg">
                <Grid container justifyContent="space-between" alignItems="center">
                    <Grid item>
                        <Typography variant="body2" color="textSecondary">
                            <Link href="/" color="inherit" underline="none" sx={{ mr: 2 }}>
                                home
                            </Link>
                            <Link href="/pricing" color="inherit" underline="none" sx={{ mr: 2 }}>
                                Pricing
                            </Link>
                            <Link href="/about" color="inherit" underline="none">
                                About us
                            </Link>
                        </Typography>
                    </Grid>
                    <Grid item>
                        <Typography variant="body2" color="textSecondary">
                            &copy; Nationwide Drug Centers
                            <span style={{ margin: "0 10px" }}>|</span>
                            <Link href="#" color="inherit" underline="none" sx={{ mr: 2 }}>
                                Terms of Use
                            </Link>
                            <Link href="#" color="inherit" underline="none">
                                Privacy Policy
                            </Link>
                        </Typography>
                    </Grid>
                    <Grid item>
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
                    </Grid>
                </Grid>
            </Container>
        </div>
    );
}

export default Footer;
