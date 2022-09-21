import './App.css';
import React, {useEffect, useState} from "react";
import { Route, Routes, useNavigate } from 'react-router-dom';
import Login from './Pages/Login/Login';
import Users from './Pages/Users';
import Navbar from './Components/Navbar/Navbar';
import Dasboard from './Pages/Dashboard';
import Assets from './Pages/Assets';
import Tickets from './Pages/Tickets';
import AddTicket from './Components/Tickets/AddTicket';

const ProtectedRoute = ({children}) => {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  } , [token]);
  return children;
}

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const token = localStorage.getItem("token");
  useEffect(() => {
    if (!token) {
      setIsLoggedIn(false);
    }
  } , [token]);

  return (
    <div>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route element={<ProtectedRoute><Navbar/></ProtectedRoute>}>
          <Route path="/" element={<Dasboard/>} />
          <Route path="/users" element={<Users/>} />
          <Route path="/assets" element={<Assets/>} />
          <Route path="/tickets" element={<Tickets/>}>
            <Route path="/tickets/add" element={<AddTicket/>} />
          </Route>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
