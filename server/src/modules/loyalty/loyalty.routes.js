const router = require("express").Router();

const auth = require("../../middleware/auth.middleware");
const authorize = require("../../middleware/role.middleware");

const c = require("./loyalty.controller");

router.get(
  "/",
  auth,
  authorize("loyalty.read"),
  c.getAll
);

router.post(
  "/redeem",
  auth,
  authorize("loyalty.write"),
  c.redeem
);

module.exports = router;