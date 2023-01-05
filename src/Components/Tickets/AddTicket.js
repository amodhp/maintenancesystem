



import { Button, Dialog, InputLabel, MenuItem, OutlinedInput, Select, Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";
import axios from "axios";

import React from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AddTicket = () => {
    const [open, setOpen] = React.useState(true);
    const [message, setMessage] = React.useState("");
    const [alert, setAlert] = React.useState(false);
    const accessToken = localStorage.getItem("token");
    // "subject":"DUMMY TICKET 4",
    // "description":"this is a test message for dummy ticket 4",
    // "asset_name": "62fe95009891c8f9d0a69628",
    // "location": {"unit_building":"2","floor":"first floor","room":"102"}
    const [subject, setSubject] = React.useState("");
    const [description, setDescription] = React.useState("");
    const [asset_name, setAsset_name] = React.useState("");
    const [locations, setLocations] = React.useState("");
    const [unitOrBuilding, setUnitOrBuilding] = React.useState("");
    const [floor, setFloor] = React.useState("");
    const [room, setRoom] = React.useState("");
    const [assetInRoom, setAssetInRoom] = React.useState([]);
    const AddTicketSubmit = (e) => {
        e.preventDefault();
        const data = {
            subject: subject,
            description: description,
            asset_name: asset_name,
            location: {
                unit_building: unitOrBuilding,
                floor: floor,
                room: room
            }
        }
        console.log(data);
        
        axios.post(`${process.env.REACT_APP_API}/admin/add_ticket`, data, {
            headers: {
                "access-token": accessToken
            }
        }).then(res => {
            setMessage(res.data.msg);
            setAlert(true);
            console.log(res);
            setTimeout(() => {
                setAlert(false);
            }, 3000);
            setTimeout(() => {
                navigate("/tickets");
            }, 3000);

        }
        ).catch(err => {
            setMessage(err.response.data.msg);
            setAlert(true);
            setTimeout(() => {
                setAlert(false);
            }, 3000);
            console.log(err);
        }
        );


    }

    const fetchLocations = () => {
        axios.get(`${process.env.REACT_APP_API}/admin/locations`, {
            headers: {
                "access-token": accessToken
            }
        }).then(res => {
            setLocations(res.data.locations);
        }
        ).catch(err => {
            console.log(err);
        }
        );
    }
    useEffect(() => {
        fetchLocations();
    }, []);



    const navigate = useNavigate();
    const backgroundClick = () => {
        navigate(-1);
    }
    const handleCancel = () => {
        setOpen(false);
        navigate(-1);
    }
  
    const handleRoom = (event) => {
        setRoom(event.target.value);
        setAssetInRoom([]);
        locations.map(location => {
            if (location.unit_or_building === unitOrBuilding) {
                location.subdivision.map(subdivision => {
                    if (subdivision.floor === floor) {
                        subdivision.rooms.map(room => {
                            if (room.room === event.target.value) {
                                setAssetInRoom(room.assets);
                            }
                        })
                    }
                })
            }
        })
    }


    return (
    <div className="add-ticket-background">
         
        <Dialog open={open} >
        {alert && <div className="add-ticket-alert">{message}</div>}
            <form className="add-ticket-form">
                <Table>
                   <TableHead>
                        <TableRow>
                            <TableCell sx={{fontWeight: "600" , fontSize: "1.5rem"}}>Add Ticket</TableCell>
                            <TableCell align="right">
                                <Button onClick={backgroundClick} sx={{color: "red"}}>X</Button>
                            </TableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        <TableRow>
                            <TableCell>Subject</TableCell>
                            <TableCell>
                                <OutlinedInput
                                    id="subject"
                                    value={subject}
                                    onChange={(e) => setSubject(e.target.value)}
                                    placeholder="Subject"
                                    size="small"
                                />
                            </TableCell>
                        </TableRow>
                        <TableRow
                            sx={{
                                "&:last-child td, &:last-child th": { border: 0 },
                            }}
                        >
                            <TableCell>Description</TableCell>
                            <TableCell>
                                <OutlinedInput
                                    id="description"
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    placeholder="Description"
                                    size="small"
                                />
                            </TableCell>
                        </TableRow>
                        <TableRow
                            sx={{
                                "&:last-child td, &:last-child th": { border: 0 },
                            }}
                        >
                            <TableCell>Location</TableCell>
                            <TableCell>
                               <Select 
                                    id="unit_building"
                                    value={unitOrBuilding}
                                    onChange={(e) => setUnitOrBuilding(e.target.value)}

                                    placeholder="Unit Building"
                                    size="small"
                                    sx={{width: "100px"}}
                                >
                                 {!locations && <MenuItem value="">Loading...</MenuItem>}
                                    {locations &&  locations.map((location) => (
                                        <MenuItem value={location.unit_or_building} key={location._id} >{location.unit_or_building}</MenuItem>
                                    ))}

                                    </Select>
                                <Select
                                    value={floor}
                                    onChange={(e) => setFloor(e.target.value)}
                                    size="small"
                                    sx={{width: "100px", marginLeft: "10px"}}
                                > 
                                   {!unitOrBuilding && <MenuItem value="">Loading</MenuItem>}
                                    {
                                       unitOrBuilding && locations.filter((location) => location.unit_or_building === unitOrBuilding)[0].subdivision.map((subdivision) => (
                                            <MenuItem 
                                            key={subdivision.floor}
                                            value={subdivision.floor}>{subdivision.floor}</MenuItem>
                                        ))

                                    }

                                </Select>
                                <Select
                                    value={room}
                                    onChange={handleRoom}
                                    placeholder="Room"
                                    size="small"
                                    sx={{width: "100px", marginLeft: "10px"}}

                                >
                                   {!floor && <MenuItem value="">Loading</MenuItem>}
                                    {
                                        floor && locations.filter((location) => location.unit_or_building === unitOrBuilding)[0].subdivision.filter((subdivision) => subdivision.floor === floor)[0].rooms.map((room) => (
                                            <MenuItem
                                                key={room.room}
                                                value={room.room}>{room.room}</MenuItem>
                                        ))
                                    
                                    }
                                        
                                </Select>

                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>Asset Name</TableCell>
                            <TableCell>
                            <Select
                                    value={asset_name}
                                    onChange={(e) => setAsset_name(e.target.value)}
                                    placeholder="Asset Name"
                                    size="small"
                                    sx={{width: "100px"}}
                                >
                                    {assetInRoom.length === 0 && <MenuItem value="">No Assets</MenuItem>}
                                    {assetInRoom && assetInRoom.map((asset) => (
                                        <MenuItem value={asset._id} key={asset._id}>{asset.asset_name}</MenuItem>
                                    ))}

                                </Select>

                            </TableCell>
                        </TableRow>
                        
                        <TableRow>
                            
                            <TableCell>
                                <Button variant="contained" sx={{width: "100%"}} onClick={handleCancel}>Cancel</Button>
                            </TableCell>
                            <TableCell>
                                <Button variant="contained" sx={{width: "100%"}} onClick={AddTicketSubmit}>Add</Button>
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </form>
        </Dialog>
    </div>
);
    }
export default AddTicket;
