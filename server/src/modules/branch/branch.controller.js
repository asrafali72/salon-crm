const service = require("./branch.service");
const { branchSchema } = require("./branch.validation");

const getAll = async (req, res) => {
  const branches = await service.getBranches();

  res.json(branches);
};

const create = async (req, res) => {
  try {
    const data = branchSchema.parse(req.body);

    const branch = await service.createBranch(data);

    res.status(201).json(branch);
  } catch (err) {
    res.status(400).json({
      message: err.message,
    });
  }
};

const update = async (req, res) => {
  try {
    const data = branchSchema.partial().parse(req.body);

    const branch = await service.updateBranch(
      req.params.id,
      data
    );

    res.json(branch);
  } catch (err) {
    res.status(400).json({
      message: err.message,
    });
  }
};

const remove = async (req, res) => {
  try {
    await service.deleteBranch(req.params.id);

    res.json({
      message: "Branch deleted",
    });
  } catch (err) {
    res.status(400).json({
      message: err.message,
    });
  }
};

module.exports = {
  getAll,
  create,
  update,
  remove,
};