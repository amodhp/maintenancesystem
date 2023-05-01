import { Edit } from "@mui/icons-material";
import {
  Button,
  CircularProgress,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import React from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import { red } from "@mui/material/colors";
import axios from "axios";
const UsersTable = (props) => {
  const { users, loading } = props;
  const accessToken = localStorage.getItem("token");
  const deleteUser = (id) => {
    axios({
      method: "delete",
      url: `${process.env.REACT_APP_API}/admin/delete_user/${id}`,
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

  return (
    <div style={{ marginTop: "20px", borderRadius: "20px" }}>
      <TableContainer
        sx={{ width: "100%", borderRadius: "20px" }}
        component={Paper}
      >
        <Table sx={{ minWidth: "50vw" }}>
          <TableHead
            className="user-table-header"
            style={{ borderRadius: "20px" }}
          >
            <TableRow>
              <TableCell sx={{ fontSize: "1rem" }}>
                <span className="user-table-header">Name</span>
              </TableCell>
              <TableCell sx={{ fontSize: "1rem" }}>
                <span className="user-table-header"> Role</span>
              </TableCell>
              <TableCell sx={{ fontSize: "1rem" }}>
                <span className="user-table-header">Phone Number</span>
              </TableCell>
              <TableCell sx={{ fontSize: "1rem" }}>
                <span className="user-table-header">Email</span>
              </TableCell>
              <TableCell sx={{ fontSize: "1rem" }}>
                <span className="user-table-header">Action</span>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody className="user-table-body">
            {loading ? (
              <TableRow>
                <TableCell colSpan={5} sx={{ textAlign: "center" }}>
                  <CircularProgress />
                </TableCell>
              </TableRow>
            ) : (
              users.map((user) => (
                <TableRow key={user._id}>
                  <TableCell>{user.first_name}</TableCell>
                  <TableCell>{user.role.name}</TableCell>
                  <TableCell>{user.mobile_phone}</TableCell>
                  <TableCell>{user.email_id}</TableCell>
                  <TableCell>
                    {" "}
                    <DeleteIcon
                      sx={{ color: red[500] }}
                      onClick={() => deleteUser(user._id)}
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
export default UsersTable;
