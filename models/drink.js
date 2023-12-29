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
      required: true,
    },
    tags: String,
    video: String,
    category: {
      type: String,
      required: true,
    },
    IBA: String,
    alcoholic: {
      type: String,
      enum: alcoholicList,
      required: true,
    },
    glass: {
      type: String,
      required: true,
    },
    description: String,
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
      required: true,
    },
    ingredients: {
      type: [
        {
          title: {
            type: String,
            required: true,
          },
          measure: {
            type: String,
            required: true,
          },
        },
      ],
      required: true,
      validate: [
        arrayMinItems,
        "Ingredients array must have at least one item",
      ],
    },

    shortDescription: String,
    favorite: {
      type: Boolean,
      default: false,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

function arrayMinItems(arr) {
  return arr.length > 0;
}

const addSchema = Joi.object({
  drink: Joi.string().required(),
  drinkAlternate: Joi.string().required(),
  category: Joi.string().required(),
  alcoholic: Joi.string()
    .required()
    .valid(...alcoholicList),
  glass: Joi.string().required(),
  instructions: Joi.string().required(),
  drinkThumb: Joi.string().required(),
  ingredients: Joi.object({
    title: Joi.string().required(),
    measure: Joi.string().required(),
  }),
  favorite: Joi.boolean(),
});

const schema = {
  addSchema,
};
drinkSchema.post("save", handleMongooseError);

const Drink = model("drink", drinkSchema);

module.exports = { Drink, schema };
