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
import {
  Add,
  CenterFocusStrong,
  ConnectingAirportsOutlined,
  FamilyRestroomOutlined,
} from "@mui/icons-material";
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
  CircularProgress,
} from "@mui/material";
import Papa from "papaparse";

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

function AddCSVBody(props) {
  const { open, onClose, templates } = props;
  const accessToken = localStorage.getItem("token");
  const [file, setFile] = useState();
  const [loading, setLoading] = useState(false);

  //State to store table Column name
  const [template, setTemplate] = useState("");

  const [alert, setAlert] = useState(false);
  const [message, setMessage] = useState("");

  //State to store the values
  const [values, setValues] = useState([]);

  const fileReader = new FileReader();
  const handleClose = () => {
    onClose();
  };
  const handleListItemClick = (value) => {
    onClose(value);
  };

  const handleOnChange = (e) => {
    setFile(e.target.files[0]);
  };
  //validation csv
  // const validation=()=>{
  //   setLoading(true)
  //   console.log(file)

  //   // setTimeout(setLoading(false), 3000);

  // }

  const validation = (event) => {
    // Passing file data (event.target.files[0]) to parse using Papa.parse
    setLoading(true);
    console.log("File Name", file);
    console.log("Chosen Template", template);
    const d1 = templates.filter((elem) => elem.template_name === template);
    console.log(
      "First Iteration inside validation ",
      d1[0].schema_structure[0]
    );

    const schema = Object.keys(d1[0].schema_structure[0]);
    console.log("Schema List", schema);

    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: function (results) {
        console.log("File Row", results.data[0]);
        const fileColumnList = Object.keys(results.data[0]);
        console.log();
        console.log("File Column Names", fileColumnList);

        {
          if (JSON.stringify(schema) == JSON.stringify(fileColumnList)) {
            setLoading(false);
            setMessage("Uploading the CSV file");
            setAlert(true);
            console.log("Call Post");
            setTimeout(() => {
              setAlert(false);
            }, 3000);
            let formData = new FormData();
            formData.append("file", file);
            formData.append("template_name", template);
            console.log("File inside post", file);
            console.log("Form Data inside post", formData);
            axios
              .post(
                `${process.env.REACT_APP_API}/master/upload_csv`,
                formData,
                {
                  headers: {
                    "access-token": accessToken,
                    "Content-Type": "multipart/form-data",
                  },
                }
              )
              .then((res) => {
                console.log(res);
              })

              .catch((err) => {
                console.log(err);
              });
            setTimeout(() => {
              onClose();
            }, 3000);
          } else {
            setLoading(false);
            setMessage("Please ensure correct file or template chosen");
            setAlert(true);
            console.log("Please ensure correct file or template");
            setTimeout(() => {
              setAlert(false);
            }, 3000);
            setTimeout(() => {
              onClose();
            }, 3000);
          }
        }
      },
    });
  };

  return (
    <Dialog onClose={handleClose} open={open}>
      {alert && <div className="add-ticket-alert">{message}</div>}
      <form className="add-user-form">
        <Table>
          <TableHead>
            <TableRow>
              <TableCell
                sx={{ fontWeight: "600", fontSize: "1.5rem" }}
                colSpan={2}
              >
                Upload Asset CSV
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            <TableRow>
              <TableCell>
                <label>Template: </label>
              </TableCell>
              <TableCell>
                <Select
                  onChange={(e) => setTemplate(e.target.value)}
                  variant="outlined"
                  size="small"
                  value={template}
                  sx={{ width: "100%" }}
                  displayEmpty
                >
                  <MenuItem value="">Choose Template</MenuItem>
                  {templates.map((option) => (
                    <MenuItem key={option._id} value={option.template_name}>
                      {option.template_name}
                    </MenuItem>
                  ))}
                </Select>
              </TableCell>
            </TableRow>
            <TableRow>
              {loading ? (
                <>
                  <TableCell>
                    <label>Please wait ...: </label>
                  </TableCell>
                  <TableCell>
                    <CircularProgress />
                  </TableCell>
                </>
              ) : (
                <>
                  <TableCell>
                    <label>CSV: </label>
                  </TableCell>

                  <TableCell>
                    <input
                      className="custom-file-upload"
                      type={"file"}
                      id={"csvFileInput"}
                      accept={".csv"}
                      onChange={handleOnChange}
                    />
                  </TableCell>
                </>
              )}
            </TableRow>
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
            onClick={validation}
          >
            Upload
          </Button>
        </div>
      </form>
    </Dialog>
  );
}

AddCSVBody.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
};

export default function AddAsset(props) {
  const { fetchAssets, templates } = props;
  const [open, setOpen] = React.useState(false);
  const [csvOpen, setCsvOpen] = useState(false);
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
  //handle fucntion for csv button
  const handleCSVClickOpen = () => {
    setCsvOpen(true);
  };

  const handleCSVClose = (value) => {
    setCsvOpen(false);
  };

  const AddAssetSubmit = () => {
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

      <button
        onClick={handleCSVClickOpen}
        className="add-button"
        style={{ marginLeft: 10 }}
      >
        Upload CSV
      </button>
      <AddCSVBody
        open={csvOpen}
        onClose={handleCSVClose}
        templates={templates}
      />
    </div>
  );
}
