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
  Typography,
} from "@mui/material";
import { deepOrange } from "@mui/material/colors";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { Outlet, useNavigate, useParams } from "react-router-dom";
import TicketDetails from "./TicketDetails";
import "./tickets.css";

const TicketBox = (props) => {
  const { tickets, loading } = props;
  const [error, setError] = useState(null);
  const [ticket, setTicket] = useState({});
  const accessToken = localStorage.getItem("token");
  const params = useParams();
  const [search, setSearch] = useState(null);
  const navigate = useNavigate();

  const colors = ["blue", "green", "grey", "Orange", "brown"];
  var random;
  var color;

  return (
    <div className="ticket-box">
      <div className="ticket-list">
        <Typography variant="h4" className="assetsHeader-title">
          Tickets
        </Typography>
        <div className="ticket-search">
          <div className="search-asset-input">
            <label style={{ fontSize: "1rem", fontWeight: "600" }}>
              Search:
            </label>
            <TextField
              variant="outlined"
              sx={{
                backgroundColor: "white",
                borderRadius: "10px",
                border: "none",
                width: "100%",
              }}
              size="small"
              onChange={(e) => setSearch(e.target.value)}
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
        </div>
        {loading ? (
          <div className="ticket-loading">
            <CircularProgress />
            <p>Loading...</p>
          </div>
        ) : search ? (
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
                    tickets.reverse().
                      filter(
                        (ticket) =>
                          ticket.subject
                            .toLowerCase()
                            .includes(search.toLowerCase()) ||
                          ticket.description
                            .toLowerCase()
                            .includes(search.toLowerCase())
                      )
                      .map((ticket) => (
                        <TableRow key={ticket._id}>
                          <TableCell sx={{ fontSize: "1rem", fontWeight: 200 }}>
                            {/* {console.log("Ticket", ticket)} */}

                            {ticket.subject}
                          </TableCell>

                          <TableCell sx={{ fontSize: "1rem", fontWeight: 200 }}>
                            <div className="ticket-client-cell">
                              <div>
                                <Avatar
                                  sx={{ bgcolor: deepOrange[100] }}
                                  alt={ticket.subject[0]}
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

                          <TableCell sx={{ fontSize: "1rem", fontWeight: 200 }}>
                            {ticket._id}
                          </TableCell>
                          <TableCell sx={{ fontSize: "1rem", fontWeight: 200 }}>
                            {/* {console.log("Ticket", ticket)} */}
                            {/* {ticket.asset_name["asset_name"] === undefined? 'None': ticket.asset_name["asset_name"]} */}
                            {"Asset Name"}
                          </TableCell>
                          <TableCell sx={{ fontSize: "1rem", fontWeight: 200 }}>
                            {ticket.status == "close" ? (
                              <Button variant="outlined" color="error">
                                Closed
                              </Button>
                            ) : (
                              <Button variant="outlined" color="success">
                                Open
                              </Button>
                            )}
                          </TableCell>
                          <TableCell sx={{ fontSize: "1rem", fontWeight: 200 }}>
                            {/* {console.log("Ticket", ticket)} */}
                            {ticket.description}
                          </TableCell>
                        </TableRow>
                      ))
                  )}
                </TableBody>
              </Table>
            </TableContainer>
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
                    tickets.reverse().map(
                      (ticket) => (
                        ((random = Math.floor(Math.random() * colors.length)),
                        (color = colors[random])),
                        (
                          <TableRow key={ticket._id}>
                            <TableCell
                              sx={{ fontSize: "1rem", fontWeight: 200 }}
                            >
                              {/* {console.log("Ticket", ticket)} */}

                              {ticket.subject}
                            </TableCell>

                            <TableCell
                              sx={{ fontSize: "1rem", fontWeight: 200 }}
                            >
                              <div className="ticket-client-cell">
                                <div>
                                  {console.log(color)}
                                  <Avatar
                                    sx={{ bgcolor: color }}
                                    alt={ticket.subject[0]}
                                    src="/broken-image.jpg"
                                  />
                                </div>
                                <div>
                                  <div className="ticket-client-cell-name">
                                    {"Client Name"}
                                  </div>
                                  <div className="ticket-client-cell-id">
                                    {ticket.requestee_id}
                                  </div>
                                </div>
                              </div>
                            </TableCell>

                            <TableCell
                              sx={{ fontSize: "1rem", fontWeight: 200 }}
                            >
                              {ticket._id}
                            </TableCell>
                            <TableCell
                              sx={{ fontSize: "1rem", fontWeight: 200 }}
                            >
                              {/* {console.log("Ticket", ticket)} */}
                              {/* {ticket.asset_name["asset_name"] === undefined? 'None': ticket.asset_name["asset_name"]} */}
                              {"Asset Name"}
                            </TableCell>
                            <TableCell
                              sx={{ fontSize: "1rem", fontWeight: 200 }}
                            >
                              {ticket.status == "close" ? (
                                <Button variant="outlined" color="error">
                                  Closed
                                </Button>
                              ) : (
                                <Button variant="outlined" color="success">
                                  Open
                                </Button>
                              )}
                            </TableCell>
                            <TableCell
                              sx={{ fontSize: "1rem", fontWeight: 200 }}
                            >
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
                        )
                      )
                    )
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        )}
      </div>
    </div>
  );
};

export default TicketBox;
