import express from "express";
import { createUser, getUser } from "../controllers/userController.js";


const router = express.Router();

router.post("/", createUser);
router.get("/", getUser);

export default router;

// Final route = app.use prefix + router path
// "/api/users" + "/" = "/api/users"
