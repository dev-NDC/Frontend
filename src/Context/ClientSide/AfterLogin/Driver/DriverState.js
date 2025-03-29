import React from "react";
import DriverContext from "./DriverContext";
import axios from "axios";
import { toast } from "react-toastify";
const API_URL = "http://localhost:8000/api";


const DriverState = (props) => {
    const AddDriver = async(driver) => {
        await axios.post(`${API_URL}/user/addDriver`, driver)
            .then(response => {
                const data = response.data;
                console.log(data)
                toast.success(data.message);
            })
            .catch(error => {
                toast.error("server error, Please try again later")
            });
    }

    return (
        <DriverContext.Provider value={{ AddDriver }}>
            {props.children}
        </DriverContext.Provider>
    )
}

export default DriverState;