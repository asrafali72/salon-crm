
const service = require("./report.service");

const getDashboard = async(req,res)=>{
  const data = await service.dashboard();
  res.json(data);
};

module.exports={ getDashboard };