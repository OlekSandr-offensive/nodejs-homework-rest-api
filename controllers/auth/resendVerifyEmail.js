const { User } = require("../../models/user.js");

const { RequestError, sendEmail } = require("../../helpers");

const resendVerifyEmail = async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    throw RequestError(404, "Not found");
  }
  if (user.verify) {
    throw RequestError(400, "User already verify");
  }
  const mail = {
    to: email,
    subject: "Confirmation of registration on the site",
    html: `<a href="http://localhost:3000/api/users/verify/${user.verificationToken}" target="_blank"> Click to verify email</a>`,
  };
  await sendEmail(mail);
  res.json({
    message: "Verification email sent",
  });
};

module.exports = resendVerifyEmail;