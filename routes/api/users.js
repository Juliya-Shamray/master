const router = require("express").Router();
const { authenticate, validateBody } = require("../../middlewares");
const ctrl = require("../../controllers/users");
const { upload } = require("../../middlewares/upload");
const { schemas } = require("../../models/user");

router.get("/current", authenticate, ctrl.getCurrent);

router.patch(
  "/update",
  authenticate,
  validateBody(schemas.updateUserSchema),
  upload.single("avatar"),
  ctrl.updateUser
);

module.exports = router;
