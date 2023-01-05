import { Button, MenuItem, Paper, Select, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from '@mui/material';
import React, { useState } from 'react';

const AddAssetMaster = (props) => {
    const {assetCategories}=props;
    const [addAssetCatOrSubCat, setAddAssetCatOrSubCat] = useState("cat");

    return (
        <div style={{height: "100%"}}>
            <TableContainer sx={{ width: "100%", height: "100%" }} >
            <Table>
                                      <TableHead>
                                            <TableRow>
                                                <TableCell>
                                                <Button variant="contained" color="primary"
                                                onClick={() => setAddAssetCatOrSubCat("cat")}
                                                >Add Asset Category</Button>
                                                <Button variant="contained" color="primary" 
                                                onClick={() => setAddAssetCatOrSubCat("subcat")}
                                                >Add Asset Sub Category</Button>
                                                </TableCell>
                                            </TableRow>
                                        </TableHead>          
                                        <TableBody>
                                        {addAssetCatOrSubCat=="cat" ? (
                                            <TableRow>
                                                <TableCell>
                                                    <input type="text" placeholder="Enter Asset Category" />
                                                    <Button variant="contained" color="primary">Add</Button>
                                                    </TableCell>
                                                    </TableRow>
                                                    ) : (
                                                        <TableRow>
                                                            <TableCell>
                                                                <label>Select Asset Category</label>
                                                                <Select size='small' sx={{width: "100%"}}>
                                                                    {assetCategories.map((cat) => (
                                                                        <MenuItem value={cat.id}>{cat.asset_category}</MenuItem>
                                                                    ))}
                                                                </Select>
                                                            </TableCell>
                                                        </TableRow>
                                                    )}

                                        </TableBody>                              
                               </Table>
                               </TableContainer>
        </div>
    );
}

export default AddAssetMaster;