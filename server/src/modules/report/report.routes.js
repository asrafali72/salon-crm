
const router = require("express").Router();

const auth = require("../../middleware/auth.middleware");
const authorize = require("../../middleware/role.middleware");

const c = require("./report.controller");

router.get(
  "/dashboard",
  auth,
  authorize("reports.read"),
  c.getDashboard
);

module.exports = router;