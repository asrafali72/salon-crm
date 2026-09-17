const service = require("./billing.service");

const createInvoice = async (req, res) => {
  try {
    const invoice =
      await service.createInvoice(req.body);

    res.status(201).json(invoice);
  } catch (err) {
    res.status(400).json({
      message: err.message,
    });
  }
};

const payment = async (req, res) => {
  try {
    const data = await service.addPayment(
      req.body
    );

    res.json(data);
  } catch (err) {
    res.status(400).json({
      message: err.message,
    });
  }
};

const getAll = async (req, res) => {
  const invoices = await service.getInvoices();

  res.json(invoices);
};

module.exports = {
  createInvoice,
  payment,
  getAll,
};