const router = require("express").Router();
const ctrl = require("../../controllers/drinks");
const { schema } = require("../../models/drink");
const validateBody = require("../../middlewares/validateBody");
const { isValidId, authenticate, upload } = require("../../middlewares");

router.get("/mainpage", authenticate, ctrl.getRandom);

router.post(
  "/own/add",
  authenticate,
  validateBody(schema.addSchema),
  upload.single("drinkThumb"),
  ctrl.addOwn
);

router.get("/own", authenticate, ctrl.getOwn);

router.delete(
  "/own/remove",
  authenticate,
  validateBody(schema.removeAndFavSchema),
  ctrl.removeOwn
);

router.get(
  "/search",
  authenticate,
  validateBody(schema.searchSchema),
  ctrl.search
);

router.get("/:id", authenticate, isValidId, ctrl.getById);

router.post(
  "/favorite/add",
  authenticate,
  validateBody(schema.removeAndFavSchema),
  ctrl.addToFav
);

module.exports = router;
