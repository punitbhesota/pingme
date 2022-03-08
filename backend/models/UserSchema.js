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
      default: "./DefaultDp.jpg",
    },

    profilePicture: {
      url: {
        type: String,
        // required: true,
        default: "",
        // "https://res.cloudinary.com/social-mern/image/upload/v1633171722/depositphotos_199564354-stock-illustration-creative-vector-illustration-default-avatar_tlkm1m.jpg",
      },
      cloudinary_id: {
        type: String,
        // required: true,
        default: "",
        // "depositphotos_199564354-stock-illustration-creative-vector-illustration-default-avatar_tlkm1m",
      },
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
