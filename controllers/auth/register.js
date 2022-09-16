const bcrypt = require("bcryptjs");
const gravatar = require("gravatar");
const crypto = require("crypto");

const { User } = require("../../models/user");

const { RequestError, sendEmail } = require("../../helpers");

const register = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw RequestError(409, "Email already exist");
  }
  const hashPassword = await bcrypt.hash(password, 10);
  const avatarURL = gravatar.url(email);
  const verificationToken = crypto.randomUUID();
  const result = await User.create({
    email,
    password: hashPassword,
    avatarURL,
    verificationToken,
  });
  const mail = {
    to: email,
    subject: "Confirmation of registration on the site",
    html: `<a href="http://localhost:3000/api/users/verify/${verificationToken}" target="_blank"> Click to verify email</a>`,
  };
  await sendEmail(mail);
  res.status(201).json({
    email: result.email,
    subscription: result.subscription,
  });
};

module.exports = register;
