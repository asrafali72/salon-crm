const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const dashboard = async (assistantId) => {
  const tasks = await prisma.task.findMany({
    where: { assistantId },
  });

  const pending = tasks.filter(
    (t) => t.status === "PENDING"
  ).length;

  const completed = tasks.filter(
    (t) => t.status === "COMPLETED"
  ).length;

  return {
    total: tasks.length,
    pending,
    completed,
  };
};

const getTasks = (assistantId) =>
  prisma.task.findMany({
    where: { assistantId },
    include: {
      appointment: {
        include: {
          customer: true,
          service: true,
        },
      },
    },
  });

const updateTask = (id, status) =>
  prisma.task.update({
    where: { id },
    data: { status },
  });

const schedule = (assistantId) =>
  prisma.appointment.findMany({
    where: {
      assistantId,
    },
    include: {
      customer: true,
      service: true,
      staff: {
        include: { user: true },
      },
    },
    orderBy: { startTime: "asc" },
  });

module.exports = {
  dashboard,
  getTasks,
  updateTask,
  schedule,
};