import axios from "axios";
import React, { useEffect, useState } from "react";
import AssetsHeader from "../Components/Assets/AssetsHeader";
import AssetsTable from "../Components/Assets/AssetsTable";

const Assets = () => {
  const [assets, setAssets] = useState([]);
  const [searchedAssets, setSearchedAssets] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const accessToken = localStorage.getItem("token");

  const fetchAssets = () => {
    setLoading(true);
    axios
      .get(`${process.env.REACT_APP_API}/admin/assets?page=1`, {
        headers: {
          "access-token": accessToken,
        },
      })
      .then((res) => {
        setSearchedAssets(res.data);
        setAssets(res.data);
        setLoading(false);
        console.log("Assets", res.data);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchAssets();
  }, []);

  return (
    <div>
      <AssetsHeader
        assets={assets}
        setAssets={setAssets}
        searchedAssets={searchedAssets}
        setSearchedAssets={setSearchedAssets}
        fetchAssets={fetchAssets}
      />
      <AssetsTable assets={searchedAssets} loading={loading} />
    </div>
  );
};

export default Assets;
