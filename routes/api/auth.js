const express = require("express");

const ctrl = require("../../controllers/auth");

const { validationBody, authenticate, upload } = require("../../middlewares");

const { schemas } = require("../../models/user");

const { ctrlWrapper } = require("../../helpers");

const router = express.Router();

router.get("/verify/:verificationToken", ctrlWrapper(ctrl.verifyEmail));

router.post(
  "/verify",
  validationBody(schemas.verifyEmailSchema),
  ctrlWrapper(ctrl.resendVerifyEmail),
);

router.post(
  "/register",
  validationBody(schemas.registerSchema),
  ctrlWrapper(ctrl.register),
);

router.post(
  "/login",
  validationBody(schemas.loginSchema),
  ctrlWrapper(ctrl.login),
);

router.get("/logout", authenticate, ctrlWrapper(ctrl.logout));

router.patch(
  "/avatars",
  authenticate,
  upload.single("avatar"),
  ctrlWrapper(ctrl.updateAvatar),
);

router.get("/current", authenticate, ctrlWrapper(ctrl.getCurrentUser));

module.exports = router;