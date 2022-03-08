import "./Message.css";
import { Avatar } from "@mui/material";
import { format } from "timeago.js";
import axios from "axios";
import { useEffect, useState } from "react";

export default function Message({ message, own, receiverdp }) {
  return (
    <div className={own ? "message own" : "message"}>
      <div className="messageTop">
        <Avatar className="messageImg" alt={receiverdp} />
        <p className="messageText">{message.text}</p>
      </div>
      <div className="messageBottom">{format(message.createdAt)}</div>
    </div>
  );
}
