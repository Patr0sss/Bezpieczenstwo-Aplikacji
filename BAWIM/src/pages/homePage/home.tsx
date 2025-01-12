import styles from "./home.module.css";
import { userLogout } from "../../redux/auth/authActions";
import { AppDispatch, RootState } from "../../redux/store";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);
  const username = useSelector(
    (state: RootState) => state.auth.userInfo.username
  );

  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const handleLogout = () => {
    dispatch(userLogout());
    navigate("/login");
  };
  return (
    <div className={styles.base}>
      <h1>Home of {username}</h1>
      <h2>{isLoggedIn ? "Zalogowano" : "Wylogowano"}</h2>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}
