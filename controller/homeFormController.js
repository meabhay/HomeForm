const HomeSchema = require("../models/homeFormModel");
const { mailSender } = require("../utils/mailSender");
const mailTemplate = require("../templates/mailTemplate");
const appendToSheet = require("../utils/googleSheet");
const { parsePhoneNumber } = require("libphonenumber-js");
const formatPhoneNumber = require("../controller/formatPhoneNumber");
exports.homeFormHandler = async (req, res) => {
  try {
    //fetch details from body
    const { userName, userEmail, referralCode, userPhone } = req.body;

    //Basic Validation
    if (!userName || !userEmail || !referralCode || !userPhone) {
      return res.status(400).json({
        success: false,
        message: "All fields are mandatory !",
      });
    }

    //Phone Number validation according to Country
    const phoneData = formatPhoneNumber(userPhone);
     if (!phoneData.valid) {
       return res.status(400).json({
         success: false,
         message: "Enter number with Country Code(ex. for India +91)",
         error: phoneData.error,
       });
     }



    //check in DB if user entry is already created
    const existingUser = await HomeSchema.findOne({ userEmail });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "Entry with this email already exist",
      });
    }

    //create an entry in database
    const userInfo = await HomeSchema.create({
      userName,
      userEmail,
      referralCode,
      userPhone: phoneData.number,
    });

    //fetch details from backend
    const user = await HomeSchema.findOne({ userEmail });
    console.log("User details fetched from DB: ", user);

    //Send an email
    try {
      const mailResponse = await mailSender(
        "New User entry in Database",
        mailTemplate({
          userName: user.userName,
          userEmail: user.userEmail,
          referralCode: user.referralCode,
          userPhone: user.userPhone,
          createdAt: user.createdAt,
        })
      );
    } catch (error) {
      console.log("Eror while sending mail");
      return res.status(400).json({
        success: false,
        message: "Email not sent !",
        error: error.message,
      });
    }

    // Entry in Google sheet
    try {
      await appendToSheet([
        user.userName,
        user.userEmail,
        user.userPhone,
        user.referralCode,
        user.createdAt.toLocaleString("en-IN", {
          timeZone: "Asia/Kolkata",
          dateStyle: "medium",
          timeStyle: "short",
        }),
      ]);
    } catch (error) {
      console.log("Eror while entry in Google sheet");
      return res.status(400).json({
        success: false,
        message: "Entry not created in google sheet",
        error: error.message,
      });
    }

    //Send Response
    return res.status(200).json({
      success: true,
      message: "Entry created Successfuly !",
      userInfo,
    });
  } catch (error) {
    console.log("Error while saving the userInfo in DB! ");
    return res.status(500).json({
      success: false,
      message: "Entry creation in DB failed!",
      error: error.message,
    });
  }
};
