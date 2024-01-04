const express = require("express");

const ctrl = require("../../controllers/drinks");
const { schema } = require("../../models/drink");

const validateBody = require("../../middlewares/validateBody");
const { isValidId, authenticate } = require("../../middlewares");
const { upload } = require("../../middlewares/upload");

const router = express.Router();

router.get("/mainpage", authenticate, ctrl.getAll);

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
  validateBody(schema.removeSchema),
  ctrl.removeOwn
);

router.get("/:id", authenticate, isValidId, ctrl.getById);

module.exports = router;
