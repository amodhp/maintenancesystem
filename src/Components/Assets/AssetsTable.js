import React from "react";
import { Button, CircularProgress, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { Edit } from "@mui/icons-material";


const AssetsTable = (props) => {
    const {assets, setAssets, searchedAssets, setSearchedAssets, fetchAssets, loading} = props;
    return (
       <div style={{marginTop: "20px", borderRadius: "20px"}}>
        <TableContainer sx={{width: "100%", borderRadius: "20px"}} component={Paper}>
        <Table>
            <TableHead className="user-table-header"  style={{borderRadius: "20px"}}>
                <TableRow >
                    <TableCell sx={{fontSize: "1rem"}}><span className="asset-table-header">Name</span></TableCell>
                    <TableCell sx={{fontSize: "1rem"}}><span className="asset-table-header">Category</span></TableCell>
                    <TableCell sx={{fontSize: "1rem"}}><span className="asset-table-header">Loaction</span></TableCell>
                    <TableCell sx={{fontSize: "1rem"}}><span className="asset-table-header">Action</span></TableCell>
                </TableRow>
            </TableHead>
            <TableBody className="asset-table-body">
                {
                    loading ? (
                        <TableRow>
                            <TableCell colSpan={5} sx={{textAlign:"center"}}>
                                <CircularProgress />
                            </TableCell>
                        </TableRow>
                    ) : (
                        assets.map(asset => (
                            <TableRow key={asset._id}>
                                <TableCell>{asset.asset_name}</TableCell>
                                <TableCell>{asset.asset_category}</TableCell>
                                <TableCell>{asset.location}</TableCell>
                                <TableCell><Button><Edit style={{color: "black"}}/></Button></TableCell>
                            </TableRow>
                        ))
                    )
                }
            </TableBody>
        </Table>
        </TableContainer>
        
        </div>
    );
}
export default AssetsTable;