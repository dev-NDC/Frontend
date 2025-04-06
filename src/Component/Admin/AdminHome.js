import React, { useState, useContext, useEffect } from "react";
import { Box, useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import axios from "axios";
import Cookies from "js-cookie"
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

import Navbar from "./Navbar";
import Welcome from "./Welcome";
import ViewCustomer from "./Customer/ViewCustomer";
import ViewCustomerDetails from "./Customer/ViewUserDetails";

import AdminContext from "../../Context/Admin/AdminContext";
import CustomerState from "../../Context/Admin/Customer/CustomerState"

const API_URL = "http://localhost:8000/api";
const drawerWidth = 240;

function AdminHome() {
    const { currentActiveButton } = useContext(AdminContext);
    const [isMobileOpen, setIsMobileOpen] = useState(false);
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
    const navigate = useNavigate();

    useEffect(() => {
        const token = Cookies.get("token");
        if (token) {
            axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
            axios.get(`${API_URL}/admin/verify`)
                .then(response => {

                })
                .catch(error => {
                    if (error.message === "Network Error") {
                        toast.error("Server error, Please try again later!")
                    } else {
                        toast.error(error.response.data.message)
                    }
                    navigate("/login")
                });
        } else {

            toast.error("Invalid access, Please login again")
            navigate("/login")
        }
        // eslint-disable-next-line
    }, []);


    const renderContent = () => {
        switch (currentActiveButton) {
            case 1:
                return <Welcome />;
            case 2:
                return <CustomerState><ViewCustomer /></CustomerState>
            case 5:
                return  <CustomerState><ViewCustomerDetails /></CustomerState> 
            default:
                return <Welcome />; // Default component
        }
    }
    return (
        <Box sx={{ display: "flex" }}>
            <Navbar isMobileOpen={isMobileOpen} setIsMobileOpen={setIsMobileOpen} />
            <Box
                sx={{
                    flexGrow: 1,
                    ml: isMobile ? 0 : `${drawerWidth}px`, // Avoids hiding content
                }}
            >
                {renderContent()}
            </Box>
        </Box>
    );
}

export default AdminHome;
