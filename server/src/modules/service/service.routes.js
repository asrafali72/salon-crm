const router = require("express").Router();

const auth = require("../../middleware/auth.middleware");
const authorize = require("../../middleware/role.middleware");

const controller = require("./service.controller");

router.get(
  "/",
  auth,
  authorize("services.read"),
  controller.getAll
);

router.post(
  "/",
  auth,
  authorize("services.write"),
  controller.create
);

module.exports = router;