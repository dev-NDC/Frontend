import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";

import Navbar from "./Navbar";
import Landing from "./Landing";
import Pricing from "./Pricing";
import Footer from "./Footer";
import About from "./About";
import Login from "./Login";
import SignUp from "./SignUp/Signup";
import ForgotPassword from "./ForgotPassword";
import ResetPassword from "./ResetPassword";
import Error404Page from "../../Error404Page";
import Privacy from "./Privacy";  
import TermsAndConditions from "./TermAndCondition"; 

import SignupState from "../../../Context/ClientSide/SignUp/SignupState";
import LoginState from "../../../Context/ClientSide/Login/LoginState";

const pageVariants = {
  initial: {
    opacity: 0,
    y: 30,
  },
  in: {
    opacity: 1,
    y: 0,
  },
  out: {
    opacity: 0,
    y: -30,
  },
};

const pageTransition = {
  type: "tween",
  ease: "anticipate",
  duration: 0.5,
};

const AnimatedPage = ({ children }) => (
  <motion.div
    initial="initial"
    animate="in"
    exit="out"
    variants={pageVariants}
    transition={pageTransition}
  >
    {children}
  </motion.div>
);

function Home() {
  const location = useLocation();

  return (
    <div style={{ maxWidth: "1000px", margin: "0 auto", padding: "0 16px" }}>
      {/* Animated Navbar */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Navbar />
      </motion.div>

      {/* Page Routes with Animation */}
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route
            path="/"
            element={
              <AnimatedPage>
                <Landing />
              </AnimatedPage>
            }
          />
          <Route
            path="/pricing"
            element={
              <AnimatedPage>
                <SignupState>
                  <Pricing />
                </SignupState>
              </AnimatedPage>
            }
          />
          <Route
            path="/about"
            element={
              <AnimatedPage>
                <About />
              </AnimatedPage>
            }
          />
          <Route
            path="/login"
            element={
              <AnimatedPage>
                <LoginState>
                  <Login />
                </LoginState>
              </AnimatedPage>
            }
          />
          <Route
            path="/signup"
            element={
              <AnimatedPage>
                <SignupState>
                  <SignUp />
                </SignupState>
              </AnimatedPage>
            }
          />
          <Route
            path="/forgotPassword"
            element={
              <AnimatedPage>
                <ForgotPassword />
              </AnimatedPage>
            }
          />
          <Route
            path="/resetPassword"
            element={
              <AnimatedPage>
                <ResetPassword />
              </AnimatedPage>
            }
          />
          <Route
            path="/privacy"
            element={
              <AnimatedPage>
                <Privacy />
              </AnimatedPage>
            }
          />
          <Route
            path="/termsAndConditions" 
            element={
              <AnimatedPage>
                <TermsAndConditions />
              </AnimatedPage>
            }
          />
          <Route
            path="*"
            element={
              <AnimatedPage>
                <Error404Page />
              </AnimatedPage>
            }
          />
        </Routes>
      </AnimatePresence>

      {/* Animated Footer */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.6 }}
      >
        <Footer />
      </motion.div>
    </div>
  );
}

export default Home;
