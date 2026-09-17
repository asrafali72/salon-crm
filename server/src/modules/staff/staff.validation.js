const { z } = require("zod");

const staffSchema = z.object({
  name: z.string().min(3),
  email: z.string().email(),
  password: z.string().min(6),

  role: z.enum([
    "ADMIN",
    "RECEPTIONIST",
    "STYLIST",
    "ASSISTANT",
  ]),

  branchId: z.string(),

  position: z.string(),

  skills: z.array(z.string()).optional(),
});

module.exports = { staffSchema };