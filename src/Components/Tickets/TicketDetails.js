import { CircularProgress, CardActionArea, Button } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { useParams } from "react-router-dom";

const TicketDetails = (props) => {
  const [ticket, setTicket] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const params = useParams();

  const accessToken = localStorage.getItem("token");

  const getTicket = () => {
    axios
      .get(`${process.env.REACT_APP_API}/admin/ticket/${params.id}`, {
        headers: {
          "access-token": `${accessToken}`,
        },
      })
      .then((res) => {
        console.log(res);
        setTicket(res.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setError(error);
        setLoading(false);
      });
  };

  useEffect(() => {
    getTicket();
  }, []);

  return (
    <div>
      {params.id == undefined ? (
        <Button variant="contained">Select a Ticket</Button>
      ) : (
        <div>
          {/* <Card className="ticket-details-box" >
            <CardActionArea>
              <CardMedia
                component="img"
                height="140"
                image="https://www.selec.com/apps/web-in/media/logos/seleclogo.png"
                alt="green iguana"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {params.id}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Lizards are a widespread group of squamate reptiles, with over
                  6,000 species, ranging across all continents except Antarctica
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card> */}
        </div>
      )}

      {/* <Button variant="text">Text</Button>
<Button variant="contained">Contained</Button>
<Button variant="outlined">Outlined</Button> */}
    </div>
  );
};

export default TicketDetails;
