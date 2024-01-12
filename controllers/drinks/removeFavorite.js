const { ctrlWrapper, HttpError } = require("../../helpers");
const { User } = require("../../models/user");

const removeFavorite = async (req, res) => {
  const { id } = req.body;

  const { _id } = req.user;

  const user = await User.findById(_id);
  if (!user.favorites.includes(id)) {
    throw HttpError(400, "Drink not found in favorites");
  }

  await User.findByIdAndUpdate(_id, { $pull: { favorites: id } });

  res.json({
    message: "Drink has been removed from favorites successfully",
  });
};

module.exports = {
  removeFavorite: ctrlWrapper(removeFavorite),
};
