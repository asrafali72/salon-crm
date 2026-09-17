const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const createReview = (data) =>
  prisma.review.create({ data });

const getCustomerReviews = (customerId) =>
  prisma.review.findMany({
    where:{ customerId },
    include:{
      appointment:{
        include:{ service:true }
      }
    }
  });

const getAllReviews = () =>
  prisma.review.findMany({
    include:{
      customer:true,
      appointment:{
        include:{ service:true }
      }
    },
    orderBy:{ createdAt:"desc" }
  });

const resolveReview = (id) =>
  prisma.review.update({
    where:{ id },
    data:{ status:"RESOLVED" }
  });

module.exports={
  createReview,
  getCustomerReviews,
  getAllReviews,
  resolveReview
};