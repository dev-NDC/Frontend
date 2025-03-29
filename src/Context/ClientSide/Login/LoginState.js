import React, { useState } from "react";
import axios from "axios";
import Cookies from 'js-cookie';
import { toast } from "react-toastify";
import { useNavigate } from "react-router";

import LoginContext from "./LoginContext";
const API_URL = "http://localhost:8000/api";

const LoginState = (props) => {
    let navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const loginSubmit = async () => {
        try {
            const data = {
                email,password
            };
            const response = await axios.post(`${API_URL}/loginAndSignUp/login`, data, {
                headers: {
                    "Content-Type": "application/json", // Use "multipart/form-data" if uploading files
                },
            });
            let token = response.data.token;
            Cookies.set('token', token, { expires: 7 });
            toast.success("Login successful!");
            navigate("/portal")
        } catch (error) {
            if(error.message === "Network Error"){
                toast.error(error.message);
            }else{
                toast.error(error.response.data.message)
            }
            
        }
    }

    return (
        <LoginContext.Provider value={{ email, password, loginSubmit, setPassword, setEmail }}>
            {props.children}
        </LoginContext.Provider>
    )
}

export default LoginState;