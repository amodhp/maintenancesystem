import { Button, MenuItem, Paper, Select, Skeleton, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import AddAssetMaster from '../../Components/Assets/AddAssetMaster';
import '../../Components/Assets/assetMaster.css';


// {{url}}admin/assetCategory

const AssetsMaster = () => {
    const authToken = localStorage.getItem("token");
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(0);
    const [addAssetCatOrSubCat, setAddAssetCatOrSubCat] = useState("cat");
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [assetCategories, setAssetCategories] = useState([]);

    // function to handle pagination
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    // function to handle the number of rows per page
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };



    const fecthAssetsCategories = () => {
        axios.get(`${process.env.REACT_APP_API}/admin/assetCategory`, {
            headers: {
                "access-token": authToken
            }
        }).then(res => {
            console.log(res.data);
            setLoading(false);
            setAssetCategories(res.data);
        }).catch(err => {
            console.log(err);
        })
    }
    useEffect(() => {
        fecthAssetsCategories();
    }, []);


    return (
        <div style={{ width: "100%" }}>
            <h1 style={{ textAlign: "center"}}>Assets Master</h1>
            <TableContainer sx={{  overflowX: "hidden", width: "99%", }} component={Paper}>
                <Table>
                    <TableBody>
                        <TableRow>
                            <TableCell sx={{width: "50%", height: "100%"}}>
                               <AddAssetMaster assetCategories={assetCategories} />
                            </TableCell>
                            <TableCell>
                    <Table sx={{border: "2px solid black"}}>
                    <TableHead className='asset-master-table-head'>
                        <TableRow>
                            <TableCell sx={{fontColor: "#fff"}}><span className="asset-master-table-header">Assets Category</span></TableCell>
                            <TableCell sx={{fontColor: "#fff"}}><span className="asset-master-table-header">Assets List</span></TableCell>
                            <TableCell sx={{fontColor: "#fff"}}><span className="asset-master-table-header">Action</span></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        { loading ? 
                        <>
                            <TableRow>
                                <TableCell><Skeleton  /></TableCell>
                                <TableCell>
                                    <Skeleton  />
                                    <Skeleton  />
                                    <Skeleton  />
                                </TableCell>
                                <TableCell><Skeleton  /></TableCell>
                            </TableRow>
                            <TableRow>
                                 <TableCell><Skeleton  /></TableCell>
                                 <TableCell>
                                    <Skeleton />
                                    <Skeleton />
                                    <Skeleton />
                                </TableCell>
                                 <TableCell><Skeleton  /></TableCell>
                            </TableRow>
                            <TableRow>
                                 <TableCell><Skeleton  /></TableCell>
                                 <TableCell>
                                    <Skeleton  />
                                    <Skeleton  />
                                    <Skeleton  />
                                </TableCell>
                                 <TableCell><Skeleton  /></TableCell>
                            </TableRow>
                            <TableRow>
                                 <TableCell><Skeleton  /></TableCell>
                                 <TableCell>
                                    <Skeleton  />
                                    <Skeleton  />
                                    <Skeleton  />
                                </TableCell>
                                 <TableCell><Skeleton  /></TableCell>
                            </TableRow>
                        </>

                        : 
                        assetCategories.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((assetCategory) => ( 
                            <TableRow key={assetCategory._id}>
                                <TableCell sx={{fontSize: "1.2rem"}}>{assetCategory.asset_category}</TableCell>
                                <TableCell>
                                    <ul >
                                        {assetCategory.asset_list.map((asset) => (
                                            <li style={{fontSize: "1rem"}} key={asset._id}>{asset.asset_name}</li>
                                        ))}
                                    </ul>
                                </TableCell>
                                <TableCell>
                                    <Button variant="contained" size="small" sx={{margin:"5px"}}>Edit</Button>
                                    <Button variant="contained" color="secondary" size="small" sx={{margin:"5px"}}>Delete</Button>
                                </TableCell>
                            </TableRow>
                        ))}

                    </TableBody>
                </Table>
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[10, 25, 100]}
                component="div" 
                count={assetCategories.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />

        </div>
    );
}


export default AssetsMaster;