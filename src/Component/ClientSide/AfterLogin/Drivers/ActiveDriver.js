import React, { useState, useContext, useEffect } from "react";
import {
    Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
    IconButton, Menu, MenuItem, Paper, Dialog, DialogTitle, DialogContent,
    DialogActions, Button, Typography, Box, TextField, useMediaQuery
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";

import HomeContext from "../../../../Context/ClientSide/AfterLogin/Home/HomeContext";
import DriverContext from "../../../../Context/ClientSide/AfterLogin/Driver/DriverContext";

function ActiveDriver() {
    const { userData, updateUserData } = useContext(HomeContext);
    const { updateDriver, deleteDriver } = useContext(DriverContext);
    const [drivers, setDrivers] = useState([]);
    const [menuAnchor, setMenuAnchor] = useState(null);
    const [selectedDriver, setSelectedDriver] = useState(null);
    const [editOpen, setEditOpen] = useState(false);
    const [deleteOpen, setDeleteOpen] = useState(false);
    const [viewOpen, setViewOpen] = useState(false);
    const [editedDriver, setEditedDriver] = useState(null);
    const isTablet = useMediaQuery("(max-width:1200px)");
    const isMobile = useMediaQuery("(max-width:500px)");

    useEffect(() => {
        if (userData?.drivers) {
            const activeDrivers = userData.drivers.filter(driver => !driver.isDeleted);
            setDrivers(activeDrivers);
        }
    }, [userData]);

    const handleMenuOpen = (event, driver) => {
        setMenuAnchor(event.currentTarget);
        setSelectedDriver(driver);
    };

    const handleMenuClose = () => {
        setMenuAnchor(null);
    };

    const handleEditOpen = () => {
        setEditedDriver({ ...selectedDriver });
        setEditOpen(true);
        handleMenuClose();
    };

    const handleDeleteOpen = () => {
        setDeleteOpen(true);
        handleMenuClose();
    };

    const handleViewOpen = () => {
        setViewOpen(true);
        handleMenuClose();
    };

    const handleEditChange = (e) => {
        setEditedDriver({ ...editedDriver, [e.target.name]: e.target.value });
    };

    const handleSaveEdit = async () => {
        await updateDriver(editedDriver);
        updateUserData();
        setEditOpen(false);
    };

    const handleDeleteDriver = async () => {
        await deleteDriver(selectedDriver);
        updateUserData();
        setDeleteOpen(false);
    };

    return (
        <TableContainer component={Paper} sx={{ mt: 3, p: 2, borderRadius: 2, boxShadow: 3, overflowX: "auto" }}>
            <Table>
                <TableHead>
                    <TableRow sx={{ backgroundColor: "#003366" }}>
                        <TableCell sx={{ color: "white", fontWeight: "bold" }}>Sr</TableCell>
                        <TableCell sx={{ color: "white", fontWeight: "bold" }}>Name</TableCell>
                        {!isMobile && <TableCell sx={{ color: "white", fontWeight: "bold" }}>Email</TableCell>}
                        {!isTablet && <TableCell sx={{ color: "white", fontWeight: "bold" }}>License #</TableCell>}
                        {!isTablet && <TableCell sx={{ color: "white", fontWeight: "bold" }}>DOB</TableCell>}
                        {!isTablet && <TableCell sx={{ color: "white", fontWeight: "bold" }}>Phone No</TableCell>}
                        <TableCell sx={{ color: "white", fontWeight: "bold" }}>Actions</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {drivers.map((driver, index) => (
                        <TableRow key={index} hover>
                            <TableCell>{index + 1}</TableCell>
                            <TableCell>{driver.name}</TableCell>
                            {!isMobile && <TableCell>{driver.email}</TableCell>}
                            {!isTablet && <TableCell>{driver.licenseNumber}</TableCell>}
                            {!isTablet && <TableCell>{driver.dob}</TableCell>}
                            {!isTablet && <TableCell>{driver.phone}</TableCell>}
                            <TableCell>
                                <IconButton onClick={(event) => handleMenuOpen(event, driver)}>
                                    <MoreVertIcon />
                                </IconButton>
                                <Menu anchorEl={menuAnchor} open={Boolean(menuAnchor)} onClose={handleMenuClose}>
                                    <MenuItem onClick={handleEditOpen}>Edit</MenuItem>
                                    <MenuItem onClick={handleDeleteOpen}>Delete</MenuItem>
                                    <MenuItem onClick={handleViewOpen}>View More Details</MenuItem>
                                </Menu>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>

            {/* Edit Modal */}
            <Dialog open={editOpen} onClose={() => setEditOpen(false)}>
                <DialogTitle>Edit Driver</DialogTitle>
                <DialogContent>
                    <TextField fullWidth margin="dense" label="Name" name="name" value={editedDriver?.name || ""} onChange={handleEditChange} />
                    <TextField fullWidth margin="dense" label="Email" name="email" value={editedDriver?.email || ""} onChange={handleEditChange} />
                    <TextField fullWidth margin="dense" label="License #" name="licenseNumber" value={editedDriver?.licenseNumber || ""} onChange={handleEditChange} />
                    <TextField fullWidth margin="dense" label="DOB" name="dob" value={editedDriver?.dob || ""} onChange={handleEditChange} />
                    <TextField fullWidth margin="dense" label="Phone No" name="phone" value={editedDriver?.phone || ""} onChange={handleEditChange} />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setEditOpen(false)} color="secondary">Cancel</Button>
                    <Button onClick={handleSaveEdit} color="primary" variant="contained">Save</Button>
                </DialogActions>
            </Dialog>

            {/* Delete Modal */}
            <Dialog open={deleteOpen} onClose={() => setDeleteOpen(false)}>
                <DialogTitle>Delete Driver</DialogTitle>
                <DialogContent>
                    <Typography>Are you sure you want to delete {selectedDriver?.name}?</Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setDeleteOpen(false)} color="secondary">Cancel</Button>
                    <Button onClick={handleDeleteDriver} color="primary" variant="contained">Delete</Button>
                </DialogActions>
            </Dialog>

            {/* View More Details Modal */}
            <Dialog open={viewOpen} onClose={() => setViewOpen(false)}>
                <DialogTitle>Driver Details</DialogTitle>
                <DialogContent>
                    <Box sx={{ p: 2, borderRadius: 2, boxShadow: 1, bgcolor: "#f9f9f9" }}>
                        <Typography variant="h6" gutterBottom>{selectedDriver?.name}</Typography>
                        <Typography variant="body1"><strong>Email:</strong> {selectedDriver?.email}</Typography>
                        <Typography variant="body1"><strong>License #:</strong> {selectedDriver?.licenseNumber}</Typography>
                        <Typography variant="body1"><strong>DOB:</strong> {selectedDriver?.dob}</Typography>
                        <Typography variant="body1"><strong>Phone No:</strong> {selectedDriver?.phone}</Typography>
                        <Typography variant="body1"><strong>Creation Date:</strong> {selectedDriver?.creationDate}</Typography>
                        <Typography variant="body1"><strong>Created By:</strong> {selectedDriver?.createdBy}</Typography>
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setViewOpen(false)} color="secondary">Close</Button>
                </DialogActions>
            </Dialog>
        </TableContainer>
    );
}

export default ActiveDriver;
