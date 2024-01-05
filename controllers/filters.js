const { ctrlWrapper } = require("../helpers");
const { Drink } = require("../models/drink");

const Ingredient = require("../models/ingredient");

const getIngredients = async (req, res) => {
  const result = await Ingredient.find();

  res.json(result);
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
