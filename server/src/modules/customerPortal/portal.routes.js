const router = require("express").Router();

const auth = require("../../middleware/auth.middleware");
const c = require("./portal.controller");

router.get("/services", auth, c.services);

router.get("/stylists", auth, c.stylists);

router.post("/book", auth, c.book);

router.get("/loyalty", auth, c.loyalty);

router.get("/invoices", auth, c.invoices);

router.get("/history", auth, c.history);

router.get(
  "/bookings",
  auth,
  c.bookings
);

router.post(
  "/bookings/:id/cancel",
  auth,
  c.cancel
);

module.exports = router;