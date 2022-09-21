import React from "react";
import { Button, CircularProgress, Paper, Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";
import { Edit } from "@mui/icons-material";


const AssetsTable = (props) => {
    const {assets, setAssets, searchedAssets, setSearchedAssets, fetchAssets, loading} = props;
    return (
       <div style={{marginTop: "20px", borderRadius: "20px"}}>
        
        <Table sx={{minWidth: "50vw"}}
        >
            <TableHead className="user-table-header"  style={{borderRadius: "20px"}}>
                <TableRow >
                    <TableCell sx={{fontSize: "1rem"}}>Name</TableCell>
                    <TableCell sx={{fontSize: "1rem"}}>Category</TableCell>
                    <TableCell sx={{fontSize: "1rem"}}>Loaction</TableCell>
                    <TableCell sx={{fontSize: "1rem"}}>Action</TableCell>
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
        
        </div>
    );
}
export default AssetsTable;