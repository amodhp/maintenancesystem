import { Button, Dialog, MenuItem, OutlinedInput, Select, Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";
import axios from "axios";

import React from "react";
import { useNavigate } from "react-router-dom";

const AddTicket = () => {
    const [open, setOpen] = React.useState(true);
    const accessToken = localStorage.getItem("token");
    // {
    //     "subject":"dummy ticket 2",
    //     "description":"this is a test message for dummy ticket 2"
    // }
    const [subject, setSubject] = React.useState("");
    const [description, setDescription] = React.useState("");
    const AddTicketSubmit = () => {
        //add ticket with accesstoken
        axios.post(`${process.env.REACT_APP_API}/admin/add_ticket`, {
            subject: subject,
            description: description
        }, {
            headers: {
                "access-token": accessToken
            }
        }).then(res => {
            console.log(res);
        }
        ).catch(err => {
            console.log(err);
        }
        );

    }


    const navigate = useNavigate();
    const backgroundClick = () => {
        navigate(-1);
    }

    return (
    <div className="add-ticket-background">
        <Dialog open={open} >
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
                        <TableRow>
                            <TableCell>
                                <Button variant="contained" sx={{width: "100%"}} onClick={AddTicketSubmit}>Add</Button>
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
export default AddTicket;
