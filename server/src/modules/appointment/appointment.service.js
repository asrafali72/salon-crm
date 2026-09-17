// const { PrismaClient } = require("@prisma/client");
// const {
//   isStylistAvailable,
// } = require("./availability.service");

// const { getIO } = require("../../sockets/socket");

// const prisma = new PrismaClient();

// const createAppointment = async (data) => {
//   return prisma.$transaction(async (tx) => {
//     const service = await tx.service.findUnique({
//       where: { id: data.serviceId },
//     });

//     const start = data.startTime;

//     const [h, m] = start.split(":").map(Number);

//     const endDate = new Date();
//     endDate.setHours(h, m + service.duration);

//     const endTime = endDate
//       .toTimeString()
//       .slice(0, 5);

//     const available =
//       await isStylistAvailable({
//         staffId: data.staffId,
//         date: data.appointmentDate,
//         start,
//         end: endTime,
//       });

//     if (!available) {
//       throw new Error("Stylist already booked");
//     }

//     return tx.appointment.create({
//       data: {
//         ...data,
//         appointmentDate: new Date(
//           data.appointmentDate
//         ),
//         endTime,
//         status: "CONFIRMED",
//       },
//       include: {
//         customer: true,
//         staff: {
//           include: {
//             user: true,
//           },
//         },
//         service: true,
//         branch: true,
//       },
//     });
//   });
// };

// const getAppointments = () => {
//   return prisma.appointment.findMany({
//     include: {
//       customer: true,
//       service: true,
//       branch: true,
//       staff: {
//         include: {
//           user: true,
//         },
//       },
//     },
//     orderBy: {
//       appointmentDate: "asc",
//     },
//   });
// };

// const updateStatus = (id, status) => {
//   return prisma.appointment.update({
//     where: { id },
//     data: { status },
//     include: {
//       customer: true,
//       service: true,
//       staff: { include: { user: true } },
//       branch: true,
//     },
//   });
// };

// const checkIn = (id) => updateStatus(id, "CHECKED_IN");
// const startService = (id) => updateStatus(id, "IN_SERVICE");
// const completeService = (id) => updateStatus(id, "COMPLETED");
// const cancelAppointment = (id) => updateStatus(id, "CANCELLED");

// module.exports = {
//   getAppointments,
//   createAppointment,
//   checkIn,
//   startService,
//   completeService,
//   cancelAppointment,
// };


const { PrismaClient } = require("@prisma/client");
const { isStylistAvailable } = require("./availability.service");
const { getIO } = require("../../sockets/socket");
const {
  bookingConfirmation,
  scheduleReminder,
} = require("../../utils/notifier");

const prisma = new PrismaClient();

const createAppointment = async (data) => {
  return prisma.$transaction(async (tx) => {
    const service = await tx.service.findUnique({
      where: { id: data.serviceId },
    });

    const start = data.startTime;
    const [h, m] = start.split(":").map(Number);

    const endDate = new Date();
    endDate.setHours(h, m + service.duration);

    const endTime = endDate.toTimeString().slice(0, 5);

    const available = await isStylistAvailable({
      staffId: data.staffId,
      date: data.appointmentDate,
      start,
      end: endTime,
    });

    if (!available) {
      throw new Error("Stylist already booked");
    }

    // Create appointment
    const appointment = await tx.appointment.create({
      data: {
        ...data,
        appointmentDate: new Date(data.appointmentDate),
        endTime,
        status: "CONFIRMED",
      },
      include: {
        customer: true,
        service: true,
        branch: true,
        staff: {
          include: {
            user: true,
          },
        },
      },
    });

    // Emit realtime event to branch room
    getIO()
      .to(data.branchId)
      .emit("appointmentCreated", appointment);

    return appointment;
  });
};

const getAppointments = () => {
  return prisma.appointment.findMany({
    include: {
      customer: true,
      service: true,
      branch: true,
      staff: {
        include: {
          user: true,
        },
      },
    },
    orderBy: {
      appointmentDate: "asc",
    },
  });
};

// Updated status with realtime event
const updateStatus = async (id, status) => {
  const appointment = await prisma.appointment.update({
    where: { id },
    data: { status },
    include: {
      customer: true,
      service: true,
      branch: true,
      staff: {
        include: {
          user: true,
        },
      },
    },
  });

  getIO()
    .to(appointment.branchId)
    .emit("appointmentUpdated", appointment);

  await bookingConfirmation(appointment);
  await scheduleReminder(appointment);

  return appointment;
};

const checkIn = (id) => updateStatus(id, "CHECKED_IN");
const startService = (id) => updateStatus(id, "IN_SERVICE");
const completeService = (id) => updateStatus(id, "COMPLETED");
const cancelAppointment = (id) => updateStatus(id, "CANCELLED");

module.exports = {
  getAppointments,
  createAppointment,
  checkIn,
  startService,
  completeService,
  cancelAppointment,
};