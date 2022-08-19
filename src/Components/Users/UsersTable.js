import { Table, TableCell, TableHead, TableRow } from "@mui/material";
import React from "react";

const UsersTable = (props) => {
    
    return (
        <div>
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


        </Table>
        </div>
    );
}
export default UsersTable;