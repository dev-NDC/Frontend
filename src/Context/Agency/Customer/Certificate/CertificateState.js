import React from "react";
import CertificateContext from "./CertificateContext";
import axios from "axios";
import { toast } from "react-toastify";
const API_URL = "http://localhost:8000/api";

const CertificateState = (props) => {

    const addCertificate = async (formData) => {
        try {
            const response = await axios.post(`${API_URL}/agency/uploadCertificate`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            if (response.status !== 200) {
                toast.error("Error adding certificate");
            } else {
                toast.success("Certificate added successfully");
            }
        } catch (error) {
            toast.error("Error adding certificate");
        }
    };

    const updateCertificate = async (currentId, certificateId, updatedData) => {
        try {
            console.log("Updating certificate with ID:", certificateId);
            console.log("Updated data:", updatedData);
            console.log("Current ID:", currentId);
            await axios.post(`${API_URL}/agency/editCertificate`, {
                currentId,
                certificateId,
                updatedData
            });
            toast.success("Certificate updated successfully");
        } catch (error) {
            toast.error("Failed to update certificate");
        }
    };

    const deleteCertificate = async (currentId, certificateId) => {
        try {
            await axios.post(`${API_URL}/agency/deleteCertificate`, {
                currentId,
                certificateId
            });
            toast.success("Certificate deleted successfully");
        } catch (error) {
            toast.error("Failed to delete certificate");
        }
    };

    return (
        <CertificateContext.Provider value={{ addCertificate, updateCertificate, deleteCertificate }}>
            {props.children}
        </CertificateContext.Provider>
    );
};

export default CertificateState;
