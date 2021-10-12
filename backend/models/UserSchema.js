const mongoose = require("mongoose");
const { Schema } = mongoose;
const PostSchema = require("./PostSchema");

const UserSchema = new Schema(
  {
    // _id: Schema.Types.ObjectId,
    username: {
      type: String,
      required: true,
      unique: true,
    },
    displayPicture: {
      type: String,
      default: "./default_dp2.png",
    },
    name: { type: String, required: true },

    email: { type: String, required: true, unique: true },
    password: {
      type: String,
      required: true,
    },
    followers: {
      type: Array,
      default: [],
    },
    following: {
      type: Array,
      default: [],
    },
    posts: [{ type: Schema.Types.ObjectId, ref: "Post" }],
    bio: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);
const User = mongoose.model("User", UserSchema);
module.exports = User;
