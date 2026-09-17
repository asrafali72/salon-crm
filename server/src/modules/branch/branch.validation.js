const { z } = require("zod");

const branchSchema = z.object({
  name: z.string().min(3),
  address: z.string().min(5),
  phone: z.string().min(10).max(15),
  openingTime: z.string(),
  closingTime: z.string(),
  status: z.enum(["ACTIVE", "INACTIVE"]).optional(),
});

module.exports = {
  branchSchema,
};