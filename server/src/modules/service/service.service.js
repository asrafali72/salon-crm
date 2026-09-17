const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const getServices = () => {
  return prisma.service.findMany({
    include: {
      stylists: {
        include: {
          user: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });
};

const createService = (data) => {
  return prisma.service.create({
    data: {
      name: data.name,
      category: data.category,
      duration: data.duration,
      price: data.price,
      tax: data.tax,

      stylists: {
        connect: data.stylistIds.map((id) => ({
          id,
        })),
      },
    },
    include: {
      stylists: {
        include: {
          user: true,
        },
      },
    },
  });
};

module.exports = {
  getServices,
  createService,
};