const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const getProducts = () =>
  prisma.inventoryProduct.findMany({
    orderBy: { createdAt: "desc" },
  });

const createProduct = (data) =>
  prisma.inventoryProduct.create({ data });

const purchaseStock = async (data) => {
  return prisma.$transaction(async (tx) => {
    await tx.inventoryProduct.update({
      where: { id: data.productId },
      data: {
        stock: {
          increment: data.quantity,
        },
      },
    });

    return tx.stockTransaction.create({
      data: {
        productId: data.productId,
        quantity: data.quantity,
        type: "PURCHASE",
        note: data.note,
      },
    });
  });
};

const adjustStock = async (data) => {
  return prisma.$transaction(async (tx) => {
    await tx.inventoryProduct.update({
      where: { id: data.productId },
      data: {
        stock: {
          increment: data.quantity,
        },
      },
    });

    return tx.stockTransaction.create({
      data: {
        productId: data.productId,
        quantity: data.quantity,
        type: "ADJUSTMENT",
        note: data.note,
      },
    });
  });
};

module.exports = {
  getProducts,
  createProduct,
  purchaseStock,
  adjustStock,
};