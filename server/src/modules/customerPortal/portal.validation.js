const { z } = require("zod");

const bookingSchema = z.object({
  customerId: z.string(),
  staffId: z.string(),
  serviceId: z.string(),
  branchId: z.string(),
  appointmentDate: z.string(),
  startTime: z.string(),
  notes: z.string().optional()
});

module.exports = { bookingSchema };