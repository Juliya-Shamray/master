const { Drink } = require("../models/drink");

const { ctrlWrapper, HttpError } = require("../helpers");

const getAll = async (req, res) => {
  const result = await Drink.find({}, "-createdAt -updatedAt");
  res.json(result);
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
  const result = await Drink.create(req.body);
  res.status(201).json(result);
};

const getOwn = async (req, res) => {
  const result = await Drink.find({}, "-createdAt -updatedAt");
  res.json(result);
};

module.exports = {
  getAll: ctrlWrapper(getAll),
  addOwn: ctrlWrapper(addOwn),
  getById: ctrlWrapper(getById),
  getOwn: ctrlWrapper(getOwn),
};
