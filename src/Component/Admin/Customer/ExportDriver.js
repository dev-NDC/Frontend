import React, { useState } from "react";
import {
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    Typography,
} from "@mui/material";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import axios from "axios";

const API_URL = "http://localhost:8000/api";

function ExportDriver() {
    const [open, setOpen] = useState(false);
    const [driverData, setDriverData] = useState([]);

    const handleExport = async () => {
        try {
            const response = await axios.get(`${API_URL}/admin/exportDriver`);
            console.log(response.data);
            const drivers = response.data.data;
            setDriverData(drivers);
            setOpen(true);
        } catch (error) {
            console.error("Failed to export driver data:", error);
        }
    };

    const handleDownload = () => {
        const excelData = driverData.map(driver => ({
            "Driver Name": driver["Driver Name"],
            "DOB": driver["DOB"],
            "License Number": driver["License Number"],
            "Company Name": driver["Company Name"],
            "Company Email": driver["Company Email"],
            "Date Added": driver["Date Added"],
            "Date Deleted": driver["Date Deleted"] || "Not Deleted",
            "Agency Name": driver["Agency Name"],
        }));


        const worksheet = XLSX.utils.json_to_sheet(excelData);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Drivers");

        const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
        const fileData = new Blob([excelBuffer], { type: "application/octet-stream" });
        saveAs(fileData, "DriverExport.xlsx");
    };

    return (
        <div>
            <Button variant="contained" color="primary" onClick={handleExport}>
                Export Driver
            </Button>

            <Dialog open={open} onClose={() => setOpen(false)} fullWidth maxWidth="lg">
                <DialogTitle>Driver Preview</DialogTitle>
                <DialogContent>
                    {driverData.length === 0 ? (
                        <Typography>No data available.</Typography>
                    ) : (
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Driver Name</TableCell>
                                    <TableCell>DOB</TableCell>
                                    <TableCell>License Number</TableCell>
                                    <TableCell>Company Name</TableCell>
                                    <TableCell>Company Email</TableCell>
                                    <TableCell>Date Added</TableCell>
                                    <TableCell>Date Deleted</TableCell>
                                    <TableCell>Agency Name</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {driverData.map((driver, index) => (
                                    <TableRow key={index}>
                                        <TableCell>{driver["Driver Name"]}</TableCell>
                                        <TableCell>{driver["DOB"]}</TableCell>
                                        <TableCell>{driver["License Number"]}</TableCell>
                                        <TableCell>{driver["Company Name"]}</TableCell>
                                        <TableCell>{driver["Company Email"]}</TableCell>
                                        <TableCell>{driver["Date Added"]}</TableCell>
                                        <TableCell>{driver["Date Deleted"] || "Not Deleted"}</TableCell>
                                        <TableCell>{driver["Agency Name"]}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>

                        </Table>
                    )}
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpen(false)}>Cancel</Button>
                    <Button variant="contained" color="primary" onClick={handleDownload}>
                        Download as Excel
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default ExportDriver;
