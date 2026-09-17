const service = require("./dashboard.service");


// const customers = async (req, res) => {
//   const data = await service.customers(req.user.branchIds[0]);
//   res.json(data);
// };
const customers = async (req, res) => {
  const data = await service.searchCustomers(req.query.search || "");
  res.json(data);
};


const appointments = async (req, res) => {
  const data = await service.todayAppointments(
    req.user.branchIds[0]
  );

  res.json(data);
};

const checkin = async (req, res) => {
  res.json(await service.checkIn(req.params.id));
};

const complete = async (req, res) => {
  res.json(await service.completeService(req.params.id));
};

const dashboard = async(req,res)=>{
  const data = await service.dashboard(
    req.user.branchIds[0]
  );

  res.json(data);
};

module.exports = {
  customers,
  appointments,
  checkin,
  complete,
  dashboard,
};