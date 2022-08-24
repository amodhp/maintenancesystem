import React, { useEffect } from "react";
import "./login.css";
import { Alert, Button, Card, Chip, IconButton, InputAdornment, LinearProgress, Snackbar, TextField } from "@mui/material";
import PersonRoundedIcon from '@mui/icons-material/PersonRounded';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import logo from "./logo.png"
import { AccountCircle, Visibility, VisibilityOff, VpnKey } from "@mui/icons-material";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const theme = createTheme({
  palette: {
    primary: {
      main: "#000",
    },
    secondary: {
      main: "#000000",
    },

  },
});


const Login = () => {

  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [error, setError] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const navigate = useNavigate();
  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };
  const handleClickShowPassword = () => {
    setPassword({
      ...password,
      showPassword: !password.showPassword,
    });
  };
  const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
  }
  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  }
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    //login from env url
    setLoading(true);
    axios.post(`${process.env.REACT_APP_API}/login`, {
      username: username,
      password: password
    }).then(res => {
      console.log(res.data.access_token);
      localStorage.setItem("token", res.data.access_token);
      setLoading(false);
      navigate("/");
      
    }).catch(err => {
      setError("Invalid username or password");
      setLoading(false);
    }
    );

  }
  useEffect(() => {
    if (localStorage.getItem("token")) {
      navigate("/");
    }
  } , []);



    return (
      <ThemeProvider theme={theme}>
        <div className="login-background">
        {
          error && <Snackbar
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'center',
            }}
            open={true}
            autoHideDuration={5000}
            onClose={() => setError("")}
            message={error}
          />

        }
            <Card className="login-card">
            
            <form onSubmit={handleSubmit}>
            <div className="login-logo">
              <img src={logo} alt="logo"/>
              {loading && <LinearProgress />}
            </div>
              <div className="login-card-header">
                <h1>Login</h1>
              </div>
                <TextField 
                  label="User id" 
                  value={username}
                  onChange={handleUsernameChange}
                  placeholder="User Id" 
                  autoComplete='off'
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <AccountCircle style={{color: "#000"}}/>
                      </InputAdornment>
                    ),
                  }}
                />
                <br></br>
                <br></br>
                <TextField 
                  label="Password" 
                  value={password}
                  onChange={handlePasswordChange}
                  autoComplete='off'
                  placeholder="Password" 
                  type={password.showPassword ? 'text' : 'password'}
                  value={password.password}
                  InputProps={{
                    endAdornment:(
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {password.showPassword ? <VisibilityOff style={{color: "#000"}}/> : <Visibility style={{color: "#000"}}/>}
                </IconButton>
              </InputAdornment>
            )
                  }}
                />
                <br></br>
                <br></br>
                <button className="login-button" type="submit">
                  Login
                </button>
                </form>
            </Card>
        </div>
      </ThemeProvider>
    );
}
export default Login;