const { ctrlWrapper } = require("../../helpers");
const { Drink } = require("../../models/drink");
const { User } = require("../../models/user");

const addToFav = async (req, res) => {
  const { id } = req.body;

  const { _id } = req.user;

  const favDrink = await Drink.findById(id);
  if (!favDrink) {
    return res.status(404).json({ message: "Not found" });
  }

  const user = await User.findById(_id);
  if (user.favorites.includes(id)) {
    return res.status(400).json({ message: "Drink already in favorites" });
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
