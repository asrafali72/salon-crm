const service = require("./staff.service");
const { staffSchema } = require("./staff.validation");

const getAll = async (req, res) => {
  const data = await service.getAllStaff();
  res.json(data);
};

const create = async (req, res) => {
  try {
    const body = staffSchema.parse(req.body);

    const staff = await service.createStaff(body);

    res.status(201).json(staff);
  } catch (err) {
    res.status(400).json({
      message: err.message,
    });
  }
};

module.exports = {
  getAll,
  create,
};