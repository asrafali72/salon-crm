const service = require("./service.service");
const { serviceSchema } = require("./service.validation");

const getAll = async (req, res) => {
  const data = await service.getServices();
  res.json(data);
};

const create = async (req, res) => {
  try {
    const body = serviceSchema.parse(req.body);

    const created = await service.createService(body);

    res.status(201).json(created);
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