import { CircularProgress, Paper, Typography } from "@mui/material";
import { shadows } from '@mui/system';

import React from "react";

const DashboardTop = (props) => {
    const {ticketCount, assetCount, locationCount, openTicketCount, ticketCountLoading, assetCountLoading, locationCountLoading, openTicketCountLoading} = props;
    return (
        <div className="dashboard-top">
            <Paper className="dashboard-top-item">
                <Typography variant="h5" sx={{fontWeight: "600"}}>Total Tickets:</Typography>
                <Typography variant="h4" sx={{fontWeight: "600"}}>
                {ticketCountLoading ? <CircularProgress size="1.5rem" sx={{marginLeft: "10px"}} /> : ticketCount}
                </Typography>
            </Paper>
            <Paper className="dashboard-top-item">
                <Typography variant="h5" sx={{fontWeight: "600"}} >Total Assets:</Typography>
                <Typography variant="h4" sx={{fontWeight: "600"}}>
                {assetCountLoading ? <CircularProgress size="1.5rem" sx={{marginLeft: "10px"}} /> : assetCount}
                </Typography>
            </Paper>
            <Paper className="dashboard-top-item">
                <Typography variant="h5" sx={{fontWeight: "600"}} >Open Tickets:</Typography>
                <Typography variant="h4" sx={{fontWeight: "600"}}>
                {openTicketCountLoading ? <CircularProgress size="1.5rem" sx={{marginLeft: "10px"}} /> : openTicketCount}    
                </Typography>
            </Paper>
            <Paper className="dashboard-top-item">
                <Typography variant="h5" sx={{fontWeight: "600"}}>Total Locations:</Typography>
                <Typography variant="h4" sx={{fontWeight: "600"}}>
                {locationCountLoading ? <CircularProgress size="1.5rem" sx={{marginLeft: "10px"}} /> : locationCount}    
                </Typography>
            </Paper>
        </div>
    );
}
export default DashboardTop;