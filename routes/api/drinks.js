const express = require("express");

const ctrl = require("../../controllers/drinks");
const { schema } = require("../../models/drink");

const validateBody = require("../../middlewares/validateBody");
const { isValidId } = require("../../middlewares");

const router = express.Router();

router.get("/mainpage", ctrl.getAll);

router.post("/own/add", validateBody(schema.addSchema), ctrl.add);

router.get("/:id", isValidId, ctrl.getById);

module.exports = router;
