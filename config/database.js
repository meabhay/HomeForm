const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

exports.dbConnect = async (req, res) => {
  try {
      await mongoose.connect(process.env.MONGO_URI);
      console.log("MongoDB connected successfully !");
  } catch (error) {
    console.log("MongoDB connection unsuccessful !", error.message);
  }
}