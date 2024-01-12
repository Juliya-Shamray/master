const { HttpError, ctrlWrapper } = require("../../helpers");
const { Drink } = require("../../models/drink");

const getById = async (req, res) => {
  const { id } = req.params;
  const result = await Drink.findById(id).populate("ingredients.ingredientId");
  if (!result) {
    throw HttpError(404, "Not found");
  }
  const simplifiedIngredients = result.ingredients.map((ingredient) => ({
    title: ingredient.title,
    measure: ingredient.measure,
    drinkThumb: ingredient.ingredientId.ingredientThumb,
  }));

  const simplifiedResult = {
    ...result.toObject(),
    ingredients: simplifiedIngredients,
  };
  res.json(simplifiedResult);
};

module.exports = {
  getById: ctrlWrapper(getById),
};
