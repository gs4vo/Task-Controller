const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");

const Task = sequelize.define("Task", {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
  },
  completed: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  priority: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: "Baixa",
    validate: {
      isIn: [["Baixa", "Média", "Alta"]],
    },
  },
}, {
  tableName: "tasks",
  timestamps: true,
});

module.exports = Task;
