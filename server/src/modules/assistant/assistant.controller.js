const service = require("./assistant.service");
const { updateTaskSchema } = require("./assistant.validation");

const dashboard = async (req, res) => {
  res.json(await service.dashboard(req.user.staffId));
};

const tasks = async (req, res) => {
  res.json(await service.getTasks(req.user.staffId));
};

const update = async (req, res) => {
  const data = updateTaskSchema.parse(req.body);

  res.json(
    await service.updateTask(req.params.id, data.status)
  );
};

const schedule = async (req, res) => {
  res.json(await service.schedule(req.user.staffId));
};

module.exports = {
  dashboard,
  tasks,
  update,
  schedule,
};