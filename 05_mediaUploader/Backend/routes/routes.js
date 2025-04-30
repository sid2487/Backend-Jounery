import express from "express";
import { getallMedia, upload, uploadMedia } from "../controllers/mediaController.js";

const router = express.Router();

router.post("/upload", upload.single("file"), uploadMedia);
router.get("/", getallMedia);

export default router; 