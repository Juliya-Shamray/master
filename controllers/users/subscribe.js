const { ctrlWrapper, HttpError, sendEmail } = require("../../helpers");
const { User } = require("../../models/user");

const subscribe = async (req, res) => {
  const { email } = req.body;

  const user = User.findOne({ email });

  if (!user) {
    throw HttpError(404, "Email is not valid");
  }
  const subscription = {
    to: email,
    subject: "Verify email",
    html: `<p>You have subscribed to the newsletter</p>`,
  };

  await sendEmail(subscription);

  res.json({
    message: "subscription success",
  });
};

module.exports = {
  subscribe: ctrlWrapper(subscribe),
};
