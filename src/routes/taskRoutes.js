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
  getPendingTaskCount,
  getTasksByPriority
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
router.get("/tasks/priority/:priority", getTasksByPriority);



module.exports = router;
