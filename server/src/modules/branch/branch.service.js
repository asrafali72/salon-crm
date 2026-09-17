const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const getBranches = () => {
  return prisma.branch.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });
};

const createBranch = async (data) => {
  const existing = await prisma.branch.findFirst({
    where: { name: data.name },
  });

  if (existing) {
    throw new Error("Branch already exists");
  }

  return prisma.branch.create({
    data,
  });
};

const updateBranch = (id, data) => {
  return prisma.branch.update({
    where: { id },
    data,
  });
};

const deleteBranch = (id) => {
  return prisma.branch.delete({
    where: { id },
  });
};

module.exports = {
  getBranches,
  createBranch,
  updateBranch,
  deleteBranch,
};