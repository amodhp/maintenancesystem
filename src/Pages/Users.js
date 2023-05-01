import React, { useEffect, useState } from "react";
import "../Components/Users/users.css";
import axios from "axios";
import UsersHeader from "../Components/Users/UsersHeader";
import UsersTable from "../Components/Users/UsersTable";

const Users = () => {
    const [users, setUsers] = useState([]);
    const [searchedUsers, setSearchedUsers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const accessToken = localStorage.getItem("token");
    
    
   const fetchUsers = () => {
    setLoading(true);
    axios.get(`${process.env.REACT_APP_API}/admin`, {
        headers: {
            "access-token": accessToken
        }
    }).then(res => {
        setSearchedUsers(res.data.users);
        setUsers(res.data.users);
        setLoading(false);
    }).catch(err => {
        setError(err.message);
        setLoading(false);
    }
    );
    }

    useEffect(() => {
        fetchUsers(accessToken, "admin");
    } , []);

    return (
        <div>
        <UsersHeader users={users} setUsers={setUsers} searchedUsers={searchedUsers} setSearchedUsers={setSearchedUsers} fetchUsers={fetchUsers} />
        <UsersTable users={searchedUsers} loading={loading}/>
        </div>
    );
}
export default Users;