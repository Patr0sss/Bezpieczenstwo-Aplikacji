import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/homePage/home";
import Login from "./pages/loginPage/login";
import Register from "./pages/registerPage/register";
// import { useEffect } from "react";
// import io from "socket.io-client";

export default function App() {

  // useEffect(() => {
  //   const socket = io('http://localhost:3002')
  // // Emitting an event to the backend
  // socket.emit('connectionasddsads', { data: 'your data' });
  
  // // Cleanup on component unmount
  // return () => {
  //   socket.disconnect();
  // };
  // }, [])
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
    </Routes>
  );
}
