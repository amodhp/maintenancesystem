import React from "react";

const TicketHeader = (props) => {
    return (
        <div className="ticket-header" style={{backgroundColor: "#fff", height:"250px", width: "80vw", position: "fixed", zIndex: "200"}}>
            <div className="ticket-header-left">
                <h1 className="ticket-header-title">Tickets</h1>
                <p className="ticket-header-subtitle">All Tickets</p>
            </div>
            <div className="ticket-header-right">
                <button className="ticket-header-button">Create Ticket</button>
            </div>
        </div>
    );
}

export default TicketHeader;
