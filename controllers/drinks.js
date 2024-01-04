const fs = require("fs");
const { Drink } = require("../models/drink");
const { ctrlWrapper, HttpError } = require("../helpers");
const { cloudinary } = require("../middlewares/upload");

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

  const { path: tmpPath } = req.file;

  const uploadResult = await cloudinary.uploader.upload(tmpPath, {
    folder: "DrinksImages",
    transformation: [{ width: 400, height: 400, crop: "fill" }],
  });

  const drinkThumb = uploadResult.secure_url;

  await fs.unlink(tmpPath);

  const result = await Drink.create({ ...req.body, owner, drinkThumb });

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
  getAll: ctrlWrapper(getAll),
  addOwn: ctrlWrapper(addOwn),
  getById: ctrlWrapper(getById),
  getOwn: ctrlWrapper(getOwn),
  removeOwn: ctrlWrapper(removeOwn),
};
