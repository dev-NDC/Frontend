import React, { useState } from "react";
import axios from "axios";
import Cookies from 'js-cookie';
import { toast } from "react-toastify";
import { useNavigate } from "react-router";

import LoginContext from "./LoginContext";
const API_URL = process.env.REACT_APP_API_URL;

const LoginState = (props) => {
    let navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [rememberMe, setRememberMe] = useState(false);

    const loginSubmit = async () => {
        try {
            const data = {
                email, password
            };
            const response = await axios.post(`${API_URL}/loginAndSignUp/login`, data, {
                headers: {
                    "Content-Type": "application/json",
                },
            });
            let token = response.data.token;
            let role = response.data.role;
            Cookies.set('token', token, { expires: 30 });

            // Handle navigation based on roles
            if (rememberMe) {
                localStorage.setItem("rememberedEmail", email);
                localStorage.setItem("rememberedPassword", password);
            } else {
                localStorage.removeItem("rememberedEmail");
                localStorage.removeItem("rememberedPassword");
            }
            if (role.length === 1) {
                if (role.includes("admin") || role.includes("superAdmin")) {
                    navigate("/admin");
                    toast.success("Login successful! Welcome to Admin Dashboard");
                } else if (role.includes("agency")) {
                    navigate("/agency");
                    toast.success("Login successful! Welcome to Agency Dashboard");
                } else if (role.includes("user")) {
                    navigate("/portal");
                    toast.success("Login successful! Welcome to User Dashboard");
                }
            } else {
                if (role.includes("admin") || role.includes("superAdmin")) {
                    navigate("/admin");
                    toast.success("Login successful! Welcome to Admin Dashboard");
                } else if (role.includes("agency")) {
                    navigate("/agency");
                    toast.success("Login successful! Welcome to Agency Dashboard");
                } else {
                    navigate("/portal");
                    toast.success("Login successful! Welcome to User Dashboard");
                }
            }
        } catch (error) {
            if (error.message === "Network Error") {
                toast.error(error.message);
            } else {
                toast.error(error.response.data.message)
            }

        }
    }

    return (
        <LoginContext.Provider value={{ email, password,rememberMe, setRememberMe, loginSubmit, setPassword, setEmail }}>
            {props.children}
        </LoginContext.Provider>
    )
}

export default LoginState;