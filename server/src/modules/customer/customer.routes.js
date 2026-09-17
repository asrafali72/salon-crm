const router = require("express").Router();

const auth = require("../../middleware/auth.middleware");
const authorize = require("../../middleware/role.middleware");

const controller = require("./customer.controller");

router.get(
  "/",
  auth,
  authorize("customers.read"),
  controller.getAll
);

router.post(
  "/",
  auth,
  authorize("customers.write"),
  controller.create
);

router.patch(
  "/:id",
  auth,
  authorize("customers.write"),
  controller.update
);

router.delete(
  "/:id",
  auth,
  authorize("customers.write"),
  controller.remove
);

module.exports = router;