import React, { useState, useEffect} from "react";
import AdminContext from "./AdminContext";
import axios from "axios";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
const API_URL = "http://localhost:8000/api";

const AdminState = (props) => {
    const Name = "Ved Prakash";
    const [currentActiveButton, setCurrentActiveButton] = useState(1);
    const [AllUserData,setAllUserData] = useState([]);
    
    useEffect(() => {
        const token = Cookies.get("token");
        if (token) {
            axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
            axios.get(`${API_URL}/admin/getAllUserData`)
                .then(response => {
                    setAllUserData(response.data.data);
                })
                .catch(() => {
                    toast.error("Server error, Please try again later");
                });
        } else {
            toast.error("Invalid access, Please login again");
        }
    }, []);
    return (
        <AdminContext.Provider value={{Name,currentActiveButton,AllUserData,setCurrentActiveButton}}>
            {props.children}
        </AdminContext.Provider>
    )
}

export default AdminState;