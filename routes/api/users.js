const router = require("express").Router();
const { authenticate } = require("../../middlewares");
const ctrl = require("../../controllers/users");

router.get("/current", authenticate, ctrl.getCurrent);

module.exports = router;
