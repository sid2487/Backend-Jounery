import express from "express";
import { createTask, getTasks, updateTask, deleteTask, getAllTasks } from "../controllers/taskController.js";
import { isAdmin, protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.use(protect);
router.route("/").post(createTask).get(getTasks);
router.route("/:id").put(updateTask).delete(deleteTask);
router.get("/admin/all", isAdmin, getAllTasks); // admin only

export default router;