import { Edit } from "@mui/icons-material";
import { Button, CircularProgress, Paper, Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";
import React from "react";

const UsersTable = (props) => {
    const { users, loading } = props;
    
    return (
        <div style={{marginTop: "20px", borderRadius: "20px"}}>
        <Paper
        elevation={0}
        style={{ borderRadius: "20px"}}
      >
        <Table sx={{minWidth: "50vw"}}
        >
        <TableHead className="user-table-header"  style={{borderRadius: "20px"}}>
                <TableRow >
                    <TableCell sx={{fontSize: "1rem"}}><span className="user-table-header">Name</span></TableCell>
                    <TableCell sx={{fontSize: "1rem"}}><span className="user-table-header"> Role</span></TableCell>
                    <TableCell sx={{fontSize: "1rem"}}><span className="user-table-header">Phone Number</span></TableCell>
                    <TableCell sx={{fontSize: "1rem"}}><span className="user-table-header">Email</span></TableCell>
                    <TableCell sx={{fontSize: "1rem"}}><span className="user-table-header">Action</span></TableCell>
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