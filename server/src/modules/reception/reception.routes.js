const router = require("express").Router();

const auth = require("../../middleware/auth.middleware");
const authorize = require("../../middleware/role.middleware");
const c = require("./reception.controller");

// Dashboard
router.get(
  "/dashboard",
  auth,
  authorize("appointments.write"),
  c.dashboard
);

// Customers
router.get(
  "/customers",
  auth,
  authorize("appointments.write"),
  c.customers
);

// Today's appointments
router.get(
  "/appointments",
  auth,
  authorize("appointments.write"),
  c.appointments
);

// Check-in
router.post(
  "/appointments/:id/checkin",
  auth,
  authorize("appointments.write"),
  c.checkin
);

// Complete service
router.post(
  "/appointments/:id/complete",
  auth,
  authorize("appointments.write"),
  c.complete
);

module.exports = router;