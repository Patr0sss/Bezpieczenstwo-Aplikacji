import styles from "./home.module.css";
import { RootState } from "../../redux/store";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import FriendList from "../../components/friendList/friendList";
import friends from "./friends";
import FriendChat from "../../components/friendChat/friendChat";
import { friendType } from "../../types";

export default function Home() {
  const [currentFriend, setCurrentFriend] = useState<friendType | null>(null);
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/login");
    }
  });

  return (
    <div className={styles.base}>
      <FriendList
        friends={friends}
        currentFriend={currentFriend}
        setCurrentFriend={setCurrentFriend}
      />
      <FriendChat currentFriend={currentFriend} />
    </div>
  );
}
