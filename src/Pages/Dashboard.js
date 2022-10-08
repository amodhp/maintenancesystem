import { Typography } from "@mui/material";
import axios from "axios";
import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import "../Components/Dashboard/Dashboard.css";
import DashboardTop from "../Components/Dashboard/DashboardTop";

const Dasboard = () => {
    const [ticketCount, setTicketCount] = React.useState(0);
    const [assetCount, setAssetCount] = React.useState(0);
    const [locationCount, setLocationCount] = React.useState(0);
    const [unAssignedTicketCount, setUnAssignedTicketCount] = React.useState(0);
    const [openTicketCount, setOpenTicketCount] = React.useState(0);
    const [ticketCountLoading, setTicketCountLoading] = React.useState(true);
    const [assetCountLoading, setAssetCountLoading] = React.useState(true);
    const [locationCountLoading, setLocationCountLoading] = React.useState(true);
    const [unAssignedTicketCountLoading, setUnAssignedTicketCountLoading] = React.useState(true);
    const [openTicketCountLoading, setOpenTicketCountLoading] = React.useState(true);


    const token = localStorage.getItem("token");
    const navigate = useNavigate();
    const accessToken = localStorage.getItem("token");

    // const fetchTickets = () => {
    //     setLoading(true);
    //     axios.get(`${process.env.REACT_APP_API}/admin/ticket`, {
    //         headers: {
    //             "access-token": accessToken
    //         }
    //     }).then(res => {
    //         setTickets(res.data.tickets);
    //         setLoading(false);
    //     }).catch(err => {
    //         setError(err.message);
    //         setLoading(false);
    //           if(err.response.status === 401) {
    //             localStorage.removeItem("token");
    //             window.location.href = "/login";
    //         }
    //     }
    //     );
    // }

        const fetchTicketCount = () => {
            axios.get(`${process.env.REACT_APP_API}/admin/ticket`, {
                headers: {
                    "access-token": accessToken
                }
            }).then(res => {
                setTicketCount(res.data.tickets.length);
                setTicketCountLoading(false);
            }).catch(err => {
                if(err.response.status === 401) {
                    localStorage.removeItem("token");
                    navigate("/login");
                }
            });
        }

        const fetchAssetCount = () => {
            axios.get(`${process.env.REACT_APP_API}/admin/assets`, {
                headers: {
                    "access-token": accessToken
                }
            }).then(res => {
                setAssetCount(res.data.length);
                setAssetCountLoading(false);
            }).catch(err => {
                if(err.response.status === 401) {
                    localStorage.removeItem("token");
                    navigate("/login");
                }
            });
        }

        const fetchLocationCount = () => {
            axios.get(`${process.env.REACT_APP_API}/admin/locations`, {
                headers: {
                    "access-token": accessToken
                }
            }).then(res => {
                setLocationCount(res.data.locations.length);
                setLocationCountLoading(false);
            }).catch(err => {
                if(err.response.status === 401) {
                    localStorage.removeItem("token");
                    navigate("/login");
                }
            });
        }

        const fetchOpenTicketCount = () => {
            axios.get(`${process.env.REACT_APP_API}/admin/ticket`, {
                headers: {
                    "access-token": accessToken
                }
            }).then(res => {
                setOpenTicketCount(res.data.tickets.filter(ticket => ticket.status === "open").length);
                setOpenTicketCountLoading(false);
            }).catch(err => {
                if(err.response.status === 401) {
                    localStorage.removeItem("token");
                    navigate("/login");
                }
            });
        }


        useEffect(() => {
            fetchTicketCount();
            fetchAssetCount();
            fetchLocationCount();
            fetchOpenTicketCount();
        }, []);



    return (
        <div>
        <Typography variant="h4" sx={{fontWeight: "600", marginBottom: "20px"}}>Dashboard</Typography>
        <DashboardTop ticketCount={ticketCount} assetCount={assetCount} locationCount={locationCount} openTicketCount={openTicketCount} ticketCountLoading={ticketCountLoading} assetCountLoading={assetCountLoading} locationCountLoading={locationCountLoading} openTicketCountLoading={openTicketCountLoading} />
        <Outlet/>
        </div>
    );
    }
export default Dasboard;