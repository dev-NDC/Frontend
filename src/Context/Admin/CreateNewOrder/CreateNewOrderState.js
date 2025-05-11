import React, { useState } from "react";
import CreateNewOrderContext from "./CreateNewOrderContext";
import axios from "axios";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
const API_URL = process.env.REACT_APP_API_URL;

const CreateNewOrderState = (props) => {
    const [currentPosition, setCurrentPosition] = useState(1);
    const [maxPosition, setMaxPosition] = useState(1);

    const [allCompanyData, setAllCompanyData] = useState([]);
    const [companyId, setCompanyId] = useState("");
    const [packageId, setPackageId] = useState("");
    const [orderReasonId, setOrderReasonId] = useState("");

    const [formData, setFormData] = useState({
        firstName: "",
        middleName: "",
        lastName: "",
        ssn: "",
        dob: "",
        phone1: "",
        phone2: "",
        locationCode: "",
        orderExpires: "",
        observed: "1",
        participantAddress: true,
        address: "",
        address2: "",
        city: "",
        state: "",
        zip: "",
    });

    const [siteInformation, setSiteInformation] = useState([]);
    const [siteInformationLoading, setSiteInformationLoading] = useState(false);

    const getSiteInformation = async () => {
        const token = Cookies.get("token");
        setSiteInformationLoading(true);
        if (token) {
            axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
            await axios.post(`${API_URL}/admin/getSiteInformation`, { companyId, packageId, orderReasonId, formData })
                .then(response => {
                    setSiteInformation(response.data.data);
                    setSiteInformationLoading(false);
                    console.log(response.data.data)
                })
                .catch((error) => {
                    console.error("Error fetching user details:", error);
                });
        } else {
            toast.error("Invalid access, Please login again");
        }
    }

    return (
        <CreateNewOrderContext.Provider value={{ orderReasonId, packageId, companyId, allCompanyData, currentPosition, maxPosition, formData, siteInformation,siteInformationLoading, setSiteInformation, getSiteInformation, setFormData, setAllCompanyData, setCurrentPosition, setCompanyId, setPackageId, setOrderReasonId, setMaxPosition }}>
            {props.children}
        </CreateNewOrderContext.Provider>
    )
}

export default CreateNewOrderState;