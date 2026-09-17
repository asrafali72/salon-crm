const { z } = require("zod");

const serviceSchema = z.object({
  name: z.string().min(2),

  category: z.enum([
    "HAIR",
    "BEARD",
    "FACIAL",
    "SPA",
    "NAILS",
    "MAKEUP",
  ]),

  duration: z.number().min(5),

  price: z.number().positive(),

  tax: z.number().min(0),

  stylistIds: z.array(z.string()),

  status: z.enum(["ACTIVE", "INACTIVE"]).optional(),
});

module.exports = { serviceSchema };