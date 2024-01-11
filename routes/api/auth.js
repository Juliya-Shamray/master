const router = require("express").Router();

const { validateBody, authenticate } = require("../../middlewares");
const { schemas } = require("../../models/user");
const ctrl = require("../../controllers/auth");

router.post("/signup", validateBody(schemas.signupSchema), ctrl.signup);

router.get("/verify/:verificationCode", ctrl.verifyEmail);

router.post(
  "/verify",
  validateBody(schemas.emailSchema),
  ctrl.resendVerifyEmail
);

router.post("/signin", validateBody(schemas.signinSchema), ctrl.signin);

router.post("/signout", authenticate, ctrl.signout);

module.exports = router;
