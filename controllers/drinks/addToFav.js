const { ctrlWrapper, HttpError } = require("../../helpers");
const { Drink } = require("../../models/drink");
const { User } = require("../../models/user");

const addToFav = async (req, res) => {
  const { id } = req.body;

  const { _id } = req.user;

  const favDrink = await Drink.findById(id);
  if (!favDrink) {
    throw HttpError(404, "Not found");
  }

  const user = await User.findById(_id);
  if (user.favorites.includes(id)) {
    throw HttpError(404, "Drink already in favorites");
  }

  await User.findByIdAndUpdate(_id, {
    $addToSet: { favorites: id },
  });

  res.json({
    message: "Drink was added to favorites",
  });
};

module.exports = {
  addToFav: ctrlWrapper(addToFav),
};
