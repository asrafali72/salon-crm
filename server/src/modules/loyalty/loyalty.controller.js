const service = require("./loyalty.service");
const { redeemSchema } = require("./loyalty.validation");

const getAll = async (req, res) => {
  const accounts = await service.getAccounts();
  res.json(accounts);
};

const redeem = async (req, res) => {
  try {
    const data = redeemSchema.parse(req.body);

    const result = await service.redeemPoints(data);

    res.json(result);
  } catch (err) {
    res.status(400).json({
      message: err.message,
    });
  }
};

module.exports = {
  getAll,
  redeem,
};