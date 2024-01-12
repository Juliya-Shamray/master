const { HttpError } = require("../helpers");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const { SECRET_KEY_JWT } = process.env;
const { User } = require("../models/user");

const authenticate = async (req, res, next) => {
  const { authorization = "" } = req.headers;
  const [bearer, token] = authorization.split(" ");
  if (bearer !== "Bearer") {
    next(HttpError(401, "Not authorized"));
  }
  try {
    const { id } = jwt.verify(token, SECRET_KEY_JWT);
    const user = await User.findById(id);
    if (!user || !user.token || user.token !== token) {
      next(HttpError(401, "Not authorized"));
    }
    req.user = user;
    next();
  } catch (err) {
    next(HttpError(401, "Not authorized"));
    console.error("Authentication error:", err);
  }
};
module.exports = authenticate;
