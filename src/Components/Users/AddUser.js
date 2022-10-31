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
import { ThemeContext, ThemeProvider } from '@emotion/react';
import theme from '../../theme';
import axios from 'axios';

function AddUserBody(props) {
    const { onClose, open, fetchUsers, name, role, phone, email, setName, setRole, setPhone, setEmail, submit, username, setUsername } = props;
    
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
    const handleNameChange = (e) => {
        setName(e.target.value);
    }
    const handlePhoneChange = (e) => {
        setPhone(e.target.value);
    }
    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    }
    const handleUsernameChange = (e) => {
        setUsername(e.target.value);
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
                            <label>Username</label>
                        </TableCell>
                        <TableCell>
                            <OutlinedInput placeholder='Username' size="small" value={username} onChange={handleUsernameChange} />
                        </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>
                                <label>Name: </label>
                            </TableCell>
                            <TableCell>
                                <OutlinedInput placeholder="First Name" size="small" value={name} onChange={handleNameChange} />
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

                                <OutlinedInput placeholder="Phone" size="small"  value={phone} onChange={handlePhoneChange} />
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>

                                <label>Email: </label>
                            </TableCell>
                            <TableCell>

                                <OutlinedInput placeholder="Email" size="small" value={email} onChange={handleEmailChange} />
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>

        <div style={{textAlign: "center", paddingBottom:"20px", paddingTop:"10px"}}>
            <Button variant="contained" sx={{backgroundColor: "#189ab4", width:"80%"}} color="primary" onClick={submit}>
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
    const [open, setOpen] = useState(false);
    const [username, setUsername] = useState('');
    const [name, setName] = useState("");
    const [role, setRole] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    
    const accessToken = localStorage.getItem('token');

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = (value) => {
        setOpen(false);
    };
    
    const AddUserSubmit = () => {
        console.log("aass");
        axios({
            method: "post",
      
            url: `${process.env.REACT_APP_API}/admin/add_user`,
      
            data: {
              user_id: Math.floor(Math.random() * 1000000),
              username: username,
              password: "1234",
              first_name: name,
              middle_name: "",
              last_name: "",
              mobile_phone: phone,
              email_id: email,
              company_name: "selec",
              role: role,
              note: "",
              interfaces: "",
            },
            headers: {
              "access-token": `${accessToken}`,
            },
          })
            .then((res) => {
              console.log(res);
              setOpen(false);
                fetchUsers();
            })
            .catch((error) => {
              console.log(error);
            });
        }





    return (
        <div>
            <ThemeProvider theme={theme}>
                <button onClick={handleClickOpen} className="add-button">Add User</button>
            <AddUserBody
                open={open}
                onClose={handleClose}
                fetchUsers={fetchUsers}
                username={username}
                name={name}
                role={role}
                phone={phone}
                email={email}
                setUsername={setUsername}
                setName={setName}
                setRole={setRole}
                setPhone={setPhone}
                setEmail={setEmail}
                submit={AddUserSubmit}

            />
            </ThemeProvider>
        </div>
    );
}
