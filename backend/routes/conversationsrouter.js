const express = require("express");
const fetchuser = require("../middleware/fetchuser");
const Conversation = require("../models/ConversationSchema");
const router = express.Router();

//POST NEW CONVERSATION
router.post("/addconversation", fetchuser, async (req, res) => {
  try {
    const senderId = req.body.senderId;
    const receiverId = req.body.receiverId;

    const conversation = new Conversation({
      members: [senderId, receiverId],
    });
    const savedConversation = await conversation.save();
    res.status(200).json(savedConversation);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});
// GET A USER'S CONVERSATIONS
router.get("/:userId", fetchuser, async (req, res) => {
  try {
    const myconversations = await Conversation.find({
      members: { $in: [req.params.userId] },
    });
    res.status(200).json(myconversations);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});

// GET A CONVERSATION WITH 2 GIVEN PARTICIPANTS
router.get("/:userId/:secondId", fetchuser, async (req, res) => {
  try {
    const myconversations = await Conversation.find({
      members: { $all: [req.params.userId, req.params.secondId] },
    });
    res.status(200).json(myconversations);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
