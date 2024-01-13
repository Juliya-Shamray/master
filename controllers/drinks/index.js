const { getRandom } = require("./getRandom");
const { getById } = require("./getById");
const { addOwn } = require("./addOwn");
const { getOwn } = require("./getOwn");
const { removeOwn } = require("./removeOwn");
const { search } = require("./search.js");
const { addToFav } = require("./addToFav");
const { removeFavorite } = require("./removeFavorite");
const { getFavorite } = require("./getFavorite.js");
const { getPopular } = require("./getPopular.js");

module.exports = {
  getRandom,
  getById,
  addOwn,
  getOwn,
  removeOwn,
  search,
  addToFav,
  removeFavorite,
  getFavorite,
  getPopular,
};
