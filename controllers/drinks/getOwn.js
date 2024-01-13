const { ctrlWrapper } = require("../../helpers");
const { Drink } = require("../../models/drink");

const getOwn = async (req, res) => {
  const { page = 1, limit = 9 } = req.query;
  const skip = (page - 1) * limit;
  const { _id: owner } = req.user;
  const result = await Drink.find({ owner }, "-createdAt -updatedAt", {
    skip,
    limit,
  });

  const totalItemsCount = await Drink.countDocuments({ owner });
  res.json({
    data: result,
    total: totalItemsCount,
  });
};

module.exports = {
  getOwn: ctrlWrapper(getOwn),
};
