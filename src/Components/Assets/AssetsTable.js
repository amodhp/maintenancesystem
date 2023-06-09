import React, { useState } from "react";
import {
  Button,
  CircularProgress,
  Dialog,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  DialogTitle,
  DialogContent,
  DialogContentText,
  TextField,
  DialogActions,
  Typography,
  ListItem,
  ListItemButton,
  List,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import InventoryIcon from "@mui/icons-material/Inventory";
import DeleteIcon from "@mui/icons-material/Delete";
import { red } from "@mui/material/colors";
import { ConnectingAirportsOutlined, Edit } from "@mui/icons-material";
import PropTypes from "prop-types";
import axios from "axios";
const accessToken = localStorage.getItem("token");
const PredictionBox = (props) => {
  const { onClose, open, asset_name } = props;
  const { predict, setPredict } = useState(false);
  const handleClose = () => {
    onClose();
  };

  const breakdownRate = {
    mouse: "34.1",
    "wood cutting machine": "18.7",
    "wood sanding machine": "24.5",
    "furniture sanding machine": "8.3",
    "800vpr-3": "16.2",
  };
  const maintenanceHistory = {
    mouse: [
      "Maintained by Selec Admin , 10 Feb, 2023",
      "Maintained by user234 , 17 March , 2023",
    ],
    "wood cutting machine": [
      "Maintained by NewWork, 10 Feb, 2023",
      "Maintained by Newtech , 17 Feb , 2023",
      "Maintained by kh12 , 6 March , 2023",
      "Maintained by workerexternal , 13 March , 2023",
    ],
    "furniture sanding machine": [
      "Maintained by Selec Admin , 10 Feb, 2023",
      "Maintained by user234 , 17 March , 2023",
      "Maintained by rtech , 27 May , 2023",
    ],
    "800vpr-3": [
      "Maintained by Selec Admin , 10 Feb, 2023",
      "Maintained by user234 , 17 March , 2023",
      "Maintained by selecreq , 19 March , 2023",
      "Maintained by Abctech , 15 April , 2023",
      "Maintained by tech22 , 17 April , 2023",
      "Maintained by user33 , 27 March , 2023",
    ],
  };
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>{asset_name}</DialogTitle>
      <DialogContent>
        <DialogContentText>
          {asset_name} is in place in Area 1 since 18 Nov, 2022, Here is a list
          of of its maintenance history.
        </DialogContentText>
        <Typography>Maintenance History</Typography>
        <List>
        
          {maintenanceHistory[asset_name].map((text) => (
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <InventoryIcon />
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </DialogContent>
      <DialogContent>
        Breakdown Rate : {breakdownRate[asset_name]}%
      </DialogContent>

      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
      </DialogActions>
    </Dialog>
  );
};

PredictionBox.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
};

const AssetsTable = (props) => {
  const {
    assets,
    setAssets,
    searchedAssets,
    setSearchedAssets,
    fetchAssets,
    loading,
  } = props;

  const [open, setOpen] = React.useState(false);
  const [prediction_asset_name, setPrediction_asset_name] = useState("mouse");
  const handleClickOpen = (name) => {
    setPrediction_asset_name(name);
    setOpen(true);
  };
  const deleteAsset = (id) => {
    axios({
      method: "delete",
      url: `${process.env.REACT_APP_API}/admin/delete_asset/${id}`,
      headers: {
        "access-token": `${accessToken}`,
      },
    })
      .then((res) => {
        console.log(res);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const handleClose = (value) => {
    setOpen(false);
  };
  return (
    <div style={{ marginTop: "20px", borderRadius: "20px" }}>
      <TableContainer
        sx={{ width: "100%", borderRadius: "20px" }}
        component={Paper}
      >
        <Table>
          <TableHead
            className="user-table-header"
            style={{ borderRadius: "20px" }}
          >
            <TableRow>
              <TableCell sx={{ fontSize: "1rem" }}>
                <span className="asset-table-header">Name</span>
              </TableCell>
              <TableCell sx={{ fontSize: "1rem" }}>
                <span className="asset-table-header">Category</span>
              </TableCell>
              <TableCell sx={{ fontSize: "1rem" }}>
                <span className="asset-table-header">Location</span>
              </TableCell>
              <TableCell sx={{ fontSize: "1rem" }}>
                <span className="asset-table-header">Action</span>
              </TableCell>
              <TableCell sx={{ fontSize: "1rem" }}>
                <span className="asset-table-header">Prediction</span>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loading ? (
              <TableRow className="asset-table-body">
                <TableCell colSpan={5} sx={{ textAlign: "center" }}>
                  <CircularProgress />
                </TableCell>
              </TableRow>
            ) : (
              assets.map((asset) => (
                <TableRow key={asset._id}>
                  <TableCell>{asset.asset_name}</TableCell>
                  <TableCell>{asset.asset_category}</TableCell>
                  <TableCell>
                    {asset.asset_location != undefined
                      ? Object.values(asset.asset_location).reverse().join(",")
                      : "location"}
                  </TableCell>
                  <TableCell>
                    <DeleteIcon
                      sx={{ color: red[500] }}
                      onClick={() => deleteAsset(asset._id)}
                    />
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="contained"
                      color="success"
                      onClick={() => handleClickOpen(asset.asset_name)}
                    >
                      Prediction
                    </Button>

                    <PredictionBox
                      open={open}
                      onClose={handleClose}
                      asset_name={prediction_asset_name}
                    />
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};
export default AssetsTable;
