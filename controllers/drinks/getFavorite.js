const { ctrlWrapper, HttpError } = require("../../helpers");
const { User } = require("../../models/user");

const getFavorite = async (req, res) => {
  const { _id } = req.user;
  const { page = 1, limit = 9 } = req.query;

  const user = await User.findById(_id).populate({
    path: "favorites",
    options: { limit: Number(limit), skip: (page - 1) * Number(limit) },
  });

  if (!user) {
    throw HttpError(404, "User not found");
  }

  const totalItemsCount = user.favorites.length;

  res.json({
    data: user.favorites,
    total: totalItemsCount,
  });
};

module.exports = {
  getFavorite: ctrlWrapper(getFavorite),
};
