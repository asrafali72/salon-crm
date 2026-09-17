const { PrismaClient } = require("@prisma/client");
const { hashPassword, comparePassword } = require("../utils/password");

const prisma = new PrismaClient();

const registerUser = async ({
  name,
  email,
  password,
  phone,
  roleName = "CUSTOMER",
}) => {
  const existingUser = await prisma.user.findUnique({
    where: { email },
  });

  if (existingUser) {
    throw new Error("Email already registered");
  }

  const role = await prisma.role.findUnique({
    where: { name: roleName },
  });

  if (!role) {
    throw new Error("Role not found");
  }

  const passwordHash = await hashPassword(password);

  const user = await prisma.$transaction(async (tx) => {
    // Create User
    const newUser = await tx.user.create({
      data: {
        name,
        email,
        passwordHash,
        roleId: role.id,
      },
      include: {
        role: true,
        branches: true,
      },
    });

    // Create Customer
    await tx.customer.create({
      data: {
        userId: newUser.id,
        name: newUser.name,      // Required
        phone: phone?.trim() || null,      // Optional
      },
    });

    return newUser;
  });

  return user;
};

const loginUser = async ({ email, password }) => {
  const user = await prisma.user.findUnique({
    where: { email },
    include: {
      role: true,
      branches: true,
    },
  });

  if (!user) {
    throw new Error("Invalid email or password");
  }

  const passwordValid = await comparePassword(
    password,
    user.passwordHash
  );

  if (!passwordValid) {
    throw new Error("Invalid email or password");
  }

  if (user.status !== "ACTIVE") {
    throw new Error("User account is not active");
  }

  return user;
};

module.exports = {
  registerUser,
  loginUser,
};