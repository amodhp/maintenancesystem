import { Search } from "@mui/icons-material";
import {
  CircularProgress,
  IconButton,
  InputAdornment,
  Paper,
  Button,
  List,
  ListItem,
  ListItemText,
  TextField,
  Skeleton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Avatar,
} from "@mui/material";
import { deepOrange } from "@mui/material/colors";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { Outlet, useNavigate, useParams } from "react-router-dom";
import TicketDetails from "./TicketDetails";
import "./tickets.css";

const TicketBox = (props) => {
  const { tickets, loading } = props;
  const { searchedTickets, setSearchedTickets } = useState();
  const { newtickets, setNewtickets } = useState([]);
  const [details, setDetails] = useState({});
  const [error, setError] = useState(null);
  const [ticket, setTicket] = useState({});
  const accessToken = localStorage.getItem("token");
  const params = useParams();
  const [search, setSearch] = useState(null);
  const navigate = useNavigate();

  //   useEffect(() => {
  //     const c=tickets.map(ticket.subject.include(search))
  //     console.log(c)
  //   }, []);

  const handleSearch = (e) => {
    setSearch(e.target.value);
    searchedTickets = tickets.filter(
      (ticket) =>
        ticket.subject.toLowerCase().includes(e.target.value.toLowerCase()) ||
        ticket.description
          .toLowerCase()
          .includes(e.target.value.toLowerCase()) ||
        ticket.last_name.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setSearchedTickets(searchedTickets);
  };

  useEffect(() => {}, [search]);

  return (
    <div className="ticket-box">
      <div className="ticket-list">
        <div className="ticket-search">
          <TextField
            variant="outlined"
            sx={{
              backgroundColor: "white",
              borderRadius: "10px",
              border: "none",
              width: "100%",
            }}
            size="small"
            onChange={handleSearch}
            value={search}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton>
                    <Search />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </div>
        {loading ? (
          <div className="ticket-loading">
            <CircularProgress />
            <p>Loading...</p>
          </div>
        ) : search ? (
          <div className="ticket-list-container">
            {/* <List>
              {tickets.map((newtickets) => (
                
                <ListItem
                  key={ticket._id}
                  button
                  onClick={() => navigate(`/tickets/${ticket._id}`)}
                  className="ticket-list-item"
                >
                  <ListItemText
                    primary={ticket.subject}
                    secondary={ticket.subject}
                  />
                </ListItem>
                
              ))}
            </List> */}
          </div>
        ) : (
          <div style={{ marginTop: "20px", borderRadius: "20px" }}>
            <TableContainer
              sx={{ width: "100%", borderRadius: "20px" }}
              component={Paper}
            >
              <Table
                sx={{
                  border: "1.5px solid black",
                  background: "#fff",
                }}
              >
                <TableHead
                  className="table-head"
                  style={{ borderRadius: "20px" }}
                >
                  <TableRow>
                    <TableCell sx={{ fontColor: "#fff" }}>
                      <span className="ticket-table-header">SUBJECT</span>
                    </TableCell>

                    <TableCell sx={{ fontColor: "#fff" }}>
                      <span className="ticket-table-header">CLIENT ID</span>
                    </TableCell>
                    <TableCell sx={{ fontColor: "#fff" }}>
                      <span className="ticket-table-header">TICKET ID</span>
                    </TableCell>

                    <TableCell sx={{ fontColor: "#fff" }}>
                      <span className="ticket-table-header">ASSET NAME</span>
                    </TableCell>
                    <TableCell sx={{ fontColor: "#fff" }}>
                      <span className="ticket-table-header">STATUS</span>
                    </TableCell>
                    <TableCell sx={{ fontColor: "#fff" }}>
                      <span className="ticket-table-header">DESCRIPTION</span>
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {loading ? (
                    <>
                      <TableRow>
                        <TableCell>
                          <Skeleton />
                        </TableCell>
                        <TableCell>
                          <Skeleton />
                          <Skeleton />
                          <Skeleton />
                        </TableCell>
                        <TableCell>
                          <Skeleton />
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>
                          <Skeleton />
                        </TableCell>
                        <TableCell>
                          <Skeleton />
                          <Skeleton />
                          <Skeleton />
                        </TableCell>
                        <TableCell>
                          <Skeleton />
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>
                          <Skeleton />
                        </TableCell>
                        <TableCell>
                          <Skeleton />
                          <Skeleton />
                          <Skeleton />
                        </TableCell>
                        <TableCell>
                          <Skeleton />
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>
                          <Skeleton />
                        </TableCell>
                        <TableCell>
                          <Skeleton />
                          <Skeleton />
                          <Skeleton />
                        </TableCell>
                        <TableCell>
                          <Skeleton />
                        </TableCell>
                      </TableRow>
                    </>
                  ) : (
                    tickets.map((ticket) => (
                      <TableRow key={ticket._id}>
                        <TableCell sx={{ fontSize: "1.2rem", fontWeight: 200 }}>
                          {/* {console.log("Ticket", ticket)} */}

                          {ticket.subject}
                        </TableCell>

                        <TableCell sx={{ fontSize: "1.2rem", fontWeight: 200 }}>
                          <div className="ticket-client-cell">
                            <div>
                              <Avatar
                                sx={{ bgcolor: deepOrange[500] }}
                                alt="Remy Sharp"
                                src="/broken-image.jpg"
                              />
                            </div>
                            <div>
                              <div className="ticket-client-cell-name">
                                {"Client Name"}
                              </div>
                              <div className="ticket-client-cell-id">
                                {ticket.client_id}
                              </div>
                            </div>
                          </div>
                        </TableCell>

                        <TableCell sx={{ fontSize: "1.2rem", fontWeight: 200 }}>
                          {ticket._id}
                        </TableCell>
                        <TableCell sx={{ fontSize: "1.2rem", fontWeight: 200 }}>
                          {/* {console.log("Ticket", ticket)} */}
                          {/* {ticket.asset_name["asset_name"] === undefined? 'None': ticket.asset_name["asset_name"]} */}
                          {"Asset Name"}
                        </TableCell>
                        <TableCell sx={{ fontSize: "1.2rem", fontWeight: 200 }}>
                          {ticket.status == "close" ? (
                            <Button variant="contained" color="error">
                              Closed
                            </Button>
                          ) : (
                            <Button variant="contained" color="success">
                              Open
                            </Button>
                          )}
                        </TableCell>
                        <TableCell sx={{ fontSize: "1rem", fontWeight: 200 }}>
                          {/* {console.log("Ticket", ticket)} */}
                          {ticket.description}
                        </TableCell>
                        {/* <TableCell>
                        <Button
                          variant="contained"
                          size="small"
                          sx={{ margin: "5px" }}
                          onClick={() => handleAssetCatEdit(assetCategory._id)}
                        >
                          Edit
                        </Button>
                        <Button
                          variant="contained"
                          color="secondary"
                          size="small"
                          sx={{ margin: "5px" }}
                        >
                          Delete
                        </Button>
                      </TableCell> */}
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </TableContainer>
            {/* <List>
              {tickets.map((ticket) => (
                <ListItem
                  key={ticket._id}
                  button
                  onClick={() => navigate(`/tickets/${ticket._id}`)}
                  // onClick={()=>console.log(ticket._id)}
                  className="ticket-list-item"
                >
                  <ListItemText
                    primary={ticket.subject}
                    secondary={ticket.subject}
                  />
                </ListItem>
              ))}
            </List> */}
          </div>
        )}
      </div>
      {/* <div className="ticket-details">
        <TicketDetails />
      </div> */}
    </div>
  );
};

export default TicketBox;
{
  /* .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage) */
}
