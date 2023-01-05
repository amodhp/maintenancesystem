import React, { useState } from "react";
import { createTheme } from '@mui/material/styles';
import { IconButton, InputAdornment, Paper, TextField, Typography } from "@mui/material";
import { Search } from "@mui/icons-material";
import { ThemeProvider } from "@emotion/react";
import "./assets.css";
import AddAsset from "./AddAsset";


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

const AssetsHeader = (props) => {
    const {assets, setAssets, searchedAssets, setSearchedAssets, fetchAssets} = props;
    const [search, setSearch] = useState("");
    const AllAssets = assets;
    const handleSearch = (e) => {
        console.log(e.target.value);
        setSearch(e.target.value);
        const searchedAssets = AllAssets.filter(asset => asset.asset_name.toLowerCase().includes(e.target.value.toLowerCase()) || asset.asset_category.toLowerCase().includes(e.target.value.toLowerCase()) || asset.location.toLowerCase().includes(e.target.value.toLowerCase()) );
        setSearchedAssets(searchedAssets);
    }
    
    return (
        <ThemeProvider theme={headerTheme}>
        <div className="assets-header">
            <Paper className="assets-header-paper" sx={{width: "100%", backgroundColor: "inherit"}} elevation={0} width="100%">
            <Typography variant="h4" className="assetsHeader-title">Assets</Typography>
            <div className="add-asset-button"><AddAsset fetchAssets={fetchAssets}/></div>
            <div className="search-asset-input">
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
            </Paper>
        </div>
        </ThemeProvider>
    );

}
export default AssetsHeader;