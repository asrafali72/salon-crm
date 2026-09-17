const router = require("express").Router();

const auth = require("../../middleware/auth.middleware");
const authorize = require("../../middleware/role.middleware");

const controller = require("./appointment.controller");

router.get(
  "/",
  auth,
  authorize("appointments.read"),
  controller.getAll
);

router.post(
  "/",
  auth,
  authorize("appointments.write"),
  controller.create
);

router.post(
  "/:id/checkin",
  auth,
  authorize("appointments.checkin"),
  controller.checkIn
);

router.post(
  "/:id/start",
  auth,
  authorize("appointments.start"),
  controller.start
);

router.post(
  "/:id/complete",
  auth,
  authorize("appointments.complete"),
  controller.complete
);

router.post(
  "/:id/cancel",
  auth,
  authorize("appointments.write"),
  controller.cancel
);

module.exports = router;