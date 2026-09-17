const router = require("express").Router();

const auth = require("../../middleware/auth.middleware");
const authorize = require("../../middleware/role.middleware");

const controller = require("./billing.controller");

router.get(
  "/",
  auth,
  authorize("billing.read"),
  controller.getAll
);

router.post(
  "/invoice",
  auth,
  authorize("billing.write"),
  controller.createInvoice
);

router.post(
  "/payment",
  auth,
  authorize("billing.write"),
  controller.payment
);

module.exports = router;