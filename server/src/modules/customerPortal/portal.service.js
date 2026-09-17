const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// Get Active Services
const getServices = () =>
  prisma.service.findMany({
    where: {
      status: "ACTIVE",
    },
    orderBy: {
      name: "asc",
    },
  });

// Get All Stylists
const getStylists = () =>
  prisma.staff.findMany({
    include: {
      user: true,
      branch: true,
    },
    where: {
      user: {
        role: {
          name: "STYLIST",
        },
      },
    },
  });

// Create Customer Booking
const createBooking = async (data) => {
  // Convert User ID → Customer ID
  const customer = await prisma.customer.findUnique({
    where: {
      userId: data.customerId,
    },
  });

  if (!customer) {
    throw new Error("Customer profile not found");
  }

  const service = await prisma.service.findUnique({
    where: {
      id: data.serviceId,
    },
  });

  const [h, m] = data.startTime.split(":").map(Number);

  const end = new Date();
  end.setHours(h, m + service.duration);

  const endTime = end.toTimeString().slice(0, 5);

  return prisma.appointment.create({
    data: {
      customerId: customer.id,
      staffId: data.staffId,
      serviceId: data.serviceId,
      branchId: data.branchId,
      appointmentDate: new Date(data.appointmentDate),
      startTime: data.startTime,
      endTime,
      status: "PENDING",
    },
    include: {
      customer: true,
      service: true,
      staff: {
        include: {
          user: true,
        },
      },
      branch: true,
    },
  });
};

const getCustomerBookings = (customerId) => {
  return prisma.appointment.findMany({
    where: { customerId },
    include: {
      service: true,
      staff: {
        include: { user: true },
      },
      branch: true,
    },
    orderBy: {
      appointmentDate: "desc",
    },
  });
};

const cancelBooking = async (appointmentId, customerId) => {
  const appointment = await prisma.appointment.findFirst({
    where: {
      id: appointmentId,
      customerId,
    },
  });

  if (!appointment) {
    throw new Error("Appointment not found");
  }

  if (appointment.status !== "PENDING") {
    throw new Error("Only pending appointments can be cancelled");
  }

  return prisma.appointment.update({
    where: { id: appointmentId },
    data: {
      status: "CANCELLED",
    },
  });
};

const getLoyalty = async (customerId) => {
  return prisma.loyaltyAccount.findUnique({
    where: { customerId },
    include: {
      transactions: {
        orderBy: { createdAt: "desc" }
      }
    }
  });
};

const getInvoices = async (customerId) => {
  return prisma.invoice.findMany({
    where: {
      appointment: { customerId }
    },
    include: {
      appointment: {
        include: {
          service: true,
          staff: { include: { user: true } }
        }
      },
      payments: true,
      items: true
    },
    orderBy: {
      createdAt: "desc"
    }
  });
};

const getServiceHistory = (customerId) => {
  return prisma.appointment.findMany({
    where: {
      customerId,
      status: "COMPLETED"
    },
    include: {
      service: true,
      staff: { include: { user: true } }
    },
    orderBy: {
      appointmentDate: "desc"
    }
  });
};


module.exports = {
  getServices,
  getStylists,
  createBooking,
  getCustomerBookings,
  cancelBooking,
  getLoyalty,
  getInvoices,
  getServiceHistory,
};