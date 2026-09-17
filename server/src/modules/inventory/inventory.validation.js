const { z } = require("zod");

const productSchema = z.object({
  name: z.string().min(2),
  sku: z.string().min(2),
  supplier: z.string().optional(),

  costPrice: z.number(),
  sellingPrice: z.number(),

  minimumStock: z.number(),
});

const stockSchema = z.object({
  productId: z.string(),
  quantity: z.number(),
  note: z.string().optional(),
});

module.exports = {
  productSchema,
  stockSchema,
};