const { Drink } = require("../../models/drink");
const { ctrlWrapper, HttpError } = require("../../helpers");

// const getAll = async (req, res) => {
//   const { page = 1, limit = 9 } = req.query;
//   const skip = (page - 1) * limit;
//   const totalCount = await Drink.countDocuments();
//   const data = await Drink.find({}, "-createdAt -updatedAt", { skip, limit });
//   res.json({ data, totalCount });
// };

const removeOwn = async (req, res) => {
  const { id } = req.body;
  const result = await Drink.findByIdAndDelete(id);

  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.json({
    message: "object has deleted successfully",
  });
};

module.exports = {
  removeOwn: ctrlWrapper(removeOwn),
};
