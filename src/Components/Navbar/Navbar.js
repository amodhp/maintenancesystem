import * as React from 'react';
import { useState } from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import { AccountCircle, AddLocation, AddLocationAlt, Category, ConfirmationNumber, Dashboard, Group, LibraryAdd } from '@mui/icons-material';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import "./navbar.css";
import { createTheme, makeStyles, Menu, MenuItem } from '@mui/material';
import logo from "./logo.png";
import { ThemeProvider } from '@emotion/react';


const drawerWidth = 240;

const openedMixin = (theme) => ({
    width: drawerWidth,
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: 'hidden',
});

const closedMixin = (theme) => ({
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: `calc(${theme.spacing(7)} + 1px)`,
    [theme.breakpoints.up('sm')]: {
        width: `calc(${theme.spacing(8)} + 1px)`,
    },
});

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: 'nowrap',
        boxSizing: 'border-box',
        ...(open && {
            ...openedMixin(theme),
            '& .MuiDrawer-paper': openedMixin(theme),
        }),
        ...(!open && {
            ...closedMixin(theme),
            '& .MuiDrawer-paper': closedMixin(theme),
        }),
    }),
);
const NavTheme = createTheme({
    palette: {
        primary: {
            main: "#000",
        },
        secondary: {
            main: "#000000",
        },
    },
});
export default function Navbar() {
    const theme = useTheme();
    const [open, setOpen] = React.useState(false);
    const [anchorEl, setAnchorEl] = useState(null);
    const [menuState, setMenuState] = useState(false);
    const navigate = useNavigate();

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };
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

    return (
        <Box sx={{ display: 'flex', marginTop: "5rem", marginLeft: "1rem" }}>
            <CssBaseline />
            <AppBar position="fixed" open={open} style={{ height: "4rem" }}>
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        edge="start"
                        sx={{
                            marginRight: 5,
                            ...(open && { display: 'none' }),
                        }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <img src={logo} alt="logo" className="nav-img" />
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
                        <MenuItem onClick={() => { }}>Profile</MenuItem>
                        <MenuItem onClick={handleLogout}>Log out</MenuItem>
                    </Menu>
                </Toolbar>
            </AppBar>
            <ThemeProvider theme={NavTheme}>
                <Drawer variant="permanent" open={open} className="drawer">
                    <DrawerHeader  >
                        <IconButton onClick={handleDrawerClose}>
                            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
                        </IconButton>
                    </DrawerHeader>
                    <List >
                    <h3
                style={{
                  ...(!open && { display: "none" }),
                  marginTop: "0",
                  marginBottom: "0",
                  marginLeft: "0.8rem",
                }}
              >
                Admin Panel
              </h3>
                        <Link to="/" className='nav-link'>
                            <ListItem button  style={{ paddingTop: "0", paddingBottom: "0" }}>
                                <ListItemIcon>
                                    <Dashboard />
                                </ListItemIcon>
                                <ListItemText primary="Dashboard" />
                            </ListItem>
                        </Link>
                        <Link to="/users" className='nav-link'>
                            <ListItem button style={{ paddingTop: "0", paddingBottom: "0" }}>
                                <ListItemIcon>
                                    <Group />
                                </ListItemIcon>
                                <ListItemText primary="Users" />
                            </ListItem>
                        </Link>
                        <Link to="/assets" className='nav-link'>
                            <ListItem button style={{ paddingTop: "0", paddingBottom: "0" }}>
                                <ListItemIcon>
                                    <Category />
                                </ListItemIcon>
                                <ListItemText primary="Assets" />
                            </ListItem>
                        </Link>
                        <Link to="/tickets" className='nav-link'>
                            <ListItem button style={{ paddingTop: "0", paddingBottom: "0" }}>
                                <ListItemIcon>
                                    <ConfirmationNumber />
                                </ListItemIcon>
                                <ListItemText primary="Tickets" />
                            </ListItem>
                        </Link>
                    </List>
                    <Divider />
                    <List>
                        <h3
                            style={{
                                ...(!open && { display: "none" }),
                                marginTop: "0",
                                marginBottom: "0",
                                marginLeft: "0.8rem",
                            }}
                        >
                            Add
                        </h3>
                        <Link to="/tickets/add" className='nav-link'>
                            <ListItem button style={{ paddingTop: "0", paddingBottom: "0" }}>
                                <ListItemIcon>
                                    <LibraryAdd />
                                </ListItemIcon>
                                <ListItemText primary="Add Ticket" />
                            </ListItem>
                        </Link>
                        <Link to="/add-location" className='nav-link'>
                            <ListItem button style={{ paddingTop: "0", paddingBottom: "0" }}>
                                <ListItemIcon>
                                    <AddLocationAlt />
                                </ListItemIcon>
                                <ListItemText primary="Add Location" />
                            </ListItem>
                        </Link>
                    </List>
                    <Divider sx={{ backgroundColor: "#fff" }} />
                </Drawer>
            </ThemeProvider>
            <Outlet />
        </Box>
    );
}
