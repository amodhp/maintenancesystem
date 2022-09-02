import { Typography } from "@mui/material";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../Components/Dashboard/Dashboard.css";
import DashboardTop from "../Components/Dashboard/DashboardTop";

const Dasboard = () => {
    const token = localStorage.getItem("token");
    const navigate = useNavigate();

    return (
        <div>
        <Typography variant="h4" sx={{fontWeight: "600", marginBottom: "20px"}}>Dashboard</Typography>
        <DashboardTop />
        </div>
    );
    }
export default Dasboard;