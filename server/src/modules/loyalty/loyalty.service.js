const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const getTier = (points) => {
  if (points >= 1500) return "GOLD";
  if (points >= 500) return "SILVER";
  return "BRONZE";
};

const getAccounts = () =>
  prisma.loyaltyAccount.findMany({
    include: {
      customer: true,
    },
  });

const createAccount = (customerId) =>
  prisma.loyaltyAccount.create({
    data: {
      customerId,
    },
  });

const earnPoints = async ({ customerId, amount }) => {
  return prisma.$transaction(async (tx) => {
    let account = await tx.loyaltyAccount.findUnique({
      where: { customerId },
    });

    if (!account) {
      account = await tx.loyaltyAccount.create({
        data: { customerId },
      });
    }

    const earned = Math.floor(amount / 10);

    const updated = await tx.loyaltyAccount.update({
      where: { id: account.id },
      data: {
        points: {
          increment: earned,
        },
      },
    });

    await tx.loyaltyTransaction.create({
      data: {
        accountId: account.id,
        type: "EARN",
        points: earned,
        note: `Earned from payment ₹${amount}`,
      },
    });

    return tx.loyaltyAccount.update({
      where: { id: account.id },
      data: {
        tier: getTier(updated.points),
      },
      include: {
        customer: true,
      },
    });
  });
};

const redeemPoints = async ({ customerId, points }) => {
  return prisma.$transaction(async (tx) => {
    const account = await tx.loyaltyAccount.findUnique({
      where: { customerId },
    });

    if (!account) throw new Error("No loyalty account");

    if (account.points < points)
      throw new Error("Not enough points");

    const updated = await tx.loyaltyAccount.update({
      where: { id: account.id },
      data: {
        points: {
          decrement: points,
        },
      },
    });

    await tx.loyaltyTransaction.create({
      data: {
        accountId: account.id,
        type: "REDEEM",
        points: -points,
        note: "Redeemed at checkout",
      },
    });

    return tx.loyaltyAccount.update({
      where: { id: account.id },
      data: {
        tier: getTier(updated.points),
      },
      include: {
        customer: true,
      },
    });
  });
};

module.exports = {
  getAccounts,
  createAccount,
  earnPoints,
  redeemPoints,
};