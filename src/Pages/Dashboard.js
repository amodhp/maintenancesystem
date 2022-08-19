import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Dasboard = () => {
    const token = localStorage.getItem("token");
    const navigate = useNavigate();

    return (
        <div>
        <h1>Dashboard</h1>
        </div>
    );
    }
export default Dasboard;