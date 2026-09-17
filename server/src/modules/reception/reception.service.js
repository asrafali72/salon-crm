const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

// Search customers
const searchCustomers = async (search = "") => {
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
      name: "asc",
    },
    take: 20,
  });
};

// Today's appointments
const todayAppointments = async (branchId) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);

  return prisma.appointment.findMany({
    where: {
      branchId,
      appointmentDate: {
        gte: today,
        lt: tomorrow,
      },
    },
    include: {
      customer: true,
      service: true,
      staff: {
        include: { user: true },
      },
    },
    orderBy: {
      startTime: "asc",
    },
  });
};

const checkIn = (id) =>
  prisma.appointment.update({
    where: { id },
    data: { status: "CHECKED_IN" },
  });

const completeService = (id) =>
  prisma.appointment.update({
    where: { id },
    data: { status: "COMPLETED" },
    include: {
      service: true,
    },
  });

module.exports = {
  searchCustomers,
  todayAppointments,
  checkIn,
  completeService,
};