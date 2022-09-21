import React from 'react';
import "./tickets.css";

const TicketBox = () => {
    return(
        <div className="ticket-box">
            <div className="ticket">
                <div className="ticket-header">
                    <p>Name</p>
                    <p>Asset</p>
                </div>
                <div className="ticket-body">
                    <p>John Doe</p>
                    <p>Asset 1</p>
                </div>

            </div>
        </div>
    )
}

export default TicketBox;