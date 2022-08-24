import { CircularProgress, Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";
import React from "react";

const UsersTable = (props) => {
    const { users, loading } = props;
    console.log(users);
    
    return (
        <div style={{width: "80vw"}}>
        <Table>
            <TableHead>
                <TableRow>
                    <TableCell>Name</TableCell>
                    <TableCell>Role</TableCell>
                    <TableCell>Phone Number</TableCell>
                    <TableCell>Email</TableCell>
                    <TableCell>Action</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {loading ? (
                    <TableRow>
                        <TableCell colSpan={5}>
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
                            <TableCell>aa</TableCell>
                        </TableRow>
                    ))
               )
                }
            </TableBody>


        </Table>
        </div>
    );
}
export default UsersTable;