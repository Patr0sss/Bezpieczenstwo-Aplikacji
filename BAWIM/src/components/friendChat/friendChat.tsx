import { friendType, messageType } from "../../types";
import styles from "./friendChat.module.css";
import PhotoCameraFrontIcon from "@mui/icons-material/PhotoCameraFront";
import SendIcon from "@mui/icons-material/Send";
import messages from "../../pages/homePage/mockMessages";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { useRef, useState, type Dispatch, type SetStateAction } from "react";

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
        <Chat currentFriend={currentFriend} messages={confMessages} />
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
}: {
  currentFriend: friendType;
  messages: messageType[];
}) => {
  const filteredMessages = messages.filter(
    (message) =>
      message.receiverId === currentFriend.id ||
      message.senderId === currentFriend.id
  );

  return (
    <div className={styles.chat}>
      {filteredMessages.length === 0 ? "Brak wiadomości" : null}
      {filteredMessages.map((message) => (
        <div
          style={{
            justifyContent:
              message.senderId === currentFriend.id ? "flex-start" : "flex-end",
          }}
          className={styles.messageContainer}
        >
          <div
            className={
              message.senderId === currentFriend.id
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
                currentFriend.id %2 === 0
                  ? "./images/maleUser.jpg"
                  : "./images/femaleUser.jpg"
              }
              className={styles.userImage}
            ></img>
            <div>
              <div className={styles.username}>{currentFriend.name}</div>
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
  const friendId = currentFriend?.id;
  const [messageText, setMessageText] = useState<string>("");

  const appendMessage = () => {
    if (!messageText) {
      return;
    }
    const newMessage: messageType = {
      senderId: userId,
      receiverId: friendId,
      message: messageText,
      id: Date.now(),
    };

    if (messageRef.current) {
      messageRef.current.value = "";
    }
    setMessages((prevMessages) => [...prevMessages, newMessage]);
    setMessageText("");
  };

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
