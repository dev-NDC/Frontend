import React, { useState, useEffect } from "react";
import HomeContext from "./HomeContext";
import axios from "axios";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import { UpdateRounded } from "@mui/icons-material";
const API_URL = process.env.REACT_APP_API_URL;

const HomeState = (props) => {
    const [currentActiveButton, setCurrentActiveButton] = useState(1);
    const [userData, setUserData] = useState();
    useEffect(() => {
        const token = Cookies.get("token");
        if (token) {
            axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
            axios.get(`${API_URL}/user/getdata`)
                .then(response => {
                    setUserData(response.data.data);
                })
                .catch(() => {
                    toast.error("Server error, Please try again later");
                });
        } else {
            toast.error("Invalid access, Please login again");
        }
    }, []);

    //function to update company information in backend
    const updateCompanyInformation = async (data) => {
        await axios.post(`${API_URL}/user/updateCompanyInformation`, data)
            .then(response => {
                const data = response.data;
                toast.success(data.message);
                UpdateRounded();
            })
            .catch(error => {
                toast.error("server error, Please try again later")
            });
    }

    // function to update userdata
    const updateUserData = async () => {
        const token = Cookies.get("token");
        if (token) {
            axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
            await axios.get(`${API_URL}/user/getdata`)
                .then(response => {
                    setUserData(response.data.data);
                })
                .catch(() => {
                    toast.error("Server error, Please try again later");
                });
        } else {
            toast.error("Invalid access, Please login again");
        }
    }

    // fnction to update payment Info
    const updatePayment = async (data) => {
        await axios.post(`${API_URL}/user/updatePayment`, data)
            .then(response => {
                const data = response.data;
                toast.success(data.message);
            })
            .catch(error => {
                toast.error("server error, Please try again later")
            });
    }

    return (
        <HomeContext.Provider value={{ currentActiveButton, userData,updatePayment, updateUserData, updateCompanyInformation, setCurrentActiveButton }}>
            {props.children}
        </HomeContext.Provider>
    )
}

export default HomeState;