import { Avatar } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import "./ChatPage.css";
import SendRoundedIcon from "@mui/icons-material/SendRounded";
import { useSelector } from "react-redux";
import Conversation from "../../Components/Conversation/Conversation";
import Message from "../../Components/Message/Message";
import axios from "axios";
import { io } from "socket.io-client";
import ChatOnline from "../../Components/chatOnline/chatOnline";

function ChatPage() {
  const { token } = useSelector((state) => state.userInfo);
  const { user } = useSelector((state) => state.userInfo);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [currentChat, setCurrentChat] = useState(null);
  const [conversations, setConversations] = useState([]);
  const [currentchatuser, setCurrentChatUser] = useState("");
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const scrollRef = useRef();
  const socket = useRef();

  useEffect(() => {
    socket.current = io("ws://localhost:8900");
    socket.current.on("getMessage", (data) => {
      setArrivalMessage({
        senderId: data.senderId,
        text: data.text,
        createdAt: Date.now(),
      });
    });
  }, []);

  useEffect(() => {
    arrivalMessage &&
      currentChat?.members.includes(arrivalMessage.senderId) &&
      setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage, currentChat]);

  useEffect(() => {
    socket.current.emit("addUser", user?._id);
    socket.current.on("getUsers", (users) => {
      console.log(users);
    });
  }, [user]);

  useEffect(() => {
    const receiverId = currentChat?.members.find(
      (member) => member !== user._id
    );

    const getUser = async () => {
      try {
        const res = await axios(`/api/auth/getuserdetailsbyid/${receiverId}`);
        setCurrentChatUser(res.data);
        // console.log(res);
      } catch (err) {
        console.log(err);
      }
    };
    getUser();
  }, []);

  useEffect(() => {
    const getConversations = async () => {
      try {
        const res = await axios.get(`/api/conversation/${user._id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setConversations(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getConversations();
  }, [user, token]);
  // console.log(currentChat);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }, [messages]);

  useEffect(() => {
    const getMessages = async () => {
      try {
        const res = await axios.get(`/api/message/${currentChat?._id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setMessages(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getMessages();
  }, [currentChat, token]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const message = {
      conID: currentChat._id,
      sendermsg: newMessage,
      senderid: user._id,
    };
    const receiverId = currentChat.members.find(
      (member) => member !== user._id
    );

    socket.current.emit("sendMessage", {
      senderId: user?._id,
      receiverId,
      text: newMessage,
    });

    try {
      const res = await axios.post("/api/message", message, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setMessages([...messages, res.data]);
      setNewMessage("");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="ChatPage">
      <div className="myChats">
        <h1 className="myChats-heading">My Chats</h1>
        <input className="myChats-search" placeholder="Search Chats"></input>

        <div className="myChats-people">
          {
            // conversations ? (
            conversations.map((c) => (
              <div onClick={() => setCurrentChat(c)}>
                <Conversation conversation={c} currentUser={user} />
              </div>
            ))
            // ) : (
            //   <></>
            // )
          }
        </div>
      </div>
      <div className="currentChat">
        {currentChat ? (
          <>
            <div className="currentChat-person">
              <Avatar
                className="currentChat-person-dp"
                // src={currentchatuser.displayPicture}
                src=""
                alt="DP"
              />
              Chatting
              {/* {currentchatuser.name} */}
            </div>
            <div className="current-chat-messages">
              {messages.map((m) => (
                <div ref={scrollRef}>
                  <Message
                    message={m}
                    own={m.senderId === user._id}
                    // receiverdp={currentchatuser.displayPicture}
                  />
                </div>
              ))}
            </div>
            <div className="currentChat-send-message-box">
              <input
                className="currentChat-input-message"
                placeholder="Send Message..."
                onChange={(e) => setNewMessage(e.target.value)}
                value={newMessage}
              ></input>
              <button
                className="currentChat-send-message"
                onClick={handleSubmit}
              >
                <SendRoundedIcon fontSize="large" />
              </button>
            </div>
          </>
        ) : (
          <span className="heading">Chat karo</span>
        )}
      </div>
      <div className="usersOnline">
        <h1 className="usersOnline-heading">Users Online</h1>
        <div className="myChats-people">
          <ChatOnline
            onlineUsers={onlineUsers}
            currentId={user?._id}
            setCurrentChat={setCurrentChat}
          />
        </div>
      </div>
    </div>
  );
}

export default ChatPage;
