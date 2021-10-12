// const path = require("path");
const express = require("express");
const User = require("../models/UserSchema");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");
const JWT_SECRET = "ThisIsJWTSecret";
var fetchuser = require("../middleware/fetchuser");
const multer = require("multer");

//storage define for upload posts
const storage = multer.diskStorage({
  //file destination
  destination: function (request, file, callback) {
    callback(null, "./public/uploads/dps");
  },

  //file name
  filename: function (request, file, callback) {
    callback(null, file.originalname);
  },
});
const upload = multer({
  storage: storage,
  limits: {
    fieldSize: 1024 * 1024 * 3,
  },
});

//1. ROUTE TO => CREATING USER : POST(/api/auth/createuser)   LOGIN NOT REQUIRED
router.post(
  "/createuser",
  [
    body("password", "Password must be atleast 8 characters long").isLength({
      min: 5,
    }),
    body("email", "Please enter a valid email").isEmail(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      //Unique email checker
      let userEmail = await User.findOne({ email: req.body.email });
      if (userEmail) {
        return res.status(400).json({ error: "This email is already in use" });
      }
      //Unique user checker
      let userName = await User.findOne({
        username: req.body.username,
      });
      if (userName) {
        return res.status(400).json({ error: "This username already exists" });
      }

      const salt = await bcrypt.genSalt(15);
      const SecuredPassword = await bcrypt.hash(req.body.password, salt);

      // User Creation
      const user = await User.create({
        username: req.body.username,
        name: req.body.name,
        email: req.body.email,
        password: SecuredPassword,
      });

      const data = {
        id: user.id,
      };
      const authToken = jwt.sign(data, JWT_SECRET);
      res.status(200).json({ authToken });
    } catch (error) {
      console.log(error.message);
      res.status(500).send("Internal Server Error");
    }
  }
);

//2. ROUTE TO =>  USER LOGIN : POST(/api/auth/login)   LOGIN NOT REQUIRED
router.post(
  "/login",
  [
    body("email", "Enter a valid mail").isEmail(),
    body("password", "Password cannot be blank").exists(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { email, password } = req.body;
    try {
      let user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ error: "User does not exist" });
      }
      const passwordCompare = await bcrypt.compare(password, user.password);
      if (!passwordCompare) {
        return res.status(400).json({ error: "Wrong Password" });
      }

      const data = {
        id: user.id,
      };
      const authToken = jwt.sign(data, JWT_SECRET);
      res.status(200);
      res.json({ authToken });
    } catch (error) {
      console.log(error.message);
      res.status(500).send("Internal Server Error");
    }
  }
);

//3. ROUTE TO : GET USER DETAILS AFTER LOGIN : POST(/api/auth/getuser)   LOGIN REQUIRED
router.get("/getuser", fetchuser, async (req, res) => {
  try {
    const userId = req.body.id;
    const user = await User.findById(userId).select("-password");
    res.send(user);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});

router.get("/getuserdetails/:username", async (req, res) => {
  try {
    const userName = req.params.username;
    const user = await User.findOne({ username: userName })
      .select("-password")
      .populate({ path: "posts", options: { sort: "-createdAt" } });
    res.status(200).json(user);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});

router.get("/getallusers", async (req, res) => {
  try {
    // const username = req.body.name;
    const allUsers = await User.find().select(
      "name username displayPicture email"
    );
    res.send(allUsers);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});

router.put("/follow/:id", fetchuser, async (req, res) => {
  try {
    const userId = req.body.id;
    const targetId = req.params.id;
    await User.findByIdAndUpdate(userId, {
      $push: { following: targetId },
    });
    await User.findByIdAndUpdate(targetId, {
      $push: { followers: userId },
    });
    res.status(200).json({
      message: "Followed the user",
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});

router.put("/unfollow/:id", fetchuser, async (req, res) => {
  try {
    const userId = req.body.id;
    const targetId = req.params.id;
    await User.findByIdAndUpdate(userId, {
      $pull: { following: targetId },
    });
    await User.findByIdAndUpdate(targetId, {
      $pull: { followers: userId },
    });
    res.status(200).json({
      message: "Unfollowed the user",
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});

//Add DP router
router.put(
  "/adddisplaypicture",
  upload.single("displayPicture"),
  fetchuser,
  async (req, res) => {
    try {
      const userId = req.body.id;
      // const dp = req.body.displayPicture;
      const dp = req.file.displayPicture;
      console.log(req.file.path);

      await User.findByIdAndUpdate(userId, { $set: { displayPicture: dp } });
      // await User.findByIdAndUpdate(userId).then((user) => {
      //   user.displayPicture = req.file.originalname;
      // user.save().then(() =>
      res.status(200).json({
        message: "DP updated",
      });
      // );
      // });
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server Error");
    }
  }
);

module.exports = router;
