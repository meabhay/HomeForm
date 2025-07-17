const parsePhoneNumber  = require("libphonenumber-js");

function formatPhoneNumber(inputNumber) {
  try {
    const phone = parsePhoneNumber(inputNumber);
    if (phone && phone.isValid()) {
      return {
        valid: true,
        number: phone.number, // e.g. "+919876543210"
        // country: phone.country, // e.g. "IN"
        // national: phone.nationalNumber, // e.g. "9876543210"
      };
    } else {
      return {
        valid: false,
        error: "Enter number with Country Code(ex. for India +91)",
      };
    }
  } catch (err) {
    return { valid: false, error: err.message };
  }
}

module.exports = formatPhoneNumber;
