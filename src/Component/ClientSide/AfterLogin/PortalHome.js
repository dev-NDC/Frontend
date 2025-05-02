import React, { useState, useContext, useEffect } from "react";
import { Box, useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import axios from "axios";
import Cookies from "js-cookie"
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

import Navbar from "./Navbar";
import Welcome from "./Welcome";
import Company from "./Company";
import Driver from "./Drivers/Driver";
import SecheduleTest from "./ScheduleTest";
import Result from "./Result";
import Payment from "./Payment";
import Invoice from "./Invoice";
import Membership from "./Membership";

import HomeContext from "../../../Context/ClientSide/AfterLogin/Home/HomeContext";
import DriverState from "../../../Context/ClientSide/AfterLogin/Driver/DriverState";
import CreateNewOrderState from "../../../Context/ClientSide/AfterLogin/CreateNewOrder/CreateNewOrderState";

const drawerWidth = 240;

const API_URL = "http://localhost:8000/api";

function PortalHome() {
  const { currentActiveButton } = useContext(HomeContext);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const navigate = useNavigate();

  useEffect(() => {
    const token = Cookies.get("token");
    if (token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      axios.get(`${API_URL}/validateUser/verify`)
        .then(response => {

        })
        .catch(error => {
          toast.error("Please login again")
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
        return <Company />;
      case 3:
        return <DriverState><Driver/></DriverState>;
      case 4:
        return <CreateNewOrderState><SecheduleTest /></CreateNewOrderState>
      case 5:
        return <Result />
      case 6:
        return <Membership />
      case 7:
        return <Payment />
      case 8:
        return <Invoice />
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
          p: 2,
        }}
      >

        {renderContent()}
      </Box>
    </Box>
  );
}

export default PortalHome;
