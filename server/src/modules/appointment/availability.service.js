const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const isStylistAvailable = async ({
  staffId,
  date,
  start,
  end,
}) => {
  const conflict = await prisma.appointment.findFirst({
    where: {
      staffId,

      appointmentDate: new Date(date),

      status: {
        in: [
          "PENDING",
          "CONFIRMED",
          "CHECKED_IN",
          "IN_SERVICE",
        ],
      },

      OR: [
        {
          startTime: {
            lt: end,
          },
          endTime: {
            gt: start,
          },
        },
      ],
    },
  });

  return !conflict;
};

module.exports = {
  isStylistAvailable,
};