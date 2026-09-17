const { z } = require("zod");

const updateTaskSchema = z.object({
  status: z.enum([
    "PENDING",
    "IN_PROGRESS",
    "COMPLETED",
  ]),
});

module.exports = { updateTaskSchema };