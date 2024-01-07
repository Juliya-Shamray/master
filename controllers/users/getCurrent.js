const { ctrlWrapper } = require("../../helpers");

const getCurrent = async (req, res) => {
  const { name, email } = req.user;
  res.json({
    name,
    email,
  });
};

module.exports = {
  getCurrent: ctrlWrapper(getCurrent),
};
