const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const getCustomers = (search = "") => {
  return prisma.customer.findMany({
    where: {
      OR: [
        {
          name: {
            contains: search,
            mode: "insensitive",
          },
        },
        {
          phone: {
            contains: search,
          },
        },
      ],
    },
    orderBy: {
      createdAt: "desc",
    },
  });
};

const createCustomer = async (data) => {
  const exists = await prisma.customer.findUnique({
    where: {
      phone: data.phone,
    },
  });

  if (exists) {
    throw new Error("Customer already exists");
  }

  return prisma.customer.create({
    data: {
      ...data,
      tags: data.tags || [],
    },
  });
};

const updateCustomer = (id, data) => {
  return prisma.customer.update({
    where: { id },
    data,
  });
};

const deleteCustomer = (id) => {
  return prisma.customer.delete({
    where: { id },
  });
};

const getCustomerByUserId = (userId) => {
  return prisma.customer.findUnique({
    where: { userId },
  });
};

module.exports = {
  getCustomers,
  createCustomer,
  updateCustomer,
  deleteCustomer,
  getCustomerByUserId,
};