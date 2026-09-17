const service = require("./review.service");
const { reviewSchema } = require("./review.validation");

const create = async(req,res)=>{
  const data = reviewSchema.parse(req.body);
  res.status(201).json(await service.createReview(data));
};

const myReviews = async(req,res)=>{
  res.json(await service.getCustomerReviews(req.user.customerId));
};

const all = async(req,res)=>{
  res.json(await service.getAllReviews());
};

const resolve = async(req,res)=>{
  res.json(await service.resolveReview(req.params.id));
};

module.exports={
  create,
  myReviews,
  all,
  resolve
};