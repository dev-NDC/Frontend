import React from "react";
import { Routes, Route } from "react-router-dom";


import Navbar from "./Navbar";
import Landing from "./Landing";
import Pricing from "./Pricing";
import Footer from "./Footer";
import About from "./About";
import Login from "./Login";
import SignUp from "./SignUp/Signup";
import ForgotPassword from "./ForgotPassword";
import ResetPassword from "./ResetPassword";


import SignupState from "../../../Context/ClientSide/SignUp/SignupState"
import LoginState from "../../../Context/ClientSide/Login/LoginState";


function Home() {
    return (
        <div>
            <Navbar />
            <Routes>
                <Route path="/" element={<Landing />} />
                <Route path="/Pricing" element={<SignupState><Pricing/></SignupState>} />
                <Route path="/about" element={<About />} />
                <Route path="/login" element={ <LoginState><Login /></LoginState>} />
                <Route path="/signup" element={<SignupState><SignUp /></SignupState>} />
                <Route path="/forgotPassword" element={<ForgotPassword />} />
                <Route path="/resetPassword" element={<ResetPassword />} />
            </Routes>
            <Footer />
        </div>
    );
}

export default Home;