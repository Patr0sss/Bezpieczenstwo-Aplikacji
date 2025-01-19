import styles from "./register.module.css";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useNavigate, Link } from "react-router-dom";

export default function Register() {
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);
  const [user, setUser] = useState({
    userName: "",
    password: "",
    repeatPassword: "",
  });
  const navigate = useNavigate();
  useEffect(() => {
    if (isLoggedIn) {
      navigate("/");
    }
  });

  const registerUser = async () => {
    const response = await fetch("http://localhost:3000/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({username: user.userName, password: user.password}),
    });
    const data = await response.json();

    if(response.status === 200) {
      navigate("/login");
    }

    if (data.error) {
      console.log(data.error);
    } 
   
  }
  return (
    <div className={styles.base}>
      <h1>Create An Account !</h1>
      <form 
      className={styles.loginForm}
      onSubmit={(e) => {
      e.preventDefault();
      registerUser();
    }}>
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

        <TextField
          label="Repeat Password"
          variant="outlined"
          type="password"
          className={styles.input}
          onChange={(e) => setUser({ ...user, repeatPassword: e.target.value })}
        />
        <Button variant="contained"  type="submit" className={styles.button}>
          Register
        </Button>
      </form>
      <Link to="/login">Login</Link>
    </div>
  );
}
