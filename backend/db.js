const mongoose = require("mongoose");

const connectToMongoDB = () => {
  mongoose.connect(
    "mongodb+srv://admin:admin@cluster0.mrcxv.mongodb.net/socialmedia",
    () => {
      console.log("DATABASE CONNECTED TO MONGOOSE");
    }
  );
};

module.exports = connectToMongoDB;
