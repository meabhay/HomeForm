const HomeSchema = require("../models/homeFormModel");

module.exports = async (req, res, next) => {
  try {
    const userInfo = await HomeSchema.create(req.userData);
    // Fetch the full user info (with createdAt, etc.)
    const user = await HomeSchema.findOne({ userEmail: req.userData.userEmail });
    req.userInfo = user;
    next();
  } catch (error) {
    console.log("Error while saving the userInfo in DB! ");
    return res.status(500).json({
      success: false,
      message: "Entry creation in DB failed!",
      error: error.message,
    });
  }
}; 