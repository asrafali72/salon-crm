const { z } = require("zod");

const invoiceSchema = z.object({
  appointmentId: z.string(),
  discount: z.number().min(0).default(0),
});

const paymentSchema = z.object({
  invoiceId: z.string(),
  amount: z.number().positive(),

  method: z.enum([
    "CASH",
    "CARD",
    "UPI",
    "WALLET",
  ]),

  reference: z.string().optional(),
});

module.exports = {
  invoiceSchema,
  paymentSchema,
};