import React from "react";

import AddDriver from "./AddDriver";
import ActiveDriver from "./ActiveDriver";
import DeletedDriver from "./DeletedDriver";

function Driver() {
    return (
        <>
            <div className="container" style={{ marginTop: '100px' }}>
                <h2 style={{color:"#003366"}}>Drivers Information</h2>
                <p style={{fontSize:'28px', fontWeight:500,marginBottom:'0px'}}>Active Driver</p>
                <ActiveDriver/>
                <p style={{fontSize:'28px', fontWeight:500,marginBottom:'0px', marginTop:'30px'}}>Deleted Driver</p>
                <DeletedDriver/>
            </div>
        </>
    )
}

export default Driver;