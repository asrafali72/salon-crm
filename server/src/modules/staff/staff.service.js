const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcrypt");

const prisma = new PrismaClient();

const getAllStaff = () => {
  return prisma.staff.findMany({
    include: {
      user: {
        include: {
          role: true,
        },
      },
      branch: true,
    },
  });
};

const createStaff = async (data) => {
  return prisma.$transaction(async (tx) => {
    const role = await tx.role.findUnique({
      where: { name: data.role },
    });

    const hashed = await bcrypt.hash(data.password, 12);

    const user = await tx.user.create({
      data: {
        name: data.name,
        email: data.email,
        passwordHash: hashed,
        roleId: role.id,
      },
    });

    await tx.userBranch.create({
      data: {
        userId: user.id,
        branchId: data.branchId,
      },
    });

    const staff = await tx.staff.create({
      data: {
        userId: user.id,
        branchId: data.branchId,
        position: data.position,
        skills: data.skills || [],
      },
      include: {
        user: {
          include: { role: true },
        },
        branch: true,
      },
    });

    return staff;
  });
};

module.exports = {
  getAllStaff,
  createStaff,
};