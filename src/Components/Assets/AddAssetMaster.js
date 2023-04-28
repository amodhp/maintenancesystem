import {
  Button,
  MenuItem,
  Input,
  Paper,
  Select,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tabs,
} from "@mui/material";
import { Box } from "@mui/system";
import TabPanel from "@mui/lab/TabPanel";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";

import React, { useState } from "react";
import axios from "axios";

import fileSaver from "file-saver";

const AddAssetMaster = (props) => {
  const {
    assetCategories,
    editAssetCat,
    addAssetCatOrSubCat,
    setAddAssetCatOrSubCat,
    setEditAssetCat,
  } = props;
  const [attributeListCount, setAttributeListCount] = useState(1);
  const [templateAttributes, setTemplateAttributes] = useState([]);
  const [attribute, setAttribute] = useState("");
  const [attributeType, setAttributeType] = useState("");
  const [templateName, setTemplateName] = useState("");
  const accessToken = localStorage.getItem("token");

  const pushAttributeInTemplateArray = (e) => {
    if (e.target.value == "add") {
      setAttributeListCount(attributeListCount + 1);
    } else {
      setAttributeListCount(attributeListCount - 1);
    }
    console.log("Attribute is -", attribute);
    console.log("Attribute Type is =", attributeType);

    setTemplateAttributes([
      ...templateAttributes,
      { attribute: attribute, attributeType: attributeType },
    ]);
    console.log("Template List", templateAttributes);
    setAttribute("");
    setAttributeType("");
  };
  const handleSelectAssetCat = (e) => {
    setEditAssetCat(e.target.value);
  };

  const pushTemplateArray = () => {
    console.log("Template Name", templateName);
    console.log("Template array", templateAttributes);
    const data = {};
    data["template_name"] = templateName;
    templateAttributes.map(
      (elem) => (data[elem.attribute] = elem.attributeType)
    );
    console.log("Push this", data);

    axios
      .post(`${process.env.REACT_APP_API}/master/add_asset_templates`, data, {
        headers: {
          "access-token": accessToken,
        },
      })
      .then((res) => {
        //function to download the csv file
        const downloadFile = ({ data, fileName, fileType }) => {
          const blob = new Blob([data], { type: fileType });

          const a = document.createElement("a");
          a.download = fileName;
          a.href = window.URL.createObjectURL(blob);
          const clickEvt = new MouseEvent("click", {
            view: window,
            bubbles: true,
            cancelable: true,
          });
          a.dispatchEvent(clickEvt);
          a.remove();
        };
        console.log("Push template asset master", res);
        //for extracting the column names
        let headers = templateAttributes.map((elem) => elem.attribute);
        downloadFile({
          data: headers,
          fileName: templateName,
          fileType: "text/csv",
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <TabContext value={addAssetCatOrSubCat}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <TabList
            onChange={(e, v) => setAddAssetCatOrSubCat(v)}
            aria-label="lab API tabs example"
          >
            <Tab label="Template Name" value="cat" />
            <Tab label="Template Attributes" value="subcat" />
          </TabList>
        </Box>
        <TabPanel value="cat">
          <label htmlFor="assetCat">Template Name </label>
          <Input
            id="assetCat"
            type="text"
            size="small"
            sx={{ marginLeft: 2 }}
            onChange={(e) => setTemplateName(e.target.value)}
          />
          <br></br>
          <br></br>
          <label htmlFor="assetSubCat">Template Names </label>
          {attribute !== "" && attributeType !== "" ? (
            <Button
              variant="contained"
              onClick={pushAttributeInTemplateArray}
              value="add"
            >
              +
            </Button>
          ) : null}

          {attributeListCount > 1 ? (
            <Button
              variant="contained"
              onClick={pushAttributeInTemplateArray}
              sx={{ marginLeft: 2 }}
              value="remove"
            >
              -
            </Button>
          ) : null}
          <br></br>
          <br></br>

          {[...Array(attributeListCount)].map((e, i) => {
            return (
              <div key={i}>
                <Input
                  id="assetSubCat"
                  type="text"
                  size="small"
                  placeholder="Attribute"
                  onChange={(e) => setAttribute(e.target.value)}
                />
                {/* <Input
                  sx={{ marginLeft: 2 }}
                  id="assetSubCat"
                  type="text"
                  size="small"
                  placeholder="attribute type"
                  onChange={(e) => setAttributeType(e.target.value)}
                /> */}
                <Select
                  onChange={(e) => setAttributeType(e.target.value)}
                  variant="outlined"
                  size="small"
                  value={attributeType}
                  sx={{ width: "38%", marginLeft: 2 }}
                  displayEmpty
                >
                  <MenuItem value="">Attribute Type</MenuItem>
                  {["String", "Number"].map((elem) => (
                    <MenuItem key={elem} value={elem}>
                      {elem}
                    </MenuItem>
                  ))}
                </Select>
                <br></br>
                <br></br>
              </div>
            );
          })}

          <Button
            variant="contained"
            onClick={pushTemplateArray}
            sx={{ marginLeft: 2 }}
            value="remove"
          >
            Check
          </Button>
        </TabPanel>
        <TabPanel value="subcat">
          <label>Select Template</label>
          <Select
            size="small"
            sx={{ width: "100%" }}
            value={editAssetCat}
            onChange={handleSelectAssetCat}
          >
            {assetCategories.map((cat) => (
              <MenuItem value={cat._id}>{cat.asset_category}</MenuItem>
            ))}
          </Select>
        </TabPanel>
      </TabContext>
    </div>
  );
};

export default AddAssetMaster;
