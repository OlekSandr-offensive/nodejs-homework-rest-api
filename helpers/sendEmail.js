const nodemailer = require("nodemailer");

const { META_PASSWORD } = process.env;

const nodemailerConfig = {
  host: "smtp.meta.ua",
  port: 465,
  secure: true,
  auth: {
    user: "loiejfmljfdgter@meta.ua",
    pass: META_PASSWORD,
  },
};

const transporter = nodemailer.createTransport(nodemailerConfig);

const sendEmail = async data => {
  try {
    const email = { ...data, from: "loiejfmljfdgter@meta.ua" };
    await transporter.send(email);
    return true;
  } catch (error) {
    throw new Error(error);
  }
};

module.exports = sendEmail;
