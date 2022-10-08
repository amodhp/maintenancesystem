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

function AddAssetBody(props) {
    const { onClose, open, fetchUsers } = props;
    // {
    //     "asset_name":"Cooler",
    //     "location":"Area 2",
    //     "asset_category":"Hardware",
    //     "asset_component_list":["filter","blinders"]
    
    // }
    const [asset_name, setAssetName] = useState("");
    const [location, setLocation] = useState("");
    const [asset_category, setAssetCategory] = useState("");
    const [asset_component_list, setAssetComponentList] = useState("");
    const [asset_component_list_array, setAssetComponentListArray] = useState([]);
    const [asset_component_list_string, setAssetComponentListString] = useState("");

    

    const handleClose = () => {
        onClose();
    }

    const handleListItemClick = (value) => {
        onClose(value);
    };

    
    return (
        <Dialog onClose={handleClose} open={open}>
            <form className="add-user-form">
                <Table>
                   <TableHead>
                        <TableRow>
                            <TableCell sx={{fontWeight: "600" , fontSize: "1.5rem"}} colSpan={2}>Add New Asset</TableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {/* <TableRow>
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
                        </TableRow> */}
                        <TableRow>
                            <TableCell>
                                <label>Asset Name: </label>
                            </TableCell>
                            <TableCell>
                                <OutlinedInput placeholder="Asset Name" size="small" onChange={(e) => setAssetName(e.target.value)} />
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>
                                <label>Location: </label>
                            </TableCell>
                            <TableCell>
                                <OutlinedInput placeholder="Location" size="small" onChange={(e) => setLocation(e.target.value)} />
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>
                                <label>Asset Category: </label>
                            </TableCell>
                            <TableCell>
                                <OutlinedInput placeholder="Asset Category" size="small" onChange={(e) => setAssetCategory(e.target.value)} />
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>
                                <label>Asset Component List: </label>
                            </TableCell>
                            <TableCell>
                                <OutlinedInput placeholder="Asset Component List" size="small" onChange={(e) => setAssetComponentList(e.target.value)} />
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>
                                <label>Asset Component List Array: </label>
                            </TableCell>
                            <TableCell>
                                <OutlinedInput placeholder="Asset Component List Array" size="small" onChange={(e) => setAssetComponentListArray(e.target.value)} />
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>
                                <label>Asset Component List String: </label>
                            </TableCell>
                            <TableCell>
                                <OutlinedInput placeholder="Asset Component List String" size="small" onChange={(e) => setAssetComponentListString(e.target.value)} />
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell colSpan={2}>
                                <Button variant="contained">Add Asset</Button>
                            </TableCell>
                        </TableRow>

                    </TableBody>
                </Table>

        {/* <div style={{textAlign: "center", paddingBottom:"20px", paddingTop:"10px"}}>
            <Button variant="contained" sx={{backgroundColor: "#189ab4", width:"80%"}} color="primary" onClick={handleClose}>
                Add
            </Button>
        </div> */}



            </form>
        </Dialog>
    );
}

AddAssetBody.propTypes = {
    onClose: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired,
};

export default function AddAsset(props) {
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
            <button onClick={handleClickOpen} className="add-button">
                Add Asset
            </button>
            <AddAssetBody
                open={open}
                onClose={handleClose}
                fetchUsers={fetchUsers}
            />
        </div>
    );
}
