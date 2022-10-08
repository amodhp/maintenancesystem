import { Button, Dialog, MenuItem, OutlinedInput, Select, Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import './location.css';

const AddLocation = () => {
    const [open, setOpen] = React.useState(true);
    const [unit_or_building, setUnit_or_building] = React.useState("");
    // {
    //     "unit_or_building":"4",
    //     "subdivision":[
    //         {"floor":"Ground floor","rooms":[{"room":"001","assets":["dummy","Abc"]},{"room":"002"}]},
    //         {"floor":"First floor","rooms":[{"room":"101"},{"room":"102","assets":["dummy1","Abc1"]}]}
    //         ],
    //     "locality":"MIDC, Mahape, Navi Mumbai",
    //     "city":"Mumbai",
    //     "state":"Maharashtra",
    //     "pin_code":421204,
    //     "status":"Active"
    // }
    const [subdivision, setSubdivision] = React.useState([]);
    const [locality, setLocality] = React.useState("");
    const [city, setCity] = React.useState("");
    const [state, setState] = React.useState("");
    const [pin_code, setPin_code] = React.useState("");
    const [status, setStatus] = React.useState("");
    
    const handleSubmit = () => {
        const data = {
            "unit_or_building":unit_or_building,
            "subdivision":subdivision,
            "locality":locality,
            "city":city,
            "state":state,
            "pin_code":pin_code,
            "status":status
        }
        console.log(data);
    }





    const navigate = useNavigate();
    const backgroundClick = () => {
        navigate(-1);
    }

    return (
    <div >
       <Dialog open={open} >
            <form className="add-location-form" onSubmit={handleSubmit}>
                <Table>
                   <TableHead>
                        <TableRow>
                            <TableCell sx={{fontWeight: "600" , fontSize: "1.5rem"}}>Add Location</TableCell>
                            <TableCell align="right">
                                <Button onClick={backgroundClick} sx={{color: "red"}}>X</Button>
                            </TableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        <TableRow>
                            <TableCell>
                                <label>Unit/Bulilding: </label>
                            </TableCell>
                            <TableCell>
                                <OutlinedInput placeholder="Unit/Bulilding" size="small" value={unit_or_building} onChange={(e) => setUnit_or_building(e.target.value)} />
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>
                                <label>Subdivision: </label>
                            </TableCell>
                            <TableCell>
                                <OutlinedInput placeholder="Subdivision" size="small" value={subdivision} onChange={(e) => setSubdivision(e.target.value)} />
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>
                                <label>Locality: </label>
                            </TableCell>
                            <TableCell>
                                <OutlinedInput placeholder="Locality" size="small" value={locality} onChange={(e) => setLocality(e.target.value)} />
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>
                                <label>City: </label>
                            </TableCell>
                            <TableCell>
                                <OutlinedInput placeholder="City" size="small" value={city} onChange={(e) => setCity(e.target.value)} />
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>
                                <label>State: </label>
                            </TableCell>
                            <TableCell>
                                <OutlinedInput placeholder="State" size="small" value={state} onChange={(e) => setState(e.target.value)} />
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>
                                <label>Pin Code: </label>
                            </TableCell>
                            <TableCell>
                                <OutlinedInput placeholder="Pin Code" size="small" value={pin_code} onChange={(e) => setPin_code(e.target.value)} />
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>
                                <label>Status: </label>
                            </TableCell>
                            <TableCell>
                                <Select variant="outlined" size="small" sx={{width:"100%"}} displayEmpty value={status} onChange={(e) => setStatus(e.target.value)}>
                                    <MenuItem value="">Choose Status</MenuItem>
                                    <MenuItem value="Active">Active</MenuItem>
                                    <MenuItem value="Inactive">Inactive</MenuItem>
                                </Select>
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>
                                <Button variant="contained" sx={{width: "100%"}}>Add</Button>
                            </TableCell>
                            <TableCell>
                                <Button variant="contained" sx={{width: "100%"}}>Cancel</Button>
                            </TableCell>
                        </TableRow>

                    </TableBody>
                </Table>
            </form>
        </Dialog>
    </div>
);
    }
export default AddLocation;
