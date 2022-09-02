import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import PersonIcon from '@mui/icons-material/Person';
import AddIcon from '@mui/icons-material/Add';
import Typography from '@mui/material/Typography';
import { blue } from '@mui/material/colors';
import { Add } from '@mui/icons-material';
import { MenuItem, OutlinedInput, Select, Table, TableBody, TableCell, TableHead, TableRow, TextField } from '@mui/material';

function AddUserBody(props) {
    const { onClose, open, fetchUsers } = props;
    const [role, setRole] =  useState("");
    

    const handleClose = () => {
        // fetchUsers();
        onClose();
    }

    const handleListItemClick = (value) => {
        onClose(value);
    };

    const handleRoleChange = (e) => {
        setRole(e.target.value);
    }

    const preDefinedRoles = [
        {
            value: 'admin',
            label: 'Admin'
        },
        {
            value: 'department-head',
            label: 'Department Head'
        },
        {
            value: 'design',
            label: 'Design'
        },
        {
            value: 'management',
            label: 'Management'
        },
        {
            value: 'requestee',
            label: 'Requestee'
        },
        {
            value: 'technician-external',
            label: 'Technician External'
        },
        {
            value: 'technician-internal',
            label: 'Technician Internal'
        }
    ];

    return (
        <Dialog onClose={handleClose} open={open}>
            <form className="add-user-form">
                <Table>
                   <TableHead>
                        <TableRow>
                            <TableCell sx={{fontWeight: "600" , fontSize: "1.5rem"}} colSpan={2}>Add New User</TableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        <TableRow>
                            <TableCell>
                                <label>Name: </label>
                            </TableCell>
                            <TableCell>
                                <OutlinedInput placeholder="First Name" size="small" />
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>
                                <label>Role: </label>
                            </TableCell>
                            <TableCell>
                                <Select onChange={handleRoleChange} variant="outlined" size="small" value={role}  sx={{width:"100%"}} displayEmpty>
                                    <MenuItem value="">Choose Role</MenuItem>
                                    {preDefinedRoles.map(option => (
                                        <MenuItem key={option.value} value={option.value}>
                                            {option.label}
                                        </MenuItem>
                                    ))}

                                </Select>
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>
                                <label>Phone: </label>
                            </TableCell>
                            <TableCell>

                                <OutlinedInput placeholder="Phone" size="small" />
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>

                                <label>Email: </label>
                            </TableCell>
                            <TableCell>

                                <OutlinedInput placeholder="Email" size="small" />
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>

        <div style={{textAlign: "center", paddingBottom:"20px", paddingTop:"10px"}}>
            <Button variant="contained" sx={{backgroundColor: "#189ab4", width:"80%"}} color="primary" onClick={handleClose}>
                Add
            </Button>
        </div>



            </form>
        </Dialog>
    );
}

AddUserBody.propTypes = {
    onClose: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired,
};

export default function AddUser(props) {
    const { fetchUsers } = props;
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = (value) => {
        setOpen(false);
    };

    return (
        <div>
            <Button variant="contained" onClick={handleClickOpen} sx={{ backgroundColor: "#018aed", textAlign: "center", fontSize: "1rem", margin: "auto" }}><Add />Users</Button>
            <AddUserBody
                open={open}
                onClose={handleClose}
                fetchUsers={fetchUsers}
            />
        </div>
    );
}
