const { Drink } = require("../models/drink");

const { ctrlWrapper, HttpError } = require("../helpers");

const getAll = async (req, res) => {
  const { page = 1, limit = 9 } = req.query;
  const skip = (page - 1) * limit;
  const totalCount = await Drink.countDocuments();
  const data = await Drink.find({}, "-createdAt -updatedAt", { skip, limit });
  res.json({ data, totalCount });
};

const getById = async (req, res) => {
  const { id } = req.params;
  const result = await Drink.findById(id);
  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.json(result);
};

const addOwn = async (req, res) => {
  const { _id: owner } = req.user;
  const result = await Drink.create({ ...req.body, owner });
  res.status(201).json(result);
};

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
  getAll: ctrlWrapper(getAll),
  addOwn: ctrlWrapper(addOwn),
  getById: ctrlWrapper(getById),
  getOwn: ctrlWrapper(getOwn),
};
