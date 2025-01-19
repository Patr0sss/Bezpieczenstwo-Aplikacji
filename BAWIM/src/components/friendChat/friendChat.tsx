import { friendType, messageType } from "../../types";
import styles from "./friendChat.module.css";
import PhotoCameraFrontIcon from "@mui/icons-material/PhotoCameraFront";
import SendIcon from "@mui/icons-material/Send";
import messages from "../../pages/homePage/mockMessages";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { useEffect, useRef, useState, type Dispatch, type SetStateAction } from "react";

export default function FriendChat({
  currentFriend,
}: {
  currentFriend: friendType | null;
}) {
  const [confMessages, setConfMessages] = useState<messageType[]>(messages);

  return (
    <div className={styles.friendChatContainer}>
      <NavBar currentFriend={currentFriend} />
      {currentFriend ? (
        <Chat currentFriend={currentFriend} messages={confMessages} setMessages={setConfMessages} />
      ) : (
        "Select a friend"
      )}
      <MessageBar setMessages={setConfMessages} currentFriend={currentFriend} />
    </div>
  );
}

const Chat = ({
  currentFriend,
  messages,
  setMessages,
}: {
  currentFriend: friendType;
  messages: messageType[];
  setMessages: Dispatch<SetStateAction<messageType[]>>;
}) => {

  const getMessages = async () => {
    const response = await fetch("http://localhost:3000/users/get-messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "jwt_token": `${sessionStorage.getItem("token")}`,
      },
      body: JSON.stringify({user_two_id : currentFriend.user_id}),
    });
    const data = await response.json();
    setMessages(data);
    console.log(data);
    if (data.error) {
      console.log(data.error);
    } 
  }

  useEffect(() => {
    getMessages();
  }, [currentFriend]);
  
  // const filteredMessages = messages.filter(
  //   (message) =>
  //     message.receiverId === currentFriend.user_id ||
  //     message.senderId === currentFriend.user_id
  // );

  return (
    <div className={styles.chat}>
      {messages.length === 0 ? "Brak wiadomości" : null}
      {messages.map((message) => (
        <div
          style={{
            justifyContent:
              message.sender_id === currentFriend.user_id ? "flex-start" : "flex-end",
          }}
          className={styles.messageContainer}
        >
          <div
            className={
              message.sender_id === currentFriend.user_id
                ? styles.messageFromFriend
                : styles.userMessage
            }
          >
            {message.message}
          </div>
        </div>
      ))}
    </div>
  );
};

const NavBar = ({ currentFriend }: { currentFriend: friendType | null }) => {
  return (
    <div className={styles.navBar}>
      {currentFriend ? (
        <>
          <div className={styles.friendInfo}>
            <img
              src={
                currentFriend.user_id %2 === 0
                  ? "./images/maleUser.jpg"
                  : "./images/femaleUser.jpg"
              }
              className={styles.userImage}
            ></img>
            <div>
              <div className={styles.username}>{currentFriend.username}</div>
              <div className={styles.status}>
                <div
                  className={styles.statusIcon}
                  style={{
                    backgroundColor:
                      "green",
                  }}
                ></div>
                online
              </div>
            </div>
          </div>
          <div>
            <PhotoCameraFrontIcon className={styles.addPhoto} />
          </div>
        </>
      ) : null}
    </div>
  );
};

const MessageBar = ({
  setMessages,
  currentFriend,
}: {
  setMessages: Dispatch<SetStateAction<messageType[]>>;
  currentFriend: friendType | null;
}) => {
  const userId = useSelector((state: RootState) => state.auth.userInfo.id);
  const messageRef = useRef<HTMLInputElement>(null);
  const friendId = currentFriend?.user_id;
  const [messageText, setMessageText] = useState<string>("");
  const appendMessage = () => {
    if (!messageText) {
      return;
    }
    sendMessage();
    const newMessage: messageType = {
      sender_id: userId,
      receiver_id: friendId,
      message: messageText,
    };

    if (messageRef.current) {
      messageRef.current.value = "";
    }
    setMessages((prevMessages) => [...prevMessages, newMessage]);
    setMessageText("");
  };

  const sendMessage = async () => {
    const response = await fetch("http://localhost:3000/users/post-messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "jwt_token": `${sessionStorage.getItem("token")}`,
      },
      body: JSON.stringify({user_two_id : currentFriend?.user_id, message : messageText}),
    });
    const data = await response.json();
    console.log(data);
    if (data.error) {
      console.log(data.error);
    } 
  }

  return (
    <div className={styles.sendBar}>
      <button onClick={appendMessage} className={styles.sendButton}>
        <SendIcon style={{ color: "darkGray" }} />
      </button>
      <input
        ref={messageRef}
        type="text"
        placeholder="Enter Text Here..."
        className={styles.sendInput}
        onChange={(e) => setMessageText(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            appendMessage();
          }
        }}
      />
    </div>
  );
};
