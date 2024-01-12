const { ctrlWrapper, HttpError } = require("../../helpers");
const { User } = require("../../models/user");

const getFavorite = async (req, res) => {
  const { _id } = req.user;

  const user = await User.findById(_id).populate("favorites");

  if (!user) {
    throw HttpError(404, "User not found");
  }

  res.json(user.favorites);
};

module.exports = {
  getFavorite: ctrlWrapper(getFavorite),
};
