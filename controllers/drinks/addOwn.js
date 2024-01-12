const { cloudinary, ctrlWrapper } = require("../../helpers");
const { Drink } = require("../../models/drink");
const fs = require("fs/promises");

const addOwn = async (req, res) => {
  const { _id: owner } = req.user;

  const { path: tmpPath } = req.file;

  const uploadResult = await cloudinary.uploader.upload(tmpPath, {
    folder: "drinksImages",
    transformation: [{ width: 400, height: 400, crop: "fill" }],
  });

  const drinkThumb = uploadResult.secure_url;

  await fs.unlink(tmpPath);

  const result = await Drink.create({ ...req.body, owner, drinkThumb });

  res.status(201).json(result);
};

module.exports = {
  addOwn: ctrlWrapper(addOwn),
};
