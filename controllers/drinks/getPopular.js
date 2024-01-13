const { ctrlWrapper } = require("../../helpers");
const { Drink } = require("../../models/drink");

const getPopular = async (req, res) => {
  const { isAdult } = req.user;

  const query = isAdult ? {} : { alcoholic: "Non alcoholic" };
  const popularDrinks = await Drink.aggregate([
    {
      $match: query,
    },
    {
      $lookup: {
        from: "users",
        localField: "_id",
        foreignField: "favorites",
        as: "favoritedByUsers",
      },
    },
    {
      $addFields: {
        favoritesCount: { $size: "$favoritedByUsers" },
      },
    },
    {
      $sort: { favoritesCount: -1 },
    },
    {
      $limit: 4,
    },
    {
      $unset: ["favoritedByUsers"],
    },
  ]);

  res.json(popularDrinks);
};

module.exports = {
  getPopular: ctrlWrapper(getPopular),
};
