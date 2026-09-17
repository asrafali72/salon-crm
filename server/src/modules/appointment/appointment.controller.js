const service = require("./appointment.service");
const { appointmentSchema } = require("./appointment.validation");

const getAll = async (req, res) => {
  const data = await service.getAppointments();
  res.json(data);
};

const create = async (req, res) => {
  try {
    const body = appointmentSchema.parse(req.body);

    const appointment =
      await service.createAppointment(body);

    res.status(201).json(appointment);
  } catch (err) {
    res.status(400).json({
      message: err.message,
    });
  }
};

const checkIn = async (req, res) => {
  const data = await service.checkIn(req.params.id);
  res.json(data);
};

const start = async (req, res) => {
  const data = await service.startService(req.params.id);
  res.json(data);
};

const complete = async (req, res) => {
  const data = await service.completeService(req.params.id);
  res.json(data);
};

const cancel = async (req, res) => {
  const data = await service.cancelAppointment(req.params.id);
  res.json(data);
};

module.exports = {
  getAll,
  create,
  checkIn,
  start,
  complete,
  cancel,
};
