const Task = require("../models/Task");
const { Op } = require("sequelize");

exports.createTask = async (req, res) => {
  try {
    const task = await Task.create(req.body);
    res.status(201).json(task);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.findAll();
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getTaskById = async (req, res) => {
  try {
    const task = await Task.findByPk(req.params.id);
    if (!task) {
      return res.status(404).json({ message: "Tarefa não encontrada!" });
    }
    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateTask = async (req, res) => {
  try {
    const task = await Task.findByPk(req.params.id);
    if (!task) {
      return res.status(404).json({ message: "Tarefa não encontrada!" });
    }
    const updates = {};
    if (req.body.title !== undefined) updates.title = req.body.title;
    if (req.body.description !== undefined) updates.description = req.body.description;
    if (req.body.completed !== undefined) updates.completed = req.body.completed;
    if (req.body.priority !== undefined) updates.priority = req.body.priority;

    await task.update(updates);

    res.status(200).json({ message: "Tarefa atualizada com sucesso!", task });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};


exports.deleteTask = async (req, res) => {
  try {
    const task = await Task.findByPk(req.params.id);
    if (!task) {
      return res.status(404).json({ message: "Tarefa não encontrada!" });
    }
    await task.destroy();
    res.status(200).json({ message: "Tarefa excluída com sucesso!" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getCompletedTasks = async (req, res) => {
  try {
    const tasks = await Task.findAll({
      where: { completed: true }
    });
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getPendingTasks = async (req, res) => {
  try {
    const tasks = await Task.findAll({
      where: { completed: false }
    });
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.searchTasksByTitle = async (req, res) => {
  try {
    const { title } = req.query;
    const tasks = await Task.findAll({
      where: {
        title: {
          [Op.like]: `%${title}%`
        }
      }
    });
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getTasksCreatedAfter = async (req, res) => {
  try {
    const { date } = req.query;
    const tasks = await Task.findAll({
      where: {
        createdAt: {
          [Op.gt]: new Date(date)
        }
      }
    });
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getRecentlyUpdatedTasks = async (req, res) => {
  try {
    const tasks = await Task.findAll({
      order: [["updatedAt", "DESC"]],
      limit: 5
    });
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getTaskCount = async (req, res) => {
  try {
    const count = await Task.count();
    res.status(200).json({ count });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getCompletedTaskCount = async (req, res) => {
  try {
    const count = await Task.count({
      where: { completed: true }
    });
    res.status(200).json({ count });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getPendingTaskCount = async (req, res) => {
  try {
    const count = await Task.count({
      where: { completed: false }
    });
    res.status(200).json({ count });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }


};
exports.getTasksByPriority = async (req, res) => {
  const { priority } = req.params;

  try {
    const tasks = await Task.findAll({
      where: { priority }
    });


    if (tasks.length === 0) {
      return res.status(404).json({ message: "Nenhuma tarefa com a prioridade informada foi encontrada!" });
    }

    res.status(200).json(tasks);

  } catch (error) {
    res.status(400).json({ message: error.message });
  }

};

