import React, { useContext, useState, useEffect } from "react";
import {
    Dialog, DialogTitle, DialogContent, DialogActions, Button,
    IconButton, Table, TableBody, TableCell, TableContainer,
    TableHead, TableRow, Typography, TextField, CircularProgress
} from "@mui/material";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { Edit, Delete, Visibility, Download } from "@mui/icons-material";
import CustomerContext from "../../../../Context/Agency/Customer/CustomerContext";
import CertificateContext from "../../../../Context/Agency/Customer/Certificate/CertificateContext";

function DisplayCertificate() {
    const { currentId, userDetails,getSingleUserData } = useContext(CustomerContext);
    const { updateCertificate, deleteCertificate } = useContext(CertificateContext);

    const [loading, setLoading] = useState(true);
    const [certificates, setCertificates] = useState([]);
    const [openModal, setOpenModal] = useState(null);
    const [selectedCert, setSelectedCert] = useState(null);
    const [editData, setEditData] = useState({});

    useEffect(() => {
        if (userDetails?.certificates) {
            setCertificates(userDetails.certificates);
            setLoading(false);
        }
    }, [userDetails]);

    const handleOpen = (type, cert) => {
        setSelectedCert(cert);
        setEditData(cert);
        setOpenModal(type);
    };

    const handleClose = () => {
        setOpenModal(null);
        setSelectedCert(null);
        setEditData({});
    };

    const handleDownload = async (cert) => {
        // Create container to render HTML temporarily
        const container = document.createElement("div");
        container.style.position = "fixed";
        container.style.top = "-9999px";
        container.style.width = "600px";
        container.style.padding = "20px";
        container.style.backgroundColor = "white";
        container.innerHTML = `
            <h2>Certificate</h2>
            <p><strong>Description:</strong> ${cert.description}</p>
            <p><strong>Issue Date:</strong> ${new Date(cert.issueDate).toLocaleDateString()}</p>
            <p><strong>Expiration Date:</strong> ${new Date(cert.expirationDate).toLocaleDateString()}</p>
            <img id="certImage" src="" style="width:100%; margin-top:10px; border-radius:10px;" />
        `;

        // Create blob for image
        const blob = new Blob([new Uint8Array(cert.certificateFile.data)], { type: cert.mimeType });
        const imageUrl = URL.createObjectURL(blob);
        container.querySelector("#certImage").src = imageUrl;

        document.body.appendChild(container);

        // Convert to canvas
        const canvas = await html2canvas(container, { scale: 2 });
        const imgData = canvas.toDataURL("image/png");

        const pdf = new jsPDF("p", "mm", "a4");
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

        pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
        pdf.save(`${cert.description || "certificate"}.pdf`);

        document.body.removeChild(container); // cleanup
        URL.revokeObjectURL(imageUrl); // cleanup
    };

    const handleUpdate = async () => {
        await updateCertificate(currentId, selectedCert._id, editData);
        await getSingleUserData(currentId);
        handleClose();
    };

    const handleDelete = async () => {
        await deleteCertificate(currentId, selectedCert._id);
        await getSingleUserData(currentId);
        handleClose();
    };

    if (loading) return <CircularProgress />;

    return (
        <TableContainer>
            <Table>
                <TableHead style={{ backgroundColor: "#0b2f6a" }}>
                    <TableRow>
                        <TableCell style={{ color: "white" }}>Sr</TableCell>
                        <TableCell style={{ color: "white" }}>Description</TableCell>
                        <TableCell style={{ color: "white" }}>Issue Date</TableCell>
                        <TableCell style={{ color: "white" }}>Expiration Date</TableCell>
                        <TableCell style={{ color: "white" }} align="right">Actions</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {certificates.map((cert, index) => (
                        <TableRow key={index}>
                            <TableCell>{index + 1}</TableCell>
                            <TableCell>{cert.description}</TableCell>
                            <TableCell>{new Date(cert.issueDate).toLocaleDateString()}</TableCell>
                            <TableCell>{new Date(cert.expirationDate).toLocaleDateString()}</TableCell>
                            <TableCell align="right">
                                <IconButton onClick={() => handleOpen("view", cert)}><Visibility /></IconButton>
                                <IconButton onClick={() => handleDownload(cert)}><Download /></IconButton>
                                <IconButton onClick={() => handleOpen("edit", cert)}><Edit /></IconButton>
                                <IconButton onClick={() => handleOpen("delete", cert)}><Delete /></IconButton>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>

            {/* View Modal */}
            {/* View Modal */}
            <Dialog open={openModal === "view"} onClose={handleClose} maxWidth="sm" fullWidth>
                <DialogTitle>Certificate Details</DialogTitle>
                <DialogContent>
                    <Typography gutterBottom><strong>Description:</strong> {selectedCert?.description}</Typography>
                    <Typography gutterBottom><strong>Issue Date:</strong> {new Date(selectedCert?.issueDate).toLocaleDateString()}</Typography>
                    <Typography gutterBottom><strong>Expiration Date:</strong> {new Date(selectedCert?.expirationDate).toLocaleDateString()}</Typography>

                    {selectedCert?.certificateFile?.data && (
                        <img
                            src={URL.createObjectURL(
                                new Blob(
                                    [new Uint8Array(selectedCert.certificateFile.data)],
                                    { type: selectedCert.mimeType || "image/png" }
                                )
                            )}
                            alt="Certificate"
                            style={{ width: "100%", marginTop: "1rem", borderRadius: 8 }}
                        />
                    )}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">Close</Button>
                </DialogActions>
            </Dialog>


            {/* Edit Modal */}
            <Dialog open={openModal === "edit"} onClose={handleClose}>
                <DialogTitle>Edit Certificate</DialogTitle>
                <DialogContent>
                    <TextField
                        margin="dense"
                        label="Description"
                        fullWidth
                        value={editData.description || ""}
                        onChange={(e) => setEditData({ ...editData, description: e.target.value })}
                    />
                    <TextField
                        margin="dense"
                        label="Issue Date"
                        type="date"
                        fullWidth
                        value={editData.issueDate?.slice(0, 10)}
                        onChange={(e) => setEditData({ ...editData, issueDate: e.target.value })}
                        InputLabelProps={{ shrink: true }}
                    />
                    <TextField
                        margin="dense"
                        label="Expiration Date"
                        type="date"
                        fullWidth
                        value={editData.expirationDate?.slice(0, 10)}
                        onChange={(e) => setEditData({ ...editData, expirationDate: e.target.value })}
                        InputLabelProps={{ shrink: true }}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="secondary">Cancel</Button>
                    <Button onClick={handleUpdate} color="primary" variant="contained">Update</Button>
                </DialogActions>
            </Dialog>

            {/* Delete Modal */}
            <Dialog open={openModal === "delete"} onClose={handleClose}>
                <DialogTitle>Confirm Delete</DialogTitle>
                <DialogContent>
                    <Typography>Are you sure you want to delete this certificate?</Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">Cancel</Button>
                    <Button onClick={handleDelete} color="secondary" variant="contained">Delete</Button>
                </DialogActions>
            </Dialog>
        </TableContainer>
    );
}

export default DisplayCertificate;
