import styles from "./register.module.css";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { useEffect } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useNavigate, Link } from "react-router-dom";

export default function Register() {
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);
  const navigate = useNavigate();
  useEffect(() => {
    if (isLoggedIn) {
      navigate("/");
    }
  });

  return (
    <div className={styles.base}>
      <h1>Create An Account !</h1>
      <form className={styles.loginForm}>
        <TextField
          id="filled-basic"
          label="Username"
          variant="outlined"
          type="text"
          className={styles.input}
          // onChange={(e) => setUser({ ...user, userName: e.target.value })}
        />

        <TextField
          id="filled-basic"
          label="Password"
          variant="outlined"
          type="password"
          className={styles.input}
          // onChange={(e) => setUser({ ...user, password: e.target.value })}
        />

        <TextField
          id="filled-basic"
          label="Repeat Password"
          variant="outlined"
          type="password"
          className={styles.input}
          // onChange={(e) => setUser({ ...user, password: e.target.value })}
        />
        <Button variant="contained" type="submit" className={styles.button}>
          Login
        </Button>
      </form>
      <Link to="/login">Login</Link>
    </div>
  );
}
