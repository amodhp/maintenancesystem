import React from "react";
import { useNavigate } from "react-router-dom";

const AddTicket = () => {
    const navigate = useNavigate();
    const backgroundClick = () => {
        navigate(-1);
    }

    return (
    <div className="add-ticket-background" onClick={backgroundClick}>
        <div className="add-ticket-box">
        </div>
    </div>
);
    }
export default AddTicket;
