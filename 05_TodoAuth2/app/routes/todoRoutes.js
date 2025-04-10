import express from "express";
import { createTodo, deleteTodo, getTodos, updateTodo, } from "../controllers/todoController.js";

import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.use(protect);
router.route("/").post(createTodo).get(getTodos);
router.route("/:id").put(updateTodo).delete(deleteTodo);

export default router;