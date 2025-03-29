import React,{useContext} from 'react';
import CheckIcon from '@mui/icons-material/Check';
import { useNavigate } from "react-router-dom";

import SignupContext from '../../../Context/ClientSide/SignUp/SignupContext';

export default function Pricing() {
    const {setSelectedPlan} = useContext(SignupContext)
    const navigate = useNavigate();
    const handlePlan1 = ()=>{
        setSelectedPlan(1);
        navigate("/signup")
    }
    const handlePlan2 = ()=>{
        setSelectedPlan(2);
        navigate("/signup")
    }
    const handlePlan3 = ()=>{
        setSelectedPlan(3);
        navigate("/signup")
    }
    return (
        <>
            <div style={{ marginTop: '90px' }}>
                <div className='container' style={{ paddingTop: '30px' }}>
                    <p className='text-center'>PRICING</p>
                    <p className='text-center' style={{ fontSize: '32px', fontWeight: '700', marginBottom: '0px' }} >DRUG TESTING PLANS</p>
                    <p className='text-center'>Pay by the month or the year, and cancel at any time.</p>
                    <div className='row d-flex align-items-stretch' style={{ marginTop: '60px' }}>
                        {/* First Plan */}
                        <div className='col-md-4 d-flex' style={{marginTop:'15px'}}>
                            <div className="card flex-fill" style={{ backgroundColor: "rgb(202, 197, 197)" }}>
                                <div className="card-body d-flex flex-column">
                                    <div className='text-center'>
                                        <p style={{ fontSize: '44px', fontWeight: '900' }}>NON-DOT Account</p>
                                        <p>$99</p>
                                        <p>Every Year</p>
                                        <p>Occupation Health Service Plan</p>
                                        <hr style={{ color: "white", height: '2px' }} />
                                    </div>
                                    <div className="flex-grow-1">
                                        <p><CheckIcon style={{ marginRight: '7px' }} />Drug Account Only</p>
                                        <p><CheckIcon style={{ marginRight: '7px' }} />$75 Per Drug Test</p>
                                        <p><CheckIcon style={{ marginRight: '7px' }} />$65 Per Alcohol Test</p>
                                        <p><CheckIcon style={{ marginRight: '7px' }} />Online 24/7 Access</p>
                                        <p><CheckIcon style={{ marginRight: '7px' }} />Access to 20,000 labs Nationwide</p>
                                    </div>
                                    <button
                                        type="button"
                                        className="btn custom-btn mt-auto"
                                        onClick={handlePlan1}>
                                        Select Plan
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Second Plan */}
                        <div className='col-md-4 d-flex' style={{marginTop:'15px'}}>
                            <div className="card flex-fill" style={{ backgroundColor: "rgb(212, 225, 226)" }}>
                                <div className="card-body d-flex flex-column">
                                    <div className='text-center'>
                                        <p style={{ fontSize: '44px', fontWeight: '900' }}>1 Year Random Enrollment</p>
                                        <p>$150</p>
                                        <p>Every Year</p>
                                        <p>DOT Random Drug & Alcohol Testing Program</p>
                                        <hr style={{ color: "white", height: '2px' }} />
                                    </div>
                                    <div className="flex-grow-1">
                                        <p><CheckIcon style={{ marginRight: '7px' }} />DOT Random Enrollment</p>
                                        <p><CheckIcon style={{ marginRight: '7px' }} />Random Enrollment Certificate</p>
                                        <p><CheckIcon style={{ marginRight: '7px' }} />Access to 50,000 + Labs Nationwide</p>
                                        <p><CheckIcon style={{ marginRight: '7px' }} />DOT Drug Test $79</p>
                                        <p><CheckIcon style={{ marginRight: '7px' }} />Alcohol Test $65</p>
                                        <p><CheckIcon style={{ marginRight: '7px' }} />Dedicated Account Manager</p>
                                        <p><CheckIcon style={{ marginRight: '7px' }} />DOT Safety Audit Support</p>
                                        <p><CheckIcon style={{ marginRight: '7px' }} />24/7 Online Access</p>
                                    </div>
                                    <button type="button" className="btn custom-btn mt-auto" onClick={handlePlan2}>
                                        Select Plan
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Third Plan */}
                        <div className='col-md-4 d-flex' style={{marginTop:'15px'}}>
                            <div className="card flex-fill" style={{ backgroundColor: "rgb(238, 221, 188)" }}>
                                <div className="card-body d-flex flex-column">
                                    <div className='text-center'>
                                        <p style={{ fontSize: '44px', fontWeight: '900' }}>3 Year Random Enrollment</p>
                                        <p>$275</p>
                                        <p>Every Year</p>
                                        <p>Perfect for Trucking Companies</p>
                                        <hr style={{ color: "white", height: '2px' }} />
                                    </div>
                                    <div className="flex-grow-1">
                                        <p><CheckIcon style={{ marginRight: '7px' }} />DOT Random Enrollment</p>
                                        <p><CheckIcon style={{ marginRight: '7px' }} />Instant Random Enrollment Certificate</p>
                                        <p><CheckIcon style={{ marginRight: '7px' }} />Access to 50,000+ Labs Nationwide</p>
                                        <p><CheckIcon style={{ marginRight: '7px' }} />Drug Test $75</p>
                                        <p><CheckIcon style={{ marginRight: '7px' }} />Alcohol Test $65</p>
                                        <p><CheckIcon style={{ marginRight: '7px' }} />Dedicated Account Manager</p>
                                        <p><CheckIcon style={{ marginRight: '7px' }} />Audit Support</p>
                                        <p><CheckIcon style={{ marginRight: '7px' }} />Unlimited Drivers/Employees</p>
                                        <p><CheckIcon style={{ marginRight: '7px' }} />One-Time Setup - No renewal cost</p>
                                    </div>
                                    <button type="button" className="btn custom-btn mt-auto" onClick={handlePlan3}>
                                        Select Plan
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <style>
                {`
                    .custom-btn {
                        width: 100%;
                        background-color: white;
                        color: #007bff;
                        border: 2px solid #007bff;
                        transition: background-color 0.3s, color 0.3s;
                    }

                    .custom-btn:hover {
                        background-color: #007bff;
                        color: white;
                    }

                    /* Ensure all cards have equal height */
                    .card {
                        display: flex;
                        flex-direction: column;
                        height: 100%;
                    }

                    .card-body {
                        display: flex;
                        flex-direction: column;
                        height: 100%;
                    }

                    .flex-grow-1 {
                        flex-grow: 1;
                    }
                    p{
                        font-size: 16px;
                    }
                `}
            </style>
        </>
    );
}
