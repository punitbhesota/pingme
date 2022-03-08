const express = require("express");
const fetchuser = require("../middleware/fetchuser");
const Message = require("../models/MessageSchema");
const router = express.Router();

// SEND MESSAGE ROUTER
router.post("/", fetchuser, async (req, res) => {
  try {
    const conversationId = req.body.conID;
    const senderId = req.body.senderid;
    const text = req.body.sendermsg;
    const msg = new Message({
      conversationId,
      text,
      senderId,
    });
    const savedmsg = await msg.save();
    res.status(200).json(savedmsg);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});

// GET MESSAGE WITH CONVERSATION ID ROUTER
router.get("/:conversationID", fetchuser, async (req, res) => {
  try {
    const conversationId = req.params.conversationID;
    const messages = await Message.find({
      conversationId,
    }).select("text senderId createdAt");

    res.status(200).json(messages);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
