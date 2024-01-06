const cloudinary = require("cloudinary").v2;
const multer = require("multer");
const path = require("path");
require("dotenv").config();

const tempDir = path.resolve("tmp");
console.log(tempDir);

const { CLOUDINARY_NAME, CLOUDINARY_KEY, CLOUDINARY_SECRET } = process.env;

cloudinary.config({
  cloud_name: CLOUDINARY_NAME,
  api_key: CLOUDINARY_KEY,
  api_secret: CLOUDINARY_SECRET,
});

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, tempDir);
  },
  // filename: (req, file, cb) => {
  //   const { originalname } = file;
  //   const { _id } = req.user;
  //   const filename = `${_id}_${originalname}`;
  //   cb(null, filename);
  // },
});

const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (file.mimetype.includes("image")) {
      cb(null, true);
      return;
    }
    cb(null, false);
  },
});

module.exports = { upload, cloudinary };
