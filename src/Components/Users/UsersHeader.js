import { Search } from "@mui/icons-material";
import { IconButton, InputAdornment, TextField, ThemeProvider, Typography } from "@mui/material";
//import create theme
import { createTheme } from '@mui/material/styles';
import React from "react";

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
    return (
        <ThemeProvider theme={headerTheme}>
        <div className="users-header">
        <Typography variant="h4" className="usersHeader-title">Users</Typography>
        <div>
        <label style={{fontSize: "1rem", fontWeight:"600"}}>Search:</label>
        <br></br>
            <TextField variant="outlined" 
            size="small"
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