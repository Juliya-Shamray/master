const { ctrlWrapper } = require("../helpers");
const { Drink } = require("../models/drink");

const Ingredient = require("../models/ingredient");

const getIngredients = async (req, res) => {
  const result = await Ingredient.aggregate([
    {
      $match: { title: { $exists: true, $ne: null } },
    },
    {
      $group: {
        _id: { $toLower: "$title" },
        count: { $sum: 1 },
      },
    },
  ]);

  const uniqueIngredients = result.map((ingredient) => ingredient._id);
  res.json(uniqueIngredients);
};

const getCategories = async (req, res) => {
  const categories = await Drink.find()
    .distinct("category", { category: { $exists: true, $ne: null } })
    .collation({ locale: "en", strength: 2 })
    .sort();

  res.json(categories);
};

const getGlasses = async (req, res) => {
  const glasses = await Drink.find()
    .distinct("glass", { glass: { $exists: true, $ne: null } })
    .collation({ locale: "en", strength: 2 });
  res.json(glasses);
};

module.exports = {
  getIngredients: ctrlWrapper(getIngredients),
  getCategories: ctrlWrapper(getCategories),
  getGlasses: ctrlWrapper(getGlasses),
};
