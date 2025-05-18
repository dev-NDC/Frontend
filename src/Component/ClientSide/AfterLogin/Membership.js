import React, { useState, useContext, useEffect } from "react";
import {
    Table, TableBody, TableCell, TableContainer, TableHead,
    TableRow, Paper, Typography, useMediaQuery, Dialog,
    DialogTitle, DialogContent, DialogActions, Button,
    Box, Grid, IconButton, Menu, MenuItem
} from "@mui/material";
import { MoreVert, Visibility } from "@mui/icons-material";
import HomeContext from "../../../Context/ClientSide/AfterLogin/Home/HomeContext";

function Membership() {
    const [viewOpen, setViewOpen] = useState(false);
    const [selectedCertificate, setSelectedCertificate] = useState(null);
    const [anchorEl, setAnchorEl] = useState(null);
    const [menuIndex, setMenuIndex] = useState(null);
    const isMobile = useMediaQuery("(max-width:500px)");
    const { userData } = useContext(HomeContext);
    const [membership, setMembership] = useState({});
    const [certificate, setCertificate] = useState([]);

    useEffect(() => {
        if (userData) {
            setMembership(userData.Membership);
            setCertificate(userData.certificates || []);
        }
    }, [userData]);

    const handleMenuClick = (event, index) => {
        setAnchorEl(event.currentTarget);
        setMenuIndex(index);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
        setMenuIndex(null);
    };

    const handleViewOpen = (cert) => {
        setSelectedCertificate(cert);
        setViewOpen(true);
        handleMenuClose();
    };

    const handleViewClose = () => {
        setViewOpen(false);
        setSelectedCertificate(null);
    };

    return (
        <div className="container" style={{ marginTop: '100px' }}>
            <Box sx={{ p: 2, borderRadius: 2, boxShadow: 3, bgcolor: "white" }}>
                <Typography variant="h5" fontWeight="bold" gutterBottom>Membership Information</Typography>
                <Box sx={{ mb: 2, p: 2, borderRadius: 2, bgcolor: "#f5f5f5" }}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <Typography variant="subtitle2">Current Plan:</Typography>
                            <Typography variant="body1" sx={{ fontWeight: 700 }}>{membership.selectedPlan || "N/A"}</Typography>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Typography variant="subtitle2">Join Date:</Typography>
                            <Typography variant="body1" sx={{ fontWeight: 700 }}>
                                {membership.planStartDate ? new Date(membership.planStartDate).toLocaleDateString() : "N/A"}
                            </Typography>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Typography variant="subtitle2">Expiry Date:</Typography>
                            <Typography variant="body1" sx={{ fontWeight: 700 }}>
                                {membership.planEndDate ? new Date(membership.planEndDate).toLocaleDateString() : "N/A"}
                            </Typography>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Typography variant="subtitle2">Status:</Typography>
                            <Typography variant="body1" sx={{ fontWeight: 700, color: membership.planStatus === "Active" ? "green" : "red" }}>
                                {membership.planStatus || "N/A"}
                            </Typography>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Typography variant="subtitle2">OrgId:</Typography>
                            <Typography variant="body1" sx={{ fontWeight: 700 }}>{membership.orgId || "N/A"}</Typography>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Typography variant="subtitle2">Location Code:</Typography>
                            <Typography variant="body1" sx={{ fontWeight: 700 }}>{membership.locationCode || "N/A"}</Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography variant="subtitle2">Packages:</Typography>
                            <Typography variant="body1" sx={{ fontWeight: 700 }}>
                                {membership.package?.length
                                    ? membership.package.map((pkg) => pkg.package_name).join(", ")
                                    : "N/A"}
                            </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography variant="subtitle2">Reason Names:</Typography>
                            <Typography variant="body1" sx={{ fontWeight: 700 }}>
                                {membership.order_reason?.length
                                    ? membership.order_reason.map((reason) => reason.order_reason_name).join(", ")
                                    : "N/A"}
                            </Typography>
                        </Grid>
                    </Grid>
                </Box>

                <Typography variant="h6" fontWeight="bold" gutterBottom>Certificates</Typography>
                <TableContainer component={Paper} sx={{ borderRadius: 2, boxShadow: 3, overflowX: "auto" }}>
                    <Table>
                        <TableHead sx={{ backgroundColor: "#003366" }}>
                            <TableRow>
                                <TableCell sx={{ color: "white" }}>Sr</TableCell>
                                <TableCell sx={{ color: "white" }}>Description</TableCell>
                                {!isMobile && <TableCell sx={{ color: "white" }}>Issue Date</TableCell>}
                                {!isMobile && <TableCell sx={{ color: "white" }}>Expiration Date</TableCell>}
                                {!isMobile && <TableCell sx={{ color: "white" }} align="right">Actions</TableCell>}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {certificate.map((cert, index) => (
                                <TableRow key={index}>
                                    <TableCell>{index + 1}</TableCell>
                                    <TableCell>{cert.description}</TableCell>
                                    {!isMobile && <TableCell>{new Date(cert.issueDate).toLocaleDateString()}</TableCell>}
                                    {!isMobile && <TableCell>{new Date(cert.expirationDate).toLocaleDateString()}</TableCell>}
                                    {!isMobile && (
                                        <TableCell align="right">
                                            <IconButton onClick={(e) => handleMenuClick(e, index)}>
                                                <MoreVert />
                                            </IconButton>
                                            <Menu
                                                anchorEl={anchorEl}
                                                open={menuIndex === index}
                                                onClose={handleMenuClose}
                                            >
                                                <MenuItem onClick={() => handleViewOpen(cert)}>
                                                    <Visibility fontSize="small" sx={{ mr: 1 }} /> View Details
                                                </MenuItem>
                                            </Menu>
                                        </TableCell>
                                    )}
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>

                {/* View Certificate Modal */}
                <Dialog open={viewOpen} onClose={handleViewClose} maxWidth="sm" fullWidth>
                    <DialogTitle>Certificate Details</DialogTitle>
                    <DialogContent>
                        <Typography gutterBottom><strong>Description:</strong> {selectedCertificate?.description}</Typography>
                        <Typography gutterBottom><strong>Issue Date:</strong> {new Date(selectedCertificate?.issueDate).toLocaleDateString()}</Typography>
                        <Typography gutterBottom><strong>Expiration Date:</strong> {new Date(selectedCertificate?.expirationDate).toLocaleDateString()}</Typography>

                        {selectedCertificate?.certificateFile?.data && (
                            <img
                                src={URL.createObjectURL(
                                    new Blob(
                                        [new Uint8Array(selectedCertificate.certificateFile.data)],
                                        { type: selectedCertificate.mimeType || "image/png" }
                                    )
                                )}
                                alt="Certificate"
                                style={{ width: "100%", marginTop: "1rem", borderRadius: 8 }}
                            />
                        )}
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleViewClose} color="primary">Close</Button>
                    </DialogActions>
                </Dialog>
            </Box>
        </div>
    );
}

export default Membership;
