const appendToSheet = require("../utils/googleSheet");

module.exports = async (req, res, next) => {
  try {
    await appendToSheet([
      req.userInfo.userName,
      req.userInfo.userEmail,
      req.userInfo.userPhone,
      req.userInfo.referralCode,
      req.userInfo.createdAt.toLocaleString("en-IN", {
        timeZone: "Asia/Kolkata",
        dateStyle: "medium",
        timeStyle: "short",
      }),
    ]);
    next();
  } catch (error) {
    console.log("Error while entry in Google sheet");
    return res.status(400).json({
      success: false,
      message: "Entry not created in google sheet",
      error: error.message,
    });
  }
}; 