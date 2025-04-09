import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import userRoutes from "./app/routes/userRoutes.js";
import { errorHandler } from "./middlewares/errorHandler.js";

dotenv.config();

connectDB();

const app = express();
app.use(express.json());

app.use("/api/users", userRoutes); 

app.use(errorHandler);

const PORT = process.env.PORT || 8000
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));