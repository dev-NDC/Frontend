import React,{useState} from "react";
import CreateNewOrderContext from "./CreateNewOrderContext";

const CreateNewOrderState = (props) => {
    const [currentPosition, setCurrentPosition] = useState(1);
    const [maxPosition, setMaxPosition] = useState(1);
    
    return (
        <CreateNewOrderContext.Provider value={{ currentPosition, setCurrentPosition, maxPosition, setMaxPosition }}>
            {props.children}
        </CreateNewOrderContext.Provider>
    )
}

export default CreateNewOrderState;