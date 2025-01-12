import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/homePage/home";
import Login from "./pages/loginPage/login";
import Register from "./pages/registerPage/register";
import ProtectedRoutes from "./pages/protectedRoutes/protectedRoutes";

export default function App() {
  return (
    <Routes>
      <Route element={<ProtectedRoutes />}>
        <Route path="/" element={<Home />} />
      </Route>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
    </Routes>
  );
}
