import { CircularProgress } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";



const TicketDetails = (props) => {
    
    const [ticket, setTicket] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const params = useParams();
    
    const accessToken = localStorage.getItem("token");

    const getTicket = () => {
        axios.get(`${process.env.REACT_APP_API}/admin/ticket/${params.id}`, {
            headers: {
                "access-token": `${accessToken}`,
            }
        })
            .then((res) => {
                console.log(res);
                setTicket(res.data);
                setLoading(false);
            })
            .catch((error) => {
                console.log(error);
                setError(error);
                setLoading(false);
            })
    }

    useEffect(() => {
        getTicket();
    }, [])
    

    
    

    return (
        <div >
              aaaaaaa
              ccgchg
              jkjvjhvhv
              jjgjhjhjhjh
              kjjjj
        </div>
    )
}


export default TicketDetails;