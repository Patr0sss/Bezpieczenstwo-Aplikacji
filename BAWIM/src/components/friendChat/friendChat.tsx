import { friendType, messageType } from "../../types";
import styles from "./friendChat.module.css";
import PhotoCameraFrontIcon from "@mui/icons-material/PhotoCameraFront";
import SendIcon from "@mui/icons-material/Send";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { useEffect, useRef, useState, type Dispatch, type SetStateAction } from "react";
import io from "socket.io-client";

const socket = io('http://localhost:3002');

export default function FriendChat({
  currentFriend,
}: {
  currentFriend: friendType | null;
}) {
  const [confMessages, setConfMessages] = useState<messageType[]>([]);

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
  const chatRef = useRef<HTMLDivElement>(null);
  const currentUserId = useSelector((state: RootState) => state.auth.userInfo.id) || -1;
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn) 

  const createRoomId = () => {
    if (currentUserId > currentFriend.user_id) {
      return `${currentFriend.user_id}${currentUserId}`;
    }
    return `${currentUserId}${currentFriend.user_id}`;
  };

  const getMessages = async () => {
    const response = await fetch("http://localhost:3000/users/get-messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "jwt_token": `${sessionStorage.getItem("token")}`,
      },
      body: JSON.stringify({user_two_id: currentFriend.user_id}),
    });
    const data = await response.json();
    if (!data.error) {
      setMessages(data);
    } else {
      console.log(data.error);
    }
  };

      const handleReceiveMessage = () => {
        getMessages();
      };

      
  useEffect(() => {
    if (!isLoggedIn) {
      return;
    }
    getMessages();
    
    const roomId = parseInt(createRoomId());
    socket.emit('join_room', { chatId: roomId });
    socket.on("receive_message", handleReceiveMessage);
  
    return () => {
      socket.off("receive_message", handleReceiveMessage);
    };
  }, [currentFriend]);

  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollIntoView();
    }
  }, [messages]);

  return (
    <div className={styles.chat}>
      {messages.length === 0 ? "Brak wiadomości" : null}
      {messages.map((message, index) => (
        <div
          key={index}
          style={{
            justifyContent: message.sender_id === currentFriend.user_id ? "flex-start" : "flex-end",
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
      <div ref={chatRef} style={{width:"100%", height:"1px", flexShrink:0}}></div>
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
  const [messageText, setMessageText] = useState<string>("");

  const createRoomId = () => {
    if (userId && currentFriend && userId > currentFriend.user_id) {
      return `${currentFriend.user_id}${userId}`;
    }
    return `${userId}${currentFriend?.user_id}`;
  };

  const sendMessage = async () => {

    const roomId = parseInt(createRoomId());
    socket.emit('send_message', {
      room: roomId,
      message: messageText,
      sender_id: userId,
      receiver_id: currentFriend?.user_id,
    });

    const newMessage: messageType = {
      sender_id: userId,
      receiver_id: currentFriend?.user_id,
      message: messageText,
    };
    setMessages(prev => [...prev, newMessage]);

    setMessageText("");
    if (messageRef.current) {
      messageRef.current.value = "";
    }
  };

  return (
    <div className={styles.sendBar}>
      <button onClick={sendMessage} className={styles.sendButton}>
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
            sendMessage();
          }
        }}
      />
    </div>
  );
};