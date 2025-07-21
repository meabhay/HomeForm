const HomeSchema = require("../models/homeFormModel");
const { mailSender } = require("../utils/mailSender");
const mailTemplate = require("../templates/mailTemplate");
const appendToSheet = require("../utils/googleSheet");
const { parsePhoneNumber } = require("libphonenumber-js");
const { formatPhoneNumber } = require("../controller/formatPhoneNumber");
const dbEntryMiddleware = require("../middleware/dbEntryMiddleware");
const mailSendMiddleware = require("../middleware/mailSendMiddleware");
const sheetEntryMiddleware = require("../middleware/sheetEntryMiddleware");
const Joi = require("joi");
exports.homeFormHandler = [
  async (req, res, next) => {
    try {
      const { userName, userEmail, referralCode, userPhone } = req.body;
      // Joi schema validation
      const schema = Joi.object({
        userName: Joi.string().min(2).max(50).required(),
        userEmail: Joi.string().email().required(),
        referralCode: Joi.string().alphanum().min(3).max(20).required(),
        userPhone: Joi.string().required(), // phone validated separately
      });
      const { error } = schema.validate({ userName, userEmail, referralCode, userPhone });
      if (error) {
        return res.status(400).json({
          success: false,
          message: error.details[0].message,
        });
      }
      // Phone validation as before
      const phoneData = formatPhoneNumber(userPhone);
      if (!phoneData.valid) {
        return res.status(400).json({
          success: false,
          message: "Enter number with Country Code(ex. for India +91)",
          error: phoneData.error,
        });
      }
      req.userData = {
        userName,
        userEmail,
        referralCode,
        userPhone: phoneData.number,
      };
      next();
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Validation failed!",
        error: error.message,
      });
    }
  },
  dbEntryMiddleware,
  sheetEntryMiddleware,
  mailSendMiddleware,
  (req, res) => {
    return res.status(200).json({
      success: true,
      message: "Entry created Successfuly !",
      userInfo: req.userInfo,
    });
  },
];
