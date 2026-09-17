const { z } = require("zod");

const redeemSchema = z.object({
  customerId: z.string().min(1),
  points: z.number().int().positive(),
});

module.exports = {
  redeemSchema,
};