import { AccountCircle } from "@mui/icons-material";
import { AppBar, Box, IconButton, Typography } from "@mui/material";
import React, {useState, useEffect} from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import logo from "./logo.png";
import "./navbar.css";
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';

const Navbar = () => {
    const [menuState, setMenuState] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);
    const [currentPage, setCurrentPage] = useState("");
    
    const navigate = useNavigate();

    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
        setMenuState(true);
    }
    const handleClose = () => {
        setAnchorEl(null);
        setMenuState(false);
    }
    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/login");
    }
   const currentPageHandler = (page) => {
         setCurrentPage(page);
    }
    
    let activeStyle = {
        backgroundColor:"#ffffffa6",
        borderRadius: "0.5rem",
      };


    return (
        <div>
            <AppBar position="static">
                <Box display="flex" flexGrow={1} alignItems="center">
                
                <img src={logo} alt="logo" className="nav-img"/>
                    
                        <NavLink to="/" className="nav-link" 
                        style={({ isActive }) =>isActive ? activeStyle : undefined}
                        >
                            Dashboard
                        </NavLink>
                   
                        <NavLink to="/users" className="nav-link" 
                        style={({ isActive }) =>isActive ? activeStyle : undefined}
                        >
                            Users
                        </NavLink>
                    
                        <NavLink to="/assets" className="nav-link" 
                        style={({ isActive }) =>isActive ? activeStyle : undefined}
                        >
                            Assets
                        </NavLink>
                    <IconButton
                        color="inherit"
                        aria-label="menu"
                        className="nav-menu-icon"
                        onClick={handleMenu}
                        sx={{
                            marginLeft: "auto"
                        }}
                    >
                        <AccountCircle />
                    </IconButton>
                    <Menu
                        id="menu-appbar"
                        anchorEl={anchorEl}

                        anchorOrigin={{
                            vertical: "bottom",
                            horizontal: "right",
                        }}
                        transformOrigin={{
                            vertical: "top",
                            horizontal: "right",
                        }}

                        open={menuState}
                        onClose={handleClose}

                    >
                        <MenuItem onClick={() => {}}>Profile</MenuItem>
                        <MenuItem onClick={handleLogout}>Log out</MenuItem>
                    </Menu>

                            
                    
                </Box>


            </AppBar>

            <Outlet/>
        </div>
    );
}
export default Navbar;