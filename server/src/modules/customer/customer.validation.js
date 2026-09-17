const { z } = require("zod");

const customerSchema = z.object({
  name: z.string().min(3),

  phone: z.string().min(10).max(15),

  email: z.string().email().optional().or(z.literal("")),

  gender: z.enum(["MALE", "FEMALE", "OTHER"]).optional(),

  notes: z.string().optional(),

  tags: z.array(z.string()).optional(),

  marketingConsent: z.boolean().optional(),
});

module.exports = {
  customerSchema,
};