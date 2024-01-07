const { ctrlWrapper, cloudinary } = require("../../helpers");
const { User } = require("../../models/user");
const fs = require("fs/promises");

const updateUser = async (req, res) => {
  const { _id, avatar, avatarPublicId } = req.user;
  const { name } = req.body;

  let avatarUrl = "";
  let publicIdToDelete = "";

  if (req.file) {
    const { path: tmpPath } = req.file;

    if (avatar) {
      publicIdToDelete = avatarPublicId;
    }
    const uploadResult = await cloudinary.uploader.upload(tmpPath, {
      folder: "avatars",
      transformation: [{ width: 100, height: 100, crop: "fill" }],
    });

    await User.findByIdAndUpdate(_id, {
      avatarPublicId: uploadResult.public_id,
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
  updateUser: ctrlWrapper(updateUser),
};
