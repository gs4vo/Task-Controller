const express = require("express");
const {
  createTask,
  getAllTasks,
  getTaskById,
  updateTask,
  deleteTask,
  getCompletedTasks,
  getPendingTasks,
  searchTasksByTitle,
  getTasksCreatedAfter,
  getRecentlyUpdatedTasks,
  getTaskCount,
  getCompletedTaskCount,
  getPendingTaskCount
} = require("../controllers/taskController");

const router = express.Router();

router.post("/", createTask);
router.get("/", getAllTasks);
router.get("/:id", getTaskById);
router.put("/:id", updateTask);
router.delete("/:id", deleteTask);
router.get("/completed", getCompletedTasks);
router.get("/pending", getPendingTasks);
router.get("/search", searchTasksByTitle);
router.get("/created-after", getTasksCreatedAfter);
router.get("/updated-recently", getRecentlyUpdatedTasks);
router.get("/count", getTaskCount);
router.get("/completed-count", getCompletedTaskCount);
router.get("/pending-count", getPendingTaskCount);

module.exports = router;
