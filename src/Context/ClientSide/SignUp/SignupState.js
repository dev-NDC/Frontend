import { useState } from "react";
import axios from "axios";
import SignupContext from "./SignupContext"
import { toast } from "react-toastify";
import { useNavigate } from "react-router";
import handleApiError from "../../handleAPIError";

const SignupState = (props) => {
    let navigate = useNavigate();
    const [currentPosition, setCurrentPosition] = useState(1);
    const [maxPosition, setMaxPosition] = useState(1);

    const [selectedPlan, setSelectedPlan] = useState(1);

    const [contactInfoData, setContactInfoData] = useState({
        firstName: "",
        lastName: "",
        phone: "",
        email: "",
        password: "",
        confirmPassword: ""
    });

    const [companyInfoData, setCompanyInfoData] = useState({
        companyName: "",
        usdot: "",
        contactNumber: "",
        companyEmail: "",
        safetyAgencyName: "",
        employees: "",
        address: "",
        suite: "",
        city: "",
        state: "",
        zip: "",
    });

    const [paymentData, setPaymentData] = useState({
        creditCardNumber: "",
        cvv: "",
        expMonth: "",
        expYear: "",
        billingZip: "",
        accountNumber: "",
        routingNumber: "",
        accountName: "",
        accountType: "Saving",
    });

    const [submitFormData, setSubmitFormData] = useState({
        firstName: "",
        lastName: "",
        date: new Date().toISOString().split("T")[0], // Default to today's date
        signature: "",
        agree: false,
    });

    const submitFormFunction = async () => {
        try {
            const API_URL = process.env.REACT_APP_API_URL;
            const Membership = {
                selectedPlan : selectedPlan,
            }
            const fullData = {
                Membership,
                contactInfoData,
                companyInfoData,
                paymentData,
                submitFormData,
            };
            await axios.post(`${API_URL}/loginAndSignUp/signup`, fullData, {
                headers: {
                    "Content-Type": "application/json",
                },
            });
            toast.success("Account created successfully");
            navigate("/login")
        } catch (error) {
            handleApiError(error, "Failed to signup.");
        }
    }

    return (
        <SignupContext.Provider value={{ currentPosition, maxPosition, selectedPlan, contactInfoData, companyInfoData, paymentData, submitFormData, submitFormFunction, setSubmitFormData, setPaymentData, setCompanyInfoData, setContactInfoData, setSelectedPlan, setCurrentPosition, setMaxPosition }}>
            {props.children}
        </SignupContext.Provider>
    )
}

export default SignupState;