const { Schema, model } = require("mongoose");
const { handleMongooseError } = require("../helpers");
const Joi = require("joi");

const emailRexExp = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

const birthDayRegExp = /^\d{2}-\d{2}-\d{4}$/;

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    birthDay: {
      type: String,
      match: birthDayRegExp,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: emailRexExp,
    },
    password: {
      type: String,
      minLength: 8,
      required: true,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

userSchema.post("save", handleMongooseError);

const User = model("user", userSchema);

const signupSchema = Joi.object({
  name: Joi.string().required(),
  birthDay: Joi.string().pattern(birthDayRegExp).required(),
  email: Joi.string().pattern(emailRexExp).required(),
  password: Joi.string().min(8).required(),
});

const signinSchema = Joi.object({
  email: Joi.string().pattern(emailRexExp).required(),
  password: Joi.string().min(8).required(),
});

const schemas = {
  signupSchema,
  signinSchema,
};

module.exports = {
  User,
  schemas,
};
