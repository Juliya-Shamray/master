const router = require("express").Router();

const ctrl = require("../../controllers/filters");
const { authenticate } = require("../../middlewares");

router.get("/ingredients", authenticate, ctrl.getIngredients);

router.get("/categories", authenticate, ctrl.getCategories);

router.get("/glasses", authenticate, ctrl.getGlasses);

module.exports = router;
