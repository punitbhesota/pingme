const connectToMongoDB = require("./db.js");
const express = require("express");
const dotenv = require("dotenv");

dotenv.config();

connectToMongoDB();

const app = express();
const port = 5000;

app.use(express.json());

// app.get("/", (req, res) => {
//   res.send("Hello World!");
// });
app.use(express.json());
// Available Routes
// app.set("view engine", "ejs");
app.use("/api/auth", require("./routes/authrouter"));
app.use("/api/post", require("./routes/postsrouter"));
app.use("/uploads", express.static("../public/uploads"));

app.listen(port, () => {
  console.log(`OPEN :  http://localhost:${port}`);
});
