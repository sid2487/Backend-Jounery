import express from "express";
import dotenv from "dotenv";
import connectDB from "./app/config/db.js";
import userRoutes from "./app/routes/userRoutes.js";
import todoRoutes from "./app/routes/todoRoutes.js";
import { errorHandler } from "./app/middleware/errorMiddleware.js";

const app = express();
dotenv.config();
connectDB();

app.use(express.json());

app.use("/users", userRoutes);
app.use("/todos", todoRoutes);

const PORT = process.env.PORT || 5001;

app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});