import { Edit } from "@mui/icons-material";
import { Button, CircularProgress, Paper, Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";
import React from "react";

const UsersTable = (props) => {
    const { users, loading } = props;
    
    return (
        <div style={{marginTop: "20px", borderRadius: "20px"}}>
        <Paper
        elevation={4}
        style={{ borderRadius: "20px"}}
      >
        <Table sx={{minWidth: "50vw"}}
        >
        <TableHead className="user-table-header"  style={{borderRadius: "20px"}}>
                <TableRow >
                    <TableCell sx={{fontSize: "1rem"}}>Name</TableCell>
                    <TableCell sx={{fontSize: "1rem"}}>Role</TableCell>
                    <TableCell sx={{fontSize: "1rem"}}>Phone Number</TableCell>
                    <TableCell sx={{fontSize: "1rem"}}>Email</TableCell>
                    <TableCell sx={{fontSize: "1rem"}}>Action</TableCell>
                </TableRow>
            </TableHead>
            <TableBody className="user-table-body">
                {loading ? (
                    <TableRow>
                        <TableCell colSpan={5} sx={{textAlign:"center"}}>
                            <CircularProgress />
                        </TableCell>
                    </TableRow>
                    ): (
                    
                    users.map(user => (
                        <TableRow key={user._id}>
                            <TableCell>{user.first_name}</TableCell>
                            <TableCell>{user.role.name}</TableCell>
                            <TableCell>{user.mobile_phone}</TableCell>
                            <TableCell>{user.email_id}</TableCell>
                            <TableCell><Button><Edit style={{color: "black"}}/></Button></TableCell>
                        </TableRow>
                    ))
               )
                }
            </TableBody>


        </Table>
        </Paper>
        </div>
    );
}
export default UsersTable;