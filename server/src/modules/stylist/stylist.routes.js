const router=require("express").Router();

const auth=require("../../middleware/auth.middleware");
const authorize=require("../../middleware/role.middleware");

const c=require("./stylist.controller");

router.get(
  "/schedule",
  auth,
  authorize("appointments.read"),
  c.schedule
);

router.get(
  "/current",
  auth,
  authorize("appointments.read"),
  c.current
);

router.get(
  "/history",
  auth,
  authorize("appointments.read"),
  c.history
);

router.post(
  "/:id/start",
  auth,
  authorize("appointments.write"),
  c.start
);

router.post(
  "/:id/complete",
  auth,
  authorize("appointments.write"),
  c.complete
);

module.exports=router;