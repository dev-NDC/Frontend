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
    <div style={{margin: "0 auto", padding: "0 16px" }}>
      <Navbar />


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
                <Pricing />
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
                <SignUp />
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
      <Footer />
    </div>
  );
}

export default Home;
