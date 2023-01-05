import { Button, MenuItem, OutlinedInput, Paper, Select, Tab, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Tabs } from '@mui/material';
import { Box } from '@mui/system';
import TabPanel from '@mui/lab/TabPanel';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';

import React, { useState } from 'react';

const AddAssetMaster = (props) => {
    const { assetCategories, editAssetCat, addAssetCatOrSubCat, setAddAssetCatOrSubCat, setEditAssetCat } = props;
    const [assetCat, setAssetCat] = useState('');
    const [assetListCount, setAssetListCount] = useState(1);
    const handleSelectAssetCat = (e) => {
        setEditAssetCat(e.target.value);
    }
    const handleAssetListCount = (e) => {
        if(e.target.value == "add"){
            setAssetListCount(assetListCount + 1);
        }else{
            setAssetListCount(assetListCount - 1);
        }
    }

    

    return (
        <div>
            <TabContext value={addAssetCatOrSubCat}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <TabList onChange={(e, v) => setAddAssetCatOrSubCat(v)} aria-label="lab API tabs example">
                        <Tab label="Asset Category" value="cat" />
                        <Tab label="Asset Sub Category" value="subcat" />
                    </TabList>
                </Box>
                <TabPanel value="cat">
                {/* {
    "asset_category":"Electric Infra",
    "asset_list":["mouse","projector"]
} */}
                    <label htmlFor="assetCat">Asset Category </label>
                    <OutlinedInput id="assetCat" type="text" size='small' />
                    <br></br>
                    <br></br>
                    <label htmlFor="assetSubCat">Asset Sub Category </label>
                    <Button variant="contained" onClick={handleAssetListCount} value="add">+</Button>
                    {assetListCount > 1 ? <Button variant="contained" onClick={handleAssetListCount} value="remove">-</Button> : null}
                    <br></br>
                    <br></br>

                    {
                        [...Array(assetListCount)].map((e, i) => {
                            return (
                                <div key={i}>
                                <OutlinedInput id="assetSubCat" type="text" size='small' />
                                <br></br>
                                </div>
                            )
                        }
                        )
                    }
                </TabPanel>
                <TabPanel value="subcat">
                <label>Select Asset Category</label>
                                <Select size='small' sx={{ width: "100%" }} value={editAssetCat} onChange={handleSelectAssetCat}>
                                    {assetCategories.map((cat) => (
                                        <MenuItem value={cat._id}>{cat.asset_category}</MenuItem>
                                    ))}
                                </Select>
                </TabPanel>
            </TabContext>


        </div>
    );
}

export default AddAssetMaster;