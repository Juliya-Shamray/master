const { ctrlWrapper, HttpError } = require("../helpers");
const { User } = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const { SECRET_KEY } = process.env;
console.log(SECRET_KEY);

const signup = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw HttpError(409, "Email already in use");
  }
  const createHashPassword = await bcrypt.hash(password, 10);

  const newUser = await User.create({
    ...req.body,
    password: createHashPassword,
  });

  res.status(201).json({
    name: newUser.name,
    email: newUser.email,
  });
};

const signin = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    throw HttpError(401, "Email or password is not valid");
  }

  const passwordCompare = await bcrypt.compare(password, user.password);
  if (!passwordCompare) {
    throw HttpError(401, "Email or password is not valid");
  }

  const payload = {
    id: user._id,
  };
  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "10h" });
  res.json({ token });
};

module.exports = {
  signup: ctrlWrapper(signup),
  signin: ctrlWrapper(signin),
};
