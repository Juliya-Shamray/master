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
  res.json(result);
};

module.exports = {
  getOwn: ctrlWrapper(getOwn),
};
