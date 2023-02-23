import React, { useState } from "react";
import PropTypes from "prop-types";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import PersonIcon from "@mui/icons-material/Person";
import AddIcon from "@mui/icons-material/Add";
import Typography from "@mui/material/Typography";
import { blue } from "@mui/material/colors";
import { Add } from "@mui/icons-material";
import axios from "axios";
import {
  MenuItem,
  OutlinedInput,
  Select,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
} from "@mui/material";

function AddAssetBody(props) {
  const {
    onClose,
    open,
    fetchAssets,
    submit,
    assetName,
    location,
    assetCategory,
    setAssetName,
    setAssetCategory,
    setLocation,
  } = props;

  const accessToken = localStorage.getItem("token");
  const handleClose = () => {
    onClose();
  };

  const handleListItemClick = (value) => {
    onClose(value);
  };

  const preDefinedLocations = [
    {
      value: "Area -1",
      label: "Area -1",
    },
    {
      value: "Area -2",
      label: "Area -2",
    },
    {
      value: "Area -3",
      label: "Area -3",
    },
  ];

  const preDefinedAssetCategory = [
    {
      value: "Electrical",
      label: "Electrical",
    },
    {
      value: "Hardware",
      label: "Hardware",
    },
    {
      value: "Furniture",
      label: "Furniture",
    },
  ];

  return (
    <Dialog onClose={handleClose} open={open}>
      <form className="add-user-form">
        <Table>
          <TableHead>
            <TableRow>
              <TableCell
                sx={{ fontWeight: "600", fontSize: "1.5rem" }}
                colSpan={2}
              >
                Add New Asset
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            <TableRow>
              <TableCell>
                <label>Asset Name: </label>
              </TableCell>
              <TableCell>
                <OutlinedInput
                  placeholder="Asset Name"
                  size="small"
                  onChange={(e) => setAssetName(e.target.value)}
                />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <label>Location: </label>
              </TableCell>
              <TableCell>
                <Select
                  onChange={(e) => setLocation(e.target.value)}
                  variant="outlined"
                  size="small"
                  value={location}
                  sx={{ width: "100%" }}
                  displayEmpty
                >
                  <MenuItem value="">Choose Location</MenuItem>
                  {preDefinedLocations.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </Select>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <label>Asset Category: </label>
              </TableCell>
              <TableCell>
                <Select
                  onChange={(e) => setAssetCategory(e.target.value)}
                  variant="outlined"
                  size="small"
                  value={assetCategory}
                  sx={{ width: "100%" }}
                  displayEmpty
                >
                  <MenuItem value="">Choose Asset Category</MenuItem>
                  {preDefinedAssetCategory.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </Select>
              </TableCell>
            </TableRow>
            {/* <TableRow>
              <TableCell>
                <label>Asset Component List: </label>
              </TableCell>
              <TableCell>
                <OutlinedInput
                  placeholder="Asset Component List"
                  size="small"
                  onChange={(e) => setAssetComponentList(e.target.value)}
                />
              </TableCell>
            </TableRow> */}
            {/* <TableRow>
              <TableCell>
                <label>Asset Component List Array: </label>
              </TableCell>
              <TableCell>
                <OutlinedInput
                  placeholder="Asset Component List Array"
                  size="small"
                  onChange={(e) => setAssetComponentListArray(e.target.value)}
                />
              </TableCell>
            </TableRow> */}
            {/* <TableRow>
              <TableCell>
                <label>Asset Component List String: </label>
              </TableCell>
              <TableCell>
                <OutlinedInput
                  placeholder="Asset Component List String"
                  size="small"
                  onChange={(e) => setAssetComponentListString(e.target.value)}
                />
              </TableCell>
            </TableRow> */}
            {/* <TableRow>
              <TableCell colSpan={2}>
                <Button onClick={() => handleClose()} variant="contained">
                  Add Asset
                </Button>
              </TableCell>
            </TableRow> */}
          </TableBody>
        </Table>

        <div
          style={{
            textAlign: "center",
            paddingBottom: "20px",
            paddingTop: "10px",
          }}
        >
          <Button
            variant="contained"
            sx={{ backgroundColor: "#189ab4", width: "80%" }}
            color="primary"
            onClick={submit}
          >
            Add
          </Button>
        </div>
      </form>
    </Dialog>
  );
}

AddAssetBody.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
};

export default function AddAsset(props) {
  const { fetchAssets } = props;
  const [open, setOpen] = React.useState(false);
  const [assetName, setAssetName] = useState("");
  const [location, setLocation] = useState("");
  const [assetCategory, setAssetCategory] = useState("");
  const accessToken = localStorage.getItem("token");
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (value) => {
    setOpen(false);
  };

  const AddAssetSubmit = () => {
    console.log("aass");
    axios({
      method: "post",

      url: `${process.env.REACT_APP_API}/admin/add_assets`,

      data: {
        // user_id: Math.floor(Math.random() * 1000000),
        asset_name: assetName,
        location: location,
        asset_category: assetCategory,
      },
      headers: {
        "access-token": `${accessToken}`,
      },
    })
      .then((res) => {
        console.log(res);
        setOpen(false);
        fetchAssets();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      <button onClick={handleClickOpen} className="add-button">
        Add Asset
      </button>
      <AddAssetBody
        open={open}
        onClose={handleClose}
        fetchAssets={fetchAssets}
        assetName={assetName}
        location={location}
        assetCategory={assetCategory}
        setAssetName={setAssetName}
        setLocation={setLocation}
        setAssetCategory={setAssetCategory}
        submit={AddAssetSubmit}
      />
    </div>
  );
}
