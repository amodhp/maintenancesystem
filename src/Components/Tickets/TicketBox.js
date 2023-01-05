import { Search } from '@mui/icons-material';
import { CircularProgress, IconButton, InputAdornment, List, ListItem, ListItemText, TextField } from '@mui/material';
import axios from 'axios';
import React, { useState } from 'react';
import { Outlet, useNavigate, useParams } from 'react-router-dom';
import TicketDetails from './TicketDetails';
import "./tickets.css";

const TicketBox = (props) => {
    const { tickets, loading } = props;
    const [details, setDetails] = useState({});
    const [error, setError] = useState(null);
    const [ticket, setTicket] = useState({});
    const accessToken = localStorage.getItem("token");
    const params = useParams();
    const navigate = useNavigate();
    
    return (
        <div className="ticket-box">
            <div className='ticket-list'>
                <div className='ticket-search'>
                    <TextField variant="outlined"
                        sx={{ backgroundColor: "white", borderRadius: "10px", border: "none", width: "100%" }}
                        size="small"
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton>
                                        <Search />
                                    </IconButton>
                                </InputAdornment>
                            )
                        }}
                    />
                </div>
                {loading ? (
                    <div className="ticket-loading">
                        <CircularProgress />
                        <p>Loading...</p>
                    </div>
                ) : (
                    <div className='ticket-list-container'>
                        <List>
                            {tickets.map((ticket) => (
                                
                                <ListItem key={ticket._id} button onClick={() => navigate(`/tickets/${ticket._id}`)} className="ticket-list-item">
                                    <ListItemText primary={ticket.subject} secondary={ticket.subject} />
                                </ListItem>
                            ))}
                        </List>
                    </div>
                )
                }

            </div>
            <div className="ticket-details">
                <TicketDetails />
            </div>
            
        </div>
    )
}

export default TicketBox;