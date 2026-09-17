const { z } = require("zod");

const completeServiceSchema = z.object({
  notes: z
    .string()
    .max(1000, "Notes must be less than 1000 characters")
    .optional()
    .default(""),
});

module.exports = {
  completeServiceSchema,
};