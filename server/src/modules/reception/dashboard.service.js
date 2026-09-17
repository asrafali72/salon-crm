const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

// Dashboard statistics
const dashboard = async (branchId) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);

  const bookings = await prisma.appointment.count({
    where: {
      branchId,
      appointmentDate: {
        gte: today,
        lt: tomorrow,
      },
    },
  });

  const checkedIn = await prisma.appointment.count({
    where: {
      branchId,
      status: "CHECKED_IN",
      appointmentDate: {
        gte: today,
        lt: tomorrow,
      },
    },
  });

  const waiting = await prisma.appointment.count({
    where: {
      branchId,
      status: "PENDING",
      appointmentDate: {
        gte: today,
        lt: tomorrow,
      },
    },
  });

  const revenue = await prisma.payment.aggregate({
    _sum: {
      amount: true,
    },
    where: {
      createdAt: {
        gte: today,
        lt: tomorrow,
      },
      invoice: {
        appointment: {
          branchId,
        },
      },
    },
  });

  return {
    bookings,
    checkedIn,
    waiting,
    revenue: Number(revenue._sum.amount || 0),
  };
};

// Customer search
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
        include: {
          user: true,
        },
      },
    },
    orderBy: {
      startTime: "asc",
    },
  });
};

// Check-in
const checkIn = (id) =>
  prisma.appointment.update({
    where: { id },
    data: {
      status: "CHECKED_IN",
    },
  });

// Complete appointment
const completeService = (id) =>
  prisma.appointment.update({
    where: { id },
    data: {
      status: "COMPLETED",
    },
    include: {
      service: true,
    },
  });

module.exports = {
  dashboard,
  searchCustomers,
  todayAppointments,
  checkIn,
  completeService,
};