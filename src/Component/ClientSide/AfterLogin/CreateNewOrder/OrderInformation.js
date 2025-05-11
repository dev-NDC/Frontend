import React, { useState, useEffect, useContext } from "react";
import {
    Typography,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Button,
    Box,
} from "@mui/material";
import axios from "axios";

import CreateNewOrderContext from "../../../../Context/ClientSide/AfterLogin/CreateNewOrder/CreateNewOrderContext";
const API_URL = process.env.REACT_APP_API_URL;

function OrderInformation() {
    const { orderReasonId, packageId, companyId, allCompanyData, currentPosition, maxPosition, setAllCompanyData, setCurrentPosition, setCompanyId, setPackageId, setOrderReasonId, setMaxPosition } =
        useContext(CreateNewOrderContext);

    const [availablePackages, setAvailablePackages] = useState([]);
    const [availableReasons, setAvailableReasons] = useState([]);

    // Fetch all companies and their details
    useEffect(() => {
        const fetchCompanies = async () => {
            try {
                const res = await axios.get(`${API_URL}/user/getAllCompanyAllDetials`);
                setAllCompanyData(res.data.data || []);
            } catch (err) {
                console.error("Failed to fetch company data:", err);
            }
        };
        fetchCompanies();
        // eslint-disable-next-line
    }, []);
    useEffect(() => {
        if (companyId && allCompanyData.length > 0) {
            const selectedCompany = allCompanyData.find(c => c._id === companyId);
            setAvailablePackages(selectedCompany?.packages || []);
            setAvailableReasons(selectedCompany?.orderReasons || []);
        }
    }, [companyId, allCompanyData]);

    const handleCompanyChange = (e) => {
        const selectedId = e.target.value;
        setCompanyId(selectedId);
        setPackageId("");
        setOrderReasonId("");

        const selectedCompany = allCompanyData.find(c => c._id === selectedId);
        setAvailablePackages(selectedCompany?.packages || []);
        setAvailableReasons(selectedCompany?.orderReasons || []);
    };

    const handlePackageChange = (e) => {
        setPackageId(e.target.value);
        setOrderReasonId("");
    };

    const handleReasonChange = (e) => {
        setOrderReasonId(e.target.value);
    };

    const handleSubmit = () => {
        if (currentPosition === maxPosition) {
            setMaxPosition(maxPosition + 1);
        }
        setCurrentPosition(currentPosition + 1);
    };

    return (
        <div className="container py-4">
            <Typography variant="h6" className="fw-bold mb-4">
                Order Information
            </Typography>

            <div className="row mb-3">
                <div className="col-12">
                    <FormControl fullWidth>
                        <InputLabel id="company-location-label">Company</InputLabel>
                        <Select
                            labelId="company-location-label"
                            value={companyId}
                            onChange={handleCompanyChange}
                            label="Company"
                        >
                            {allCompanyData.map((company) => (
                                <MenuItem key={company._id} value={company._id}>
                                    {company.companyName}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </div>
            </div>

            <div className="row mb-3">
                <div className="col-12">
                    <FormControl fullWidth disabled={!companyId}>
                        <InputLabel id="package-label">Package</InputLabel>
                        <Select
                            labelId="package-label"
                            value={packageId}
                            onChange={handlePackageChange}
                            label="Package"
                        >
                            {availablePackages.map((pkg) => (
                                <MenuItem key={pkg._id} value={pkg._id}>
                                    {pkg.packageName}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </div>
            </div>

            <div className="row mb-4">
                <div className="col-12">
                    <FormControl fullWidth disabled={!packageId}>
                        <InputLabel id="order-reason-label">Order Reason</InputLabel>
                        <Select
                            labelId="order-reason-label"
                            value={orderReasonId}
                            onChange={handleReasonChange}
                            label="Order Reason"
                        >
                            {availableReasons.map((reason) => (
                                <MenuItem key={reason._id} value={reason._id}>
                                    {reason.orderReasonName}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </div>
            </div>

            <Box display="flex" justifyContent="flex-end">
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleSubmit}
                    disabled={!orderReasonId}
                >
                    Continue
                </Button>
            </Box>
        </div>
    );
}

export default OrderInformation;
