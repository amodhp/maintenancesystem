import { Paper, Typography } from "@mui/material";
import { shadows } from '@mui/system';

import React from "react";

const DashboardTop = () => {
    return (
        <div className="dashboard-top">
            <Paper className="dashboard-top-item" sx={{backgroundColor: "#cbff1f"}}>
                <Typography variant="h5" sx={{fontWeight: "600"}}>Total Request:</Typography>
                <Typography variant="h4" sx={{fontWeight: "600"}}>100</Typography>
            </Paper>
            <Paper className="dashboard-top-item" sx={{backgroundColor: "#4bf542"}}>
                <Typography variant="h5" sx={{fontWeight: "600"}} >Solved Assets:</Typography>
                <Typography variant="h4" sx={{fontWeight: "600"}}>100</Typography>
            </Paper>
            <Paper className="dashboard-top-item" sx={{backgroundColor: "#42bff5"}}>
                <Typography variant="h5" sx={{fontWeight: "600"}} >In Progress:</Typography>
                <Typography variant="h4" sx={{fontWeight: "600"}}>100</Typography>
            </Paper>
            <Paper className="dashboard-top-item" sx={{backgroundColor: "#ff6173"}}>
                <Typography variant="h5" sx={{fontWeight: "600"}}>Not Assigned:</Typography>
                <Typography variant="h4" sx={{fontWeight: "600"}}>100</Typography>
            </Paper>
        </div>
    );
}
export default DashboardTop;