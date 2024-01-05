const { Schema, model } = require("mongoose");
const { handleMongooseError } = require("../helpers");
const ingredientSchema = new Schema(
  {
    title: String,
    ingredientThumb: String,
    abv: String,
    alcohol: String,
    description: String,
    type: String,
    flavour: String,
    country: String,
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

ingredientSchema.post("save", handleMongooseError);

const Ingredient = model("ingredient", ingredientSchema);

module.exports = Ingredient;
