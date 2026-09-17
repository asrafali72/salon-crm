const router = require("express").Router();

const auth = require("../../middleware/auth.middleware");
const authorize = require("../../middleware/role.middleware");

const c = require("./review.controller");

router.post("/", auth, c.create);

router.get("/mine", auth, c.myReviews);

router.get(
  "/",
  auth,
  authorize("reviews.read"),
  c.all
);

router.patch(
  "/:id/resolve",
  auth,
  authorize("reviews.write"),
  c.resolve
);

module.exports = router;