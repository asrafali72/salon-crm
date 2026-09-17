const service = require("./inventory.service");

const getAll = async (req, res) => {
  res.json(await service.getProducts());
};

const create = async (req, res) => {
  res.status(201).json(
    await service.createProduct(req.body)
  );
};

const purchase = async (req, res) => {
  res.json(await service.purchaseStock(req.body));
};

const adjust = async (req, res) => {
  res.json(await service.adjustStock(req.body));
};

module.exports = {
  getAll,
  create,
  purchase,
  adjust,
};