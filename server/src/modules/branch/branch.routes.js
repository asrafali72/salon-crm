const router = require("express").Router();

const controller = require("./branch.controller");

const auth = require("../../middleware/auth.middleware");
const authorize = require("../../middleware/role.middleware");

router.get(
  "/",
  auth,
  authorize("branches.read"),
  controller.getAll
);

router.post(
  "/",
  auth,
  authorize("branches.write"),
  controller.create
);

router.patch(
  "/:id",
  auth,
  authorize("branches.write"),
  controller.update
);

router.delete(
  "/:id",
  auth,
  authorize("branches.write"),
  controller.remove
);

module.exports = router;