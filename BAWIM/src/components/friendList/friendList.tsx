import styles from "./friendList.module.css";
import { friendType } from "../../types";
import SearchIcon from "@mui/icons-material/Search";
import { useEffect, useState, type Dispatch, type SetStateAction } from "react";
import LogoutIcon from "@mui/icons-material/Logout";
import { userLogout } from "../../redux/auth/authActions";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import { getUsers } from "../../redux/users/usersActions";

export default function FriendList({
  currentFriend,
  setCurrentFriend,
}: {
  currentFriend: friendType | null;
  setCurrentFriend: Dispatch<SetStateAction<friendType | null>>;
}) {
  const [searchedFriends, setSearchedFriends] = useState<string>("");
  const dispatch = useDispatch<AppDispatch>();
  const friendsRedux = useSelector((state: RootState) => state.users.users);
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);


  useEffect(() => {
    if (isLoggedIn) {
      dispatch(getUsers());
    }
  },[]);

  return (
    <div className={styles.friendList}>
      <SearchBar setSearchValue={setSearchedFriends} />
      <div className={styles.friendBarContainer}>
        {friendsRedux
          .filter((friend) => friend.username.includes(searchedFriends))
          .map((friend) => (
            <FriendBar
              key={friend.user_id}
              friend={friend}
              currentFriend={currentFriend}
              onClick={() => setCurrentFriend(friend)}
            />
          ))}
      </div>
    </div>
  );
}

const SearchBar = ({
  setSearchValue,
}: {
  setSearchValue: Dispatch<SetStateAction<string>>;
}) => {
  const username = useSelector((state: RootState) => state.auth.userInfo.username as string);
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const handleLogout = () => {
    dispatch(userLogout());
    navigate("/login");
  };

  return (
    <>
      <div className={styles.username}>
        {username}
        <LogoutIcon className={styles.logoutButton} onClick={handleLogout} />
      </div>
      <div className={styles.searchBar}>
        <button className={styles.searchButton}>
          <SearchIcon style={{ color: "darkGray" }} />
        </button>
        <input
          onChange={(e) => setSearchValue(e.target.value)}
          type="text"
          placeholder="Search..."
          className={styles.searchInput}
        />
      </div>
    </>
  );
};

const FriendBar = ({
  friend,
  currentFriend,
  onClick,
}: {
  friend: friendType;
  currentFriend: friendType | null;
  onClick: () => void;
}) => {
  return (
    <div
      className={styles.friendBar}
      onClick={onClick}
      style={{
        backgroundColor: currentFriend?.username === friend.username ? "lightgray" : "",
      }}
    >
      <img
        src={
          friend.user_id %2 === 0
            ? "./images/maleUser.jpg"
            : "./images/femaleUser.jpg"
        }
        className={styles.userImage}
      ></img>
      <div className={styles.friendInfo}>
        <div>{friend.username}</div>
        <div className={styles.status}>
          <div
            className={styles.statusIcon}
            style={{
              backgroundColor: "green",
            }}
          ></div>
          online
        </div>
      </div>
    </div>
  );
};
