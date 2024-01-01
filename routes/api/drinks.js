const express = require("express");

const ctrl = require("../../controllers/drinks");
const { schema } = require("../../models/drink");

const validateBody = require("../../middlewares/validateBody");
const { isValidId, authenticate } = require("../../middlewares");

const router = express.Router();

router.get("/mainpage", authenticate, ctrl.getAll);

router.post(
  "/own/add",
  authenticate,
  validateBody(schema.addSchema),
  ctrl.addOwn
);

router.get("/own", authenticate, ctrl.getOwn);

router.get("/:id", authenticate, isValidId, ctrl.getById);

module.exports = router;
