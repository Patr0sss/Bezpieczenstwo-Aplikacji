import styles from "./friendList.module.css";
import { friendType } from "../../types";
import SearchIcon from "@mui/icons-material/Search";
import { useState, type Dispatch, type SetStateAction } from "react";
import LogoutIcon from "@mui/icons-material/Logout";
import { userLogout } from "../../redux/auth/authActions";
import { AppDispatch, RootState } from "../../redux/store";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function FriendList({
  friends,
  currentFriend,
  setCurrentFriend,
}: {
  friends: friendType[];
  currentFriend: friendType | null;
  setCurrentFriend: Dispatch<SetStateAction<friendType | null>>;
}) {
  const [searchedFriends, setSearchedFriends] = useState<string>("");
  return (
    <div className={styles.friendList}>
      <SearchBar setSearchValue={setSearchedFriends} />
      <div className={styles.friendBarContainer}>
        {friends
          .filter((friend) => friend.name.includes(searchedFriends))
          .map((friend) => (
            <FriendBar
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
        backgroundColor: currentFriend?.name === friend.name ? "lightgray" : "",
      }}
    >
      <img
        src={
          friend.sex === "male"
            ? "./images/maleUser.jpg"
            : "./images/femaleUser.jpg"
        }
        className={styles.userImage}
      ></img>
      <div className={styles.friendInfo}>
        <div>{friend.name}</div>
        <div className={styles.status}>
          <div
            className={styles.statusIcon}
            style={{
              backgroundColor: friend.status === "online" ? "green" : "red",
            }}
          ></div>
          {friend.status}
        </div>
      </div>
    </div>
  );
};
