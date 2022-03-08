import axios from "axios";
import { Avatar } from "@mui/material";
import { useSelector } from "react-redux";

import { useEffect, useState } from "react";
import "./Conversation.css";

export default function Conversation({ conversation, currentUser }) {
  const { token } = useSelector((state) => state.userInfo);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const friendId = conversation?.members.find((m) => m !== currentUser._id);

    const getUser = async () => {
      try {
        const res = await axios(`/api/auth/getuserdetailsbyid/${friendId}`);
        setUser(res.data);
        // console.log(res);
      } catch (err) {
        console.log(err);
      }
    };
    getUser();
  }, [currentUser, conversation, token]);

  return (
    <div className="conversation">
      {user ? (
        <Avatar className="conversationDp" src={user.displayPicture} />
      ) : (
        <Avatar className="conversationDp" src="" />
      )}
      <span className="conversationName">{user?.username}</span>
    </div>
  );
}
