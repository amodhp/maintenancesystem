import React, { useEffect } from "react";
import "../Components/Users/users.css";
import axios from "axios";
import UsersHeader from "../Components/Users/UsersHeader";
import UsersTable from "../Components/Users/UsersTable";

const Users = () => {
    const [users, setUsers] = React.useState([]);
    const [loading, setLoading] = React.useState(false);
    const [error, setError] = React.useState(null);
    const accessToken = localStorage.getItem("token");
    
    
   const fetchUsers = () => {
    setLoading(true);
    axios.get(`${process.env.REACT_APP_API}/admin`, {
        headers: {
            "access-token": accessToken
        }
    }).then(res => {
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
        <UsersHeader/>
        <UsersTable users={users} loading={loading}/>
        </div>
    );
}
export default Users;