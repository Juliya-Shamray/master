const { Schema, model } = require("mongoose");
const { handleMongooseError } = require("../helpers");
const Joi = require("joi");

const alcoholicList = ["Alcoholic", "Non alcoholic"];

const drinkSchema = new Schema(
  {
    drink: {
      type: String,
      required: true,
    },
    drinkAlternate: {
      type: String,
      default: "Sorry, not specified",
    },
    tags: {
      type: String,
      default: "Sorry, not specified",
    },
    video: {
      type: String,
      default: "Sorry, not specified",
    },
    category: {
      type: String,
      required: true,
    },
    IBA: {
      type: String,
      default: "Sorry, not specified",
    },
    alcoholic: {
      type: String,
      enum: alcoholicList,
    },
    glass: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    instructions: {
      type: String,
      required: true,
    },
    instructionsES: String,
    instructionsDE: String,
    instructionsFR: String,
    instructionsIT: String,
    instructionsRU: String,
    instructionsPL: String,
    instructionsUK: String,
    drinkThumb: {
      type: String,
    },
    ingredients: [
      {
        title: String,
        measure: String,
        _id: false,
        ingredientId: {
          type: Schema.Types.ObjectId,
          ref: "ingredient",
        },
      },
    ],

    shortDescription: String,
    owner: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);
drinkSchema.index({ owner: 1 });

const addSchema = Joi.object({
  drink: Joi.string(),
  description: Joi.string(),
  category: Joi.string(),
  alcoholic: Joi.string().valid(...alcoholicList),
  glass: Joi.string(),
  instructions: Joi.string(),
  drinkThumb: Joi.string(),
  ingredients: Joi.array().items(
    Joi.object({
      title: Joi.string(),
      measure: Joi.string(),
    })
  ),
});

const removeAndFavSchema = Joi.object({
  id: Joi.string().required(),
});

const searchSchema = Joi.object({
  category: Joi.string(),
  ingredient: Joi.string(),
  keyword: Joi.string(),
  page: Joi.number().min(1),
  limit: Joi.number().min(1),
});

const schema = {
  addSchema,
  searchSchema,
  removeAndFavSchema,
};

drinkSchema.post("save", handleMongooseError);

const Drink = model("drink", drinkSchema);

module.exports = { Drink, schema };
