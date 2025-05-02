import React, { useState,useContext } from "react";
import CreateNewOrderContext from "../../../../Context/ClientSide/AfterLogin/CreateNewOrder/CreateNewOrderContext";

function OrderInformation() {
    const { currentPosition, maxPosition, setCurrentPosition, setMaxPosition } = useContext(CreateNewOrderContext);
    const [companyLocation, setCompanyLocation] = useState("");
    const [packageOption, setPackageOption] = useState("");
    const [orderReason, setOrderReason] = useState("");

    const handleCompanyChange = (e) => {
        setCompanyLocation(e.target.value);
        setPackageOption("");
        setOrderReason("");
    };

    const handlePackageChange = (e) => {
        setPackageOption(e.target.value);
        setOrderReason("");
    };

    const handleReasonChange = (e) => {
        setOrderReason(e.target.value);
    };

    const handleSubmit = async () => {
        const data = {
            companyLocation,
            packageOption,
            orderReason,
        };
        console.log("Form Data:", data);
        if (currentPosition === maxPosition) {
            setMaxPosition(maxPosition + 1);
        }
        setCurrentPosition(currentPosition + 1);

    };

    return (
        <div style={{  width: "100%" }}>
            <h5 className="mb-4 fw-bold">Order Information</h5>

            <div className="mb-3">
                <label className="form-label">Company Location</label>
                <select
                    className="form-select"
                    value={companyLocation}
                    onChange={handleCompanyChange}
                >
                    <option value="" disabled>Select Company</option>
                    <option value="BITO LOGISTICS LLC">BITO LOGISTICS LLC</option>
                    <option value="XYZ TRANSPORT INC">XYZ TRANSPORT INC</option>
                </select>
            </div>

            <div className="mb-3">
                <label className="form-label">Package</label>
                <select
                    className="form-select"
                    value={packageOption}
                    onChange={handlePackageChange}
                    disabled={!companyLocation}
                >
                    <option value="" disabled>Select Package</option>
                    <option value="Package 1">Package 1</option>
                    <option value="Package 2">Package 2</option>
                </select>
            </div>

            <div className="mb-4">
                <label className="form-label">Order Reason</label>
                <select
                    className="form-select"
                    value={orderReason}
                    onChange={handleReasonChange}
                    disabled={!packageOption}
                >
                    <option value="" disabled>Select Reason</option>
                    <option value="Reason 1">Reason 1</option>
                    <option value="Reason 2">Reason 2</option>
                </select>
            </div>

            <div className="d-flex justify-content-end">
                <button
                    className="btn btn-primary"
                    onClick={handleSubmit}
                    disabled={!orderReason}
                >
                    Continue
                </button>
            </div>
        </div>
    );
}

export default OrderInformation;
