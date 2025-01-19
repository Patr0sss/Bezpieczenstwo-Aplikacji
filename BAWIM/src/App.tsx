import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/homePage/home";
import Login from "./pages/loginPage/login";
import Register from "./pages/registerPage/register";

export default function App() {

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
    </Routes>
  );
}
