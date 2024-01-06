const { ctrlWrapper } = require("../helpers");
const { cloudinary } = require("../middlewares/upload");
const { User } = require("../models/user");
const fs = require("fs/promises");

const getCurrent = async (req, res) => {
  const { name, email } = req.user;
  res.json({
    name,
    email,
  });
};

const updateUser = async (req, res) => {
  const { _id } = req.user;
  const { name } = req.body;

  let avatarUrl = "";
  let publicIdToDelete = "";

  if (req.file) {
    const { path: tmpPath } = req.file;

    if (req.user.avatar) {
      publicIdToDelete = req.user.avatarPublicId;
    }
    const uploadResult = await cloudinary.uploader.upload(tmpPath, {
      folder: "avatars",
      transformation: [{ width: 100, height: 100, crop: "fill" }],
    });

    avatarUrl = uploadResult.secure_url;

    await fs.unlink(tmpPath);
  }

  const updateData = {
    ...(name && { name }),
    ...(avatarUrl && { avatar: avatarUrl }),
  };
  const result = await User.findByIdAndUpdate(_id, updateData, { new: true });

  if (publicIdToDelete) {
    await cloudinary.uploader.destroy(publicIdToDelete);
  }
  res.json(result);
};

module.exports = {
  getCurrent: ctrlWrapper(getCurrent),
  updateUser: ctrlWrapper(updateUser),
};
