const connectToMongoDB = require("./db.js");
const express = require("express");
const dotenv = require("dotenv");
const path = require("path");

dotenv.config();

connectToMongoDB();

const app = express();
const port = 5000;

app.use(express.json());
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
// Available Routes
app.use("/api/auth", require("./routes/authrouter"));
app.use("/api/post", require("./routes/postsrouter"));
app.use("/api/conversation", require("./routes/conversationsrouter"));
app.use("/api/message", require("./routes/messagesrouter"));
app.use(
  "/uploads",
  express.static(path.join(path.resolve(), "backend", "uploads"))
);

app.listen(port, () => {
  console.log(`OPEN :  http://localhost:${port}`);
});
