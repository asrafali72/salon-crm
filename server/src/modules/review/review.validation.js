const { z } = require("zod");

const reviewSchema = z.object({
  appointmentId: z.string(),
  customerId: z.string(),
  rating: z.number().min(1).max(5),
  comment: z.string().optional(),
  issueCategory: z.string().optional(),
});

module.exports = { reviewSchema };