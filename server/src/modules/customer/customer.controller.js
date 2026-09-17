const service = require("./customer.service");
const { customerSchema } = require("./customer.validation");

const getAll = async (req, res) => {
  const search = req.query.search || "";

  const customers = await service.getCustomers(search);

  res.json(customers);
};

const create = async (req, res) => {
  try {
    const data = customerSchema.parse(req.body);

    const customer = await service.createCustomer(data);

    res.status(201).json(customer);
  } catch (err) {
    res.status(400).json({
      message: err.message,
    });
  }
};

const update = async (req, res) => {
  try {
    const data = customerSchema.partial().parse(req.body);

    const customer = await service.updateCustomer(
      req.params.id,
      data
    );

    res.json(customer);
  } catch (err) {
    res.status(400).json({
      message: err.message,
    });
  }
};

const remove = async (req, res) => {
  await service.deleteCustomer(req.params.id);

  res.json({
    message: "Customer deleted",
  });
};

module.exports = {
  getAll,
  create,
  update,
  remove,
};