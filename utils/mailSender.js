const nodemailer = require("nodemailer");

exports.mailSender = async (title, body) => {
  try {
    const transporter = nodemailer.createTransport({
      host: process.env.MAIL_HOST,
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
    });

    

    let info = await transporter.sendMail({
      from: `Brandloomi ${process.env.MAIL_USER}`,
      to: `as3720719@gmail.com`,
      subject: `${title}`,
      html: `${body}`,
    });
    return info;
  } catch (error) {
    console.log(error.message);
  }
};
