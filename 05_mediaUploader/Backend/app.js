import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import mediaRoutes from "./routes/routes.js";
import { errorHandler } from "./middleware/errorMiddlewares.js";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/media", mediaRoutes);

app.use(errorHandler);


export default app;