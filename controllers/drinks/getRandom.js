const { ctrlWrapper } = require("../../helpers");
const { Drink } = require("../../models/drink");

const getRandom = async (req, res) => {
  const { isAdult } = req.user;

  let categoryFilters = [];

  if (isAdult) {
    categoryFilters = [
      { category: "Ordinary Drink" },
      { category: "Cocktail" },
      { category: "Shake" },
      { category: "Other/Unknown" },
    ];
  } else {
    categoryFilters = [
      { category: "Ordinary Drink", alcoholic: "Non alcoholic" },
      { category: "Cocktail", alcoholic: "Non alcoholic" },
      { category: "Shake", alcoholic: "Non alcoholic" },
      { category: "Other/Unknown", alcoholic: "Non alcoholic" },
    ];
  }
  const drinks = await Promise.all(
    categoryFilters.map(async (filter) => {
      return await Drink.aggregate([
        { $match: filter },
        { $sample: { size: 3 } },
      ]);
    })
  );

  const result = drinks.flat();

  res.json(result);
};

module.exports = {
  getRandom: ctrlWrapper(getRandom),
};
