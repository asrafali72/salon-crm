
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const dashboard = async () => {
  const today = new Date();
  today.setHours(0,0,0,0);

  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate()+1);

  const revenueToday = await prisma.payment.aggregate({
    _sum:{ amount:true },
    where:{
      createdAt:{ gte:today, lt:tomorrow }
    }
  });

  const appointmentsToday = await prisma.appointment.count({
    where:{
      appointmentDate:{ gte:today, lt:tomorrow }
    }
  });

  const customers = await prisma.customer.count();

  const monthlyRevenue = await prisma.payment.aggregate({
    _sum:{ amount:true }
  });

  const topServices = await prisma.appointment.groupBy({
    by:["serviceId"],
    _count:{ serviceId:true }
  });

  const services = await prisma.service.findMany();

  const serviceMap = Object.fromEntries(
    services.map(s=>[s.id,s.name])
  );

  return {
    cards:{
      revenueToday:Number(revenueToday._sum.amount || 0),
      monthlyRevenue:Number(monthlyRevenue._sum.amount || 0),
      appointmentsToday,
      totalCustomers:customers
    },
    topServices:topServices.map(item=>({
      name:serviceMap[item.serviceId],
      total:item._count.serviceId
    }))
  };
};

module.exports={ dashboard };