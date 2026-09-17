const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const todaySchedule = async (staffId) => {
  const today = new Date();
  today.setHours(0,0,0,0);

  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate()+1);

  return prisma.appointment.findMany({
    where:{
      staffId,
      appointmentDate:{
        gte:today,
        lt:tomorrow
      }
    },
    include:{
      customer:true,
      service:true
    },
    orderBy:{ startTime:"asc" }
  });
};

const currentService = (staffId) =>
  prisma.appointment.findFirst({
    where:{
      staffId,
      status:"CHECKED_IN"
    },
    include:{
      customer:true,
      service:true
    }
  });

const history = (staffId) =>
  prisma.appointment.findMany({
    where:{
      staffId,
      status:"COMPLETED"
    },
    include:{
      customer:true,
      service:true
    },
    orderBy:{ appointmentDate:"desc" }
  });

const startService = (id)=>
  prisma.appointment.update({
    where:{ id },
    data:{ status:"IN_SERVICE" }
  });

const complete = (id,notes)=>
  prisma.appointment.update({
    where:{ id },
    data:{
      status:"COMPLETED",
      notes
    }
  });

module.exports={
  todaySchedule,
  currentService,
  history,
  startService,
  complete
};