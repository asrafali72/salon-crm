const router = require("express").Router();

const auth = require("../../middleware/auth.middleware");
const authorize = require("../../middleware/role.middleware");

const c = require("./assistant.controller");

router.get(
  "/dashboard",
  auth,
  authorize("tasks.read"),
  c.dashboard
);

router.get(
  "/tasks",
  auth,
  authorize("tasks.read"),
  c.tasks
);

router.patch(
  "/tasks/:id",
  auth,
  authorize("tasks.write"),
  c.update
);

router.get(
  "/schedule",
  auth,
  authorize("appointments.read"),
  c.schedule
);

module.exports = router;