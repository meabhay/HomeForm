const parsePhoneNumber = require("libphonenumber-js");

exports.formatPhoneNumber = (inputNumber) => {
  try {
    const phone = parsePhoneNumber(inputNumber);
    if (phone && phone.isValid()) {
      return {
        valid: true,
        number: phone.number,
      };
    }
  } catch (err) {
    return { valid: false, error: err.message };
  }
};


