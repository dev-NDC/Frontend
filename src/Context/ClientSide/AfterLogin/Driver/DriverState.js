import React from "react";
import DriverContext from "./DriverContext";
import axios from "axios";
import { toast } from "react-toastify";
const API_URL = process.env.REACT_APP_API_URL;


const DriverState = (props) => {


    const AddDriver = async(driver) => {
        await axios.post(`${API_URL}/user/addDriver`, driver)
            .then(response => {
                const data = response.data;
                toast.success(data.message);
            })
            .catch(error => {
                toast.error("server error, Please try again later")
            });
    }

    const updateDriver = async(driver)=>{
        await axios.post(`${API_URL}/user/updateDriver`, driver)
            .then(response => {
                const data = response.data;
                toast.success(data.message);
            })
            .catch(error => {
                toast.error("server error, Please try again later")
            });
    }

    const deleteDriver = async(driver)=>{
        await axios.post(`${API_URL}/user/deleteDriver`, driver)
            .then(response => {
                const data = response.data;
                toast.success(data.message);
            })
            .catch(error => {
                toast.error("server error, Please try again later")
            });
    }

    return (
        <DriverContext.Provider value={{ AddDriver,deleteDriver,updateDriver }}>
            {props.children}
        </DriverContext.Provider>
    )
}

export default DriverState;