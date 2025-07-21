const { mailSender } = require("../utils/mailSender");
const mailTemplate = require("../templates/mailTemplate");

module.exports = async (req, res, next) => {
  try {
    await mailSender(
      "New User entry in Database",
      mailTemplate({
        userName: req.userInfo.userName,
        userEmail: req.userInfo.userEmail,
        referralCode: req.userInfo.referralCode,
        userPhone: req.userInfo.userPhone,
        createdAt: req.userInfo.createdAt,
      })
    );
    next();
  } catch (error) {
    console.log("Error while sending mail");
    return res.status(400).json({
      success: false,
      message: "Email not sent !",
      error: error.message,
    });
  }
}; 