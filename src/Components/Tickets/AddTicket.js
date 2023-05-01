import {
  Button,
  Dialog,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import axios from "axios";

import React from "react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
var finalassets = [];
const AddTicket = () => {
  const [open, setOpen] = React.useState(true);
  const [message, setMessage] = React.useState("");
  const [alert, setAlert] = React.useState(false);
  const accessToken = localStorage.getItem("token");
  // "subject":"DUMMY TICKET 4",
  // "description":"this is a test message for dummy ticket 4",
  // "asset_name": "62fe95009891c8f9d0a69628",
  // "location": {"unit_building":"2","floor":"first floor","room":"102"}
  const [subject, setSubject] = useState("");
  const [description, setDescription] = useState("");
  const [asset_name, setAsset_name] = useState("");
  const [locations, setLocations] = useState("");
  const [unitOrBuilding, setUnitOrBuilding] = useState("");
  const [floor, setFloor] = useState("");
  const [room, setRoom] = useState("");
  const [assetInRoom, setAssetInRoom] = useState();
  const [assetInRoomId, setAssetInRoomId] = useState();
  const [bool, setBool] = useState(false);
  const AddTicketSubmit = (e) => {
    e.preventDefault();
    const data = {
      subject: subject,
      description: description,
      asset_id: assetInRoomId[0],
    };
    console.log(data);
   
    axios
      .post(`${process.env.REACT_APP_API}/admin/add_ticket`, data, {
        headers: {
          "access-token": accessToken,
        },
      })
      .then((res) => {
        setMessage(res.data.msg);
        setAlert(true);
        console.log(res);
        setTimeout(() => {
          setAlert(false);
        }, 3000);
        setTimeout(() => {
          navigate("/tickets");
        }, 3000);
      })
      .catch((err) => {
        setMessage(err.response.data.msg);
        setAlert(true);
        setTimeout(() => {
          setAlert(false);
        }, 3000);
        console.log(err);
      });
  };

  const fetchLocations = () => {
    axios
      .get(`${process.env.REACT_APP_API}/admin/locations`, {
        headers: {
          "access-token": accessToken,
        },
      })
      .then((res) => {
        setLocations(res.data.locations);
        // console.log("FETCH",locations)
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    fetchLocations();
  }, []);

  const navigate = useNavigate();
  const backgroundClick = () => {
    navigate(-1);
  };
  const handleCancel = () => {
    setOpen(false);
    navigate(-1);
  };
  var temp = [];//for storing asset name
  var tempID = [];//for storing asset id's
  const handleRoom = (event) => {
    // console.log(event.target.value)
    // const t=event.target.value
    // setRoom(t);
    setBool(true);
    console.log("func inside line 109", room);
    setAssetInRoom([]);
    locations.map((location) => {
      if (location.unit_or_building === unitOrBuilding) {
        console.log("Unit func line 113", unitOrBuilding);
        location.subdivision.map((subdivision) => {
          if (subdivision.floor === floor) {
            console.log("func floor 116", floor);
            subdivision.rooms.map((r) => {
              if (r.room === room) {
                // temp.push({
                //   key: r.room,
                //   value: r.assets,
                // });
                console.log("New", r.assets);
                if (r.assets.length === 0) {
                  console.log("Its empty");
                }
                console.log("This is what want to set", r.assets);
                r.assets.map((e) => console.log("Fuck new", e.asset_name));
                temp = r.assets.map((e) => e.asset_name);
                tempID = r.assets.map((e) => e._id);
                console.log("Final Final", temp);
                console.log("Final Final ID", tempID);
                setAssetInRoom(temp);
                setAssetInRoomId(tempID);
                return null;
              }
            });

            //   // setAssetInRoom([...room])
            //   // if (room.room === event.target.value) {
            //   //   setAssetInRoom([...room]);
            //   // }
            // });
          }
          // console.log("Func Final 129", temp[0]);
          // setAssetInRoom([temp[0].value])
          // console.log(assetInRoom)
          // setAssetInRoom([...temp.map(elem=>elem)])
          // console.log("F Final",assetInRoom)
        });
      }
    });
  };

  return (
    <div className="add-ticket-background">
      <Dialog open={open}>
        {alert && <div className="add-ticket-alert">{message}</div>}
        <form className="add-ticket-form">
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: "600", fontSize: "1.5rem" }}>
                  Add Ticket
                </TableCell>
                <TableCell align="right">
                  <Button onClick={backgroundClick} sx={{ color: "red" }}>
                    X
                  </Button>
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
                    sx={{ width: "100px" }}
                  >
                    {!locations && <MenuItem value="">Loading...</MenuItem>}
                    {locations &&
                      locations.map(
                        (location) => (
                          console.log(
                            "unit select line202",
                            location.unit_or_building
                          ),
                          (
                            <MenuItem
                              value={location.unit_or_building}
                              key={location._id}
                            >
                              {location.unit_or_building}
                            </MenuItem>
                          )
                        )
                      )}
                  </Select>
                  <Select
                    value={floor}
                    onChange={(e) => setFloor(e.target.value)}
                    size="small"
                    sx={{ width: "100px", marginLeft: "10px" }}
                  >
                    {!unitOrBuilding && <MenuItem value="">Loading</MenuItem>}
                    {unitOrBuilding &&
                      locations
                        .filter(
                          (location) =>
                            location.unit_or_building === unitOrBuilding
                        )[0]
                        .subdivision.map(
                          (subdivision) => (
                            console.log("floor 224", subdivision.floor),
                            (
                              <MenuItem
                                key={subdivision.floor}
                                value={subdivision.floor}
                              >
                                {subdivision.floor}
                              </MenuItem>
                            )
                          )
                        )}
                  </Select>
                  <Select
                    value={room}
                    onChange={(e) => setRoom(e.target.value)}
                    placeholder="Room"
                    size="small"
                    sx={{ width: "100px", marginLeft: "10px" }}
                  >
                    {!floor && <MenuItem value="">Loading</MenuItem>}
                    {floor &&
                      locations
                        .filter(
                          (location) =>
                            location.unit_or_building === unitOrBuilding
                        )[0]
                        .subdivision.filter(
                          (subdivision) => subdivision.floor === floor
                        )[0]
                        .rooms.map(
                          (room) => (
                            console.log(
                              "Room line 250 just before final",
                              room.room
                            ),
                            (
                              <MenuItem key={room._id} value={room.room}>
                                {room.room}
                              </MenuItem>
                            )
                          )
                        )}
                  </Select>
                </TableCell>
              </TableRow>

              {/* <TableRow>
                <TableCell>
                  <Select
                    value={room}
                    onChange={(e) => setRoom(e.target.value)}
                    placeholder="Room"
                    size="small"
                    sx={{ width: "100px", marginLeft: "10px" }}
                  >
                    {!floor && <MenuItem value="">Loading</MenuItem>}
                    {floor &&
                      locations
                        .filter(
                          (location) =>
                            location.unit_or_building === unitOrBuilding
                        )[0]
                        .subdivision.filter(
                          (subdivision) => subdivision.floor === floor
                        )[0]
                        .rooms.filter(
                          (r) => (
                            console.log(
                              "Room line 250 just before final",
                              r.room
                            ),
                            r.room == room
                          )
                        )[1].filter(asset=><MenuItem>{asset.asset_name}</MenuItem>)}
                  </Select>
                </TableCell>
              </TableRow> */}
              <TableRow>
                <Button style={{ marginLeft: 10 }} onClick={() => handleRoom()}>
                  Show Assets
                </Button>
              </TableRow>
              {/* <TableRow>
                <TableCell>{assetInRoom}</TableCell>
              </TableRow> */}
              {[assetInRoom] == undefined ? (
                <TableCell>
                  <Select>
                    <MenuItem>{"No Assets"}</MenuItem>
                  </Select>
                </TableCell>
              ) : (
                <>
                  <TableRow>
                    <TableCell>Asset Name</TableCell>
                    <TableCell>
                      <Select
                        value={asset_name}
                        onChange={(e) => setAsset_name(e.target.value)}
                        placeholder="Asset Name"
                        size="small"
                        sx={{ width: "100px" }}
                      >
                        {[assetInRoom] == undefined ? (
                          <MenuItem>{"No Assets"}</MenuItem>
                        ) : (
                          [assetInRoom].map(
                            (asset) => (
                              console.log(assetInRoom),
                              (
                                <MenuItem value={asset} key={asset}>
                                  {asset}
                                </MenuItem>
                              )
                            )
                          )
                        )}
                      </Select>
                    </TableCell>
                  </TableRow>
                </>
              )}

              <TableRow>
                <TableCell>
                  <Button
                    variant="contained"
                    sx={{ width: "100%" }}
                    onClick={handleCancel}
                  >
                    Cancel
                  </Button>
                </TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    sx={{ width: "100%" }}
                    onClick={AddTicketSubmit}
                  >
                    Add
                  </Button>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </form>
      </Dialog>
    </div>
  );
};
export default AddTicket;
