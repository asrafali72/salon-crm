const service=require("./stylist.service");
const { completeServiceSchema } = require("./stylist.validation");

const schedule=async(req,res)=>{
  res.json(await service.todaySchedule(req.user.staffId));
};

const current=async(req,res)=>{
  res.json(await service.currentService(req.user.staffId));
};

const history=async(req,res)=>{
  res.json(await service.history(req.user.staffId));
};

const start=async(req,res)=>{
  res.json(await service.startService(req.params.id));
};

const complete = async (req, res) => {
  try {
    const data = completeServiceSchema.parse(req.body);

    const result = await service.complete(
      req.params.id,
      data.notes
    );

    res.json(result);
  } catch (err) {
    res.status(400).json({
      message: err.message,
    });
  }
};

module.exports={
  schedule,
  current,
  history,
  start,
  complete
};