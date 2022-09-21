import { Add, Search } from "@mui/icons-material";
import { Button, IconButton, InputAdornment, TextField, ThemeProvider, Typography } from "@mui/material";
import { createTheme } from '@mui/material/styles';
import React, {useState} from "react";
import AddUser from "./AddUser";

const headerTheme = createTheme({
    palette: {
        primary: {
            main: "#000",
        },
        secondary: {
            main: "#000000",
        },
    },
});


const UsersHeader = (props) => {
    const{users, setUsers, searchedUsers, setSearchedUsers, fetchUsers} = props;
    const [search, setSearch] = useState("");
    const AllUsers = users;


    const handleSearch = (e) => {
        setSearch(e.target.value);
        const searchedUsers = AllUsers.filter(user => user.username.toLowerCase().includes(e.target.value.toLowerCase()) || user.first_name.toLowerCase().includes(e.target.value.toLowerCase()) || user.last_name.toLowerCase().includes(e.target.value.toLowerCase()) || user.email_id.toLowerCase().includes(e.target.value.toLowerCase()));
        setSearchedUsers(searchedUsers);
    }


    
    return (
        <ThemeProvider theme={headerTheme}>
        <div  className="users-header">
        <Typography variant="h4" className="usersHeader-title">Users</Typography>
        <div className="add-user-button"><AddUser fetchUsers={fetchUsers}/></div>
        <div className="search-user-input">
        <label style={{fontSize: "1rem", fontWeight:"600"}}>Search:</label>
            <TextField variant="outlined" 
            size="small"
            onChange={handleSearch}
            value={search}
            InputProps={{ 
                endAdornment:(
                    <InputAdornment position="end">
                        <IconButton>
                            <Search />
                        </IconButton>
                    </InputAdornment>
            )}}
            />
        </div>
        </div>
        </ThemeProvider>
    );
    }
export default UsersHeader;