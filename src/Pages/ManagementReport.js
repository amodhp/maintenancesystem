import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { StaticDatePicker } from "@mui/x-date-pickers/StaticDatePicker";
import Badge from "@mui/material/Badge";
import { PickersDay } from "@mui/x-date-pickers/PickersDay";
import CheckIcon from "@mui/icons-material/Check";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import Button from "@mui/material/Button";
import moment from "moment";
import axios from "axios";
import fs from "fs";
import fileSaver from 'file-saver';

const MangementReport = () => {
  //  const [assets, setAssets] = useState([]);
  //  const [searchedAssets, setSearchedAssets] = useState([]);
  //  const [loading, setLoading] = useState(false);
  //  const [error, setError] = useState(null);
  const accessToken = localStorage.getItem("token");

  const fetchReport = (f, s) => {
    // setLoading(true);
    console.log("Hello");
    console.log(f, s);
    axios({
      method: "get",
      responseType: 'arraybuffer',

      url: `${process.env.REACT_APP_API}/admin/export-Ticket`,

      data: {
        firstdate: f,
        seconddate: s,
      },
      headers: {
        "access-token": `${accessToken}`,
      },
    })
      .then((response) => {
        const dirtyFileName = response.headers["content-disposition"];
        const regex =
          /filename[^;=\n]*=(?:(\\?['"])(.*?)\1|(?:[^\s]+'.*?')?([^;\n]*))/;
        var fileName = dirtyFileName

        var blob = new Blob([response.data], {
          type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        });
        fileSaver.saveAs(blob, fileName);
      })

      .catch((error) => {
        console.log(error);
      });
  };

  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  return (
    <>
      <div>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DatePicker
            label="Choose Start Date"
            value={startDate}
            onChange={(newValue) => {
              setStartDate(newValue);
            }}
            renderInput={(params) => (
              <TextField style={{ marginRight: 20 }} {...params} />
            )}
          />
        </LocalizationProvider>

        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DatePicker
            label="Choose End Date"
            value={endDate}
            onChange={(newValue) => {
              setEndDate(newValue);
            }}
            renderInput={(params) => <TextField {...params} />}
          />
        </LocalizationProvider>
      </div>

      <Button
        style={{ marginLeft: 20 }}
        onClick={() =>
          fetchReport(
            moment(startDate).format("YYYY-MM-DD"),
            moment(endDate).format("YYYY-MM-DD")
          )
        }
        variant="contained"
      >
        Generate Excel Report
      </Button>
    </>
  );
};

export default MangementReport;
