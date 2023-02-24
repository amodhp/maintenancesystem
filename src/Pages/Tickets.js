import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import TicketBox from '../Components/Tickets/TicketBox';


const Tickets = () => {
    const [tickets, setTickets] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const accessToken = localStorage.getItem("token");
    
    const fetchTickets = () => {
        setLoading(true);
        console.log(accessToken)
        axios.get(`${process.env.REACT_APP_API}/admin/ticket`,  {
            headers: {
                "access-token": accessToken
            }
        }).then(res => {
            setTickets(res.data.tickets);
            console.log("Inside tickets function",tickets)
            setLoading(false);
        }).catch(err => {
            setError(err.message);
            setLoading(false);
        }
        );
    }
  useEffect(() => {
    fetchTickets();
    }, []);

    return (
        <div className="ticket">
            <TicketBox tickets={tickets} loading={loading}/>
            <Outlet/>
        </div>
    );
}
export default Tickets;