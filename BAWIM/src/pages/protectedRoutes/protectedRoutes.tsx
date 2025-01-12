import { RootState } from "../../redux/store";
import { useSelector } from "react-redux";
import { NavLink, Outlet } from "react-router-dom";
import styles from "./protectedRoutes.module.css";

const ProtectedRoutes = () => {
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);

  if (!isLoggedIn) {
    return (
      <div className={styles.protectedRoutes}>
        <h1>Brak Uprawnień</h1>
        <h2>
          <NavLink to="/login" className={styles.loginToGetAccess}>
            Zaloguj Się Aby Uzyskać Dostęp
          </NavLink>
        </h2>
      </div>
    );
  }
  return <Outlet />;
};
export default ProtectedRoutes;
