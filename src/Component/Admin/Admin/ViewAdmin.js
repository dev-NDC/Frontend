import React, { useState, useContext } from "react";
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper,
  Typography, Box, IconButton, Menu, MenuItem
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import AdminContext from "../../../Context/Admin/Admin/AdminContext";
import EditAdminModal from "./EditAdminModal";
import DeleteAdminModal from "./DeleteAdminModal";
import CreateNewAdmin from "./CreateNewAdmin";

const normalizePhoneNumber = require("../../Utils/normalizePhone");

function ViewAdmin() {
  const { AllAdminData } = useContext(AdminContext);

  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedAdmin, setSelectedAdmin] = useState(null);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

  const handleMenuClick = (event, admin) => {
    setAnchorEl(event.currentTarget);
    setSelectedAdmin(admin);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleEdit = () => {
    setEditModalOpen(true);
    handleClose();
  };

  const handleDelete = () => {
    setDeleteModalOpen(true);
    handleClose();
  };

  return (
    <Box>
      <TableContainer component={Paper} sx={{ mt: 3, p: 2, borderRadius: 2, boxShadow: 3 }}>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
          <Typography variant="h6" sx={{ fontWeight: "bold" }}>
            Admin List
          </Typography>
          <CreateNewAdmin />
        </Box>

        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: "#003366" }}>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>Name</TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>Email</TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>Contact Number</TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {AllAdminData?.map((admin, index) => (
              <TableRow key={index} hover>
                <TableCell>{admin.firstName} {admin.lastName}</TableCell>
                <TableCell>{admin.email}</TableCell>
                <TableCell>{normalizePhoneNumber(admin.contactNumber)}</TableCell>
                <TableCell>
                  <IconButton onClick={(e) => handleMenuClick(e, admin)}>
                    <MoreVertIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Action Menu */}
      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
        <MenuItem onClick={handleEdit}>Edit</MenuItem>
        <MenuItem onClick={handleDelete}>Delete</MenuItem>
      </Menu>

      {/* Modals */}
      {selectedAdmin && (
        <>
          <EditAdminModal
            open={editModalOpen}
            onClose={() => setEditModalOpen(false)}
            admin={selectedAdmin}
          />
          <DeleteAdminModal
            open={deleteModalOpen}
            onClose={() => setDeleteModalOpen(false)}
            admin={selectedAdmin}
          />
        </>
      )}
    </Box>
  );
}

export default ViewAdmin;
