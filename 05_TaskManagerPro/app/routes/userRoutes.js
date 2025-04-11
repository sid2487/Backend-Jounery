import express from "express";
import { registerUser, loginUser, getAllUsers } from "../controllers/userControllerr.js";
import { isAdmin, protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/", protect, isAdmin, getAllUsers);

export default router;