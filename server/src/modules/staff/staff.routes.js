const router = require("express").Router();

const auth = require("../../middleware/auth.middleware");
const authorize = require("../../middleware/role.middleware");

const controller = require("./staff.controller");

router.get(
  "/",
  auth,
  authorize("staff.read"),
  controller.getAll
);

router.post(
  "/",
  auth,
  authorize("staff.write"),
  controller.create
);

module.exports = router;