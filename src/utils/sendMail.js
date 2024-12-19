const nodemailer = require("nodemailer");
const AppError = require("./appError");
const { StatusCodes } = require("http-status-codes");

const sendMail = async (email, subject, html) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      to: email,
      subject,
      html,
    });
  } catch (error) {
    throw new AppError(
      "Error, can't send email",
      StatusCodes.INTERNAL_SERVER_ERROR,
      "error",
      false
    );
  }
};

module.exports = sendMail;
