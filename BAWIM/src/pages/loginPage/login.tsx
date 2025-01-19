import styles from "./login.module.css";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import { userLogin } from "../../redux/auth/authActions";
import { useNavigate, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

export default function Login() {
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);
  const [user, setUser] = useState({ userName: "", password: "" });

  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(userLogin({ username: user.userName, password: user.password }));
    // if (isLoggedIn) {
    //   navigate("/");
    // }
  };

  useEffect(() => {
    if (isLoggedIn) {
      navigate("/");
    }
  });

  return (
    <div className={styles.base}>
      <h1>Welcome Back !</h1>
      <form onSubmit={handleLogin} className={styles.loginForm}>
        <TextField
          label="Username"
          variant="outlined"
          type="text"
          className={styles.input}
          onChange={(e) => setUser({ ...user, userName: e.target.value })}
        />

        <TextField
          label="Password"
          variant="outlined"
          type="password"
          className={styles.input}
          onChange={(e) => setUser({ ...user, password: e.target.value })}
        />
        <Button variant="contained" type="submit" className={styles.button}>
          Login
        </Button>
      </form>
      <Link to="/register">Register</Link>
    </div>
  );
}
