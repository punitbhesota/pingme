const express = require("express");
const router = express.Router();
var fetchuser = require("../middleware/fetchuser");
const Post = require("../models/PostSchema");
const User = require("../models/UserSchema");
const multer = require("multer");
const { body, validationResult } = require("express-validator");

//storage define for upload posts
const storage = multer.diskStorage({
  //file destination
  destination: function (request, file, callback) {
    callback(null, "./public/uploads/images");
  },

  //file name
  filename: function (request, file, callback) {
    callback(null, Date.now() + file.originalname);
  },
});
const upload = multer({
  storage: storage,
  limits: {
    fieldSize: 1024 * 1024 * 3,
  },
});

//ROUTE 1 : FETCHING ALL POSTS   =  GET(/api/post/fetchallposts)
router.get("/fetchallposts", async (req, res) => {
  try {
    const allPosts = await Post.find().populate("user", "-password");
    res.send(allPosts);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});

//ROUTE 2 : FETCHING FEED POSTS =  GET(/api/post/fetchfeedposts)
router.get("/fetchfeedposts", fetchuser, async (req, res) => {
  try {
    const currUser = await User.findById(req.body.id).select("following");
    const feedPosts = await Post.find()
      .where("user")
      .in(currUser.following)
      .populate("user", "-password")
      .sort("-createdAt");

    res.send(feedPosts);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});

// router.get("/fetchposts", fetchuser, async (req, res) => {
//   try {
//     const posts = await Posts.find({ user: req.body.id });
//     res.json(posts);
//   } catch (error) {
//     console.error(error.message);
//     res.status(500).send("Internal Server Error");
//   }
// });

// ROUTE 3 : FETCH POSTS OF OTHER PEOPLE PROFILES
// router.get("/fetchprofileposts", fetchuser, async (req, res) => {
//   try {
//     const profilePosts = await Post.find().where;
//   } catch (error) {
//     console.error(error.message);
//     res.status(500).send("Internal Server Error");
//   }
// });

// // ROUTE 4 : FETCH MY PROFILE POSTS
// router.get("/fetchmyposts/:id", async (req, res) => {
//   try {
//     const posts = await Post.find({ _id: req.params.id }).populate(
//       "user",
//       "-password"
//     );
//     res.json(posts);
//   } catch (error) {
//     console.error(error.message);
//     res.status(500).send("Internal Server Error");
//   }
// });

// //ROUTE 5  : ADD POSTS = POST(/api/post/addpost)    LOGIN REQUIRED
// router.post(
//   "/addpost",
//   upload.single("image"),
//   fetchuser,
//   [
//     body("photo", "post cannot be blank").exists(),
//     body("caption", "caption cannot be blank").exists(),
//   ],
//   async (req, res) => {
//     try {
//       const { photo, caption } = req.body;
//       const errors = validationResult(req);
//       if (!errors.isEmpty()) {
//         return res.status(400).json({ errors: errors.array() });
//       }
//       const post = new Post({
//         photo,
//         caption,
//         user: req.body.id,
//         img: req.file.filename,
//       });
//       const savedPost = await post.save();
//       await User.findByIdAndUpdate(req.body.id, {
//         $push: { posts: savedPost._id },
//       });
//       res.json(savedPost);
//     } catch (error) {
//       console.error(error.message);
//       res.status(500).send("Internal Server Error");
//     }
//   }
// );

// ROUTE 5  : ADD POSTS MULTER = POST(/api/post/addpost)    LOGIN REQUIRED
router.post(
  "/addpost",
  upload.single("image"),
  fetchuser,
  [
    body("photo", "post cannot be blank").exists(),
    body("caption", "caption cannot be blank").exists(),
  ],
  async (req, res) => {
    try {
      const { caption } = req.body;
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      const post = new Post({
        // photo,
        caption,
        user: req.body.id,
        photo: req.file.filename,
      });
      const savedPost = await post.save();
      await User.findByIdAndUpdate(req.body.id, {
        $push: { posts: savedPost._id },
      });
      res.json(savedPost);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server Error");
    }
  }
);

// ROUTE 3: DELETING POST : DELETE "/api/post/deletepost". Login required
router.delete("/deletepost/:id", fetchuser, async (req, res) => {
  try {
    // Find the note to be delete and delete it
    let post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).send("Not Found");
    }

    // Allow deletion only if user owns this Note
    if (post.user.toString() !== req.body.id) {
      return res.status(401).send("Not Allowed");
    }

    post = await Post.findByIdAndDelete(req.params.id);
    res.json({ Success: "Posts has been deleted", post: post });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});
module.exports = router;
