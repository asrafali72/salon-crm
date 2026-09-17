const router = require("express").Router();

const auth = require("../../middleware/auth.middleware");
const authorize = require("../../middleware/role.middleware");

const c = require("./inventory.controller");

router.get("/", auth, authorize("inventory.read"), c.getAll);

router.post("/", auth, authorize("inventory.write"), c.create);

router.post(
  "/purchase",
  auth,
  authorize("inventory.write"),
  c.purchase
);

router.post(
  "/adjust",
  auth,
  authorize("inventory.write"),
  c.adjust
);

module.exports = router;